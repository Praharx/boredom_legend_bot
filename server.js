const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  console.log(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;

  const welcomeMessage = `Welcome to boredomLegend App
Mine-To-Earn

Welcome, @${username}! 💎

🚀 Discover the revolutionary Mine-To-Earn app built on Telegram!

Experience limitless opportunities for cloud mining $LGND. Our infrastructure, powered by blockchain, ensures optimized transactions and reduced transfer fees.

Be among the pioneers in earning with boredomLegend!

Complete missions, invite friends, rent additional mining power to earn even more.

Don't miss the opportunity to increase your income and strive for financial independence with us! ⚡💰🚀`;

  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: '⚡ Start App ⚡',url:'https://t.me/bordomLegend_bot/bordomlegends' }],
        [{ text: '💥 Explore $LGND 💥', url: 'https://tokepad.xyz/market/0x2b070b6e6c06ba1d25a591c755b64a4709717785' }],
      ]
    })
  };

  bot.sendMessage(chatId, welcomeMessage, options)
    .catch(error => console.error('Error sending message:', error));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Set webhook
// bot.setWebHook('https://boredomlegend.vercel.app/api/webhook');