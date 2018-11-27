
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

/* Déclaration des identifiants d'oli et zal et mac */
const g_zal = "220592958510989313";
const g_oli = "261634371608379402";
const g_mac = "283332409070452737";

/* Déclaration d'un tableau contenant des mots exprimant l'amour */
const g_loveTable = [
    'jtm', "je t'aime", '❤', '😘', 'love', '☺', 'bébé', 'bb', '💖',
    '😍', '😚', 'aimer', 'amour', "j'aime",
    'aimons', 'cheri', 'heart', 'kiss', 'bisou', 'femme',
    'princesse', '💕', '💞', '😻', 'iloveyou', 'je t’aime', 'jetaime', 
    '♡', 'je t`aime', 'ame soeur', 'âme soeur', 'coeur'
];

var g_active = 0;

/* ********************************************************************************************************************************** */

/* Cette fonction regarde si le message entrant est un message d'amour */
function jerry_analyse_incoming_love_message ( p_message )
{
	/* Si message du boss */
	if ( p_message.author.id === g_mac )
	{
		/* Si commande activation */
		if ( p_message.content === "!=jerry,=enable" )
		{
			g_active = 1;	
		}
		
		/* Sinon si commande désactivation */
		else if ( p_message.content === "!=jerry,=disable" )
		{
			g_active = 0;	
		}
		
		/* Sinon */
		else;
	}
	
	
	/* Si le message entrant provient de Zal ou Oli */
	if ( ( g_active == 1 ) && ( ( p_message.author.id === g_oli ) || ( p_message.author.id === g_mac ) ) )
	{
		/* Détermination du nombre d'élément dans le tableau */
		l_love_table_length = g_loveTable.length;
		
		/* Création d'une chaine de caractères */
		l_incoming_message = p_message.content;
		
		/* Comparaison du mot courant avec les mots d'amour interdit */
		for ( l_love_table_counter = 0 ; l_love_table_counter < l_love_table_length ; l_love_table_counter++ )
		{
			var regexp = new RegExp ( g_loveTable[ l_love_table_counter ], 'i' );
			
			if ( regexp.test ( l_incoming_message ) != 0 )
			{
				/* Suppression du message entrant */
				p_message.delete ( );
				
				/* Affichage d'un message */
				p_message.channel.send ( "Never go full retard ! Bisous Zal, Oli \:sparkling_heart: !" );
			
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
