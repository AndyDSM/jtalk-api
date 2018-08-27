
const getHTML = require('./getPageHTML.js');
const JapaneseData = require('./japaneseData.js');

module.exports = async (text) => new JapaneseData(await getHTML(text));

/*module.exports('業務すれ小谷お世ております。').then(j => {
    console.log(JSON.stringify(j));
});*/