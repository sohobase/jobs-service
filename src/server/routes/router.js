import path from 'path';
import Express from 'express';
import serverRendering from '../services/serverRendering';

const app = Express();

app.set('views', path.resolve('.', 'src/server/views'));
app.use('/static', Express.static(path.resolve('.', 'public')));
app.use('/job/:id', serverRendering);
app.use('/', serverRendering);


export default app;
