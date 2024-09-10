export function fieldsValidation(hasFields) {
  console.log('fieldsValidation');

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
    !containsATeamID &&
    !containsBTeamID &&
    !containsDate &&
    !containsScore &&
    !containsID
  ) {
    console.error('Invalid filds data');
    return false;
  }
}

// Score validation
export function scoreValidation(matchesData) {
  console.log('scoreValidation');

  const scoreRegex = /\(?\d+\(\d+\)?-\(?\d+\(\d+\)?|\d+-\d+/;

  const resultFieldsScore = matchesData.map((mach) =>
    scoreRegex.test(mach.Score),
  );

  const isHaveNotCorectScore = resultFieldsScore.includes('false');

  if (isHaveNotCorectScore) {
    console.error('Invalid score format:', matchesData);
    return false;
  }
}

// ID  validation
export function idValidation(matchesData) {
  console.log('idValidation');
  const resultFieldsID = matchesData.map((mach) => {
    if (!isNaN(mach.ID) && !isNaN(parseFloat(mach.ID))) {
      return true;
    } else {
      return false;
    }
  });

  const isHaveNotCorectID = resultFieldsID.includes('false');

  if (isHaveNotCorectID) {
    console.error('Invalid ID format:', matchesData);
    return false;
  }
}

// ATeamID  validation
export function aTeamIDValidation(matchesData) {
  console.log(`aTeamIDValidation`);

  const resultFieldsATeamID = matchesData.map((mach) => {
    if (!isNaN(mach.ATeamID) && !isNaN(parseFloat(mach.ATeamID))) {
      return true;
    } else {
      return false;
    }
  });

  const isHaveNotCorectATeamID = resultFieldsATeamID.includes('false');

  if (isHaveNotCorectATeamID) {
    console.error('Invalid ATeamID format:', matchesData);
    return false;
  }
}

// BTeamID  validation
export function bTeamIDValidation(matchesData) {
  console.log(`bTeamIDValidation`);
  const resultFieldsBTeamID = matchesData.map((mach) => {
    if (!isNaN(mach.BTeamID) && !isNaN(parseFloat(mach.BTeamID))) {
      return true;
    } else {
      return false;
    }
  });

  const isHaveNotCorectBTeamID = resultFieldsBTeamID.includes('false');

  if (isHaveNotCorectBTeamID) {
    console.error('Invalid BTeamID format:', matchesData);
    return false;
  }
}

// Date  validation
export function dateIDValidation(matchesData) {
  console.log(`dateIDValidation`);
  const resultFieldsDate = matchesData.map((mach) => isValidDate(mach.Date));

  const isHaveNotCorectDate = resultFieldsDate.includes(false);

  if (isHaveNotCorectDate) {
    console.error('Invalid Date format:', matchesData);
    return false;
  }
}

// isValidDate

export function isValidDate(dateString) {
  const [month, day, year] = dateString.split('/');
  const date = new Date(`${year}-${month}-${day}`);
  return date instanceof Date && !isNaN(date);
}
