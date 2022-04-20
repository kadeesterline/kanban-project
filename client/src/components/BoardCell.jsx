import React from "react"
import { useNavigate } from "react-router-dom"

function BoardCell({ name, id }) {
	let navigate = useNavigate()

	function handleBoardCellClick() {
		navigate(`/boards/${id}`)
	}

	return (
		<div className='m-2 p-1 bg-teal-300' onClick={handleBoardCellClick}>
			{name}
		</div>
	)
}

export default BoardCell

//onClick={handleBoardCellClick}
