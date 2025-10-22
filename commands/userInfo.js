const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("ดูข้อมูลของคุณหรือผู้ใช้ที่เลือก 👤")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("เลือกผู้ใช้ที่ต้องการดูข้อมูล")
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("target") || interaction.user;
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(() => null);

    const embed = new EmbedBuilder()
      .setColor("#A6DCEF")
      .setTitle(`👤 ข้อมูลของ ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addFields(
        { name: "🆔 User ID", value: user.id, inline: true },
        { name: "📛 ชื่อ", value: `${user.tag}`, inline: true },
        {
          name: "📅 สร้างบัญชีเมื่อ",
          value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`,
          inline: false,
        }
      );

    if (member) {
      embed.addFields(
        {
          name: "📅 เข้าร่วมเซิร์ฟเวอร์เมื่อ",
          value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`,
          inline: false,
        },
        {
          name: "🎭 ตำแหน่ง (Roles)",
          value: member.roles.cache.map((r) => r).join(" ") || "ไม่มี",
          inline: false,
        },
        {
          name: "💬 สถานะ",
          value: member.presence?.status || "ออฟไลน์",
          inline: true,
        }
      );
    }

    embed
      .setFooter({
        text: `ขอข้อมูลโดย ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
