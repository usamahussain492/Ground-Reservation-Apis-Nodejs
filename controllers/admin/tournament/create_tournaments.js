const Tournament = require("../../../models/Tournament");
const Match = require("../../../models/Match");
const TeamRequest = require("../../../models/TeamRequest");
const sendEmail = require("../../../utils/send-email");
const sendErrorResponse = require("../../../utils/send-error-response");
require("dotenv/config")

module.exports = async (req, res) => {
  try {
    const { name, startDate, endDate, ground, teamRequests } = req.body;

    // Create the tournament
    const tournament = await Tournament.create({
      name,
      startDate,
      endDate,
      ground,
      teams: teamRequests,
    });

    // Generate random matches between team requests
    const matches = generateMatches(teamRequests,ground,tournament._id,startDate, endDate);

    // Create the matches
    const createdMatches = await Match.insertMany(matches);
    const gettedMatches = await Match.find({tournament:tournament._id}).populate(
        {
            path: "ground",
            select: "name location -_id"
        }
    )

    // Add the matches to the tournament
    tournament.matches = createdMatches.map((match) => match._id);
    await tournament.save();

    // Send email notifications to team requests with match schedules
    for (const teamRequest of teamRequests) {
      const teamMatches = gettedMatches.filter(
        (match) =>
          match.team1.toString() === teamRequest.toString() ||
          match.team2.toString() === teamRequest.toString()
      );
      const matchSchedules = teamMatches.map((match) => ({
        date: match.date,
        startTime: match.startTime,
        endTime: match.endTime,
        ground: match.ground,
      }));
      const teamRequestEmail = await TeamRequest.findById(teamRequest)
      await sendEmail({
        from: process.env.SMTP_MAIL,
        email: teamRequestEmail.email, // Set the recipient's email address
        subject: "Tournament Match Schedule",
        message: `Hi ${teamRequestEmail.teamName},\n\nHere are your match schedules for the tournament "${name}":\n\n${JSON.stringify(
          matchSchedules,
          null,
          2
        )}\n\nBest regards,\nThe Tournament Management Team`,
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Tournament created successfully.",
      result: tournament,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to create the tournament.",
      error.message
    );
  }
};

function generateMatches(teamRequests, ground, tournamentId, startDate, endDate) {
    const matches = [];
    const numTeams = teamRequests.length;
  
    for (let i = 0; i < numTeams - 1; i++) {
      for (let j = i + 1; j < numTeams; j++) {
        const match = {
          tournament: tournamentId,
          team1: teamRequests[i],
          team2: teamRequests[j],
          ground: ground,
          date: getRandomDate(startDate, endDate),
          startTime: getRandomTime(),
          endTime: getRandomTime(),
        };
  
        matches.push(match);
      }
    }
  
    return matches;
  }
  
  function getRandomDate(startDate, endDate) {
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();
  
    const randomDateTime = getRandomNumber(startDateTime, endDateTime);
  
    return new Date(randomDateTime);
  }
  
  function getRandomTime() {
    const hours = getRandomNumber(15, 18); // Random hour between 15 and 18 (3 PM and 6 PM)
    const minutes = getRandomNumber(0, 59);
  
    const startTime = new Date();
    startTime.setHours(hours, minutes, 0, 0);
  
    return startTime;
  }
  
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  

 
  
  
