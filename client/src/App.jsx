import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React, { useEffect } from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Boards from "./pages/Boards"
import Board from "./pages/Board"
import NavBar from "./pages/NavBar"
import { UserProvider } from "./context/UserContext"
import { MemberProvider } from "./context/MemberContext"

function App() {
	return (
		<MemberProvider>
			<UserProvider>
				<Router>
					<NavBar />
					<Routes>
						<Route index element={<Home />}></Route>
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/boards' element={<Boards />} />
						<Route path='/boards/:id' element={<Board />} />
						<Route path='*' element={<p>There's nothing here: 404</p>} />
					</Routes>
				</Router>
			</UserProvider>
		</MemberProvider>
	)
}

export default App
