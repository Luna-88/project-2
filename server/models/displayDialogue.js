const Dialogue = require('../models/dialogue')

async function displayDialogue(dialogue, response) {
    let dialogueDB = await Dialogue.find({})
    let dialogueResponse = ''

    if (dialogue === 'instructions') {
        dialogueResponse = [dialogueDB[0].instructions]
    } else if (dialogue === 'solar') {
        dialogueResponse = dialogueDB[0].solar
    } else if (dialogue === 'wind') {
        dialogueResponse = dialogueDB[0].wind
    } else if (dialogue === 'winning') {
        dialogueResponse = [dialogueDB[0].winning]
    }

    response.status(200).send(dialogueResponse)
}

module.exports = {
    displayDialogue,
}