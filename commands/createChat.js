const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createchat")
    .setDescription("สร้างห้องใหม่เพื่อคุยกับ น้อง Iuno")
    // .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    ,

  async execute(interaction) {
    // สร้างห้องใหม่
    const channel = await interaction.guild.channels.create({
      name: `chat-with-Iuno-${interaction.user.username}`,
      type: 0,
      topic: "ห้องนี้จะคุยกับน้อง Iuno เท่านั้น",
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: interaction.user.id,
          allow: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: interaction.client.user.id, // ให้บอทเห็นและตอบได้
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
          ],
        },
      ],
    });

    // path ไฟล์ที่เก็บ channel ที่เปิดให้บอทตอบ
    const allowedChannelsPath = "./allowedChannels.json";
    let allowedChannels = [];

    try {
      // ถ้ามีไฟล์ -> อ่านข้อมูลในนั้น
      if (fs.existsSync(allowedChannelsPath)) {
        const data = fs.readFileSync(allowedChannelsPath, "utf8").trim();
        if (data) {
          allowedChannels = JSON.parse(data); // แปลงเป็น array
        } else {
          allowedChannels = []; // ถ้าไฟล์ว่าง ให้เริ่มใหม่เป็น []
        }
      }
    } catch (err) {
      console.error("อ่าน allowedChannels.json ไม่ได้:", err);
      allowedChannels = [];
    }

    // เพิ่ม channel ใหม่เข้า array ถ้ายังไม่มี
    if (!allowedChannels.includes(channel.id)) {
      allowedChannels.push(channel.id);
      fs.writeFileSync(
        allowedChannelsPath,
        JSON.stringify(allowedChannels, null, 2)
      );
      console.log(`📁 บันทึกห้องใหม่: ${channel.id}`);
    }

    // ตอบกลับ 
    await interaction.reply({
      content: `สร้างห้องคุยกับ Iuno แล้ว! <#${channel.id}>`,
      flags: 64, // แสดงเฉพาะผู้ใช้ที่สั่ง
    });
  },
};
