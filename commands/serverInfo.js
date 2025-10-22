const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("ดูข้อมูลของเซิร์ฟเวอร์นี้ 🏰"),

  async execute(interaction) {
    const { guild } = interaction;

    // ดึงข้อมูลเซิร์ฟเวอร์
    const owner = await guild.fetchOwner();

    const embed = new EmbedBuilder()
      .setColor("#FFD1DC")
      .setTitle(`📊 ข้อมูลของเซิร์ฟเวอร์: ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .addFields(
        {
          name: "👑 เจ้าของเซิร์ฟเวอร์",
          value: `${owner.user.tag}`,
          inline: true,
        },
        { name: "🆔 Server ID", value: `${guild.id}`, inline: true },
        {
          name: "👥 สมาชิกทั้งหมด",
          value: `${guild.memberCount}`,
          inline: true,
        },
        {
          name: "💬 จำนวนห้องแชท",
          value: `${guild.channels.cache.filter((c) => c.type === 0).size}`,
          inline: true,
        },
        {
          name: "🎙️ จำนวนห้องเสียง",
          value: `${guild.channels.cache.filter((c) => c.type === 2).size}`,
          inline: true,
        },
        {
          name: "📅 สร้างเมื่อ",
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
          inline: false,
        },
        {
          name: "🌍 ภูมิภาค",
          value: `${guild.preferredLocale || "ไม่ระบุ"}`,
          inline: true,
        }
      )
      .setFooter({
        text: `ขอข้อมูลโดย ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
