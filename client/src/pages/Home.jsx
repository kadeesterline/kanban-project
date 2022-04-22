import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { FaGithub } from "react-icons/fa"

function Home() {
	return (
		<div className='grid place-items-center h-100  overflow-y-clip'>
			<div className='border-4 p-5 mt-20 rounded-full shadow-lg hover:shadow-blue-500 border-blue-400 z-50 bg-blue-100 transition ease-in-out duration-300 hover:-translate-y-2 hover:scale-110'>
				<Link to='/login'>
					<h1 className='font-bold text-4xl'>KanBan</h1>
					<h2 className='font-bold text-2xl'> Get Started </h2>
				</Link>
			</div>
			<div className='mt-20'>
				<a href='https://github.com/kadeesterline/kanban-project/'>
					{" "}
					<FaGithub />{" "}
				</a>
			</div>
			{/*<div className="opacity-25 fixed inset-0 z-40 bg-blue-200"></div>*/}
		</div>
	)
}

export default Home
