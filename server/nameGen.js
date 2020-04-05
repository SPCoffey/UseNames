const fs = require('fs');

let names = [];
let verbs = [];

const randomGen = (low, high) => Math.floor((Math.random() * (high - low)) + low);

const initialize = () => {
  const nameText = `${fs.readFileSync('./server/names.txt')}`;
  names = nameText.split('\n');

  const verbText = `${fs.readFileSync('./server/verbs.txt')}`;
  verbs = verbText.split('\n');
};

const randomNameNoFilter = (number) => {
  let name = '';
  const segments = number;

  for (let i = 0; i < segments; i++) {
    name += names[randomGen(0, names.length)];
  }

  return name;
};

const leetFilter = (name) => {
  let temp = name;
  let random = randomGen(-1, 2);

  if (random <= 0) {
    if (randomGen(0, 11) < 5) temp = temp.replace(/e/g, '3').replace(/E/g, '3');
    if (randomGen(0, 11) < 5) temp = temp.replace(/O/g, '0').replace(/o/g, '0');
    if (randomGen(0, 11) < 5) temp = temp.replace(/l/g, '1').replace(/L/g, '1');
    if (randomGen(0, 11) < 5) temp = temp.replace(/a/g, '4').replace(/A/g, '4');
  }

  random = randomGen(0, 4);

  if (random === 0) {
    temp = `xX${temp}`;
    temp += 'Xx';
  }

  if (random === 1) {
    temp = `_${temp}`;
    temp += '_';
  }

  if (random === 2) {
    temp = `-${temp}`;
    temp += '-';
  }

  return temp;
};

const yelling = (name) => {
  let temp = name;
  const random = randomGen(-1, 2);

  if (random <= 0) {
    temp = temp.toUpperCase();
  }

  if (random >= 0) {
    for (let i = randomGen(1, 6); i > 0; i--) {
      temp += '!';
    }
  }

  return temp;
};

const prefix = (name) => {
  let temp = name;
  const random = randomGen(0, 5);

  switch (random) {
    case 0:
      if (randomGen(0, 2) === 0) {
        temp = `PM_ME_YOUR_${randomNameNoFilter(randomGen(1, 3)).toUpperCase()}`;
      } else {
        temp = `PM_ME_UR_${randomNameNoFilter(randomGen(1, 3)).toUpperCase()}`;
      }
      break;
    case 1:
      temp = `@${randomNameNoFilter(randomGen(1, 4))}`;
      break;
    case 2:
      temp = `1-800-${randomNameNoFilter(randomGen(1, 3)).toUpperCase()}`;
      break;
    case 3:
      temp = `#${randomNameNoFilter(randomGen(1, 4))}`;
      break;
    case 4:
      temp = `u/${randomNameNoFilter(randomGen(1, 4))}`;
      break;
    default:
      // Do nothing
      break;
  }

  return temp;
};

const properName = (name) => {
  let temp = name;
  const random = randomGen(0, 3);

  switch (random) {
    case 0: {
      temp = `Mr.${randomNameNoFilter(randomGen(1, 3))}`;
      break;
    }
    case 1: {
      temp = `Ms.${randomNameNoFilter(randomGen(1, 3))}`;
      break;
    }
    case 2: {
      const word = randomNameNoFilter(1);
      if (randomGen(0, 2) === 0) {
        temp = `${word}y_Mc${word}face`;
      } else {
        temp = `${randomNameNoFilter(1)}y_Mc${randomNameNoFilter(1)}face`;
      }
      break;
    }
    default: {
      // Do nothing
      break;
    }
  }

  return temp;
};

const fileType = (name) => {
  let temp = name;
  const random = randomGen(0, 8);

  switch (random) {
    case 0:
      temp += '.mov';
      break;
    case 1:
      temp += '.bat';
      break;
    case 2:
      temp += '.exe';
      break;
    case 3:
      temp += '.gif';
      break;
    case 4:
      temp += '.jpeg';
      break;
    case 5:
      temp += '.meme';
      break;
    case 6:
      temp += '.emote';
      break;
    case 7:
      temp += '.kill';
      break;
    default:
      // Do nothing
      break;
  }

  return temp;
};

const suffix = () => {
  let temp = randomNameNoFilter(randomGen(1, 3));
  const random = randomGen(0, 8);

  switch (random) {
    case 0:
      temp += 'phile';
      break;
    case 1:
      temp += 'phobia';
      break;
    case 2:
      temp += 'philiac';
      break;
    case 3:
      temp += 'ist';
      break;
    case 4:
      temp += 'ism';
      break;
    case 5:
      temp += `mania_${randomGen(1960, 2066)}`;
      break;
    case 6:
      temp += `fest_${randomGen(1960, 2066)}`;
      break;
    case 7:
      temp += 'meister';
      break;
    case 8:
      temp += `_jam_${randomGen(1960, 2066)}`;
      break;
    default:
      // Do nothing
      break;
  }

  return temp;
};

