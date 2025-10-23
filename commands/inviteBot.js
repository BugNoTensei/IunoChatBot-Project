const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invitebot")
    .setDescription("🔗 สร้างลิงก์เชิญบอท Iuno เข้าสู่เซิร์ฟเวอร์ของคุณ"),

  async execute(interaction) {
    try {
      const clientId = process.env.DISCORD_CLIENT_ID;
      if (!clientId) {
        return interaction.reply({
          content: "❌ ไม่พบค่า DISCORD_CLIENT_ID ในไฟล์ .env",
          ephemeral: true,
        });
      }

      //  URL สำหรับเชิญบอท 
      const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands`;

      const embed = new EmbedBuilder()
        .setColor("#FFD1DC")
        .setTitle("🔗 เชิญบอท Iuno เข้าสู่เซิร์ฟเวอร์ของคุณ")
        .setDescription(
          `กดลิงก์ด้านล่างเพื่อเพิ่มบอทเข้าเซิร์ฟเวอร์ของคุณ 💖\n\n[กดเพื่อเชิญ Iuno](${inviteUrl})`
        )
        .setFooter({
          text: "Iuno Bot Invitation System",
          iconURL: interaction.client.user.displayAvatarURL(),
        })
        .setTimestamp();

      await interaction.reply({ embeds: [embed], flags: 64 }); // แสดงเฉพาะคนใช้คำสั่ง
    } catch (error) {
      console.error("❌ Invite Command Error:", error);
      await interaction.reply({
        content: "เกิดข้อผิดพลาดในการสร้างลิงก์เชิญบอท ❌",
        ephemeral: true,
      });
    }
  },
};
