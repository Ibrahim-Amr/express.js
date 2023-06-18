import express from 'express';
import {
	addPost,
	deletePost,
	getPosts,
	reversedPosts,
	searchPost,
	updatePost,
} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);

router.post('/', addPost);

router.get('/reversed', reversedPosts);

router.delete('/:id', deletePost);

router.patch('/:id', updatePost);

router.get('/search/:id', searchPost);

export default router;
