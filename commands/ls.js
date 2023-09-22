const { SlashCommandBuilder } = require("discord.js");
const { errorHandler } = require("../utils/helper");
const { runCommand } = require("../utils/os");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ls")
        .setDescription("List files stored"),
    async execute(interaction) {
        console.log(`user ${interaction.user.id} ran list`);

        let out = "";

        try {
            out = await runCommand("ls", interaction.user.id);
        } catch (e) {
            return await interaction.reply(errorHandler(e));
        }

        const nsjailMounts = ["bin", "flag", "lib", "lib64", "lost+found"];
        for (let i = 0; i < nsjailMounts.length; i++) {
            out = out.replace(nsjailMounts[i], "");
        }
        await interaction.reply(`Your files:\n${out}`);
    },
};