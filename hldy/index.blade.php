<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>欢乐钓鱼</title>
    <meta name="flexible" content="initial-dpr=2,maximum-dpr=3" />
    <script>
      !function(a,b){function c(){var b=f.getBoundingClientRect().width;b/i>540&&(b=540*i);var c=b/10;f.style.fontSize=c+"px",k.rem=a.rem=c}var d,e=a.document,f=e.documentElement,g=e.querySelector('meta[name="viewport"]'),h=e.querySelector('meta[name="flexible"]'),i=0,j=0,k=b.flexible||(b.flexible={});if(g){console.warn("将根据已有的meta标签来设置缩放比例");var l=g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);l&&(j=parseFloat(l[1]),i=parseInt(1/j))}else if(h){var m=h.getAttribute("content");if(m){var n=m.match(/initial\-dpr=([\d\.]+)/),o=m.match(/maximum\-dpr=([\d\.]+)/);n&&(i=parseFloat(n[1]),j=parseFloat((1/i).toFixed(2))),o&&(i=parseFloat(o[1]),j=parseFloat((1/i).toFixed(2)))}}if(!i&&!j){var p=(a.navigator.appVersion.match(/android/gi),a.navigator.appVersion.match(/iphone/gi)),q=a.devicePixelRatio;i=p?q>=3&&(!i||i>=3)?3:q>=2&&(!i||i>=2)?2:1:1,j=1/i}if(f.setAttribute("data-dpr",i),!g)if(g=e.createElement("meta"),g.setAttribute("name","viewport"),g.setAttribute("content","initial-scale="+j+", maximum-scale="+j+", minimum-scale="+j+", user-scalable=no"),f.firstElementChild)f.firstElementChild.appendChild(g);else{var r=e.createElement("div");r.appendChild(g),e.write(r.innerHTML)}a.addEventListener("resize",function(){clearTimeout(d),d=setTimeout(c,300)},!1),a.addEventListener("pageshow",function(a){a.persisted&&(clearTimeout(d),d=setTimeout(c,300))},!1),"complete"===e.readyState?e.body.style.fontSize=12*i+"px":e.addEventListener("DOMContentLoaded",function(){e.body.style.fontSize=12*i+"px"},!1),c(),k.dpr=a.dpr=i,k.refreshRem=c,k.rem2px=function(a){var b=parseFloat(a)*this.rem;return"string"==typeof a&&a.match(/rem$/)&&(b+="px"),b},k.px2rem=function(a){var b=parseFloat(a)/this.rem;return"string"==typeof a&&a.match(/px$/)&&(b+="rem"),b}}(window,window.lib||(window.lib={}));
    </script>
    <script src="/hldy/static/js/sound.js?v=102"></script>
    <script>
      var soundID = "Thunder";
      var token = '{{ csrf_token() }}';
      function loadSound () {
        createjs.Sound.registerSound("/hldy/static/img/coin_music.wav", soundID);
      }
    </script>
  <link href="/hldy/static/css/app.css?v=85" rel="stylesheet"></head>
  <body onload="loadSound();">
    <img src="/hldy/static/img/logo.png" style="display:none;" alt="">
    <div class="loading-page">
      <div class="loading-bg">
        <p></p>   
      </div>     
    </div>
    <div id="app"></div>
    <div style="display:none;">
      <img src="/hldy/static/img/yu-5-3.png" >
      <img src="/hldy/static/img/baoxiang.png" >            
      <img src="/hldy/static/img/chugan.png" >              
      <img src="/hldy/static/img/num-6.png" >               
      <img src="/hldy/static/img/yu-2-2.png" >              
      <img src="/hldy/static/img/yu-6-2.png" >              
      <img src="/hldy/static/img/yu-8-3.png" >
      <img src="/hldy/static/img/bg-2.png" >
      <img src="/hldy/static/img/dialog-box.png" >          
      <img src="/hldy/static/img/num-8.png" >              
      <img src="/hldy/static/img/yu-3.png" >                
      <img src="/hldy/static/img/yu-6-3.png" >              
      <img src="/hldy/static/img/yu-8.png" >
      <img src="/hldy/static/img/bg.png" >                  
      <img src="/hldy/static/img/guanxian-1.png" >          
      <img src="/hldy/static/img/num-9.png" >               
      <img src="/hldy/static/img/yu-4-2.png" >              
      <img src="/hldy/static/img/yu-6.png" >
      <img src="/hldy/static/img/bizhikuang.png" >          
      <img src="/hldy/static/img/loading-bg.png" >          
      <img src="/hldy/static/img/rule-butn.png" >          
      <img src="/hldy/static/img/yu-4.png" >                
      <img src="/hldy/static/img/yu-7-2.png" >
      <img src="/hldy/static/img/butn-rule-home.png" >      
      <img src="/hldy/static/img/muban.png" >               
      <img src="/hldy/static/img/rule.jpg" >                
      <img src="/hldy/static/img/yu-5-2.png" >              
      <img src="/hldy/static/img/yu-7-3.png" >
      <img src="/hldy/static/img/butn-tuoguan.png" >        
      <img src="/hldy/static/img/num-0.png" >               
      <img src="/hldy/static/img/tuoguan.png" >             
      <img src="/hldy/static/img/yu-5-3.png" >              
      <img src="/hldy/static/img/yu-7.png" >
      <img src="/hldy/static/img/chugan-bg.png" >           
      <img src="/hldy/static/img/num-3.png" >               
      <img src="/hldy/static/img/yu-1-2.png" >              
      <img src="/hldy/static/img/yu-5.png" >                
      <img src="/hldy/static/img/yu-8-2.png" >
    </div>
    <!-- built files will be auto injected -->
  <script type="text/javascript" src="/caishen/js/zepto.min.js?v=111"></script>
  <script type="text/javascript" src="/caishen/js/caishen.js?v=129"></script>
  <script type="text/javascript" src="/hldy/static/js/vendor.js?v=136"></script>
  <script type="text/javascript" src="/hldy/static/js/app.js?v=136"></script>
  @if (strpos(\Jenssegers\Agent\Facades\Agent::getUserAgent(), 'MicroMessenger') !== false) {
  <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"></script>
  <script type="text/javascript">
      wx.config(<?php echo app('wechat')->js->config(array('onMenuShareTimeline', 'onMenuShareAppMessage')) ?>);
      wx.ready(function () {
          wx.onMenuShareTimeline({
              link: 'http://ga.cloudxt.cn/hldy/page',
              imgUrl: 'http://ga.cloudxt.cn/hldy/static/img/logo.png'
          });
          wx.onMenuShareAppMessage({
              desc: '新春钓鱼，欢乐多多',
              link: 'http://ga.cloudxt.cn/hldy/page/',
              imgUrl: 'http://ga.cloudxt.cn/hldy/static/img/logo.png'
          });
      });
  </script>
  @endif
  
  </body>
</html>
