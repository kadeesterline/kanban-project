import React from "react"
import { useState } from "react"
import TaskEdit from "./TaskEdit"

function Task({ tasks, setTasks, task }) {
	const [showEditTask, setShowEditTask] = useState(false)

	function handleShowEditTask() {
		setShowEditTask(!showEditTask)
	}

	return (
		<div className='bg-white border border-solid m-2'>
			{task.title}&nbsp;
			<button
				onClick={handleShowEditTask}
				className='rounded-full bg-slate-200 hover:bg-slate-300 m-2 px-2 text-sm'
			>
				Edit
			</button>
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
