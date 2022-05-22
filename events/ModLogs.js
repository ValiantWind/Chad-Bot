const client = require('../index');



client.on('guildMemberRemove', async member => {
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});

	const kickLog = fetchedLogs.entries.first();

	// Perform a coherence check to make sure that there's *something*
	if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

	// Now grab the user object of the person who kicked the member
	// Also grab the target of this action to double-check things
	const { executor, target } = kickLog;

	// Update the output with a bit more information
	// Also run a check to make sure that the log returned was for the same kicked member
	if (target.id === member.id) {
    client.channels.get('775013744404201472').send(` ${message.user.tag} was kicked by ${executor.tag}.`) && client.channels.get('786281196815908893').send(` ${message.author.tag} was kicked by ${execute.tag}.`)
	} else {
		console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
	}
});

client.on('messageDelete', async message => {
  const channel2 = client.channels.cache.get('786281196815908893');
const channel1 = client.channels.cache.get('775013744404201472');
	// Ignore direct messages
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	// Since there's only 1 audit log entry in this collection, grab the first one
	const deletionLog = fetchedLogs.entries.first();

	// Perform a coherence check to make sure that there's *something*
	if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`) && console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`)

	// Now grab the user object of the person who deleted the message
	// Also grab the target of this action to double-check things
	const { executor, target } = deletionLog;

	// Update the output with a bit more information
	// Also run a check to make sure that the log returned was for the same author's message
	if (target.id === message.author.id) {
    client.channels.get('775013744404201472').send(`A message by ${message.author.tag} was deleted by ${executor.tag}.`) && client.channels.get('786281196815908893').send(`A message by ${message.author.tag} was deleted by ${execute.tag}.`)
	} else {
		client.channels.get('775013744404201472').send(`A message by ${message.author.tag} was deleted by an unknown person.`) && client.channels.get('786281196815908893').send(`A message by ${message.author.tag} was deleted by an unknown person.`)
	}
  
client.on('guildBanAdd', async ban => {
	const fetchedLogs = await ban.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	// Since there's only 1 audit log entry in this collection, grab the first one
	const banLog = fetchedLogs.entries.first();

	// Perform a coherence check to make sure that there's *something*
	if (!banLog) return console.log(`${ban.user.tag} was banned from ${ban.guild.name} but no audit log could be found.`);

	// Now grab the user object of the person who banned the member
	// Also grab the target of this action to double-check things
	const { executor, target } = banLog;

	// Update the output with a bit more information
	// Also run a check to make sure that the log returned was for the same banned member
	if (target.id === ban.user.id) {
		client.channels.get('775013744404201472').send(` ${ban.user.tag} was banned by ${executor.tag}.`) && client.channels.get('786281196815908893').send(` ${ban.author.tag} was banned by ${execute.tag}.`)
	} else {
		console.log(`${ban.user.tag} got hit with the swift hammer of justice in the guild ${ban.guild.name}, audit log fetch was inconclusive.`);
	}
});

client.on('guildBanRemove', async ban => {
	const fetchedLogs = await ban.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_REMOVE',
	});
	// Since there's only 1 audit log entry in this collection, grab the first one
	const banLog = fetchedLogs.entries.first();

	// Perform a coherence check to make sure that there's *something*
	if (!banLog) return console.log(`${ban.user.tag} was unbanned from ${ban.guild.name} but no audit log could be found.`);

	// Now grab the user object of the person who banned the member
	// Also grab the target of this action to double-check things
	const { executor, target } = banLog;

	// Update the output with a bit more information
	// Also run a check to make sure that the log returned was for the same banned member
	if (target.id === ban.user.id) {
		client.channels.get('775013744404201472').send(` ${ban.user.tag} was unbanned by ${executor.tag}.`) && client.channels.get('786281196815908893').send(` ${ban.author.tag} was unbanned by ${execute.tag}.`)
	} else {
		console.log(`${ban.user.tag} got unhit with the swift hammer of justice in the guild ${ban.guild.name}, audit log fetch was inconclusive.`);
	}
});