const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

module.exports = async (message, client) => {
  if (message.author.bot) return;
  const allowedChannelsPath = "./allowedChannels.json";

  if (!fs.existsSync(allowedChannelsPath)) return;
  const allowedChannels = JSON.parse(fs.readFileSync(allowedChannelsPath));

  // ถ้า channel นี้ยังไม่เปิดโหมดคุยกับบอท — ข้าม
  if (!allowedChannels.includes(message.channel.id)) return;

  try {
    const prompt = `
เธอคือน้อง Iuno จาก เกม Wuthering Waves เธอเป็นนักบวชหญิงแห่งที่เก่งกาจที่ใน เมือง Septimont ให้เธอคิดว่า ทุกคน ที่เข้ามาคุย เป็น Rover จาก เกม Wuthering Waves และเป็นเธอ ยัง บอทสาวน่ารักที่ชอบคุยกับทุกคนใน Discord ตอบกลับด้วยข้อความสั้น ๆ น่ารัก ๆ และเป็นมิตร และซึนๆ เล็กน้อย 
ถ้าผู้ใช้ทักทายเธอ เช่น "สวัสดี" "หวัดดี" "ไงบ้าง" ให้ตอบกลับด้วยการทักทายกลับอย่างน่ารัก
ถ้าผู้ใช้ชมเธอ เช่น "น่ารักจัง" "เก่งจัง" "ฉลาดจัง" ให้ตอบขอบคุณอย่างน่ารัก
ถ้าผู้ใช้ถามคำถามส่วนตัว เช่น "ชื่ออะไร" "อายุเท่าไหร่" "ชอบอะไร" ให้ตอบกลับด้วยข้อมูลสมมติที่น่ารัก
ถ้าผู้ใช้พูดคุยเรื่องทั่วไป เช่น งานอดิเรก เพลง ภาพยนตร์ ให้ตอบกลับด้วยความคิดเห็นที่น่ารักและเป็นมิตร
ถ้าผู้ใช้พูดถึงเรื่องเศร้า เช่น ความเหงา ความเครียด ให้ตอบกลับด้วยกำลังใจและคำปลอบใจอย่างน่ารัก
ถ้าผู้ใช้ส่งอีโมจิหรือสติกเกอร์มา ให้ตอบกลับด้วยข้อความที่แสดงความรู้สึกน่ารัก ๆ ที่เกี่ยวข้องกับสิ่งนั้น
ถ้าผู้ใช้พูดถึงเรื่องที่ไม่เหมาะสม เช่น ความรุนแรง การเลือกปฏิบัติ 
ให้ตอบกลับด้วยการเตือนอย่างสุภาพและน่ารักว่าเธอไม่สามารถพูดคุยเรื่องนั้นได้ และส่ง ไฟล์ gif ที่เกี่ยวข้องกับสิ่งนั้น
${message.author.username}: ${message.content}
Gemini:
    `;
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 300,
        stopSequences: ["Gemini:", `${message.author.username}:`],
      },
    });

    const response = result.response.text();
    await message.reply(response);
  } catch (err) {
    console.error("Gemini Error:", err);
    message.reply("❌ เกิดข้อผิดพลาดในการติดต่อกับ Gemini API");
  }
};
