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
	const [listName, setListName] = useState("")
	const currentUser = useUser()

	let initialUpdateListFormState = {
		name: "",
	}

	const [updateListFormState, setUpdateListFormState] = useState(
		initialUpdateListFormState
	)

	useEffect(() => {
		setListName(list.name)
		console.log(list)
		// let t = list?.tasks?.sort((a, b ) => a.rank?.localeCompare(b.rank))
		// console.log('t:',t)
		setTasks(list.tasks)
	}, [lists])

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
			.then((newList) => {
				let updatedLists = lists.map((li) => {
					if (parseInt(li.id) === parseInt(list.id)) {
						li = newList
					}
					return li
				})
				setLists(updatedLists)
			})
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
			.then((newTask) => {
				console.log(newTask)
				setNewTaskTitle("")
				let listsWithNewTask = lists.map((li) => {
					if (parseInt(li.id) === parseInt(list.id)) {
						li.tasks = [...li.tasks, newTask]
					}
					return li
				})
				setLists(listsWithNewTask)
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
		<div className='h-full'>
			<div className='border border-solid rounded-lg w-80 mx-2 '>
				<h1 className='text-l bg-slate-200 p-2'>{listName}</h1>
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
											backgroundColor: snapshot.isDragging ? "#" : "",
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
							className='placeholder:italic placeholder:text-slate-400'
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
