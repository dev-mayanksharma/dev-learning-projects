
require('dotenv').config();

const axios = require('axios');

const telegrambot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;

const bot = new telegrambot(token, { polling: true });
const monitoredWebsites = []; // store website info 

console.log("Bot zinda ho gaya hai ");

//start cmd 
bot.onText(/\/start/,(msg)=>{
  const chatID =msg.chat.id;
  bot.sendMessage(chatID,'hello sir');

});


// add cmd 
bot.onText(/\/add (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const url = match[1];

    monitoredWebsites.push({
        url: url,
        status: 'Unknown', 
        chatId: chatId 
    });
    console.log('these are the info of user',msg.chat,url);

    bot.sendMessage(chatId, `${url} added in the list  `);
});   

// list cmd 
bot.onText(/\/list/,(msg)=>{
    const chatId = msg.chat.id;
     console.log(monitoredWebsites);
     //checking website list
     if(monitoredWebsites.length===0){
        bot.sendMessage(chatId,'till now your list is empty ');
        return;
     };

     let listMessage="this is your list:\n\n";
  
     monitoredWebsites.forEach((site, index) => {
        
        listMessage += `${index + 1}. ${site.url} - status: ${site.status}\n`;
    });
     

     bot.sendMessage(chatId, listMessage);
    });
       
// delete 
bot.onText(/\/delete (.+)/,(msg,match)=>{
    const chatId = msg.chat.id;
    const urlToRemove = match[1];
    
    const index = monitoredWebsites.findIndex(site => site.url === urlToRemove);

    if (index !== -1) {
        
        monitoredWebsites.splice(index, 1);
        console.log(`removed ${urlToRemove}`);
        bot.sendMessage(chatId, `Done! ${urlToRemove} is removed from list `);
    } else {
      bot.sendMessage(chatId,`unable to find this ${urlToRemove} in list `);
    }
});

// status cmd
bot.onText(/\/status (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    let urlToCheck = match[1];

    if (!urlToCheck.startsWith('http://') && !urlToCheck.startsWith('https://')) {
        urlToCheck = 'https://' + urlToCheck;
    }

    bot.sendMessage(chatId, `checking ${urlToCheck}  status , wait some time `);

    try {
        
        const response = await axios.get(urlToCheck);
        
        
        bot.sendMessage(chatId, `website working good  🟢\nStatus Code: ${response.status}`);
        
    } catch (error) {
        
        bot.sendMessage(chatId, `sorry website is down  🔴\nError: ${error.message}`);
    }
});