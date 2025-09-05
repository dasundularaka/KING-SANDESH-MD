const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "repo",
  desc: "Fetch information about a GitHub repository.",
  category: "other",
  react: "🍃",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
  try {
    const repoName = args.join(" ");
    if (!repoName) {
      return reply("❌ Please provide a GitHub repository link 📌.");
    }

    const apiUrl = `https://api.github.com/repos/${repoName}`;
    const { data } = await axios.get(apiUrl);

    let responseMsg = `📁 *𝐆ɪᴛʜᴜ𝐁 𝐑ᴇᴘᴏꜱɪᴛᴏʀ𝐘 𝐈ɴꜰ𝐎* 📁\n\n`;
    responseMsg += `📌 *𝙽𝙰𝙼𝙴*: ${data.name}\n`;
    responseMsg += `🔗 *𝚄𝚁𝙻*: ${data.html_url}\n`;
    responseMsg += `📝 *𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽*: ${data.description || "No description"}\n`;
    responseMsg += `⭐ *𝚂𝚃𝙰𝚁𝚃𝚂*: ${data.stargazers_count}\n`;
    responseMsg += `🍴 *𝙵𝙾𝚁𝙺𝚂*: ${data.forks_count}\n`;
    responseMsg += `👤 *𝙾𝚆𝙽𝙴𝚁*: ${data.owner.login}\n`;
    responseMsg += `📅 *𝙲𝚁𝙴𝙰𝚃𝙴𝙳 𝙰𝚃*: ${new Date(data.created_at).toLocaleDateString()}\n`;
    responseMsg += `\n> *© Powered By King-Sandesh-Md V2 💸*`;

    await conn.sendMessage(from, { text: responseMsg }, { quoted: m });
  } catch (error) {
    console.error("GitHub API Error:", error);
    reply(`❌ Error fetching repository data: ${error.response?.data?.message || error.message}`);
  }
});
