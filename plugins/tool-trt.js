const axios = require('axios');
const config = require('../config')
const {cmd , commands} = require('../command')
const googleTTS = require('google-tts-api')

cmd({
    pattern: "trt",
    alias: ["translate"],
    desc: "🌍 Translate text between languages",
    react: "⚡",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `*𝙕𝙀𝙍𝙊-𝙈𝘿 𝙏𝙍𝘼𝙉𝙎𝙇𝘼𝙏𝙄𝙉𝙂 𝙎𝙔𝙎𝙏𝙀𝙈*

> 🔤 *𝙾𝚁𝙸𝙶𝙸𝙽𝙰𝙻*: ${textToTranslate}

> 🔠 *𝚃𝚁𝙰𝙽𝚂𝙻𝙰𝚃𝙴𝙳*: ${translation}

> 🌐 *𝙻𝙰𝙽𝙶𝚄𝙰𝙶𝙴*: ${targetLang.toUpperCase()}`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred data while translating the your text. Please try again later🤕");
    }
});
