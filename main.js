const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const bot = new TelegramBot(process.env['TELEGRAM_TOKEN'], {pooling: true});
const subscribers = [];

bot.onText(/\/subscribe/, msg => {
    const id = msg.chat.id;
    subscribers.append(id);
    bot.sendMessage(id, 'Subscription completed');
});

bot.startPolling();