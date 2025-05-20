import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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
