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
		<div className='m2 p-2'>
			<form onSubmit={handleSubmit} autoComplete='false'>
				<label className='font-bold'>name</label>
				<input
					type='text'
					placeholder='enter a name'
					name='name'
					value={addListFormState.name}
					onChange={handleChange}
					className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-400'
				/>
			</form>
		</div>
	)
}

export default AddListForm
