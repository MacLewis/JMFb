
/* https://discordapp.com/login?redirect_to=%2Fdevelopers%2Fapplications%2F */
/* https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8 */

/* ********************************************************************************************************************************** */

/* Ajout du module discord.js */
const Discord = require('discord.js');

/* Création d'une instance d'un client discord */
const client = new Discord.Client();

/* ********************************************************************************************************************************** */

/* Déclaration du nom du bot */
const g_botName   = "Jerry McFly";

/* Déclaration de l'identifiant du bot */
const g_botId   = '482592941500661798';

/* Déclaration du préfix des commandes */
const g_cmdPrefix = "!=jerry,=";

/* Déclaration du nom du salon de jerry */
const g_jerryChannel = "jerry-mcfly-channel";

/* Déclaration d'un tableau contenant des mots exprimant l'amour */
const g_loveTable = ["jtm", "je t'aime", "❤", "😘", "love", "☺", "bébé", "bb", "💖", "Mon amour", "😍", "😚", "aimer", "amoureux", "amour", "j'aime", "aimons", "chérie", "heart", "kiss", "bisous", "biz", "iloveyou" ];

/* ********************************************************************************************************************************** */

/* Ready Event */
client.on('ready', () => {
  console.log('I am ready!'); /*client.user.setStatus('idle')*/
  
  /* Modification du statut de Jerry en AFK */
  client.user.setStatus('invisible');
});

/* ********************************************************************************************************************************** */

client.on('message', message => { // When the message a message is executed

    if (message.content === 'ping') { // if that message matches ping

       message.reply('pang'); // 

       }

});

/* ********************************************************************************************************************************** */

client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token o
