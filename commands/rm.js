const { SlashCommandBuilder } = require("discord.js");
const { runCommand } = require("../utils/os");
const { errorHandler } = require("../utils/helper");
const quote = require("shell-quote").quote;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rm")
        .setDescription("Delete a file")
        .addStringOption(option => option.setName("filename").setDescription("Name of file to delete").setRequired(true)),
    async execute(interaction) {
        const filename = quote(interaction.options.getString("filename").toUpperCase().split(" "));

        console.log(`user ${interaction.user.id} ran delete on "${filename}"`);

        if (/[$`()#!{}><\\’,;|&]/gm.test(filename)) {
            filename = quote(filename);
        }

        try {
            await runCommand(`rm ${filename}`, interaction.user.id);
        } catch (e) {
            return await interaction.reply(errorHandler(e));
        }

        await interaction.reply(`File '${filename}' has been deleted.`);
    },
};