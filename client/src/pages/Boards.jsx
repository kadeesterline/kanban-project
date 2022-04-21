import React from "react"
import { useEffect, useState } from "react"
import BoardCell from "../components/BoardCell"
import AddBoardForm from "../components/AddBoardForm"
import { useUser } from "../context/UserContext"
import { useMember } from "../context/MemberContext"

function Boards() {
	const [boards, setBoards] = useState([])
	const [showAddBoard, setShowAddBoard] = useState(false)

	const currentUser = useUser()
	const currentMemberArray = useMember()

	let initialAddBoardFormState = {
		name: "",
		user_id: currentUser.id,
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
			.then((boards) => setBoards(boards))
			.catch((error) => console.log(error))
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
			.then((r) => r.json())
			.then((newBoard) => setBoards([...boards, newBoard]))
	}

	const boardCells =
		boards.length > 0 &&
		boards?.map((board) => (
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
