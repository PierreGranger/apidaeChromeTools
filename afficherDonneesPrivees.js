console.log('apidaeChromeTools/afficherDonneesPrivees.js') ;

var url_DonneesPrivees = 'https://apidae.allier-tourisme.net:8081/getDonneesPrivees.php' ;

var afficherDonneesPrivees = function(){

	var table_selector = 'div.content table.recherche-gestion' ;

	var table = jQuery(table_selector) ;

	if ( table.length !== 1 )
	{
		var table = jQuery('body.administrer.champ-prive div.content table.table') ;
	}

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

	if ( table.find('tbody tr[data-itemselector-itemid]').length > 0 )
	{
		table.find('tbody tr[data-itemselector-itemid]').each(function(){
			ids.push(jQuery(this).data('itemselector-itemid')) ;
		}) ;
		console.log(ids) ;
	}

	if ( ids.length == 0 )
	{
		table.find('tbody tr span.label-mes-objets').each(function(){
			ids.push(jQuery(this).text()) ;
		}) ;
		console.log(ids) ;
	}

	var ajax = jQuery.ajax({
		url : url_DonneesPrivees,
		data : {ids:ids}
	}) ;

	ajax.done(function(data){

		console.log('done',data) ;
		console.log('typeof data',typeof data) ;

		for ( var i in data['entetes'] )
		{
			table.find('thead tr').append('<th>'+data['entetes'][i]+'</th>') ;
		}

		table.find('tbody tr').each(function(){
			var tr = jQuery(this) ;
			var id = null ;
			if ( tr.data('itemselector-itemid') ) id = tr.data('itemselector-itemid') ;
			else id = tr.find('span.label-mes-objets').text() ;

			for ( var i in data['entetes'] )
			{
				var td = '<td>' ;
				if (
					typeof data['lignes'][id] !== 'undefined'
					&& typeof data['lignes'][id][data['entetes'][i]] !== 'undefined'
				)
				{
					if ( data['entetes'][i] == 'index_gvl' )
					{
						var echo = '' ;
						console.log('typeof data[lignes][id][data[entetes][i]]',typeof data['lignes'][id][data['entetes'][i]]) ;
						if ( typeof data['lignes'][id][data['entetes'][i]] != 'undefined' && data['lignes'][id][data['entetes'][i]] != null )
						{
							var temp = data['lignes'][id][data['entetes'][i]].split(',') ;
							for ( var i in temp ) echo += '<span class="label label-default">'+temp[i].trim()+'</span> ' ;
						}
						
						td += echo ;
					}
					else
						td += '<span class="label label-success">'+data['lignes'][id][data['entetes'][i]]+'</span> ' ;
				}
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
		console.log(url_DonneesPrivees) ;
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