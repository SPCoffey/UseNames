var fs = require("fs");

var names = [];
var verbs = [];

const randomGen = (low, high) => {
	return Math.floor((Math.random() * (high - low)) + low);
}

const initialize = () => {
	var nameText = fs.readFileSync("./server/names.txt") + '';
	names = nameText.split("\n");
	
	var verbText = fs.readFileSync("./server/verbs.txt") + '';
	verbs = verbText.split("\n");
};

const randomName = () => {
    let name = "";

    let segments = randomGen(2,4);

    for (var i = 0; i < segments; i++)
    {
        name += names[randomGen(0, names.length)];
    }

    name = applyFilter(name);

    name = randomSpace(name);

    return name;
}

const randomNameNoFilter = (number) => {
    let name = "";
    let segments = number;

    for (var i = 0; i < segments; i++)
    {
        name += names[randomGen(0, names.length)];
    }

    return name;
}

const applyFilter = (name) => {
    let temp = name;
    let filter = randomGen(0, 11);

    switch (filter)
    {
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
    }

    return temp;
}

const leetFilter = (name) => {
    let temp = name;
    let random = randomGen(-1, 2);

    if (random <= 0)
    {
        if (randomGen(0, 11) < 5) temp = temp.replace(/e/g, '3').replace(/E/g, '3');
        if (randomGen(0, 11) < 5) temp = temp.replace(/O/g, '0').replace(/o/g, '0');
        if (randomGen(0, 11) < 5) temp = temp.replace(/l/g, '1').replace(/L/g, '1');
        if (randomGen(0, 11) < 5) temp = temp.replace(/t/g, '7').replace(/T/g, '7');
        if (randomGen(0, 11) < 5) temp = temp.replace(/a/g, '4').replace(/A/g, '4');
    }

    random = randomGen(0, 3);

    if (random === 0)
    {
        temp = "xX" + temp;
        temp += "Xx";
    }

    if (random === 1)
    {
        temp = "_" + temp;
        temp += "_";
    }

    return temp;
}

const yelling = (name) => {
    let temp = name;
    let random = randomGen(-1, 2);

    if (random <= 0)
    {
        temp = temp.toUpperCase();
    }

    if (random >= 0)
    {
        for (var i = randomGen(1, 6); i > 0; i--)
        {
            temp += "!";
        }
    }

    return temp;
}

const prefix = (name) => {
    let temp = name;
    let random = randomGen(0, 4);

    switch (random)
    {
        case 0:
            if (randomGen(0, 2) === 0)
            {
                temp = "PM_ME_YOUR_" + randomNameNoFilter(randomGen(1, 3)).toUpperCase();
            }
            else
            {
                temp = "PM_ME_UR_" + randomNameNoFilter(randomGen(1, 3)).toUpperCase();
            }
            break;
        case 1:
            temp = "@" + randomNameNoFilter(randomGen(1, 4));
            break;
        case 2:
            temp = "1-800-" + randomNameNoFilter(randomGen(1, 3)).toUpperCase();
            break;
        case 3:
            temp = "#" + randomNameNoFilter(randomGen(1, 4));
            break;
    }

    return temp;
}

const fileType = (name) => {
    let temp = name;
    let random = randomGen(0, 8);

    switch (random)
    {
        case 0:
            temp += ".mov";
            break;
        case 1:
            temp += ".bat";
            break;
        case 2:
            temp += ".exe";
            break;
        case 3:
            temp += ".gif";
            break;
        case 4:
            temp += ".jpeg";
            break;
        case 5:
            temp += ".meme";
            break;
        case 6:
            temp += ".emote";
            break;
        case 7:
            temp += ".kill";
            break;
    }

    return temp;
}

