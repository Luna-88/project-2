const Dialogue = require('../models/dialogue')

async function displayDialogue(response) {
    let dialogue = await Dialogue.find({})
    let solarDialogue = dialogue[0].solar
    let windDialogue = dialogue[0].wind

    response.status(200).send(solarDialogue)
}

module.exports = {
    displayDialogue,
}