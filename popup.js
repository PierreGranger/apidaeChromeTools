console.log('apidaeChromeTools/popup.js') ;

jQuery(document).on('click','li a',function(){
	
	var type = jQuery(this).data("type") ;
	var action = jQuery(this).data("action") ;
	
	console.log('click on '+action+' / '+type) ;
	
	chrome.tabs.getSelected(null,function(tab){
		
		chrome.tabs.sendRequest(tab.id,{action:action,type:type},function(response) {
			// Cette fonction est appelée une fois que la page a "répondu" au popup.
			// Par exemple pour dire au popup : "ok l'action dans la page est bien terminée".
			console.log(response) ;
		}) ;
		
	}) ;
	
}) ;

/*
document.addEventListener('DOMContentLoaded', function () {
	
	var as = document.querySelectorAll('a');
	for (var i = 0; i < as.length; i++) {
		as[i].addEventListener('click', function(e){
			console.log(this);
			console.log(e) ;
			
			var type = this.getAttribute("data-type") ;
			var action = this.getAttribute("data-action") ;
			
			console.log('click action="'+action+'" & type="'+type+'"') ;
			
			if ( type == 'background' || type == 'injected' )
			{
				chrome.tabs.executeScript( null, {
						'file':action+'.js'
					},
					function(){
						console.log('loading '+action) ;
					}
				);
			}
			else
			{
				chrome.tabs.executeScript( null, { code:action+"();" } );
			}
			
		});
	}
});
*/