const suffix = (name) => {
    let temp = randomNameNoFilter(randomGen(1, 3));
    let random = randomGen(0, 8);

    switch (random)
    {
        case 0:
            temp += "phile";
            break;
        case 1:
            temp += "phobia";
            break;
        case 2:
            temp += "philiac";
            break;
        case 3:
            temp += "ist";
            break;
        case 4:
            temp += "ism";
            break;
        case 5:
            temp += "mania_" + randomGen(1960, 2066);
            break;
        case 6:
            temp += "fest_" + randomGen(1960, 2066);
            break;
        case 7:
            temp += "meister";
            break;
		case 8:
            temp += "_jam_" + randomGen(1960, 2066);
            break;
    }

    return temp;
}

const originalCharacter = (name) => {
    let temp = name;

    switch (randomGen(0, 3))
    {
        case (0):
            temp = randomNameNoFilter(randomGen(1, 3)) + "_The_" + randomNameNoFilter(1);
            break;
        case (1):
            temp = "The_" + randomNameNoFilter(1) + "_" + randomNameNoFilter(1);
            break;
    }

    if (randomGen(0, 4) === 1)
    {
		let tempArray = temp.split('');
		
        for (var i = 0; i < tempArray.length; i++)
        {
            if (tempArray[i].toLowerCase() === 'a' || tempArray[i].toLowerCase() === 'e' || tempArray[i].toLowerCase() === 'i' ||
                tempArray[i].toLowerCase() === 'o' || tempArray[i].toLowerCase() === 'u')
            {
                if (i > 2 && temp.substring(i - 2, 3) === "The")
                {
                    continue;
                }
                let letter = tempArray[i].toLowerCase();
                if (temp.substring(0, 3) === "The")
                {
                    tempArray.splice(4, i + 1, 'B', 'l', letter);
                }
                else
                {
					tempArray.splice(0, i + 1, 'B', 'l', letter);
                }
                break;
            }
        }
		
		temp = tempArray.join('');
    }
    if ((randomGen(0, 4) === 1))
    {
        temp += "_DO_NOT_STEAL";
    }

    return temp;
}

const geographic = (name) => {
    let temp = randomNameNoFilter(randomGen(1, 3)) + "_Of_" + randomNameNoFilter(1);

    let random = randomGen(0, 9);

    switch (random)
    {
        case 0:
            temp += "ia";
            break;
        case 1:
            temp += "town";
            break;
        case 2:
            temp += "_City";
            break;
        case 3:
            temp += "ville";
            break;
        case 4:
            temp += "_Island";
            break;
        case 5:
            temp += "Zone";
            break;
        case 6:
            temp += "_Grotto";
            break;
    }

    return temp;
}

const possessive = (name) => {
    let temp = randomNameNoFilter(randomGen(1, 3)) + "'s_" + randomNameNoFilter(randomGen(1, 3));

    return temp;
}

const verb = (name) => {
    let random = randomGen(0, 2);
    let temp = "";

    switch (random)
    {
        case 0:
            temp = verbs[randomGen(0, verbs.length)] + "_" + randomNameNoFilter(randomGen(1, 3));
            break;
        case 1:
            let verb = verbs[randomGen(0, verbs.length)];

            if (verb.charAt(verb.Length - 1) === 's')
            {
                verb += "es";
            }
            else
            {
                verb += "s";
            }

            temp = randomNameNoFilter(randomGen(1, 3)) + "_" + verb + "_" + randomNameNoFilter(randomGen(1, 3)) + "s";
            break;
    }
    
    return temp;
}

const numbers = (name) => {
    let temp = name;

    let random = randomGen(1, 5);

    if (randomGen(0, 2) === 1)
    {
        temp += "_";
    }

    for (var i = 0; i <= random; i++)
    {
        temp += randomGen(0, 10);
    }

    return temp;
}

const randomSpace = (name) => {
    let temp = name;
	
	temp = temp.replace(/\s+/g, '');

    if (randomGen(0, 2) === 1)
    {
        temp = temp.replace(/_/g, '-');
    }

    return temp;
}

module.exports.initialize = initialize;
module.exports.randomName = randomName;