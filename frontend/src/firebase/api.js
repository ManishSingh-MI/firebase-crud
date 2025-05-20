import {
	collection,
	doc,
	getCountFromServer,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
} from "firebase/firestore";
import { db } from ".";

export const getEmployees = async () => {
	try {
		const snapshot = await getDocs(collection(db, "employee"));
		const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return data;
	} catch (err) {
		console.error("Error fetching employees:", err);
	}
};

export const getDepartment = async (departmentId) => {
	try {
		const deptDoc = await getDoc(doc(db, "departments", departmentId));
		return deptDoc.data() || null;
	} catch (err) {
		console.error("Error fetching employees:", err);
	}
};

export const getEmployee = async (employeeId) => {
	try {
		const empDoc = await getDoc(doc(db, "employee", employeeId));
		return empDoc.data() || null;
	} catch (err) {
		console.error("Error fetching projects:", err);
	}
};

export const getProjects = async (
	departmentId,
	pageSize = 6,
	startAfterDoc = null
) => {
	try {
		const projectRef = collection(db, "departments", departmentId, "projects");

		const projectsDoc = await getCountFromServer(projectRef);
		const projectsCount = projectsDoc.data().count;

		if (!projectsCount) {
			return { projects: [], lastVisible: null, count: 0 };
		}

		const projectsQuery = query(
			projectRef,
			orderBy("start_date"),
			...(startAfterDoc ? [startAfter(startAfterDoc)] : []),
			limit(pageSize)
		);

		const snapshot = await getDocs(projectsQuery);

		const projects = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		const lastVisible = snapshot.docs[snapshot.docs.length - 1];

		return {
			projects,
			lastVisible,
			count: projectsCount,
		};
	} catch (err) {
		console.error("Error fetching projects:", err);
		return [];
	}
};
