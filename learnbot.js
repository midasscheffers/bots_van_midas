var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost/LearnBot';

mongo.connect(url, function(err, db) {
  if(err) throw err;
});


const TeleBot = require('telebot');

var myID = "330958566";

const bot = new TeleBot({
    token: '564877272:AAEEwLcWqlmKXullJ-16x-GhQ3zh_3oZFvo' // Telegram Bot API token.
});

var ZinArray = []

mongo.connect(url, function(err, db) {
    ZinArray = String(db.db('LearnBot').collection('Data').findOne());
    db.close();
});

console.log(ZinArray);

function IN(array, value){
  if (array.indexOf(value) == -1){
    return false;
  }
  else {
    return true;
  }
}

bot.on("/start", (msg, props) =>{
  return bot.sendMessage(msg.from.id, "hoi ewa ik ben learn bot");
});

bot.on(/(.+)/, (msg, props) =>{

  if (!IN(ZinArray, msg.text)){
    bot.sendMessage(msg.from.id, "zit niet in zinarray");
  }
  else {
    bot.sendMessage(msg.from.id, "zit in zinarray");
  }

  if(msg.text.match(new RegExp(/score (.+)/))){
    mongo.connect(url, function(err, db) {
      db.db('LearnBot').collection('Data').findOne({ "naam" : props.match[1] }, function (err, result) {
        var bericht;
        if (err) throw (err);
        db.close();
        if (!result) {
          bericht = "Speler " + props.match[1] + " bestaat niet!"
        } else {
          bericht = result.naam + " " + result.score
        }
        return bot.sendMessage(msg.from.id, bericht);
      });
    });
  }

});

bot.start();
