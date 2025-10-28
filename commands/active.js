const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("active")
    .setDescription("ใช้คำสั่งนี้เพื่อรับ Discord Active Developer Badge 🏅"),

  async execute(interaction) {
    // ✅ ตรวจสอบว่าอยู่ในเซิร์ฟเวอร์ที่อนุญาตเท่านั้น
    const allowedGuildId = process.env.DISCORD_GUILD_ID;
    if (interaction.guild?.id !== allowedGuildId) {
      return interaction.reply({
        content: "❌ คำสั่งนี้ไม่สามารถใช้ในเซิร์ฟเวอร์นี้ได้",
        flags: 64, // ส่งเฉพาะให้ผู้ใช้เห็น
      });
    }

    // ✅ ตรวจสอบว่าเป็นผู้สร้างบอทเท่านั้น (เจ้าของบอท)
    const botOwnerId = process.env.BOT_OWNER_ID;
    if (interaction.user.id !== botOwnerId) {
      return interaction.reply({
        content: "🚫 เฉพาะผู้สร้างบอทเท่านั้นที่สามารถใช้คำสั่งนี้ได้",
        flags: 64,
      });
    }

    // ✅ ถ้าผ่านทั้งสองเงื่อนไขแล้ว แสดง Embed
    const embed = new EmbedBuilder()
      .setColor("#57F287")
      .setTitle("🏅 Discord Active Developer Badge")
      .setDescription(
        `**You have successfully ran the slash command!** 🎉\n\n` +
          `👉 ไปที่ [Discord Developer Active Badge](https://discord.com/developers/active-developer) เพื่อรับ Badge ของคุณ\n\n` +
          `การยืนยันอาจใช้เวลาสูงสุด **24 ชั่วโมง** — กรุณารออย่างอดทน 💚`
      )
      .setFooter({ text: "Made by Iuno ✨" });

    await interaction.reply({ embeds: [embed], flags: 64 });
  },
};
