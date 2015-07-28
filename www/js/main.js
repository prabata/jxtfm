
$.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false
});


//const
var _audtype="audio/ogg";
var _audcodec="vorbis";
var _xturl="http://xt-fm.com/xtfmtesting";
var _abcurl="https://streaming.radionomy.com/GreenRadioJazz";
//form var
var playpausebut=document.getElementById('playpausebut');
var loadingico=document.getElementById('loadingico');
var logtext=document.getElementById('logtext');
var errortext=document.getElementById('errortext');


/////////////////cordova section////////////////////


document.addEventListener('deviceready', function() {
  
});
  
document.addEventListener("backbutton", function(e){
   if($.mobile.activePage.is('#homepage')){
      e.preventDefault();

   }
   else {
      navigator.app.backHistory()
   }
   killApp();
}, false);



/////////////////plugin section///////////////////////
alertify.set({
        labels : {
          ok     : "OK",
          cancel : "Cancel"
        },
        delay : 2000,
        buttonReverse : false,
        buttonFocus   : "ok"
      });

/////////////debug section/////////////////
function updateLog(text){
//logtext.innerHTML = text;

}
function updateError(text){
//errortext.innerHTML = text;

}


function killApp(){
      try{player.media.pause();}
      catch(err){;}
      navigator.app.backHistory();
      navigator.app.cancelLoadUrl();
      navigator.app.clearCache();
      navigator.app.clearHistory();
      navigator.app.exitApp();
      navigator.app.loadUrl(url, props);
      navigator.app.overrideBackbutton(override);
}



