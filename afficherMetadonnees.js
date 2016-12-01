console.log('apidaeChromeTools/afficherMetadonnees.js') ;

/*
	Impossible tant qu'on n'aura pas de serveur https.
	La base étant en HTTPS on ne peut autoriser que des requêtes vers des serveurs https.
	On pourrait se servir directement de l'appel de l'API Apidae qui supporte https :
	// https://api.sitra-tourisme.com/api/v002/objet-touristique/get-by-id/89935?apiKey=Xwfkm2HB&projetId=2006&responseFields=@all
	Sauf qu'il faudrait pour ça envoyer un entête Acces-Control-Allow-Origin :
	// No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://base.apidae-tourisme.com' is therefore not allowed access.
*/

var url_metadonnees = 'https://api.sitra-tourisme.com/api/v002/...' ;
var url_metadonnees = 'http://apidae.allier-auvergne-tourisme.com/metadonnees/get.php' ;

var afficherMetadonnees = function(){

	var table = jQuery('div.content table.recherche-gestion') ;
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
	}) ;

	ajax.fail(function(data){
		console.log('Fail',data) ;
		if ( data.statusText == "error" )
		{
			var ask = confirm('Nous devons vérifier vos droits pour utiliser cet outil : aller sur la page d\'authorisation ?') ;
			if ( ask )
			{
				window.open('http://apidae.allier-auvergne-tourisme.com/','_blank') ;
				return true ;
			}
			return false ;
		}
	}) ;

}