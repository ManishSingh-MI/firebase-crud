import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployee, getProjects } from "../firebase/api";

const EmployeeProjects = () => {
	const { employeeId } = useParams();
	const [projects, setProjects] = useState([]);
	const [lastDoc, setLastDoc] = useState(null);
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [loadingMore, setLoadingMore] = useState(false);
	const pageSize = 6;

	const getEmployeeProjects = async (loadMore = false) => {
		if (loadMore) setLoadingMore(true);
		setCurrentPage(currentPage + 1);
		const employee = await getEmployee(employeeId);
		const rawDept = employee.department_id;
		let departmentId = null;

		if (typeof rawDept === "string") {
			departmentId = rawDept.split("/").pop();
		} else if (rawDept?._key?.path?.segments) {
			const segments = rawDept._key.path.segments;
			departmentId = segments[segments.length - 1];
		}

		const {
			projects: newProjects,
			lastVisible,
			count,
		} = await getProjects(departmentId, pageSize, loadMore ? lastDoc : null);

		setTotal(count);

		if (loadMore) {
			setProjects((prev) => [...prev, ...newProjects]);
			setLoadingMore(false);
		} else {
			setProjects(newProjects);
		}

		setLastDoc(lastVisible);
	};

	useEffect(() => {
		getEmployeeProjects();
	}, []);

	return (
		<div className='min-h-screen bg-gray-100 py-10 px-6'>
			<h2 className='text-4xl font-extrabold text-gray-800 text-center mb-6'>
				Employee Projects
			</h2>

			{projects?.length === 0 ? (
				<p className='text-center text-gray-600 text-lg'>No projects found.</p>
			) : (
				<>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
						{(projects || []).map((project, index) => (
							<div
								key={index}
								className='bg-white shadow-lg rounded-2xl p-6 transition hover:shadow-xl animate-fadeIn'
							>
								<h3 className='text-xl font-semibold text-gray-700 mb-2'>
									{project.name}
								</h3>
								<p className='text-gray-700 mb-1'>
									<span className='font-medium'>Budget:</span> ${project.budget}
								</p>
								<p className='text-gray-700 mb-1'>
									<span className='font-medium'>Start:</span>{" "}
									{new Date(project.start_date).toLocaleDateString()}
								</p>
								<p className='text-gray-700'>
									<span className='font-medium'>Deadline:</span>{" "}
									{new Date(project.deadline).toLocaleDateString()}
								</p>
							</div>
						))}
					</div>
					{currentPage * pageSize < total && (
						<div className='text-center mt-8'>
							<button
								disabled={loadingMore}
								className={`px-6 py-2 bg-gray-600 border border-gray-400 text-white rounded-full transition cursor-pointer ${
									loadingMore
										? "opacity-50 cursor-not-allowed"
										: "hover:bg-gray-700"
								}`}
								onClick={() => getEmployeeProjects(true)}
							>
								{loadingMore ? "Loading..." : "Load More"}
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default EmployeeProjects;
