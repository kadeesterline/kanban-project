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
	const [listState, setListState] = useState([])
	const currentUser = useUser()

	let initialUpdateListFormState = {
		name: "",
	}

	const [updateListFormState, setUpdateListFormState] = useState(
		initialUpdateListFormState
	)

	useEffect(() => {
		console.log(list)
		let tasks = list?.tasks?.sort((a, b) => a.rank?.localeCompare(b.rank))
		setTasks(tasks)
		setListState(list)
	}, [lists, list])

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
			.then((r) => r.json())
			.then(setListState(updateListFormState))
	}

	function handleAddTask(task) {
		fetch("/tasks", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				accept: "application/json",
			},
			body: JSON.stringify({ ...task }),
		})
			.then((r) => r.json())
			.then((task) => {
				console.log(task)
				setNewTaskTitle("")
				setTasks([...tasks, task])
				setIsAddTask((isAddTask) => !isAddTask)
			})
	}

	function onNewTask(event) {
		event.preventDefault()
		let task = {
			title: newTaskTitle,
			list_id: list.id,
			user_id: currentUser.id,
			member_id: currentMember.id,
		}
		handleAddTask(task)
	}

	function handleShowEditList() {
		setShowEditList(!showEditList)
	}
	return (
		<div className='border border-solid rounded-lg shadow-lg w-80 mx-2'>
			<div className='bg-slate-200'>
				<h1 className='font-bold text-xl'>{listState.name}</h1>
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
											backgroundColor: snapshot.isDragging ? "#263b4A" : "",
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
						<button className='rounded-full bg-green-200 m-2 p-1' type='submit'>
							Add Task
						</button>
					</form>
				) : (
					<div></div>
				)}
				<div>
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
				</div>

				{showEditList ? (
					<UpdateListForm
						updateListFormState={updateListFormState}
						setUpdateListFormState={setUpdateListFormState}
						handleUpdateList={handleUpdateList}
					/>
				) : null}
			</div>
		</div>
	)
}

export default List
