const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(fileUpload());

const bot = new TelegramBot(process.env['TELEGRAM_TOKEN'], { pooling: true });
const subscribers = [1096337909];

bot.onText(/\/subscribe/, msg => {
    try {
        const id = msg.chat.id;
        if (!subscribers.includes(id))
            subscribers.push(id);
        bot.sendMessage(id, 'Subscription completed');
    } catch (e) {
        console.log(e);
    }
});

bot.onText(/\/unsubscribe/, msg => {
    try {
        const id = msg.chat.id;
        const index = subscribers.indexOf(id);
        if (index > -1)
            subscribers.splice(index, 1);

        bot.sendMessage(id, 'Unsubscription completed');
    } catch (e) {
        console.log(e);
    }
});

bot.setMyCommands([
    {command: 'subscribe', description: 'Subscribes to notifications'},
    {command: 'unsubscribe', description: 'Unubscribes from notifications'},
]);

app.post('/', (req, res) => {
    console.log(req.files);
    if (req?.headers?.token != process.env['SECRET'])
        res.status(403).send('Authentication failed');
    else {
        subscribers.map(id => {
            bot.sendPhoto(id, req?.files?.photo?.data);
            bot.sendMessage(id, req?.body?.text)
        });
        res.send('SUCCESS');
    }
});

app.listen(3000, () => {
    console.log(`webserver listening localhost:${3000}`);
    bot.startPolling().then(() => console.log('telegram bot ready'));
});