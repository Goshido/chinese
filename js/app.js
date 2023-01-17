const STATE_PENDING = 0;
const STATE_READY = 1;

class App {
    #_dictionary = new Dictionary ();
    #_state = STATE_READY;

    OnAction () {
        let dict = this.#_dictionary;
        let word = dict.GetWord ( dict.GetSize () - 1 );
        console.log ( word._characters );
        console.log ( word._pinyin );
        console.log ( word._meaning );
    }

    OnSpeaker () {
        console.log ( "OnSpeaker" );
    }
}
