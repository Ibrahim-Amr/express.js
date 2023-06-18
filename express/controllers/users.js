import { v4 as uuidv4 } from 'uuid';

const users = [
	{ id: uuidv4(), name: 'ibrahim', age: '25' },
	{ id: uuidv4(), name: 'mostafa', age: '20' },
	{ id: uuidv4(), name: 'mohamed', age: '18' },
];

export const getUsers = (req, res) => {
	if (users.length > 0) {
		res.status(200).json(users);
	} else {
		res.status(404).json({ message: 'no users found' });
	}
};

export const addUser = (req, res) => {
	const user = { id: uuidv4(), ...req.body };
	users.push(user);

	res.status(200).json({ message: 'post added', data: user });
};

export const sortUsers = (req, res) => {
	const sorted = [...users].sort((a, b) => a.name.localeCompare(b.name));
	res.json(sorted);
};

export const getByID = (req, res) => {
	const { id } = req.params;
	const user = users.find((user) => user.id == id);
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).json({ message: 'user not found, enter a valid id.' });
	}
};

export const deleteUser = (req, res) => {
	const { id } = req.params;
	const userIndex = users.findIndex((user) => user.id == id);
	users.splice(userIndex, 1);

	if (userIndex > -1) {
		res.status(200).json({ message: 'user deleted' });
	} else {
		res.status(404).json({ message: 'user not found, enter a valid id.' });
	}
};

export const updateUser = (req, res) => {
	const { id } = req.params;
	const updatedData = req.body;
	const userIndex = users.findIndex((user) => user.id == id);

	if (userIndex > -1) {
		users[userIndex] = { ...users[userIndex], ...updatedData };
		res.status(200).json(users[userIndex]);
	} else {
		res.status(404).json({ message: 'user not found, enter a valid id.' });
	}
};
