fabric.Canvas.prototype.initialize=function(a){return function(...b){return a.call(this,...b),this._historyInit(),this}}(fabric.Canvas.prototype.initialize),fabric.Canvas.prototype.dispose=function(a){return function(...b){return a.call(this,...b),this._historyDispose(),this}}(fabric.Canvas.prototype.dispose),fabric.Canvas.prototype._historyNext=function(){return JSON.stringify(this.toDatalessJSON(this.extraProps))},fabric.Canvas.prototype._historyEvents=function(){return{"object:added":this._historySaveAction,"object:removed":this._historySaveAction,"object:modified":this._historySaveAction,"object:skewing":this._historySaveAction}},fabric.Canvas.prototype._historyInit=function(){this.historyUndo=[],this.historyRedo=[],this.extraProps=["selectable"],this.historyNextState=this._historyNext(),this.on(this._historyEvents())},fabric.Canvas.prototype._historyDispose=function(){this.off(this._historyEvents())},fabric.Canvas.prototype._historySaveAction=function(){if(!this.historyProcessing){const a=this.historyNextState;this.historyUndo.push(a),this.historyNextState=this._historyNext(),this.fire("history:append",{json:a})}},fabric.Canvas.prototype.undo=function(a){this.historyProcessing=!0;const b=this.historyUndo.pop();b?(this.historyRedo.push(this._historyNext()),this.historyNextState=b,this._loadHistory(b,"history:undo",a)):this.historyProcessing=!1},fabric.Canvas.prototype.redo=function(a){this.historyProcessing=!0;const b=this.historyRedo.pop();b?(this.historyUndo.push(this._historyNext()),this.historyNextState=b,this._loadHistory(b,"history:redo",a)):this.historyProcessing=!1},fabric.Canvas.prototype._loadHistory=function(a,b,c){var d=this;this.loadFromJSON(a,function(){d.renderAll(),d.fire(b),d.historyProcessing=!1,c&&"function"==typeof c&&c()})},fabric.Canvas.prototype.clearHistory=function(){this.historyUndo=[],this.historyRedo=[],this.fire("history:clear")},fabric.Canvas.prototype.offHistory=function(){this.historyProcessing=!0},fabric.Canvas.prototype.onHistory=function(){this.historyProcessing=!1,this._historySaveAction()};