const fs = require('fs');
const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "menu",
    desc: "Show interactive menu system",
    category: "menu",
    react: "🧾",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Count total commands
        const totalCommands = Object.keys(commands).length;
        
        const menuCaption = `╭━━━〔 *${config.BOT_NAME}* 〕┈⊷
┃★╭──────────────
┃★│ 👑 Ｏᴡɴᴇʀ : *${config.OWNER_NAME}*
┃★│ 🤖 Ｂᴀɪʟᴇʏꜱ : *Multi Device*
┃★│ 💻 Ｔʏᴘᴇ : *NodeJs*
┃★│ 🚀 Ｐʟᴀᴛꜰᴏʀᴍ : *Cloud*
┃★│ ⚙️ Ｍᴏᴅᴇ : *[${config.MODE}]*
┃★│ 🔣 Ｐʀᴇꜰɪx : *[${config.PREFIX}]*
┃★│ 🏷️ Ｖᴇʀꜱɪᴏɴ : *2.0.0 Bᴇᴛᴀ*
┃★│ 📚 Ｃᴏᴍᴍᴀɴᴅꜱ : *${totalCommands}*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
╭━━〔 *𝙼𝙴𝙽𝚄 𝙻𝙸𝚂𝚃* 〕━━┈⊷
    ┃◈╭─────────────·๏
┃◈│1️⃣  📥 *_𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔_*
┃◈│2️⃣  👥 *_𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔_*
┃◈│3️⃣  😄 *_𝐅𝐔𝐍 𝐌𝐄𝐍𝐔_*
┃◈│4️⃣  👑 *_𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔_*
┃◈│5️⃣  🤖 *_𝐀𝐈 𝐌𝐄𝐍𝐔_*
┃◈│6️⃣  🎎 *_𝐀𝐍𝐈𝐌𝐄 𝐌𝐄𝐍𝐔_*
┃◈│7️⃣  🔄 *_𝐂𝐎𝐍𝐕𝐄𝐑𝐓 𝐌𝐄𝐍𝐔_*
┃◈│8️⃣  📌 *_𝐎𝐓𝐇𝐄𝐑 𝐌𝐄𝐍𝐔_*
┃◈│9️⃣  💞 *_𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒 𝐌𝐄𝐍𝐔_*
┃◈│🔟  🏠 *_𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔_*
┃◈╰───────────┈⊷
╰──────────────┈⊷
${config.FOOTER}`;

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402220977044@newsletter',
                newsletterName: config.OWNER_NAME,
                serverMessageId: 143
            }
        };

        await conn.sendMessage(m.chat, {
      video: { url: "https://files.catbox.moe/r97f86.mp4" },
      mimetype: "video/mp4",
      gifPlayback: true,
      ptv: true  
    }, { quoted: mek });

        // Function to send menu image with timeout
        const sendMenuImage = async () => {
            try {
                return await conn.sendMessage(
                    from,
                    {
                        image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/3jpwr1.jpg' },
                        caption: menuCaption,
                        contextInfo: contextInfo
                    },
                    { quoted: mek }
                );
            } catch (e) {
                console.log('Image send failed, falling back to text');
                return await conn.sendMessage(
                    from,
                    { text: menuCaption, contextInfo: contextInfo },
                    { quoted: mek }
                );
            }
        };

        // Send image with timeout
        let sentMsg;
        try {
            sentMsg = await Promise.race([
                sendMenuImage(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Image send timeout')), 10000))
            ]);
        } catch (e) {
            console.log('Menu send error:', e);
            sentMsg = await conn.sendMessage(
                from,
                { text: menuCaption, contextInfo: contextInfo },
                { quoted: mek }
            );
        }
        
        const messageID = sentMsg.key.id;

        // Menu data (complete version)
        const menuData = {
            '1': {
                title: "📥 *Download Menu* 📥",
                content: `╭━━━〔 *𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 𝙼𝙴𝙽𝚄* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🌐 *Social Media*
┃★│ • facebook [url]
┃★│ • mediafire [url]
┃★│ • tiktok [url]
┃★│ • twitter [url]
┃★│ • Insta [url]
┃★│ • apk [app]
┃★│ • img [query]
┃★│ • tt2 [url]
┃★│ • pins [url]
┃★│ • apk2 [app]
┃★│ • fb2 [url]
┃★│ • pinterest [url]
┃★╰──────────────
┃★╭──────────────
┃★│ 🎵 *Music/Video*
┃★│ • spotify [query]
┃★│ • play [song]
┃★│ • play2-10 [song]
┃★│ • audio [url]
┃★│ • video [url]
┃★│ • video2-10 [url]
┃★│ • ytmp3 [url]
┃★│ • ytmp4 [url]
┃★│ • song [name]
┃★│ • darama [name]
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
${config.FOOTER}`,
                image: true
            },
            '2': {
                title: "👥 *Group Menu* 👥",
                content: `╭━━━〔 *𝙶𝚁𝙾𝚄𝙿 𝙼𝙴𝙽𝚄* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🛠️ *Management*
┃★│ • grouplink
┃★│ • kickall
┃★│ • kickall2
┃★│ • kickall3
┃★│ • add @user
┃★│ • remove @user
┃★│ • kick @user
┃★╰──────────────
┃★╭──────────────
┃★│ ⚡ *Admin Tools*
┃★│ • promote @user
┃★│ • demote @user
┃★│ • dismiss 
┃★│ • revoke
┃★│ • mute [time]
┃★│ • unmute
┃★│ • lockgc
┃★│ • unlockgc
┃★╰──────────────
┃★╭──────────────
┃★│ 🏷️ *Tagging*
┃★│ • tag @user
┃★│ • hidetag [msg]
┃★│ • tagall
┃★│ • tagadmins
┃★│ • invite
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
${config.FOOTER}`,
                image: true
            },
            '3': {
                title: "😄 *Fun Menu* 😄",
                content: `╭━━━〔 *𝙵𝚄𝙽 𝙼𝙴𝙽𝚄* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🎭 *Interactive*
┃★│ • shapar
┃★│ • rate @user
┃★│ • insult @user
┃★│ • hack @user
┃★│ • ship @user1 @user2
┃★│ • character
┃★│ • pickup
┃★│ • joke
┃★╰──────────────
┃★╭──────────────
┃★│ 😂 *Reactions*
┃★│ • hrt
┃★│ • hpy
┃★│ • syd
┃★│ • anger
┃★│ • shy
┃★│ • kiss
┃★│ • mon
┃★│ • cunfuzed
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
${config.FOOTER}`,
                image: true
            },
            '4': {
                title: "👑 *Owner Menu* 👑",
                content: `╭━━━〔 *𝙾𝚆𝙽𝙴𝚁 𝙼𝙴𝙽𝚄* 〕━━━┈⊷
┃★╭──────────────
┃★│ ⚠️ *Restricted*
┃★│ • block @user
┃★│ • unblock @user
┃★│ • fullpp [img]
┃★│ • setpp [img]
┃★│ • restart
┃★│ • shutdown
┃★│ • updatecmd
┃★╰──────────────
┃★╭──────────────
┃★│ ℹ️ *Info Tools*
┃★│ • gjid
┃★│ • jid @user
┃★│ • listcmd
┃★│ • allmenu
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
${config.FOOTER}`,
                image: true
            },
            '5': {
                title: "🤖 *AI Menu* 🤖",
                content: `╭━━━〔 *𝙰𝙸 𝙼𝙴𝙽𝚄* 〕━━━┈⊷
┃★╭──────────────
┃★│ 💬 *Chat AI*
┃★│ • ai [query]
┃★│ • gpt3 [query]
┃★│ • gpt2 [query]
┃★│ • gptmini [query]
┃★│ • gpt [query]
┃★│ • meta [query]
┃★╰──────────────
┃★╭──────────────
┃★│ 🖼️ *Image AI*
┃★│ • imagine [text]
┃★│ • imagine2 [text]
┃★╰──────────────
┃★╭──────────────
┃★│ 🔍 *Specialized*
┃★│ • blackbox [query]
┃★│ • luma [query]
┃★│ • dj [query]
┃★│ • khan [query]
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
${config.FOOTER}`,
                image: true
            },
            '6': {
                title: "🎎 *Anime Menu* 🎎",
                content: `╭━━━〔 *𝙰𝙽𝙸𝙼𝙴 𝙼𝙴𝙽𝚄* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🖼️ *Images*
┃★│ • fack
┃★│ • dog
┃★│ • awoo
┃★│ • garl
┃★│ • waifu
┃★│ • neko
┃★│ • megnumin
┃★│ • maid
┃★│ • loli
┃★╰──────────────
┃★╭──────────────
┃★│ 🎭 *Characters*
┃★│ • animegirl
┃★│ • animegirl1-5
┃★│ • anime1-5
┃★│ • foxgirl
┃★│ • naruto
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
${config.FOOTER}`,
                image: true
            },
            '7': {
                title: "🔄 *Convert Menu* 🔄",
                content: `╭━━━〔 *𝙲𝙾𝙽𝚅𝙴𝚁𝚃 𝙼𝙴𝙽𝚄* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🖼️ *Media*
┃★│ • sticker [img]
┃★│ • sticker2 [img]
┃★│ • emojimix 😎+😂
┃★│ • take [name,text]
┃★│ • tomp3 [video]
┃★╰──────────────
┃★╭──────────────
┃★│ 📝 *Text*
┃★│ • fancy [text]
┃★│ • tts [text]
┃★│ • trt [text]
┃★│ • base64 [text]
┃★│ • unbase64 [text]
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
${config.FOOTER}`,
                image: true
            },
            '8': {
                title: "📌 *Other Menu* 📌",
                content: `╭━━━〔 *𝙾𝚃𝙷𝙴𝚁 𝙼𝙴𝙽𝚄* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🕒 *Utilities*
┃★│ • timenow
┃★│ • date
┃★│ • count [num]
┃★│ • calculate [expr]
┃★│ • countx
┃★╰──────────────
┃★╭──────────────
┃★│ 🎲 *Random*
┃★│ • flip
┃★│ • coinflip
┃★│ • rcolor
┃★│ • roll
┃★│ • fact
┃★╰──────────────
┃★╭──────────────
┃★│ 🔍 *Search*
┃★│ • define [word]
┃★│ • news [query]
┃★│ • movie [name]
┃★│ • weather [loc]
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
${config.FOOTER}`,
                image: true
            },
            '9': {
                title: "💞 *Reactions Menu* 💞",
                content: `╭━━━〔 *𝚁𝙴𝙰𝙲𝚃𝙸𝙾𝙽𝚂 𝙼𝙴𝙽𝚄* 〕━━━┈⊷
┃★╭──────────────
┃★│ ❤️ *Affection*
┃★│ • cuddle @user
┃★│ • hug @user
┃★│ • kiss @user
┃★│ • lick @user
┃★│ • pat @user
┃★╰──────────────
┃★╭──────────────
┃★│ 😂 *Funny*
┃★│ • bully @user
┃★│ • bonk @user
┃★│ • yeet @user
┃★│ • slap @user
┃★│ • kill @user
┃★╰──────────────
┃★╭──────────────
┃★│ 😊 *Expressions*
┃★│ • blush @user
┃★│ • smile @user
┃★│ • happy @user
┃★│ • wink @user
┃★│ • poke @user
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
${config.FOOTER}`,
                image: true
            },
            '10': {
                title: "🏠 *Main Menu* 🏠",
                content: `╭━━━〔 *𝙼𝙰𝙸𝙽 𝙼𝙴𝙽𝚄* 〕━━━┈⊷
┃★╭──────────────
┃★│ ℹ️ *Bot Info*
┃★│ • ping
┃★│ • live
┃★│ • alive
┃★│ • runtime
┃★│ • uptime
┃★│ • repo
┃★│ • owner
┃★╰──────────────
┃★╭──────────────
┃★│ 🛠️ *Controls*
┃★│ • menu
┃★│ • menu2
┃★│ • restart
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
${config.FOOTER}`,
                image: true
            }
        };

        // Message handler with improved error handling
        const handler = async (msgData) => {
            try {
                const receivedMsg = msgData.messages[0];
                if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

                const isReplyToMenu = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;
                
                if (isReplyToMenu) {
                    const receivedText = receivedMsg.message.conversation || 
                                      receivedMsg.message.extendedTextMessage?.text;
                    const senderID = receivedMsg.key.remoteJid;

                    if (menuData[receivedText]) {
                        const selectedMenu = menuData[receivedText];
                        
                        try {
                            if (selectedMenu.image) {
                                await conn.sendMessage(
                                    senderID,
                                    {
                                        image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/3jpwr1.jpg' },
                                        caption: selectedMenu.content,
                                        contextInfo: contextInfo
                                    },
                                    { quoted: receivedMsg }
                                );
                            } else {
                                await conn.sendMessage(
                                    senderID,
                                    { text: selectedMenu.content, contextInfo: contextInfo },
                                    { quoted: receivedMsg }
                                );
                            }

                            await conn.sendMessage(senderID, {
                                react: { text: '✅', key: receivedMsg.key }
                            });

                        } catch (e) {
                            console.log('Menu reply error:', e);
                            await conn.sendMessage(
                                senderID,
                                { text: selectedMenu.content, contextInfo: contextInfo },
                                { quoted: receivedMsg }
                            );
                        }

                    } else {
                        await conn.sendMessage(
                            senderID,
                            {
                                text: `❌ *Invalid Option!* ❌\n\nPlease reply with a number between 1-10 to select a menu.\n\n*Example:* Reply with "1" for Download Menu\n\n${config.FOOTER}`,
                                contextInfo: contextInfo
                            },
                            { quoted: receivedMsg }
                        );
                    }
                }
            } catch (e) {
                console.log('Handler error:', e);
            }
        };

        // Add listener
        conn.ev.on("messages.upsert", handler);

        // Remove listener after 5 minutes
        setTimeout(() => {
            conn.ev.off("messages.upsert", handler);
        }, 300000);

    } catch (e) {
        console.error('Menu Error:', e);
        try {
            await conn.sendMessage(
                from,
                { text: `❌ Menu system is currently busy. Please try again later.\n\n ${config.FOOTER}` },
                { quoted: mek }
            );
        } catch (finalError) {
            console.log('Final error handling failed:', finalError);
        }
    }
});
