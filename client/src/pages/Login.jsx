import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUser, useUserUpdate } from "../context/UserContext"
import { useMember, useMemberUpdate } from "../context/MemberContext"

function Login() {
	const [user, setUser] = useState({
		username: "",
		password: "",
	})

	let navigate = useNavigate()

	const currentUser = useUser()
	const handleSetUser = useUserUpdate()
	const currentMember = useMember()
	const handleSetMember = useMemberUpdate()

	function fetchLogin(e) {
		e.preventDefault()

		fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((r) => {
				if (r.ok) {
					r.json().then((user) => {
						console.log(user)
						handleSetMember(user.members)
						handleSetUser(user)
						navigate("/boards")
					})
				}
			})
			.catch((error) => console.log(error))
	}

	function handleChange(e) {
		const { name, value } = e.target

		setUser((user) => ({ ...user, [name]: value }))
	}
	return (
		<div className='relative w-1/4 my-6 mx-auto max-w-3xl'>
			<div className='border rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none'>
				<div className='flex items-start justify-center p-5 bg-blue-100 border-b border-solid border-slate-200 rounded-t text-2xl font-bold'>
					Log in
				</div>
				<form autoComplete='false' onSubmit={(e) => fetchLogin(e)}>
					<div className='grid grid-rows-1  m-2 p-2'>
						<label htmlFor='username'>Username:</label>
						<input
							type='text'
							name='username'
							onChange={(e) => handleChange(e)}
							value={user.username}
							className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
						></input>
					</div>
					<div className='grid grid-rows-1  m-2 p-2'>
						<label htmlFor='pass'>Password:</label>
						<input
							type='password'
							name='password'
							onChange={(e) => handleChange(e)}
							value={user.password}
							className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
						></input>
					</div>
					<input
						type='submit'
						value='Log in'
						className='rounded-full bg-blue-200 hover:bg-blue-300 hover:cursor-pointer p-2 m-2 ml-auto border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none'
					/>
				</form>
				<Link
					to='/signup'
					className='rounded-full bg-blue-200 hover:bg-blue-300 p-2 m-2 ml-auto border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none'
				>
					Sign up{" "}
				</Link>
			</div>
		</div>
	)
}

export default Login
