const fetch = require("node-fetch");
const { cmd } = require("../command");

cmd({
  pattern: "tiktoksearch",
  alias: ["tiktoks", "tiks"],
  desc: "Search for TikTok videos using a query.",
  react: '✅',
  category: 'tools',
  filename: __filename
}, async (conn, m, store, {
  from,
  args,
  reply
}) => {
  if (!args[0]) {
    return reply("🌸 What do you want to search on TikTok?\n\n*Usage Example:*\n.tiktoksearch <query>");
  }

  const query = args.join(" ");
  await store.react('⌛');

  try {
    reply(`🔎 𝐒ᴇᴀʀᴄʜɪɴ𝐆 𝐓ɪᴋᴛᴏ𝐊 𝐅ᴏ𝐑 : *${query}*`);
    
    const response = await fetch(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data || !data.data || data.data.length === 0) {
      await store.react('❌');
      return reply("❌ No results found for your query. Please try with a different keyword.");
    }

    // Get up to 7 random results
    const results = data.data.slice(0, 7).sort(() => Math.random() - 0.5);

    for (const video of results) {
      const message = `♣ *𝐓ɪ𝐊 𝐓ᴏ𝐊 𝐕ɪᴅᴇ𝐎 𝐑ᴇꜱᴜʟ𝐓*:\n\n`
        + `*• 𝚃𝙸𝚃𝙻𝙴*: ${video.title}\n`
        + `*• 𝙰𝚄𝚃𝙷𝙾𝚁*: ${video.author || 'Unknown'}\n`
        + `*• 𝙳𝚄𝚁𝙰𝚃𝙸𝙾𝙽*: ${video.duration || "Unknown"}\n`
        + `*• 𝚄𝚁𝙻*: ${video.link}\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴇʀᴏ ᴍᴅ 💸*`;

      if (video.nowm) {
        await conn.sendMessage(from, {
          video: { url: video.nowm },
          caption: message
        }, { quoted: m });
      } else {
        reply(`❌ Failed to retrieve video for *"${video.title}"*.`);
      }
    }

    await store.react('✅');
  } catch (error) {
    console.error("Error in TikTokSearch command:", error);
    await store.react('❌');
    reply("❌ An error occurred while searching TikTok. Please try again later.");
  }
});
