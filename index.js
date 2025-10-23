require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  Collection,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
});

client.commands = new Collection();

// โหลดคำสั่ง Slash ทั้งหมดจากโฟลเดอร์ commands/
const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

// ลงทะเบียน Slash Commands
const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);
(async () => {
  try {
    console.log("🔄 กำลังอัปเดต Slash Commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID
      ),
      { body: commands }
    );
    console.log("Slash Commands พร้อมใช้งานแล้ว!");
  } catch (error) {
    console.error("❌ ลงทะเบียนคำสั่งล้มเหลว:", error);
  }
})();

// Event: เมื่อใช้ Slash Command
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "❌ มีข้อผิดพลาดเกิดขึ้น",
      ephemeral: true,
    });
  }
});

// Event: เมื่อมีข้อความในห้องที่เปิดบอท
const handleMessage = require("./handlers/messageHandler");
client.on("messageCreate", (message) => handleMessage(message, client));
client.login(process.env.DISCORD_BOT_TOKEN);
console.log("Bot is running...");
client.once("clientReady", () => {
  client.user.setPresence({
    activities: [{ name: "คุยกับ Rover 💬", type: 4 }], // type: 0 = Playing, 2 = Listening, 3 = Watching, 5 = Competing
    status: "online", // online | idle | dnd | invisible
  });
});

