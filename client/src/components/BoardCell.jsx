import React from "react"
import { useNavigate } from "react-router-dom"

function BoardCell({ name, id }) {
	let navigate = useNavigate()

	function handleBoardCellClick() {
		navigate(`/boards/${id}`)
	}

	return (
		<div
			className=' font-bold text-4xl flex items-center justify-center m-2 p-1 bg-slate-100 border border-solid rounded-2xl hover:cursor-pointer hover:shadow-md hover:shadow-blue-400 h-40 hover:bg-blue-100 transition ease-in-out'
			onClick={handleBoardCellClick}
		>
			{name}
		</div>
	)
}

export default BoardCell

//onClick={handleBoardCellClick}
