/**
 * Momo (MoMotion)
 * A framework and a collection for separate and simple implementation of touch gestures
 * 
 * using AMD (Asynchronous Module Definition) API with OzJS
 * see http://ozjs.org for details
 *
 * Copyright (C) 2010-2012, Dexter.Yy, MIT License
 * vim: et:ts=4:sw=4:sts=4
 */
define('momo/scroll', [
    'mo/lang',
    'momo/base'
], function(_, momoBase){

    var MomoScroll = _.construct(momoBase.Class);

    _.mix(MomoScroll.prototype, {

        EVENTS: [
            'scrolldown', 
            'scrollup', 
            'scrollstart', 
            'scrollend'
        ],
        DEFAULT_CONFIG: {
            'directThreshold': 5,
            'scrollEndGap': 5
        },

        watchScroll: function(elm){
            this.scrollingNode = elm.nodeName === 'BODY' ? document : elm;
            this.scrollPosNode = 'scrollTop' in elm ? elm : document.body;
        },

        checkScollDirection: function(y){
            var node = { target: this.node },
                ev = this.event,
                d = y - this._lastY,
                threshold = this._config.directThreshold;
            if (!this._started 
                    && (d < 0 - threshold
                        || d > threshold)) {
                this._started = true;
                this.trigger(node, ev.scrollstart);
            }
            if (d < 0 - threshold) {
                if (this._scrollDown !== true) {
                    this.trigger(node, ev.scrolldown);
                }
                this._lastY = y;
                this._scrollDown = true;
            } else if (d > threshold) {
                if (this._scrollDown !== false) {
                    this.trigger(node, ev.scrollup);
                }
                this._lastY = y;
                this._scrollDown = false;
            }
        },

        press: function(e){
            var self = this,
                t = this.SUPPORT_TOUCH ? e.touches[0] : e;
            self._scrollDown = null;
            self._lastY = t.clientY;
            self._scrollY = null;
            self._ended = false;
            if (self.scrollingNode) {
                var scrolling = self._scrolling;
                self._scrolling = false;
                var tm = self._tm = e.timeStamp;
                self.once(self.MOVE, function(){
                    self.once('scroll', function(){
                        if (tm === self._tm) {
                            if (!scrolling) {
                                if (!self._started) {
                                    self._started = true;
                                    self.trigger({ target: self.node }, self.event.scrollstart);
                                }
                                if (self._ended) {
                                    self._ended = false;
                                    self._scrollEnd();
                                }
                            }
                        }
                    }, self.scrollingNode);
                });
            }
        },

        move: function(e){
            var t = this.SUPPORT_TOUCH ? e.touches[0] : e;
            this.checkScollDirection(t.clientY);
            //this._lastY = t.clientY;
            if (this.scrollingNode) {
                this._scrollY = this.scrollPosNode.scrollTop;
            }
        },

        release: function(e){
            var self = this, 
                t = this.SUPPORT_TOUCH ? e.changedTouches[0] : e,
                ev = self.event,
                node = { target: self.node };
            // up/down
            this.checkScollDirection(t.clientY);
            // end
            if (self._scrollY !== null) {
                var vp = self.scrollPosNode,
                    gap = Math.abs(vp.scrollTop - self._scrollY) || 0;
                if (self._scrollY >= 0 && (self._scrollY <= vp.scrollHeight + vp.offsetHeight)
                        && gap < self._config.scrollEndGap) {
                    if (self._started) {
                        self._scrollEnd();
                    } else {
                        self._ended = true;
                    }
                } else {
                    var tm = self._tm;
                    self._scrolling = true;
                    self.once('scroll', function(){
                        if (tm === self._tm) {
                            self._scrolling = false;
                            self._scrollEnd();
                        }
                    }, self.scrollingNode);
                }
                self._scrollY = null;
            } else if (self._started) {
                self._scrollEnd();
            }
        },

        _scrollEnd: function(){
            this._started = false;
            this._tm = +new Date();
            this.trigger({ target: this.node }, this.event.scrollend);
        }
    
    });

    function exports(elm, opt, cb){
        return new exports.Class(elm, opt, cb);
    }

    exports.Class = MomoScroll;

    return exports;

});
