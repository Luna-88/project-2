
function deleteRecord(record) {
    switch (record.isAdmin) {
        case undefined: // delete game record
            console.log('0: Games Record ', record.isAdmin)
            return 'Game record deleted'
        case false: // delete user record
            console.log('1: User Record ', record.isAdmin)

            return 'User record deleted'
        case true: // admin user flag
            console.log('2: User Record', record.isAdmin)
            return 'Administrator record cannot be deleted'
        default:
            return null
    }
}

module.exports = {
    deleteRecord,
}