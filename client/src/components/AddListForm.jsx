import React from "react"

function AddListForm({ addListFormState, setAddListFormState, handleAddList }) {
	function handleSubmit(event) {
		event.preventDefault()
		handleAddList()
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		setAddListFormState((formState) => ({ ...formState, [name]: value }))
	}

	return (
		<div>
			<form onSubmit={handleSubmit} autoComplete='false'>
				<label>name</label>
				<input
					type='text'
					placeholder='enter a name'
					name='name'
					value={addListFormState.name}
					onChange={handleChange}
					className='placeholder:italic placeholder:text-slate-400'
				/>
			</form>
		</div>
	)
}

export default AddListForm
