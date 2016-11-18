console.log('apidaeChromeTools/desactiveElementsZero.js') ;

var desactiveElementsZero = function(){
	
	var stop = false ;
	
	var tables = jQuery('div.modal.modal-element-reference-criteres-interdits form table') ;
	if ( tables.length == 0 )
	{
		alert('Vous devez cliquer sur le bouton "Modifier les informations" et faire apparaître la fenêtre d\'édition des critères.') ;
		return ;
	}
	
	var nbtot = 0 ;
		
	tables.each(function(){
		
		var nbtable = 0 ;
		
		if ( jQuery(this).find('tr').length <= 1 )
			return true ;
		
		if ( stop )
		{
			alert('Vous devez au préalable demander le calcul du nombre de fiches concernées.') ;
			return false ;
		}
		var type = jQuery(this).find('thead tr th').text().trim() ;
		console.log(type) ;
		if ( type == '' )
		{
			stop = true ;
			alert('Impossible de détecter le type d\'élément de référence dans la table :(') ;
			return false ;
		}
		
		if ( type == 'ActiviteCulturellePrestation' || type == 'ActiviteSportivePrestation' ) return true ;
		else
		{
			jQuery(this).find('tbody tr').each(function(){
				var nombre = jQuery(this).find('td.nom a.compteur span') ;
				if ( nombre.length == 0 )
				{
					stop = true ;
					return false ;
				}
				
				nombre = parseInt(nombre.text().trim()) ;
				
				var interdit_btn = jQuery(this).hasClass('selected') ;
				var interdit_etat = jQuery(this).find('td.interdit span').hasClass('fa-ban') ;
				var nom = jQuery(this).find('td.nom').text().trim() ;
				var interdit = jQuery(this).find('td.interdit') ;
				//console.log('['+nombre+'] '+nom+' : '+interdit_btn+'/'+interdit_etat) ;
				
				if ( nombre == 0 && interdit_btn == false && interdit_etat == false )
				{
					jQuery(this).css('outline','4px blue dotted') ;
					jQuery(this).find('td.selector a.btn-default').trigger('mousedown') ;
					nbtot++ ;
					nbtable++ ;
				}
				
			}) ;
		}
		
		jQuery(this).find('thead th').append('+ '+nbtable+' désactivées') ;
		
	}) ;
	
	jQuery('div.modal.modal-element-reference-criteres-interdits div.modal-header h3').append('+ '+nbtot+' désactivées') ;
	
}

//desactiveElementsZero() ;
