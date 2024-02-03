// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

const vowelScorer = {
  1: [
    "B",
    "C",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
  3: ["A", "E", "I", "O", "U", "Y"],
};
const vowels = "AEIOU";

let simpleScorer = function (word) {
  return word.length;
};

let vowelBonusScorer = function (word) {
  let score = 0;
  word = word.toUpperCase();
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      score += 3; // Add 3 points for vowels
    } else {
      score += 1; // Add 1 point for consonants
    }
  }

  return score;
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

const SimpleScore = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoringFunction: simpleScorer,
};

const BonusVowels = {
  name: "Bonus Vowels.",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: vowelBonusScorer,
};

const Scrabble = {
  name: "Traditional.",
  description: "The traditional scoring algorithm.",
  scoringFunction: oldScrabbleScorer,
};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let word = input.question("Enter a word to score: ");
  console.log("Let's play some scrabble! Enter a word:");
  return word;
}

let scrabbleScorer;

const scoringAlgorithms = [SimpleScore, BonusVowels, Scrabble];
function scorerPrompt(word) {
  const multilineString = `
   Which scoring algorithm would you like to use?

   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses Scrabble point system`;

  console.log(multilineString);
  let scorerAlgorithm = input.question("Enter 0,1,or 2: ");
  console.log("algorithm name: ", scoringAlgorithms[scorerAlgorithm].name);
  console.log(
    "scoringFunction result: ",
    scoringAlgorithms[scorerAlgorithm].scoringFunction(word)
  );
}

function transform() {}

let newPointStructure;

function runProgram() {
  let word = initialPrompt();
  scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
