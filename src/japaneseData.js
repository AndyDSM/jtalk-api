
const cheerio = require('cheerio');

class JMorpheme {

    constructor (cUnit, romaji) {

        this.original = cUnit.find('.m').text();
        this.gloss = cUnit.find('.gloss').text();
        this.romajiInfo = cUnit.find('.preference-romaji').text();
        this.romaji = romaji.trim();
        this.hiragana = cUnit.find('.preference-hiragana').text();
        this.katakana = cUnit.find('.preference-katakana').text();
        this.type = cUnit.find('.m')[0].attribs['data-pos1']

        if (this.romajiInfo !== this.romajiInfo.toLowerCase()) {
            this.romajiInfo = this.romajiInfo.toLowerCase();
            this.romaji = this.romaji[0].toUpperCase() + this.romaji.slice(1);
        }

    }

}

class JWord {

    constructor () {
        this.morphemes = [];
    }

    getOriginal () { return (this.morphemes.length > 0 ? this.morphemes[0].original + this.morphemes.slice(1).reduce((a,r) => a+r.original, '') : '') }
    getGloss () { return (this.morphemes.length > 0 ? this.morphemes[0].gloss + this.morphemes.slice(1).reduce((a,r) => a+' '+r.gloss, '') : '') }
    getRomajiInfo () { return (this.morphemes.length > 0 ? this.morphemes[0].romajiInfo + this.morphemes.slice(1).reduce((a,r) => a+'-'+r.romajiInfo, '') : '') }
    getRomaji () { return (this.morphemes.length > 0 ? this.morphemes[0].romaji + this.morphemes.slice(1).reduce((a,r) => a+r.romaji, '') : '') }
    getHiragana () { return (this.morphemes.length > 0 ? this.morphemes[0].hiragana + this.morphemes.slice(1).reduce((a,r) => a+r.hiragana, '') : '') }
    getKatakana () { return (this.morphemes.length > 0 ? this.morphemes[0].katakana + this.morphemes.slice(1).reduce((a,r) => a+r.katakana, '') : '') }

    get original () { if (this._original === undefined) this._original = this.getOriginal(); return this._original; }
    get gloss () { if (this._gloss === undefined) this._gloss = this.getGloss(); return this._gloss; }
    get romajiInfo () { if (this._romajiInfo === undefined) this._romajiInfo = this.getRomajiInfo(); return this._romajiInfo; }
    get romaji () { if (this._romaji === undefined) this._romaji = this.getRomaji(); return this._romaji; }
    get hiragana () { if (this._hiragana === undefined) this._hiragana = this.getHiragana(); return this._hiragana; }
    get katakana () { if (this._katakana === undefined) this._katakana = this.getKatakana(); return this._katakana; }

}

class JData {

    constructor(html) {

        let $ = cheerio.load(html);
        let romaji = $('.output-romaji .output-body .sentence').children();
        let romajiBits = [];
        for (let romajiNo = 0; romajiNo < romaji.length; romajiNo++) romajiBits.push(romaji.slice(romajiNo,romajiNo+1).text());

        let units = $('.output-main .sentence .unit');
        this.words = [];
        for (let unitNo = 0; unitNo < units.length; unitNo++) {
            if ((/^ /).test(romajiBits[unitNo])) this.words.push(new JWord());
            this.words[this.words.length-1].morphemes.push(new JMorpheme(units.slice(unitNo,unitNo+1).children(), romajiBits[unitNo]));
        }
        //console.log(this);

    }

    getOriginal () { return (this.words.length > 0 ? this.words[0].original + this.words.slice(1).reduce((a,r) => a+r.original, '') : '') }
    getGloss () { return (this.words.length > 0 ? this.words[0].gloss + this.words.slice(1).reduce((a,r) => a+' '+r.gloss, '') : '') }
    getRomajiInfo () { return (this.words.length > 0 ? this.words[0].romajiInfo + this.words.slice(1).reduce((a,r) => a+' '+r.romajiInfo, '') : '') }
    getRomaji () { return (this.words.length > 0 ? this.words[0].romaji + this.words.slice(1).reduce((a,r) => a+' '+r.romaji, '') : '') }
    getHiragana () { return (this.words.length > 0 ? this.words[0].hiragana + this.words.slice(1).reduce((a,r) => a+r.hiragana, '') : '') }
    getKatakana () { return (this.words.length > 0 ? this.words[0].katakana + this.words.slice(1).reduce((a,r) => a+r.katakana, '') : '') }

    get original () { if (this._original === undefined) this._original = this.getOriginal(); return this._original; }
    get gloss () { if (this._gloss === undefined) this._gloss = this.getGloss(); return this._gloss; }
    get romajiInfo () { if (this._romajiInfo === undefined) this._romajiInfo = this.getRomajiInfo(); return this._romajiInfo; }
    get romaji () { if (this._romaji === undefined) this._romaji = this.getRomaji(); return this._romaji; }
    get hiragana () { if (this._hiragana === undefined) this._hiragana = this.getHiragana(); return this._hiragana; }
    get katakana () { if (this._katakana === undefined) this._katakana = this.getKatakana(); return this._katakana; }

}

module.exports = JData;