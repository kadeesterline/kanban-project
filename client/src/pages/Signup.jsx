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
		<div>
			Signup here!
			<form onSubmit={(e) => fetchSignup(e)}>
				<label htmlFor='username'>Username:</label>
				<input
					type='text'
					name='username'
					onChange={(e) => handleChange(e)}
					value={user.username}
					className='bg-slate-300'
				></input>
				<label htmlFor='pass'>Password (8 characters minimum):</label>
				<input
					type='password'
					name='password'
					onChange={(e) => handleChange(e)}
					value={user.password}
					className='bg-slate-300'
				></input>
				<label htmlFor='pass'>Confirm Password:</label>
				<input
					type='password'
					name='password_confirmation'
					onChange={(e) => handleChange(e)}
					value={user.password_confirmation}
					className='bg-slate-300'
				></input>
				<input type='submit' value='Sign up' />
			</form>
			<Link to='/login'>Log in</Link>
		</div>
	)
}

export default Signup
