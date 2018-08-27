
const getHTML = require('./getPageHTML.js');
const JapaneseData = require('./japaneseData.js');

/*(
    async (text) => new JapaneseData(await getHTML(text))
)('業務すれ小谷お世ております。').then(j => {
    console.log(j.original);
    console.log(j.gloss);
    console.log(j.romajiInfo);
    console.log(j.romaji);
    console.log(j.hiragana);
    console.log(j.katakana);
});*/

module.exports = async (text) => new JapaneseData(await getHTML(text));

module.exports('業務すれ小谷お世ております。').then(j => {
    console.log(JSON.stringify(j));
});