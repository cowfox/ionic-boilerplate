/***********************************************************
 *  \#\#\#  \#\#\#
 *
 *
 ***********************************************************/

(function () {
    "use strict";


    app.config(function($provide)
    {
        $provide.decorator( '$log', function($delegate)
        {
            // Save the original $log.debug()
            var debugFn = $delegate.debug;

            $delegate.debug = function( )
            {
                var args    = [].slice.call(arguments);
                // Call the original with the output prepended with formatted timestamp
                debugFn.apply(null, args)
            };

            return $delegate;
        });
    });

    //----------------------------------------------------------
    // @cmtsection
    //----------------------------------------------------------


    //----------------------------------------------------------
    // Internal Functions
    //----------------------------------------------------------


}());