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
		<div className='p-4'>
			<div className='grid grid-cols-4 '>{boardCells}</div>
			<div className='flex items-center justify-center'>
				<div className='grid grid-rows-1'>
					<button
						className='rounded-full bg-blue-200 mt-5 p-2 hover:bg-blue-300 hover:shadow-lg hover:shadow-blue-300 transition ease-in-out'
						onClick={handleShowAddBoard}
					>
						{showAddBoard ? "Hide Form" : "Add Board"}
					</button>
				</div>

				<div>
					{showAddBoard ? (
						<AddBoardForm
							addBoardFormState={addBoardFormState}
							setAddBoardFormState={setAddBoardFormState}
							handleAddBoard={handleAddBoard}
						/>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default Boards
