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
				<label>name</label>
				<input
					type='text'
					placeholder='enter a name'
					name='name'
					value={addBoardFormState.name}
					onChange={handleChange}
				/>
			</form>
		</div>
	)
}

export default AddBoardForm
