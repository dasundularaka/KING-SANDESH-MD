const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "ytstalk",
  alias: ["ytinfo"],
  desc: "Get details about a YouTube channel.",
  react: "🔍",
  category: "search",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) {
      return reply("❌ Please provide a valid YouTube channel username or ID.");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const apiUrl = `https://delirius-apiofc.vercel.app/tools/ytstalk?channel=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data) {
      return reply("⚠️ Failed to fetch YouTube channel details. Ensure the username or ID is correct.");
    }

    const yt = data.data;
    const caption = `╭━━━〔 *ᴢᴇʀᴏ ᴍᴅ ʏᴏᴜᴛᴜʙᴇ ꜱᴛᴀʟᴋᴇʀ* 〕━━━⊷\n`
      + `┃👤 *𝚄𝚂𝙴𝚁𝙽𝙰𝙼𝙴:* ${yt.username}\n`
      + `┃📊 *𝚂𝚄𝙱𝚂𝙲𝚁𝙸𝙱𝙴𝚁𝚂:* ${yt.subscriber_count}\n`
      + `┃🎥 *𝚅𝙸𝙳𝙴𝙾𝚂:* ${yt.video_count}\n`
      + `┃🔗 *𝙲𝙷𝙰𝙽𝙽𝙴𝙻 𝙻𝙸𝙽𝙺:* (${yt.channel})\n`
      + `╰━━━⪼\n\n`
      + `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴇʀᴏ ᴍᴅ 💸*`;

    await conn.sendMessage(from, {
      image: { url: yt.avatar },
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
});
