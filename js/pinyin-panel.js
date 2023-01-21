const KEY_A = 65;
const KEY_ALT = 18
const KEY_CTRL = 17;
const KEY_E = 69;
const KEY_F8 = 119;
const KEY_I = 73;
const KEY_O = 79;
const KEY_SHIFT = 16;
const KEY_U = 85;

//----------------------------------------------------------------------------------------------------------------------

class PinyinPanel {
    #_fallingTone;
    #_highTone;
    #_lowTone;
    #_risingTone;

    #_input;
    #_panel;
    #_uVowel;

    #_keyDownHandlers = {};
    #_keyUpHandlers = {};

    #_alt = false;
    #_shift = false;
    #_ctrl = false;
    #_f8 = false;

    Init () {
        this.#_panel = $ ( "#pinyin-panel" );

        this.#_highTone = new Plate ( "#pinyin-high-tone", "rgb(36, 18, 18)", "rgb(85, 42, 42)" );
        this.#_risingTone = new Plate ( "#pinyin-rising-tone", "rgb(19, 39, 24)", "rgb(44, 90, 56)" );
        this.#_lowTone = new Plate ( "#pinyin-low-tone", "rgb(19, 22, 37)", "rgb(48, 56, 92)" );
        this.#_fallingTone = new Plate ( "#pinyin-falling-tone", "rgb(33, 18, 36)", "rgb(81, 44, 88)" );
        this.#_uVowel = new Plate ( "#pinyin-ü-vowel", "rgb(38, 38, 38)", "rgb(90, 90, 90)" );

        const input = $ ( "#pinyin-value" );
        this.#_input = input;
        input.focus ( () => this.#Activate () );
        input.focusout ( () => this.#Deactivate () );
        input.keydown ( event => this.#OnKeyDown ( event ) );
        input.keyup ( event => this.#OnKeyUp ( event ) );

        const dh = this.#_keyDownHandlers;
        dh[ KEY_A ] = () => { this.#InsertVowel ( 'a', 'ā', 'á', 'ǎ', 'à' ); };
        dh[ KEY_ALT ] = () => { this.#_alt = true; this.#ResolvePlate (); };
        dh[ KEY_CTRL ] = () => { this.#_ctrl = true; this.#ResolvePlate (); };
        dh[ KEY_E ] = () => { this.#InsertVowel ( 'e', 'ē', 'é', 'ě', 'è' ); };

        dh[ KEY_F8 ] = () => {
            this.#_f8 = true;
            this.#ResolvePlate ();
            this.#InsertVowel ( 'ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ' );
        };

        dh[ KEY_I ] = () => { this.#InsertVowel ( 'i', 'ī', 'í', 'ǐ', 'ì' ); };
        dh[ KEY_O ] = () => { this.#InsertVowel ( 'o', 'ō', 'ó', 'ǒ', 'ò' ); };
        dh[ KEY_SHIFT ] = () => { this.#_shift = true; this.#ResolvePlate (); };
        dh[ KEY_U ] = () => { this.#InsertVowel ( 'u', 'ū', 'ú', 'ǔ', 'ù' ); };

        const uh = this.#_keyUpHandlers;
        uh[ KEY_ALT ] = () => { this.#_alt = false; this.#ResolvePlate (); };
        uh[ KEY_CTRL ] = () => { this.#_ctrl = false; this.#ResolvePlate (); };
        uh[ KEY_F8 ] = () => { this.#_f8 = false; this.#ResolvePlate (); };
        uh[ KEY_SHIFT ] = () => { this.#_shift = false; this.#ResolvePlate (); };
    }

    #Activate () {
        this.#_panel.css ( { opacity: 1.0 } );
    }

    #Deactivate () {
        this.#_highTone.Deactivate ();
        this.#_risingTone.Deactivate ();
        this.#_lowTone.Deactivate ();
        this.#_fallingTone.Deactivate ();
        this.#_uVowel.Deactivate ();
        this.#_panel.css ( { opacity: 0.25 } );
    }

    #InsertVowel ( neutral, high, rising, low, falling ) {
        // Based on https://stackoverflow.com/a/29862280
        const input = this.#_input;
        const start = input.prop ( "selectionStart" );
        const end = input.prop ( "selectionEnd" );
        const text = input.val ();

        const before = text.substring ( 0, start );
        const after  = text.substring ( end, text.length );

        var vowel;

        if ( this.#_highTone._isActive ) {
            vowel = high;
        } else if ( this.#_risingTone._isActive ) {
            vowel = rising;
        }  else if ( this.#_lowTone._isActive ) {
            vowel = low;
        }  else if ( this.#_fallingTone._isActive ) {
            vowel = falling;
        } else {
            vowel = neutral;
        }

        input.val ( `${before}${vowel}${after}` )

        const c = start + 1;
        input[ 0 ].selectionStart = c;
        input[ 0 ].selectionEnd = c;
        input.focus()
    }

    #OnKeyDown ( event ) {
        const keyCode = event.keyCode;
        const handler = this.#_keyDownHandlers[ keyCode ];

        if ( !handler ) {
            return;
        }

        event.preventDefault ();
        this.#_keyDownHandlers[ keyCode ] ();
    }

    #OnKeyUp ( event ) {
        const keyCode = event.keyCode;
        const handler = this.#_keyUpHandlers[ keyCode ];

        if ( !handler ) {
            return;
        }

        event.preventDefault ();
        this.#_keyUpHandlers[ keyCode ] ();
    }

    #ResolvePlate () {
        let modify = function ( handle, isActive ) {
            if ( isActive ) {
                handle.Activate ();
                return;
            }

            handle.Deactivate ();
        };

        const c = this.#_ctrl;
        const s = this.#_shift;

        const ft = this.#_fallingTone;
        const lt = this.#_lowTone;
        const rt = this.#_risingTone;

        modify ( this.#_uVowel, this.#_f8 );
        modify ( this.#_highTone, this.#_alt );

        if ( c && s ) {
            rt.Deactivate ();
            lt.Deactivate ();
            ft.Activate ();
            return;
        }

        ft.Deactivate ();
        modify ( rt, c );
        modify ( lt, s );
    }
}
