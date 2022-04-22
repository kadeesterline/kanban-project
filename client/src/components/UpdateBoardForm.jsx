import React from "react"

function UpdateBoardForm({
	updateFormState,
	setUpdateFormState,
	handleUpdateBoard,
}) {
	const handleChange = (event) => {
		const { name, value } = event.target
		setUpdateFormState((formState) => ({ ...formState, [name]: value }))
	}

	function handleSubmit(event) {
		event.preventDefault()
		handleUpdateBoard()
	}
	return (
		<div className='bg-white   w-80 m-2 p-2'>
			<form onSubmit={handleSubmit} autoComplete='false'>
				<label className='font-bold'>name:</label>{" "}
				<input
					type='text'
					placeholder='enter new name'
					name='name'
					value={updateFormState.name}
					onChange={handleChange}
					className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-400'
				/>
				<button className='rounded-full bg-green-200 m-2 p-1' type='submit'>
					{" "}
					Submit{" "}
				</button>
			</form>
		</div>
	)
}

export default UpdateBoardForm
