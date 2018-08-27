
const rp = require('request-promise');
const cheerio = require('cheerio');

async function getInitial(text) {

    return await rp({
        uri: 'https://j-talk.com/convert',
        method: 'POST',
        formData: {
            '_token': 'CCLPaDaeOwSVHsFwP62tz1oAMR6dViXZtCfQGnAf',
            'content': text,
            'convertOption': 'main'
        },
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB',
            'cache-control': 'max-age=0',
            //'content-length': '174',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'convertOption=eyJpdiI6IkN1bVFLdzdhWWc2TnB1dzFGN0R2WEE9PSIsInZhbHVlIjoiVk92N0d0anhVakRMaENDSXR1ZHhwZz09IiwibWFjIjoiMjk1MmVlMjEyYmJkNDczMGI5NzM0ZTRmNzZiZjFlZjJlMzZkNzBmYWRiZDcyYWEwNTlmMmIyYzlmNjVhMmY1MyJ9; XSRF-TOKEN=eyJpdiI6ImRqS04yU2VHXC9BbkwzS1k0SGtoUlJRPT0iLCJ2YWx1ZSI6IjFRUk5hSndxa05Nd3RIN1Y2NjlnUmd4N2NNOEMwd0JoYkJUaEFWdHA1NlF0MWhLZDE3MzJmcUhVd0s4aVdjWFk2YzRPcUUxc3I2OGxlNnJXeXNnZktBPT0iLCJtYWMiOiJjNGMyNzBmMjcwNDlmZGJiMDNhODNjNTZiZjIzOGUwYjNiY2I2ZTg5ZGEwN2E4ZGM2ODJmMjI0OGQ2YzA4ZTI1In0%3D; j_talk_session=eyJpdiI6IjZXampZenl3VDlQT0J1SkRJYnBUaHc9PSIsInZhbHVlIjoiZzM1UTBqYTZpVnBPYUl5UmQxUEl2bTZPdEQwdXR2ZkxzakVhUmZVSVdKWmJZTGdLM0RUZk9uVXA1MUtJZU5QcXZEeTFwd1JmeGpobnBNYmpsQnRqV0E9PSIsIm1hYyI6IjEzOWYyMGExMjM3Y2EyM2ExZjFkZmY1NmQ1NjhlYTg5ZTA2NjE4NjQxZTBkZTQyNzVlZjI1YTVjMjA1ZjUzNjcifQ%3D%3D',
            'origin': 'https://j-talk.com',
            'referer': 'https://j-talk.com/convert',
            'upgrade-insecure-requests': '1'
        }
    }).catch(e => e);

}

module.exports = async function (text) {
    
    let e = await getInitial(text);

    return await rp({
        uri: cheerio.load(e.response.body)('a')[0].attribs.href
    });


}
