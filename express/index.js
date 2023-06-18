import express from 'express';
import userRouters from './routers/users.js';
import postsRouter from './routers/posts.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/users', userRouters);
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
	res.send('hoem page');
});

app.all('*', (req, res) => res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () => {
	console.log(`Server listening on port => ${PORT}`);
});
