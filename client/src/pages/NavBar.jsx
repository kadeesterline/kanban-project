import React from "react"
import { Link, NavLink } from "react-router-dom"
import { useUser, useUserUpdate } from "../context/UserContext"

function NavBar() {
	const currentUser = useUser()
	const handleSetUser = useUserUpdate()

	function handleLogout() {
		fetch("/logout", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => handleSetUser({}))
	}

	let activeClass =
		"rounded-full bg-blue-300 m-2 px-1 text-sm border-2 border-blue-500"
	let inactiveClass =
		"rounded-full bg-blue-200 m-2 px-1 text-sm border-2 border-blue-200"

	return (
		<div className='flex justify-end bg-amber-100 py-1 border-b-2 border-amber-200 sticky top-0'>
			<nav className=''>
				{currentUser.id ? (
					<>
						<span className='text-sm font-medium'>
							Signed in as {currentUser.username}
						</span>
						<Link className={inactiveClass} onClick={handleLogout} to='/'>
							Logout
						</Link>
					</>
				) : (
					<NavLink
						className={({ isActive }) =>
							isActive ? activeClass : inactiveClass
						}
						to='/login'
					>
						Log in
					</NavLink>
				)}
				<NavLink
					className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
					to='/boards'
				>
					Boards
				</NavLink>
				<NavLink
					className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
					to='/'
				>
					Home
				</NavLink>
			</nav>
		</div>
	)
}

export default NavBar
