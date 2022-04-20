import React, { useContext, useState, useEffect } from "react"
import { useMemberUpdate } from "./MemberContext"

export const UserContext = React.createContext()
export const UserUpdateContext = React.createContext()

//custom hooks
export function useUser() {
	return useContext(UserContext)
}

export function useUserUpdate() {
	return useContext(UserUpdateContext)
}

//provider
export function UserProvider({ children }) {
	const [currentUser, setCurrentUser] = useState({})

	const handleSetMember = useMemberUpdate()

	//auto login if session cookie is present
	useEffect(() => {
		fetch("/autologin").then((r) => {
			if (r.ok) {
				r.json().then((user) => {
					handleSetUser(user)
					handleSetMember(user.members)
				})
			}
		})
	}, [])

	function handleSetUser(user) {
		setCurrentUser(user)
	}

	return (
		<UserContext.Provider value={currentUser}>
			<UserUpdateContext.Provider value={handleSetUser}>
				{children}
			</UserUpdateContext.Provider>
		</UserContext.Provider>
	)
}
