require('dotenv').config;

module.exports = {
  giveaway:
    (process.env.everyoneMention ? "\n\n" : "") +
    "🎉 **GIVEAWAY** 🎉",
  giveawayEnded:
    (process.env.everyoneMention ? "\n\n" : "") +
    "🎉 **GIVEAWAY ENDED** 🎉",
  drawing:  `Ends: **{timestamp}**`,
  inviteToParticipate: `React with 🎉 to participate!`,
  winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
  embedFooter: "Giveaways",
  noWinner: "Giveaway cancelled, no valid participations.",
  hostedBy: "Hosted by: {this.hostedBy}",
  winners: "winner(s)",
  endedAt: "Ended at"
}