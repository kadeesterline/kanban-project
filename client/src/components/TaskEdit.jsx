import React from "react"
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import { FiX } from "react-icons/fi"

function TaskEdit({ tasks, setTasks, task, setShowEditTask }) {
	let editTaskFormInitialState = {
		title: task.title,
		content: task.content,
		priority: task.priority,
		due_date: task.due_date,
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
				setShowEditTask(false)
			})
	}

	function handleHideModal() {
		setShowEditTask(false)
	}

	return (
		<div>
			<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
				<div className='relative w-auto my-6 mx-auto max-w-3xl'>
					{/* content */}
					<div className='border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
						{/* header */}
						<div className='flex items-start justify-between p-5 border border-solid bg-slate-200 rounded-t'>
							<h3 className='text-black float-left text-3xl font-bold'>
								{" "}
								{task.title}{" "}
							</h3>
							<button
								className='p-1 ml-auto bg-transparent border-0 text-black opacity-40 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
								onClick={handleHideModal}
							>
								<span className=''>
									<FiX />
								</span>
							</button>
						</div>
						<form onSubmit={handleEditTaskSubmit} autoComplete='false'>
							<div className='grid grid-rows-1 m-2 p-1'>
								<label className='font-bold'> Task Title: </label>
								<input
									autoComplete='xyz123'
									type='text'
									placeholder='Enter a new title...'
									id='title-input'
									name='title'
									value={editTaskFormState.title}
									onChange={handleFormChange}
									className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-400'
								/>
							</div>

							<div className='grid grid-rows-1 m-2 p-1'>
								<label className='font-bold'> Description: </label>

								<input
									autoComplete='123'
									type='text'
									placeholder='Enter a new description...'
									id='description-input'
									name='content'
									value={editTaskFormState.content}
									onChange={handleFormChange}
									className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-400'
								/>
							</div>

							<div className='float-left m-2 p-1'>
								<label className='font-bold m-2 p-1'>
									{" "}
									Priority:{" "}
									<span className='font-normal'> {task.priority} </span>
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
							</div>
							<div className='float-left m-2 p-1'>
								<label className='font-bold m-2 p-1'>
									{" "}
									Due Date:{" "}
									<span className='font-normal'>
										{task?.due_date
											? dayjs(task.due_date).format("MM/DD/YYYY")
											: "No date"}
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
							</div>

							{/* <button className='rounded-full bg-yellow-200 m-2 p-1' type='submit'>
								{" "}
								Submit Changes{" "}
							</button> */}
						</form>
						<div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
							<button
								className=' rounded-full bg-blue-200 hover:bg-blue-300  p-2 m-2 ml-auto border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none '
								type='submit'
								onClick={handleEditTaskSubmit}
							>
								submit changes
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='opacity-50 fixed inset-0 z-40 bg-black'></div>
		</div>
	)
}

export default TaskEdit
