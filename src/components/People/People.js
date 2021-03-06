import React from 'react';
import Person from '../Person/';
import { Draggable, Droppable } from 'react-drag-and-drop'

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

export default React.createClass({
	dragStart(e) {
		this.dragged = e.currentTarget;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this.dragged);
	},
	dragEnd(e) {
		this.dragged.style.display = 'block';
		this.dragged.parentNode.removeChild(placeholder);

		var data = this.props.people;
		var from = Number(this.dragged.dataset.id);
		var to = Number(this.over.dataset.id);
		if (from < to) to--;
		data.splice(to, 0, data.splice(from, 1)[0]);
		this.setState({ people: data });
	},
	dragOver(e) {
		e.preventDefault();
		this.dragged.style.display = "none";
		if (e.target.className === 'placeholder') return;
		this.over = e.target;
		e.target.parentNode.insertBefore(placeholder, e.target);
	},
	handleSubmit(e) {
		e.preventDefault();
	},
	render() {
		var listItems = this.props.people.map((item, i) => {
			return (
				<li style={{ "display": "block" }}
					data-id={i}
					key={i}
					draggable='true'
					onDragEnd={this.dragEnd.bind(this)}
					onDragStart={this.dragStart.bind(this)}>
					<Person person={item} />
				</li>
			)
		});
		return (
			<ul onDragOver={this.dragOver.bind(this)}>
				{listItems}
			</ul>
		)
	}
});