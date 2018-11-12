
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

/* Validation des commandes (true pour activer la commande sinon false */
const g_cmd_flood = false;
const g_cmd_speak = false;
const g_cmd_members = false;
const g_cmd_owner = false;
const g_cmd_name = false;

/* ********************************************************************************************************************************** */

/* Cette fonction vérifie si un message pour Jerry est présent */
function jerry_incoming_command_available ( p_message )
{
	/* Si une commande pour Jerry est présente */
	if ( ( ( p_message.client.user.username/*.author.id*/ != g_botId ) ) && ( p_message.content.substring( 0, 9 ) == g_cmdPrefix ) ) 
	{
		/* Retour OK */
		return true;
	}
	
	/* Retour KO */
	return false;
}

/* ********************************************************************************************************************************** */

/* Cette fonction retourne la commande et son argument */
function jerry_incoming_command_get ( p_message )
{
	/* Séparation de la chaine de caractère */
	var l_msg = p_message.content.substring( 0 ).split( ",=" );
		
	/* Récupération des attributs de la commande */
	l_cmd  = l_msg [1];
	l_arg1 = l_msg [2];
	l_arg2 = l_msg [3];
	
	/*
	p_message.channel.send( l_cmd );
	p_message.channel.send( l_arg1 );
	p_message.channel.send( l_arg2 );*/
	
	/* Retour */
	return [l_cmd, l_arg1, l_arg2];
}

/* ********************************************************************************************************************************** */

/* Cette fonction analyse l'argument de la commande */
function jerry_incoming_command_analyse ( p_arg )
{
	/* Convertion de l'argumment en entier numérique */
	l_number = parseInt ( p_arg, 10 ) + 1;
	
	/* Analyse de la validité du second paramètre */
	if ( ( p_arg != null ) && ( p_arg != '0' ) && ( l_number > 0 && l_number <= 100 ) )
	{
		/* Retour OK */
		return l_number;
	}
	
	/* Retour KO */
	return 0;
}

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
				p_message.channel.send ( "Alerte : Oli, Zal, il est dorénavant interdit de se tripoter les roubignolles sur ce serveur ! Afin de subvenir à vos besoins primitif, merci de rejoindre le baisodrome \:heart: le plus proche (motel, VW, ...) ! Message supprimé !" );
				
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

/* Message Event */
client.on('message', p_message => {
  
	/* Test si une commande est entrée */
	if ( jerry_incoming_command_available ( p_message ) == true ) 
	{
		/* Récupération de la commande entrée */
		l_cmd = jerry_incoming_command_get ( p_message );
	
		/* Si commande de type "flood" */
		if ( l_cmd [0] == "flood" )
		{
			/* Exécution de la commande flood */
			if ( g_cmd_flood == true );
			else p_message.channel.send('This command is disable ! Please contact the amazing @Mac Lewis to enable it !');
		}
		
		/* Sinon si commande speak */
		else if ( l_cmd [0] == "speak" )
		{
			/* Exécution de la commande speak */
			if ( g_cmd_speak == true ) ;
			else p_message.channel.send('This command is disable ! Please contact the amazing @Mac Lewis to enable it !');
		}
		
		/* Sinon si commande leave */
		else if ( l_cmd [0] == "leave" )
		{
			/* Exécution de la commande speak */
			if ( g_cmd_speak == true );
			else p_message.channel.send('This command is disable ! Please contact the amazing @Mac Lewis to enable it !');
		}
		
		/* Sinon si commande members */
		else if ( l_cmd [0] == "members" )
		{
			/* Exécution de la commande speak */
			if ( g_cmd_members == true );
			else p_message.channel.send('This command is disable ! Please contact the amazing @Mac Lewis to enable it !');
		}
		
		/* Sinon si commande name */
		else if ( l_cmd [0] == "name" )
		{
			/* Exécution de la commande name */
			if ( g_cmd_name == true );
			else p_message.channel.send('This command is disable ! Please contact the amazing @Mac Lewis to enable it !');
		}
		
		/* Sinon */
		else
		{
			/* Commande inconnue */
			p_message.channel.send('Invalid command ! You suck dude !');
		}
	}
	 
	/* Sinon */
	else
	{
		/* Analyse des messages entrants */
		jerry_analyse_incoming_love_message ( p_message );
	}
	
});

client.login(process.env.BOT_TOKEN);


