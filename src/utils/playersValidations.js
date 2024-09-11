export function fieldsValidationPlayers(playersArray) {
  const containsID = playersArray.every((player) => 'ID' in player);
  const containsTeamNumber = playersArray.every(
    (player) => 'TeamNumber' in player,
  );
  const containsPosition = playersArray.every((player) => 'Position' in player);
  const containsFullName = playersArray.every((player) => 'FullName' in player);
  const containsTeamID = playersArray.every((player) => 'TeamID' in player);

  if (
    !containsID ||
    !containsTeamNumber ||
    !containsPosition ||
    !containsFullName ||
    !containsTeamID
  ) {
    throw new Error('Invalid fields data');
  }

  console.log('Fields validation is correct');
  return true;
}

// ID  validation
export function idValidationPlayer(teamsData) {
  const resultFieldsID = teamsData.map((team) => {
    if (!isNaN(team.ID) && !isNaN(parseFloat(team.ID))) {
      return true;
    } else {
      return false;
    }
  });

  const isHaveNotCorectID = resultFieldsID.includes(false);

  if (isHaveNotCorectID) {
    throw new Error('Invalid ID format');
  }
  console.log('ID  validation is corect');
  return true;
}



// TeamNumber  validation

export function idValidationTeamNumber(playerData) {
  const resultFieldsID = playerData.map((team) => {
    const teamNumber = Number(team.TeamNumber);
    return !Number.isNaN(teamNumber);
  });

  const isHaveNotCorectID = resultFieldsID.includes(false);

  if (isHaveNotCorectID) {
    throw new Error('Invalid TeamNumber format');
  }

  console.log('TeamNumber validation is correct');
  return true;
}

// TeamID  validation

export function idValidationTeamID(playerData) {
  const resultFieldsID = playerData.map((team) => {
    const teamNumber = Number(team.TeamID);
    return !Number.isNaN(teamNumber);
  });

  const isHaveNotCorectID = resultFieldsID.includes(false);

  if (isHaveNotCorectID) {
    throw new Error('Invalid TeamID format');
  }

  console.log('TeamID validation is correct');
  return true;
}
// Position validation

export function positionValidation(teamsData) {
  const positionArray = [
    'GK',
    'CB',
    'RB',
    'LB',
    'RWB',
    'LWB',
    'CM',
    'CDM',
    'CAM',
    'RM',
    'LM',
    'ST',
    'CF',
    'RF',
    'LF',
    'RW',
    'LW',
    'DF',
    'MF',
    'FW',
  ];

  teamsData.forEach((team) => {
    if (!positionArray.includes(team.Position)) {
      throw new Error(`Invalid Position format for`);
    }
  });

  console.log('Position and FullName validation are correct');
  return true;
}
