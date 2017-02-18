import Express from 'express';
import C from '../shared/constants';
import { Error, HotReload, Log, Session, Stats, Webpack } from './middlewares';
import { api, router, webhookStripe } from './routes';
import bot from './services/telegramBot';

const { port = 3000, NODE_ENV = C.environment.development } = process.env;
const isProduction = NODE_ENV === C.environment.production;
const app = Express();

// -- Setup
app.set('view engine', 'ejs');

// -- Middlewares
app.use(Session);
app.use(Error);
app.use(Webpack);
if (isProduction) {
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
  if (error) {
    bot(error);
    return console.error(error); // eslint-disable-line no-console
  }

  const message = `Server running on http://localhost:${port} [${NODE_ENV}]`;
  return isProduction ? bot(message) : console.log(message);
});
