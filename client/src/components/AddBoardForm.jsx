import React from "react"

function AddBoardForm({
	addBoardFormState,
	setAddBoardFormState,
	handleAddBoard,
}) {
	const handleChange = (event) => {
		const { name, value } = event.target
		setAddBoardFormState((formState) => ({ ...formState, [name]: value }))
	}

	function handleSubmit(event) {
		event.preventDefault()
		handleAddBoard()
	}
	return (
		<div>
			<form onSubmit={handleSubmit} autoComplete='false'>
				<label className='font-bold'>name</label>
				<input
					type='text'
					placeholder='enter a name'
					name='name'
					value={addBoardFormState.name}
					onChange={handleChange}
					className='border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-400'
				/>
			</form>
		</div>
	)
}

export default AddBoardForm
