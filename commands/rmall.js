const { SlashCommandBuilder } = require("discord.js");
const { runCommand } = require("../utils/os");
const { errorHandler } = require("../utils/helper");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rmall")
        .setDescription("Delete all files stored"),
    async execute(interaction) {
        console.log(`user ${interaction.user.id} ran clear`);

        try {
            // Ignore error when trying to delete nsjail directories
            await runCommand("rm * || true", interaction.user.id);
        } catch (e) {
            return await interaction.reply(errorHandler(e));
        }

        await interaction.reply("All files have been deleted.");
    },
};