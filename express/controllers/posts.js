import { v4 as uuidv4 } from 'uuid';

const posts = [
	{ id: uuidv4(), auther: 'ibrahim', text: 'my name is ibrahim' },
	{ id: uuidv4(), auther: 'mohamed', text: ' my name is mohamed' },
	{ id: uuidv4(), auther: 'sasa', text: ' my name is sasa' },
	{ id: uuidv4(), auther: 'amr', text: ' my name is amr' },
];

export const getPosts = (req, res) => {
	if (posts.length > 0) {
		res.status(200).json(posts);
	} else {
		res.status(404).json({ message: 'no posts found' });
	}
};

export const addPost = (req, res) => {
	const newPost = {
		id: uuidv4(),
		...req.body,
	};
	posts.push(newPost);

	res.status(200).json({ message: 'post added', data: newPost });
};

export const reversedPosts = (req, res) => {
	if (posts.length > 0) {
		const reversedArray = [...posts].reverse();
		res.status(200).json(reversedArray);
	} else {
		res.status(404).json({ message: 'no posts found' });
	}
};

export const deletePost = (req, res) => {
	const { id } = req.params;
	const postIndex = posts.findIndex((post) => post.id == id);

	if (postIndex > -1) {
		posts.splice(postIndex, 1);
		res.status(200).json({ message: `post with the id ${id} deleted` });
	} else {
		res.status(404).json({ message: 'post not found, enter a valid id.' });
	}
};

export const updatePost = (req, res) => {
	const { id } = req.params;
	const updatedData = req.body;
	const postIndex = posts.findIndex((post) => post.id == id);

	if (postIndex > -1) {
		posts[postIndex] = { ...posts[postIndex], ...updatedData };
		res.status(200).json(posts[postIndex]);
	} else {
		res.status(404).json({ message: 'post not found, enter a valid id.' });
	}
};

export const searchPost = (req, res) => {
	const { id } = req.params;
	const post = posts.find((post) => post.id == id);

	if (post) {
		res.status(200).json(post);
	} else {
		res.status(404).json({ message: 'post not found, enter a valid id.' });
	}
};
