import Express from 'express';
import C from '../shared/constants';
import { Error, HotReload, Log, Stats, Webpack } from './middlewares';
import { api, router, webhookStripe } from './routes';

const environment = process.env.NODE_ENV || C.environment.development;
const port = process.env.PORT || 3000;
const app = Express();

// -- Setup
app.set('view engine', 'ejs');

// -- Session configuration
// @TODO

// -- Middlewares
app.use(Webpack);
if (environment !== C.environment.development) app.use(Stats);
if (environment === C.environment.development) {
  app.use(Log);
  app.use(HotReload);
}
app.use(Error);

// -- Routes
app.use('/api', api);
app.use('/webhook/stripe', webhookStripe);
app.use(router);

// -- Start Server
app.listen(port, (error) => {
  if (error) return console.erroror(error); // eslint-disable-line no-console
  return console.info(`Server running on http://localhost:${port} [${environment}]`); // eslint-disable-line no-console
});
