var screenshot={runCallback:!1,keepIt:!1,scroll:!1,cropData:null,retries:0,showScrollBar:!1,disableHeaderAndFooter:!1,processFixedElements:!1,screenShotParams:null,screens:[],thisTab:null,thisTabId:null,thisTabTitle:"",url:"",title:"",canvas:null,canvasToDataURL:"",captureVisible:function(){$.extend(screenshot,{callback:null,runCallback:!1,keepIt:!1,scroll:!1,cropData:null,retries:0,showScrollBar:!0,disableHeaderAndFooter:!1,processFixedElements:!1}),screenshot.load(screenshot.addScreen)},captureAll:function(a){$.extend(screenshot,{callback:null,runCallback:!1,keepIt:!1,scroll:!0,cropData:null,retries:0,showScrollBar:!1,disableHeaderAndFooter:!1,processFixedElements:!0},a),screenshot.load(screenshot.addScreen)},tryGetUrl:function(a){screenshot.description="",chrome.tabs.query({active:!0,currentWindow:!0},function(b){const c=b[0];screenshot.thisTab=c,screenshot.thisTabId=c.id,screenshot.thisTabTitle=c.title,screenshot.url=c.url,screenshot.title=c.title,screenshot.thisWindowId=c.windowId,a(screenshot.url)})},load:function(a){screenshot.tryGetUrl(function(){var b=a;screenshot.screens=[],screenshot.description="",api.callPopup({type:"working"}),a=function(){window.setTimeout(b,1e3*(parseInt(localStorage.delay,10)||0))},localStorage.captureCount||(localStorage.captureCount=0),a()})},addScreen:function(a){api.stop||(screenshot.retries++,chrome.tabs.sendMessage(screenshot.thisTabId,$.extend({cropData:screenshot.cropData,type:"takeCapture",start:!0,scroll:screenshot.scroll,showScrollBar:screenshot.showScrollBar,processFixedElements:screenshot.processFixedElements},a),screenshot.ans))},ans:function(a){if(!api.stop){if(!a&&chrome.runtime.lastError){if(1<screenshot.retries&&screenshot.scroll)return void api.callPopup({type:"message",message:"Sorry, we can not take a full screenshot of this webpage. This might be because it is not fully loaded. Please report this issue."});if(1<screenshot.retries)a={left:0,top:0,finish:!0};else return void screenshot.addScreen()}null===a.top&&(a.top=0,a.left=0);var b=function(b){chrome.runtime.lastError&&console.error(chrome.runtime.lastError),api.stop||((a.top||0===parseInt(a.top+""))&&screenshot.screens.push({left:parseInt(a.left+""),top:parseInt(a.top+""),data:b}),a.finish?(screenshot.screenShotParams=a,screenshot.createScreenShot()):screenshot.addScreen({start:!1}))},c=localStorage.speed;setTimeout(function(){chrome.windows.update(screenshot.thisWindowId,{focused:!0},function(){chrome.tabs.update(screenshot.thisTabId,{active:!0},function(){chrome.runtime.lastError&&console.error(chrome.runtime.lastError),chrome.tabs.captureVisibleTab(null,{format:"png"},d=>{if(1===a._devicePixelRatio)b(d);else{const e=document.createElement("canvas"),c=new Image;c.src=d,c.onload=()=>{var d=Math.floor;const f=e.getContext("2d"),g=c.width/a._devicePixelRatio,h=d(c.height/c.width*g);e.width=g,e.height=h,f.drawImage(c,0,0,g,h);const i=e.toDataURL("image/png");b(i)}}})})})},c)}},createScreenShot:function(){const a=screenshot.screenShotParams;chrome.tabs.sendMessage(screenshot.thisTabId,{type:"finish"});const b=[];screenshot.canvas=document.createElement("canvas");var c=!0;const d=function(e){if(console.log(a),api.stop)return;const f=screenshot.canvas.getContext("2d");b[e]=$("<img tag="+e+"/>"),b[e].load(function(){var e;e=parseInt($(this).attr("tag")),c&&(screenshot.canvas.width=a.width||b[e][0].width,screenshot.canvas.height=a.height||b[e][0].height,c=!1);const g=screenshot.screens[e].top+0;return f.drawImage(b[e][0],screenshot.screens[e].left,g),screenshot.screens[e].data=null,b[e][0].src="",b[e].off("load"),b[e][0]=null,b[e].remove(),b[e]=null,e===screenshot.screens.length-1?void(screenshot.runCallback?!screenshot.keepIt&&(screenshot.canvas.width=screenshot.canvas.height=1,screenshot.canvas.remove(),screenshot.canvas=null,delete screenshot.canvas):(chrome.tabs.create({url:chrome.extension.getURL("editor.html")}),editor=null)):void(api.stop||d(++e))});try{b[e].attr("src",screenshot.screens[e].data),delete screenshot.screens[e].data}catch(a){}};api.stop||d(0)}};