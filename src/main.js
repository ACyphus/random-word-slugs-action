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

    // Generate random words
    const words = generateSlug(numberOfWords) // Generates a slug

    // Set outputs for other workflow steps to use
    core.setOutput('words', words)
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
