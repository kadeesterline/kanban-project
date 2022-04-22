import { useUser } from "../context/UserContext"

function Profile() {
	const currentUser = useUser()

	console.log(currentUser)

	if (Object.keys(currentUser).length === 0) {
		return <div></div>
	}

	return (
		<div className='relative w-1/4 my-6 mx-auto max-w-3xl mt-20'>
			<div className='border rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none'>
				<div className='p-4'>
					<h1 className='font-semibold'>Welcome, {currentUser.username}</h1>
					<br />
					<div className='rounded-lg border border-solid p-2'>
						<p>You are a member of boards: </p>
						<ul>
							{currentUser?.boards.map((board) => (
								<li key={board.id}>{board.name}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
