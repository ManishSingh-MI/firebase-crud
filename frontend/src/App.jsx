import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Employee from "./pages/Employee";
import EmployeeProjects from "./pages/EmployeeProjects";
import Dashboard from './pages/Dashboard';
import Layout from './components/layout';

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<Navigate to='/dashboard' />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/employees' element={<Employee />} />
					<Route path='/employee/:employeeId/projects' element={<EmployeeProjects />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
