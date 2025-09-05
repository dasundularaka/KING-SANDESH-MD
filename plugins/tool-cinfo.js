const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "countryinfo",
    alias: ["cinfo", "country","cinfo2"],
    desc: "Get information about a country",
    category: "info",
    react: "🌍",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a country name.\nExample: `.countryinfo Sri Lanka`");

        const apiUrl = `https://api.siputzx.my.id/api/tools/countryInfo?name=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) {
            await react("❌");
            return reply(`No information found for *${q}*. Please check the country name.`);
        }

        const info = data.data;
        let neighborsText = info.neighbors.length > 0
            ? info.neighbors.map(n => `🌍 *${n.name}*`).join(", ")
            : "No neighboring countries found.";

        const text = `🌍 *𝐂𝐎𝐔𝐍𝐓𝐑𝐘 𝐈𝐍𝐅𝐎 <| 𝙕𝙀𝙍𝙊-𝙈𝘿 : ${info.name}* 🌍\n\n` +
                     `🏛 *𝙲𝙰𝙿𝙸𝚃𝙰𝙻:* ${info.capital}\n` +
                     `📍 *𝙲𝙾𝙽𝚃𝙸𝙽𝙴𝙽𝚃:* ${info.continent.name} ${info.continent.emoji}\n` +
                     `📞 *𝙲𝙾𝚄𝙽𝚃𝚁𝚈 𝙲𝙾𝙳𝙴:* ${info.phoneCode}\n` +
                     `📏 *𝙰𝚁𝙴𝙰:* ${info.area.squareKilometers} km² (${info.area.squareMiles} mi²)\n` +
                     `🚗 *𝙳𝚁𝙸𝚅𝙸𝙽𝙶 𝚂𝙸𝙳𝙴:* ${info.drivingSide}\n` +
                     `💱 *𝙲𝚄𝚁𝚁𝙴𝙽𝙲𝚈:* ${info.currency}\n` +
                     `🔤 *𝙻𝙰𝙽𝙶𝚄𝙰𝙶𝙴𝚂:* ${info.languages.native.join(", ")}\n` +
                     `🌟 *𝙵𝙰𝙼𝙾𝚄𝚂 𝙵𝙾𝚁:* ${info.famousFor}\n` +
                     `🌍 *𝙸𝚂𝙾 𝙲𝙾𝙳𝙴𝚂:* ${info.isoCode.alpha2.toUpperCase()}, ${info.isoCode.alpha3.toUpperCase()}\n` +
                     `🌎 *𝙸𝙽𝚃𝙴𝚃𝙽𝙴𝚃 𝚃𝙻𝙳:* ${info.internetTLD}\n\n` +
                     `🔗 *𝙽𝙴𝙸𝙶𝙷𝙱𝙾𝚄𝚁𝚂:* ${neighborsText}`;

        await conn.sendMessage(from, {
            image: { url: info.flag },
            caption: text,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });

        await react("✅"); // React after successful response
    } catch (e) {
        console.error("Error in countryinfo command:", e);
        await react("❌");
        reply("An error occurred while fetching country information.");
    }
});
