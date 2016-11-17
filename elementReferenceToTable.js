console.log('apidaeChromeTools/elementReferenceToTable.js') ;

var elementReferenceToTable = function(){
	
	var retour = '<table id="resume" cellpadding="2">'+"\n" ;
	var retour_csv = '' ;
	
	var rub = null ;
	var identifiant = null ;
	var par = null ;
	var nom_principal = null ;
	var famille = null ;
	var ordre = null ;
	
	rub = jQuery('h1').find('span').last().text().trim() ;
	
	var bloc_ig = jQuery('.fiche-bloc').first() ;
	bloc_ig.find('dl').each(function(){
		var cle = jQuery(this).find('dt').text().trim() ;
		var val = jQuery(this).find('dd').text().trim() ;
		
		if ( cle == 'Identifiant' ) identifiant = val ;
		if ( cle == 'Nom' ) nom_principal = jQuery(this).find('div.traduction-libelle.fr').text().trim() ;
		if ( cle == 'Parent' ) par = val ;
		if ( cle == 'Famille' ) famille = val ;
		if ( cle == 'Ordre' ) ordre = val ;
		
	}) ;
	
	jQuery('div.fiche-contenu table.table-criteres-interdits').each(function() {
		var tableau = jQuery(this).find('thead th').text().trim() ;
		tableau = tableau.replace(/\r?\n|\r/g, " ");
		tableau = tableau.trim() ;
		jQuery(this).find('tbody tr').each(function(){

			var td = jQuery(this).find('td.nom').clone() ;

			var isChild = jQuery(this).hasClass('element-reference-child') ;

			var compteur = jQuery(this).find('a.compteur span').text().trim() ;

			var lien = td.find('a.pull-right').attr('href') ;

			td.find('a').remove() ;

			var nom = td.text().trim() ;
			
			var id = "" ;
			id = /[0-9]+/g.exec(lien) ;
			if ( Array.isArray(id) )
			{
				id = id[0].replace(/\//g,'') ;
			}

			//var c1 = '' ;
			var c2 = '' ;

			if ( isChild ) c2 = nom ; else c1 = nom ;

			retour_csv += rub + "\t" ;
			retour_csv += famille + "\t" ;
			retour_csv += par + "\t" ;
			retour_csv += identifiant + "\t" ;
			retour_csv += nom_principal + "\t" ;
			retour_csv += ordre + "\t" ;
			
			retour += "\t"+'<tr>' ;
			retour += '<th>'+tableau+'</th>' ; retour_csv += tableau + "\t" ;
			retour += '<th>'+id+'</th>' ; retour_csv += id + "\t" ;
			retour += '<td>'+c1+'</td>' ; retour_csv += c1 + "\t" ;
			retour += '<td>'+c2+'</td>' ; retour_csv += c2 + "\t" ;
			retour += '<td>'+compteur+'</td>' ; retour_csv += compteur + "\t" ;
			retour += '<td><a href="https://base.apidae-tourisme.com/administrer/referentiel/element-reference/'+id+'">Lien</a></td>' ; retour_csv += 'https://base.apidae-tourisme.com/administrer/referentiel/element-reference/'+id + "\t" ;
			retour += '</tr>'+"\n" ; retour_csv += "\n" ;
		})
	} ) ;

	retour += '</table>' ;

	jQuery('body > div > div.main-content.clearfix > div.content').find('table#resume').remove() ;
	jQuery('body > div > div.main-content.clearfix > div.content').find('textarea#resume_csv').remove() ;
	jQuery('body > div > div.main-content.clearfix > div.content').prepend(retour) ;
	jQuery('body > div > div.main-content.clearfix > div.content').prepend('<textarea id="resume_csv">'+retour_csv+'</textarea>') ;

	copyToClipboard(document.getElementById('#resume_csv')) ;
	
}


	function copyToClipboard(elem) {
		  // create hidden text element, if it doesn't already exist
		var targetId = "_hiddenCopyText_";
		var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
		var origSelectionStart, origSelectionEnd;
		if (isInput) {
			// can just use the original source element for the selection and copy
			target = elem;
			origSelectionStart = elem.selectionStart;
			origSelectionEnd = elem.selectionEnd;
		} else {
			// must use a temporary form element for the selection and copy
			target = document.getElementById(targetId);
			if (!target) {
				var target = document.createElement("textarea");
				target.style.position = "absolute";
				target.style.left = "-9999px";
				target.style.top = "0";
				target.id = targetId;
				document.body.appendChild(target);
			}
			target.textContent = elem.textContent;
		}
		// select the content
		var currentFocus = document.activeElement;
		target.focus();
		target.setSelectionRange(0, target.value.length);
		
		// copy the selection
		var succeed;
		try {
			  succeed = document.execCommand("copy");
		} catch(e) {
			succeed = false;
		}
		// restore original focus
		if (currentFocus && typeof currentFocus.focus === "function") {
			currentFocus.focus();
		}
		
		if (isInput) {
			// restore prior selection
			elem.setSelectionRange(origSelectionStart, origSelectionEnd);
		} else {
			// clear temporary content
			target.textContent = "";
		}
		return succeed;
	}
