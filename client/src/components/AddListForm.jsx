import React from "react"

function AddListForm({ addListFormState, setAddListFormState, handleAddList }) {
	function handleSubmit() {
		handleAddList()
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		setAddListFormState((formState) => ({ ...formState, [name]: value }))
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>name</label>
				<input
					type='text'
					placeholder='enter a name'
					name='name'
					value={addListFormState.name}
					onChange={handleChange}
				/>
			</form>
		</div>
	)
}

export default AddListForm
