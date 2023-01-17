class Word {
    #_characters;
    #_meaning;
    #_pinyin;

    constructor ( characters, pinyin, meaning ) {
        this.#_characters = characters;
        this.#_meaning = meaning;
        this.#_pinyin = pinyin;
    }

    get _characters () {
        return this.#_characters;
    }

    get _meaning () {
        return this.#_meaning;
    }

    get _pinyin () {
        return this.#_pinyin;
    }
}
