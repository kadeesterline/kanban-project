import React from "react"
import { Link } from "react-router-dom"

function NavBar() {
	return (
		<div className='bg-yellow-100  p-3'>
			<nav className=''>
				<Link className='rounded-full bg-blue-200 m-2 p-1' to='/login'>
					Log in
				</Link>
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
