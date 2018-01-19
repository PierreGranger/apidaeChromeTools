jQuery(document).ready(function(){
    jQuery('select option[value]').each(function(){
        jQuery(this).text(jQuery(this).text() + ' ['+jQuery(this).val()+']') ;
    }) ;
}) ;