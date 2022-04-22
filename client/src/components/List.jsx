import React from "react"
import { useEffect, useState } from "react"
import { FiTrash, FiEdit3 } from "react-icons/fi"
import Task from "./Task"
import UpdateListForm from "./UpdateListForm"
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
				setShowEditList(false)
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
			<div className='border border-solid rounded-l w-80 mx-2 '>
				<div className='flex justify-between bg-slate-200'>
					{showEditList ? (
						<UpdateListForm
							updateListFormState={updateListFormState}
							setUpdateListFormState={setUpdateListFormState}
							handleUpdateList={handleUpdateList}
							listName={listName}
						/>
					) : (
						<h1 className='text-l font-semibold p-2'>{listName}</h1>
					)}

					<div>
						<button
							className='rounded-full bg-slate-300 hover:bg-red-300 m-2 p-1 text-md'
							onClick={handleDeleteList}
						>
							<FiTrash />
						</button>
						<button
							className='rounded-full bg-slate-300 hover:bg-yellow-200 m-2 p-1 text-md'
							onClick={handleShowEditList}
						>
							<FiEdit3 />
						</button>
					</div>
				</div>
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
											backgroundColor: snapshot.isDragging ? "" : "",
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
				</div>
			</div>
		</div>
	)
}

export default List
