import React from "react"
import Task from "./Task"
import UpdateListForm from "./UpdateListForm"
import { useEffect, useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { useUser } from "../context/UserContext"

function List({ lists, setLists, list, currentMember }) {
	const [tasks, setTasks] = useState([])
	const [isAddTask, setIsAddTask] = useState(false)
	const [newTaskTitle, setNewTaskTitle] = useState("")
	const [showEditList, setShowEditList] = useState(false)
	const currentUser = useUser()

	let initialUpdateListFormState = {
		name: "",
	}

	const [updateListFormState, setUpdateListFormState] = useState(
		initialUpdateListFormState
	)

	useEffect(() => {
		setTasks(list?.tasks)
	}, [list])

	function handleDeleteList() {
		fetch(`/lists/${list.id}`, {
			method: "DELETE",
		}).then(() => {
			let withoutDeletedList = lists.filter((l) => l.id !== list.id)
			setLists(withoutDeletedList)
		})
	}

	function handleUpdateList() {
		fetch(`/lists/${list.id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/JSON",
				accept: "application/JSON",
			},
			body: JSON.stringify(updateListFormState),
		})
	}

	function handleAddTask(task) {
		console.log(task)
		console.log(currentUser)
		fetch("/tasks", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				accept: "application/json",
			},
			body: JSON.stringify({ ...task }),
		})
			.then((r) => r.json())
			.then((task) => setTasks([...tasks, task]))
	}

	function onNewTask() {
		console.log("current member", currentMember)
		let task = {
			title: newTaskTitle,
			list_id: list.id,
			user_id: currentUser.id,
			member_id: currentMember.id,
		}
		handleAddTask(task)
		setIsAddTask((isAddTask) => !isAddTask)
	}

	function handleShowEditList() {
		setShowEditList(!showEditList)
	}
	return (
		<div className='border border-solid'>
			<div className='bg-slate-200'>
				<h1>{list.name}</h1>
				{tasks?.map((task, index) => {
					return (
						<Draggable
							key={task.id}
							draggableId={task?.id?.toString()}
							index={index}
						>
							{(provided, snapshot) => {
								return (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={{
											backgroundColor: snapshot.isDraggin ? "#263b4A" : "",
											...provided.draggableProps.style,
										}}
									>
										<Task
											task={task}
											tasks={tasks}
											setTasks={setTasks}
											key={task.id + task.title}
										/>
									</div>
								)
							}}
						</Draggable>
					)
				})}
				{isAddTask ? (
					<form onSubmit={onNewTask}>
						<input
							type='text'
							value={newTaskTitle}
							onChange={(e) => setNewTaskTitle(e.target.value)}
						/>
						<button className='rounded-full bg-green-200 m-2 p-1' type='submit'></button>
					</form>
				) : (
					<div></div>
				)}
			</div>
			<button
				className='rounded-full bg-green-200 m-2 p-1'
				onClick={() => setIsAddTask((isAddTask) => !isAddTask)}
			>
				{isAddTask ? "Cancel" : "Add Task"}
			</button>
			&nbsp;
			<button
				className='rounded-full bg-red-200 m-2 p-1'
				onClick={handleDeleteList}
			>
				Delete List
			</button>
			&nbsp;
			<button
				className='rounded-full bg-yellow-200 m-2 p-1'
				onClick={handleShowEditList}
			>
				Update List
			</button>
			{showEditList ? (
				<UpdateListForm
					updateListFormState={updateListFormState}
					setUpdateListFormState={setUpdateListFormState}
					handleUpdateList={handleUpdateList}
					
				/>
			) : null}
		</div>
	)
}

export default List