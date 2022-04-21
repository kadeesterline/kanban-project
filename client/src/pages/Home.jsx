import React, { useEffect } from "react"
import { Link } from "react-router-dom"
// import { useUserUpdate } from "../context/UserContext"

function Home() {
	// const handleSetUser = useUserUpdate()

	// useEffect(() => {
	// 	fetch("/autologin").then((r) => {
	//     if (r.ok) {
	//       r.json().then((user) => handleSetUser(user));
	//     }
	//   });

	// }, [])

	return (
		<div>
			<h1 className='font-bold text-7xl'>KanBan</h1>
			<Link to='/login' className='rounded-full bg-blue-200 m-2 p-1'>
				Get Started
			</Link>
		</div>
	)
}

export default Home
