import React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import UpdateBoardForm from "../components/UpdateBoardForm"
import AddListForm from "../components/AddListForm"
import List from "../components/List"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { useUser } from "../context/UserContext"

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
			let newLists = await handleMoveTask(result.draggableId, destination.index)
			console.log(newLists)
			// let newLists = lists.map((li) => {
			// 	if (parseInt(li.id) === parseInt(list.id)) {
			// 		li.tasks = copiedTasks
			// 	}
			// 	return li
			// })
			setLists(newLists)
		}
	}

	return (
		<>
			{!currentMember?.id ? (
				<div>
					<p>You are not a member of this board</p>
					<button onClick={handleJoinBoard}>Join!</button>
				</div>
			) : (
				<div className='h-full'>
					<h1 className='text-xl'>{board.name}</h1>
					<br />
					<br />
					<DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
						<div className='flex flex-row overflow-x-scroll'>
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
															? "bg-blue-300 rounded-xl"
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
							<div className='rounded-lg shadow-lgw w-80 mx-2'>
								<button
									onClick={handleShowAddList}
									className='rounded-full bg-green-200 m-2 p-1'
								>
									{" "}
									Add List{" "}
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
								<button
									onClick={handleDeleteBoard}
									className='rounded-full bg-red-200 m-2 p-1'
								>
									{" "}
									Delete Board{" "}
								</button>
								<br />
								<button
									onClick={handleShowEditBoard}
									className='rounded-full bg-yellow-200 m-2 p-1'
								>
									{" "}
									Update Board{" "}
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
						</div>
						<br />
					</DragDropContext>
				</div>
			)}
		</>
	)
}

export default Board
