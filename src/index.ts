function merge(array1: Array<number>, array2: Array<number>): Array<number> {
  const result: Array<number> = [];
  const l: number = Math.min(array1.length, array2.length);
  for (let i: number = 0; i < l; i += 1) {
    result.push(array1[i], array2[i]);
  }
  result.push(...array1.slice(l), ...array2.slice(l));
  return result;
}

const array1: Array<number> = [4, 5, 23, 18, 9, -5];
const array2: Array<number> = [18, 74, 88, 3, 7, 44];

const mergedArray: Array<number> = merge(array1, array2);
console.log(mergedArray);

const array3: Array<number> = [4, 5, 23, 18, 9, -5, 31];
const array4: Array<number> = [18, 74, 88, 3];

const mergedArray2: Array<number> = merge(array3, array4);
console.log(mergedArray2);

const array5: Array<number> = [18, 74, 88, 3];
const array6: Array<number> = [4, 5, 23, 18, 9, -5, 31];

const mergedArray3: Array<number> = merge(array5, array6);
console.log(mergedArray3);

function checkWord(word: string, secretWord: string): Array<string> {
  const result: Array<string> = [];
  for (let i = 0; i < secretWord.length; i += 1) {
    if (word[i] === secretWord[i]) {
      result[i] = 'c';
    } else if (secretWord.includes(word[i])) {
      result[i] = 'p';
    } else {
      result[i] = 'a';
    }
  }
  return result;
}

const attempts = ['rains', 'shout', 'scope', 'spoke'];
const secretWord: string = 'spoke';

for (let i = 0; i < attempts.length; i += 1) {
  const guess: string = attempts[i];
  const result = checkWord(guess, secretWord);
  console.log(result);
}

function sum(array: Array<number>): number {
  let runningTotal: number = 0;
  for (let i = 0; i < array.length; i += 1) {
    runningTotal += array[i];
  }
  return runningTotal;
}

function precinctPercentage(runners: Array<Candidate>): void {
  for (let j = 0; j < runners.length; j += 1) {
    let total: number = 0;
    let l: number = 0;
    console.log(runners[j].name);
    while (l < runners.length + 1) {
      for (let i = 0; i < runners.length; i += 1) {
        total += runners[i].votes[l];
      }
      console.log('Precinct', l + 1, ' -- ', ((runners[j].votes[l] / total) * 100).toFixed(2));
      total = 0;
      l += 1;
    }
    console.log('\n');
  }
}

function costPerVote(runners: Array<Candidate>): void {
  for (let i = 0; i < runners.length; i += 1) {
    const total: number = sum(runners[i].votes);
    const cost: number = runners[i].funding / total;
    console.log(runners[i].name, 'spent $', cost.toFixed(2), ' per vote.');
  }
}

function whoWon(runners: Array<Candidate>): void {
  let overallTotal: number = 0;
  for (let i = 0; i < runners.length; i += 1) {
    const total: number = sum(runners[i].votes);
    overallTotal += total;
  }
  for (let j = 0; j < runners.length; j += 1) {
    const candidateTotal: number = sum(runners[j].votes);
    const percentage: number = (candidateTotal / overallTotal) * 100;
    if (percentage > 50) {
      console.log(runners[j].name, 'won with ', percentage.toFixed(2), '% of the votes.');
    }
  }
}
type Candidate = {
  name: string;
  votes: Array<number>;
  funding: number;
};

const candidate1: Candidate = {
  name: 'Edward Underwood',
  votes: [192, 147, 186, 114, 267],
  funding: 58182890,
};

const candidate2: Candidate = {
  name: 'Rose Olson',
  votes: [48, 90, 12, 21, 13],
  funding: 78889263,
};

const candidate3: Candidate = {
  name: 'Leonard Willis',
  votes: [206, 312, 121, 408, 382],
  funding: 36070689,
};

const candidate4: Candidate = {
  name: 'Nathaniel Taylor',
  votes: [37, 21, 38, 39, 29],
  funding: 6317921937,
};

const electionsData: Array<Candidate> = [candidate1, candidate2, candidate3, candidate4];

const totalVotes1: number = sum(candidate1.votes);
const totalVotes2: number = sum(candidate2.votes);
const totalVotes3: number = sum(candidate3.votes);
const totalVotes4: number = sum(candidate4.votes);
const overallTotal: number = totalVotes1 + totalVotes2 + totalVotes3 + totalVotes4;
const percent1: number = (totalVotes1 / overallTotal) * 100;
const percent2: number = (totalVotes2 / overallTotal) * 100;
const percent3: number = (totalVotes3 / overallTotal) * 100;
const percent4: number = (totalVotes4 / overallTotal) * 100;

console.log('\n');
console.log(candidate1.name, ' -- ', totalVotes1, ' votes -- ', percent1.toFixed(2), '%');
console.log(candidate2.name, ' -- ', totalVotes2, ' votes -- ', percent2.toFixed(2), '%');
console.log(candidate3.name, ' -- ', totalVotes3, ' votes -- ', percent3.toFixed(2), '%');
console.log(candidate4.name, ' -- ', totalVotes4, ' votes -- ', percent4.toFixed(2), '%');
console.log('\n');

precinctPercentage(electionsData);
costPerVote(electionsData);
console.log('\n');
whoWon(electionsData);
