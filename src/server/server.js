import Express from 'express';
import C from '../shared/constants';
import { Error, HotReload, Log, Session, Stats, Webpack } from './middlewares';
import { api, router, webhookStripe } from './routes';
import telegramBot from './services/telegramBot';

const { port = 3000, NODE_ENV = C.environment.development } = process.env;
const app = Express();

// -- Setup
app.set('view engine', 'ejs');

// -- Session configuration
// @TODO

// -- Middlewares
app.use(Session);
app.use(Webpack);
if (NODE_ENV !== C.environment.development) app.use(Stats);
if (NODE_ENV === C.environment.development) {
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
  if (error) {
    telegramBot(error);
    return console.error(error); // eslint-disable-line no-console
  }
  telegramBot(`Server running on http://localhost:${port} [${NODE_ENV}]`);
  return console.info(`Server running on http://localhost:${port} [${NODE_ENV}]`); // eslint-disable-line no-console
});
