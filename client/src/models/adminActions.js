function deleteRecord(record) {

    switch (record.isAdmin) {
        case undefined: // delete game record
            console.log('0: Games Record ', record.isAdmin)
            console.log(record)
            return ('Deleted game record: ' + record._id)
        case false: // delete user record
            console.log('1: User Record ', record.isAdmin)
            return (record.username + ' user record was deleted')
        case true: // admin user flag
            console.log('2: User Record', record.isAdmin)
            return (record.username + ' is an administrator and cannot be deleted')
        default:
            return null
    }
}

module.exports = {
    deleteRecord,
}