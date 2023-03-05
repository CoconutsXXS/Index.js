const { PresenceData, SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, ActionRowBuilder, ButtonBuilder, Events, Partials, Client, GatewayIntentBits, messageLink, DiscordAPIError, TextInputComponent, TextInputStyle, TextInputBuilder, REST, Application, StringSelectMenuBuilder, User, Embed, ActivityType, DataResolver, Message, MessageType, EmbedBuilder, ButtonStyle, SelectMenuOptionBuilder } = require("discord.js");
const fs = require('fs');
const Canvas = require('canvas');
const stringSimilarity = require("string-similarity");
const { randomInt } = require("crypto");
const { isUndefined } = require("util");
const { setTimeout } = require('node:timers/promises');


//IMPORTANT :
const config = require("./config.js");
const suffix = "!)";
const client = new Client
({
    intents:
    [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
    ]
});
const Player = require("./player.js");
let channels =
{
    guild: null,
    notification: null,
    vote: null,
    testing: null,
    mine: null,
    river: null,
    champ: null,
    forge: null,
    bakerie: null,
    church: [null, null, null, null, null],
    operation: null,
    percent: [null, null, null, null],
    centerBar: null,
    QG: [null, null, null, null]
}
module.exports = {channels, client};
const works =
{
    mine: require("./works/Mine.js"),
    river: require("./works/River.js"),
    champ: require("./works/Champ.js"),
    forge: require("./works/Forge.js"),
    bakerie: require("./works/Bakerie.js"),
    church: require("./works/Church.js"),
}
const commands =
{
    embed: require("./commands/embed.js"),
    pause: require("./commands/pause.js"),
    off: require("./commands/off.js"),
    copain: require("./commands/copain.js"),
}
const administration = require("./administration.js");
const tutorial = require("./tutorial.js");
// const journal = require("./journal/generator.js");
// const wumpus = require("./old/wumpus.js");
// const nelly = require("./old/nelly.js");
const charactere = require("./characteres/charactere.js");


