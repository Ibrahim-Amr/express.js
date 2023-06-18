import { json } from 'express';
import http from 'http';

let users = [
	{ id: 1, name: 'ibrahim', age: 25 },
	{ id: 2, name: 'fatma', age: 23 },
	{ id: 3, name: 'sasa', age: 20 },
	{ id: 4, name: 'mody', age: 18 },
];
const port = 5000;

const server = http.createServer((req, res) => {
	// Get all users
	if (req.method === 'GET' && req.url === '/') {
		res.statusCode = 200;
		res.end(JSON.stringify(users));
	}

	// Added user
	if ((req.method === 'POST', req.url === '/')) {
		const requestData = '';
		req.on('data', (chunk) => {
			users.push(JSON.parse(chunk));
			res.end(JSON.stringify({ message: 'user added', data: JSON.parse(chunk) }));
		});
	}

	// sort users
	if (req.method === 'GET' && req.url === '/sort') {
		const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
		res.statusCode = 200;
		res.end(JSON.stringify(sortedUsers));
	}

	// Get by id
	if (req.method === 'GET' && req.url.startsWith('/user/')) {
		const id = req.url.split('/')[2];
		const user = users.filter((user) => user.id.toString() === id);
		if (user.length > 0) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(user));
		} else {
			res.statusCode = 404;
			res.end('User not found');
		}
	}

	// delete user
	if ((req.message === 'DELETE', req.url === '/delete')) {
		req.on('data', (chunk) => {
			const id = JSON.parse(chunk);
			users = users.filter((user) => user.id != id.id);
			res.end('user deleted');
		});
	}

	// Update
	if (req.method === 'PATCH' && req.url.startsWith('/user/')) {
		const id = req.url.split('/')[2];
		const userIndex = users.findIndex((user) => user.id == id);
		req.on('data', (chunk) => {
			const newData = JSON.parse(chunk);
			users[userIndex] = { ...users[userIndex], ...newData };
			res.end(JSON.stringify(users[userIndex]));
		});
	}
});

server.listen(port, () => {
	console.log(`server is listening on port => ${port}`);
});
