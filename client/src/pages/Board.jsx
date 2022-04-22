import React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import UpdateBoardForm from "../components/UpdateBoardForm"
import AddListForm from "../components/AddListForm"
import List from "../components/List"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { useUser } from "../context/UserContext"
import { FiTrash, FiEdit3, FiPlusSquare } from "react-icons/fi"

function Board() {
	let navigate = useNavigate()
	let { id } = useParams() //id of board
	const currentUser = useUser()

	const [board, setBoard] = useState([])
	const [lists, setLists] = useState([])
	const [currentMember, setCurrentMember] = useState({})
	const [boardMembers, setBoardMembers] = useState([])
	const [boardAdmin, setBoardAdmin] = useState("")
	const [showUpdateBoard, setShowUpdateBoard] = useState(false)
	const [showAddListForm, setShowAddListForm] = useState(false)
	const [updateFormState, setUpdateFormState] = useState({
		name: "",
		board_id: parseInt(id),
	})
	const [addListFormState, setAddListFormState] = useState({
		name: "",
		board_id: parseInt(id),
	})

	useEffect(() => {
		if (currentUser.id) {
			fetch(`/boards/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ user_id: currentUser.id }),
			})
				.then((r) => r.json())
				.then((board) => {
					setBoard(board)
					setLists(board.lists)
					setCurrentMember(board.users_membership)
					setBoardAdmin(board.board_admin)
					setBoardMembers(board.members)
				})
		}
	}, [currentUser, id])

	function handleDeleteBoard() {
		fetch(`/boards/${id}`, {
			method: "DELETE",
		}).then((r) => {
			if (r.ok) {
				navigate("/boards")
			}
		})
	}

	function handleUpdateBoard() {
		fetch(`/boards/${id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/JSON",
				accept: "application/JSON",
			},
			body: JSON.stringify(updateFormState),
		})
			.then((r) => r.json())
			.then((updatedBoard) => {
				setBoard(updatedBoard)
				setUpdateFormState({ name: "", board_id: parseInt(id) })
				setShowUpdateBoard(false)
			})
	}

	function handleAddList() {
		fetch("/lists", {
			method: "POST",
			headers: {
				"content-type": "application/JSON",
				accept: "application/JSON",
			},
			body: JSON.stringify(addListFormState),
		})
			.then((r) => r.json())
			.then((list) => {
				setLists([...lists, list])
				setAddListFormState({ name: "", board_id: parseInt(id) })
			})
	}

	function handleShowAddList() {
		setShowAddListForm(!showAddListForm)
	}

	function handleShowEditBoard() {
		setShowUpdateBoard(!showUpdateBoard)
	}

	function handleJoinBoard() {
		const newMember = {
			board_id: id,
			user_id: currentUser.id,
			isAdmin: false,
		}

		fetch("/members", {
			method: "POST",
			headers: {
				"content-type": "application/JSON",
				accept: "application/JSON",
			},
			body: JSON.stringify(newMember),
		})
			.then((r) => r.json())
			.then((member) => setCurrentMember(member))
	}

	async function handleMoveTask(id, index) {
		const res = await fetch(`/tasks/rank/${id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/JSON",
				accept: "application/JSON",
			},
			body: JSON.stringify({ dest_index: index }),
		})
		const json = await res.json()
		return json
		// .then(console.log)
	}

	async function handleDragEnd(result) {
		//result variable is an object that has a destination and a source
		console.log("results:", result)
		if (!result.destination) return
		const { source, destination } = result

		if (source.droppableId !== destination.droppableId) {
			const sourceList = lists.find(
				(l) => parseInt(source.droppableId) === parseInt(l.id)
			)
			const destList = lists.find(
				(l) => parseInt(destination.droppableId) === parseInt(l.id)
			)
			const sourceTasks = [...sourceList.tasks]
			const destTasks = [...destList.tasks]
			const [removed] = sourceTasks.splice(source.index, 1)
			destTasks.splice(destination.index, 0, removed)
			//fetches, using index
			let newList = lists.map((li) => {
				if (parseInt(li.id) === parseInt(sourceList.id)) {
					li.tasks = sourceTasks
				}
				if (parseInt(li.id) === parseInt(destList.id)) {
					li.tasks = destTasks
				}
				return li
			})
			setLists(newList)
		} else {
			const list = lists.find(
				(l) => parseInt(source.droppableId) === parseInt(l.id)
			)

			const copiedTasks = [...list.tasks]
			const [removed] = copiedTasks.splice(source.index, 1)
			copiedTasks.splice(destination.index, 0, removed)
			console.log(
				"taskId:",
				result.draggableId,
				" dest index: ",
				destination.index
			)
			// let newLists = await handleMoveTask(result.draggableId, destination.index)
			// console.log("List from moving tasks:", newLists)
			let newLists = lists.map((li) => {
				if (parseInt(li.id) === parseInt(list.id)) {
					li.tasks = copiedTasks
				}
				return li
			})
			setLists(newLists)
		}
	}

	return (
		<>
			{!currentMember?.id ? (
				<div className='h-screen grid place-content-center bg-blue-50'>
					<div className='flex flex-col gap-1 items-center'>
						<p className='text-2xl font-bold'>
							You are not a member of this board
						</p>
						<button
							className='rounded-full bg-blue-200 m-2 p-2 hover:bg-blue-300 hover:shadow-lg hover:shadow-blue-300 transition ease-in-out'
							onClick={handleJoinBoard}
						>
							Join!
						</button>
					</div>
				</div>
			) : (
				<div className='h-full'>
					<div className='p-8'>
						<div className='flex items-start'>
							<h1 className='text-2xl font-bold mb-3 p-1'>{board.name}</h1>

							<button
								onClick={handleDeleteBoard}
								className='inline-block rounded-full bg-slate-300 hover:bg-red-200  mt-2 mx-1 p-1'
							>
								<FiTrash />
							</button>
							<br />
							<button
								onClick={handleShowEditBoard}
								className='inline-block rounded-full bg-slate-300 hover:bg-yellow-200  mt-2 mx-1 p-1'
							>
								<FiEdit3 />
							</button>
							<br />
							{showUpdateBoard ? (
								<UpdateBoardForm
									updateFormState={updateFormState}
									setUpdateFormState={setUpdateFormState}
									handleUpdateBoard={handleUpdateBoard}
								/>
							) : null}
						</div>

						{boardAdmin && (
							<p className='font-mono text-sm text-stone-400'>
								Admin: {boardAdmin}
							</p>
						)}
						{boardMembers.length > 0 && (
							<p className='font-mono text-sm text-stone-400'>
								Members:{" "}
								{boardMembers.map((m) => (
									<span key={m}>{m} </span>
								))}
							</p>
						)}
					</div>

					<DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
						<div className='flex flex-row overflow-x-scroll ml-5'>
							{lists?.map((list) => {
								return (
									<Droppable key={list.id} droppableId={list.id?.toString()}>
										{(provided, snapshot) => {
											return (
												<div
													ref={provided.innerRef}
													{...provided.droppableProps}
													className={
														snapshot.isDraggingOver
															? "bg-blue-100 rounded-xl"
															: ""
													}
												>
													<List
														list={list}
														lists={lists}
														setLists={setLists}
														currentMember={currentMember}
														className=''
													/>
													{provided.placeholder}
												</div>
											)
										}}
									</Droppable>
								)
							})}
							<div className='  flex items-center justify-center border shadow-lg shadow-blue-100 mx-2 mb-5 h-30 w-80'>
								<button
									onClick={handleShowAddList}
									className='rounded-full bg-green-200 hover:bg-green-300 hover:shadow-md hover:shadow-green-500 transition ease-in-out px-2 py-2'
								>
									<FiPlusSquare className='text-xl ' />
								</button>
								<br />
								{showAddListForm ? (
									<AddListForm
										addListFormState={addListFormState}
										setAddListFormState={setAddListFormState}
										handleAddList={handleAddList}
									/>
								) : null}
								<br />
							</div>
						</div>
						<br />
					</DragDropContext>
				</div>
			)}
		</>
	)
}

export default Board
