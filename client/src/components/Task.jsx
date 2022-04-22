import React from "react"
import { useState } from "react"
import TaskEdit from "./TaskEdit"
import { FiCheck } from "react-icons/fi"

function Task({ tasks, setTasks, task }) {
	const [showEditTask, setShowEditTask] = useState(false)

	function handleShowEditTask() {
		setShowEditTask(!showEditTask)
	}

	function handleCompleteTask(event) {
		event.preventDefault()

		fetch(`/tasks/${task.id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/JSON",
				accept: "application/JSON",
			},
		}).then((r) => {
			if (r.ok) {
				let updatedTasks = tasks.filter((t) => t.id !== task.id)
				setTasks(updatedTasks)
			}
		})
	}

	return (
		<div className='grid grid-cols-5 bg-white border border-solid rounded m-2 p-2'>
			<div className='col-span-4'>
				<h2>
					{task.title}{" "}
					{task?.priority && (
						<span className='text-sm font-mono rounded-full border ml-2 p-1'>
							{task.priority}
						</span>
					)}
				</h2>
			</div>
			<div className='flex justify-end'>
				<button
					onClick={handleShowEditTask}
					className='rounded-full hover:text-yellow-500 m-2 px-2 text-sm'
				>
					Edit
				</button>
				<button
					onClick={handleCompleteTask}
					className='rounded-full bg-slate-200 hover:bg-green-300 m-2 p-1 text-sm'
				>
					<FiCheck />
				</button>
			</div>

			{showEditTask ? (
				<TaskEdit
					task={task}
					tasks={tasks}
					setTasks={setTasks}
					setShowEditTask={setShowEditTask}
				/>
			) : null}
			{/* <div>{task.rank}</div> */}
		</div>
	)
}

export default Task
