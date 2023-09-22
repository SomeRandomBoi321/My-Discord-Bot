const { SlashCommandBuilder } = require("discord.js");
const { runCommand } = require("../utils/os");
const { errorHandler } = require("../utils/helper");
const quote = require("shell-quote").quote;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("touch")
        .setDescription("Create file!")
        .addStringOption(option => option.setName("filename").setDescription("Name of file").setRequired(true)),
    async execute(interaction) {
        const filename = interaction.options.getString("filename").toUpperCase().split(" ");

        console.log(`user ${interaction.user.id} ran create on "${filename}"`);

        if (/[$`()#!{}><\\’,;|&]/gm.test(filename)) {
            filename = quote(filename);
        }

        try {
            await runCommand(`touch ${filename}`, interaction.user.id);
        } catch (e) {
            return await interaction.reply(errorHandler(e));
        }

        await interaction.reply(`File '${filename}' has been created!`);
    },
};