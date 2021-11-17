console.log('apidaeChromeTools/contentscript.js');

/* On ajoute tous les scripts en les injectant */
var scripts_injectes = [
	"elementReferenceToTable.js", "metadonnees.js", "desactiveElementsZero.js", "afficherMetadonnees.js",
	"afficherDonneesPrivees.js", "afficherOptionValue.js", "signedInAs.js"
];
var css_injectes = ["custom.css"];

for (var i in scripts_injectes) {

	var s = document.createElement('script');
	s.src = chrome.extension.getURL(scripts_injectes[i]);
	s.onload = function () {
		this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
}

for (var i in css_injectes) {
	var link = document.createElement("link");
	link.href = chrome.extension.getURL(css_injectes[i]);
	link.type = "text/css";
	link.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(link);
}

/* 
	On a ajouté les scripts directement dans la page.
	Maintenant pour appeler une fonction contenue dans ces scripts à partir du popup de l'extension, il va falloir que la page "écoute" les événements déclenchés par les clics sur le popup.
*/

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
	/*
	console.log(request) ;
	console.log(sender) ;
	console.log(sendResponse) ;
	*/

	var action = request.action;
	var type = request.type;

	var injectedCode = action + '()';
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('(' + injectedCode + ')();'));
	(document.body || document.head || document.documentElement).appendChild(script);


	sendResponse({ "reponse": "ok" });
});
