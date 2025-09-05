const config = require('../config')
const { cmd, commands } = require('../command')
const { runtime } = require('../lib/functions')

cmd({
    pattern: "list",
    alias: ["listcmd", "commands"],
    desc: "Show all available commands with descriptions",
    category: "menu",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Count total commands and aliases
        const totalCommands = Object.keys(commands).length
        let aliasCount = 0
        Object.values(commands).forEach(cmd => {
            if (cmd.alias) aliasCount += cmd.alias.length
        })

        // Get unique categories count
        const categories = [...new Set(Object.values(commands).map(c => c.category))]

        let menuText = `╭───『 *${config.BOT_NAME} 𝐂ᴏᴍᴍᴀɴ𝐃 𝐋ɪꜱ𝐓* 』───⳹
│
│ *🛠️ Ｂᴏᴛ Ｉɴꜰᴏʀᴍᴀᴛɪᴏɴ*
│ • 🤖 𝙱𝙾𝚃 𝙽𝙰𝙼𝙴: ${config.BOT_NAME}
│ • 👑 𝙾𝚆𝙽𝙴𝚁: ${config.OWNER_NAME}
│ • ⚙️ 𝙿𝚁𝙴𝙵𝙸𝚇: [${config.PREFIX}]
│ • 🌐 𝙿𝙻𝙰𝚃𝙵𝙾𝚁𝙼: Panel
│ • 📦 𝚅𝙴𝚁𝚂𝙸𝙾𝙽: 2.0.0
│ • 🕒 𝚁𝚄𝙽𝚃𝙸𝙼𝙴: ${runtime(process.uptime())}
│
│ *📊 Ｃᴏᴍᴍᴀɴᴅ Ｓᴛᴀᴛꜱ*
│ • 📜 𝚃𝙾𝚃𝙰𝙻 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂: ${totalCommands}
│ • 🔄 𝚃𝙾𝚃𝙰𝙻 𝙰𝙻𝙸𝙰𝚂𝙴𝚂: ${aliasCount}
│ • 🗂️ 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝙸𝙴𝚂: ${categories.length}
│
╰────────────────⳹\n`

        // Organize commands by category
        const categorized = {}
        categories.forEach(cat => {
            categorized[cat] = Object.values(commands).filter(c => c.category === cat)
        })

        // Generate menu for each category
        for (const [category, cmds] of Object.entries(categorized)) {
            menuText += `╭───『 *${category.toUpperCase()}* 』───⳹
│ • 📂 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂: ${cmds.length}
│ • 🔄 𝙰𝙻𝙸𝙰𝚂𝙴𝚂: ${cmds.reduce((a, c) => a + (c.alias ? c.alias.length : 0), 0)}
│
`

            cmds.forEach(c => {
                menuText += `┃▸📄 Ｃᴏᴍᴍᴀɴᴅ: .${c.pattern}\n`
                menuText += `┃▸❕ ${c.desc || 'No description available'}\n`
                if (c.alias && c.alias.length > 0) {
                    menuText += `┃▸🔹 Ａʟɪᴀꜱ: ${c.alias.map(a => `.${a}`).join(', ')}\n`
                }
                if (c.use) {
                    menuText += `┃▸💡 Ｕꜱᴀɢᴇ: ${c.use}\n`
                }
                menuText += `│\n`
            })
            
            menuText += `╰────────────────⳹\n`
        }

        menuText += `\n📝 *𝙉𝙊𝙏𝙀*: 𝚄𝚂𝙴 ${config.PREFIX}𝙷𝙴𝙻𝙿 <command> 𝙵𝙾𝚁 𝙳𝙴𝚃𝙰𝙸𝙻𝙴𝙳 𝙷𝙴𝙻𝙿\n`
        menuText += `> ${config.FOOTER}`

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/3jpwr1.jpg' },
                caption: menuText,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true
                }
            },
            { quoted: mek }
        )

    } catch (e) {
        console.error('Command List Error:', e)
        reply(`❌ Error generating command list: ${e.message}`)
    }
})
