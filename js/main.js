( function () {
    const KEY_F3 = 115;
    const KEY_F9 = 120;

    const g_App = new App ();

    // entry point
    function main () {
        g_App.Init ();

        $ ( document ).keydown (
            function ( event ) {
                switch ( event.which ) {
                    case KEY_F3:
                        g_App.OnAction ();
                        event.preventDefault ();
                        return;

                    case KEY_F9:
                        g_App.OnSpeaker ();
                        event.preventDefault ();
                        return;

                    default:
                        // NOTHING
                        break;
                }
            }
        );
    }

    window.onload = main;
} ) ();
