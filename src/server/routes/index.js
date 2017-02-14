import express from 'express';
import home from './home';
import job from './job';
import post from './post';

const app = express();

// app.use('/', home);
app.use('/', job);
// app.use('/', post);

export default app;
