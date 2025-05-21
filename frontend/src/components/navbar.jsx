import { NavLink } from "react-router-dom";

// 🧭 Define nav links separately
const navLinks = [
	{ name: "Dashboard", path: "/dashboard" },
	{ name: "Employees", path: "/employees" },
];

const Navbar = () => {
	return (
		<nav className='h-20 p-4 flex justify-between items-center'>
			<div className='flex gap-5 items-center'>
				<div className='flex justify-center items-center h-10 w-10'>
					<img
						src='/src/assets/firebase-logo.svg'
						alt='Firebase Logo'
						className='w-10 h-10'
					/>
				</div>

				<ul className='flex items-center gap-6 uppercase text-[#3c4e73] font-medium'>
					{navLinks.map(({ name, path }) => (
						<li key={name}>
							<NavLink
								to={path}
								className={({ isActive }) =>
									isActive
										? "border-b-2 border-[#2b3752] text-[#2b3752] font-medium"
										: "hover:text-[#2b3752] transition"
								}
							>
								{name}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
