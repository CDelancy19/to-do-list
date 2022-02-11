import React, { useState, useEffect } from 'react';
import './Todo.css';
import data from '../data.json';

function CreateTask({ addTask }) {
	const [value, setValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!value) return;

		addTask(value);
		setValue('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				className="input"
				value={value}
				placeholder="Add a new task"
				onChange={(e) => setValue(e.target.value)}
			/>
		</form>
	);
}

function Task({ task, index, completeTask, removeTask }) {
	return (
		<div
			className="task"
			style={{ textDecoration: task.complete ? 'line-through' : '' }}
		>
			{task.title}
			<button
				style={{ background: 'red' }}
				onClick={() => removeTask(index)}
			>
				X
			</button>
			<button onClick={() => completeTask(index)}>
				{task.complete ? 'Incomplete' : 'Complete'}
			</button>
		</div>
	);
}
function Todo() {
	const [tasks, setTasks] = useState(data);
  const [tasksRemaining, setTasksRemaining] = useState(0);

  useEffect(() => { setTasksRemaining(tasks.filter(task => !task.complete).length) }, [tasks]);

	const addTask = (title) => {
		const newTasks = [...tasks, { title, completed: false }];
		setTasks(newTasks);
	};

	const completeTask = (index) => {
		const newTasks = [...tasks];
		newTasks[index].complete = !newTasks[index].complete;
		setTasks(newTasks);
	};

	const removeTask = (index) => {
		const newTasks = [...tasks];
		newTasks.splice(index, 1);
		setTasks(newTasks);
	};

	return (
		<div className="todo-container">
			<div className="header">Pending tasks ({tasksRemaining})</div>
			<div className="tasks">
				{tasks.map((task, index) => (
					<Task
						task={task}
						index={index}
						key={task.id}
						completeTask={completeTask}
						removeTask={removeTask}
					/>
				))}
			</div>
			<div className="create-task">
				<CreateTask addTask={addTask} />
			</div>
		</div>
	);
}

export default Todo;
