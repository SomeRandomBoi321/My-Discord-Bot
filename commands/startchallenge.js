const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const { errorHandler } = require("../utils/helper");
const { runCommand } = require("../utils/os");
const quote = require("shell-quote").quote;
const { GUILD_ID } = require("../utils/config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("start")
        .setDescription("Start the challenge"),
    async execute(interaction) {
        console.log(`user ${interaction.user.id} started the challenge`);

        let channelName = interaction.user.id;

        if (!interaction.guild.channels.cache.some(c => c.name === channelName)) {
            interaction.guild.channels.create({
                type: 0,
                name: `${channelName}`,
                permissionOverwrites: [{
                    id: GUILD_ID,
                    deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                }, {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                }]
            });
            return await interaction.reply(`You can start hacking me.`);
        } else {
            return await interaction.reply(`You have already started the challenge.`);
        }
    },
};