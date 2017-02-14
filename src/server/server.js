import path from 'path';
import Express from 'express';
import C from '../shared/constants';
import { Error, HotReload, Log, Stats, Webpack } from './middlewares';
import routes from './routes';
import reactRouter from './routes/reactRouter'

const environment = process.env.NODE_ENV || C.environment.development;
const port = process.env.PORT || 3000;
const app = Express();

// -- Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.resolve('.', 'src/server/views')); // @TODO: 🤔 Pass config between routers

// -- Session configuration
// @TODO

// -- Middleware and routes
app.use('/static', Express.static('static'));
app.use(Stats);
app.use(Webpack);
if (environment === C.environment.development) {
  app.use(Log);
  app.use(HotReload);
}
app.use(Error);
app.use('/', routes);
app.use(reactRouter);

// -- Start Server
app.listen(port, (error) => {
  if (error) return console.erroror(error); // eslint-disable-line no-console
  return console.info(`Server running on http://localhost:${port} [${environment}]`); // eslint-disable-line no-console
});
