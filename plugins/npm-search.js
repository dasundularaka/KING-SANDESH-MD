const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "npm",
  desc: "Search for a package on npm.",
  react: '📦',
  category: "convert",
  filename: __filename,
  use: ".npm <package-name>"
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    // Check if a package name is provided
    if (!args.length) {
      return reply("Please provide the name of the npm package you want to search for. Example: .npm express");
    }

    const packageName = args.join(" ");
    const apiUrl = `https://registry.npmjs.org/${encodeURIComponent(packageName)}`;

    // Fetch package details from npm registry
    const response = await axios.get(apiUrl);
    if (response.status !== 200) {
      throw new Error("Package not found or an error occurred.");
    }

    const packageData = response.data;
    const latestVersion = packageData["dist-tags"].latest;
    const description = packageData.description || "No description available.";
    const npmUrl = `https://www.npmjs.com/package/${packageName}`;
    const license = packageData.license || "Unknown";
    const repository = packageData.repository ? packageData.repository.url : "Not available";

    // Create the response message
    const message = `
*🔎 𝗭𝗘𝗥𝗢 𝗠𝗗 𝗡𝗣𝗠 𝗦𝗘𝗔𝗥𝗖𝗛*

*🔰 𝙽𝙿𝙼 𝙿𝙰𝙲𝙺𝙰𝙶𝙴:* ${packageName}
*📄 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽:* ${description}
*⏸️ 𝙻𝙰𝚂𝚃 𝚅𝙴𝚁𝚂𝙸𝙾𝙽:* ${latestVersion}
*🪪 𝙻𝙸𝙲𝙴𝙽𝙲𝙴:* ${license}
*🪩 𝚁𝙴𝙿𝙾𝚂𝙸𝚃𝙾𝚁𝚈:* ${repository}
*🔗 𝙽𝙿𝙼 𝚄𝚁𝙻:* ${npmUrl}
`;

    // Send the message
    await conn.sendMessage(from, { text: message }, { quoted: mek });

  } catch (error) {
    console.error("Error:", error);

    // Send detailed error logs to WhatsApp
    const errorMessage = `
*❌ 𝐍ᴘ𝐌 𝐂ᴏᴍᴍᴀɴ𝐃 𝐄ʀʀᴏ𝐑 𝐋ᴏɢ𝐒*

*𝙴𝚁𝚁𝙾𝚁 𝙼𝙴𝚂𝚂𝙰𝙶𝙴:* ${error.message}
*𝚂𝚃𝙰𝙲𝙺 𝚃𝚁𝙰𝙲𝙴:* ${error.stack || "Not available"}
*𝚃𝙸𝙼𝙴 𝚂𝚃𝙰𝙼𝙿:* ${new Date().toISOString()}
`;

    await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });
    reply("An error occurred while fetching the npm package details.");
  }
});
