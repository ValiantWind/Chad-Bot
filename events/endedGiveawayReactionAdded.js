module.exports = {
  async execute(giveaway, member, reaction){
     reaction.users.remove(member.user);
  member.send(`**This giveaway has already ended :(**`).catch(e => {})
  }
}