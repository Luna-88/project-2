const Dialogue = require('../models/dialogue')

async function displayDialogue(dialogue, response) {
    let dialogueDB = await Dialogue.find({})
    let dialogueResponse = []

    if (dialogue === 'instructions') {
        dialogueResponse = [dialogueDB[0].instructions]
    } else if (dialogue === 'solar') {
        dialogueResponse = dialogueDB[0].solar
    } else if (dialogue === 'wind') {
        dialogueResponse = dialogueDB[0].wind
    }

    response.status(200).send(dialogueResponse)
}

module.exports = {
    displayDialogue,
}