require('dotenv').config


module.exports = {
  giveaway:
    (process.env.everyoneMention ? "@Giveawaus\n\n" : "") +
    "🎉 **Giveaway!** 🎉",
  giveawayEnded:
    (process.env.everyoneMention ? "@Giveaways\n\n" : "") +
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