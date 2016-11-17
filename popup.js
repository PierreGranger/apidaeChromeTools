console.log('apidaeChromeTools/popup.js') ;

document.addEventListener('DOMContentLoaded', function () {
	
	var as = document.querySelectorAll('a');
	for (var i = 0; i < as.length; i++) {
		as[i].addEventListener('click', function(e){
			console.log(this);
			console.log(e) ;
			chrome.tabs.executeScript( null, { code:this.getAttribute("data-action")+"();" } );
		});
	}
});

