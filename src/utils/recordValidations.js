export function fieldsValidationRecords(playersArray) {
  const containsID = playersArray.every((player) => 'ID' in player);
  const containsPlayerID = playersArray.every((player) => 'PlayerID' in player);
  const containsMatchID = playersArray.every((player) => 'MatchID' in player);
  const containsfromMinutes = playersArray.every(
    (player) => 'fromMinutes' in player,
  );
  const containstoMinutes = playersArray.every(
    (player) => 'toMinutes' in player,
  );

  if (
    !containsID ||
    !containsPlayerID ||
    !containsMatchID ||
    !containsfromMinutes ||
    !containstoMinutes
  ) {
    throw new Error('Invalid fields data');
  }

  console.log('Fields validation is correct');
  return true;
}

// ID validation
export function idValidationRecords(dataRecord) {
  const resultFieldsID = dataRecord.map((record) => {
    if (!isNaN(record.ID) && !isNaN(parseFloat(record.ID))) {
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


// PlayerID validation
export function playerIDValidationRecords(dataRecord) {
  const resultFieldsPlayerID = dataRecord.map((record) => {
    if (!isNaN(record.PlayerID) && !isNaN(parseFloat(record.PlayerID))) {
      return true;
    } else {
      return false;
    }
  });

  const isHaveNotCorectID = resultFieldsPlayerID.includes(false);

  if (isHaveNotCorectID) {
    throw new Error('Invalid PlayerID format');
  }
  console.log('PlayerID  validation is corect');
  return true;
}

// MatchID validation
export function matchIDValidationRecords(dataRecord) {
  const resultFieldsMatchID = dataRecord.map((record) => {
    if (!isNaN(record.MatchID) && !isNaN(parseFloat(record.MatchID))) {
      return true;
    } else {
      return false;
    }
  });

  const isHaveNotCorectID = resultFieldsMatchID.includes(false);

  if (isHaveNotCorectID) {
    throw new Error('Invalid MatchID format');
  }
  console.log('MatchID  validation is corect');
  return true;
}

// FromMinutes validation
export function fromMinutesValidationRecords(dataRecord) {
  const resultFieldsFromMinutes = dataRecord.map((record) => {
    if (!isNaN(record.fromMinutes) && !isNaN(parseFloat(record.fromMinutes))) {
      return true;
    } else {
      return false;
    }
  });

  const isHaveNotCorectID = resultFieldsFromMinutes.includes(false);

  if (isHaveNotCorectID) {
    throw new Error('Invalid FromMinutes format');
  }
  console.log('FromMinutes  validation is corect');
  return true;
}

// toMinutes validation
export function toMinutesValidationRecords(dataRecord) {
  const resultFieldstoMinutes = dataRecord.map((record) => {
    if ((!isNaN(record.toMinutes) && !isNaN(parseFloat(record.toMinutes))) || record.toMinutes === 'NULL') {
      return true;
    } else {
      return false;
    }
  });

  const isHaveNotCorectID = resultFieldstoMinutes.includes(false);

  if (isHaveNotCorectID) {
    throw new Error('Invalid toMinutes format');
  }
  console.log('toMinutes  validation is corect');
  return true;
}