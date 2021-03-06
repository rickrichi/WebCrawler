"use strict"
var DCV=DCV||{version:"v0.2.12c"};
DCV.init=function(){
	DCV.current=0;
	DCV.currentVideo=0;
	DCV.firstPlay=true;
	DCV.mutes = {};
	DCV.c = {};
	DCV.firstUnmute=false;
	Enabler.loadModule(studio.module.ModuleId.RAD_VIDEO,function(){
		DCV.component=[];
		DCV.setVideoVars();
		DCV.buildVideos();		
		if(DC.config.video.customControls)DCV.buildControls();
		DC.dispatchEvent(DC.events.LIB_READY,{lib:"video",o:DCV,v:DCV.version});
		DC.debug("[video] "+DCV.version);
	});
}
DCV.buildVideos=function(){
	for(var i=0;i<DC.config.video.containers.length;i++){
		if(DCV.c[DC.config.video.containers[ i ]]) continue;
		DCV.c[DC.config.video.containers[ i ]] = true;
		var c=DC.config.video.controls[i];
		var comp=new studio.sdk.rad.Video({
			id:'video'+(parseInt(i+1)),
			autoplay:DC.isMobile||i>0 ? false : DC.config.video.autoplay||false, 
			controls:c,
			sources:DC.config.video.autoplay||DC.isiOS ? DC.config.video.sources[i] : "",
			muted:DC.config.video.muted ? DC.config.video.muted[i] : false,
			width:DC.config.video.size[i] ? DC.config.video.size[i].width : DC.config.video.size[0].width,
			height:DC.config.video.size[i] ? DC.config.video.size[i].height : DC.config.video.size[0].height
		});
		comp.setElement(document.getElementById(DC.config.video.containers[i]));
		DCV.component[i]=comp.getVideoElement();
		DC.videoWrapper=document.getElementById(DC.config.video.containers[i]||DC.config.video.containers[0]).parentNode;
		if(!c)DCV.component[i].removeAttribute("controls");
		// DCV.setSize(0);
		DCV.setVideoEvents(DCV.component[i]);
	}
}
DCV.buildControls=function(){
	for(var i=0;i<DC.config.video.containers.length;i++){
		if(DCV.c[DC.config.video.containers[ i ]]) continue;
		var p=document.getElementById(DC.config.video.containers[i]).parentNode;
		var playBtn=p.querySelector('.'+DC.config.video.customControls.play);
		var muteBtn=p.querySelector('.'+DC.config.video.customControls.mute);
		playBtn.addEventListener('click', function(e){
			if(e.target.classList.contains('pause')){
				DCV.component[ DCV.current ].pause();
			}else{
				DCV.component[ DCV.current ].play();
			}
		});
		if(DC.isiOS) muteBtn.classList.add('hide');
		DCV.component[DCV.current].muted=DC.config.video.muted[DCV.currentVideo];
		if(DC.config.video.customControls&&DC.config.video.muted[DCV.currentVideo]==false){
			var btn=p.parentNode.querySelector('.'+DC.config.video.customControls.mute);
			btn.classList.add('unmute');
		}
		muteBtn.addEventListener('click',function(e){
			var v=e.target.parentNode.parentNode.querySelector('video');
			if(v.muted){
				v.muted=false;
				if(!DCV.firstUnmute){
					DCV.firstUnmute=true;
					DC.dispatchEvent(DC.events.VideoEvents.UNMUTE);
				}
			}else{
				v.muted=true;
			}
		});
	}
}

DC.muteVideo = function() {
	DCV.component[ DCV.current ].muted=true;
	DCV.mutes[DCV.current] = false;
}

DC.unMuteVideo = function() {
	DCV.component[ DCV.current ].muted=false;
	DCV.mutes[DCV.current] = false;
}

