
const { cmd } = require("../command");
const config = require("../config");

cmd({
    pattern: "report",
    alias: ["ask", "bug", "request"],
    desc: "Report a bug or request a feature",
    category: "utility",
    filename: __filename
}, async (conn, mek, m, {
    from, body, command, args, senderNumber, reply
}) => {
    try {
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("Only the bot owner can use this command.");
        }
        
        if (!args.length) {
            return reply(`Example: ${config.PREFIX}report Play command is not working`);
        }

        const reportedMessages = {};
        const devNumber = "94765714446"; // Bot owner's number
        const messageId = m.key.id;

        if (reportedMessages[messageId]) {
            return reply("This report has already been forwarded to the owner. Please wait for a response.");
        }
        reportedMessages[messageId] = true;

        const reportText = `*| REQUEST/BUG |*\n\n*𝚄𝚂𝙴𝚁*: @${m.sender.split("@")[0]}\n*𝚁𝙴𝚀𝚄𝙴𝚂𝚃/𝙱𝚄𝙶*: ${args.join(" ")}`;
        const confirmationText = `𝙷𝙸 ${m.pushName}, 𝒀𝑶𝑼𝑹 𝑹𝑬𝑸𝑼𝑬𝑺𝑻 𝑯𝑨𝑺 𝑩𝑬𝑬𝑵 𝑭𝑶𝑹𝑾𝑨𝑹𝑫𝑬𝑫 𝑻𝑶 𝑻𝑯𝑬 𝑶𝑾𝑵𝑬𝑹. 𝑷𝑳𝑬𝑨𝑺𝑬 𝑾𝑨𝑰𝑻...`;

        await conn.sendMessage(`${devNumber}@s.whatsapp.net`, {
            text: reportText,
            mentions: [m.sender]
        }, { quoted: m });

        reply(confirmationText);
    } catch (error) {
        console.error(error);
        reply("An error occurred while processing your report.");
    }
});
