const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "KSMD~GoxUxbxa#kI766k_v_6qAQwoisp4OOBNM4Jt8_DPQAiPV1djyXo0",
// add your Session Id 
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "false",
// make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*ᴀᴜᴛᴏ ꜱᴇᴇɴ ʏᴏᴜʀ ꜱᴛᴀᴛᴜꜱ ʙʏ <| ᴢᴇʀᴏ ᴍᴅ🫧*",
// set the auto reply massage on status reply  
ANTI_DELETE: process.env.ANTI_DELETE || "true",
// set true false for anti delete     
ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox", 
// change it to 'same' if you want to resend deleted message in same chat     
WELCOME: process.env.WELCOME || "false",
// true if want welcome and goodbye msg in groups    
ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
// make true to know who dismiss or promoted a member in group
ANTI_LINK: process.env.ANTI_LINK || "false",
// make anti link true,false for groups 
MENTION_REPLY: process.env.MENTION_REPLY || "false",
// make true if want auto voice reply if someone menetion you 
MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://files.catbox.moe/3jpwr1.jpg",
// add custom menu and mention reply image url
PREFIX: process.env.PREFIX || ".",
// add your prefix for bot   
BOT_NAME: process.env.BOT_NAME || "<| ᴢᴇʀᴏ ᴍᴅ",
// add bot name here for menu
STICKER_NAME: process.env.STICKER_NAME || "<| ᴢᴇʀᴏ ᴍᴅ | ꜱᴛɪᴄᴋᴇʀ ᴍᴀᴋᴇʀ",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
// chose custom react emojis by yourself 
DELETE_LINKS: process.env.DELETE_LINKS || "false",
// automatic delete links without remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "94765714446",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "ᴅᴀꜱᴜɴ ᴅᴜʟᴀʀᴀᴋᴀ",
// add bot owner name
LOCATION: process.env.LOCATION || "Nittambuwa,Sri Lanka",
// add bot location
GITHUB: process.env.GITHUB || "https://www.facebook.com/dasundularaka",
// add bot owner github
EMAIL: process.env.EMAIL || "dasundularaka@gmail.com",
// add bot owner email
FOOTER: process.env.FOOTER || "> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴇʀᴏ ᴍᴅ 💸*",
// add bot footer for menu  
ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/3jpwr1.jpg",
// add img for alive msg
LIVE_MSG: process.env.LIVE_MSG || "> *ZERO-MD is alive now!*⚡",
// add alive msg here 
READ_MESSAGE: process.env.READ_MESSAGE || "false",
// Turn true or false for automatic read msgs
AUTO_REACT: process.env.AUTO_REACT || "false",
// make this true or false for auto react on all msgs
ANTI_BAD: process.env.ANTI_BAD || "false",
// false or true for anti bad words  
MODE: process.env.MODE || "public",
// make bot public-private-inbox-group 
ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "false",
// make anti link true,false for groups 
AUTO_STICKER: process.env.AUTO_STICKER || "false",
// make true for automatic stickers 
AUTO_VOICE: process.env.AUTO_VOICE || "false",
// make true for automatic voice reply 
AUTO_REPLY: process.env.AUTO_REPLY || "false",
// make true or false automatic text reply 
AUTO_BIO: process.env.AUTO_BIO || "true",
// make true or false automatic about system 
AUTO_NEWS: process.env.AUTO_NEWS || "true",
// make true or false automatic news system 
AUTO_NEWS_NUMBER: process.env.AUTO_NEWS_NUMBER || "94765714446",
// enter your number with country code for automatic news system 
THUMB_IMAGE: process.env.THUMB_IMAGE || "https://files.catbox.moe/3jpwr1.jpg",
// thumb img for auto news system if has not photo
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "true",
// maks true for always online 
BUTTON: process.env.BUTTON || "true",
// true or false for button reply
PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
// make false if want private mod
AUTO_TYPING: process.env.AUTO_TYPING || "false",
// true for automatic show typing   
READ_CMD: process.env.READ_CMD || "true",
// true if want mark commands as read 
DEV: process.env.DEV || "94765714446",
//replace with your whatsapp number        
ANTI_VV: process.env.ANTI_VV || "true",
// true for anti once view 
AUTO_RECORDING: process.env.AUTO_RECORDING || "false"
// make it true for auto recoding 
};
