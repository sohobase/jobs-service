const TeleBot = require('telebot');

let bot;

export default (message) => {
  if (!bot) {
    bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);
    bot.connect();
  }
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
};
