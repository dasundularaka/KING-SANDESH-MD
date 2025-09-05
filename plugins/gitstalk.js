const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "githubstalk",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "menu",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.");
        }
        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `👤 *𝚄𝚂𝙴𝚁𝙽𝙰𝙼𝙴*: ${data.name || data.login}
🔗 *𝙶𝙸𝚃𝙷𝚄𝙱 𝚄𝚁𝙻*:(${data.html_url})
📝 *𝙱𝙸𝙾*: ${data.bio || 'Not available'}
🏙️ *𝙻𝙾𝙲𝙰𝚃𝙸𝙾𝙽*: ${data.location || 'Unknown'}
📊 *𝙿𝚄𝙱𝙻𝙸𝙲 𝚁𝙴𝙿𝙾𝚂*: ${data.public_repos}
👥 *𝙵𝙾𝙻𝙻𝙾𝚆𝙴𝚁𝚂*: ${data.followers} | Following: ${data.following}
📅 *𝙲𝚁𝙴𝙰𝚃𝙴𝙳 𝙰𝚃*: ${new Date(data.created_at).toDateString()}
🔭 *𝙿𝚄𝙱𝙻𝙸𝙲 𝙶𝙸𝚂𝚃𝚂*: ${data.public_gists}
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴇʀᴏ ᴍᴅ 💸*`;
          const sentMsg = await conn.sendMessage(from,{image:{url: data.avatar_url },caption: userInfo },{quoted:mek })
    } catch (e) {
        console.log(e);
        reply(`error: ${e.response ? e.response.data.message : e.message}`);
    }
});

// jawad tech x 