DCV.setSources=function(i){
	i=DC.config.video.sources[i] ? i : 0;
	var sources=DCV.component[DCV.current].querySelectorAll('source');
	var title=DC.config.video.sources[i][0].split('/').pop().split('.')[0];
	var classList=DC.videoWrapper.className.split(' ');
	for(var t=0; t<classList.length;t++){
		if(classList[t].indexOf('dcv_')>-1){
			DC.videoWrapper.classList.remove(classList[t]);
		}
	}
	DC.videoWrapper.classList.add("dcv_"+title);
	for(var t=0;t<sources.length;t++){
		sources[t].src=Enabler.getUrl(DC.config.video.sources[i][t]);
	}
	if(!sources.length) DCV.component[DCV.current].src=Enabler.getUrl(DC.config.video.sources[i][0]);
}
DCV.checkAudio=function(e){
	if(typeof e.target.webkitAudioDecodedByteCount !== "undefined"){
		if(e.target.webkitAudioDecodedByteCount>0)
		  DC.videoWrapper.querySelector('.'+DC.config.video.customControls.mute).classList.remove('hide');
		else
		  DC.videoWrapper.querySelector('.'+DC.config.video.customControls.mute).classList.add('hide');
	}
	else if(typeof e.target.mozHasAudio!=="undefined"){
		if(e.target.mozHasAudio)
		  DC.videoWrapper.querySelector('.'+DC.config.video.customControls.mute).classList.remove('hide');
		else
		  DC.videoWrapper.querySelector('.'+DC.config.video.customControls.mute).classList.add('hide');
	}
}
DCV.close=function(i){
	DC.hideVideo();
	DC.dispatchEvent(DC.events.VideoEvents.CLOSE,{target:DC.videoWrapper});
}
DCV.onVideoPlay=function(e){
	DC.dispatchEvent(DC.events.VideoEvents.PLAY,{target:DC.videoWrapper,index:DCV.currentVideo});
	DC.dispatchEvent('playing', {target:DC.videoWrapper});
	DC.videoWrapper.classList.remove( 'hide' );
	DCV.startTimer();
	if(DCV.videoClick) DCV.videoClick.classList.remove('hide');
	if(DC.config.video.customControls){
		var pr = DC.videoWrapper;
		var p = pr.querySelector( '.'+DC.config.video.customControls.play );
		p.classList.add('pause');
	}
	if(DCV.firstPlay && !DC.isMobile)DCV.firstPlay = false;
}
DCV.onVideoPause=function(e){
	if(DC.config.video.customControls){
		var pr=e.target.parentNode.parentNode;
		var p=pr.querySelector('.'+DC.config.video.customControls.play);
		p.classList.remove('pause');
		DC.dispatchEvent('pause', {target:DC.videoWrapper});
	}
}
DCV.onVolumeChange=function(e){
	if(!e.target.parentNode)return;
	var btn=e.target.parentNode.parentNode.querySelector('.'+DC.config.video.customControls.mute);
	if(e.target.muted){
		btn.classList.remove('unmute');
	}else{
		btn.classList.add('unmute');
	}
}


