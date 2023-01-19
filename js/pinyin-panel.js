const KEY_SHIFT = 16;
const KEY_ALT = 18
const KEY_CTRL = 17;
const KEY_F8 = 119;

//----------------------------------------------------------------------------------------------------------------------

class PinyinPanel {
    #_fallingTone;
    #_highTone;
    #_lowTone;
    #_risingTone;

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
        input.focus ( () => this.#Activate () );
        input.focusout ( () => this.#Deactivate () );
        input.keydown ( event => this.#OnKeyDown ( event ) );
        input.keyup ( event => this.#OnKeyUp ( event ) );

        const dh = this.#_keyDownHandlers;
        dh[ KEY_ALT ] = () => { this.#_alt = true; this.#ResolvePlate (); };
        dh[ KEY_CTRL ] = () => { this.#_ctrl = true; this.#ResolvePlate (); };
        dh[ KEY_F8 ] = () => { this.#_f8 = true; this.#ResolvePlate (); };
        dh[ KEY_SHIFT ] = () => { this.#_shift = true; this.#ResolvePlate (); };

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

    #OnKeyDown ( event ) {
        const keyCode = event.keyCode;

        if ( !this.#IsSpecial ( keyCode ) ) {
            return;
        }

        event.preventDefault ();
        this.#_keyDownHandlers[ keyCode ] ();
    }

    #OnKeyUp ( event ) {
        const keyCode = event.keyCode;

        if ( !this.#IsSpecial ( keyCode ) ) {
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

    #IsSpecial ( keyCode ) {
        return keyCode === KEY_ALT || keyCode === KEY_CTRL || keyCode === KEY_SHIFT || keyCode === KEY_F8;
    }
}
