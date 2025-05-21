import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Layout = () => {
	return (
		<div className='h-screen w-screen flex flex-col overflow-y-auto bg-[#f4f0ed]'>
			<Navbar />
			<div className="flex-1 overflow-y-auto">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
