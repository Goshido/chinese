class Dictionary {
    #_database = MakeDatabase ();

    GetSize () {
        return this.#_database.length;
    }

    GetWord ( idx ) {
        const entry = this.#_database[ idx ];
        return new Word ( entry._characters, entry._pinyin, entry._meaning );
    }

    GetCue ( idx ) {
        return new Audio ( this.#_database[ idx ]._cue );
    }
}
