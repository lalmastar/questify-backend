const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const stopwords = new Set(natural.stopwords);

const questionWords = new Set(["what", "when", "where", "which", "who", "whom", "whose", "why", "how"]);

function filterKeywords(question) {
  // Tokenize the question into words
  const words = tokenizer.tokenize(question);

  // Remove stop words and question words from the list of words
  const filteredWords = words.filter(word => !stopwords.has(word) && !questionWords.has(word.toLowerCase()));

  // Filter the words based on their presence in the input question
  const keywords = filteredWords.filter(word => question.toLowerCase().includes(word.toLowerCase()));

  // Return the resulting keywords
  return keywords;
}

module.exports = filterKeywords;