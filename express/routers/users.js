import express from 'express';
import {
	addUser,
	deleteUser,
	getByID,
	getUsers,
	sortUsers,
	updateUser,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);

router.post('/', addUser);

router.get('/sorted', sortUsers);

router.get('/search/:id', getByID);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;
