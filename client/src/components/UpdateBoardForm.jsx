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
		<div className='bg-white border border-solid  w-80'>
			<form onSubmit={handleSubmit} autoComplete='false'>
				<label className='font-bold'>name:</label>{" "}
				<input
					type='text'
					placeholder='enter new name'
					name='name'
					value={updateFormState.name}
					onChange={handleChange}
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
