import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUser, useUserUpdate } from "../context/UserContext"

function Signup() {
	const [user, setUser] = useState({
		username: "",
		password: "",
		password_confirmation: "",
	})

	let navigate = useNavigate()
	const currentUser = useUser()
	const handleSetUser = useUserUpdate()

	function fetchSignup(e) {
		e.preventDefault()
		fetch("/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		}).then((r) => {
			if (r.ok) {
				r.json().then((user) => {
					handleSetUser(user)
					navigate("/boards")
				})
			}
		})
	}

	function handleChange(e) {
		const { name, value } = e.target

		setUser((user) => ({ ...user, [name]: value }))
	}

	return (
		<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
			<div className='relative w-auto my-6 mx-auto max-w-3xl'>
				<div className='border rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none'>
					<div className='flex items-start justify-center p-5 bg-blue-100 border-b border-solid border-slate-200 rounded-t text-2xl font-bold'>
						Welcome! Sign up here
					</div>
					<form autoComplete='false' onSubmit={(e) => fetchSignup(e)}>
						<div className='grid grid-rows-1  m-2 p-2'>
							<label htmlFor='username'>Username:</label>
							<input
								autoComplete='false'
								type='text'
								name='username'
								onChange={(e) => handleChange(e)}
								value={user.username}
								className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
							></input>
						</div>
						<div className='grid grid-rows-1  m-2 p-2'>
							<label htmlFor='pass'>Password (8 characters minimum):</label>
							<input
								type='password'
								name='password'
								onChange={(e) => handleChange(e)}
								value={user.password}
								className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
							></input>
						</div>
						<div className='grid grid-rows-1 m-2 p-2'>
							<label htmlFor='pass'>Confirm Password:</label>
							<input
								type='password'
								name='password_confirmation'
								onChange={(e) => handleChange(e)}
								value={user.password_confirmation}
								className='border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
							></input>
						</div>
						<input
							type='submit'
							value='Sign up'
							className='rounded-full bg-blue-200 p-2 m-2 ml-auto border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none'
						/>
					</form>
					<Link
						to='/login'
						className='rounded-full bg-blue-200 p-2 m-2 ml-auto border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none'
					>
						Log in
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Signup
