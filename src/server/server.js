import Express from 'express';
import C from '../shared/constants';
import { Error, HotReload, Log, Stats, Webpack } from './middlewares';
import routes from './routes';

const environment = process.env.NODE_ENV || C.environment.development;
const port = process.env.PORT || 3000;
const app = Express();

// -- Setup
app.set('view engine', 'ejs');

// -- Session configuration
// @TODO

// -- Middleware and routes
app.use('/static', Express.static('static'));
app.use(Webpack);
if (environment !== C.environment.development) app.use(Stats);
if (environment === C.environment.development) {
  app.use(Log);
  app.use(HotReload);
}
app.use(Error);
app.use('/', routes);

// -- Start Server
app.listen(port, (error) => {
  if (error) return console.erroror(error); // eslint-disable-line no-console
  return console.info(`Server running on http://localhost:${port} [${environment}]`); // eslint-disable-line no-console
});
