console.log('apidaeChromeTools/afficherMetadonnees.js') ;

var url_metadonnees = 'https://apidae.allier-tourisme.net:8081/getMetadonnees.php' ;

var afficherMetadonnees = function(){

	var table_selector = 'div.content table.recherche-gestion' ;

	var table = jQuery(table_selector) ;
	if ( table.length !== 1 )
	{
		var ask = confirm('Vous devez être sur la page "Mes données". Aller sur la page "Mes données" ?') ;
		if ( ask )
		{
			document.location.href = "/gerer/recherche-avancee/mes-donnees/resultats/" ;
		}
		return false ;
	}

	var ids = [] ;
	table.find('tbody tr[data-itemselector-itemid]').each(function(){
		ids.push(jQuery(this).data('itemselector-itemid')) ;
	}) ;
	console.log(ids) ;

	var ajax = jQuery.ajax({
		url : url_metadonnees,
		data : {ids:ids}
	}) ;

	ajax.done(function(data){

		console.log('done',data) ;

		for ( var i in data['entetes'] )
		{
			table.find('thead tr').append('<th>'+data['entetes'][i]+'</th>') ;
		}

		table.find('tbody tr').each(function(){
			var tr = jQuery(this) ;
			var id = tr.data('itemselector-itemid') ;
			for ( var i in data['entetes'] )
			{
				var td = '<td class="'+data['entetes'][i]+'">' ;
				if (
					typeof data['lignes'][id] !== 'undefined'
					&& typeof data['lignes'][id][data['entetes'][i]] !== 'undefined'
				)
					td += data['lignes'][id][data['entetes'][i]] ;
				td += '</td>' ;
				tr.append(td) ;
			}
		}) ;
		/*
		if ( data.match(/réservé/) )
		{
			var ask = confirm('Nous devons vérifier vos droits pour utiliser cet outil : aller sur la page d\'authorisation ?') ;
			if ( ask )
			{
				window.open('https://apidae.allier-tourisme.net','_blank') ;
				return true ;
			}
			return false ;
		}
		*/

	}) ;

	ajax.fail(function(data){
		console.log('ajax fail') ;
		alert('Une erreur s\'est produite...') ;
		console.log(data) ;
	}) ;

}