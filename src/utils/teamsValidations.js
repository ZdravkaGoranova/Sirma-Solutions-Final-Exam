export function fieldsValidationTeams(hasFields) {
  const containsID = hasFields.every((innerArray) => innerArray.includes('ID'));
  const containsName = hasFields.every((innerArray) =>
    innerArray.includes('Name'),
  );
  const containsManagerFullName = hasFields.every((innerArray) =>
    innerArray.includes('ManagerFullName'),
  );
  const containsGroup = hasFields.every((innerArray) =>
    innerArray.includes('Group'),
  );

  if (
    !containsName ||
    !containsManagerFullName ||
    !containsGroup ||
    !containsID
  ) {
    throw new Error('Invalid fields data');
  }

  console.log('Fields validation is correct');
  return true;
}
// ID  validation
export function idValidationTeam(teamsData) {
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

// Group validation
export function groupValidation(teamsData) {
  const groupRegex = /^[A-F]$/;

  const resultFieldsGroup = teamsData.map((team) =>
    groupRegex.test(team.Group),
  );

  const isHaveNotCorectGroup = resultFieldsGroup.includes(false);

  if (isHaveNotCorectGroup) {
    throw new Error('Invalid Group format');
  }
  console.log('Group validation is corect');
  return true;
}

// Name  validation
export function nameValidation(teamsData) {
  const nameRegex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
  const resultFieldsName = teamsData.map((team) => nameRegex.test(team.Name));

  const isHaveNotCorectName = resultFieldsName.includes(false);

  if (isHaveNotCorectName) {
    throw new Error('Invalid Name format');
  }
  console.log('Name validation is corect');
  return true;
}

// ManagerFullName  validation
export function fullNameValidation(teamsData) {
  const nameRegex = /^[A-Z][a-zA-Z]+(?: [A-Z][a-zA-Z]+)*(?: [a-z]+)?/;
  const resultFieldsName = teamsData.map((team) =>
    nameRegex.test(team.ManagerFullName),
  );

  const isHaveNotCorectName = resultFieldsName.includes(false);

  if (isHaveNotCorectName) {
    throw new Error('Invalid ManagerFullName format');
  }
  console.log('ManagerFullName validation is corect');
  return true;
}
