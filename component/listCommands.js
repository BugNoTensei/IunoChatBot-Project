// listCommands.js
require("dotenv").config();
const { REST, Routes } = require("discord.js");

// ตั้งค่า REST API ของ Discord
const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

(async () => {
  try {
    console.log("กำลังดึงรายการ Slash Commands...");

    // ----- GLOBAL COMMANDS -----
    const globalCommands = await rest.get(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID)
    );
    console.log("\n GLOBAL COMMANDS:");
    if (globalCommands.length === 0) {
      console.log(" ไม่มี Global Commands อยู่เลย");
    } else {
      globalCommands.forEach((cmd) => console.log(`- ${cmd.name}`));
    }

    // ----- GUILD COMMANDS -----
    if (!process.env.DISCORD_GUILD_ID) {
      console.log(
        "\n ข้าม Guild commands เพราะไม่มีการตั้งค่า DISCORD_GUILD_ID ใน .env"
      );
    } else {
      const guildCommands = await rest.get(
        Routes.applicationGuildCommands(
          process.env.DISCORD_CLIENT_ID,
          process.env.DISCORD_GUILD_ID
        )
      );
      console.log("\n GUILD COMMANDS:");
      if (guildCommands.length === 0) {
        console.log(" ไม่มี Guild Commands อยู่เลย");
      } else {
        guildCommands.forEach((cmd) => console.log(`- ${cmd.name}`));
      }
    }

    console.log("\n🎉 เสร็จสิ้น!");
  } catch (err) {
    console.error("❌ ดึงข้อมูลไม่ได้:", err);
  }
})();
