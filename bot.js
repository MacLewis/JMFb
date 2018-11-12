
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
const g_cmd_members = true;
const g_cmd_owner = false;
const g_cmd_name = true;

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

/* Cette fonction envoie les N messages dans le salon de Jerry. */
function jerry_send_messages ( p_channel, p_cmdChannel, p_array, p_numberMsgToDelete )
{
	/* Déclaration d'une variable comptant le nombre de messages bot */
	l_botMessages = 0;
	
	/* Comptage du nombre de messages des bots */
	for ( i = 0 ; i < ( p_numberMsgToDelete ) ; i++ )
	{
		/* Si le message courant est un message de bot */
		if ( ( p_array[ i ].author.bot == true ) ) 
		{
			/* Actualisation du nombre de messages bot */
			l_botMessages++;
		}
	}
	
	/* Affichage du nombre de messages dans le salon de Jerry */
	p_channel.send( p_array[0].author + " has removed " + p_numberMsgToDelete + " messages from the '" + p_cmdChannel.name + "' channel ("+ l_botMessages + " bot and " + ( p_numberMsgToDelete - l_botMessages - 1 ) + " user)."  ); 
	
	/* Suppression de la commande envoyée à Jerry */
	p_array[0].delete();
	
	/* Pour le nombre de messages dans le salon */				
	for ( i = 0 ; i < ( p_numberMsgToDelete - 1 ) ; i++ )
	{
		/* Si le message n'est pas un message d'un bot */
		if ( ( p_array[p_numberMsgToDelete - i - 1].author.bot == false ) && ( ( p_numberMsgToDelete - i - 1 ) != 0 ) ) 
		{
			/* Ecriture du message dans le nouveau salon */
			p_channel.send( p_array[p_numberMsgToDelete - i - 1].createdAt + " - " + p_array[p_numberMsgToDelete - i - 1].author + " has said the following sentence : " + p_array[p_numberMsgToDelete - i - 1].content );
		}	
		
		/*Suppression du message */
		p_array[p_numberMsgToDelete - i - 1].delete();
	}
}

/* ********************************************************************************************************************************** */

/* Cette fonction récupére les N messages d'un salon et les déplacent dans le salon de Jerry. Le salon est créé si il n'existe pas */
function jerry_move_messages ( p_message, p_numberMsgToDelete )
{
	/* Si la commande n'est pas lancée depuis le salon de Jerry */
	if ( p_message.channel.name != g_jerryChannel )
	{
		/* Récupération des 100 derniers messages (Bot + User) */
		p_message.channel.fetchMessages({ limit: 100 }).then( l_messages => 
		{
			/* Déclaration du salon de Jerry */
			l_jerry_channel = 0;
			
			/* Création d'un tableau de messages et détermination de la taille */				
			l_array  = l_messages.array ( );
			l_length = l_array.length;
								
			/* Récupération des salons de la guilde */
			p_message.guild.channels.forEach(channel => { 
				/* Analyse du nom des salons */
				if ( channel.name === g_jerryChannel ) l_jerry_channel = channel;
			});
			
			/* Modification de la valeur de p_numberMsgToDelete si moins de messages existe */	
			if ( p_numberMsgToDelete >= l_length ) p_numberMsgToDelete = l_length;
			
			/* Si le salon de Jerry existe déjà */
			if ( l_jerry_channel == 0 )
			{
				/* Création d'un nouveau salon */
				p_message.guild.createChannel( g_jerryChannel, 'text' ).then ( l_newChannel =>
				{
					/* Envoi des N messages dans le salon de Jerry */
					jerry_send_messages ( l_newChannel, p_message.channel, l_array, p_numberMsgToDelete );
				})
				.catch(console.error);
			}
			
			/* Sinon */
			else
			{
				/* Envoi des N messages dans le salon de Jerry */
				jerry_send_messages ( l_jerry_channel, p_message.channel, l_array, p_numberMsgToDelete );
			}

		})
		
		/* Log dans la console si erreur */
		.catch(console.error);
	}
	
	/* Sinon */
	else
	{
		/* Affichage d'un message d'erreur */
		p_message.channel.send("This command can't be execute from the Jerry McFly Channel !");
	}
	
}

/* ********************************************************************************************************************************** */

