const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "tiktokstalk",
  alias: ["tstalk", "ttstalk"],
  react: "📱",
  desc: "Fetch TikTok user profile details.",
  category: "search",
  filename: __filename
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    if (!q) {
      return reply("❎ Please provide a TikTok username.\n\n*Example:* .tiktokstalk mrbeast");
    }

    const apiUrl = `https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status) {
      return reply("❌ User not found. Please check the username and try again.");
    }

    const user = data.data.user;
    const stats = data.data.stats;

    const profileInfo = `🎭 *ᴢᴇʀᴏ ᴍᴅ ᴛɪᴋᴛᴏᴋ ꜱᴛᴀʟᴋᴇʀ* 🎭

👤 *𝚄𝚂𝙴𝚁𝙽𝙰𝙼𝙴:* @${user.uniqueId}
📛 *𝙽𝙸𝙲𝙺𝙽𝙰𝙼𝙴:* ${user.nickname}
✅ *𝚅𝙴𝚁𝙸𝙵𝙸𝙴𝙳:* ${user.verified ? "Yes ✅" : "No ❌"}
📍 *𝚁𝙴𝙶𝙸𝙾𝙽:* ${user.region}
📝 *𝙱𝙸𝙾:* ${user.signature || "No bio available."}
🔗 *𝙱𝙸𝙾 𝙻𝙸𝙽𝙺:* ${user.bioLink?.link || "No link available."}

📊 *𝚂𝚃𝙰𝚃𝙸𝚂𝚃𝙸𝙲𝚂:*
👥 *𝙵𝙾𝙻𝙻𝙾𝚆𝙴𝚁𝚂:* ${stats.followerCount.toLocaleString()}
👤 *𝙵𝙾𝙻𝙻𝙾𝚆𝙸𝙽𝙶:* ${stats.followingCount.toLocaleString()}
❤️ *𝙻𝙸𝙺𝙴𝚂:* ${stats.heartCount.toLocaleString()}
🎥 *𝚅𝙸𝙳𝙴𝙾𝚂:* ${stats.videoCount.toLocaleString()}

📅 *𝙰𝙲𝙲𝙾𝚄𝙽𝚃 𝙲𝚁𝙴𝙰𝚃𝙴𝙳:* ${new Date(user.createTime * 1000).toLocaleDateString()}
🔒 *𝙿𝚁𝙸𝚅𝙰𝚃𝙴 𝙰𝙲𝙲𝙾𝚄𝙽𝚃:* ${user.privateAccount ? "Yes 🔒" : "No 🌍"}

🔗 *Profile URL:* https://www.tiktok.com/@${user.uniqueId}
`;

    const profileImage = { image: { url: user.avatarLarger }, caption: profileInfo };

    await conn.sendMessage(from, profileImage, { quoted: m });
  } catch (error) {
    console.error("❌ Error in TikTok stalk command:", error);
    reply("⚠️ An error occurred while fetching TikTok profile data.");
  }
});