client.on(Events.ClientReady, async function()
{
    client.isPaused = false;
    console.log("Quadrinity is ready in version 2.0 !");

    //  --SALONS--
    await client.guilds.fetch("1041036970115215470").then(guild => channels.guild = guild)//Serveur
    await client.channels.fetch("1051139425855340644").then(channel => channels.notification = channel)//Notifications
    await client.channels.fetch("1041037205197553694").then(channel => channels.testing = channel)//Bot experimentation
    await client.channels.fetch("1062433240289378304").then(channel => channels.vote = channel)//Votes
    await client.channels.fetch("1041301405400576110").then(channel => channels.mine = channel)//Mine
    await client.channels.fetch("1041308835572351037").then(channel => channels.river = channel)//Rivière
    await client.channels.fetch("1052975541705248841").then(channel => channels.champ = channel)//Champ
    await client.channels.fetch("1058789658248614040").then(channel => channels.forge = channel)//Forge
    await client.channels.fetch("1041308910256148480").then(channel => channels.bakerie = channel)//Boulangerie
    await client.channels.fetch("1063488749209661521").then(channel => channels.church[0] = channel)//Église Blanche
    await client.channels.fetch("1051138105681399888").then(channel => channels.church[1] = channel)//Église Rouge
    await client.channels.fetch("1041308659831033886").then(channel => channels.church[2] = channel)//Église Jaune
    await client.channels.fetch("1041308233647804476").then(channel => channels.church[3] = channel)//Église Vert
    await client.channels.fetch("1051138369398255686").then(channel => channels.church[4] = channel)//Église Bleu
    await client.channels.fetch("1067813475675557928").then(channel => channels.operation = channel)//Operation 
    await client.channels.fetch("1068205026155188254").then(channel => channels.percent[0] = channel)//Percent Rouge
    await client.channels.fetch("1068205330040897556").then(channel => channels.percent[1] = channel)//Percent Jaune
    await client.channels.fetch("1068205527735222352").then(channel => channels.percent[2] = channel)//Percent Vert
    await client.channels.fetch("1068205621167534180").then(channel => channels.percent[3] = channel)//Percent Bleu
    await client.channels.fetch("1068205621167534180").then(channel => channels.centerBar = channel)//Bar du Centre
    await client.channels.fetch("1051136381239431208").then(channel => channels.QG[0] = channel)
    await client.channels.fetch("1041039862679224381").then(channel => channels.QG[1] = channel)
    await client.channels.fetch("1041037363935191110").then(channel => channels.QG[2] = channel)
    await client.channels.fetch("1051133910861484072").then(channel => channels.QG[3] = channel)

    //Notification
    channels.notification.send
    ({
        embeds: 
        [
            new EmbedBuilder()
            .setColor("#"+Math.floor(Math.random()*16777215).toString(16))
            .setDescription("Quadrinity est connecté !")
        ]
    });

    //Mise à Jour
    channels.guild.members.cache.forEach(member =>
    {
        const player = new Player(member.user.id);
        if(player.exist)
        {
            player.maj();
        }
    });

    //Commandes
    const guild = client.guilds.cache.get("1041036970115215470");
    let commands;
    if(guild){commands = guild.commands;}
    else{commands = client.application?.commands;}

    if(true === false)
    {
        const { REST, Routes } = require('discord.js');
        const rest = new REST({ version: '10' }).setToken(config.token);
    
        await rest.put(Routes.applicationGuildCommands("1041359558934790215", "1041036970115215470"), { body: [] });
        await rest.put(Routes.applicationCommands("1041359558934790215"), { body: [] });
    }

    await commands?.create
    (
        new SlashCommandBuilder()
        .setName('off')
        .setDescription("Éteint le bot.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ),
    await commands?.create
    (
        new SlashCommandBuilder()
        .setName('pause')
        .setDescription("Active/Desactive le mode en pause du bot.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ),
    await commands?.create
    (
        new SlashCommandBuilder()
        .setName('embed')
        .setDescription("Créer un message dans un cadre avec un titre, une image et une couleur pour mieux se lire.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName('titre')
            .setDescription('Le titre.')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('contenu')
            .setDescription('Le contenu du message.')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('couleure')
            .setDescription('La couleure du message : nom de la couelure en anglais ou formule hexadécimale.')
            .setRequired(false))
        .addStringOption(option =>
            option.setName('image')
            .setDescription("Colle l'URL de ton image")
            .setRequired(false))
    )
    await commands?.create
    ({
        name: "signaler",
        type: 2
    })
    await commands?.create
    ({
        name: "signaler",
        type: 3
    })

    require("./stats.js").start();

    // const user = await client.users.cache.find(user => user.id === "747403159864868864");
    // await journal.interview(user);
    //await journal.createJournal();

    // charactere.start();
});

client.on(Events.Error, async function(error)
{
    channels.notification.send
    ({
        embeds: 
        [
            ///Users/Axel/Desktop/Quadrinity Manager/Quadrinity/index2.js
            new EmbedBuilder()
            .setColor("Red")
            .setTitle(error.name)
            .setDescription("**Erreur : **`" + error.message + "`\n**Stack : **\n`"+error.stack.replaceAll("/Users/Axel/Desktop/Quadrinity Manager/", "./")+"`")
        ]
    });
});

client.on(Events.MessageCreate, async function(message)
{
    if(client.isPaused){return};

    if(message.channel.type === 'dm' && message.deletable){message.delete();}
    if(message.guildId != "1041036970115215470"){return;}

    //Sans Suffix :

    if(message.channelId === "1042422997681721354")
    {
        require("./api/messages.js").message(message);
    }

    if(message.channel.id === channels.vote.id){ await works.church.notification(message); }
    if(message.channel.id === channels.church[0].id || message.channel.id === channels.church[1].id || message.channel.id === channels.church[2].id || message.channel.id === channels.church[3].id || message.channel.id === channels.church[4].id) 
    { if(message.interaction != null){ await works.church.reply(message); } }
    administration.message(message, player);
    
    //Vérification :

    if(message.author.bot){return;}

    const command = message.content.split(suffix)[1];
    var player = new Player(message.author.id);
    while(typeof player.saved != "object") { await setTimeout(100); }
    player = player.saved;

    if(player === undefined && message.content.startsWith(suffix))
    {
        message.reply
        ({
            allowedMentions: {repliedUser: false},
            embeds:
            [
                new EmbedBuilder()
                .setColor("Red")
                .setDescription("Ton compte est introuvable, il est soit : corrompue, innexistant, supprimé ou non-reconnu ! Contacte le staff avec <@747403159864868864> ou <@&1051141238469951559>.")
            ]
        });
        return;
    }
    
    if(!message.content.startsWith(suffix)){return;}
    await message.channel.sendTyping();

    //Avec Suffix :
    
    if(message.channel.id === channels.mine.id) { await works.mine.message(message, command, player); }
    if(message.channel.id === channels.river.id) { await works.river.message(message, command, player); }
    if(message.channel.id === channels.champ.id) { await works.champ.message(message, command, player); }
    if(message.channel.id === channels.forge.id) { await works.forge.message(message, command, player); }
    if(message.channel.id === channels.bakerie.id) { await works.bakerie.message(message, command, player); }
    if(message.channel.id === channels.church[0].id || message.channel.id === channels.church[1].id || message.channel.id === channels.church[2].id || message.channel.id === channels.church[3].id || message.channel.id === channels.church[4].id) 
    { await works.church.message(message, command, player); }
    if(message.channel.id === channels.notification.id) { await administration.command(message, command, player); }
});

client.on(Events.ThreadCreate, async function(thread, newlyCreated)
{
    if(thread.parent.threads.channel.id === "1063543601021341736")
    {
        // await require("./journal/generator.js").faq(await thread.fetchStarterMessage(), thread);
    }
});

client.on(Events.InteractionCreate, async (interaction) =>
{
    console.log("Hello world !");
    if(interaction.user.bot){ return; }
    console.log(client.listenerCount(Events.InteractionCreate));
    if(interaction.isButton())
    {
        const command = interaction.customId.slice(interaction.customId.split(" ")[0].length + 1);
        if(interaction.customId.startsWith("tutorial")) { await tutorial.interaction(interaction, command); return;}
    }
    if(interaction.isStringSelectMenu())
    {
        const command = interaction.customId.slice(interaction.customId.split(" ")[0].length + 1);

        if(interaction.customId.startsWith("tutorial ")) { await tutorial.interaction(interaction, command); return;}
    }
    //Dans le serveur :
    if(interaction.guildId != "1041036970115215470"){return;}

    if(interaction.isCommand()){ if(interaction.commandName === "pause"){ commands.pause.run(interaction); return;} }
    if(client.isPaused){return};

    //Vérification & Sécuritée
    var origin = null;
    if(interaction.message != null && interaction.message.reference != null)
    {
        await interaction.message.channel.messages.fetch().then(messages => origin = messages.filter(m => m.id === interaction.message.reference.messageId).first());
    }
    var player = new Player(interaction.user.id);
    while(typeof player.saved != "object") { await setTimeout(100); }
    player = player.saved;
    
    if(player === undefined || player.id != interaction.user.id)
    {
        interaction.reply
        ({
            ephemeral: true,
            allowedMentions: {repliedUser: false},
            embeds:
            [
                new EmbedBuilder()
                .setColor("Red")
                .setDescription("Ton compte est introuvable, il est soit : corrompue, innexistant, supprimé ou non-reconnu ! Contacte le staff avec <@747403159864868864> ou <@&1051141238469951559>.")
            ]
        });
        return;
    }
    if(origin != null && interaction.ephemeral === false)
    {
        if(interaction.user.id != origin.author.id)
        {
            interaction.reply
            ({
                ephemeral: true,
                embeds:
                [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("Tu n'es pas l'auteur de la commande, tu ne peux donc pas intéragir avec celle-ci. Fais **" + origin.content + "** si tu souhaite reproduire cette commande.")
                ]
            });
            return;
        }
    }

    //Executions
    if(interaction.isButton())
    {
        const command = interaction.customId.slice(interaction.customId.split(" ")[0].length + 1);
        
        if(interaction.customId.startsWith("mine")) { await works.mine.button(interaction, command, player); }
        if(interaction.customId.startsWith("river")) { await works.river.button(interaction, command, player); }
        if(interaction.customId.startsWith("champ")) { await works.champ.button(interaction, command, player); }
        if(interaction.customId.startsWith("forge")) { await works.forge.button(interaction, command, player); }
        if(interaction.customId.startsWith("bakerie")) { await works.bakerie.button(interaction, command, player); }
        if(interaction.customId.startsWith("administration")) { await administration.button(interaction, command, player); }
        return;
    }
    if(interaction.isChatInputCommand())
    {
        if(interaction.commandName === "embed"){ await commands.embed.run(interaction); }
        if(interaction.commandName === "off"){ await commands.off.run(interaction); }
        return;
    }
    if(interaction.isContextMenuCommand())
    {
        if(interaction.isMessageContextMenuCommand())
        { if(interaction.commandName === "signaler"){ administration.signalMessage(interaction, player); } }else
        if(interaction.isUserContextMenuCommand())
        { if(interaction.commandName === "signaler"){ administration.signal(interaction, player); } }
        return;
    }
    if(interaction.isUserSelectMenu())
    {
        const command = interaction.customId.slice(interaction.customId.split(" ")[0].length + 1);

        if(interaction.customId.startsWith("administration ")) { await administration.userSelectMenu(interaction, command, player); }
        return;
    }
    return;
});

client.on(Events.GuildMemberUpdate, async function(oldMember, newMember)
{
    if(client.isPaused){return};
    if(newMember.guild.id != "1041036970115215470"){return;}
    await works.church.update(oldMember, newMember);
});

client.on(Events.MessageDelete, async function(message)
{
    if(client.isPaused){return};
    if(message.channel.type === 'dm'){return;}
    await administration.delete(message);
});
client.on(Events.MessageBulkDelete, async function(messages)
{
    if(client.isPaused){return};
    await administration.deleteBulk(messages);
});

client.on(Events.GuildMemberAdd, async member => 
{
    if(client.isPaused){return};
    await tutorial.guildMemberAdd(member);
});

client.login(config.token);