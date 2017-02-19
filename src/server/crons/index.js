import { CronJob } from 'cron';
import defaults from './__defaults';
import { JobSpresso, PandaJobs, RemoteOK, WeWorkRemotely, WorkingNomads } from '../providers';

CronJob({ ...defaults, cronTime: '* * 0,12 * * *', onTick: () => JobSpresso() });
CronJob({ ...defaults, cronTime: '* * 3,15 * * *', onTick: () => PandaJobs() });
CronJob({ ...defaults, cronTime: '* * 5/17 * * *', onTick: () => RemoteOK() });
CronJob({ ...defaults, cronTime: '* * 8/20 * * *', onTick: () => WorkingNomads() });
CronJob({ ...defaults, cronTime: '* * 11/23 * * *', onTick: () => WeWorkRemotely() });
