const { SlashCommandBuilder } = require("discord.js");
const { errorHandler } = require("../utils/helper");
const { runCommand } = require("../utils/os");
const quote = require("shell-quote").quote;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cat")
        .setDescription("Read a file")
        .addStringOption(option => option.setName("filename").setDescription("Name of file to read").setRequired(true)),
    async execute(interaction) {
        const filename = interaction.options.getString("filename").toUpperCase().split(" ");

        console.log(`user ${interaction.user.id} ran open on "${filename}"`);

        let out = "";
        if (/[$`()#!{}<\\’,;|&]/gm.test(filename)) {
            filename = quote(filename);
        }
        try {
            out = await runCommand(`cat ${filename}`, interaction.user.id);
        } catch (e) {
            return await interaction.reply(errorHandler(e));
        }

        await interaction.reply(`File contents of '${filename}':\n${out}`);
    },
};