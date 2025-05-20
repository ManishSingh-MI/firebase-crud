import { useEffect, useState } from "react";
import { getDepartment, getEmployees } from "../firebase/api";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Employee() {
	const [employees, setEmployees] = useState([]);
	const navigate = useNavigate();

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
				name: "Project 13",
				budget: 36000,
				deadline: "2025-03-21T00:00:00.000Z",
				start_date: "2024-04-06T00:00:00.000Z",
			},
			// {
			// 	name: "Project 6",
			// 	budget: 15000,
			// 	deadline: "2025-09-15T00:00:00.000Z",
			// 	start_date: "2025-03-10T00:00:00.000Z",
			// },
			// {
			// 	name: "Project 7",
			// 	budget: 18000,
			// 	deadline: "2025-12-01T00:00:00.000Z",
			// 	start_date: "2025-04-01T00:00:00.000Z",
			// },
			// {
			// 	name: "Project 8",
			// 	budget: 9500,
			// 	deadline: "2025-07-15T00:00:00.000Z",
			// 	start_date: "2025-01-20T00:00:00.000Z",
			// },
			// {
			// 	name: "Project 9",
			// 	budget: 22000,
			// 	deadline: "2026-02-10T00:00:00.000Z",
			// 	start_date: "2025-06-01T00:00:00.000Z",
			// },
			// {
			// 	name: "Project 10",
			// 	budget: 13500,
			// 	deadline: "2025-11-20T00:00:00.000Z",
			// 	start_date: "2025-03-15T00:00:00.000Z",
			// },
			// {
			// 	name: "Project 11",
			// 	budget: 17500,
			// 	deadline: "2025-10-05T00:00:00.000Z",
			// 	start_date: "2025-04-25T00:00:00.000Z",
			// },
			// {
			// 	name: "Project 12",
			// 	budget: 25000,
			// 	deadline: "2026-03-01T00:00:00.000Z",
			// 	start_date: "2025-07-10T00:00:00.000Z",
			// },
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
								className='bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow border border-gray-200 text-left cursor-pointer'
								onClick={() => navigate(`/employee/${emp.id}/projects`)}
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
