export function fieldsValidation(hasFields) {
  const containsID = hasFields.every((innerArray) => innerArray.includes('ID'));
  const containsATeamID = hasFields.every((innerArray) =>
    innerArray.includes('ATeamID'),
  );
  const containsBTeamID = hasFields.every((innerArray) =>
    innerArray.includes('BTeamID'),
  );
  const containsDate = hasFields.every((innerArray) =>
    innerArray.includes('Date'),
  );
  const containsScore = hasFields.every((innerArray) =>
    innerArray.includes('Score'),
  );

  if (
    !containsATeamID ||
    !containsBTeamID ||
    !containsDate ||
    !containsScore ||
    !containsID
  ) {
    throw new Error('Invalid fields data');
  }

  console.log('Fields validation is correct');
  return true;
}

// Score validation
export function scoreValidation(matchesData) {
  const scoreRegex = /\(?\d+\(\d+\)?-\(?\d+\(\d+\)?|\d+-\d+/;

  const resultFieldsScore = matchesData.map((mach) =>
    scoreRegex.test(mach.Score),
  );

  const isHaveNotCorectScore = resultFieldsScore.includes(false);

  if (isHaveNotCorectScore) {
    throw new Error('Invalid score format');
  }
  console.log('Score validation is corect');
  return true;
}

// ID  validation
export function idValidation(matchesData) {
  const resultFieldsID = matchesData.map((mach) => {
    if (!isNaN(mach.ID) && !isNaN(parseFloat(mach.ID))) {
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

// ATeamID  validation
export function aTeamIDValidation(matchesData) {
  const resultFieldsATeamID = matchesData.map((mach) => {
    if (!isNaN(mach.ATeamID) && !isNaN(parseFloat(mach.ATeamID))) {
      return true;
    } else {
      return false;
    }
  });

  const isHaveNotCorectATeamID = resultFieldsATeamID.includes(false);

  if (isHaveNotCorectATeamID) {
    throw new Error('Invalid BTeamID format');
  }
  console.log('ATeamID  validation is corect');
  return true;
}

// BTeamID  validation
export function bTeamIDValidation(matchesData) {
  const resultFieldsBTeamID = matchesData.map((mach) => {
    if (!isNaN(mach.BTeamID) && !isNaN(parseFloat(mach.BTeamID))) {
      return true;
    } else {
      return false;
    }
  });

  const isHaveNotCorectBTeamID = resultFieldsBTeamID.includes(false);

  if (isHaveNotCorectBTeamID) {
    throw new Error('Invalid BTeamID format');
  }
  console.log('BTeamID  validation is corect');
  return true;
}

// Date  validation
export function dateIDValidation(matchesData) {
  const resultFieldsDate = matchesData.map((mach) => isValidDate(mach.Date));

  const isHaveNotCorectDate = resultFieldsDate.includes(false);

  if (isHaveNotCorectDate) {
    throw new Error('Invalid Date format');
  }
  console.log('Date  validation is corect');
  return true;
}

// isValidDate

export function isValidDate(dateString) {
  const [month, day, year] = dateString.split('/');
  const date = new Date(`${year}-${month}-${day}`);
  return date instanceof Date && !isNaN(date);
}
