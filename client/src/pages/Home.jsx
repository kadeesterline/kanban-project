import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function Home() {
	return (
		<div className='grid place-content-center h-screen overflow-y-clip'>
			<h1 className='font-bold text-4xl'>KanBan</h1>
			<Link
				className='rounded-full bg-blue-300 m-2 px-1 text-xl border-2 border-blue-300 hover:border-blue-500'
				to='/login'
			>
				Get started
			</Link>
		</div>
	)
}

export default Home
