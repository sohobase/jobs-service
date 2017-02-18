import TeleBot from 'telebot';
import C from '../../shared/constants';

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, NODE_ENV } = process.env;
let bot;

export default (message) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  if (!bot) {
    bot = new TeleBot(TELEGRAM_BOT_TOKEN);
    bot.connect();
  }

  if (NODE_ENV === C.environment.development) {
    console.log(message);
  } else {
    bot.sendMessage(TELEGRAM_CHAT_ID, message);
  }
};
