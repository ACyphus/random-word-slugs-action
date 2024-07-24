const core = require('@actions/core')
const { generateSlug } = require('random-word-slugs')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    // Get inputs from the workflow file
    const numberOfWords = core.getInput('number-of-words')
    const partsOfSpeech = core.getInput('parts-of-speech').split(',')

    // Validate inputs
    if (isNaN(numberOfWords) || numberOfWords <= 0) {
      throw new Error('Invalid number of words')
    }

    // Create options object
    const options = {
      format: 'kebab',
      partsOfSpeech
    }

    // Generate random words
    const wordsString = generateSlug(numberOfWords, options) // Generates a slug string
    const words = wordsString.split('-') // Split the slug string into an array

    // Convert words to camel case
    const camelWords = words
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase()
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join('')

    // Convert words to sentence case
    const sentenceWords = words
      .map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }
        return word.toLowerCase()
      })
      .join(' ')

    // Convert words to lower case
    const lowerWords = words.map(word => word.toLowerCase()).join(' ')

    // Convert words to title case
    const titleWords = words
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(' ')

    // Set outputs for other workflow steps to use
    core.setOutput('words-kebab', wordsString)
    core.setOutput('words-camel', camelWords)
    core.setOutput('words-sentence', sentenceWords)
    core.setOutput('words-lower', lowerWords)
    core.setOutput('words-title', titleWords)
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
