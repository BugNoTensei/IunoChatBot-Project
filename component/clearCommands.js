// clearCommands.js
require("dotenv").config();
const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

(async () => {
  try {
    console.log("🧹 กำลังลบ Slash Commands ทั้งหมดใน Guild...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID
      ),
      { body: [] } // 👈 ส่ง body ว่าง = ลบทั้งหมด
    );
    console.log("ลบ Slash Commands ทั้งหมดเรียบร้อย!");
  } catch (err) {
    console.error("❌ เกิดข้อผิดพลาด:", err);
  }
})();
