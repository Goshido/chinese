const STATE_PENDING = 0;
const STATE_READY = 1;

//----------------------------------------------------------------------------------------------------------------------

class App {
    #_action;
    #_chineseWord;
    #_meaningAnswer;
    #_meaningInput;
    #_pinyinAnswer;
    #_pinyinInput;

    #_dictionary = new Dictionary ();
    #_idx;
    #_state = STATE_PENDING;

    Init () {
        this.#_chineseWord = $ ( "#chinese-word" );
        this.#_meaningAnswer = $ ( "#meaning-answer" );
        this.#_meaningInput = $ ( "#meaning-value" );
        this.#_pinyinAnswer = $ ( "#pinyin-answer" );
        this.#_pinyinInput = $ ( "#pinyin-value" );
        this.#_action = $ ( "#action" );

        $ ( "#action" ).click ( () => this.OnAction () );
        $ ( "#speaker" ).click ( () => this.OnSpeaker () );

        this.#ProduceWord ();
    }

    OnAction () {
        if ( this.#_state === STATE_READY ) {
            this.#ProduceWord ();
            this.#_state = STATE_PENDING;
            return;
        }

        this.#Check ();
        this.#_state = STATE_READY;
    }

    OnSpeaker () {
        this.#_dictionary.GetCue ( this.#_idx ).play ();
    }

    #Check () {
        const word = this.#_dictionary.GetWord ( this.#_idx );

        const p = this.#_pinyinAnswer;
        p.text ( word._pinyin );
        p.css ( { opacity : 1.0 } );

        const m = this.#_meaningAnswer;
        m.text ( word._meaning );
        m.css ( { opacity : 1.0 });

        this.#_action.text ( "Next" );
    }

    #Roll () {
        const size = this.#_dictionary.GetSize ();
        const idx = Math.floor ( Math.random () * size );

        if ( idx === this.#_idx ) {
            this.#_idx = ( idx + 1 ) % size;
            return;
        }

        this.#_idx = idx;
    }

    #RollTest () {
        this.#_idx = 19;
    }

    #ProduceWord () {
        this.#Roll ();
        //this.#RollTest ();

        const word = this.#_dictionary.GetWord ( this.#_idx );
        this.#_chineseWord.text ( word._characters );

        this.#_meaningInput.val ( "" );

        const m = this.#_meaningAnswer;
        m.css ( { opacity : 0.0 } );

        this.#_pinyinInput.val ( "" );

        const p = this.#_pinyinAnswer;
        p.css ( { opacity : 0.0 } );

        this.#_action.text ( "Commit" );
    }
}
