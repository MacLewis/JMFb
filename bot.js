
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

/* Cette fonction regarde si le message entrant est un message d'amour */
function jerry_analyse_incoming_love_message ( p_message )
{
	/* Détermination de la longeur de la chaine de caractère d'amour */
	l_love_table_length = g_loveTable.length;
	
	/* Si le message entrant provient de Zal ou Oli */
	if ( ( p_message.author.username === "Gamb" ) || ( p_message.author.username === "Zal" ) || ( p_message.author.username === "Mac Lewis" ) )
	{
		/* Création d'une chaine de caractères */
		l_incoming_message = p_message.content;
				
		/* Création de plusieurs sous-ensembles */
		l_incoming_word = l_incoming_message.split(' ');
		
		/* Détermination du nombre de sous-ensemble */
		l_incoming_word_length = l_incoming_word.length;
		
		/* Comparaison du mot courant avec les mots d'amour interdit */
		for ( l_love_table_counter = 0 ; l_love_table_counter < l_love_table_length ; l_love_table_counter++ )
		{
			/* Si un mot d'amour interdit est présent */
			if ( l_incoming_message.toLowerCase().search ( g_loveTable[ l_love_table_counter ] ) != -1 )
			{
				/* Suppression du message entrant */
				p_message.delete ( );
				
				/* Affichage d'un message */
				p_message.channel.send ( "Never go full retard !" );
			
				/* Arrêt de la boucle */
				return 0;
			}
			
			/* Sinon */
			else
			{
				/* Ne rien faire */
			}
		}
	}
	
	/* Sinon */
	else
	{
		/* Ne rien faire */
	}
}

/* ********************************************************************************************************************************** */

/* Ready Event */
client.on('ready', () => {
  console.log('I am ready!'); /*client.user.setStatus('idle')*/
  
  /* Modification du statut de Jerry en AFK */
  client.user.setStatus('invisible');
});

/* ********************************************************************************************************************************** */

client.on('message', p_message => { // When the message a message is executed

    /* Analyse des messages entrants */
		jerry_analyse_incoming_love_message ( p_message );

});

/* ********************************************************************************************************************************** */

client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token o
