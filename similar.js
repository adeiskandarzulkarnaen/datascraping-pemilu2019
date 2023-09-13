const stringSimilarity = require('string-similarity');

const text1 = 'meruyung'.toLocaleLowerCase();
const text2 = 'maruyung'.toLocaleLowerCase();

const similarity = stringSimilarity.compareTwoStrings(text1, text2);


// console.log('Ade  Ikandar   Zulkarnaen'.replace(/\s/g, '').toLocaleLowerCase());

console.log(`String similarity: ${similarity}`);
