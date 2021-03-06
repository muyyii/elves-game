const express = require('express');

const path = require("path");
const url = process.env.URL || 'https://<PUBLIC-URL>';
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = process.env.TOKEN;

const app = express();

const bot = new TelegramBot(TOKEN, {polling: true});

const port = process.env.PORT || 5000;
const gameName = "Elves"
const queries = {}

//app.use(express.static('files'));
app.use(express.static(path.join(__dirname, 'files')));

bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "This bot makes a really bad Worms copy for xmas"));

bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));
//bot.on("callback_query", function (query) {
//	  if (query.game_short_name !== gameName) {
//		  bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
//	  } else {
//		  queries[query.id] = query;
//		  let gameurl = "https://elves-game-telegram.herokuapp.com?  id="+query.id;
//		  bot.answerCallbackQuery({
//			  callback_query_id: query.id,
//			  url: gameurl
//		  });
//	  }
//});

bot.on("inline_query", function(iq) {
	bot.answerInlineQuery(iq.id, [ { type: "game", id: "0", game_short_name: gameName } ] );
	});

// Matches /start
bot.onText(/\/start/, function onPhotoText(msg) {
  bot.sendGame(msg.chat.id, gameName);
});

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  bot.answerCallbackQuery(callbackQuery.id, { url });
});

// Render the HTML game
//app.get('/', function requestListener(req, res) {
//  res.sendFile(path.join(__dirname, 'index.html'));
//});

//app.get("/highscore/:score", function(req, res, next) {
//	if (!Object.hasOwnProperty.call(queries, req.query.id)) return   next();
//	 let query = queries[req.query.id];
// let options;
//	  if (query.message) {
//		    options = {
//				chat_id: query.message.chat.id,
//				message_id: query.message.message_id
//				};
//		  } else {
//			  options = {
//				  inline_message_id: query.inline_message_id
//				   };
//			  }
//	bot.setGameScore(query.from.id, parseInt(req.params.score),  options,
//		function (err, result) {});
//	});

//----------------------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