DCV.onVideoClick=function(){
	DC.dispatchEvent(DC.events.VideoEvents.CLICK,{target:DC.videoWrapper});
}
DCV.setVideoVars=function(){
	DC.videoWrapper=document.querySelector('.introWrapper')||document.querySelector('#introWrapper'); //changed
	for(var i=0;i<DC.config.video.containers.length;i++){
		if(DCV.c[DC.config.video.containers[ i ]]) continue;
		var p=document.getElementById(DC.config.video.containers[i]).parentNode;
		var c=p.querySelector('.videoClick')||p.querySelector('#videoClick');
		if(c) c.addEventListener( 'click', DCV.onVideoClick );
	}
}
DCV.stopTimer=function(){
	clearInterval(DCV.timer);
}
DCV.startTimer=function(){
	clearInterval(DCV.timer);
	DCV.timer=setInterval(DCV.timeStep,100);
	DCV.timeStep();
}
DCV.timeStep=function(){
	DC.dispatchEvent(DC.events.VideoEvents.TIMER,{currentTime:DCV.component[DCV.current].currentTime,duration:DCV.component[DCV.current].duration,target:DC.videoWrapper});
}
DCV.setVideoEvents=function(c){
 	c.addEventListener('ended',DCV.videoEnded);
 	c.addEventListener('play',DCV.onVideoPlay);
 	c.addEventListener('pause',DCV.onVideoPause);
 	c.addEventListener('volumechange',DCV.onVolumeChange);
 	c.addEventListener('loadeddata',DCV.checkAudio);
 	if(DC.isMobile){
		c.addEventListener('webkitendfullscreen',DCV.onPlayerExitFullscreen,false);
		document.addEventListener("fullscreenchange",DCV.fullscreenchangeHandler);      
		document.addEventListener("webkitfullscreenchange",DCV.fullscreenchangeHandler);      
 	}
}
DCV.fullscreenchangeHandler=function(c){
	var isFullScreen=document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen;
	if(!isFullScreen) DCV.onPlayerExitFullscreen();
}
DCV.onPlayerExitFullscreen=function(){
	DC.dispatchEvent('exit_fullscreen');
}
DCV.videoEnded=function(){
	if(DC.config.video.hideOnComplete[DCV.currentVideo]) DC.hideVideo();
	DCV.stopTimer();
	DC.dispatchEvent(DC.events.VideoEvents.COMPLETE,{target:DC.videoWrapper});
}
DCV.enterFullscreen=function(e){
	if(e.requestFullscreen){e.requestFullscreen();}else if(e.mozRequestFullScreen){e.mozRequestFullScreen();}else if(e.webkitRequestFullscreen){e.webkitRequestFullscreen();}else if(e.msRequestFullscreen){e.msRequestFullscreen();}
}
DCV.exitFullScreen=function(){
	if(document.exitFullscreen){document.exitFullscreen();}else if(document.mozCancelFullScreen){document.mozCancelFullScreen();}else if(document.webkitExitFullscreen){document.webkitExitFullscreen();}
}
DCV.setSize=function(i){
	i=DC.config.video.size[i] ? i : DC.config.video.size.length-1;
	var container=DC.videoWrapper.querySelector('.'+DC.config.video.containers[i])||DC.videoWrapper.querySelector('#'+DC.config.video.containers[i]);
	container.style.width=DC.config.video.size[i].width+"px";
	container.style.height=DC.config.video.size[i].height+"px";
	DCV.component[ DCV.current ].style.left = "0px";
	DCV.component[ DCV.current ].style.top = "0px";
	DCV.component[ DCV.current ].style.position = "absolute";
	DCV.component[ DCV.current ].style.width=DC.config.video.size[i].width+"px";
	DCV.component[ DCV.current ].style.height=DC.config.video.size[i].height+"px";
	//DC.videoWrapper.style.width=DC.config.video.size[i].width+"px";
	//DC.videoWrapper.style.height=DC.config.video.size[i].height+"px";
}
DC.videoDuration = function(i) {
	return DCV.component[DCV.current].duration;
}
DC.playVideo=function(i){
	DCV.currentVideo=DC.config.video.sources.length==1 ? 0 : (i||0);
	DCV.firstUnmute=true;
	var last = DCV.component.length-1
	if(typeof(DCV.current) != 'undefined' ) DCV.component[DCV.current].pause();
	var i = i >=0 ? i : last;
	var cpt = DCV.component[ i ] || DCV.component[ last ];
	DC.videoWrapper=document.getElementById(DC.config.video.containers[i]||DC.config.video.containers[last]).parentNode;
	DC.videoWrapper.classList.remove('hide');
	DCV.current = DCV.component[i] ? i : last;
	if(DC.config.video.fullscreen[typeof DC.config.video.fullscreen[i] == "undefined" ? 0 : i]) DCV.enterFullscreen(DCV.component[DCV.current]);
	DCV.setSources(DCV.currentVideo);
	DCV.setSize(i);
	DCV.component[ DCV.current ].load();
	DCV.component[ DCV.current ].play();
}

DC.resumeVideo = function(i) {
	if(i >= 0) {
		DCV.startTimer();
		DCV.current = DCV.component[ i ] ? i : 0;
		DCV.component[ i ].play();
		DC.videoWrapper = document.getElementById( DC.config.video.containers[ i ] || DC.config.video.containers[ DCV.component.length-1 ] ).parentNode;
	}
}

DC.pauseVideo = function(i) {
	DCV.stopTimer();
	if(i>=0) {
		DCV.component[ i ].pause();
	} else {
		DCV.component[ DCV.current ].pause();
	}
}

DC.hideVideo=function(){
	DC.videoWrapper.classList.add('hide');
	DCV.component[DCV.current].pause();
	DCV.stopTimer();
	DCV.exitFullScreen();
	DC.dispatchEvent(DC.events.VideoEvents.HIDE,{target:DC.videoWrapper});
}
DC.stopVideo=function(){
	DCV.component[DCV.current].pause();
	DCV.component[DCV.current].currentTime=0;
	DCV.stopTimer();
}

DC.seekVideo = function(t, i) {
	DCV.component[ i || DCV.current ].currentTime = t;
}

DC.isPlaying=function(){
	return !DCV.component[DCV.current].paused;
}
DCV.init();