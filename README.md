<!---
layout: intro
title: Momo
-->

# Momo (MoMotion)

> * A framework and a collection for separate and simple implementation of touch gestures

### AMD and OzJS

* Momo can either be viewed as an independent library, or as a part of [OzJS mirco-framework](http://ozjs.org/#framework).
* It's wrapped as a number of mutually independent [AMD (Asynchronous Module Definition)](https://github.com/amdjs/amdjs-api/wiki/AMD) modules. You should use them with [oz.js](http://ozjs.org/#start) (or require.js or [similar](http://wiki.commonjs.org/wiki/Implementations) for handling dependencies). 
* If you want to make them available for both other AMD code and traditional code based on global namespace. OzJS provides [a mini define/require implementation](http://ozjs.org/examples/adapter/) to transform AMD module into traditional [module pattern](http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth).
* See [http://ozjs.org](http://ozjs.org) for details.

### Get the Code

* [Download on Github](https://github.com/dexteryy/momo/)
* Add to your project as new dependency:
    * via [istatic](http://ozjs.org/istatic)
    * via [volo](https://github.com/volojs/volo)

## Dependencies

* [mo/lang](https://github.com/dexteryy/mo)

## Modules Overview

* [momo](https://github.com/dexteryy/momo/blob/master/momo.js)
    * A sample implementation for adapter
* [momo/base](https://github.com/dexteryy/momo/blob/master/momo/base.js)
    * A simple framework
* [momo/tap](https://github.com/dexteryy/momo/blob/master/momo/tap.js) 
    * 'tap', 'doubletap', 'hold', 'tapstart', 'tapcancel'
* [momo/scroll](https://github.com/dexteryy/momo/blob/master/momo/scroll.js) 
    * 'scrolldown', 'scrollup', 'scrollstart', 'scrollend'
* [momo/swipe](https://github.com/dexteryy/momo/blob/master/momo/swipe.js) 
    * 'swipeup', 'swipedown', 'swiperight', 'swipeleft'
* momo/drag (beta)
    * 'drag', 'dragover', 'dragstart', 'dragend'

## Examples

* Comming soon...

## API and usage

#### momo

```javascript 
var momo = require('momo');
```

* `momo.init()` -
* `momo.tap()` -
* `momo.scroll()` -
* `momo.swipe()` -
* `momo.drag()` -

#### momo/base

Defaults:

* `namespace`: ""

```javascript 
var momoBase = require('momo/base');
var MomoBase = momoBase.Class;
```

* `MomoBase.prototype.config` -- 
* `MomoBase.prototype.enable` -- 
* `MomoBase.prototype.disable` -- 
* `MomoBase.prototype.once` -- 
* `MomoBase.prototype.event` -- 
* `MomoBase.prototype.SUPPORT_TOUCH` -- 
* `MomoBase.prototype.bind` -- [adapter]
* `MomoBase.prototype.unbind` -- [adapter]
* `MomoBase.prototype.trigger` -- [adapter]
* `MomoBase.prototype.press` -- [hook]
* `MomoBase.prototype.move` -- [hook]
* `MomoBase.prototype.release` -- [hook]
* `MomoBase.prototype.cancel` -- [hook]

#### momo/tap

Defaults:

* `tapRadius`: 10
* `doubleTimeout`: 300
* `tapThreshold`: 0
* `holdThreshold`: 500

```javascript 
var momoTap = require('momo/tap');
var tapGesture = momoTap(element, /* optional */ config, /* optional */ handler);
```

* `element.addEventListener('tap', handler)`
* `element.addEventListener('doubletap', handler)`
* `element.addEventListener('hold', handler)`
* `element.addEventListener('tapstart', handler)`
* `element.addEventListener('tapcancel', handler)`

#### momo/scroll

Defaults:

* `directThreshold`: 5
* `scrollEndGap`: 5

```javascript 
var momoScroll = require('momo/scroll');
var scrollGesture = momoScroll(element, /* optional */ config, /* optional */ handler);
```

* `scrollGesture.watchScroll(element)` - 
* `element.addEventListener('scrolldown', handler)`
* `element.addEventListener('scrollup', handler)`
* `element.addEventListener('scrollstart', handler)`
* `element.addEventListener('scrollend', handler)`

#### momo/swipe

Defaults:

* `timeThreshold`: 200
* `distanceThreshold`: 20

```javascript 
var momoSwipe = require('momo/swipe');
var swipeGesture = momoSwipe(element, /* optional */ config, /* optional */ handler);
```

* `element.addEventListener('swipedown', handler)`
* `element.addEventListener('swipeup', handler)`
* `element.addEventListener('swipeleft', handler)`
* `element.addEventListener('swiperight', handler)`

#### momo/drag

* Comming soon...

Under construction...

## More References

See [OzJS Project Homepage](http://ozjs.org/)

## Release History

See [OzJS Release History](http://ozjs.org/#release)

## License

Copyright (c) 2010 - 2013 dexteryy  
Licensed under the MIT license.


