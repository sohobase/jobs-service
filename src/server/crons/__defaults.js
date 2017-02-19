// .---------------- minute (0 - 59)
// |  .------------- hour (0 - 23)
// |  |  .---------- day of month (1 - 31)
// |  |  |  .------- month (1 - 12)
// |  |  |  |  .----- day of week (0 - 6) (Sunday=0 or 7)
// |  |  |  |  |
// *  *  *  *  *

export default {
  cronTime: '0 */4 * * *', /* Every 4 hours */
  onComplete: () => {
    // @TODO: Maybe is good idea consolidate all the date at this point.
    console.log('✅');
  },
  runOnInit: false,
  timeZone: 'America/Los_Angeles',
};
