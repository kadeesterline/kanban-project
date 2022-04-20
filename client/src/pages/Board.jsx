import React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import UpdateBoardForm from "../components/UpdateBoardForm"
import AddListForm from "../components/AddListForm"
import List from "../components/List"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useMember } from "../context/MemberContext"

function Board() {
	let navigate = useNavigate()
	let { id } = useParams() //id of board
	const currentMemberArray = useMember()

	const [board, setBoard] = useState([])
	const [lists, setLists] = useState([])
	const [boardMembers, setBoardMembers] = useState([])
	const [currentMember, setCurrentMember] = useState({})
	const [showUpdateBoard, setShowUpdateBoard] = useState(false)
	const [showAddListForm, setShowAddListForm] = useState(false)

	let initialUpdateFormState = { name: "",}
	const [updateFormState, setUpdateFormState] = useState(initialUpdateFormState)
	const [addListFormState, setAddListFormState] = useState(
		initialUpdateFormState
	)

	//sets the current member of the board
	useEffect(() => {
		if (boardMembers.length > 0 && currentMemberArray.length > 0) {
				let member = boardMembers.find((bMember) => {
					return currentMemberArray.filter((member) => {
						return member.id === bMember.id
					})
				})
				setCurrentMember(member)
			console.log("currentMember: ", currentMember)
		}

	}, [currentMember, boardMembers, currentMemberArray])

	useEffect(() => {
		fetch(`/boards/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((r) => r.json())
			.then((board) => {
				setBoard(board)
				setLists(board.lists)
				setBoardMembers(board.members)
			})
	}, [id])

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
	}

	function handleShowAddList() {
		setShowAddListForm(!showAddListForm)
	}

	function handleShowEditBoard() {
		setShowUpdateBoard(!showUpdateBoard)
	}

	function handleDragEnd(result, lists, setLists) {
		console.log(result)
		if (!result.destination) return
		const { source, destination } = result
		const list = lists[source.droppableId]
	}

	return (
		<div className='h-100'>
			<DragDropContext
				onDragEnd={(result) => handleDragEnd(result, lists, setLists)}
			>
				<h1 className='text-xl'>{board.name}</h1>
				<br />
				<br />
				<div className='grid grid-cols-3'>
					{lists?.map((list) => {
						return (
							<Droppable key={list.id} droppableId={list.id.toString()}>
								{(provided, snapshot) => {
									return (
										<div
											ref={provided.innerRef}
											{...provided.droppableProps}
											style={{
												background: snapshot.isDragginOver ? "lightblue" : "",
											}}
										>
											<List
												list={list}
												lists={lists}
												setLists={setLists}
												currentMember={currentMember}
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
	)
}

export default Board
