import TeleBot from 'telebot';

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
let bot;

export default (message, props = {}) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  if (!bot) {
    bot = new TeleBot(TELEGRAM_BOT_TOKEN);
    bot.connect();
  }

  bot.sendMessage(TELEGRAM_CHAT_ID, message, { ...props });
};
