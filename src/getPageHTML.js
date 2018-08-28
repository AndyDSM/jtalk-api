
const rp = require('request-promise-native');

module.exports = async function (text) {
    
    return await rp({
        uri: 'https://j-talk.com/convert',
        method: 'POST',
        formData: {
            content: text
        },
        followAllRedirects: true
    })

}
