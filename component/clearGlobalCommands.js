// clearGlobalCommands.js
require("dotenv").config();
const { REST, Routes } = require("discord.js");

// ใช้ Token ของบอท
const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

(async () => {
  try {
    console.log("🧹 กำลังลบ Slash Commands (Global) ทั้งหมด...");

    // ส่ง body ว่างเพื่อ 'ลบทุกคำสั่ง'
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: [],
    });

    console.log("ลบ Slash Commands (Global) ทั้งหมดเรียบร้อยแล้ว!");
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาดตอนลบ Slash Commands:", error);
  }
})();
