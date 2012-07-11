var EnterFrame = function(option) {
    this.init(option);
}
jQuery.extend(EnterFrame.prototype,{
    option  : {fps:30},
    fpsTime : 100,
    active  : true,
    func    : null,
    timer   : null,
    init : function(option) {
        this.option = jQuery.extend({}, this.option, option);
        this.setfps(this.option.fps);
        return this;
    },
    start : function() {
        this.active = true;
        this._enterFrame();
        return this;
    },
    stop : function() {
        clearTimeout(this.timer);
        this.active = false;
        return this;
    },
    setAction : function(f) {
        if(typeof(f) == 'function') {
            this.func = f;
        }
        return this;
    },
    removeAction : function() {
        this.func = null;
        return this;
    },
    setfps : function(n) {
        n = Number(n);
        if(n) {
            this.option.fps = n;
            this.fpsTime = Math.round(1000 / n);
        }
    },
    getfps : function() {
        return this.option.fps;
    },
    _enterFrame : function() {
        var self = this;
        if(self.active && self.func){
            self.func();
            self.timer = setTimeout(function(){self._enterFrame();}, self.fpsTime);
        }
    }
});