const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("enablechat")
    .setDescription("ตั้งค่าห้องนี้ให้คุยกับ น้อง Iuno ได้"),

  async execute(interaction) {
    const allowedChannelsPath = "./allowedChannels.json";
    let allowedChannels = [];

    if (fs.existsSync(allowedChannelsPath)) {
      allowedChannels = JSON.parse(fs.readFileSync(allowedChannelsPath));
    }

    if (!allowedChannels.includes(interaction.channel.id)) {
      allowedChannels.push(interaction.channel.id);
      fs.writeFileSync(allowedChannelsPath, JSON.stringify(allowedChannels));
    }

    await interaction.reply(`เปิดโหมดคุยกับ น้อง Iuno ในห้องนี้แล้ว!`);
  },
};
