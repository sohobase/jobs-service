import Express from 'express';
import BodyParser from 'body-parser';
import C from '../shared/constants';
import { Error, HotReload, Log, Session, Stats, Webpack } from './middlewares';
import { api, router, webhookStripe } from './routes';
import { ServiceTelegram } from './services';

const { DEVELOPMENT, PRODUCTION } = C.ENV;
const { port = 8080, NODE_ENV = DEVELOPMENT } = process.env;
const app = Express();

// -- Setup
app.set('view engine', 'ejs');

// -- Middlewares
app.use(Session);
app.use(Error);
app.use(Webpack);
app.use(BodyParser.urlencoded());
app.use(BodyParser.json());

if (NODE_ENV === PRODUCTION) {
  app.use(Stats);
} else {
  app.use(Log);
  app.use(HotReload);
}

// -- Routes
app.use('/api', api);
app.use('/webhook/stripe', webhookStripe);
app.use(router);

// -- Start Server
app.listen(port, (error) => {
  if (error) ServiceTelegram(error);

  ServiceTelegram(`Server running on http://localhost:${port} [${NODE_ENV}]`);
});
