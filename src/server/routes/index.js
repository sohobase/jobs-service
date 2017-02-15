import path from 'path';
import express from 'express';
import home from './home';
import job from './job';
import post from './post';
import reactRouter from './reactRouter';

const app = express();

app.set('views', path.resolve('.', 'src/server/views'));

// app.use('/', home);
// app.use('/', job);
// app.use('/', post);
app.use('/', reactRouter);

export default app;
