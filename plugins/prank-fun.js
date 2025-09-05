const { cmd } = require('../command');

cmd({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply 
}) => {
    try {
        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("✋ Only the bot owner can use this command.");
        }

        const steps = [
            '💻 *Ｓ𝚈𝚂𝚃𝙴Ｍ Ｈ𝙰𝙲Ｋ Ｓ𝚃𝙰𝚁𝚃𝙸𝙽Ｇ...* 💻',
            
            '*𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙸𝙽𝙶 𝙷𝙰𝙲𝙺𝙸𝙽𝙶 𝚃𝙾𝙾𝙻𝚂...* 🛠️',
            '*𝙲𝙾𝙽𝙽𝙴𝙲𝚃𝙸𝙽𝙶 𝚃𝙾 𝚁𝙴𝙼𝙾𝚃𝙴 𝚂𝙴𝚁𝚅𝙴𝚁𝚂...* 🌐',
            
            '```[██████████] 10%``` ⏳'                                            ,
            '```[███████████████████] 20%``` ⏳'                                   ,
            '```[███████████████████████] 30%``` ⏳'                               ,
            '```[██████████████████████████] 40%``` ⏳'                            ,
            '```[███████████████████████████████] 50%``` ⏳'                       ,
            '```[█████████████████████████████████████] 60%``` ⏳'                 ,
            '```[██████████████████████████████████████████] 70%``` ⏳'            ,
            '```[██████████████████████████████████████████████] 80%``` ⏳'        ,
            '```[██████████████████████████████████████████████████] 90%``` ⏳'    ,
            '```[████████████████████████████████████████████████████] 100%``` ✅',
            
            '🔒 *𝚂𝚈𝚂𝚃𝙴𝙼 𝙱𝚁𝙴𝙰𝙲𝙷 : 𝚂𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻𝙻𝚈..!* 🔓',
            '🚀 *𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙴𝚇𝙲𝙴𝙲𝚄𝚃𝙸𝙾𝙽 : 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...!* 🎯',
            
            '*📡 𝚃𝚁𝙰𝙽𝚂𝙼𝙸𝚃𝚃𝙸𝙽𝙶 𝙳𝙰𝚃𝙰...* 📤',
            '_🕵️‍♂️ 𝙴𝙽𝚂𝚄𝚁𝙸𝙽𝙶 𝚂𝚃𝙴𝙰𝙻𝚃𝙷..._ 🤫',
            '*🔧 𝙵𝙸𝙽𝙰𝙻𝙸𝚉𝙸𝙽𝙶 𝙾𝙿𝙰𝚁𝙴𝚃𝙸𝙾𝙽𝚂...* 🏁',
            
            '⚠️ *ησтє:* 𝙰𝙻𝙻 𝙰𝙲𝚃𝙸𝙾𝙽𝚂 𝙰𝚁𝙴 𝙵𝙾𝚁 𝙳𝙴𝙼𝙾𝙽𝚂𝚃𝚁𝙰𝚃𝙸𝙾𝙽 𝙿𝚄𝚁𝙿𝙾𝚂𝙴𝚂 𝙾𝙽𝙻𝚈.',
            '⚠️ *яємιη∂єя:* 乇ₜₕᵢcₐₗ 卄ₐcₖᵢₙg 丨ₛ ㄒₕₑ ㄖₙₗy 山ₐy ㄒₒ 乇ₙₛᵤᵣₑ 丂ₑcᵤᵣᵢₜy.',
            
            '> *𝗭𝗘𝗥𝗢 𝗠𝗗 𝗪𝗔 𝗗𝗔𝗧𝗔 𝗛𝗔𝗖𝗞𝗜𝗡𝗚 𝗦𝗬𝗦𝗧𝗘𝗠 ☣*'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed
        }
    } catch (e) {
        console.error(e);
        reply(`❌ *Error:* ${e.message}`);
    }
});
