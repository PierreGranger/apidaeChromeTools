console.log('apidaeChromeTools/afficherMetadonnees.js') ;

var url_metadonnees = 'https://www.allier-auvergne-tourisme.com/apidaeChromeTools/getMetadonnees.php' ;

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
		
	}) ;

	ajax.fail(function(data){
		console.log('ajax fail') ;
		console.log(url_metadonnees) ;
		console.log(data) ;
		var c = confirm('Une erreur s\'est produite... Impossible d\'accéder à la liste des métadonnées : voulez-vous essayer de consulter cette page pour voir l\'erreur ?') ;
		if ( c )
		{
			window.open(this.url) ;
		}
		else
		{
			return false ;
		}
	}) ;

}