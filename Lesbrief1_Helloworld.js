var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost/First';

mongo.connect(url, function(err, db) {
  if(err) throw err;
});


const TeleBot = require('telebot');

var startquiz = false;

var myID = "330958566";

const bot = new TeleBot({
    token: '564877272:AAEEwLcWqlmKXullJ-16x-GhQ3zh_3oZFvo' // Telegram Bot API token.
});

bot.on(/(.+)/, (msg, props) =>{

  if(msg.text.match(new RegExp(/score (.+)/))){
    mongo.connect(url, function(err, db) {
      db.db('First').collection('Users').findOne({ "naam" : props.match[1] }, function (err, result) {
        var bericht;
        if (err) throw (err);
        db.close();
        if (!result) {
          bericht = "Speler " + props.match[1] + " bestaat niet!"
        } else {
          bericht = result.naam + " " + result.id
        }
        return bot.sendMessage(msg.from.id, bericht);
      });
    });
  }

  if(startquiz == true) {
    console.log(msg);
    console.log(msg.text);
    if(msg.chat.id == myID){
      if (msg.text.match(new RegExp(/[Vv]raag/))){
        return bot.sendMessage("vraag A");
      }
    }else{
      console.log("not my");
    }
  }

  console.log(msg.chat.first_name + " " + msg.chat.last_name + " id: " + msg.from.id + " says: " + msg.text);
  if (msg.chat.id == myID)
  {
    if (msg.text == '/start'){
      console.log("bot says: \"Hello world!\" to " + msg.chat.first_name + " " + msg.chat.last_name);
      return bot.sendMessage(msg.from.id, "Hello world!");
    }

    if (msg.text.match(new RegExp(/^[Hh][AaOoEe]*[IiYy]|[Hh][Aa][Ll][Ll][Oo0]|[Ee][Ww][Aa]/))){
      bot.sendMessage(msg.from.id, "Hi");
      console.log("bot says: \"Hi\" to " + msg.chat.first_name + " " + msg.chat.last_name);
      return bot.sendPhoto(msg.from.id, "images/Cheetah_says_hi.jpg");
    }

    if (msg.text == "/startquiz"){
      startquiz = true;
      console.log("startquiz");
    }
  }
  else
  {
    bot.sendMessage(myID, msg.chat.first_name + " " + msg.chat.last_name + " id: " + msg.from.id + " says: " + msg.text);
    if(msg.text == '/start'){
      bot.sendMessage(msg.from.id, "Hello world!");
      console.log("bot says: \"Hello world!\" to " + msg.chat.first_name + " " + msg.chat.last_name);
      bot.sendMessage(myID, "bot says: \"Hello world!\" to " + msg.chat.first_name + " " + msg.chat.last_name);
      return bot.sendMessage(myID, msg.chat.first_name + " " + msg.chat.last_name + " says: " + msg.text);
    }

    if(msg.text.match(new RegExp(/^[Hh][AaOoEe]*[IiYy]|[Hh][Aa][Ll][Ll][Oo0]|[Ee][Ww][Aa]/))){
      bot.sendMessage(msg.from.id, "Hi");
      console.log("bot says: \"Hi\" to " + msg.chat.first_name + " " + msg.chat.last_name);
      bot.sendMessage(myID, "bot says: \"Hi\" to " + msg.chat.first_name + " " + msg.chat.last_name);
      return bot.sendPhoto(msg.from.id, "images/Cheetah_says_hi.jpg");
    }

    if(msg.text == "/startquiz"){
      bot.sendMessage(myID, msg.chat.first_name + " " + msg.chat.last_name + " asked to start quiz");
      bot.sendMessage(msg.from.id, "wait for Midas answer");
      return bot.sendMessage(myID, "bot says: \"wait for Midas answer\" to " + msg.chat.first_name + " " + msg.chat.last_name);
    }
  }




});

bot.start();
