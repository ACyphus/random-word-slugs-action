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
    const format = core.getInput('format')
    const partsOfSpeech = core.getInput('parts-of-speech').split(',')

    // Validate inputs
    if (isNaN(numberOfWords) || numberOfWords <= 0) {
      throw new Error('Invalid number of words')
    }

    // Create options object
    const options = {
      format,
      partsOfSpeech
    }

    // Create kebab options object
    const kebabOptions = {
      format: 'kebab',
      partsOfSpeech
    }

    // Generate random words
    const words = generateSlug(numberOfWords, options) // Generates a slug
    const kebabWords = generateSlug(numberOfWords, kebabOptions) // Generates a kebab-case slug

    // Set outputs for other workflow steps to use
    core.setOutput('words', words)
    core.setOutput('words-kebab-case', kebabWords)
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
