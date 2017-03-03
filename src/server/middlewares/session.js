import Express from 'express';
import session from 'express-session';
import C from '../../shared/constants';

const { PRODUCTION } = C.ENV;
const props = { secret: 'keyboard_cat', resave: true, saveUninitialized: true, cookie: {} };
const app = Express();

if (app.get('env') === PRODUCTION) {
  app.set('trust proxy', 1);
  props.cookie.secure = true;
}
app.use(session(props));

export default app;
