import http from 'http';

let posts = [
	{ id: 1, auther: 'ibrahim', text: 'my name is ibrahim' },
	{ id: 2, auther: 'amr', text: 'my name is amr' },
	{ id: 3, auther: 'mostafa', text: 'my name is mostafa' },
	{ id: 4, auther: 'mohamed', text: 'my name is mohamed' },
];
const port = 6000;

const server = http.createServer((req, res) => {
	// Get all posts
	if (req.method === 'GET' && req.url === '/') {
		res.statusCode = 200;
		res.end(JSON.stringify(posts));
	}

	// Added post
	if ((req.method === 'POST', req.url === '/')) {
		const requestData = '';
		req.on('data', (chunk) => {
			posts.push(JSON.parse(chunk));
			res.end(JSON.stringify({ message: 'post added', data: JSON.parse(chunk) }));
		});
	}

	// sort posts
	if (req.method === 'GET' && req.url === '/sort') {
		const sortedPosts = posts.sort((a, b) => a.auther.localeCompare(b.auther));
		res.statusCode = 200;
		res.end(JSON.stringify(sortedPosts));
	}

	// Get by id
	if (req.method === 'GET' && req.url.startsWith('/post/')) {
		const id = req.url.split('/')[2];
		const post = posts.filter((post) => post.id.toString() === id);
		if (post.length > 0) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(post));
		} else {
			res.statusCode = 404;
			res.end('post not found');
		}
	}

	// delete user
	if ((req.message === 'DELETE', req.url === '/delete')) {
		req.on('data', (chunk) => {
			const id = JSON.parse(chunk);
			posts = posts.filter((post) => post.id != id.id);
			res.end('post deleted');
		});
	}

	// Update
	if (req.method === 'PATCH' && req.url.startsWith('/post/')) {
		const id = req.url.split('/')[2];
		const postIndex = posts.findIndex((user) => user.id == id);
		req.on('data', (chunk) => {
			const newData = JSON.parse(chunk);
			posts[postIndex] = { ...posts[postIndex], ...newData };
			res.end(JSON.stringify(posts[postIndex]));
		});
	}
});

server.listen(port, () => {
	console.log(`server is listening on port => ${port}`);
});
