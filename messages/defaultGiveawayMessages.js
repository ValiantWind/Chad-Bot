require('dotenv').config


module.exports = {
  giveaway:
    (process.env.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **Giveaway!** 🎉",
  giveawayEnded:
    (process.env.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **Giveaway Ended!** 🎉",
  drawing:  `Ends: **{timestamp}**`,
  inviteToParticipate: `React with 🎉 to participate!`,
  winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
  embedFooter: "Giveaways",
  noWinner: "Giveaway has been cancelled, no valid participations.",
  hostedBy: "Hosted by: {this.hostedBy}",
  winners: "winner(s)",
  endedAt: "Ended at"
}