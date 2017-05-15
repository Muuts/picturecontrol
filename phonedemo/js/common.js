$(function(){

			//控制等比缩放
			function set_viewport(){
			  var viewportmeta = document.querySelector('meta[name="viewport"]');
			  if (viewportmeta) {
				viewportmeta.content = 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui';
				m_width = 720;
				initial_scale = $(window).width()/m_width;
				viewportmeta.content = 'width='+m_width+', minimum-scale='+initial_scale+', maximum-scale='+initial_scale+', initial-scale='+initial_scale;
			  }
			}
			set_viewport();
			window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(){
				set_viewport();	
			}, false); 
	
});
	