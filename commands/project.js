const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("project")
    .setDescription("ให้ Iuno เล่าเกี่ยวกับโปรเจกต์นี้ให้ Rover ฟัง 💬"),

  async execute(interaction) {
    const gifUrl = "https://media.tenor.com/Oka2YR64ZiEAAAAC/wuwa-iuno.gif"; 

    const projectDescription = `
Dev ได้บอก Iuno ไว้ว่า...

โปรเจกต์นี้เกิดขึ้นจากความต้องการที่จะสร้าง AI Chatbot บน Discord เป็นของตัวเอง  
โดยมีแนวคิดให้บอทเป็นตัวละครในเกมที่ชอบ ซึ่งสามารถพูดคุย โต้ตอบ  
และแสดงบุคลิกเฉพาะตัวได้ 💫  

Iuno ถูกออกแบบให้สามารถปรับบุคลิกได้ผ่านการเขียน prompt ในโค้ด  
เพื่อให้มีเอกลักษณ์ตรงตามที่ผู้สร้างต้องการ  
AI ตัวนี้สามารถคุยโต้ตอบกับผู้ใช้ได้ ถาม-ตอบเรื่อง Coding ได้  
และยังมีฟังก์ชันต่าง ๆ ที่ผู้สร้างต้องการเพิ่มเติมด้วย  

โปรเจกต์นี้ยังเชื่อมโยงกับโปรเจกต์ก่อนหน้า  
คือระบบสร้าง QR Code PromptPay เพียงพิมพ์คำสั่งง่าย ๆ  
บอทจะไปเรียก API ที่ผู้สร้างทำไว้ แล้วส่ง QR Code กลับมาให้โดยอัตโนมัติ 💳  

ทั้งโปรเจกต์พัฒนาด้วยภาษา **JavaScript** ใช้เวลาเพียง **7 ชั่วโมง**  
และยังสามารถต่อยอดไปสู่ระบบที่ซับซ้อนยิ่งขึ้นได้อีก  
เพราะ Discord มี API ให้ใช้งานมากมาย  
เช่น บอทเพลง 🎵, บอทข่าวสาร 📰, หรือบอทนับจำนวนคนเข้า-ออก 👥  

*(จริงๆ....ก็ไม่ได้อยากบอกหรอก แต่นายดูอยากรู้เลยบอกก็ได้ 🙄)*  
    `;

    const embed = new EmbedBuilder()
      .setColor("#9b59b6")
      .setTitle("💬 โปรเจกต์ของ Iuno")
      .setDescription(projectDescription)
      .setImage(gifUrl)
      .setFooter({ text: "สร้างด้วยความรักและคาเฟอีน ☕" });

    await interaction.reply({ embeds: [embed] });
  },
};
