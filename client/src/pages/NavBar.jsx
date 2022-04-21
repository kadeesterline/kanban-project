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
		"rounded-full bg-blue-300 hover:bg-blue-400 m-3 px-2 py-1/2 text-sm border border-blue-500"
	let inactiveClass =
		"rounded-full bg-blue-200 hover:bg-blue-300 m-3 px-2 py-1/2 text-sm border border-blue-200"

	return (
		<div className=' bg-amber-100 py-1 border-b-2 border-amber-200 sticky top-0'>
			<nav className='flex justify-between'>
				<div>
					<NavLink
						className={({ isActive }) =>
							isActive ? activeClass : inactiveClass
						}
						to='/'
					>
						Home
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							isActive ? activeClass : inactiveClass
						}
						to='/boards'
					>
						Boards
					</NavLink>
				</div>

				{currentUser.id ? (
					<div>
						<span to='' className='text-sm font-medium'>
							Signed in as {currentUser.username}
						</span>
						<Link className={inactiveClass} onClick={handleLogout} to='/'>
							Logout
						</Link>
					</div>
				) : (
					<div>
						<NavLink
							className={({ isActive }) =>
								isActive ? activeClass : inactiveClass
							}
							to='/login'
						>
							Log in
						</NavLink>
					</div>
				)}
			</nav>
		</div>
	)
}

export default NavBar
