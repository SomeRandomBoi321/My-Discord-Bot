const { SlashCommandBuilder } = require("discord.js");
const { errorHandler } = require("../utils/helper");
const { runCommand } = require("../utils/os");
const quote = require("shell-quote").quote;
const { GUILD_ID } = require("../utils/config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("giverole")
        .setDescription("Give role to a user.")
        .addStringOption(option => option.setName("role").setDescription("Role name").setRequired(true)),
    async execute(interaction) {
        const role = interaction.options.getString("role");

        console.log(`User ${interaction.user.id} wanted to get role: ${role}`);

        console.log(`Uppercase: ${role.toUpperCase()}`);
        console.log(`Lowercase: ${role.toLowerCase()}`);

        if (role.toLowerCase() == "admin") {
            return await interaction.reply(`Cannot give ADMIN role to you. Sorry.`);
        }

        //Check if role exists on server
        if (interaction.guild.roles.cache.some(r => r.name === role.toUpperCase())) {
            let discordRole = interaction.guild.roles.cache.find(r => r.name === role.toUpperCase());
            interaction.member.roles.add(discordRole);
            console.log(`Gave role ${discordRole.name} to user ${interaction.user.id}`);
        } else {
            return await interaction.reply("What role do you want exactly?");
        }

        return await interaction.reply(`Added role`);
    },
};