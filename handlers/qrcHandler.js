const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function handleQRC(message) {
  try {
    const args = message.content.split(" ");
    if (args.length < 2) {
      return message.reply("❌ ใช้รูปแบบ: `!qrc เบอร์/เลขบัตรประชาชน [จำนวนเงิน]`");
    }

    const id = args[1];
    const amount = args[2] || "";

    const apiUrl = `https://lunapromptpay-project.vercel.app/api/qrcode?mobile=${id}&amount=${amount}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const imgBuffer = Buffer.from(buffer);

    await message.reply({
      content: `💸 QR พร้อมเพย์สำหรับ ${id}${
        amount
          ? ` จำนวน ${amount} บาท ...จริงๆก็ไม่ได้อยากทำให้ซะหน่อย (｡-_-｡) เชอะ... `
          : "     ...จริงๆก็ไม่ได้อยากทำให้ซะหน่อย (｡-_-｡) เชอะ..."
      }`,
      files: [{ attachment: imgBuffer, name: "promptpay.png" }],
    });
  } catch (err) {
    console.error("❌ Error generating QR:", err);
    await message.reply("⚠️ เกิดข้อผิดพลาดในการสร้าง QR Code");
  }
}

module.exports = { handleQRC };
