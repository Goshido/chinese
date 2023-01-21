const GROUP_WORDS = 10;

//----------------------------------------------------------------------------------------------------------------------

class GroupPanel {
    #_checkbox;
    #_input;

    Init ( totalWords ) {
        const groups = Math.floor ( ( totalWords + GROUP_WORDS - 1 ) / GROUP_WORDS );

        $ ( "#group-amount" ).text ( groups );
        $ ( "#words-per-group" ).text ( GROUP_WORDS );

        this.#_checkbox = $ ( "#single-group" );

        const input = $ ( "#single-group-value" );
        this.#_input = input;
        var old = input.val ();

        input.on ( "input",
            () => {
                const now = input.val ();

                if ( !now ) {
                    old = "";
                    return;
                }

                try {
                    const v = parseFloat ( now );

                    if ( isNaN ( v ) ) {
                        input.val ( old );
                        return;
                    }

                    const good = Math.max ( 1, Math.min ( Math.round ( v ), groups ) );
                    input.val ( good );
                    old = good;
                } catch {
                    input.val ( old );
                }
            }
        );
    }

    UseSingleGroup () {
        return this.#_checkbox.prop ( 'checked' );
    }

    GetGroup () {
        const old = this.#_input.val ();
        return !old ? 1 : parseInt ( old );
    }
}
