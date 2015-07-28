
//constant
var requestBox='<textarea id="requestbox" tabindex="1" rows="4" cols="20" maxlength="144" required></textarea>'


var xt={
	time:0,
	tryRequest: function(){
		//alertify.log("test2");
		
			alertify.confirm(requestBox, function (e) {
				
	
						if (e) {//ok
							alertify.log($('#requestbox').val());
							
							// user clicked "ok"
						} else {
							
						}
					});
		
	},
	tryTwitter: function(){
        	var nanomsgstart='<div id="twit" class="nano"><div class="nano-content">';
			var nanomsgend="</div></div>";
			$.get("twit.html?test=5", function(msg) {
				//var msg=data.replace(/\n/g,"</br>");
						
				var msgalert=nanomsgstart+msg+nanomsgend;
				alertify.alert(msgalert);
				$(".nano").nanoScroller({ scroll: 'bottom' });
				!function(d,s,id){
				var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
					//if(!d.getElementById(id))
					{
						js=d.createElement(s);
						js.id=id;
						//js.src=p+"://platform.twitter.com/widgets.js";
						js.src="js/widgets.js";
						fjs.parentNode.insertBefore(js,fjs);
								
					}
				}(document,"script","twitter-wjs");
			});

       
	},

	tryFb: function(){
		//$.get( "fb.html?test=3",function(data) {
        //	var nanomsgstart='<div id="fb" class="nano"><div class="nano-content">';
		//	var nanomsgend="</div></div>";
						
		//	var msgalert=nanomsgstart+data+nanomsgend;
		//	alertify.alert(msgalert);
		//	$(".nano").nanoScroller({ scroll: 'bottom' }); 

        //});

		$.get( "fb.html?test=3",function(data) {
           	var nanomsgstart='<div id="fb" class="nano"><div class="nano-content">';
			var nanomsgend="</div></div>";
				
			var msgalert=nanomsgstart+data+nanomsgend;
			alertify.alert(msgalert);
			$(".nano").nanoScroller({ scroll: 'bottom' }); 

						
			!function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				//if (d.getElementById(id)) return;
				js = d.createElement(s);
				js.id = id;
				js.src = "//connect.facebook.net/id_ID/sdk.js#xfbml=1&appId=1529227303994091&version=v2.0";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk');
         });
	



	},

	tryCredit: function(){
		$.get( "credit.html?test=3",function(data) {
        	var nanomsgstart='<div id="credit" class="nano"><div class="nano-content">';
			var nanomsgend="</div></div>";
						
			var msgalert=nanomsgstart+data+nanomsgend;
			alertify.alert(msgalert);
			$(".nano").nanoScroller({ scroll: 'bottom' }); 

        });
	},

	jadwalacara: function(){
		$.get( "http://xt-fm.com/jadwalacara",function(data) {
        	var nanomsgstart='<div id="jadwalacara" class="nano"><div class="nano-content">';
			var nanomsgend="</div></div>";
						
			var msgalert=nanomsgstart+data+nanomsgend;
			alertify.alert(msgalert);
			$(".nano").nanoScroller({ scroll: 'bottom' }); 

        });

	}
};

