import { useEffect, useState } from "react";
import { getDepartment, getEmployees } from "./firebase/api";
import axios from "./api/axios";

export default function Employee() {
	const [employees, setEmployees] = useState([]);

	const fetchEmployees = async () => {
		const list = [];
		const employeeData = await getEmployees();

		for (const employeeDoc of employeeData) {
			const rawDept = employeeDoc.department_id;
			let departmentId = null;

			if (typeof rawDept === "string") {
				departmentId = rawDept.split("/").pop();
			} else if (rawDept?._key?.path?.segments) {
				const segments = rawDept._key.path.segments;
				departmentId = segments[segments.length - 1];
			}

			let departmentName = null;

			if (departmentId) {
				const deptDoc = await getDepartment(departmentId);
				if (deptDoc) {
					departmentName = deptDoc.name;
				}
			}

			list.push({
				...employeeDoc,
				department_id: departmentId,
				department_name: departmentName,
			});
		}
		setEmployees([...list]);
	};

	const projects = {
		departmentId: "T2R2UmQQhN3aN9qP9NFM",
		projects: [
			{
				name: "Proj3",
				budget: 12000,
				deadline: "2025-08-27T00:00:00.000Z",
			},
			{
				name: "Proj4",
				budget: 15000,
				deadline: "2025-09-15T00:00:00.000Z",
			},
		],
	};

	useEffect(() => {
		fetchEmployees();
	}, []);

	const addProjects = () => {
		axios
			.post("/add-projects", projects)
			.then((res) => {
				console.log("projects has been added successfully", res);
			})
			.catch((err) => {
				console.log("error adding projects", err);
			});
	};

	return (
		<div className='min-h-screen bg-gray-50 py-10 px-6 w-full'>
			<div className='rounded-3xl w-full'>
				<div className='flex justify-between items-center mb-8'>
					<h2 className='text-3xl font-bold text-gray-800 text-center'>
						Employee Records
					</h2>
					<button
						className='p-2 text-black bg-gray-100 border border-gray-400 rounded-md cursor-pointer'
						onClick={addProjects}
					>
						Add Projects
					</button>
				</div>

				{employees.length === 0 ? (
					<p className='text-gray-500 text-center'>
						No employee data available.
					</p>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{employees.map((emp) => (
							<div
								key={emp.id}
								className='bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow border border-gray-200 text-left'
							>
								<h3 className='text-xl font-semibold text-gray-800 mb-1'>
									{emp.first_name} {emp.last_name}
									<p className='text-gray-500 text-sm'>
										({emp.department_name})
									</p>
								</h3>
								<p className='text-gray-500 text-sm'>{emp.email}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
