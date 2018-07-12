const TeleBot = require('telebot');

var myID = "330958566";

const bot = new TeleBot({
    token: '564877272:AAEEwLcWqlmKXullJ-16x-GhQ3zh_3oZFvo' // Telegram Bot API token.
});


bot.on("/start", (msg) =>{
  return bot.sendMessage(msg.from.id, "hallo ik ben opendag bot ik kan je helpen met een aantal dingen waaronder; een lokaal zoeken en info overde school geven");
});

bot.on(/lokaal ([0-3]{1}\.{1}[0-9]{2})/, (msg, props) =>{
  prop = props.match[1];
  //prop is hier gelijk aan alles wat er gezegd word ook lokaal dus niet aleen wat ik tussen de () vang
  console.log(props.match);
  return bot.sendMessage(msg.from.id, "ok ik geef info over: " + prop);
});

bot.on(/.+/, (msg) =>{

  if (msg.text.match(new RegExp(/^[Hh][AaOoEe0]*[IiYy]|[Hh][Aa][Ll][Ll][Oo0]|[Ee][Ww][Aa]/))){
    return bot.sendMessage(msg.from.id, "hallo");
  }


  if (msg.text.match(new RegExp(/^[Ww]ebsite/))){
    return bot.sendMessage(msg.from.id, "https://www.hetmml.nl/");
  }



});

bot.start();
