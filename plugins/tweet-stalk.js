const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "xstalk",
  alias: ["twitterstalk", "twtstalk"],
  desc: "Get details about a Twitter/X user.",
  react: "🔍",
  category: "search",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) {
      return reply("❌ Please provide a valid Twitter/X username.");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const apiUrl = `https://delirius-apiofc.vercel.app/tools/xstalk?username=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data) {
      return reply("⚠️ Failed to fetch Twitter/X user details. Ensure the username is correct.");
    }

    const user = data.data;
    const verifiedBadge = user.verified ? "✅" : "❌";

    const caption = `╭━━━〔 *ᴢᴇʀᴏ ᴍᴅ x ꜱᴛᴀʟᴋᴇʀ* 〕━━━⊷\n`
      + `┃👤 *𝙽𝙰𝙼𝙴:* ${user.name}\n`
      + `┃🔹 *𝚄𝚂𝙴𝚁𝙽𝙰𝙼𝙴:* @${user.username}\n`
      + `┃✔️ *𝚅𝙴𝚁𝙸𝙵𝙸𝙴𝙳:* ${verifiedBadge}\n`
      + `┃👥 *𝙵𝙾𝙻𝙻𝙾𝚆𝙴𝚁𝚂:* ${user.followers_count}\n`
      + `┃👤 *𝙵𝙾𝙻𝙻𝙾𝚆𝙸𝙽𝙶:* ${user.following_count}\n`
      + `┃📝 *𝚃𝚆𝙴𝙴𝚃𝚂:* ${user.tweets_count}\n`
      + `┃📅 *𝙹𝙾𝙸𝙽𝙴𝙳:* ${user.created}\n`
      + `┃🔗 *𝙿𝚁𝙾𝙵𝙸𝙻𝙴:* [Click Here](${user.url})\n`
      + `╰━━━⪼\n\n`
      + `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴇʀᴏ ᴍᴅ 💸*`;

    await conn.sendMessage(from, {
      image: { url: user.avatar },
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
});
