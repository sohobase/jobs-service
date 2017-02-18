import moment from 'moment';

export default {

  ago: (date = new Date()) => moment(date).fromNow(),

  inLast24Hours: (date = new Date()) => moment(date) >= moment().subtract(1, 'day')

};