var player={
	isPlaying: false,
   fromPause: false,
   checkInterval:null,
   netInterval:null,
   lastVolume:80,
   media: null,
   mediaTimer: null,
   isExist: true,
   src:_abcurl,

	initMedia: function() {
      

      //$("#loading").attr("display", "block");
      $("#app").attr("class", "blink");
      
      clearInterval(player.checkInterval);
      clearInterval(player.netInterval);
      //player.checkIterval=null;

      player.media = null; 
      //player.media = new Audio(player.src);
      player.media = document.getElementById('myplayer');
      player.media.setAttribute('src', player.src);
      player.media.volume=player.lastVolume/100;
      player.media.play();
      player.isPlaying=true;



      player.checkInterval= setInterval(player.checkstat,500);
      player.netInterval= setInterval(player.checknet,1000);

      //debug
      var isSupp = player.media.canPlayType(_audtype+';codecs="'+_audcodec+'"');
      if(isSupp==="")
         alertify.error("audio codec not supported");
      

            player.media.removeEventListener('error', player.errorListen);
            player.media.removeEventListener('canplay',player.canplayListen);
            player.media.removeEventListener('waiting', player.waitListen);
            player.media.removeEventListener('progress',player.progressListen);

            player.media.removeEventListener('pause',player.pauseListen );
            player.media.removeEventListener('play',player.playListen );
            player.media.removeEventListener('volumechange',player.volchangeListen);


         player.media.addEventListener('canplay',player.canplayListen );
         player.media.addEventListener('error', player.errorListen);
         player.media.addEventListener('waiting',player.waitListen );
         player.media.addEventListener('progress',player.progressListen);

         player.media.addEventListener('pause',player.pauseListen );
         player.media.addEventListener('play',player.playListen);
         player.media.addEventListener('volumechange',player.volchangeListen);
         
    
      },

   reload: function() {
      player.media.load();
      },
/*
   changePlayButton: function() {

         if($("#playpausebut").hasClass('blink'))
            $("#playpausebut").removeClass('blink');
         else   
            $("#playpausebut").addClass('blink');

         if(player.isplaying===true){
            $("#playpausebut").attr("src", "img/play.png");
         }
         else{
            $("#playpausebut").attr("src", "img/pause.png");
         }
         //player.isPlaying = !player.isPlaying;
         //alertify.log(player.isPlaying);

      },
    */
   playPause: function() {

      if (player.media === null) player.initMedia();

      if (player.isPlaying === false)
      {
         player.media.play();
         //player.isPlaying=true;
      }
      else
      {
         player.media.pause();
         //player.isPlaying=false;
      }
      
   },
   mute: function() {
     
      //if (player.media === null)  return;

      if (player.media.muted===true)
      {
         player.media.muted=false;
      }
      else
      {
         player.media.muted=true;
      }
      //player.isMute=!player.isMute;
      
   },
   
   checkstat: function(){
      if (player.media.readyState <= 2) {
         //loadingico.style.display = 'block';
         $("#app").attr("class", "blink");
         //alertify.log("-----");
      }
      else
      {
         //loadingico.style.display = 'none';
         $("#app").attr("class", "");
      }
         
   },
   checknet: function(){
       if (player.media.networkState == 0)        updateLog("network empty");
     if (player.media.networkState == 1)       updateLog("network idle");
      if (player.media.networkState == 2)        updateLog("network loading");
     if (player.media.networkState == 3)        updateLog("network no source");
     

   },
   canplayListen: function(){
      
      player.isExist=true;
      clearInterval(player.checkInterval);
      loadingico.style.display = 'none';
      $("#app").attr("class", "");
      alertify.log("only fly for freedom");
      /*
      $("#playpausebut").attr("src", "img/pause.png");
      $("#mutebut").attr("src", "img/unmute.png");
      $("#playpausebut").attr("display", "block");
      $("#mutebut").attr("display", "block");
      $("#loadingdiv").attr("display", "none");
      */
      playpausebut.style.display = 'block';
      $("#playpausebut").attr("src", "img/pause.png");
      $("#mutebut").attr("display", "block");
      loadingico.style.display = 'none';
      $("#app").attr("class", "");
      
   },
   errorListen: function(){
      //alertify.error("error :"+player.media.error.code);
      if (player.media.error.code== 1)        updateError("media error: aborted");
      if (player.media.error.code == 2)       updateError("media error: network");
      if (player.media.error.code == 3)         updateError("media error: decode");
      if (player.media.error.code == 4)       updateError("media error :src not supported");
        
      clearInterval(player.checkInterval);
      loadingico.style.display = 'none';
       $("#app").attr("class", "");
      alertify.error("we are not streaming now");
      player.isExist=false;
      $("#playpausebut").attr("display", "none");
      $("#mutebut").attr("display", "none");
   },

   waitListen: function(){
      //if(player.isExist===true)
         alertify.log("connecting");
         //loadingico.style.display = 'block';
         $("#app").attr("class", "blink");
   },
   progressListen: function(){
      clearInterval(player.checkInterval);
      player.checkInterval= setInterval(player.checkstat,500);
   },
   pauseListen: function(){

      alertify.log("paused");
      playpausebut.style.display = 'block';
      $("#playpausebut").attr("src", "img/play.png");
      player.isPlaying=false;
      player.fromPause=true;
   },
   playListen: function(){
      clearInterval(player.checkInterval);

      player.isPlaying=true;
      if(player.fromPause===true){
         player.fromPause=false;
         alertify.log("playing");
      }
      else{
         player.media.volume=player.lastVolume/100;
      }
      playpausebut.style.display = 'block';
      $("#playpausebut").attr("src", "img/play.png");
   },
   volchangeListen: function(){

      if(player.media.muted===true)
      {
         //alertify.log("mute");
         $("#mutebut").attr("src", "img/mute.png");
      }
      else
      {
          //alertify.log("unmute");
         $("#mutebut").attr("src", "img/unmute.png");

      }
   },
   setVolume: function(myVolume) {
       player.media.volume = myVolume;
   }


}

$("#volume").slider({
      min: 0,
      max: 100,
      value: player.lastVolume,
      range: "min",
      animate: true,
      orientation: "horizontal",
      slide: function(event, ui) {
      try{
         player.lastVolume=ui.value;
         player.setVolume((ui.value) / 100);
      }
      catch(err)
      {
         player.lastVolume=ui.value;

      }
    }
});

$(".nano").nanoScroller();

   
/////////////initial section/////////////////// 
   
//player.src=_xturl;
//player.initMedia();
