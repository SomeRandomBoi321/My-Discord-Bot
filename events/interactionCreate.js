const { execute } = require("../commands/touch");
const { GUILD_ID } = require("../utils/config");

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        try {
            await tryExectute(interaction);
        } catch (e) {
            console.error("Something strange happened", e);
        }
    }
};

const tryExectute = async function(interaction) {
    if (interaction.channel.name == "startchallenge" && interaction.commandName != "start") {
        return await interaction.reply("Only /start can be used in this channel");
    }

    if (interaction.commandName == "start" && interaction.channel.name != "startchallenge") {
        return await interaction.reply("/start can be only used in the startchallenge channel");
    }

    if (!interaction.guild) {
        console.log(`user ${interaction.user.id} tried to DM the bot`);
        return await interaction.reply("I only work on the TRUE discord server. Sorry about that :)");
    }

    if (interaction.guild.id != GUILD_ID) {
        console.log("I can only operate on the TRUE Discord server.");
    }

    if (!interaction.isChatInputCommand()) return;

    const guildRoles = await interaction.guild.roles.fetch();
    const roleManager = interaction.member.roles;
    const roles = [];
    guildRoles.map((a) => {
        const temp = roleManager.resolve(a.id);
        if (temp != null) {
            roles.push(temp.name);
        }
    });

    const isChallengeAdmin = roles.some((a) => {
        return a === "ADMIN";
    });

    if (interaction.commandName == "bash" && !isChallengeAdmin) {
        return await interaction.reply("Are you crazy?! What are you trying to do?! That's for Admins ONLY!");
    }

    const command = interaction.client.commands.get(interaction.commandName);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
}