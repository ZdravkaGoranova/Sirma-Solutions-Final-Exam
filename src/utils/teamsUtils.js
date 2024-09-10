export const calculatePoints = (matches, teams) => {
  const updatedTeams = { ...teams };

  matches.forEach((match) => {
    const ATeam = updatedTeams[match.ATeamID];
    const BTeam = updatedTeams[match.BTeamID];
    const [aScore, bScore] = match.Score.split('-').map(Number);

    if (aScore > bScore) {
      ATeam.points += 3;
      ATeam.wins += aScore;
      ATeam.losses += bScore;

      BTeam.wins += bScore;
      BTeam.losses += aScore;
    } else if (bScore > aScore) {
      BTeam.points += 3;
      BTeam.wins += bScore;
      BTeam.losses += aScore;

      ATeam.wins += aScore;
      ATeam.losses += bScore;
    } else {
      ATeam.points += 1;
      ATeam.draws += 1;
      ATeam.wins += aScore;
      ATeam.losses += bScore;

      BTeam.points += 1;
      BTeam.draws += 1;
      BTeam.wins += bScore;
      BTeam.losses += aScore;
    }
    ATeam.difference = ATeam.wins - ATeam.losses;
    BTeam.difference = BTeam.wins - BTeam.losses;
  });

  return updatedTeams;
};

export const getWinner = (ATeam, BTeam, score) => {
  const [aScore, bScore] = score.split('-').map(Number);
  return aScore > bScore ? ATeam.name : bScore > aScore ? BTeam.name : 'Draw';
};
