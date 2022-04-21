import React from "react"
import { useNavigate } from "react-router-dom"

function BoardCell({ name, id }) {
	let navigate = useNavigate()

	function handleBoardCellClick() {
		navigate(`/boards/${id}`)
	}

	return (
		<div
			className=' font-bold text-4xl flex items-center justify-center m-2 p-1 bg-white border-2 border-solid rounded-lg shadow-lg  h-40'
			onClick={handleBoardCellClick}
		>
			{name}
		</div>
	)
}

export default BoardCell

//onClick={handleBoardCellClick}
