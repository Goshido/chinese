class Plate {
    #_handler;
    #_inactiveColor;
    #_activeColor;
    #_isActive = false;

    constructor ( id, inactiveColor, activeColor ) {
        this.#_handler = $ ( id );
        this.#_inactiveColor = inactiveColor;
        this.#_activeColor = activeColor;
    }

    get _isActive () {
        return this.#_isActive;
    }

    Activate () {
        if ( this.#_isActive ) {
            return;
        }

        this.#_handler.css ( { "background-color" : this.#_activeColor } );
        this.#_isActive = true;
    }

    Deactivate () {
        if ( !this.#_isActive ) {
            return;
        }

        this.#_handler.css ( { "background-color" : this.#_inactiveColor } );
        this.#_isActive = false;
    }
}
