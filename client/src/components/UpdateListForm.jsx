import React from "react"

function UpdateListForm({
	updateListFormState,
	setUpdateListFormState,
	handleUpdateList,
}) {
	const handleChange = (event) => {
		const { name, value } = event.target
		setUpdateListFormState((formState) => ({ ...formState, [name]: value }))
	}

	function handleSubmit(event) {
		event.preventDefault()
		handleUpdateList()
		setUpdateListFormState({ name: "" })
	}

	return (
		<div>
			<form className='p-2' onSubmit={handleSubmit} autoComplete='false'>
				<input
					type='text'
					placeholder='Enter a new name'
					name='name'
					value={updateListFormState.name}
					onChange={handleChange}
					className='border rounded w-full py-2 px-3 float-left text-gray-700 focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-400'
				/>
			</form>
		</div>
	)
}

export default UpdateListForm
