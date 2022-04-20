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
		}).then((r) => {
			if (r.ok) {
				r.json().then((user) => {
					console.log(user)
					handleSetMember(user.members)
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
			Log in
			<p>Current user:</p>
			<form onSubmit={(e) => fetchLogin(e)}>
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
				<input type='submit' value='Log in' />
			</form>
			<Link to='/signup'>Sign up </Link>
		</div>
	)
}

export default Login
