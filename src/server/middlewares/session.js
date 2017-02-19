import session from 'express-session';
import Express from 'express';

const app = Express();
const props = { secret: 'keyboard cat', cookie: { maxAge: 3600000 } };

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  props.cookie.secure = true;
}
app.use(session(props));

export default app;
