import React from "react"
import { useState } from "react"

function TaskEdit({ tasks, setTasks, task, setShowEditTask }) {
	let editTaskFormInitialState = {
		title: "",
		content: "",
		priority: 0,
		due_date: "",
	}

	const [editTaskFormState, setEditTaskFormState] = useState(
		editTaskFormInitialState
	)

	const handleFormChange = (event) => {
		const { name, value } = event.target
		setEditTaskFormState((editTaskFormState) => ({
			...editTaskFormState,
			[name]: value,
		}))
	}

	let id = task.id

	function handleEditTaskSubmit(event) {
		event.preventDefault()

		console.log(id)
		console.log(editTaskFormState)
		fetch(`/tasks/${id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/JSON",
				accept: "application/JSON",
			},
			body: JSON.stringify(editTaskFormState),
		})
			.then((r) => r.json())
			.then((task) => {
				let updatedTasks = tasks.map((t) => {
					if (t.id === task.id) {
						return task
					} else {
						return t
					}
				})
				setTasks(updatedTasks)
			})
	}

	function handleHideModal() {
		setShowEditTask(false)
	}

	// let date = task?.due_date
	// console.log(date)

	//  let formattedDate = `${(date?.getMonth() + 1)}/${date?.getDate()}/${date?.getFullYear()}`
	// console.log(formattedDate)

	return (
		<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
			<div className='relative w-auto my-6 mx-auto max-w-3xl'>
				{/* content */}
				<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
					{/* header */}
					<div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
						<h3 className='text-black float-left text-3xl'> {task.title} </h3>
						<button
							className='p-1 ml-auto bg-transparent border-0 text-black opacity-40 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
							onClick={handleHideModal}
						>
							<span className=''>X</span>
						</button>
					</div>
					<form onSubmit={handleEditTaskSubmit} autoComplete='false'>
						<div className='grid grid-rows-1'>
							<label className='font-bold'>
								{" "}
								Task Title: <span className='font-normal'>
									{" "}
									{task.title}{" "}
								</span>{" "}
							</label>
							<input
								type='text'
								placeholder='Enter a new title'
								id='title-input'
								name='title'
								value={editTaskFormState.title}
								onChange={handleFormChange}
								className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
							/>
						</div>

						<div className='grid grid-rows-1'>
							<label className='font-bold'>
								{" "}
								Description:{" "}
								<span className='font-normal'> {task.content}</span>{" "}
							</label>

							<input
								type='text'
								placeholder='Enter a new description'
								id='description-input'
								name='content'
								value={editTaskFormState.content}
								onChange={handleFormChange}
								className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
							/>
						</div>

						<label className='font-bold'>
							{" "}
							Priority: <span className='font-normal'> {task.priority} </span>
						</label>
						<select
							name='priority'
							id='priority-input'
							value={editTaskFormState.priority}
							onChange={handleFormChange}
							className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
						>
							<option> 1 </option>
							<option> 2 </option>
							<option> 3 </option>
							<option> 4 </option>
							<option> 5 </option>
						</select>

						<label className='font-bold'>
							{" "}
							Due Date: <span className='font-normal'>
								{/*formattedDate*/}
							</span>{" "}
						</label>
						<input
							type='date'
							id='duedate-input'
							name='due_date'
							value={editTaskFormState.due_date}
							onChange={handleFormChange}
							className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
						/>

						{/* <button className='rounded-full bg-yellow-200 m-2 p-1' type='submit'>
								{" "}
								Submit Changes{" "}
							</button> */}
					</form>
					<div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
						<button
							className=' rounded-full bg-yellow-200 p-1 ml-auto border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none '
							type='submit'
							onClick={handleEditTaskSubmit}
						>
							submit changes
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TaskEdit
