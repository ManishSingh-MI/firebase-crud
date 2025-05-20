import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Employee from "./pages/Employee";
import EmployeeProjects from './pages/EmployeeProjects';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Navigate to='/employees' />} />
				<Route path='/employees' element={<Employee />} />
				<Route path='/employee/:employeeId/projects' element={<EmployeeProjects />} />
			</Routes>
		</Router>
	);
}

export default App;