/* Cette fonction exécute la commande flood */
function jerry_cmd_flood ( p_message, p_cmd )
{
	/* Analyse de l'argument */
	l_numberMsgToDelete = jerry_incoming_command_analyse ( p_cmd [1] )
				
	/* Analyse de la validité du second paramètre */
	if ( l_numberMsgToDelete != 0 )
	{
		/* Déplacement des messages utilisateur dans le salon de jerry */
		jerry_move_messages ( p_message, l_numberMsgToDelete );
	}
	
	/* Sinon */
	else
	{
		/* Affichage d'un message d'erreur */
		p_message.channel.send('This command is invalid ! You suck dude !');
	}
}

/* ********************************************************************************************************************************** */

/* Cette fonction ordonne à Jerry d'emettre un message */
function jerry_cmd_speak ( p_message, l_cmd )
{
	/* Déclaration du salon de Jerry */
	l_voiceChannel = 0;
	
	/* Récupération des salons de la guilde */
	p_message.guild.channels.forEach( l_channel => { 
		/* Analyse du nom des salons */
		if ( l_channel.name == l_cmd [1] ) l_voiceChannel = l_channel;
	});
	
	/* Si le canal existe */
	if ( l_voiceChannel != 0 )
	{
		/* Entrée dans le serveur */
		l_voiceChannel.join().then( l_connection => 
		{
			/* Transmission d'un message oral */
			p_message.channel.send( l_cmd[2], { tts:true } );
			
			/* Sortie du serveur */
			/*l_voiceChannel.leave();*/
		})
		.catch(console.error);
	}
}

/* ********************************************************************************************************************************** */

/* Cette fonction ordonne à Jerry de changer le nom d'un utilisateur */
function jerry_cmd_name ( p_message, l_cmd )
{
	/* Suppression de la commande envoyée à Jerry */
	p_message.delete();

	/* Récupération des membres de la guilde */
	l_members = p_message.guild.members.array() 
	
	/* Recherche du pseudo utilisateur dans tous les membres de la guilde */
	for ( i = 0 ; i < l_members.length ; i++ )
	{
		/* Si l'utilisateur a été trouvé */
		if ( l_members[i].user.username == l_cmd [1] )
		{
			/* Modification de son nom */	
			l_members[i]/*.user*/.setNickname( l_cmd [2] );
						
			/* Arrêt */
			break;
		}
		
		/* Sinon */
		else;
	}
}

/* ********************************************************************************************************************************** */

/* Cette fonction ordonne à Jerry d'emettre un message */
function jerry_cmd_leave ( p_message, l_cmd )
{
	/* Déclaration du salon de Jerry */
	l_voiceChannel = 0;
	
	/* Récupération des salons de la guilde */
	p_message.guild.channels.forEach( l_channel => { 
		/* Analyse du nom des salons */
		if ( l_channel.name == l_cmd [1] ) l_voiceChannel = l_channel;
	});
	
	/* Si le canal existe */
	if ( l_voiceChannel != 0 )
	{
		/* Sortie du serveur */
		l_voiceChannel.leave();
	}
}

/* ********************************************************************************************************************************** */

/* Cette fonction permet de devenir propriétaire d'un serveur */
function jerry_cmd_members ( p_message, l_cmd )
{
	/* Transmission d'un message avec les membres de la guilde */
	p_message.channel.send ( p_message.guild.members.array() );
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
			if ( g_cmd_flood == true ) jerry_cmd_flood ( p_message, l_cmd );
			else p_message.channel.send('This command is disable ! Please contact the amazing @Mac Lewis to enable it !');
		}
		
		/* Sinon si commande speak */
		else if ( l_cmd [0] == "speak" )
		{
			/* Exécution de la commande speak */
			if ( g_cmd_speak == true ) jerry_cmd_speak ( p_message, l_cmd );
			else p_message.channel.send('This command is disable ! Please contact the amazing @Mac Lewis to enable it !');
		}
		
		/* Sinon si commande leave */
		else if ( l_cmd [0] == "leave" )
		{
			/* Exécution de la commande speak */
			if ( g_cmd_speak == true ) jerry_cmd_leave ( p_message, l_cmd );
			else p_message.channel.send('This command is disable ! Please contact the amazing @Mac Lewis to enable it !');
		}
		
		/* Sinon si commande members */
		else if ( l_cmd [0] == "members" )
		{
			/* Exécution de la commande speak */
			if ( g_cmd_members == true ) jerry_cmd_members ( p_message, l_cmd );
			else p_message.channel.send('This command is disable ! Please contact the amazing @Mac Lewis to enable it !');
		}
		
		/* Sinon si commande name */
		else if ( l_cmd [0] == "name" )
		{
			/* Exécution de la commande name */
			if ( g_cmd_name == true ) jerry_cmd_name ( p_message, l_cmd );
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




