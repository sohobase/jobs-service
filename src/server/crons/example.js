import { CronJob } from 'cron';
import defaults from './__defaults';

const job = new CronJob({
  ...defaults,
  cronTime: '*/5 * * * * *', /* Every 5 seconds */
  runOnInit: false,
  onTick: () => {
    console.log('>', new Date());
  },
});
