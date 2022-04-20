import React from "react"
import { useEffect, useState } from "react"
import BoardCell from "../components/BoardCell"
import AddBoardForm from "../components/AddBoardForm"
import { useUser } from "../context/UserContext"

function Boards() {
	const [boards, setBoards] = useState([])
	const [showAddBoard, setShowAddBoard] = useState(false)

	const currentUser = useUser()

	let initialAddBoardFormState = {
		name: "",
	}

	const [addBoardFormState, setAddBoardFormState] = useState(
		initialAddBoardFormState
	)

	useEffect(() => {
		fetch("/boards", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((r) => r.json())
			.then((r) => setBoards(r))
	}, [])

	function handleShowAddBoard() {
		setShowAddBoard(!showAddBoard)
	}

	function handleAddBoard() {
		fetch("/boards", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(addBoardFormState),
		})
	}

	const boardCells = boards?.map((board) => (
		<BoardCell key={board.name + board.id} name={board.name} id={board.id} />
	))
	return (
		<div>
			<div className='grid grid-cols-4'>{boardCells}</div>
			<button
				className='rounded-full bg-green-200 m-2 p-1'
				onClick={handleShowAddBoard}
			>
				{" "}
				Add Board{" "}
			</button>
			{showAddBoard ? (
				<AddBoardForm
					addBoardFormState={addBoardFormState}
					setAddBoardFormState={setAddBoardFormState}
					handleAddBoard={handleAddBoard}
				/>
			) : null}
		</div>
	)
}

export default Boards
