const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");
const db = require("./firebase");

const app = express();
app.use(cors());
app.use(express.json());

const employeeCollection = db.collection("employee");
const departmentCollection = db.collection("departments");

// Read Employee
app.get("/employee", async (req, res) => {
	try {
		const snapshot = await employeeCollection.get();
		console.log("snapshot", snapshot.docs);
		const employee = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		console.log("employee", employee);
		res.send(employee);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Create Employee
app.post("/add-employee", async (req, res) => {
	try {
		const employee = req.body;
		console.log("add employee", employee);
		const docRef = await employeeCollection.add(employee);
		res.status(201).send({ id: docRef.id });
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Create Projects
// app.post("/add-projects", async (req, res) => {
//   try {
//     const projects = req.body;
//     console.log('projects', projects);
//     const docRef = await departmentCollection.add(projects);
//     res.status(201).send({ id: docRef.id });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

app.post("/add-projects", async (req, res) => {
	try {
		const { departmentId, projects } = req.body;

		console.log("departmentId", departmentId);
		console.log("projects", projects);

		if (!departmentId || !Array.isArray(projects)) {
			return res.status(400).send("Missing departmentId or projects array.");
		}

		const projectsRef = db.collection(
			`departments/${departmentId}/projects`
		);

		const addedProjects = [];

		for (const project of projects) {
			const docRef = await projectsRef.add(project);
			addedProjects.push({ id: docRef.id, ...project });
		}

		res.status(201).send({ success: true, projects: addedProjects });
	} catch (err) {
		console.error("Error adding projects:", err);
		res.status(500).send(err.message);
	}
});

app.listen(3000, () => {
	console.log("Backend running on http://localhost:3000");
});
