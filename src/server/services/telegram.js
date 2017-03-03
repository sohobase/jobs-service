import TeleBot from 'telebot';
import C from '../../shared/constants';

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, NODE_ENV } = process.env;
const isProduction = NODE_ENV === C.environment.production;
let bot;

export default (message) => {
  if (isProduction) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
    if (!bot) {
      bot = new TeleBot(TELEGRAM_BOT_TOKEN);
      bot.connect();
    }
    bot.sendMessage(TELEGRAM_CHAT_ID, message);
  } else {
    console.log(message);
  }
};
