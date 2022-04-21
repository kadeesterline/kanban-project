import React from "react"
import { Link } from "react-router-dom"
import { useUser } from "../context/UserContext"

function NavBar() {
	const currentUser = useUser()

	return (
		<div className='bg-yellow-100  p-3'>
			<nav className=''>
				{currentUser.id ? (
					<span>Signed in as {currentUser.username}</span>
				) : (
					<Link className='rounded-full bg-blue-200 m-2 p-1' to='/login'>
						Log in
					</Link>
				)}
				<Link className='rounded-full bg-blue-200 m-2 p-1' to='/'>
					Home
				</Link>
				<Link className='rounded-full bg-blue-200 m-2 p-1' to='/boards'>
					Boards
				</Link>
			</nav>
		</div>
	)
}

export default NavBar
