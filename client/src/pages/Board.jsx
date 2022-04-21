import React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import UpdateBoardForm from "../components/UpdateBoardForm"
import AddListForm from "../components/AddListForm"
import List from "../components/List"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useMember } from "../context/MemberContext"
import { useUser } from "../context/UserContext"

function Board() {
	let navigate = useNavigate()
	let { id } = useParams() //id of board
	const currentUser = useUser()
	const currentMemberArray = useMember()

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
		console.log("trigger useffect")
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
					console.log(board)
					setBoard(board)
					setLists(board.lists)
					setCurrentMember(board.users_membership)
					setBoardAdmin(board.board_admin)
					setBoardMembers(board.members)
				})
		}
	}, [currentUser])

	function handleDeleteBoard() {
		fetch(`/boards/${id}`, {
			method: "DELETE",
		}).then(navigate("/boards"))
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
			.then((updatedBoard) => setBoard(updatedBoard))
			.then(setUpdateFormState({ name: "", board_id: parseInt(id) }))
			.then(setShowUpdateBoard(false))
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

	function handleDragEnd(result, lists, setLists) {
		console.log(result)
		if (!result.destination) return
		const { source, destination } = result
		// console.log("lists:", lists)
		const list = lists.find(
			(l) => parseInt(source.droppableId) === parseInt(l.id)
		)
		// console.log("list:", list)
		const copiedTasks = [...list.tasks]
		// console.log("tasks:", copiedTasks)
		const [removed] = copiedTasks.splice(source.index, 1)
		// console.log("Index:", source.index, " Removed:", removed)
		copiedTasks.splice(destination.index, 0, removed)
		// console.log("copied:", copiedTasks, "og:", [...list.tasks])
		let newLists = lists.map((li) => {
			if (parseInt(li.id) === parseInt(list.id)) {
				console.log(li)
				li.tasks = copiedTasks
			}
			return li
		})
		// console.log("og lists: ", lists, "replaced:", replacedLists)
		setLists((lists) => (lists = [...newLists]))
	}

	//if not member yet, join table
	if (!currentMember?.id)
		return (
			<div>
				<p>Not a member</p>
				<button onClick={handleJoinBoard}>Join Board</button>
			</div>
		)

	return (
		<>
			{!currentMember.id ? (
				<div>
					<p>Not a member</p>
					<button onClick={handleJoinBoard}>Join Board</button>
				</div>
			) : (
				<div className='h-full'>
					<h1 className='text-xl'>{board.name}</h1>
					<br />
					<br />
					<DragDropContext
						onDragEnd={(result) => handleDragEnd(result, lists, setLists)}
					>
						<div className='flex flex-row overflow-x-scroll'>
							{lists?.map((list) => {
								return (
									<Droppable key={list.id} droppableId={list.id?.toString()}>
										{(provided, snapshot) => {
											return (
												<div
													ref={provided.innerRef}
													{...provided.droppableProps}
													style={{
														background: snapshot.isDraggingOver
															? "lightblue"
															: "",
													}}
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
						</div>
						<br />
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
					</DragDropContext>
				</div>
			)}
		</>
	)
}

export default Board