const originalCharacter = (name) => {
  let temp = name;

  switch (randomGen(0, 4)) {
    case (0):
      temp = `${randomNameNoFilter(randomGen(1, 3))}_The_${randomNameNoFilter(1)}`;
      break;
    case (1):
      temp = `The_${randomNameNoFilter(1)}_${randomNameNoFilter(1)}`;
      break;
    case (2):
      temp = `The_${randomNameNoFilter(1)}`;
      break;
    case (3):
      temp = `｢${randomNameNoFilter(randomGen(1, 3)).toUpperCase()}｣`;
      break;
    case (4):
      temp = `My Stand, ｢${randomNameNoFilter(randomGen(1, 3)).toUpperCase()}｣`;
      break;
    default:
      // Do nothing
      break;
  }

  if (randomGen(0, 4) === 1) {
    const tempArray = temp.split('');

    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].toLowerCase() === 'a' || tempArray[i].toLowerCase() === 'e' || tempArray[i].toLowerCase() === 'i' ||
                tempArray[i].toLowerCase() === 'o' || tempArray[i].toLowerCase() === 'u') {
        if (i > 2 && temp.substring(i - 2, 3) === 'The') {
          continue;
        }
        const letter = tempArray[i].toLowerCase();
        if (temp.substring(0, 3) === 'The') {
          tempArray.splice(4, i + 1, 'B', 'l', letter);
        } else {
          tempArray.splice(0, i + 1, 'B', 'l', letter);
        }
        break;
      }
    }

    temp = tempArray.join('');
  }
  if ((randomGen(0, 4) === 1)) {
    temp += '_DO_NOT_STEAL';
  }

  return temp;
};

const geographic = () => {
  let temp = `${randomNameNoFilter(randomGen(1, 3))}_Of_${randomNameNoFilter(1)}`;

  const random = randomGen(0, 9);

  switch (random) {
    case 0:
      temp += 'ia';
      break;
    case 1:
      temp += 'town';
      break;
    case 2:
      temp += '_City';
      break;
    case 3:
      temp += 'ville';
      break;
    case 4:
      temp += '_Island';
      break;
    case 5:
      temp += 'Zone';
      break;
    case 6:
      temp += '_Grotto';
      break;
    default:
      // Do nothing
      break;
  }

  return temp;
};

const possessive = () => {
  let temp = '';

  const random = randomGen(0, 2);

  switch (random) {
    case 0:
      temp = `${randomNameNoFilter(randomGen(1, 3))}'s_${randomNameNoFilter(1)}`;
      break;
    case 1:
      temp = `${randomNameNoFilter(1)}_And_The_${randomNameNoFilter(1)}`;
      break;
    default:
      // Do nothing
      break;
  }

  if (randomGen(0, 2) === 0) {
    temp += 's';
  }

  return temp;
};

const verb = () => {
  const random = randomGen(0, 3);
  let temp = '';
  let tempVerb = verbs[randomGen(0, verbs.length)];
  if (tempVerb.charAt(tempVerb.length - 2) === 's') {
    tempVerb += 'es';
  } else {
    tempVerb += 's';
  }

  let tempName = randomNameNoFilter(1);
  if (tempName.charAt(tempName.length - 2) === 's') {
    tempName += 'es';
  } else {
    tempName += 's';
  }

  switch (random) {
    case 0:
      temp = `${verbs[randomGen(0, verbs.length)]}_${randomNameNoFilter(1)}`;
      break;
    case 1:
      temp = `${randomNameNoFilter(1)}_${tempVerb}_${tempName}`;
      break;
    case 2:
      temp = `${tempVerb}_with_${tempName}`;
      break;
    default:
      // Do nothing
      break;
  }

  return temp;
};

const numbers = (name) => {
  let temp = name;

  const random = randomGen(1, 5);

  if (randomGen(0, 2) === 1) {
    temp += '_';
  }

  for (let i = 0; i <= random; i++) {
    temp += randomGen(0, 10);
  }

  return temp;
};

const randomSpace = (name) => {
  let temp = name;

  temp = temp.replace(/\s+/g, '');

  if (randomGen(0, 2) === 1) {
    temp = temp.replace(/_/g, '-');
  }

  return temp;
};

const applyFilter = (name) => {
  let temp = name;
  const filter = randomGen(0, 12);

  switch (filter) {
    case (0):
      temp = leetFilter(temp);
      break;
    case (1):
      temp = yelling(temp);
      break;
    case (2):
      temp = prefix(temp);
      break;
    case (3):
      temp = originalCharacter(temp);
      break;
    case (4):
      temp = fileType(temp);
      break;
    case (5):
      temp = suffix(temp);
      break;
    case (6):
      temp = geographic(temp);
      break;
    case (7):
      temp = possessive(temp);
      break;
    case (8):
      temp = verb(temp);
      break;
    case (9):
      temp = numbers(temp);
      break;
    case (10):
      temp = properName(temp);
      break;
    default:
      // Do nothing
      break;
  }

  return temp;
};

const randomName = () => {
  let name = '';

  const segments = randomGen(2, 4);

  for (let i = 0; i < segments; i++) {
    name += names[randomGen(0, names.length)];
  }

  name = applyFilter(name);

  name = randomSpace(name);

  return name;
};

module.exports.initialize = initialize;
module.exports.randomName = randomName;
