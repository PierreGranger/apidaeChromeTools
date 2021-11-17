/**
 * Passe le bandeau en rouge si on est signed-in-as
 */

jQuery(document).ready(function () {

    if (jQuery('.actualites span.user-signed-in-as').length == 1)
        jQuery('body').addClass('user-signed-in-as');

});