(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global;
	});

	var hasOwnProperty = {}.hasOwnProperty;

	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', {
	    get: function get() {
	      return 7;
	    }
	  }).a != 7;
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = {
	  version: '2.6.5'
	};
	if (typeof __e == 'number') __e = core;
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var document$1 = _global.document;

	var is = _isObject(document$1) && _isObject(document$1.createElement);

	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', {
	    get: function get() {
	      return 7;
	    }
	  }).a != 7;
	});

	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;
	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) {}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var id = 0;
	var px = Math.random();

	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});
	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');



	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));

	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;

	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };

	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };

	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }

	  return function () {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;

	  for (key in source) {
	    own = !IS_FORCED && target && target[key] !== undefined;
	    out = (own ? target : source)[key];
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    if (target) _redefine(target, key, out, type & $export.U);
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};

	_global.core = _core;
	$export.F = 1;
	$export.G = 2;
	$export.S = 4;
	$export.P = 8;
	$export.B = 16;
	$export.W = 32;
	$export.U = 64;
	$export.R = 128;
	var _export = $export;

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');





	var setDesc = _objectDp.f;

	var id = 0;

	var isExtensible = Object.isExtensible || function () {
	  return true;
	};

	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});

	var setMeta = function setMeta(it) {
	  setDesc(it, META, {
	    value: {
	      i: 'O' + ++id,
	      w: {}
	    }
	  });
	};

	var fastKey = function fastKey(it, create) {
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

	  if (!_has(it, META)) {
	    if (!isExtensible(it)) return 'F';
	    if (!create) return 'E';
	    setMeta(it);
	  }

	  return it[META].i;
	};

	var getWeak = function getWeak(it, create) {
	  if (!_has(it, META)) {
	    if (!isExtensible(it)) return true;
	    if (!create) return false;
	    setMeta(it);
	  }

	  return it[META].w;
	};

	var onFreeze = function onFreeze(it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};

	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');



	var Symbol = _global.Symbol;

	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;



	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
	    configurable: true,
	    value: tag
	  });
	};

	var f$1 = _wks;

	var _wksExt = {
		f: f$1
	};

	var defineProperty = _objectDp.f;

	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, {
	    value: _wksExt.f(name)
	  });
	};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	var min = Math.min;

	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0;
	};

	var max = Math.max;
	var min$1 = Math.min;

	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	    } else for (; length > index; index++) {
	      if (IS_INCLUDES || index in O) {
	        if (O[index] === el) return IS_INCLUDES || index || 0;
	      }
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');



	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);

	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) {
	    if (key != IE_PROTO) _has(O, key) && result.push(key);
	  }

	  while (names.length > i) {
	    if (_has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }

	  return result;
	};

	var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;

	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;

	    while (symbols.length > i) {
	      if (isEnum.call(it, key = symbols[i++])) result.push(key);
	    }
	  }

	  return result;
	};

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;

	  while (length > i) {
	    _objectDp.f(O, P = keys[i++], Properties[P]);
	  }

	  return O;
	};

	var document$2 = _global.document;

	var _html = document$2 && document$2.documentElement;

	var IE_PROTO$1 = _sharedKey('IE_PROTO');

	var Empty = function Empty() {};

	var PROTOTYPE$1 = 'prototype';

	var _createDict = function createDict() {
	  var iframe = _domCreate('iframe');

	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';

	  _html.appendChild(iframe);

	  iframe.src = 'javascript:';
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  _createDict = iframeDocument.F;

	  while (i--) {
	    delete _createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  }

	  return _createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    result[IE_PROTO$1] = O;
	  } else result = _createDict();

	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	var gOPN = _objectGopn.f;

	var toString$1 = {}.toString;
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function getWindowNames(it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var gOPD = Object.getOwnPropertyDescriptor;
	var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) {}
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	var META = _meta.KEY;







































	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;

	var _stringify = $JSON && $JSON.stringify;

	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = _global.QObject;
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function get() {
	      return dP$1(this, 'a', {
	        value: 7
	      }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
	} : dP$1;

	var wrap = function wrap(tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);

	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);

	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, {
	        enumerable: _propertyDesc(0, false)
	      });
	    }

	    return setSymbolDesc(it, key, D);
	  }

	  return dP$1(it, key, D);
	};

	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;

	  while (l > i) {
	    $defineProperty(it, key = keys[i++], P[key]);
	  }

	  return it;
	};

	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;

	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  }

	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;

	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  }

	  return result;
	};

	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);

	    var $set = function $set(value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };

	    if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, {
	      configurable: true,
	      set: $set
	    });
	    return wrap(tag);
	  };

	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });
	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, {
	  Symbol: $Symbol
	});

	for (var es6Symbols = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
	  _wks(es6Symbols[j++]);
	}

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) {
	  _wksDefine(wellKnownSymbols[k++]);
	}

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  'for': function _for(key) {
	    return _has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');

	    for (var key in SymbolRegistry) {
	      if (SymbolRegistry[key] === sym) return key;
	    }
	  },
	  useSetter: function useSetter() {
	    setter = true;
	  },
	  useSimple: function useSimple() {
	    setter = false;
	  }
	});
	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  create: $create,
	  defineProperty: $defineProperty,
	  defineProperties: $defineProperties,
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  getOwnPropertyNames: $getOwnPropertyNames,
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  return _stringify([S]) != '[null]' || _stringify({
	    a: S
	  }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;

	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }

	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return;
	    if (!_isArray(replacer)) replacer = function replacer(key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	_setToStringTag($Symbol, 'Symbol');
	_setToStringTag(Math, 'Math', true);
	_setToStringTag(_global.JSON, 'JSON', true);

	_export(_export.S, 'Object', {
	  create: _objectCreate
	});

	_export(_export.S + _export.F * !_descriptors, 'Object', {
	  defineProperty: _objectDp.f
	});

	_export(_export.S + _export.F * !_descriptors, 'Object', {
	  defineProperties: _objectDps
	});

	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

	var $getOwnPropertyDescriptor$1 = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
	  };
	});

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	var IE_PROTO$2 = _sharedKey('IE_PROTO');

	var ObjectProto$1 = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];

	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }

	  return O instanceof Object ? ObjectProto$1 : null;
	};

	_objectSap('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return _objectGpo(_toObject(it));
	  };
	});

	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	_objectSap('getOwnPropertyNames', function () {
	  return _objectGopnExt.f;
	});

	var meta = _meta.onFreeze;

	_objectSap('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

	var meta$1 = _meta.onFreeze;

	_objectSap('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && _isObject(it) ? $seal(meta$1(it)) : it;
	  };
	});

	var meta$2 = _meta.onFreeze;

	_objectSap('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && _isObject(it) ? $preventExtensions(meta$2(it)) : it;
	  };
	});

	_objectSap('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return _isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

	_objectSap('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return _isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

	_objectSap('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return _isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

	var $assign = Object.assign;
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;

	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;

	    while (length > j) {
	      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	    }
	  }

	  return T;
	} : $assign;

	_export(_export.S + _export.F, 'Object', {
	  assign: _objectAssign
	});

	var _sameValue = Object.is || function is(x, y) {
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	_export(_export.S, 'Object', {
	  is: _sameValue
	});

	var check = function check(O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};

	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? function (test, buggy, set) {
	    try {
	      set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	      set(test, []);
	      buggy = !(test instanceof Array);
	    } catch (e) {
	      buggy = true;
	    }

	    return function setPrototypeOf(O, proto) {
	      check(O, proto);
	      if (buggy) O.__proto__ = proto;else set(O, proto);
	      return O;
	    };
	  }({}, false) : undefined),
	  check: check
	};

	_export(_export.S, 'Object', {
	  setPrototypeOf: _setProto.set
	});

	var TAG$1 = _wks('toStringTag');

	var ARG = _cof(function () {
	  return arguments;
	}()) == 'Arguments';

	var tryGet = function tryGet(it, key) {
	  try {
	    return it[key];
	  } catch (e) {}
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T : ARG ? _cof(O) : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var test = {};
	test[_wks('toStringTag')] = 'z';

	if (test + '' != '[object z]') {
	  _redefine(Object.prototype, 'toString', function toString() {
	    return '[object ' + _classof(this) + ']';
	  }, true);
	}

	var _invoke = function (fn, args, that) {
	  var un = that === undefined;

	  switch (args.length) {
	    case 0:
	      return un ? fn() : fn.call(that);

	    case 1:
	      return un ? fn(args[0]) : fn.call(that, args[0]);

	    case 2:
	      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);

	    case 3:
	      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);

	    case 4:
	      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
	  }

	  return fn.apply(that, args);
	};

	var arraySlice = [].slice;
	var factories = {};

	var construct = function construct(F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) {
	      n[i] = 'a[' + i + ']';
	    }

	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  }

	  return factories[len](F, args);
	};

	var _bind = Function.bind || function bind(that) {
	  var fn = _aFunction(this);
	  var partArgs = arraySlice.call(arguments, 1);

	  var bound = function bound() {
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
	  };

	  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

	_export(_export.P, 'Function', {
	  bind: _bind
	});

	var dP$2 = _objectDp.f;

	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';
	NAME in FProto || _descriptors && dP$2(FProto, NAME, {
	  configurable: true,
	  get: function get() {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var HAS_INSTANCE = _wks('hasInstance');

	var FunctionProto = Function.prototype;
	if (!(HAS_INSTANCE in FunctionProto)) _objectDp.f(FunctionProto, HAS_INSTANCE, {
	  value: function value(O) {
	    if (typeof this != 'function' || !_isObject(O)) return false;
	    if (!_isObject(this.prototype)) return O instanceof this;

	    while (O = _objectGpo(O)) {
	      if (this.prototype === O) return true;
	    }

	    return false;
	  }
	});

	var _stringWs = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

	var space = '[' + _stringWs + ']';
	var non = "\u200B\x85";
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function exporter(KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseInt = _global.parseInt;

	var $trim = _stringTrim.trim;



	var hex = /^[-+]?0[xX]/;
	var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
	} : $parseInt;

	_export(_export.G + _export.F * (parseInt != _parseInt), {
	  parseInt: _parseInt
	});

	var $parseFloat = _global.parseFloat;

	var $trim$1 = _stringTrim.trim;

	var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim$1(String(str), 3);
	  var result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	_export(_export.G + _export.F * (parseFloat != _parseFloat), {
	  parseFloat: _parseFloat
	});

	var setPrototypeOf = _setProto.set;

	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;

	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  }

	  return that;
	};

	var gOPN$2 = _objectGopn.f;

	var gOPD$2 = _objectGopd.f;

	var dP$3 = _objectDp.f;

	var $trim$2 = _stringTrim.trim;

	var NUMBER = 'Number';
	var $Number = _global[NUMBER];
	var Base = $Number;
	var proto = $Number.prototype;
	var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	var toNumber = function toNumber(argument) {
	  var it = _toPrimitive(argument, false);

	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim$2(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;

	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN;
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66:
	        case 98:
	          radix = 2;
	          maxCode = 49;
	          break;

	        case 79:
	        case 111:
	          radix = 8;
	          maxCode = 55;
	          break;

	        default:
	          return +it;
	      }

	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        if (code < 48 || code > maxCode) return NaN;
	      }

	      return parseInt(digits, radix);
	    }
	  }

	  return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number && (BROKEN_COF ? _fails(function () {
	      proto.valueOf.call(that);
	    }) : _cof(that) != NUMBER) ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };

	  for (var keys = _descriptors ? gOPN$2(Base) : ('MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + 'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j$1 = 0, key; keys.length > j$1; j$1++) {
	    if (_has(Base, key = keys[j$1]) && !_has($Number, key)) {
	      dP$3($Number, key, gOPD$2(Base, key));
	    }
	  }

	  $Number.prototype = proto;
	  proto.constructor = $Number;

	  _redefine(_global, NUMBER, $Number);
	}

	var _aNumberValue = function (it, msg) {
	  if (typeof it != 'number' && _cof(it) != 'Number') throw TypeError(msg);
	  return +it;
	};

	var _stringRepeat = function repeat(count) {
	  var str = String(_defined(this));
	  var res = '';
	  var n = _toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");

	  for (; n > 0; (n >>>= 1) && (str += str)) {
	    if (n & 1) res += str;
	  }

	  return res;
	};

	var $toFixed = 1.0.toFixed;
	var floor$1 = Math.floor;
	var data = [0, 0, 0, 0, 0, 0];
	var ERROR = 'Number.toFixed: incorrect invocation!';
	var ZERO = '0';

	var multiply = function multiply(n, c) {
	  var i = -1;
	  var c2 = c;

	  while (++i < 6) {
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor$1(c2 / 1e7);
	  }
	};

	var divide = function divide(n) {
	  var i = 6;
	  var c = 0;

	  while (--i >= 0) {
	    c += data[i];
	    data[i] = floor$1(c / n);
	    c = c % n * 1e7;
	  }
	};

	var numToString = function numToString() {
	  var i = 6;
	  var s = '';

	  while (--i >= 0) {
	    if (s !== '' || i === 0 || data[i] !== 0) {
	      var t = String(data[i]);
	      s = s === '' ? t : s + _stringRepeat.call(ZERO, 7 - t.length) + t;
	    }
	  }

	  return s;
	};

	var pow = function pow(x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};

	var log = function log(x) {
	  var n = 0;
	  var x2 = x;

	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }

	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  }

	  return n;
	};

	_export(_export.P + _export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !_fails(function () {
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits) {
	    var x = _aNumberValue(this, ERROR);
	    var f = _toInteger(fractionDigits);
	    var s = '';
	    var m = ZERO;
	    var e, z, j, k;
	    if (f < 0 || f > 20) throw RangeError(ERROR);
	    if (x != x) return 'NaN';
	    if (x <= -1e21 || x >= 1e21) return String(x);

	    if (x < 0) {
	      s = '-';
	      x = -x;
	    }

	    if (x > 1e-21) {
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;

	      if (e > 0) {
	        multiply(0, z);
	        j = f;

	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }

	        multiply(pow(10, j, 1), 0);
	        j = e - 1;

	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }

	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + _stringRepeat.call(ZERO, f);
	      }
	    }

	    if (f > 0) {
	      k = m.length;
	      m = s + (k <= f ? '0.' + _stringRepeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    }

	    return m;
	  }
	});

	var $toPrecision = 1.0.toPrecision;
	_export(_export.P + _export.F * (_fails(function () {
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !_fails(function () {
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision) {
	    var that = _aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	  }
	});

	_export(_export.S, 'Number', {
	  EPSILON: Math.pow(2, -52)
	});

	var _isFinite = _global.isFinite;

	_export(_export.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

	var floor$2 = Math.floor;

	var _isInteger = function isInteger(it) {
	  return !_isObject(it) && isFinite(it) && floor$2(it) === it;
	};

	_export(_export.S, 'Number', {
	  isInteger: _isInteger
	});

	_export(_export.S, 'Number', {
	  isNaN: function isNaN(number) {
	    return number != number;
	  }
	});

	var abs = Math.abs;
	_export(_export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

	_export(_export.S, 'Number', {
	  MAX_SAFE_INTEGER: 0x1fffffffffffff
	});

	_export(_export.S, 'Number', {
	  MIN_SAFE_INTEGER: -0x1fffffffffffff
	});

	_export(_export.S + _export.F * (Number.parseFloat != _parseFloat), 'Number', {
	  parseFloat: _parseFloat
	});

	_export(_export.S + _export.F * (Number.parseInt != _parseInt), 'Number', {
	  parseInt: _parseInt
	});

	var _mathLog1p = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

	var sqrt = Math.sqrt;
	var $acosh = Math.acosh;
	_export(_export.S + _export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710 && $acosh(Infinity) == Infinity), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : _mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

	var $asinh = Math.asinh;

	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	_export(_export.S + _export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {
	  asinh: asinh
	});

	var $atanh = Math.atanh;
	_export(_export.S + _export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

	var _mathSign = Math.sign || function sign(x) {
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	_export(_export.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return _mathSign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

	_export(_export.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

	var exp = Math.exp;
	_export(_export.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

	var $expm1 = Math.expm1;
	var _mathExpm1 = !$expm1 || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168 || $expm1(-2e-17) != -2e-17 ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

	_export(_export.S + _export.F * (_mathExpm1 != Math.expm1), 'Math', {
	  expm1: _mathExpm1
	});

	var pow$1 = Math.pow;
	var EPSILON = pow$1(2, -52);
	var EPSILON32 = pow$1(2, -23);
	var MAX32 = pow$1(2, 127) * (2 - EPSILON32);
	var MIN32 = pow$1(2, -126);

	var roundTiesToEven = function roundTiesToEven(n) {
	  return n + 1 / EPSILON - 1 / EPSILON;
	};

	var _mathFround = Math.fround || function fround(x) {
	  var $abs = Math.abs(x);
	  var $sign = _mathSign(x);
	  var a, result;
	  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	  a = (1 + EPSILON32 / EPSILON) * $abs;
	  result = a - (a - $abs);
	  if (result > MAX32 || result != result) return $sign * Infinity;
	  return $sign * result;
	};

	_export(_export.S, 'Math', {
	  fround: _mathFround
	});

	var abs$1 = Math.abs;
	_export(_export.S, 'Math', {
	  hypot: function hypot(value1, value2) {
	    var sum = 0;
	    var i = 0;
	    var aLen = arguments.length;
	    var larg = 0;
	    var arg, div;

	    while (i < aLen) {
	      arg = abs$1(arguments[i++]);

	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }

	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

	var $imul = Math.imul;
	_export(_export.S + _export.F * _fails(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff;
	    var xn = +x;
	    var yn = +y;
	    var xl = UINT16 & xn;
	    var yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

	_export(_export.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) * Math.LOG10E;
	  }
	});

	_export(_export.S, 'Math', {
	  log1p: _mathLog1p
	});

	_export(_export.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});

	_export(_export.S, 'Math', {
	  sign: _mathSign
	});

	var exp$1 = Math.exp;
	_export(_export.S + _export.F * _fails(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1 ? (_mathExpm1(x) - _mathExpm1(-x)) / 2 : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
	  }
	});

	var exp$2 = Math.exp;
	_export(_export.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = _mathExpm1(x = +x);
	    var b = _mathExpm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
	  }
	});

	_export(_export.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

	var fromCharCode = String.fromCharCode;
	var $fromCodePoint = String.fromCodePoint;
	_export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  fromCodePoint: function fromCodePoint(x) {
	    var res = [];
	    var aLen = arguments.length;
	    var i = 0;
	    var code;

	    while (aLen > i) {
	      code = +arguments[i++];
	      if (_toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
	    }

	    return res.join('');
	  }
	});

	_export(_export.S, 'String', {
	  raw: function raw(callSite) {
	    var tpl = _toIobject(callSite.raw);
	    var len = _toLength(tpl.length);
	    var aLen = arguments.length;
	    var res = [];
	    var i = 0;

	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    }

	    return res.join('');
	  }
	});

	_stringTrim('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _iterators = {};

	var IteratorPrototype = {};

	_hide(IteratorPrototype, _wks('iterator'), function () {
	  return this;
	});

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, {
	    next: _propertyDesc(1, next)
	  });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	var ITERATOR = _wks('iterator');

	var BUGGY = !([].keys && 'next' in [].keys());
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function returnThis() {
	  return this;
	};

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);

	  var getMethod = function getMethod(kind) {
	    if (!BUGGY && kind in proto) return proto[kind];

	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };

	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }

	    return function entries() {
	      return new Constructor(this, kind);
	    };
	  };

	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;

	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));

	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      _setToStringTag(IteratorPrototype, TAG, true);
	      if (typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }

	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;

	    $default = function values() {
	      return $native.call(this);
	    };
	  }

	  if (BUGGY || VALUES_BUG || !proto[ITERATOR]) {
	    _hide(proto, ITERATOR, $default);
	  }

	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;

	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }

	  return methods;
	};

	var $at = _stringAt(true);

	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated);
	  this._i = 0;
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return {
	    value: undefined,
	    done: true
	  };
	  point = $at(O, index);
	  this._i += point.length;
	  return {
	    value: point,
	    done: false
	  };
	});

	var $at$1 = _stringAt(false);

	_export(_export.P, 'String', {
	  codePointAt: function codePointAt(pos) {
	    return $at$1(this, pos);
	  }
	});

	var MATCH = _wks('match');

	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');

	var _failsIsRegexp = function (KEY) {
	  var re = /./;

	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) {}
	  }

	  return true;
	};

	var ENDS_WITH = 'endsWith';
	var $endsWith = ''[ENDS_WITH];
	_export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString) {
	    var that = _stringContext(this, searchString, ENDS_WITH);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = _toLength(that.length);
	    var end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
	    var search = String(searchString);
	    return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
	  }
	});

	var INCLUDES = 'includes';
	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString) {
	    return !!~_stringContext(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_export(_export.P, 'String', {
	  repeat: _stringRepeat
	});

	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];
	_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString) {
	    var that = _stringContext(this, searchString, STARTS_WITH);
	    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
	  }
	});

	var quot = /"/g;

	var createHTML = function createHTML(string, tag, attribute, value) {
	  var S = String(_defined(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};

	var _stringHtml = function (NAME, exec) {
	  var O = {};
	  O[NAME] = exec(createHTML);
	  _export(_export.P + _export.F * _fails(function () {
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

	_stringHtml('anchor', function (createHTML) {
	  return function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  };
	});

	_stringHtml('big', function (createHTML) {
	  return function big() {
	    return createHTML(this, 'big', '', '');
	  };
	});

	_stringHtml('blink', function (createHTML) {
	  return function blink() {
	    return createHTML(this, 'blink', '', '');
	  };
	});

	_stringHtml('bold', function (createHTML) {
	  return function bold() {
	    return createHTML(this, 'b', '', '');
	  };
	});

	_stringHtml('fixed', function (createHTML) {
	  return function fixed() {
	    return createHTML(this, 'tt', '', '');
	  };
	});

	_stringHtml('fontcolor', function (createHTML) {
	  return function fontcolor(color) {
	    return createHTML(this, 'font', 'color', color);
	  };
	});

	_stringHtml('fontsize', function (createHTML) {
	  return function fontsize(size) {
	    return createHTML(this, 'font', 'size', size);
	  };
	});

	_stringHtml('italics', function (createHTML) {
	  return function italics() {
	    return createHTML(this, 'i', '', '');
	  };
	});

	_stringHtml('link', function (createHTML) {
	  return function link(url) {
	    return createHTML(this, 'a', 'href', url);
	  };
	});

	_stringHtml('small', function (createHTML) {
	  return function small() {
	    return createHTML(this, 'small', '', '');
	  };
	});

	_stringHtml('strike', function (createHTML) {
	  return function strike() {
	    return createHTML(this, 'strike', '', '');
	  };
	});

	_stringHtml('sub', function (createHTML) {
	  return function sub() {
	    return createHTML(this, 'sub', '', '');
	  };
	});

	_stringHtml('sup', function (createHTML) {
	  return function sup() {
	    return createHTML(this, 'sup', '', '');
	  };
	});

	_export(_export.S, 'Date', {
	  now: function now() {
	    return new Date().getTime();
	  }
	});

	_export(_export.P + _export.F * _fails(function () {
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({
	    toISOString: function toISOString() {
	      return 1;
	    }
	  }) !== 1;
	}), 'Date', {
	  toJSON: function toJSON(key) {
	    var O = _toObject(this);
	    var pv = _toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

	var getTime = Date.prototype.getTime;
	var $toISOString = Date.prototype.toISOString;

	var lz = function lz(num) {
	  return num > 9 ? num : '0' + num;
	};

	var _dateToIsoString = _fails(function () {
	  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
	}) || !_fails(function () {
	  $toISOString.call(new Date(NaN));
	}) ? function toISOString() {
	  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
	  var d = this;
	  var y = d.getUTCFullYear();
	  var m = d.getUTCMilliseconds();
	  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
	  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	} : $toISOString;

	_export(_export.P + _export.F * (Date.prototype.toISOString !== _dateToIsoString), 'Date', {
	  toISOString: _dateToIsoString
	});

	var DateProto = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var $toString = DateProto[TO_STRING];
	var getTime$1 = DateProto.getTime;

	if (new Date(NaN) + '' != INVALID_DATE) {
	  _redefine(DateProto, TO_STRING, function toString() {
	    var value = getTime$1.call(this);
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

	var NUMBER$1 = 'number';

	var _dateToPrimitive = function (hint) {
	  if (hint !== 'string' && hint !== NUMBER$1 && hint !== 'default') throw TypeError('Incorrect hint');
	  return _toPrimitive(_anObject(this), hint != NUMBER$1);
	};

	var TO_PRIMITIVE$1 = _wks('toPrimitive');

	var proto$1 = Date.prototype;
	if (!(TO_PRIMITIVE$1 in proto$1)) _hide(proto$1, TO_PRIMITIVE$1, _dateToPrimitive);

	_export(_export.S, 'Array', {
	  isArray: _isArray
	});

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	var ITERATOR$1 = _wks('iterator');

	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));else object[index] = value;
	};

	var ITERATOR$2 = _wks('iterator');



	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2] || it['@@iterator'] || _iterators[_classof(it)];
	};

	var ITERATOR$3 = _wks('iterator');

	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();

	  riter['return'] = function () {
	    SAFE_CLOSING = true;
	  };
	} catch (e) {}

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;

	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();

	    iter.next = function () {
	      return {
	        done: safe = true
	      };
	    };

	    arr[ITERATOR$3] = function () {
	      return iter;
	    };

	    exec(arr);
	  } catch (e) {}

	  return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) {
	}), 'Array', {
	  from: function from(arrayLike) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);

	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);

	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }

	    result.length = index;
	    return result;
	  }
	});

	_export(_export.S + _export.F * _fails(function () {
	  function F() {}

	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  of: function of() {
	    var index = 0;
	    var aLen = arguments.length;
	    var result = new (typeof this == 'function' ? this : Array)(aLen);

	    while (aLen > index) {
	      _createProperty(result, index, arguments[index++]);
	    }

	    result.length = aLen;
	    return result;
	  }
	});

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    arg ? method.call(null, function () {}, 1) : method.call(null);
	  });
	};

	var arrayJoin = [].join;
	_export(_export.P + _export.F * (_iobject != Object || !_strictMethod(arrayJoin)), 'Array', {
	  join: function join(separator) {
	    return arrayJoin.call(_toIobject(this), separator === undefined ? ',' : separator);
	  }
	});

	var arraySlice$1 = [].slice;
	_export(_export.P + _export.F * _fails(function () {
	  if (_html) arraySlice$1.call(_html);
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = _toLength(this.length);
	    var klass = _cof(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') return arraySlice$1.call(this, begin, end);
	    var start = _toAbsoluteIndex(begin, len);
	    var upTo = _toAbsoluteIndex(end, len);
	    var size = _toLength(upTo - start);
	    var cloned = new Array(size);
	    var i = 0;

	    for (; i < size; i++) {
	      cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
	    }

	    return cloned;
	  }
	});

	var $sort = [].sort;
	var test$1 = [1, 2, 3];
	_export(_export.P + _export.F * (_fails(function () {
	  test$1.sort(undefined);
	}) || !_fails(function () {
	  test$1.sort(null);
	}) || !_strictMethod($sort)), 'Array', {
	  sort: function sort(comparefn) {
	    return comparefn === undefined ? $sort.call(_toObject(this)) : $sort.call(_toObject(this), _aFunction(comparefn));
	  }
	});

	var SPECIES = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;

	  if (_isArray(original)) {
	    C = original.constructor;
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;

	    if (_isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }

	  return C === undefined ? Array : C;
	};

	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;

	    for (; length > index; index++) {
	      if (NO_HOLES || index in self) {
	        val = self[index];
	        res = f(val, index, O);

	        if (TYPE) {
	          if (IS_MAP) result[index] = res;else if (res) switch (TYPE) {
	              case 3:
	                return true;

	              case 5:
	                return val;

	              case 6:
	                return index;

	              case 2:
	                result.push(val);
	            } else if (IS_EVERY) return false;
	        }
	      }
	    }

	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var $forEach = _arrayMethods(0);

	var STRICT = _strictMethod([].forEach, true);

	_export(_export.P + _export.F * !STRICT, 'Array', {
	  forEach: function forEach(callbackfn) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

	var $map = _arrayMethods(1);

	_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
	  map: function map(callbackfn) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

	var $filter = _arrayMethods(2);

	_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
	  filter: function filter(callbackfn) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

	var $some = _arrayMethods(3);

	_export(_export.P + _export.F * !_strictMethod([].some, true), 'Array', {
	  some: function some(callbackfn) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

	var $every = _arrayMethods(4);

	_export(_export.P + _export.F * !_strictMethod([].every, true), 'Array', {
	  every: function every(callbackfn) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

	var _arrayReduce = function (that, callbackfn, aLen, memo, isRight) {
	  _aFunction(callbackfn);
	  var O = _toObject(that);
	  var self = _iobject(O);
	  var length = _toLength(O.length);
	  var index = isRight ? length - 1 : 0;
	  var i = isRight ? -1 : 1;
	  if (aLen < 2) for (;;) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }

	    index += i;

	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }

	  for (; isRight ? index >= 0 : length > index; index += i) {
	    if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	  }

	  return memo;
	};

	_export(_export.P + _export.F * !_strictMethod([].reduce, true), 'Array', {
	  reduce: function reduce(callbackfn) {
	    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

	_export(_export.P + _export.F * !_strictMethod([].reduceRight, true), 'Array', {
	  reduceRight: function reduceRight(callbackfn) {
	    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

	var $indexOf = _arrayIncludes(false);

	var $native = [].indexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
	_export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
	  indexOf: function indexOf(searchElement) {
	    return NEGATIVE_ZERO ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
	  }
	});

	var $native$1 = [].lastIndexOf;
	var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].lastIndexOf(1, -0) < 0;
	_export(_export.P + _export.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
	  lastIndexOf: function lastIndexOf(searchElement) {
	    if (NEGATIVE_ZERO$1) return $native$1.apply(this, arguments) || 0;
	    var O = _toIobject(this);
	    var length = _toLength(O.length);
	    var index = length - 1;
	    if (arguments.length > 1) index = Math.min(index, _toInteger(arguments[1]));
	    if (index < 0) index = length + index;

	    for (; index >= 0; index--) {
	      if (index in O) if (O[index] === searchElement) return index || 0;
	    }

	    return -1;
	  }
	});

	var _arrayCopyWithin = [].copyWithin || function copyWithin(target, start) {
	  var O = _toObject(this);
	  var len = _toLength(O.length);
	  var to = _toAbsoluteIndex(target, len);
	  var from = _toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
	  var inc = 1;

	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }

	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];else delete O[to];
	    to += inc;
	    from += inc;
	  }

	  return O;
	};

	var UNSCOPABLES = _wks('unscopables');

	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});

	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	_export(_export.P, 'Array', {
	  copyWithin: _arrayCopyWithin
	});

	_addToUnscopables('copyWithin');

	var _arrayFill = function fill(value) {
	  var O = _toObject(this);
	  var length = _toLength(O.length);
	  var aLen = arguments.length;
	  var index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
	  var end = aLen > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : _toAbsoluteIndex(end, length);

	  while (endPos > index) {
	    O[index++] = value;
	  }

	  return O;
	};

	_export(_export.P, 'Array', {
	  fill: _arrayFill
	});

	_addToUnscopables('fill');

	var $find = _arrayMethods(5);

	var KEY = 'find';
	var forced = true;
	if (KEY in []) Array(1)[KEY](function () {
	  forced = false;
	});
	_export(_export.P + _export.F * forced, 'Array', {
	  find: function find(callbackfn) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables(KEY);

	var $find$1 = _arrayMethods(6);

	var KEY$1 = 'findIndex';
	var forced$1 = true;
	if (KEY$1 in []) Array(1)[KEY$1](function () {
	  forced$1 = false;
	});
	_export(_export.P + _export.F * forced$1, 'Array', {
	  findIndex: function findIndex(callbackfn) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables(KEY$1);

	var SPECIES$1 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function get() {
	      return this;
	    }
	  });
	};

	_setSpecies('Array');

	var _iterStep = function (done, value) {
	  return {
	    value: value,
	    done: !!done
	  };
	};

	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated);
	  this._i = 0;
	  this._k = kind;
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;

	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }

	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');
	_iterators.Arguments = _iterators.Array;
	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var dP$4 = _objectDp.f;

	var gOPN$3 = _objectGopn.f;





	var $RegExp = _global.RegExp;
	var Base$1 = $RegExp;
	var proto$2 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (_descriptors && (!CORRECT_NEW || _fails(function () {
	  re2[_wks('match')] = false;
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = _isRegexp(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : _inheritIfRequired(CORRECT_NEW ? new Base$1(piRE && !fiU ? p.source : p, f) : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f), tiRE ? this : proto$2, $RegExp);
	  };

	  var proxy = function proxy(key) {
	    key in $RegExp || dP$4($RegExp, key, {
	      configurable: true,
	      get: function get() {
	        return Base$1[key];
	      },
	      set: function set(it) {
	        Base$1[key] = it;
	      }
	    });
	  };

	  for (var keys$1 = gOPN$3(Base$1), i = 0; keys$1.length > i;) {
	    proxy(keys$1[i++]);
	  }

	  proto$2.constructor = $RegExp;
	  $RegExp.prototype = proto$2;

	  _redefine(_global, 'RegExp', $RegExp);
	}

	_setSpecies('RegExp');

	var nativeExec = RegExp.prototype.exec;
	var nativeReplace = String.prototype.replace;
	var patchedExec = nativeExec;
	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	}();

	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }

	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];
	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }

	    if (NPCG_INCLUDED && match && match.length > 1) {
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var TO_STRING$1 = 'toString';
	var $toString$1 = /./[TO_STRING$1];

	var define = function define(fn) {
	  _redefine(RegExp.prototype, TO_STRING$1, fn, true);
	};

	if (_fails(function () {
	  return $toString$1.call({
	    source: 'a',
	    flags: 'b'
	  }) != '/a/b';
	})) {
	  define(function toString() {
	    var R = _anObject(this);
	    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
	  });
	} else if ($toString$1.name != TO_STRING$1) {
	  define(function toString() {
	    return $toString$1.call(this);
	  });
	}

	var at = _stringAt(true);

	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	var builtinExec = RegExp.prototype.exec;

	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;

	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);

	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }

	    return result;
	  }

	  if (_classof(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return builtinExec.call(R, S);
	};

	var SPECIES$2 = _wks('species');
	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	  var re = /./;

	  re.exec = function () {
	    var result = [];
	    result.groups = {
	      a: '7'
	    };
	    return result;
	  };

	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;

	  re.exec = function () {
	    return originalExec.apply(this, arguments);
	  };

	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	}();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);
	  var DELEGATES_TO_SYMBOL = !_fails(function () {
	    var O = {};

	    O[SYMBOL] = function () {
	      return 7;
	    };

	    return ''[KEY](O) != 7;
	  });
	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	    var execCalled = false;
	    var re = /a/;

	    re.exec = function () {
	      execCalled = true;
	      return null;
	    };

	    if (KEY === 'split') {
	      re.constructor = {};

	      re.constructor[SPECIES$2] = function () {
	        return re;
	      };
	    }

	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(_defined, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === _regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          return {
	            done: true,
	            value: nativeRegExpMethod.call(regexp, str, arg2)
	          };
	        }

	        return {
	          done: true,
	          value: nativeMethod.call(str, regexp, arg2)
	        };
	      }

	      return {
	        done: false
	      };
	    });
	    var strfn = fns[0];
	    var rxfn = fns[1];
	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2 ? function (string, arg) {
	      return rxfn.call(string, this, arg);
	    } : function (string) {
	      return rxfn.call(string, this);
	    });
	  }
	};

	_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
	  return [function match(regexp) {
	    var O = defined(this);
	    var fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, function (regexp) {
	    var res = maybeCallNative($match, regexp, this);
	    if (res.done) return res.value;
	    var rx = _anObject(regexp);
	    var S = String(this);
	    if (!rx.global) return _regexpExecAbstract(rx, S);
	    var fullUnicode = rx.unicode;
	    rx.lastIndex = 0;
	    var A = [];
	    var n = 0;
	    var result;

	    while ((result = _regexpExecAbstract(rx, S)) !== null) {
	      var matchStr = String(result[0]);
	      A[n] = matchStr;
	      if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	      n++;
	    }

	    return n === 0 ? null : A;
	  }];
	});

	var max$1 = Math.max;
	var min$2 = Math.min;
	var floor$3 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function maybeToString(it) {
	  return it === undefined ? it : String(it);
	};

	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [function replace(searchValue, replaceValue) {
	    var O = defined(this);
	    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
	  }, function (regexp, replaceValue) {
	    var res = maybeCallNative($replace, regexp, this, replaceValue);
	    if (res.done) return res.value;
	    var rx = _anObject(regexp);
	    var S = String(this);
	    var functionalReplace = typeof replaceValue === 'function';
	    if (!functionalReplace) replaceValue = String(replaceValue);
	    var global = rx.global;

	    if (global) {
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	    }

	    var results = [];

	    while (true) {
	      var result = _regexpExecAbstract(rx, S);
	      if (result === null) break;
	      results.push(result);
	      if (!global) break;
	      var matchStr = String(result[0]);
	      if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	    }

	    var accumulatedResult = '';
	    var nextSourcePosition = 0;

	    for (var i = 0; i < results.length; i++) {
	      result = results[i];
	      var matched = String(result[0]);
	      var position = max$1(min$2(_toInteger(result.index), S.length), 0);
	      var captures = [];

	      for (var j = 1; j < result.length; j++) {
	        captures.push(maybeToString(result[j]));
	      }

	      var namedCaptures = result.groups;

	      if (functionalReplace) {
	        var replacerArgs = [matched].concat(captures, position, S);
	        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	        var replacement = String(replaceValue.apply(undefined, replacerArgs));
	      } else {
	        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	      }

	      if (position >= nextSourcePosition) {
	        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	        nextSourcePosition = position + matched.length;
	      }
	    }

	    return accumulatedResult + S.slice(nextSourcePosition);
	  }];

	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

	    if (namedCaptures !== undefined) {
	      namedCaptures = _toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }

	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;

	      switch (ch.charAt(0)) {
	        case '$':
	          return '$';

	        case '&':
	          return matched;

	        case '`':
	          return str.slice(0, position);

	        case "'":
	          return str.slice(tailPos);

	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;

	        default:
	          var n = +ch;
	          if (n === 0) return match;

	          if (n > m) {
	            var f = floor$3(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }

	          capture = captures[n - 1];
	      }

	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	_fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
	  return [function search(regexp) {
	    var O = defined(this);
	    var fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, function (regexp) {
	    var res = maybeCallNative($search, regexp, this);
	    if (res.done) return res.value;
	    var rx = _anObject(regexp);
	    var S = String(this);
	    var previousLastIndex = rx.lastIndex;
	    if (!_sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	    var result = _regexpExecAbstract(rx, S);
	    if (!_sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	    return result === null ? -1 : result.index;
	  }];
	});

	var SPECIES$3 = _wks('species');

	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES$3]) == undefined ? D : _aFunction(S);
	};

	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX$1 = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;
	var SUPPORTS_Y = !_fails(function () {
	});

	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;

	  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
	    internalSplit = function internalSplit(separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      if (!_isRegexp(separator)) return $split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;

	      while (match = _regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX$1];

	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }

	        if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++;
	      }

	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));

	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function internalSplit(separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }

	  return [function split(separator, limit) {
	    var O = defined(this);
	    var splitter = separator == undefined ? undefined : separator[SPLIT];
	    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
	  }, function (regexp, limit) {
	    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	    if (res.done) return res.value;
	    var rx = _anObject(regexp);
	    var S = String(this);
	    var C = _speciesConstructor(rx, RegExp);
	    var unicodeMatching = rx.unicode;
	    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g');
	    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	    if (lim === 0) return [];
	    if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
	    var p = 0;
	    var q = 0;
	    var A = [];

	    while (q < S.length) {
	      splitter.lastIndex = SUPPORTS_Y ? q : 0;
	      var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	      var e;

	      if (z === null || (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
	        q = _advanceStringIndex(S, q, unicodeMatching);
	      } else {
	        A.push(S.slice(p, q));
	        if (A.length === lim) return A;

	        for (var i = 1; i <= z.length - 1; i++) {
	          A.push(z[i]);
	          if (A.length === lim) return A;
	        }

	        q = p = e;
	      }
	    }

	    A.push(S.slice(p));
	    return A;
	  }];
	});

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
	    throw TypeError(name + ': incorrect invocation!');
	  }

	  return it;
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};

	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () {
	    return iterable;
	  } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};

	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	var process = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function run() {
	  var id = +this;

	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var listener = function listener(event) {
	  run.call(event.data);
	};

	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;

	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }

	    queue[++counter] = function () {
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };

	    defer(counter);
	    return counter;
	  };

	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };

	  if (_cof(process) == 'process') {
	    defer = function defer(id) {
	      process.nextTick(_ctx(run, id, 1));
	    };
	  } else if (Dispatch && Dispatch.now) {
	    defer = function defer(id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function defer(id) {
	      _global.postMessage(id + '', '*');
	    };

	    _global.addEventListener('message', listener, false);
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function defer(id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  } else {
	    defer = function defer(id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}

	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;

	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$1 = _global.process;
	var Promise$1 = _global.Promise;
	var isNode = _cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function flush() {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();

	    while (head) {
	      fn = head.fn;
	      head = head.next;

	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();else last = undefined;
	        throw e;
	      }
	    }

	    last = undefined;
	    if (parent) parent.enter();
	  };

	  if (isNode) {
	    notify = function notify() {
	      process$1.nextTick(flush);
	    };
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, {
	      characterData: true
	    });

	    notify = function notify() {
	      node.data = toggle = !toggle;
	    };
	  } else if (Promise$1 && Promise$1.resolve) {
	    var promise = Promise$1.resolve(undefined);

	    notify = function notify() {
	      promise.then(flush);
	    };
	  } else {
	    notify = function notify() {
	      macrotask.call(_global, flush);
	    };
	  }

	  return function (fn) {
	    var task = {
	      fn: fn,
	      next: undefined
	    };
	    if (last) last.next = task;

	    if (!head) {
	      head = task;
	      notify();
	    }

	    last = task;
	  };
	};

	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$7
	};

	var _perform = function (exec) {
	  try {
	    return {
	      e: false,
	      v: exec()
	    };
	  } catch (e) {
	    return {
	      e: true,
	      v: e
	    };
	  }
	};

	var navigator = _global.navigator;
	var _userAgent = navigator && navigator.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) {
	    _redefine(target, key, src[key], safe);
	  }

	  return target;
	};

	var task = _task.set;

	var microtask = _microtask();









	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$2 = _global.process;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$2) == 'process';

	var empty = function empty() {};

	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;
	var USE_NATIVE$1 = !!function () {
	  try {
	    var promise = $Promise.resolve(1);

	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };

	    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise && v8.indexOf('6.6') !== 0 && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) {}
	}();

	var isThenable = function isThenable(it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify = function notify(promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;

	    var run = function run(reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;

	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }

	          if (handler === true) result = value;else {
	            if (domain) domain.enter();
	            result = handler(value);

	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }

	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };

	    while (chain.length > i) {
	      run(chain[i++]);
	    }

	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};

	var onUnhandled = function onUnhandled(promise) {
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;

	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({
	            promise: promise,
	            reason: value
	          });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    }

	    promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};

	var isUnhandled = function isUnhandled(promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};

	var onHandleUnhandled = function onHandleUnhandled(promise) {
	  task.call(_global, function () {
	    var handler;

	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
	      handler({
	        promise: promise,
	        reason: promise._v
	      });
	    }
	  });
	};

	var $reject = function $reject(value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise;
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};

	var $resolve = function $resolve(value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise;

	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");

	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = {
	          _w: promise,
	          _d: false
	        };

	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({
	      _w: promise,
	      _d: false
	    }, e);
	  }
	};

	if (!USE_NATIVE$1) {
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);

	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };

	  Internal = function Promise(executor) {
	    this._c = [];
	    this._a = undefined;
	    this._s = 0;
	    this._d = false;
	    this._v = undefined;
	    this._h = 0;
	    this._n = false;
	  };

	  Internal.prototype = _redefineAll($Promise.prototype, {
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;

	      this._c.push(reaction);

	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    'catch': function _catch(onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });

	  OwnPromiseCapability = function OwnPromiseCapability() {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };

	  _newPromiseCapability.f = newPromiseCapability = function newPromiseCapability(C) {
	    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, {
	  Promise: $Promise
	});

	_setToStringTag($Promise, PROMISE);

	_setSpecies(PROMISE);

	Wrapper = _core[PROMISE];
	_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (!USE_NATIVE$1), PROMISE, {
	  resolve: function resolve(x) {
	    return _promiseResolve(this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$5 = _objectDp.f;



















	var fastKey = _meta.fastKey;



	var SIZE = _descriptors ? '_s' : 'size';

	var getEntry = function getEntry(that, key) {
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];

	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;
	      that._i = _objectCreate(null);
	      that._f = undefined;
	      that._l = undefined;
	      that[SIZE] = 0;
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      clear: function clear() {
	        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }

	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      'delete': function _delete(key) {
	        var that = _validateCollection(this, NAME);
	        var entry = getEntry(that, key);

	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        }

	        return !!entry;
	      },
	      forEach: function forEach(callbackfn) {
	        _validateCollection(this, NAME);
	        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;

	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);

	          while (entry && entry.r) {
	            entry = entry.p;
	          }
	        }
	      },
	      has: function has(key) {
	        return !!getEntry(_validateCollection(this, NAME), key);
	      }
	    });
	    if (_descriptors) dP$5(C.prototype, 'size', {
	      get: function get() {
	        return _validateCollection(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;

	    if (entry) {
	      entry.v = value;
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true),
	        k: key,
	        v: value,
	        p: prev = that._l,
	        n: undefined,
	        r: false
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      if (index !== 'F') that._i[index] = entry;
	    }

	    return that;
	  },
	  getEntry: getEntry,
	  setStrong: function setStrong(C, NAME, IS_MAP) {
	    _iterDefine(C, NAME, function (iterated, kind) {
	      this._t = _validateCollection(iterated, NAME);
	      this._k = kind;
	      this._l = undefined;
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;

	      while (entry && entry.r) {
	        entry = entry.p;
	      }

	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        that._t = undefined;
	        return _iterStep(1);
	      }

	      if (kind == 'keys') return _iterStep(0, entry.k);
	      if (kind == 'values') return _iterStep(0, entry.v);
	      return _iterStep(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
	    _setSpecies(NAME);
	  }
	};

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};

	  var fixMethod = function fixMethod(KEY) {
	    var fn = proto[KEY];
	    _redefine(proto, KEY, KEY == 'delete' ? function (a) {
	      return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'has' ? function has(a) {
	      return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'get' ? function get(a) {
	      return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'add' ? function add(a) {
	      fn.call(this, a === 0 ? 0 : a);
	      return this;
	    } : function set(a, b) {
	      fn.call(this, a === 0 ? 0 : a, b);
	      return this;
	    });
	  };

	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    var instance = new C();
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    var THROWS_ON_PRIMITIVES = _fails(function () {
	      instance.has(1);
	    });
	    var ACCEPT_ITERABLES = _iterDetect(function (iter) {
	      new C(iter);
	    });
	    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
	      var $instance = new C();
	      var index = 5;

	      while (index--) {
	        $instance[ADDER](index, index);
	      }

	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        _anInstance(target, C, NAME);
	        var that = _inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  _setToStringTag(C, NAME);
	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F * (C != Base), O);
	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
	  return C;
	};

	var MAP = 'Map';
	var es6_map = _collection(MAP, function (get) {
	  return function Map() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  get: function get(key) {
	    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
	    return entry && entry.v;
	  },
	  set: function set(key, value) {
	    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, _collectionStrong, true);

	var SET = 'Set';
	var es6_set = _collection(SET, function (get) {
	  return function Set() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  add: function add(value) {
	    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, _collectionStrong);

	var getWeak = _meta.getWeak;















	var arrayFind = _arrayMethods(5);
	var arrayFindIndex = _arrayMethods(6);
	var id$1 = 0;

	var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};

	var UncaughtFrozenStore = function UncaughtFrozenStore() {
	  this.a = [];
	};

	var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};

	UncaughtFrozenStore.prototype = {
	  get: function get(key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function has(key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function set(key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;else this.a.push([key, value]);
	  },
	  'delete': function _delete(key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	var _collectionWeak = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;
	      that._i = id$1++;
	      that._l = undefined;
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      'delete': function _delete(key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
	        return data && _has(data, this._i) && delete data[this._i];
	      },
	      has: function has(key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
	        return data && _has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    var data = getWeak(_anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

	var es6_weakMap = createCommonjsModule(function (module) {



	var each = _arrayMethods(0);













	var NATIVE_WEAK_MAP = _validateCollection;

	var IS_IE11 = !_global.ActiveXObject && 'ActiveXObject' in _global;
	var WEAK_MAP = 'WeakMap';
	var getWeak = _meta.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = _collectionWeak.ufstore;
	var InternalMap;

	var wrapper = function wrapper(get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  get: function get(key) {
	    if (_isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  set: function set(key, value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
	  }
	};

	var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

	if (NATIVE_WEAK_MAP && IS_IE11) {
	  InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
	  _objectAssign(InternalMap.prototype, methods);
	  _meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    _redefine(proto, key, function (a, b) {
	      if (_isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();

	        var result = this._f[key](a, b);

	        return key == 'set' ? this : result;
	      }

	      return method.call(this, a, b);
	    });
	  });
	}
	});

	var WEAK_SET = 'WeakSet';

	_collection(WEAK_SET, function (get) {
	  return function WeakSet() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  add: function add(value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
	  }
	}, _collectionWeak, false, true);

	var TYPED = _uid('typed_array');
	var VIEW = _uid('view');
	var ABV = !!(_global.ArrayBuffer && _global.DataView);
	var CONSTR = ABV;
	var i$1 = 0;
	var l = 9;
	var Typed;
	var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

	while (i$1 < l) {
	  if (Typed = _global[TypedArrayConstructors[i$1++]]) {
	    _hide(Typed.prototype, TYPED, true);
	    _hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}

	var _typed = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	};

	var _toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = _toInteger(it);
	  var length = _toLength(number);
	  if (number !== length) throw RangeError('Wrong length!');
	  return length;
	};

	var _typedBuffer = createCommonjsModule(function (module, exports) {























	var gOPN = _objectGopn.f;

	var dP = _objectDp.f;





	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE = 'prototype';
	var WRONG_LENGTH = 'Wrong length!';
	var WRONG_INDEX = 'Wrong index!';
	var $ArrayBuffer = _global[ARRAY_BUFFER];
	var $DataView = _global[DATA_VIEW];
	var Math = _global.Math;
	var RangeError = _global.RangeError;
	var Infinity = _global.Infinity;
	var BaseBuffer = $ArrayBuffer;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;
	var BUFFER = 'buffer';
	var BYTE_LENGTH = 'byteLength';
	var BYTE_OFFSET = 'byteOffset';
	var $BUFFER = _descriptors ? '_b' : BUFFER;
	var $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
	var $OFFSET = _descriptors ? '_o' : BYTE_OFFSET;

	function packIEEE754(value, mLen, nBytes) {
	  var buffer = new Array(nBytes);
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
	  var i = 0;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
	  var e, m, c;
	  value = abs(value);

	  if (value != value || value === Infinity) {
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);

	    if (value * (c = pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }

	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }

	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {
	  }

	  e = e << mLen | m;
	  eLen += mLen;

	  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {
	  }

	  buffer[--i] |= s * 128;
	  return buffer;
	}

	function unpackIEEE754(buffer, mLen, nBytes) {
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = eLen - 7;
	  var i = nBytes - 1;
	  var s = buffer[i--];
	  var e = s & 127;
	  var m;
	  s >>= 7;

	  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {
	  }

	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;

	  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {
	  }

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  }

	  return (s ? -1 : 1) * m * pow(2, e - mLen);
	}

	function unpackI32(bytes) {
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	}

	function packI8(it) {
	  return [it & 0xff];
	}

	function packI16(it) {
	  return [it & 0xff, it >> 8 & 0xff];
	}

	function packI32(it) {
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	}

	function packF64(it) {
	  return packIEEE754(it, 52, 8);
	}

	function packF32(it) {
	  return packIEEE754(it, 23, 4);
	}

	function addGetter(C, key, internal) {
	  dP(C[PROTOTYPE], key, {
	    get: function get() {
	      return this[internal];
	    }
	  });
	}

	function get(view, bytes, index, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = _toIndex(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	}

	function set(view, bytes, index, conversion, value, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = _toIndex(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = conversion(+value);

	  for (var i = 0; i < bytes; i++) {
	    store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	  }
	}

	if (!_typed.ABV) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = _toIndex(length);
	    this._b = _arrayFill.call(new Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    _anInstance(this, $DataView, DATA_VIEW);
	    _anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH];
	    var offset = _toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };

	  if (_descriptors) {
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }

	  _redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value) {
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value) {
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if (!_fails(function () {
	    $ArrayBuffer(1);
	  }) || !_fails(function () {
	    new $ArrayBuffer(-1);
	  }) || _fails(function () {
	    new $ArrayBuffer();
	    new $ArrayBuffer(1.5);
	    new $ArrayBuffer(NaN);
	    return $ArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      _anInstance(this, $ArrayBuffer);
	      return new BaseBuffer(_toIndex(length));
	    };

	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];

	    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	      if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
	    }

	    ArrayBufferProto.constructor = $ArrayBuffer;
	  }

	  var view = new $DataView(new $ArrayBuffer(2));
	  var $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if (view.getInt8(0) || !view.getInt8(1)) _redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}

	_setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	_setToStringTag($DataView, DATA_VIEW);
	_hide($DataView[PROTOTYPE], _typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;
	});

	var ArrayBuffer = _global.ArrayBuffer;



	var $ArrayBuffer = _typedBuffer.ArrayBuffer;
	var $DataView = _typedBuffer.DataView;
	var $isView = _typed.ABV && ArrayBuffer.isView;
	var $slice = $ArrayBuffer.prototype.slice;
	var VIEW$1 = _typed.VIEW;
	var ARRAY_BUFFER = 'ArrayBuffer';
	_export(_export.G + _export.W + _export.F * (ArrayBuffer !== $ArrayBuffer), {
	  ArrayBuffer: $ArrayBuffer
	});
	_export(_export.S + _export.F * !_typed.CONSTR, ARRAY_BUFFER, {
	  isView: function isView(it) {
	    return $isView && $isView(it) || _isObject(it) && VIEW$1 in it;
	  }
	});
	_export(_export.P + _export.U + _export.F * _fails(function () {
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  slice: function slice(start, end) {
	    if ($slice !== undefined && end === undefined) return $slice.call(_anObject(this), start);
	    var len = _anObject(this).byteLength;
	    var first = _toAbsoluteIndex(start, len);
	    var fin = _toAbsoluteIndex(end === undefined ? len : end, len);
	    var result = new (_speciesConstructor(this, $ArrayBuffer))(_toLength(fin - first));
	    var viewS = new $DataView(this);
	    var viewT = new $DataView(result);
	    var index = 0;

	    while (first < fin) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    }

	    return result;
	  }
	});

	_setSpecies(ARRAY_BUFFER);

	_export(_export.G + _export.W + _export.F * !_typed.ABV, {
	  DataView: _typedBuffer.DataView
	});

	var _typedArray = createCommonjsModule(function (module) {

	if (_descriptors) {

	  var global = _global;

	  var fails = _fails;

	  var $export = _export;

	  var $typed = _typed;

	  var $buffer = _typedBuffer;

	  var ctx = _ctx;

	  var anInstance = _anInstance;

	  var propertyDesc = _propertyDesc;

	  var hide = _hide;

	  var redefineAll = _redefineAll;

	  var toInteger = _toInteger;

	  var toLength = _toLength;

	  var toIndex = _toIndex;

	  var toAbsoluteIndex = _toAbsoluteIndex;

	  var toPrimitive = _toPrimitive;

	  var has = _has;

	  var classof = _classof;

	  var isObject = _isObject;

	  var toObject = _toObject;

	  var isArrayIter = _isArrayIter;

	  var create = _objectCreate;

	  var getPrototypeOf = _objectGpo;

	  var gOPN = _objectGopn.f;

	  var getIterFn = core_getIteratorMethod;

	  var uid = _uid;

	  var wks = _wks;

	  var createArrayMethod = _arrayMethods;

	  var createArrayIncludes = _arrayIncludes;

	  var speciesConstructor = _speciesConstructor;

	  var ArrayIterators = es6_array_iterator;

	  var Iterators = _iterators;

	  var $iterDetect = _iterDetect;

	  var setSpecies = _setSpecies;

	  var arrayFill = _arrayFill;

	  var arrayCopyWithin = _arrayCopyWithin;

	  var $DP = _objectDp;

	  var $GOPD = _objectGopd;

	  var dP = $DP.f;
	  var gOPD = $GOPD.f;
	  var RangeError = global.RangeError;
	  var TypeError = global.TypeError;
	  var Uint8Array = global.Uint8Array;
	  var ARRAY_BUFFER = 'ArrayBuffer';
	  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var PROTOTYPE = 'prototype';
	  var ArrayProto = Array[PROTOTYPE];
	  var $ArrayBuffer = $buffer.ArrayBuffer;
	  var $DataView = $buffer.DataView;
	  var arrayForEach = createArrayMethod(0);
	  var arrayFilter = createArrayMethod(2);
	  var arraySome = createArrayMethod(3);
	  var arrayEvery = createArrayMethod(4);
	  var arrayFind = createArrayMethod(5);
	  var arrayFindIndex = createArrayMethod(6);
	  var arrayIncludes = createArrayIncludes(true);
	  var arrayIndexOf = createArrayIncludes(false);
	  var arrayValues = ArrayIterators.values;
	  var arrayKeys = ArrayIterators.keys;
	  var arrayEntries = ArrayIterators.entries;
	  var arrayLastIndexOf = ArrayProto.lastIndexOf;
	  var arrayReduce = ArrayProto.reduce;
	  var arrayReduceRight = ArrayProto.reduceRight;
	  var arrayJoin = ArrayProto.join;
	  var arraySort = ArrayProto.sort;
	  var arraySlice = ArrayProto.slice;
	  var arrayToString = ArrayProto.toString;
	  var arrayToLocaleString = ArrayProto.toLocaleString;
	  var ITERATOR = wks('iterator');
	  var TAG = wks('toStringTag');
	  var TYPED_CONSTRUCTOR = uid('typed_constructor');
	  var DEF_CONSTRUCTOR = uid('def_constructor');
	  var ALL_CONSTRUCTORS = $typed.CONSTR;
	  var TYPED_ARRAY = $typed.TYPED;
	  var VIEW = $typed.VIEW;
	  var WRONG_LENGTH = 'Wrong length!';
	  var $map = createArrayMethod(1, function (O, length) {
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });
	  var LITTLE_ENDIAN = fails(function () {
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });
	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
	    new Uint8Array(1).set({});
	  });

	  var toOffset = function toOffset(it, BYTES) {
	    var offset = toInteger(it);
	    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
	    return offset;
	  };

	  var validate = function validate(it) {
	    if (isObject(it) && TYPED_ARRAY in it) return it;
	    throw TypeError(it + ' is not a typed array!');
	  };

	  var allocate = function allocate(C, length) {
	    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError('It is not a typed array constructor!');
	    }

	    return new C(length);
	  };

	  var speciesFromList = function speciesFromList(O, list) {
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function fromList(C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = allocate(C, length);

	    while (length > index) {
	      result[index] = list[index++];
	    }

	    return result;
	  };

	  var addGetter = function addGetter(it, key, internal) {
	    dP(it, key, {
	      get: function get() {
	        return this._d[internal];
	      }
	    });
	  };

	  var $from = function from(source) {
	    var O = toObject(source);
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var iterFn = getIterFn(O);
	    var i, length, values, result, step, iterator;

	    if (iterFn != undefined && !isArrayIter(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      }

	      O = values;
	    }

	    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);

	    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }

	    return result;
	  };

	  var $of = function of() {
	    var index = 0;
	    var length = arguments.length;
	    var result = allocate(this, length);

	    while (length > index) {
	      result[index] = arguments[index++];
	    }

	    return result;
	  };

	  var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
	    arrayToLocaleString.call(new Uint8Array(1));
	  });

	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto = {
	    copyWithin: function copyWithin(target, start) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value) {
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) {
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement) {
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn) {
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn) {
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this;
	      var length = validate(that).length;
	      var middle = Math.floor(length / 2);
	      var index = 0;
	      var value;

	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      }

	      return that;
	    },
	    some: function some(callbackfn) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this);
	      var length = O.length;
	      var $begin = toAbsoluteIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin));
	    }
	  };

	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1);
	    var length = this.length;
	    var src = toObject(arrayLike);
	    var len = toLength(src.length);
	    var index = 0;
	    if (len + offset > length) throw RangeError(WRONG_LENGTH);

	    while (index < len) {
	      this[offset + index] = src[index++];
	    }
	  };

	  var $iterators = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function isTAIndex(target, key) {
	    return isObject(target) && target[TYPED_ARRAY] && typeof key != 'symbol' && key in target && String(+key) == String(key);
	  };

	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
	  };

	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set') && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
	      target[key] = desc.value;
	      return target;
	    }

	    return dP(target, key, desc);
	  };

	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }

	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });

	  if (fails(function () {
	    arrayToString.call({});
	  })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }

	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function constructor() {},
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function get() {
	      return this[TYPED_ARRAY];
	    }
	  });

	  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + KEY;
	    var SETTER = 'set' + KEY;
	    var TypedArray = global[NAME];
	    var Base = TypedArray || {};
	    var TAC = TypedArray && getPrototypeOf(TypedArray);
	    var FORCED = !TypedArray || !$typed.ABV;
	    var O = {};
	    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];

	    var getter = function getter(that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };

	    var setter = function setter(that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };

	    var addElement = function addElement(that, index) {
	      dP(that, index, {
	        get: function get() {
	          return getter(this, index);
	        },
	        set: function set(value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };

	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME, '_d');
	        var index = 0;
	        var offset = 0;
	        var buffer, byteLength, length, klass;

	        if (!isObject(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;

	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
	          }

	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }

	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });

	        while (index < length) {
	          addElement(that, index++);
	        }
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!fails(function () {
	      TypedArray(1);
	    }) || !fails(function () {
	      new TypedArray(-1);
	    }) || !$iterDetect(function (iter) {
	      new TypedArray();
	      new TypedArray(null);
	      new TypedArray(1.5);
	      new TypedArray(iter);
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        if (!isObject(data)) return new Base(toIndex(data));

	        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
	        }

	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
	        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      TypedArrayPrototype.constructor = TypedArray;
	    }

	    var $nativeIterator = TypedArrayPrototype[ITERATOR];
	    var CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
	    var $iterator = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP(TypedArrayPrototype, TAG, {
	        get: function get() {
	          return NAME;
	        }
	      });
	    }

	    O[NAME] = TypedArray;
	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES
	    });
	    $export($export.S + $export.F * fails(function () {
	      Base.of.call(TypedArray, 1);
	    }), NAME, {
	      from: $from,
	      of: $of
	    });
	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
	    $export($export.P, NAME, proto);
	    setSpecies(NAME);
	    $export($export.P + $export.F * FORCED_SET, NAME, {
	      set: $set
	    });
	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
	    if (TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;
	    $export($export.P + $export.F * fails(function () {
	      new TypedArray(1).slice();
	    }), NAME, {
	      slice: $slice
	    });
	    $export($export.P + $export.F * (fails(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, {
	      toLocaleString: $toLocaleString
	    });
	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function () {};
	});

	_typedArray('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

	_typedArray('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var rApply = (_global.Reflect || {}).apply;
	var fApply = Function.apply;
	_export(_export.S + _export.F * !_fails(function () {
	  rApply(function () {});
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    var T = _aFunction(target);
	    var L = _anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

	var rConstruct = (_global.Reflect || {}).construct;
	var NEW_TARGET_BUG = _fails(function () {
	  function F() {}

	  return !(rConstruct(function () {}, [], F) instanceof F);
	});
	var ARGS_BUG = !_fails(function () {
	  rConstruct(function () {});
	});
	_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args) {
	    _aFunction(Target);
	    _anObject(args);
	    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);

	    if (Target == newTarget) {
	      switch (args.length) {
	        case 0:
	          return new Target();

	        case 1:
	          return new Target(args[0]);

	        case 2:
	          return new Target(args[0], args[1]);

	        case 3:
	          return new Target(args[0], args[1], args[2]);

	        case 4:
	          return new Target(args[0], args[1], args[2], args[3]);
	      }

	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (_bind.apply(Target, $args))();
	    }

	    var proto = newTarget.prototype;
	    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return _isObject(result) ? result : instance;
	  }
	});

	_export(_export.S + _export.F * _fails(function () {
	  Reflect.defineProperty(_objectDp.f({}, 1, {
	    value: 1
	  }), 1, {
	    value: 2
	  });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    _anObject(target);
	    propertyKey = _toPrimitive(propertyKey, true);
	    _anObject(attributes);

	    try {
	      _objectDp.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	var gOPD$3 = _objectGopd.f;



	_export(_export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD$3(_anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

	var Enumerate = function Enumerate(iterated) {
	  this._t = _anObject(iterated);
	  this._i = 0;
	  var keys = this._k = [];
	  var key;

	  for (key in iterated) {
	    keys.push(key);
	  }
	};

	_iterCreate(Enumerate, 'Object', function () {
	  var that = this;
	  var keys = that._k;
	  var key;

	  do {
	    if (that._i >= keys.length) return {
	      value: undefined,
	      done: true
	    };
	  } while (!((key = keys[that._i++]) in that._t));

	  return {
	    value: key,
	    done: false
	  };
	});

	_export(_export.S, 'Reflect', {
	  enumerate: function enumerate(target) {
	    return new Enumerate(target);
	  }
	});

	function get(target, propertyKey) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var desc, proto;
	  if (_anObject(target) === receiver) return target[propertyKey];
	  if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
	  if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
	}

	_export(_export.S, 'Reflect', {
	  get: get
	});

	_export(_export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return _objectGopd.f(_anObject(target), propertyKey);
	  }
	});

	_export(_export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return _objectGpo(_anObject(target));
	  }
	});

	_export(_export.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});

	var $isExtensible = Object.isExtensible;
	_export(_export.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    _anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

	var Reflect$1 = _global.Reflect;

	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = _objectGopn.f(_anObject(it));
	  var getSymbols = _objectGops.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	_export(_export.S, 'Reflect', {
	  ownKeys: _ownKeys
	});

	var $preventExtensions = Object.preventExtensions;
	_export(_export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    _anObject(target);

	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	function set(target, propertyKey, V) {
	  var receiver = arguments.length < 4 ? target : arguments[3];
	  var ownDesc = _objectGopd.f(_anObject(target), propertyKey);
	  var existingDescriptor, proto;

	  if (!ownDesc) {
	    if (_isObject(proto = _objectGpo(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }

	    ownDesc = _propertyDesc(0);
	  }

	  if (_has(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !_isObject(receiver)) return false;

	    if (existingDescriptor = _objectGopd.f(receiver, propertyKey)) {
	      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
	      existingDescriptor.value = V;
	      _objectDp.f(receiver, propertyKey, existingDescriptor);
	    } else _objectDp.f(receiver, propertyKey, _propertyDesc(0, V));

	    return true;
	  }

	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	_export(_export.S, 'Reflect', {
	  set: set
	});

	if (_setProto) _export(_export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    _setProto.check(target, proto);

	    try {
	      _setProto.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	var includes = _core.Array.includes;

	var _stringPad = function (that, maxLength, fillString, left) {
	  var S = String(_defined(that));
	  var stringLength = S.length;
	  var fillStr = fillString === undefined ? ' ' : String(fillString);
	  var intMaxLength = _toLength(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength;
	  var stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

	var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);
	_export(_export.P + _export.F * WEBKIT_BUG, 'String', {
	  padStart: function padStart(maxLength) {
	    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

	var padStart = _core.String.padStart;

	var WEBKIT_BUG$1 = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);
	_export(_export.P + _export.F * WEBKIT_BUG$1, 'String', {
	  padEnd: function padEnd(maxLength) {
	    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

	var padEnd = _core.String.padEnd;

	_wksDefine('asyncIterator');

	var asyncIterator = _wksExt.f('asyncIterator');

	_export(_export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = _toIobject(object);
	    var getDesc = _objectGopd.f;
	    var keys = _ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;

	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) _createProperty(result, key, desc);
	    }

	    return result;
	  }
	});

	var getOwnPropertyDescriptors = _core.Object.getOwnPropertyDescriptors;

	var isEnum$1 = _objectPie.f;

	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;

	    while (length > i) {
	      if (isEnum$1.call(O, key = keys[i++])) {
	        result.push(isEntries ? [key, O[key]] : O[key]);
	      }
	    }

	    return result;
	  };
	};

	var $values = _objectToArray(false);

	_export(_export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	var values = _core.Object.values;

	var $entries = _objectToArray(true);

	_export(_export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	var entries = _core.Object.entries;

	_export(_export.P + _export.R, 'Promise', {
	  'finally': function _finally(onFinally) {
	    var C = _speciesConstructor(this, _core.Promise || _global.Promise);
	    var isFunction = typeof onFinally == 'function';
	    return this.then(isFunction ? function (x) {
	      return _promiseResolve(C, onFinally()).then(function () {
	        return x;
	      });
	    } : onFinally, isFunction ? function (e) {
	      return _promiseResolve(C, onFinally()).then(function () {
	        throw e;
	      });
	    } : onFinally);
	  }
	});

	var _finally = _core.Promise['finally'];

	var slice = [].slice;
	var MSIE = /MSIE .\./.test(_userAgent);

	var wrap$1 = function wrap(set) {
	  return function (fn, time) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : false;
	    return set(boundArgs ? function () {
	      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
	    } : fn, time);
	  };
	};

	_export(_export.G + _export.B + _export.F * MSIE, {
	  setTimeout: wrap$1(_global.setTimeout),
	  setInterval: wrap$1(_global.setInterval)
	});

	_export(_export.G + _export.B, {
	  setImmediate: _task.set,
	  clearImmediate: _task.clear
	});

	var ITERATOR$4 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;
	var DOMIterables = {
	  CSSRuleList: true,
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true,
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true,
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i$2 = 0; i$2 < collections.length; i$2++) {
	  var NAME$1 = collections[i$2];
	  var explicit = DOMIterables[NAME$1];
	  var Collection = _global[NAME$1];
	  var proto$3 = Collection && Collection.prototype;
	  var key$1;

	  if (proto$3) {
	    if (!proto$3[ITERATOR$4]) _hide(proto$3, ITERATOR$4, ArrayValues);
	    if (!proto$3[TO_STRING_TAG]) _hide(proto$3, TO_STRING_TAG, NAME$1);
	    _iterators[NAME$1] = ArrayValues;
	    if (explicit) for (key$1 in es6_array_iterator) {
	      if (!proto$3[key$1]) _redefine(proto$3, key$1, es6_array_iterator[key$1], true);
	    }
	  }
	}

	var runtime = createCommonjsModule(function (module) {
	!function (global) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined;
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	  var runtime = global.regeneratorRuntime;

	  if (runtime) {
	    {
	      module.exports = runtime;
	    }

	    return;
	  }

	  runtime = global.regeneratorRuntime = module.exports;

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	    return generator;
	  }

	  runtime.wrap = wrap;

	  function tryCatch(fn, obj, arg) {
	    try {
	      return {
	        type: "normal",
	        arg: fn.call(obj, arg)
	      };
	    } catch (err) {
	      return {
	        type: "throw",
	        arg: err
	      };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	  var ContinueSentinel = {};

	  function Generator() {}

	  function GeneratorFunction() {}

	  function GeneratorFunctionPrototype() {}

	  var IteratorPrototype = {};

	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

	  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      prototype[method] = function (arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function (genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	  };

	  runtime.mark = function (genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;

	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }

	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  runtime.awrap = function (arg) {
	    return {
	      __await: arg
	    };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);

	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;

	        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function (value) {
	            invoke("next", value, resolve, reject);
	          }, function (err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function (unwrapped) {
	          result.value = unwrapped;
	          resolve(result);
	        }, function (error) {
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function (resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	    }

	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };

	  runtime.AsyncIterator = AsyncIterator;

	  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
	    return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;

	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);

	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          context.sent = context._sent = context.arg;
	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);
	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;
	        var record = tryCatch(innerFn, self, context);

	        if (record.type === "normal") {
	          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];

	    if (method === undefined) {
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError("The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (!info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      context[delegate.resultName] = info.value;
	      context.next = delegate.nextLoc;

	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }
	    } else {
	      return info;
	    }

	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  defineIteratorMethods(Gp);
	  Gp[toStringTagSymbol] = "Generator";

	  Gp[iteratorSymbol] = function () {
	    return this;
	  };

	  Gp.toString = function () {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = {
	      tryLoc: locs[0]
	    };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    this.tryEntries = [{
	      tryLoc: "root"
	    }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function (object) {
	    var keys = [];

	    for (var key in object) {
	      keys.push(key);
	    }

	    keys.reverse();
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();

	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];

	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1,
	            next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;
	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    return {
	      next: doneResult
	    };
	  }

	  runtime.values = values;

	  function doneResult() {
	    return {
	      value: undefined,
	      done: true
	    };
	  }

	  Context.prototype = {
	    constructor: Context,
	    reset: function reset(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	      this.method = "next";
	      this.arg = undefined;
	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	    stop: function stop() {
	      this.done = true;
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;

	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },
	    dispatchException: function dispatchException(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;

	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	    abrupt: function abrupt(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];

	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },
	    complete: function complete(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" || record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },
	    finish: function finish(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];

	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	    "catch": function _catch(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];

	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;

	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }

	          return thrown;
	        }
	      }

	      throw new Error("illegal catch attempt");
	    },
	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };
	}(function () {
	  return this || typeof self === "object" && self;
	}() || Function("return this")());
	});

	if (commonjsGlobal._babelPolyfill && typeof console !== "undefined" && console.warn) {
	  console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " + "and may have consequences if different versions of the polyfills are applied sequentially. " + "If you do need to load the polyfill more than once, use @babel/polyfill/noConflict " + "instead to bypass the warning.");
	}

	commonjsGlobal._babelPolyfill = true;

	!function (e, t) {

	  function n() {
	    var e = A.splice(0, A.length);

	    for (Ye = 0; e.length;) {
	      e.shift().call(null, e.shift());
	    }
	  }

	  function r(e, t) {
	    for (var n = 0, r = e.length; n < r; n++) {
	      T(e[n], t);
	    }
	  }

	  function o(e) {
	    for (var t, n = 0, r = e.length; n < r; n++) {
	      t = e[n], V(t, le[a(t)]);
	    }
	  }

	  function l(e) {
	    return function (t) {
	      ke(t) && (T(t, e), ae.length && r(t.querySelectorAll(ae), e));
	    };
	  }

	  function a(e) {
	    var t = Ze.call(e, "is"),
	        n = e.nodeName.toUpperCase(),
	        r = ue.call(oe, t ? te + t.toUpperCase() : ee + n);
	    return t && -1 < r && !i(n, t) ? -1 : r;
	  }

	  function i(e, t) {
	    return -1 < ae.indexOf(e + '[is="' + t + '"]');
	  }

	  function u(e) {
	    var t = e.currentTarget,
	        n = e.attrChange,
	        r = e.attrName,
	        o = e.target,
	        l = e[$] || 2,
	        a = e[Q] || 3;
	    !ot || o && o !== t || !t[Z] || "style" === r || e.prevValue === e.newValue && ("" !== e.newValue || n !== l && n !== a) || t[Z](r, n === l ? null : e.prevValue, n === a ? null : e.newValue);
	  }

	  function c(e) {
	    var t = l(e);
	    return function (e) {
	      A.push(t, e.target), Ye && clearTimeout(Ye), Ye = setTimeout(n, 1);
	    };
	  }

	  function s(e) {
	    rt && (rt = !1, e.currentTarget.removeEventListener(Y, s)), ae.length && r((e.target || y).querySelectorAll(ae), e.detail === q ? q : _), Re && d();
	  }

	  function m(e, t) {
	    var n = this;
	    ze.call(n, e, t), O.call(n, {
	      target: n
	    });
	  }

	  function f(e, t, n) {
	    var r = t.apply(e, n),
	        l = a(r);
	    return -1 < l && V(r, le[l]), n.pop() && ae.length && o(r.querySelectorAll(ae)), r;
	  }

	  function p(e, t) {
	    Fe(e, t), I ? I.observe(e, Qe) : (nt && (e.setAttribute = m, e[U] = D(e), e[k](J, O)), e[k](W, u)), e[K] && ot && (e.created = !0, e[K](), e.created = !1);
	  }

	  function d() {
	    for (var e, t = 0, n = _e.length; t < n; t++) {
	      e = _e[t], ie.contains(e) || (n--, _e.splice(t--, 1), T(e, q));
	    }
	  }

	  function h(e) {
	    throw new Error("A " + e + " type is already registered");
	  }

	  function T(e, t) {
	    var n,
	        r,
	        o = a(e);
	    -1 < o && (S(e, le[o]), o = 0, t !== _ || e[_] ? t !== q || e[q] || (e[_] = !1, e[q] = !0, r = "disconnected", o = 1) : (e[q] = !1, e[_] = !0, r = "connected", o = 1, Re && ue.call(_e, e) < 0 && _e.push(e)), o && (n = e[t + x] || e[r + x]) && n.call(e));
	  }

	  function L() {}

	  function M(e, t, n) {
	    var r = n && n[B] || "",
	        o = t.prototype,
	        l = Ie(o),
	        a = t.observedAttributes || pe,
	        i = {
	      prototype: l
	    };
	    Ue(l, K, {
	      value: function value() {
	        if (we) we = !1;else if (!this[ve]) {
	          this[ve] = !0, new t(this), o[K] && o[K].call(this);
	          var e = Ae[Ne.get(t)];
	          (!ge || e.create.length > 1) && H(this);
	        }
	      }
	    }), Ue(l, Z, {
	      value: function value(e) {
	        -1 < ue.call(a, e) && o[Z] && o[Z].apply(this, arguments);
	      }
	    }), o[G] && Ue(l, j, {
	      value: o[G]
	    }), o[z] && Ue(l, X, {
	      value: o[z]
	    }), r && (i[B] = r), e = e.toUpperCase(), Ae[e] = {
	      constructor: t,
	      create: r ? [r, De(e)] : [e]
	    }, Ne.set(t, e), y[R](e.toLowerCase(), i), g(e), Oe[e].r();
	  }

	  function E(e) {
	    var t = Ae[e.toUpperCase()];
	    return t && t.constructor;
	  }

	  function v(e) {
	    return "string" == typeof e ? e : e && e.is || "";
	  }

	  function H(e) {
	    for (var t, n = e[Z], r = n ? e.attributes : pe, o = r.length; o--;) {
	      t = r[o], n.call(e, t.name || t.nodeName, null, t.value || t.nodeValue);
	    }
	  }

	  function g(e) {
	    return e = e.toUpperCase(), e in Oe || (Oe[e] = {}, Oe[e].p = new Ce(function (t) {
	      Oe[e].r = t;
	    })), Oe[e].p;
	  }

	  function b() {
	    He && delete e.customElements, fe(e, "customElements", {
	      configurable: !0,
	      value: new L()
	    }), fe(e, "CustomElementRegistry", {
	      configurable: !0,
	      value: L
	    });

	    for (var t = w.get(/^HTML[A-Z]*[a-z]/), n = t.length; n--; function (t) {
	      var n = e[t];

	      if (n) {
	        e[t] = function (e) {
	          var t, r;
	          return e || (e = this), e[ve] || (we = !0, t = Ae[Ne.get(e.constructor)], r = ge && 1 === t.create.length, e = r ? Reflect.construct(n, pe, t.constructor) : y.createElement.apply(y, t.create), e[ve] = !0, we = !1, r || H(e)), e;
	        }, e[t].prototype = n.prototype;

	        try {
	          n.prototype.constructor = e[t];
	        } catch (r) {
	          fe(n, ve, {
	            value: e[t]
	          });
	        }
	      }
	    }(t[n])) {
	    }

	    y.createElement = function (e, t) {
	      var n = v(t);
	      return n ? $e.call(this, e, De(n)) : $e.call(this, e);
	    }, Je || (tt = !0, y[R](""));
	  }

	  var y = e.document,
	      C = e.Object,
	      w = function (e) {
	    var t,
	        n,
	        r,
	        o,
	        l = /^[A-Z]+[a-z]/,
	        a = function a(e) {
	      var t,
	          n = [];

	      for (t in u) {
	        e.test(t) && n.push(t);
	      }

	      return n;
	    },
	        i = function i(e, t) {
	      (t = t.toLowerCase()) in u || (u[e] = (u[e] || []).concat(t), u[t] = u[t.toUpperCase()] = e);
	    },
	        u = (C.create || C)(null),
	        c = {};

	    for (n in e) {
	      for (o in e[n]) {
	        for (r = e[n][o], u[o] = r, t = 0; t < r.length; t++) {
	          u[r[t].toLowerCase()] = u[r[t].toUpperCase()] = o;
	        }
	      }
	    }

	    return c.get = function (e) {
	      return "string" == typeof e ? u[e] || (l.test(e) ? [] : "") : a(e);
	    }, c.set = function (e, t) {
	      return l.test(e) ? i(e, t) : i(t, e), c;
	    }, c;
	  }({
	    collections: {
	      HTMLAllCollection: ["all"],
	      HTMLCollection: ["forms"],
	      HTMLFormControlsCollection: ["elements"],
	      HTMLOptionsCollection: ["options"]
	    },
	    elements: {
	      Element: ["element"],
	      HTMLAnchorElement: ["a"],
	      HTMLAppletElement: ["applet"],
	      HTMLAreaElement: ["area"],
	      HTMLAttachmentElement: ["attachment"],
	      HTMLAudioElement: ["audio"],
	      HTMLBRElement: ["br"],
	      HTMLBaseElement: ["base"],
	      HTMLBodyElement: ["body"],
	      HTMLButtonElement: ["button"],
	      HTMLCanvasElement: ["canvas"],
	      HTMLContentElement: ["content"],
	      HTMLDListElement: ["dl"],
	      HTMLDataElement: ["data"],
	      HTMLDataListElement: ["datalist"],
	      HTMLDetailsElement: ["details"],
	      HTMLDialogElement: ["dialog"],
	      HTMLDirectoryElement: ["dir"],
	      HTMLDivElement: ["div"],
	      HTMLDocument: ["document"],
	      HTMLElement: ["element", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "cite", "code", "command", "dd", "dfn", "dt", "em", "figcaption", "figure", "footer", "header", "i", "kbd", "mark", "nav", "noscript", "rp", "rt", "ruby", "s", "samp", "section", "small", "strong", "sub", "summary", "sup", "u", "var", "wbr"],
	      HTMLEmbedElement: ["embed"],
	      HTMLFieldSetElement: ["fieldset"],
	      HTMLFontElement: ["font"],
	      HTMLFormElement: ["form"],
	      HTMLFrameElement: ["frame"],
	      HTMLFrameSetElement: ["frameset"],
	      HTMLHRElement: ["hr"],
	      HTMLHeadElement: ["head"],
	      HTMLHeadingElement: ["h1", "h2", "h3", "h4", "h5", "h6"],
	      HTMLHtmlElement: ["html"],
	      HTMLIFrameElement: ["iframe"],
	      HTMLImageElement: ["img"],
	      HTMLInputElement: ["input"],
	      HTMLKeygenElement: ["keygen"],
	      HTMLLIElement: ["li"],
	      HTMLLabelElement: ["label"],
	      HTMLLegendElement: ["legend"],
	      HTMLLinkElement: ["link"],
	      HTMLMapElement: ["map"],
	      HTMLMarqueeElement: ["marquee"],
	      HTMLMediaElement: ["media"],
	      HTMLMenuElement: ["menu"],
	      HTMLMenuItemElement: ["menuitem"],
	      HTMLMetaElement: ["meta"],
	      HTMLMeterElement: ["meter"],
	      HTMLModElement: ["del", "ins"],
	      HTMLOListElement: ["ol"],
	      HTMLObjectElement: ["object"],
	      HTMLOptGroupElement: ["optgroup"],
	      HTMLOptionElement: ["option"],
	      HTMLOutputElement: ["output"],
	      HTMLParagraphElement: ["p"],
	      HTMLParamElement: ["param"],
	      HTMLPictureElement: ["picture"],
	      HTMLPreElement: ["pre"],
	      HTMLProgressElement: ["progress"],
	      HTMLQuoteElement: ["blockquote", "q", "quote"],
	      HTMLScriptElement: ["script"],
	      HTMLSelectElement: ["select"],
	      HTMLShadowElement: ["shadow"],
	      HTMLSlotElement: ["slot"],
	      HTMLSourceElement: ["source"],
	      HTMLSpanElement: ["span"],
	      HTMLStyleElement: ["style"],
	      HTMLTableCaptionElement: ["caption"],
	      HTMLTableCellElement: ["td", "th"],
	      HTMLTableColElement: ["col", "colgroup"],
	      HTMLTableElement: ["table"],
	      HTMLTableRowElement: ["tr"],
	      HTMLTableSectionElement: ["thead", "tbody", "tfoot"],
	      HTMLTemplateElement: ["template"],
	      HTMLTextAreaElement: ["textarea"],
	      HTMLTimeElement: ["time"],
	      HTMLTitleElement: ["title"],
	      HTMLTrackElement: ["track"],
	      HTMLUListElement: ["ul"],
	      HTMLUnknownElement: ["unknown", "vhgroupv", "vkeygen"],
	      HTMLVideoElement: ["video"]
	    },
	    nodes: {
	      Attr: ["node"],
	      Audio: ["audio"],
	      CDATASection: ["node"],
	      CharacterData: ["node"],
	      Comment: ["#comment"],
	      Document: ["#document"],
	      DocumentFragment: ["#document-fragment"],
	      DocumentType: ["node"],
	      HTMLDocument: ["#document"],
	      Image: ["img"],
	      Option: ["option"],
	      ProcessingInstruction: ["node"],
	      ShadowRoot: ["#shadow-root"],
	      Text: ["#text"],
	      XMLDocument: ["xml"]
	    }
	  });

	  "object" != typeof t && (t = {
	    type: t || "auto"
	  });

	  var A,
	      O,
	      N,
	      D,
	      I,
	      F,
	      S,
	      V,
	      P,
	      R = "registerElement",
	      U = "__" + R + (1e5 * e.Math.random() >> 0),
	      k = "addEventListener",
	      _ = "attached",
	      x = "Callback",
	      q = "detached",
	      B = "extends",
	      Z = "attributeChanged" + x,
	      j = _ + x,
	      G = "connected" + x,
	      z = "disconnected" + x,
	      K = "created" + x,
	      X = q + x,
	      $ = "ADDITION",
	      Q = "REMOVAL",
	      W = "DOMAttrModified",
	      Y = "DOMContentLoaded",
	      J = "DOMSubtreeModified",
	      ee = "<",
	      te = "=",
	      ne = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
	      re = ["ANNOTATION-XML", "COLOR-PROFILE", "FONT-FACE", "FONT-FACE-SRC", "FONT-FACE-URI", "FONT-FACE-FORMAT", "FONT-FACE-NAME", "MISSING-GLYPH"],
	      oe = [],
	      le = [],
	      ae = "",
	      ie = y.documentElement,
	      ue = oe.indexOf || function (e) {
	    for (var t = this.length; t-- && this[t] !== e;) {
	    }

	    return t;
	  },
	      ce = C.prototype,
	      se = ce.hasOwnProperty,
	      me = ce.isPrototypeOf,
	      fe = C.defineProperty,
	      pe = [],
	      de = C.getOwnPropertyDescriptor,
	      he = C.getOwnPropertyNames,
	      Te = C.getPrototypeOf,
	      Le = C.setPrototypeOf,
	      Me = !!C.__proto__,
	      ve = "__dreCEv1",
	      He = e.customElements,
	      ge = !/^force/.test(t.type) && !!(He && He.define && He.get && He.whenDefined),
	      be = C.create || C,
	      ye = e.Map || function () {
	    var e,
	        t = [],
	        n = [];
	    return {
	      get: function get(e) {
	        return n[ue.call(t, e)];
	      },
	      set: function set(r, o) {
	        e = ue.call(t, r), e < 0 ? n[t.push(r) - 1] = o : n[e] = o;
	      }
	    };
	  },
	      Ce = e.Promise || function (e) {
	    function t(e) {
	      for (r = !0; n.length;) {
	        n.shift()(e);
	      }
	    }

	    var n = [],
	        r = !1,
	        o = {
	      "catch": function _catch() {
	        return o;
	      },
	      then: function then(e) {
	        return n.push(e), r && setTimeout(t, 1), o;
	      }
	    };
	    return e(t), o;
	  },
	      we = !1,
	      Ae = be(null),
	      Oe = be(null),
	      Ne = new ye(),
	      De = function De(e) {
	    return e.toLowerCase();
	  },
	      Ie = C.create || function it(e) {
	    return e ? (it.prototype = e, new it()) : this;
	  },
	      Fe = Le || (Me ? function (e, t) {
	    return e.__proto__ = t, e;
	  } : he && de ? function () {
	    function e(e, t) {
	      for (var n, r = he(t), o = 0, l = r.length; o < l; o++) {
	        n = r[o], se.call(e, n) || fe(e, n, de(t, n));
	      }
	    }

	    return function (t, n) {
	      do {
	        e(t, n);
	      } while ((n = Te(n)) && !me.call(n, t));

	      return t;
	    };
	  }() : function (e, t) {
	    for (var n in t) {
	      e[n] = t[n];
	    }

	    return e;
	  }),
	      Se = e.MutationObserver || e.WebKitMutationObserver,
	      Ve = e.HTMLAnchorElement,
	      Pe = (e.HTMLElement || e.Element || e.Node).prototype,
	      Re = !me.call(Pe, ie),
	      Ue = Re ? function (e, t, n) {
	    return e[t] = n.value, e;
	  } : fe,
	      ke = Re ? function (e) {
	    return 1 === e.nodeType;
	  } : function (e) {
	    return me.call(Pe, e);
	  },
	      _e = Re && [],
	      xe = Pe.attachShadow,
	      qe = Pe.cloneNode,
	      Be = Pe.dispatchEvent,
	      Ze = Pe.getAttribute,
	      je = Pe.hasAttribute,
	      Ge = Pe.removeAttribute,
	      ze = Pe.setAttribute,
	      Ke = y.createElement,
	      Xe = y.importNode,
	      $e = Ke,
	      Qe = Se && {
	    attributes: !0,
	    characterData: !0,
	    attributeOldValue: !0
	  },
	      We = Se || function (e) {
	    nt = !1, ie.removeEventListener(W, We);
	  },
	      Ye = 0,
	      Je = R in y && !/^force-all/.test(t.type),
	      et = !0,
	      tt = !1,
	      nt = !0,
	      rt = !0,
	      ot = !0;

	  if (Se && (P = y.createElement("div"), P.innerHTML = "<div><div></div></div>", new Se(function (e, t) {
	    if (e[0] && "childList" == e[0].type && !e[0].removedNodes[0].childNodes.length) {
	      P = de(Pe, "innerHTML");
	      var n = P && P.set;
	      n && fe(Pe, "innerHTML", {
	        set: function set(e) {
	          for (; this.lastChild;) {
	            this.removeChild(this.lastChild);
	          }

	          n.call(this, e);
	        }
	      });
	    }

	    t.disconnect(), P = null;
	  }).observe(P, {
	    childList: !0,
	    subtree: !0
	  }), P.innerHTML = ""), Je || (Le || Me ? (S = function S(e, t) {
	    me.call(t, e) || p(e, t);
	  }, V = p) : (S = function S(e, t) {
	    e[U] || (e[U] = C(!0), p(e, t));
	  }, V = S), Re ? (nt = !1, function () {
	    var e = de(Pe, k),
	        t = e.value,
	        n = function n(e) {
	      var t = new CustomEvent(W, {
	        bubbles: !0
	      });
	      t.attrName = e, t.prevValue = Ze.call(this, e), t.newValue = null, t[Q] = t.attrChange = 2, Ge.call(this, e), Be.call(this, t);
	    },
	        r = function r(e, t) {
	      var n = je.call(this, e),
	          r = n && Ze.call(this, e),
	          o = new CustomEvent(W, {
	        bubbles: !0
	      });
	      ze.call(this, e, t), o.attrName = e, o.prevValue = n ? r : null, o.newValue = t, n ? o.MODIFICATION = o.attrChange = 1 : o[$] = o.attrChange = 0, Be.call(this, o);
	    },
	        o = function o(e) {
	      var t,
	          n = e.currentTarget,
	          r = n[U],
	          o = e.propertyName;
	      r.hasOwnProperty(o) && (r = r[o], t = new CustomEvent(W, {
	        bubbles: !0
	      }), t.attrName = r.name, t.prevValue = r.value || null, t.newValue = r.value = n[o] || null, null == t.prevValue ? t[$] = t.attrChange = 0 : t.MODIFICATION = t.attrChange = 1, Be.call(n, t));
	    };

	    e.value = function (e, l, a) {
	      e === W && this[Z] && this.setAttribute !== r && (this[U] = {
	        className: {
	          name: "class",
	          value: this.className
	        }
	      }, this.setAttribute = r, this.removeAttribute = n, t.call(this, "propertychange", o)), t.call(this, e, l, a);
	    }, fe(Pe, k, e);
	  }()) : Se || (ie[k](W, We), ie.setAttribute(U, 1), ie.removeAttribute(U), nt && (O = function O(e) {
	    var t,
	        n,
	        r,
	        o = this;

	    if (o === e.target) {
	      t = o[U], o[U] = n = D(o);

	      for (r in n) {
	        if (!(r in t)) return N(0, o, r, t[r], n[r], $);
	        if (n[r] !== t[r]) return N(1, o, r, t[r], n[r], "MODIFICATION");
	      }

	      for (r in t) {
	        if (!(r in n)) return N(2, o, r, t[r], n[r], Q);
	      }
	    }
	  }, N = function N(e, t, n, r, o, l) {
	    var a = {
	      attrChange: e,
	      currentTarget: t,
	      attrName: n,
	      prevValue: r,
	      newValue: o
	    };
	    a[l] = e, u(a);
	  }, D = function D(e) {
	    for (var t, n, r = {}, o = e.attributes, l = 0, a = o.length; l < a; l++) {
	      t = o[l], "setAttribute" !== (n = t.name) && (r[n] = t.value);
	    }

	    return r;
	  })), y[R] = function (e, t) {
	    if (n = e.toUpperCase(), et && (et = !1, Se ? (I = function (e, t) {
	      function n(e, t) {
	        for (var n = 0, r = e.length; n < r; t(e[n++])) {
	        }
	      }

	      return new Se(function (r) {
	        for (var o, l, a, i = 0, u = r.length; i < u; i++) {
	          o = r[i], "childList" === o.type ? (n(o.addedNodes, e), n(o.removedNodes, t)) : (l = o.target, ot && l[Z] && "style" !== o.attributeName && (a = Ze.call(l, o.attributeName)) !== o.oldValue && l[Z](o.attributeName, o.oldValue, a));
	        }
	      });
	    }(l(_), l(q)), F = function F(e) {
	      return I.observe(e, {
	        childList: !0,
	        subtree: !0
	      }), e;
	    }, F(y), xe && (Pe.attachShadow = function () {
	      return F(xe.apply(this, arguments));
	    })) : (A = [], y[k]("DOMNodeInserted", c(_)), y[k]("DOMNodeRemoved", c(q))), y[k](Y, s), y[k]("readystatechange", s), y.importNode = function (e, t) {
	      switch (e.nodeType) {
	        case 1:
	          return f(y, Xe, [e, !!t]);

	        case 11:
	          for (var n = y.createDocumentFragment(), r = e.childNodes, o = r.length, l = 0; l < o; l++) {
	            n.appendChild(y.importNode(r[l], !!t));
	          }

	          return n;

	        default:
	          return qe.call(e, !!t);
	      }
	    }, Pe.cloneNode = function (e) {
	      return f(this, qe, [!!e]);
	    }), tt) return tt = !1;
	    if (-2 < ue.call(oe, te + n) + ue.call(oe, ee + n) && h(e), !ne.test(n) || -1 < ue.call(re, n)) throw new Error("The type " + e + " is invalid");

	    var n,
	        o,
	        a = function a() {
	      return u ? y.createElement(m, n) : y.createElement(m);
	    },
	        i = t || ce,
	        u = se.call(i, B),
	        m = u ? t[B].toUpperCase() : n;

	    return u && -1 < ue.call(oe, ee + m) && h(m), o = oe.push((u ? te : ee) + n) - 1, ae = ae.concat(ae.length ? "," : "", u ? m + '[is="' + e.toLowerCase() + '"]' : m), a.prototype = le[o] = se.call(i, "prototype") ? i.prototype : Ie(Pe), ae.length && r(y.querySelectorAll(ae), _), a;
	  }, y.createElement = $e = function $e(e, t) {
	    var n = v(t),
	        r = n ? Ke.call(y, e, De(n)) : Ke.call(y, e),
	        o = "" + e,
	        l = ue.call(oe, (n ? te : ee) + (n || o).toUpperCase()),
	        a = -1 < l;
	    return n && (r.setAttribute("is", n = n.toLowerCase()), a && (a = i(o.toUpperCase(), n))), ot = !y.createElement.innerHTMLHelper, a && V(r, le[l]), r;
	  }), L.prototype = {
	    constructor: L,
	    define: ge ? function (e, t, n) {
	      if (n) M(e, t, n);else {
	        var r = e.toUpperCase();
	        Ae[r] = {
	          constructor: t,
	          create: [r]
	        }, Ne.set(t, r), He.define(e, t);
	      }
	    } : M,
	    get: ge ? function (e) {
	      return He.get(e) || E(e);
	    } : E,
	    whenDefined: ge ? function (e) {
	      return Ce.race([He.whenDefined(e), g(e)]);
	    } : g
	  }, !He || /^force/.test(t.type)) b();else if (!t.noBuiltIn) try {
	    !function (t, n, r) {
	      var o = new RegExp("^<a\\s+is=('|\")" + r + "\\1></a>$");
	      if (n[B] = "a", t.prototype = Ie(Ve.prototype), t.prototype.constructor = t, e.customElements.define(r, t, n), !o.test(y.createElement("a", {
	        is: r
	      }).outerHTML) || !o.test(new t().outerHTML)) throw n;
	    }(function ut() {
	      return Reflect.construct(Ve, [], ut);
	    }, {}, "document-register-element-a");
	  } catch (lt) {
	    b();
	  }
	  if (!t.noBuiltIn) try {
	    if (Ke.call(y, "a", "a").outerHTML.indexOf("is") < 0) throw {};
	  } catch (at) {
	    De = function De(e) {
	      return {
	        is: e.toLowerCase()
	      };
	    };
	  }
	}(window);

	function _taggedTemplateLiteralLoose(strings, raw) {
	  if (!raw) {
	    raw = strings.slice(0);
	  }

	  strings.raw = raw;
	  return strings;
	}

	var taggedTemplateLiteralLoose = _taggedTemplateLiteralLoose;

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	var inheritsLoose = _inheritsLoose;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	var getPrototypeOf = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	var setPrototypeOf$1 = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	var isNativeFunction = _isNativeFunction;

	var construct$1 = createCommonjsModule(function (module) {
	function isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct()) {
	    module.exports = _construct = Reflect.construct;
	  } else {
	    module.exports = _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) setPrototypeOf$1(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	module.exports = _construct;
	});

	var wrapNativeSuper = createCommonjsModule(function (module) {
	function _wrapNativeSuper(Class) {
	  var _cache = typeof Map === "function" ? new Map() : undefined;

	  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !isNativeFunction(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return construct$1(Class, arguments, getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return setPrototypeOf$1(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	module.exports = _wrapNativeSuper;
	});

	var self$1 = undefined || {};

	try {
	  self$1.WeakMap = WeakMap;
	} catch (WeakMap) {
	  self$1.WeakMap = function (id, Object) {

	    var dP = Object.defineProperty;
	    var hOP = Object.hasOwnProperty;
	    var proto = WeakMap.prototype;

	    proto.delete = function (key) {
	      return this.has(key) && delete key[this._];
	    };

	    proto.get = function (key) {
	      return this.has(key) ? key[this._] : void 0;
	    };

	    proto.has = function (key) {
	      return hOP.call(key, this._);
	    };

	    proto.set = function (key, value) {
	      dP(key, this._, {
	        configurable: true,
	        value: value
	      });
	      return this;
	    };

	    return WeakMap;

	    function WeakMap(iterable) {
	      dP(this, '_', {
	        value: '_@ungap/weakmap' + id++
	      });
	      if (iterable) iterable.forEach(add, this);
	    }

	    function add(pair) {
	      this.set(pair[0], pair[1]);
	    }
	  }(Math.random(), Object);
	}

	var WeakMap$1 = self$1.WeakMap;

	var self$2 = undefined || {};

	try {
	  self$2.WeakSet = WeakSet;
	} catch (WeakSet) {
	  (function (id, dP) {
	    var proto = WeakSet.prototype;

	    proto.add = function (object) {
	      if (!this.has(object)) dP(object, this._, {
	        value: true,
	        configurable: true
	      });
	      return this;
	    };

	    proto.has = function (object) {
	      return this.hasOwnProperty.call(object, this._);
	    };

	    proto.delete = function (object) {
	      return this.has(object) && delete object[this._];
	    };

	    self$2.WeakSet = WeakSet;

	    function WeakSet() {

	      dP(this, '_', {
	        value: '_@ungap/weakmap' + id++
	      });
	    }
	  })(Math.random(), Object.defineProperty);
	}

	var WeakSet$1 = self$2.WeakSet;

	var self$3 = undefined || {};

	try {
	  self$3.Map = Map;
	} catch (Map) {
	  self$3.Map = function Map() {
	    var i = 0;
	    var k = [];
	    var v = [];
	    return {
	      delete: function _delete(key) {
	        var had = contains(key);

	        if (had) {
	          k.splice(i, 1);
	          v.splice(i, 1);
	        }

	        return had;
	      },
	      get: function get(key) {
	        return contains(key) ? v[i] : void 0;
	      },
	      has: function has(key) {
	        return contains(key);
	      },
	      set: function set(key, value) {
	        v[contains(key) ? i : k.push(key) - 1] = value;
	        return this;
	      }
	    };

	    function contains(v) {
	      i = k.indexOf(v);
	      return -1 < i;
	    }
	  };
	}

	var Map$1 = self$3.Map;

	var append = function append(get, parent, children, start, end, before) {
	  if (end - start < 2) parent.insertBefore(get(children[start], 1), before);else {
	    var fragment = parent.ownerDocument.createDocumentFragment();

	    while (start < end) {
	      fragment.appendChild(get(children[start++], 1));
	    }

	    parent.insertBefore(fragment, before);
	  }
	};
	var eqeq = function eqeq(a, b) {
	  return a == b;
	};
	var identity = function identity(O) {
	  return O;
	};
	var indexOf = function indexOf(moreNodes, moreStart, moreEnd, lessNodes, lessStart, lessEnd, compare) {
	  var length = lessEnd - lessStart;
	  if (length < 1) return -1;

	  while (moreEnd - moreStart >= length) {
	    var m = moreStart;
	    var l = lessStart;

	    while (m < moreEnd && l < lessEnd && compare(moreNodes[m], lessNodes[l])) {
	      m++;
	      l++;
	    }

	    if (l === lessEnd) return moreStart;
	    moreStart = m + 1;
	  }

	  return -1;
	};
	var isReversed = function isReversed(futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare) {
	  while (currentStart < currentEnd && compare(currentNodes[currentStart], futureNodes[futureEnd - 1])) {
	    currentStart++;
	    futureEnd--;
	  }
	  return futureEnd === 0;
	};
	var next = function next(get, list, i, length, before) {
	  return i < length ? get(list[i], 0) : 0 < i ? get(list[i - 1], -0).nextSibling : before;
	};
	var remove = function remove(get, parent, children, start, end) {
	  if (end - start < 2) parent.removeChild(get(children[start], -1));else {
	    var range = parent.ownerDocument.createRange();
	    range.setStartBefore(get(children[start], -1));
	    range.setEndAfter(get(children[end - 1], -1));
	    range.deleteContents();
	  }
	};
	var DELETION = -1;
	var INSERTION = 1;
	var SKIP = 0;
	var SKIP_OND = 50;

	var HS = function HS(futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges) {
	  var k = 0;
	  var minLen = futureChanges < currentChanges ? futureChanges : currentChanges;
	  var link = Array(minLen++);
	  var tresh = Array(minLen);
	  tresh[0] = -1;

	  for (var i = 1; i < minLen; i++) {
	    tresh[i] = currentEnd;
	  }

	  var keymap = new Map$1();

	  for (var _i = currentStart; _i < currentEnd; _i++) {
	    keymap.set(currentNodes[_i], _i);
	  }

	  for (var _i2 = futureStart; _i2 < futureEnd; _i2++) {
	    var idxInOld = keymap.get(futureNodes[_i2]);

	    if (idxInOld != null) {
	      k = findK(tresh, minLen, idxInOld);

	      if (-1 < k) {
	        tresh[k] = idxInOld;
	        link[k] = {
	          newi: _i2,
	          oldi: idxInOld,
	          prev: link[k - 1]
	        };
	      }
	    }
	  }

	  k = --minLen;
	  --currentEnd;

	  while (tresh[k] > currentEnd) {
	    --k;
	  }

	  minLen = currentChanges + futureChanges - k;
	  var diff = Array(minLen);
	  var ptr = link[k];
	  --futureEnd;

	  while (ptr) {
	    var _ptr = ptr,
	        newi = _ptr.newi,
	        oldi = _ptr.oldi;

	    while (futureEnd > newi) {
	      diff[--minLen] = INSERTION;
	      --futureEnd;
	    }

	    while (currentEnd > oldi) {
	      diff[--minLen] = DELETION;
	      --currentEnd;
	    }

	    diff[--minLen] = SKIP;
	    --futureEnd;
	    --currentEnd;
	    ptr = ptr.prev;
	  }

	  while (futureEnd >= futureStart) {
	    diff[--minLen] = INSERTION;
	    --futureEnd;
	  }

	  while (currentEnd >= currentStart) {
	    diff[--minLen] = DELETION;
	    --currentEnd;
	  }

	  return diff;
	};

	var OND = function OND(futureNodes, futureStart, rows, currentNodes, currentStart, cols, compare) {
	  var length = rows + cols;
	  var v = [];
	  var d, k, r, c, pv, cv, pd;

	  outer: for (d = 0; d <= length; d++) {
	    if (d > SKIP_OND) return null;
	    pd = d - 1;
	    pv = d ? v[d - 1] : [0, 0];
	    cv = v[d] = [];

	    for (k = -d; k <= d; k += 2) {
	      if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
	        c = pv[pd + k + 1];
	      } else {
	        c = pv[pd + k - 1] + 1;
	      }

	      r = c - k;

	      while (c < cols && r < rows && compare(currentNodes[currentStart + c], futureNodes[futureStart + r])) {
	        c++;
	        r++;
	      }

	      if (c === cols && r === rows) {
	        break outer;
	      }

	      cv[d + k] = c;
	    }
	  }

	  var diff = Array(d / 2 + length / 2);
	  var diffIdx = diff.length - 1;

	  for (d = v.length - 1; d >= 0; d--) {
	    while (c > 0 && r > 0 && compare(currentNodes[currentStart + c - 1], futureNodes[futureStart + r - 1])) {
	      diff[diffIdx--] = SKIP;
	      c--;
	      r--;
	    }

	    if (!d) break;
	    pd = d - 1;
	    pv = d ? v[d - 1] : [0, 0];
	    k = c - r;

	    if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
	      r--;
	      diff[diffIdx--] = INSERTION;
	    } else {
	      c--;
	      diff[diffIdx--] = DELETION;
	    }
	  }

	  return diff;
	};

	var applyDiff = function applyDiff(diff, get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before) {
	  var live = new Map$1();
	  var length = diff.length;
	  var currentIndex = currentStart;
	  var i = 0;

	  while (i < length) {
	    switch (diff[i++]) {
	      case SKIP:
	        futureStart++;
	        currentIndex++;
	        break;

	      case INSERTION:
	        live.set(futureNodes[futureStart], 1);
	        append(get, parentNode, futureNodes, futureStart++, futureStart, currentIndex < currentLength ? get(currentNodes[currentIndex], 0) : before);
	        break;

	      case DELETION:
	        currentIndex++;
	        break;
	    }
	  }

	  i = 0;

	  while (i < length) {
	    switch (diff[i++]) {
	      case SKIP:
	        currentStart++;
	        break;

	      case DELETION:
	        if (live.has(currentNodes[currentStart])) currentStart++;else remove(get, parentNode, currentNodes, currentStart++, currentStart);
	        break;
	    }
	  }
	};

	var findK = function findK(ktr, length, j) {
	  var lo = 1;
	  var hi = length;

	  while (lo < hi) {
	    var mid = (lo + hi) / 2 >>> 0;
	    if (j < ktr[mid]) hi = mid;else lo = mid + 1;
	  }

	  return lo;
	};

	var smartDiff = function smartDiff(get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before) {
	  applyDiff(OND(futureNodes, futureStart, futureChanges, currentNodes, currentStart, currentChanges, compare) || HS(futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges), get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before);
	};

	var domdiff = function domdiff(parentNode, currentNodes, futureNodes, options) {
	  if (!options) options = {};
	  var compare = options.compare || eqeq;
	  var get = options.node || identity;
	  var before = options.before == null ? null : get(options.before, 0);
	  var currentLength = currentNodes.length;
	  var currentEnd = currentLength;
	  var currentStart = 0;
	  var futureEnd = futureNodes.length;
	  var futureStart = 0;

	  while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentStart], futureNodes[futureStart])) {
	    currentStart++;
	    futureStart++;
	  }

	  while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentEnd - 1], futureNodes[futureEnd - 1])) {
	    currentEnd--;
	    futureEnd--;
	  }

	  var currentSame = currentStart === currentEnd;
	  var futureSame = futureStart === futureEnd;
	  if (currentSame && futureSame) return futureNodes;

	  if (currentSame && futureStart < futureEnd) {
	    append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentStart, currentLength, before));
	    return futureNodes;
	  }

	  if (futureSame && currentStart < currentEnd) {
	    remove(get, parentNode, currentNodes, currentStart, currentEnd);
	    return futureNodes;
	  }

	  var currentChanges = currentEnd - currentStart;
	  var futureChanges = futureEnd - futureStart;
	  var i = -1;

	  if (currentChanges < futureChanges) {
	    i = indexOf(futureNodes, futureStart, futureEnd, currentNodes, currentStart, currentEnd, compare);

	    if (-1 < i) {
	      append(get, parentNode, futureNodes, futureStart, i, get(currentNodes[currentStart], 0));
	      append(get, parentNode, futureNodes, i + currentChanges, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
	      return futureNodes;
	    }
	  } else if (futureChanges < currentChanges) {
	      i = indexOf(currentNodes, currentStart, currentEnd, futureNodes, futureStart, futureEnd, compare);

	      if (-1 < i) {
	        remove(get, parentNode, currentNodes, currentStart, i);
	        remove(get, parentNode, currentNodes, i + futureChanges, currentEnd);
	        return futureNodes;
	      }
	    }

	  if (currentChanges < 2 || futureChanges < 2) {
	    append(get, parentNode, futureNodes, futureStart, futureEnd, get(currentNodes[currentStart], 0));
	    remove(get, parentNode, currentNodes, currentStart, currentEnd);
	    return futureNodes;
	  }

	  if (currentChanges === futureChanges && isReversed(futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare)) {
	    append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
	    return futureNodes;
	  }

	  smartDiff(get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before);
	  return futureNodes;
	};

	var self$4 = undefined || {};
	self$4.CustomEvent = typeof CustomEvent === 'function' ? CustomEvent : function (__p__) {
	  CustomEvent[__p__] = new CustomEvent('').constructor[__p__];
	  return CustomEvent;

	  function CustomEvent(type, init) {
	    if (!init) init = {};
	    var e = document.createEvent('CustomEvent');
	    e.initCustomEvent(type, !!init.bubbles, !!init.cancelable, init.detail);
	    return e;
	  }
	}('prototype');
	var CustomEvent$1 = self$4.CustomEvent;

	function Component() {
	  return this;
	}
	function setup(content) {
	  var children = new WeakMap$1();
	  var create = Object.create;

	  var createEntry = function createEntry(wm, id, component) {
	    wm.set(id, component);
	    return component;
	  };

	  var get = function get(Class, info, context, id) {
	    var relation = info.get(Class) || relate(Class, info);

	    switch (typeof id) {
	      case 'object':
	      case 'function':
	        var wm = relation.w || (relation.w = new WeakMap$1());
	        return wm.get(id) || createEntry(wm, id, new Class(context));

	      default:
	        var sm = relation.p || (relation.p = create(null));
	        return sm[id] || (sm[id] = new Class(context));
	    }
	  };

	  var relate = function relate(Class, info) {
	    var relation = {
	      w: null,
	      p: null
	    };
	    info.set(Class, relation);
	    return relation;
	  };

	  var set = function set(context) {
	    var info = new Map$1();
	    children.set(context, info);
	    return info;
	  };

	  Object.defineProperties(Component, {
	    for: {
	      configurable: true,
	      value: function value(context, id) {
	        return get(this, children.get(context) || set(context), context, id == null ? 'default' : id);
	      }
	    }
	  });
	  Object.defineProperties(Component.prototype, {
	    handleEvent: {
	      value: function value(e) {
	        var ct = e.currentTarget;
	        this['getAttribute' in ct && ct.getAttribute('data-call') || 'on' + e.type](e);
	      }
	    },
	    html: lazyGetter('html', content),
	    svg: lazyGetter('svg', content),
	    state: lazyGetter('state', function () {
	      return this.defaultState;
	    }),
	    defaultState: {
	      get: function get() {
	        return {};
	      }
	    },
	    dispatch: {
	      value: function value(type, detail) {
	        var _wire$ = this._wire$;

	        if (_wire$) {
	          var event = new CustomEvent$1(type, {
	            bubbles: true,
	            cancelable: true,
	            detail: detail
	          });
	          event.component = this;
	          return (_wire$.dispatchEvent ? _wire$ : _wire$.firstChild).dispatchEvent(event);
	        }

	        return false;
	      }
	    },
	    setState: {
	      value: function value(state, render) {
	        var target = this.state;
	        var source = typeof state === 'function' ? state.call(this, target) : state;

	        for (var key in source) {
	          target[key] = source[key];
	        }

	        if (render !== false) this.render();
	        return this;
	      }
	    }
	  });
	}

	var lazyGetter = function lazyGetter(type, fn) {
	  var secret = '_' + type + '$';
	  return {
	    get: function get() {
	      return this[secret] || setValue(this, secret, fn.call(this, type));
	    },
	    set: function set(value) {
	      setValue(this, secret, value);
	    }
	  };
	};

	var setValue = function setValue(self, secret, value) {
	  return Object.defineProperty(self, secret, {
	    configurable: true,
	    value: typeof value === 'function' ? function () {
	      return self._wire$ = value.apply(this, arguments);
	    } : value
	  })[secret];
	};

	Object.defineProperties(Component.prototype, {
	  ELEMENT_NODE: {
	    value: 1
	  },
	  nodeType: {
	    value: -1
	  }
	});

	var attributes = {};
	var intents = {};
	var keys$2 = [];
	var hasOwnProperty$1 = intents.hasOwnProperty;
	var length = 0;
	var Intent = {
	  attributes: attributes,
	  define: function define(intent, callback) {
	    if (intent.indexOf('-') < 0) {
	      if (!(intent in intents)) {
	        length = keys$2.push(intent);
	      }

	      intents[intent] = callback;
	    } else {
	      attributes[intent] = callback;
	    }
	  },
	  invoke: function invoke(object, callback) {
	    for (var i = 0; i < length; i++) {
	      var key = keys$2[i];

	      if (hasOwnProperty$1.call(object, key)) {
	        return intents[key](object[key], callback);
	      }
	    }
	  }
	};

	var isArray = Array.isArray || function (toString) {
	  var $ = toString.call([]);
	  return function isArray(object) {
	    return toString.call(object) === $;
	  };
	}({}.toString);

	var createContent = function (document) {

	  var FRAGMENT = 'fragment';
	  var TEMPLATE = 'template';
	  var HAS_CONTENT = 'content' in create(TEMPLATE);
	  var createHTML = HAS_CONTENT ? function (html) {
	    var template = create(TEMPLATE);
	    template.innerHTML = html;
	    return template.content;
	  } : function (html) {
	    var content = create(FRAGMENT);
	    var template = create(TEMPLATE);
	    var childNodes = null;

	    if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
	      var selector = RegExp.$1;
	      template.innerHTML = '<table>' + html + '</table>';
	      childNodes = template.querySelectorAll(selector);
	    } else {
	      template.innerHTML = html;
	      childNodes = template.childNodes;
	    }

	    append(content, childNodes);
	    return content;
	  };
	  return function createContent(markup, type) {
	    return (type === 'svg' ? createSVG : createHTML)(markup);
	  };

	  function append(root, childNodes) {
	    var length = childNodes.length;

	    while (length--) {
	      root.appendChild(childNodes[0]);
	    }
	  }

	  function create(element) {
	    return element === FRAGMENT ? document.createDocumentFragment() : document.createElementNS('http://www.w3.org/1999/xhtml', element);
	  }

	  function createSVG(svg) {
	    var content = create(FRAGMENT);
	    var template = create('div');
	    template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
	    append(content, template.firstChild.childNodes);
	    return content;
	  }
	}(document);

	function disconnected(poly) {

	  var CONNECTED = 'connected';
	  var DISCONNECTED = 'dis' + CONNECTED;
	  var Event = poly.Event;
	  var WeakSet = poly.WeakSet;
	  var notObserving = true;
	  var observer = new WeakSet();
	  return function observe(node) {
	    if (notObserving) {
	      notObserving = !notObserving;
	      startObserving(node.ownerDocument);
	    }

	    observer.add(node);
	    return node;
	  };

	  function startObserving(document) {
	    var dispatched = null;

	    try {
	      new MutationObserver(changes).observe(document, {
	        subtree: true,
	        childList: true
	      });
	    } catch (o_O) {
	      var timer = 0;
	      var records = [];

	      var reschedule = function reschedule(record) {
	        records.push(record);
	        clearTimeout(timer);
	        timer = setTimeout(function () {
	          changes(records.splice(timer = 0, records.length));
	        }, 0);
	      };

	      document.addEventListener('DOMNodeRemoved', function (event) {
	        reschedule({
	          addedNodes: [],
	          removedNodes: [event.target]
	        });
	      }, true);
	      document.addEventListener('DOMNodeInserted', function (event) {
	        reschedule({
	          addedNodes: [event.target],
	          removedNodes: []
	        });
	      }, true);
	    }

	    function changes(records) {
	      dispatched = new Tracker();

	      for (var record, length = records.length, i = 0; i < length; i++) {
	        record = records[i];
	        dispatchAll(record.removedNodes, DISCONNECTED, CONNECTED);
	        dispatchAll(record.addedNodes, CONNECTED, DISCONNECTED);
	      }

	      dispatched = null;
	    }

	    function dispatchAll(nodes, type, counter) {
	      for (var node, event = new Event(type), length = nodes.length, i = 0; i < length; (node = nodes[i++]).nodeType === 1 && dispatchTarget(node, event, type, counter)) {
	      }
	    }

	    function dispatchTarget(node, event, type, counter) {
	      if (observer.has(node) && !dispatched[type].has(node)) {
	        dispatched[counter].delete(node);
	        dispatched[type].add(node);
	        node.dispatchEvent(event);
	      }

	      for (var children = node.children || [], length = children.length, i = 0; i < length; dispatchTarget(children[i++], event, type, counter)) {
	      }
	    }

	    function Tracker() {
	      this[CONNECTED] = new WeakSet();
	      this[DISCONNECTED] = new WeakSet();
	    }
	  }
	}

	var importNode = function (document, appendChild, cloneNode, createTextNode, importNode) {
	  var native = importNode in document;
	  var fragment = document.createDocumentFragment();
	  fragment[appendChild](document[createTextNode]('g'));
	  fragment[appendChild](document[createTextNode](''));
	  var content = native ? document[importNode](fragment, true) : fragment[cloneNode](true);
	  return content.childNodes.length < 2 ? function importNode(node, deep) {
	    var clone = node[cloneNode]();

	    for (var childNodes = node.childNodes || [], length = childNodes.length, i = 0; deep && i < length; i++) {
	      clone[appendChild](importNode(childNodes[i], deep));
	    }

	    return clone;
	  } : native ? document[importNode] : function (node, deep) {
	    return node[cloneNode](!!deep);
	  };
	}(document, 'appendChild', 'cloneNode', 'createTextNode', 'importNode');

	var trim$1 = ''.trim || function () {
	  return String(this).replace(/^\s+|\s+/g, '');
	};

	var UID = '-' + Math.random().toFixed(6) + '%';

	if (!function (template, content, tabindex) {
	  return content in template && (template.innerHTML = '<p ' + tabindex + '="' + UID + '"></p>', template[content].childNodes[0].getAttribute(tabindex) == UID);
	}(document.createElement('template'), 'content', 'tabindex')) {
	  UID = '_dt: ' + UID.slice(1, -1) + ';';
	}

	var UIDC = '<!--' + UID + '-->';
	var COMMENT_NODE = 8;
	var ELEMENT_NODE = 1;
	var TEXT_NODE = 3;
	var SHOULD_USE_TEXT_CONTENT = /^(?:style|textarea)$/i;
	var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

	function sanitize (template) {
	  return template.join(UIDC).replace(selfClosing, fullClosing).replace(attrSeeker, attrReplacer);
	}
	var spaces = ' \\f\\n\\r\\t';
	var almostEverything = '[^ ' + spaces + '\\/>"\'=]+';
	var attrName = '[ ' + spaces + ']+' + almostEverything;
	var tagName = '<([A-Za-z]+[A-Za-z0-9:_-]*)((?:';
	var attrPartials = '(?:\\s*=\\s*(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything + '))?)';
	var attrSeeker = new RegExp(tagName + attrName + attrPartials + '+)([ ' + spaces + ']*/?>)', 'g');
	var selfClosing = new RegExp(tagName + attrName + attrPartials + '*)([ ' + spaces + ']*/>)', 'g');
	var findAttributes = new RegExp('(' + attrName + '\\s*=\\s*)([\'"]?)' + UIDC + '\\2', 'gi');

	function attrReplacer($0, $1, $2, $3) {
	  return '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;
	}

	function replaceAttributes($0, $1, $2) {
	  return $1 + ($2 || '"') + UID + ($2 || '"');
	}

	function fullClosing($0, $1, $2) {
	  return VOID_ELEMENTS.test($1) ? $0 : '<' + $1 + $2 + '></' + $1 + '>';
	}

	function create(type, node, path, name) {
	  return {
	    name: name,
	    node: node,
	    path: path,
	    type: type
	  };
	}

	function find(node, path) {
	  var length = path.length;
	  var i = 0;

	  while (i < length) {
	    node = node.childNodes[path[i++]];
	  }

	  return node;
	}

	function parse(node, holes, parts, path) {
	  var childNodes = node.childNodes;
	  var length = childNodes.length;
	  var i = 0;

	  while (i < length) {
	    var child = childNodes[i];

	    switch (child.nodeType) {
	      case ELEMENT_NODE:
	        var childPath = path.concat(i);
	        parseAttributes(child, holes, parts, childPath);
	        parse(child, holes, parts, childPath);
	        break;

	      case COMMENT_NODE:
	        if (child.textContent === UID) {
	          parts.shift();
	          holes.push(SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ? create('text', node, path) : create('any', child, path.concat(i)));
	        }

	        break;

	      case TEXT_NODE:
	        if (SHOULD_USE_TEXT_CONTENT.test(node.nodeName) && trim$1.call(child.textContent) === UIDC) {
	          parts.shift();
	          holes.push(create('text', node, path));
	        }

	        break;
	    }

	    i++;
	  }
	}

	function parseAttributes(node, holes, parts, path) {
	  var cache = new Map$1();
	  var attributes = node.attributes;
	  var remove = [];
	  var array = remove.slice.call(attributes, 0);
	  var length = array.length;
	  var i = 0;

	  while (i < length) {
	    var attribute = array[i++];

	    if (attribute.value === UID) {
	      var name = attribute.name;

	      if (!cache.has(name)) {
	        var realName = parts.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*['"]?$/, '$1');
	        var value = attributes[realName] || attributes[realName.toLowerCase()];
	        cache.set(name, value);
	        holes.push(create('attr', value, path, realName));
	      }

	      remove.push(attribute);
	    }
	  }

	  length = remove.length;
	  i = 0;

	  while (i < length) {
	    var attr = remove[i++];
	    if (/^id$/i.test(attr.name)) node.removeAttribute(attr.name);else node.removeAttributeNode(attr);
	  }

	  var nodeName = node.nodeName;

	  if (/^script$/i.test(nodeName)) {
	    var script = document.createElement(nodeName);
	    length = attributes.length;
	    i = 0;

	    while (i < length) {
	      script.setAttributeNode(attributes[i++].cloneNode(true));
	    }

	    script.textContent = node.textContent;
	    node.parentNode.replaceChild(script, node);
	  }
	}

	var parsed = new WeakMap$1();
	var referenced = new WeakMap$1();

	function createInfo(options, template) {
	  var markup = sanitize(template);
	  var transform = options.transform;
	  if (transform) markup = transform(markup);
	  var content = createContent(markup, options.type);
	  cleanContent(content);
	  var holes = [];
	  parse(content, holes, template.slice(0), []);
	  var info = {
	    content: content,
	    updates: function updates(content) {
	      var callbacks = [];
	      var len = holes.length;
	      var i = 0;

	      while (i < len) {
	        var info = holes[i++];
	        var node = find(content, info.path);

	        switch (info.type) {
	          case 'any':
	            callbacks.push(options.any(node, []));
	            break;

	          case 'attr':
	            callbacks.push(options.attribute(node, info.name, info.node));
	            break;

	          case 'text':
	            callbacks.push(options.text(node));
	            node.textContent = '';
	            break;
	        }
	      }

	      return function () {
	        var length = arguments.length;
	        var values = length - 1;
	        var i = 1;

	        if (len !== values) {
	          throw new Error(values + ' values instead of ' + len + '\n' + template.join(', '));
	        }

	        while (i < length) {
	          callbacks[i - 1](arguments[i++]);
	        }

	        return content;
	      };
	    }
	  };
	  parsed.set(template, info);
	  return info;
	}

	function createDetails(options, template) {
	  var info = parsed.get(template) || createInfo(options, template);
	  var content = importNode.call(document, info.content, true);
	  var details = {
	    content: content,
	    template: template,
	    updates: info.updates(content)
	  };
	  referenced.set(options, details);
	  return details;
	}

	function domtagger(options) {
	  return function (template) {
	    var details = referenced.get(options);
	    if (details == null || details.template !== template) details = createDetails(options, template);
	    details.updates.apply(null, arguments);
	    return details.content;
	  };
	}

	function cleanContent(fragment) {
	  var childNodes = fragment.childNodes;
	  var i = childNodes.length;

	  while (i--) {
	    var child = childNodes[i];

	    if (child.nodeType !== 1 && trim$1.call(child.textContent).length === 0) {
	      fragment.removeChild(child);
	    }
	  }
	}

	var hyperStyle = function () {

	  var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
	  var hyphen = /([^A-Z])([A-Z]+)/g;
	  return function hyperStyle(node, original) {
	    return 'ownerSVGElement' in node ? svg(node, original) : update(node.style, false);
	  };

	  function ized($0, $1, $2) {
	    return $1 + '-' + $2.toLowerCase();
	  }

	  function svg(node, original) {
	    var style;
	    if (original) style = original.cloneNode(true);else {
	      node.setAttribute('style', '--hyper:style;');
	      style = node.getAttributeNode('style');
	    }
	    style.value = '';
	    node.setAttributeNode(style);
	    return update(style, true);
	  }

	  function toStyle(object) {
	    var key,
	        css = [];

	    for (key in object) {
	      css.push(key.replace(hyphen, ized), ':', object[key], ';');
	    }

	    return css.join('');
	  }

	  function update(style, isSVG) {
	    var oldType, oldValue;
	    return function (newValue) {
	      var info, key, styleValue, value;

	      switch (typeof newValue) {
	        case 'object':
	          if (newValue) {
	            if (oldType === 'object') {
	              if (!isSVG) {
	                if (oldValue !== newValue) {
	                  for (key in oldValue) {
	                    if (!(key in newValue)) {
	                      style[key] = '';
	                    }
	                  }
	                }
	              }
	            } else {
	              if (isSVG) style.value = '';else style.cssText = '';
	            }

	            info = isSVG ? {} : style;

	            for (key in newValue) {
	              value = newValue[key];
	              styleValue = typeof value === 'number' && !IS_NON_DIMENSIONAL.test(key) ? value + 'px' : value;
	              if (!isSVG && /^--/.test(key)) info.setProperty(key, styleValue);else info[key] = styleValue;
	            }

	            oldType = 'object';
	            if (isSVG) style.value = toStyle(oldValue = info);else oldValue = newValue;
	            break;
	          }

	        default:
	          if (oldValue != newValue) {
	            oldType = 'string';
	            oldValue = newValue;
	            if (isSVG) style.value = newValue || '';else style.cssText = newValue || '';
	          }

	          break;
	      }
	    };
	  }
	}();

	var Wire = function (slice, proto) {
	  proto = Wire.prototype;
	  proto.ELEMENT_NODE = 1;
	  proto.nodeType = 111;

	  proto.remove = function (keepFirst) {
	    var childNodes = this.childNodes;
	    var first = this.firstChild;
	    var last = this.lastChild;
	    this._ = null;

	    if (keepFirst && childNodes.length === 2) {
	      last.parentNode.removeChild(last);
	    } else {
	      var range = this.ownerDocument.createRange();
	      range.setStartBefore(keepFirst ? childNodes[1] : first);
	      range.setEndAfter(last);
	      range.deleteContents();
	    }

	    return first;
	  };

	  proto.valueOf = function (forceAppend) {
	    var fragment = this._;
	    var noFragment = fragment == null;
	    if (noFragment) fragment = this._ = this.ownerDocument.createDocumentFragment();

	    if (noFragment || forceAppend) {
	      for (var n = this.childNodes, i = 0, l = n.length; i < l; i++) {
	        fragment.appendChild(n[i]);
	      }
	    }

	    return fragment;
	  };

	  return Wire;

	  function Wire(childNodes) {
	    var nodes = this.childNodes = slice.call(childNodes, 0);
	    this.firstChild = nodes[0];
	    this.lastChild = nodes[nodes.length - 1];
	    this.ownerDocument = nodes[0].ownerDocument;
	    this._ = null;
	  }
	}([].slice);

	var DOCUMENT_FRAGMENT_NODE$1 = 11;
	var OWNER_SVG_ELEMENT = 'ownerSVGElement';
	var CONNECTED = 'connected';
	var DISCONNECTED = 'dis' + CONNECTED;

	var componentType = Component.prototype.nodeType;
	var wireType = Wire.prototype.nodeType;
	var observe = disconnected({
	  Event: CustomEvent$1,
	  WeakSet: WeakSet$1
	});

	var asHTML = function asHTML(html) {
	  return {
	    html: html
	  };
	};

	var asNode = function asNode(item, i) {
	  switch (item.nodeType) {
	    case wireType:
	      return 1 / i < 0 ? i ? item.remove(true) : item.lastChild : i ? item.valueOf(true) : item.firstChild;

	    case componentType:
	      return asNode(item.render(), i);

	    default:
	      return item;
	  }
	};

	var canDiff = function canDiff(value) {
	  return 'ELEMENT_NODE' in value;
	};

	var invokeAtDistance = function invokeAtDistance(value, callback) {
	  callback(value.placeholder);

	  if ('text' in value) {
	    Promise.resolve(value.text).then(String).then(callback);
	  } else if ('any' in value) {
	    Promise.resolve(value.any).then(callback);
	  } else if ('html' in value) {
	    Promise.resolve(value.html).then(asHTML).then(callback);
	  } else {
	    Promise.resolve(Intent.invoke(value, callback)).then(callback);
	  }
	};

	var isPromise_ish = function isPromise_ish(value) {
	  return value != null && 'then' in value;
	};

	var readOnly = /^(?:form|list)$/i;
	var slice$1 = [].slice;

	var text = function text(node, _text) {
	  return node.ownerDocument.createTextNode(_text);
	};

	function Tagger(type) {
	  this.type = type;
	  return domtagger(this);
	}

	Tagger.prototype = {
	  attribute: function attribute(node, name, original) {
	    var isSVG = OWNER_SVG_ELEMENT in node;
	    var oldValue;
	    if (name === 'style') return hyperStyle(node, original, isSVG);else if (/^on/.test(name)) {
	        var type = name.slice(2);

	        if (type === CONNECTED || type === DISCONNECTED) {
	          observe(node);
	        } else if (name.toLowerCase() in node) {
	          type = type.toLowerCase();
	        }

	        return function (newValue) {
	          if (oldValue !== newValue) {
	            if (oldValue) node.removeEventListener(type, oldValue, false);
	            oldValue = newValue;
	            if (newValue) node.addEventListener(type, newValue, false);
	          }
	        };
	      } else if (name === 'data' || !isSVG && name in node && !readOnly.test(name)) {
	          return function (newValue) {
	            if (oldValue !== newValue) {
	              oldValue = newValue;

	              if (node[name] !== newValue) {
	                node[name] = newValue;

	                if (newValue == null) {
	                  node.removeAttribute(name);
	                }
	              }
	            }
	          };
	        } else if (name in Intent.attributes) {
	          return function (any) {
	            var newValue = Intent.attributes[name](node, any);

	            if (oldValue !== newValue) {
	              oldValue = newValue;
	              if (newValue == null) node.removeAttribute(name);else node.setAttribute(name, newValue);
	            }
	          };
	        } else {
	            var owner = false;
	            var attribute = original.cloneNode(true);
	            return function (newValue) {
	              if (oldValue !== newValue) {
	                oldValue = newValue;

	                if (attribute.value !== newValue) {
	                  if (newValue == null) {
	                    if (owner) {
	                      owner = false;
	                      node.removeAttributeNode(attribute);
	                    }

	                    attribute.value = newValue;
	                  } else {
	                    attribute.value = newValue;

	                    if (!owner) {
	                      owner = true;
	                      node.setAttributeNode(attribute);
	                    }
	                  }
	                }
	              }
	            };
	          }
	  },
	  any: function any(node, childNodes) {
	    var diffOptions = {
	      node: asNode,
	      before: node
	    };
	    var nodeType = OWNER_SVG_ELEMENT in node ? 'svg' : 'html';
	    var fastPath = false;
	    var oldValue;

	    var anyContent = function anyContent(value) {
	      switch (typeof value) {
	        case 'string':
	        case 'number':
	        case 'boolean':
	          if (fastPath) {
	            if (oldValue !== value) {
	              oldValue = value;
	              childNodes[0].textContent = value;
	            }
	          } else {
	            fastPath = true;
	            oldValue = value;
	            childNodes = domdiff(node.parentNode, childNodes, [text(node, value)], diffOptions);
	          }

	          break;

	        case 'function':
	          anyContent(value(node));
	          break;

	        case 'object':
	        case 'undefined':
	          if (value == null) {
	            fastPath = false;
	            childNodes = domdiff(node.parentNode, childNodes, [], diffOptions);
	            break;
	          }

	        default:
	          fastPath = false;
	          oldValue = value;

	          if (isArray(value)) {
	            if (value.length === 0) {
	              if (childNodes.length) {
	                childNodes = domdiff(node.parentNode, childNodes, [], diffOptions);
	              }
	            } else {
	              switch (typeof value[0]) {
	                case 'string':
	                case 'number':
	                case 'boolean':
	                  anyContent({
	                    html: value
	                  });
	                  break;

	                case 'object':
	                  if (isArray(value[0])) {
	                    value = value.concat.apply([], value);
	                  }

	                  if (isPromise_ish(value[0])) {
	                    Promise.all(value).then(anyContent);
	                    break;
	                  }

	                default:
	                  childNodes = domdiff(node.parentNode, childNodes, value, diffOptions);
	                  break;
	              }
	            }
	          } else if (canDiff(value)) {
	            childNodes = domdiff(node.parentNode, childNodes, value.nodeType === DOCUMENT_FRAGMENT_NODE$1 ? slice$1.call(value.childNodes) : [value], diffOptions);
	          } else if (isPromise_ish(value)) {
	            value.then(anyContent);
	          } else if ('placeholder' in value) {
	            invokeAtDistance(value, anyContent);
	          } else if ('text' in value) {
	            anyContent(String(value.text));
	          } else if ('any' in value) {
	            anyContent(value.any);
	          } else if ('html' in value) {
	            childNodes = domdiff(node.parentNode, childNodes, slice$1.call(createContent([].concat(value.html).join(''), nodeType).childNodes), diffOptions);
	          } else if ('length' in value) {
	            anyContent(slice$1.call(value));
	          } else {
	            anyContent(Intent.invoke(value, anyContent));
	          }

	          break;
	      }
	    };

	    return anyContent;
	  },
	  text: function text(node) {
	    var oldValue;

	    var textContent = function textContent(value) {
	      if (oldValue !== value) {
	        oldValue = value;
	        var type = typeof value;

	        if (type === 'object' && value) {
	          if (isPromise_ish(value)) {
	            value.then(textContent);
	          } else if ('placeholder' in value) {
	            invokeAtDistance(value, textContent);
	          } else if ('text' in value) {
	            textContent(String(value.text));
	          } else if ('any' in value) {
	            textContent(value.any);
	          } else if ('html' in value) {
	            textContent([].concat(value.html).join(''));
	          } else if ('length' in value) {
	            textContent(slice$1.call(value).join(''));
	          } else {
	            textContent(Intent.invoke(value, textContent));
	          }
	        } else if (type === 'function') {
	          textContent(value(node));
	        } else {
	          node.textContent = value == null ? '' : value;
	        }
	      }
	    };

	    return textContent;
	  }
	};

	var templateLiteral = function () {

	  var RAW = 'raw';
	  var isNoOp = typeof document !== 'object';

	  var _templateLiteral = function templateLiteral(tl) {
	    if (!(RAW in tl) || tl.propertyIsEnumerable(RAW) || !Object.isFrozen(tl[RAW]) || /Firefox\/(\d+)/.test((document.defaultView.navigator || {}).userAgent) && parseFloat(RegExp.$1) < 55) {
	      var forever = {};

	      _templateLiteral = function templateLiteral(tl) {
	        for (var key = '.', i = 0; i < tl.length; i++) {
	          key += tl[i].length + '.' + tl[i];
	        }

	        return forever[key] || (forever[key] = tl);
	      };
	    } else {
	      isNoOp = true;
	    }

	    return TL(tl);
	  };

	  return TL;

	  function TL(tl) {
	    return isNoOp ? tl : _templateLiteral(tl);
	  }
	}();

	function tta (template) {
	  var length = arguments.length;
	  var args = [templateLiteral(template)];
	  var i = 1;

	  while (i < length) {
	    args.push(arguments[i++]);
	  }

	  return args;
	}

	var wires = new WeakMap$1();

	var wire = function wire(obj, type) {
	  return obj == null ? content(type || 'html') : weakly(obj, type || 'html');
	};

	var content = function content(type) {
	  var wire, tagger, template;
	  return function () {
	    var args = tta.apply(null, arguments);

	    if (template !== args[0]) {
	      template = args[0];
	      tagger = new Tagger(type);
	      wire = wireContent(tagger.apply(tagger, args));
	    } else {
	      tagger.apply(tagger, args);
	    }

	    return wire;
	  };
	};

	var weakly = function weakly(obj, type) {
	  var i = type.indexOf(':');
	  var wire = wires.get(obj);
	  var id = type;

	  if (-1 < i) {
	    id = type.slice(i + 1);
	    type = type.slice(0, i) || 'html';
	  }

	  if (!wire) wires.set(obj, wire = {});
	  return wire[id] || (wire[id] = content(type));
	};

	var wireContent = function wireContent(node) {
	  var childNodes = node.childNodes;
	  var length = childNodes.length;
	  return length === 1 ? childNodes[0] : length ? new Wire(childNodes) : node;
	};

	var bewitched = new WeakMap$1();

	function render() {
	  var wicked = bewitched.get(this);
	  var args = tta.apply(null, arguments);

	  if (wicked && wicked.template === args[0]) {
	    wicked.tagger.apply(null, args);
	  } else {
	    upgrade.apply(this, args);
	  }

	  return this;
	}

	function upgrade(template) {
	  var type = OWNER_SVG_ELEMENT in this ? 'svg' : 'html';
	  var tagger = new Tagger(type);
	  bewitched.set(this, {
	    tagger: tagger,
	    template: template
	  });
	  this.textContent = '';
	  this.appendChild(tagger.apply(null, arguments));
	}

	var bind = function bind(context) {
	  return render.bind(context);
	};

	var define$1 = Intent.define;
	var tagger = Tagger.prototype;
	hyper.Component = Component;
	hyper.bind = bind;
	hyper.define = define$1;
	hyper.diff = domdiff;
	hyper.hyper = hyper;
	hyper.observe = observe;
	hyper.tagger = tagger;
	hyper.wire = wire;
	hyper._ = {
	  WeakMap: WeakMap$1,
	  WeakSet: WeakSet$1
	};
	setup(content);
	function hyper(HTML) {
	  return arguments.length < 2 ? HTML == null ? content('html') : typeof HTML === 'string' ? hyper.wire(null, HTML) : 'raw' in HTML ? content('html')(HTML) : 'nodeType' in HTML ? hyper.bind(HTML) : weakly(HTML, 'html') : ('raw' in HTML ? content('html') : hyper.wire).apply(null, arguments);
	}

	var ATTRIBUTE_CHANGED_CALLBACK = 'attributeChangedCallback';
	var O = Object;
	var classes = [];
	var defineProperty$1 = O.defineProperty;
	var getOwnPropertyDescriptor = O.getOwnPropertyDescriptor;
	var getOwnPropertyNames = O.getOwnPropertyNames;

	var getOwnPropertySymbols = O.getOwnPropertySymbols || function () {
	  return [];
	};

	var getPrototypeOf$1 = O.getPrototypeOf || function (o) {
	  return o.__proto__;
	};

	var ownKeys = typeof Reflect === 'object' && Reflect.ownKeys || function (o) {
	  return getOwnPropertyNames(o).concat(getOwnPropertySymbols(o));
	};

	var setPrototypeOf$2 = O.setPrototypeOf || function (o, p) {
	  return o.__proto__ = p, o;
	};

	var camel = function camel(name) {
	  return name.replace(/-([a-z])/g, function ($0, $1) {
	    return $1.toUpperCase();
	  });
	};

	var _attachShadow = HTMLElement.prototype.attachShadow;
	var sr = new WeakMap();

	var HyperHTMLElement = function (_HTMLElement) {
	  inheritsLoose(HyperHTMLElement, _HTMLElement);

	  function HyperHTMLElement() {
	    return _HTMLElement.apply(this, arguments) || this;
	  }

	  HyperHTMLElement.define = function define(name, options) {
	    var Class = this;
	    var proto = Class.prototype;
	    var onChanged = proto[ATTRIBUTE_CHANGED_CALLBACK];
	    var hasChange = !!onChanged;
	    var booleanAttributes = Class.booleanAttributes || [];
	    booleanAttributes.forEach(function (name) {
	      if (!(name in proto)) defineProperty$1(proto, camel(name), {
	        configurable: true,
	        get: function get() {
	          return this.hasAttribute(name);
	        },
	        set: function set(value) {
	          if (!value || value === 'false') this.removeAttribute(name);else this.setAttribute(name, value);
	        }
	      });
	    });
	    var observedAttributes = Class.observedAttributes || [];
	    observedAttributes.forEach(function (name) {
	      if (!(name in proto)) defineProperty$1(proto, camel(name), {
	        configurable: true,
	        get: function get() {
	          return this.getAttribute(name);
	        },
	        set: function set(value) {
	          if (value == null) this.removeAttribute(name);else this.setAttribute(name, value);
	        }
	      });
	    });
	    var attributes = booleanAttributes.concat(observedAttributes);
	    if (attributes.length) defineProperty$1(Class, 'observedAttributes', {
	      get: function get() {
	        return attributes;
	      }
	    });

	    var created = proto.created || function () {
	      this.render();
	    };

	    defineProperty$1(proto, '_init$', {
	      configurable: true,
	      writable: true,
	      value: true
	    });
	    defineProperty$1(proto, ATTRIBUTE_CHANGED_CALLBACK, {
	      configurable: true,
	      value: function aCC(name, prev, curr) {
	        if (this._init$) {
	          checkReady.call(this, created);
	          if (this._init$) return this._init$$.push(aCC.bind(this, name, prev, curr));
	        }

	        if (hasChange && prev !== curr) {
	          onChanged.apply(this, arguments);
	        }
	      }
	    });
	    var onConnected = proto.connectedCallback;
	    var hasConnect = !!onConnected;
	    defineProperty$1(proto, 'connectedCallback', {
	      configurable: true,
	      value: function cC() {
	        if (this._init$) {
	          checkReady.call(this, created);
	          if (this._init$) return this._init$$.push(cC.bind(this));
	        }

	        if (hasConnect) {
	          onConnected.apply(this, arguments);
	        }
	      }
	    });
	    getOwnPropertyNames(proto).forEach(function (key) {
	      if (/^handle[A-Z]/.test(key)) {
	        var _key$ = '_' + key + '$';

	        var method = proto[key];
	        defineProperty$1(proto, key, {
	          configurable: true,
	          get: function get() {
	            return this[_key$] || (this[_key$] = method.bind(this));
	          }
	        });
	      }
	    });

	    if (!('handleEvent' in proto)) {
	      defineProperty$1(proto, 'handleEvent', {
	        configurable: true,
	        value: function value(event) {
	          this[(event.currentTarget.dataset || {}).call || 'on' + event.type](event);
	        }
	      });
	    }

	    if (options && options.extends) {
	      var Native = document.createElement(options.extends).constructor;

	      var Intermediate = function (_Native) {
	        inheritsLoose(Intermediate, _Native);

	        function Intermediate() {
	          return _Native.apply(this, arguments) || this;
	        }

	        return Intermediate;
	      }(Native);

	      var Super = getPrototypeOf$1(Class);
	      ownKeys(Super).filter(function (key) {
	        return ['length', 'name', 'arguments', 'caller', 'prototype'].indexOf(key) < 0;
	      }).forEach(function (key) {
	        return defineProperty$1(Intermediate, key, getOwnPropertyDescriptor(Super, key));
	      });
	      ownKeys(Super.prototype).forEach(function (key) {
	        return defineProperty$1(Intermediate.prototype, key, getOwnPropertyDescriptor(Super.prototype, key));
	      });
	      setPrototypeOf$2(Class, Intermediate);
	      setPrototypeOf$2(proto, Intermediate.prototype);
	      customElements.define(name, Class, options);
	    } else {
	      customElements.define(name, Class);
	    }

	    classes.push(Class);
	    return Class;
	  };

	  var _proto = HyperHTMLElement.prototype;

	  _proto.attachShadow = function attachShadow() {
	    var shadowRoot = _attachShadow.apply(this, arguments);

	    sr.set(this, shadowRoot);
	    return shadowRoot;
	  };

	  _proto.render = function render() {};

	  _proto.setState = function setState(state, render) {
	    var target = this.state;
	    var source = typeof state === 'function' ? state.call(this, target) : state;

	    for (var key in source) {
	      target[key] = source[key];
	    }

	    if (render !== false) this.render();
	    return this;
	  };

	  createClass(HyperHTMLElement, [{
	    key: "refs",
	    get: function get() {
	      var value = {};

	      if ('_html$' in this) {
	        var all = (sr.get(this) || this).querySelectorAll('[ref]');

	        for (var length = all.length, i = 0; i < length; i++) {
	          var node = all[i];
	          value[node.getAttribute('ref')] = node;
	        }

	        Object.defineProperty(this, 'refs', {
	          value: value
	        });
	        return value;
	      }

	      return value;
	    }
	  }, {
	    key: "html",
	    get: function get() {
	      return this._html$ || (this.html = bind(this.shadowRoot || this._shadowRoot || sr.get(this) || this));
	    },
	    set: function set(value) {
	      defineProperty$1(this, '_html$', {
	        configurable: true,
	        value: value
	      });
	    }
	  }, {
	    key: "defaultState",
	    get: function get() {
	      return {};
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return this._state$ || (this.state = this.defaultState);
	    },
	    set: function set(value) {
	      defineProperty$1(this, '_state$', {
	        configurable: true,
	        value: value
	      });
	    }
	  }]);

	  return HyperHTMLElement;
	}(wrapNativeSuper(HTMLElement));
	HyperHTMLElement.Component = Component;
	HyperHTMLElement.bind = bind;
	HyperHTMLElement.intent = define$1;
	HyperHTMLElement.wire = wire;
	HyperHTMLElement.hyper = hyper;

	try {
	  if (Symbol.hasInstance) classes.push(defineProperty$1(HyperHTMLElement, Symbol.hasInstance, {
	    enumerable: false,
	    configurable: true,
	    value: function value(instance) {
	      return classes.some(isPrototypeOf, getPrototypeOf$1(instance));
	    }
	  }));
	} catch (meh) {}
	var dom = {
	  type: 'DOMContentLoaded',
	  handleEvent: function handleEvent() {
	    if (dom.ready()) {
	      document.removeEventListener(dom.type, dom, false);
	      dom.list.splice(0).forEach(invoke);
	    } else setTimeout(dom.handleEvent);
	  },
	  ready: function ready() {
	    return document.readyState === 'complete';
	  },
	  list: []
	};

	if (!dom.ready()) {
	  document.addEventListener(dom.type, dom, false);
	}

	function checkReady(created) {
	  if (dom.ready() || isReady.call(this, created)) {
	    if (this._init$) {
	      var list = this._init$$;
	      if (list) delete this._init$$;
	      created.call(defineProperty$1(this, '_init$', {
	        value: false
	      }));
	      if (list) list.forEach(invoke);
	    }
	  } else {
	    if (!this.hasOwnProperty('_init$$')) defineProperty$1(this, '_init$$', {
	      configurable: true,
	      value: []
	    });
	    dom.list.push(checkReady.bind(this, created));
	  }
	}

	function invoke(fn) {
	  fn();
	}

	function isPrototypeOf(Class) {
	  return this === Class.prototype;
	}

	function isReady(created) {
	  var el = this;

	  do {
	    if (el.nextSibling) return true;
	  } while (el = el.parentNode);

	  setTimeout(checkReady.bind(this, created));
	  return false;
	}

	var g = function () {
	  return this || typeof self === "object" && self;
	}() || Function("return this")();

	var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
	var oldRuntime = hadRuntime && g.regeneratorRuntime;
	g.regeneratorRuntime = undefined;
	var runtimeModule = runtime;

	if (hadRuntime) {
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  try {
	    delete g.regeneratorRuntime;
	  } catch (e) {
	    g.regeneratorRuntime = undefined;
	  }
	}

	var regenerator = runtimeModule;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	var asyncToGenerator = _asyncToGenerator;

	var SessionCache = function () {
	  function SessionCache() {}

	  var _proto = SessionCache.prototype;

	  _proto.get = function get(key) {
	    return sessionStorage.getItem(key);
	  };

	  _proto.set = function set(key, value) {
	    try {
	      sessionStorage.setItem(key, value);
	    } catch (err) {
	      console.warn("Could not cache item at key " + key + " with value", value);
	      console.warn(err);
	    }
	  };

	  _proto.remove = function remove(key) {
	    sessionStorage.removeItem(key);
	  };

	  return SessionCache;
	}();

	var sessionCache = new SessionCache();

	var MenuItemClient = function () {
	  function MenuItemClient() {}

	  var _proto = MenuItemClient.prototype;

	  _proto.getAll = function () {
	    var _getAll = asyncToGenerator(regenerator.mark(function _callee() {
	      var cacheKey, json;
	      return regenerator.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              console.log('getall called');
	              cacheKey = 'base-theme-menu-items';
	              json = null;

	              if (json) {
	                _context.next = 9;
	                break;
	              }

	              _context.next = 6;
	              return fetch(_wpSiteInfo.siteUrl + "/wp-json/wp-menus/v1/menus/top-navigation").then(function (r) {
	                return r.text();
	              });

	            case 6:
	              json = _context.sent;
	              console.log('menu items', json);
	              sessionCache.set(cacheKey, json);

	            case 9:
	              return _context.abrupt("return", JSON.parse(json));

	            case 10:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, _callee);
	    }));

	    function getAll() {
	      return _getAll.apply(this, arguments);
	    }

	    return getAll;
	  }();

	  return MenuItemClient;
	}();

	var _extendStatics = function extendStatics(d, b) {
	  _extendStatics = Object.setPrototypeOf || {
	    __proto__: []
	  } instanceof Array && function (d, b) {
	    d.__proto__ = b;
	  } || function (d, b) {
	    for (var p in b) {
	      if (b.hasOwnProperty(p)) d[p] = b[p];
	    }
	  };

	  return _extendStatics(d, b);
	};

	function __extends(d, b) {
	  _extendStatics(d, b);

	  function __() {
	    this.constructor = d;
	  }

	  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	var _enable_super_gross_mode_that_will_cause_bad_things = false;
	var config = {
	  Promise: undefined,

	  set useDeprecatedSynchronousErrorHandling(value) {
	    if (value) {
	      var error = new Error();
	      console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
	    } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
	      console.log('RxJS: Back to a better error behavior. Thank you. <3');
	    }

	    _enable_super_gross_mode_that_will_cause_bad_things = value;
	  },

	  get useDeprecatedSynchronousErrorHandling() {
	    return _enable_super_gross_mode_that_will_cause_bad_things;
	  }

	};

	function hostReportError(err) {
	  setTimeout(function () {
	    throw err;
	  });
	}

	var empty$1 = {
	  closed: true,
	  next: function next(value) {},
	  error: function error(err) {
	    if (config.useDeprecatedSynchronousErrorHandling) {
	      throw err;
	    } else {
	      hostReportError(err);
	    }
	  },
	  complete: function complete() {}
	};

	var isArray$1 = Array.isArray || function (x) {
	  return x && typeof x.length === 'number';
	};

	function isObject(x) {
	  return x != null && typeof x === 'object';
	}

	var errorObject = {
	  e: {}
	};
	var tryCatchTarget;

	function tryCatcher() {
	  try {
	    return tryCatchTarget.apply(this, arguments);
	  } catch (e) {
	    errorObject.e = e;
	    return errorObject;
	  }
	}

	function tryCatch(fn) {
	  tryCatchTarget = fn;
	  return tryCatcher;
	}

	function UnsubscriptionErrorImpl(errors) {
	  Error.call(this);
	  this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
	    return i + 1 + ") " + err.toString();
	  }).join('\n  ') : '';
	  this.name = 'UnsubscriptionError';
	  this.errors = errors;
	  return this;
	}

	UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
	var UnsubscriptionError = UnsubscriptionErrorImpl;

	var Subscription = function () {
	  function Subscription(unsubscribe) {
	    this.closed = false;
	    this._parent = null;
	    this._parents = null;
	    this._subscriptions = null;

	    if (unsubscribe) {
	      this._unsubscribe = unsubscribe;
	    }
	  }

	  Subscription.prototype.unsubscribe = function () {
	    var hasErrors = false;
	    var errors;

	    if (this.closed) {
	      return;
	    }

	    var _a = this,
	        _parent = _a._parent,
	        _parents = _a._parents,
	        _unsubscribe = _a._unsubscribe,
	        _subscriptions = _a._subscriptions;

	    this.closed = true;
	    this._parent = null;
	    this._parents = null;
	    this._subscriptions = null;
	    var index = -1;
	    var len = _parents ? _parents.length : 0;

	    while (_parent) {
	      _parent.remove(this);

	      _parent = ++index < len && _parents[index] || null;
	    }

	    if (isFunction(_unsubscribe)) {
	      var trial = tryCatch(_unsubscribe).call(this);

	      if (trial === errorObject) {
	        hasErrors = true;
	        errors = errors || (errorObject.e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(errorObject.e.errors) : [errorObject.e]);
	      }
	    }

	    if (isArray$1(_subscriptions)) {
	      index = -1;
	      len = _subscriptions.length;

	      while (++index < len) {
	        var sub = _subscriptions[index];

	        if (isObject(sub)) {
	          var trial = tryCatch(sub.unsubscribe).call(sub);

	          if (trial === errorObject) {
	            hasErrors = true;
	            errors = errors || [];
	            var err = errorObject.e;

	            if (err instanceof UnsubscriptionError) {
	              errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
	            } else {
	              errors.push(err);
	            }
	          }
	        }
	      }
	    }

	    if (hasErrors) {
	      throw new UnsubscriptionError(errors);
	    }
	  };

	  Subscription.prototype.add = function (teardown) {
	    if (!teardown || teardown === Subscription.EMPTY) {
	      return Subscription.EMPTY;
	    }

	    if (teardown === this) {
	      return this;
	    }

	    var subscription = teardown;

	    switch (typeof teardown) {
	      case 'function':
	        subscription = new Subscription(teardown);

	      case 'object':
	        if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
	          return subscription;
	        } else if (this.closed) {
	          subscription.unsubscribe();
	          return subscription;
	        } else if (typeof subscription._addParent !== 'function') {
	          var tmp = subscription;
	          subscription = new Subscription();
	          subscription._subscriptions = [tmp];
	        }

	        break;

	      default:
	        throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
	    }

	    var subscriptions = this._subscriptions || (this._subscriptions = []);
	    subscriptions.push(subscription);

	    subscription._addParent(this);

	    return subscription;
	  };

	  Subscription.prototype.remove = function (subscription) {
	    var subscriptions = this._subscriptions;

	    if (subscriptions) {
	      var subscriptionIndex = subscriptions.indexOf(subscription);

	      if (subscriptionIndex !== -1) {
	        subscriptions.splice(subscriptionIndex, 1);
	      }
	    }
	  };

	  Subscription.prototype._addParent = function (parent) {
	    var _a = this,
	        _parent = _a._parent,
	        _parents = _a._parents;

	    if (!_parent || _parent === parent) {
	      this._parent = parent;
	    } else if (!_parents) {
	      this._parents = [parent];
	    } else if (_parents.indexOf(parent) === -1) {
	      _parents.push(parent);
	    }
	  };

	  Subscription.EMPTY = function (empty) {
	    empty.closed = true;
	    return empty;
	  }(new Subscription());

	  return Subscription;
	}();

	function flattenUnsubscriptionErrors(errors) {
	  return errors.reduce(function (errs, err) {
	    return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
	  }, []);
	}

	var rxSubscriber = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('rxSubscriber') : '@@rxSubscriber';

	var Subscriber = function (_super) {
	  __extends(Subscriber, _super);

	  function Subscriber(destinationOrNext, error, complete) {
	    var _this = _super.call(this) || this;

	    _this.syncErrorValue = null;
	    _this.syncErrorThrown = false;
	    _this.syncErrorThrowable = false;
	    _this.isStopped = false;
	    _this._parentSubscription = null;

	    switch (arguments.length) {
	      case 0:
	        _this.destination = empty$1;
	        break;

	      case 1:
	        if (!destinationOrNext) {
	          _this.destination = empty$1;
	          break;
	        }

	        if (typeof destinationOrNext === 'object') {
	          if (isTrustedSubscriber(destinationOrNext)) {
	            var trustedSubscriber = destinationOrNext[rxSubscriber]();
	            _this.syncErrorThrowable = trustedSubscriber.syncErrorThrowable;
	            _this.destination = trustedSubscriber;

	            trustedSubscriber._addParentTeardownLogic(_this);
	          } else {
	            _this.syncErrorThrowable = true;
	            _this.destination = new SafeSubscriber(_this, destinationOrNext);
	          }

	          break;
	        }

	      default:
	        _this.syncErrorThrowable = true;
	        _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
	        break;
	    }

	    return _this;
	  }

	  Subscriber.prototype[rxSubscriber] = function () {
	    return this;
	  };

	  Subscriber.create = function (next, error, complete) {
	    var subscriber = new Subscriber(next, error, complete);
	    subscriber.syncErrorThrowable = false;
	    return subscriber;
	  };

	  Subscriber.prototype.next = function (value) {
	    if (!this.isStopped) {
	      this._next(value);
	    }
	  };

	  Subscriber.prototype.error = function (err) {
	    if (!this.isStopped) {
	      this.isStopped = true;

	      this._error(err);

	      this._unsubscribeParentSubscription();
	    }
	  };

	  Subscriber.prototype.complete = function () {
	    if (!this.isStopped) {
	      this.isStopped = true;

	      this._complete();

	      this._unsubscribeParentSubscription();
	    }
	  };

	  Subscriber.prototype.unsubscribe = function () {
	    if (this.closed) {
	      return;
	    }

	    this.isStopped = true;

	    _super.prototype.unsubscribe.call(this);
	  };

	  Subscriber.prototype._next = function (value) {
	    this.destination.next(value);
	  };

	  Subscriber.prototype._error = function (err) {
	    this.destination.error(err);
	    this.unsubscribe();
	  };

	  Subscriber.prototype._complete = function () {
	    this.destination.complete();
	    this.unsubscribe();
	  };

	  Subscriber.prototype._addParentTeardownLogic = function (parentTeardownLogic) {
	    if (parentTeardownLogic !== this) {
	      this._parentSubscription = this.add(parentTeardownLogic);
	    }
	  };

	  Subscriber.prototype._unsubscribeParentSubscription = function () {
	    if (this._parentSubscription !== null) {
	      this._parentSubscription.unsubscribe();
	    }
	  };

	  Subscriber.prototype._unsubscribeAndRecycle = function () {
	    var _a = this,
	        _parent = _a._parent,
	        _parents = _a._parents;

	    this._parent = null;
	    this._parents = null;
	    this.unsubscribe();
	    this.closed = false;
	    this.isStopped = false;
	    this._parent = _parent;
	    this._parents = _parents;
	    this._parentSubscription = null;
	    return this;
	  };

	  return Subscriber;
	}(Subscription);

	var SafeSubscriber = function (_super) {
	  __extends(SafeSubscriber, _super);

	  function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
	    var _this = _super.call(this) || this;

	    _this._parentSubscriber = _parentSubscriber;
	    var next;
	    var context = _this;

	    if (isFunction(observerOrNext)) {
	      next = observerOrNext;
	    } else if (observerOrNext) {
	      next = observerOrNext.next;
	      error = observerOrNext.error;
	      complete = observerOrNext.complete;

	      if (observerOrNext !== empty$1) {
	        context = Object.create(observerOrNext);

	        if (isFunction(context.unsubscribe)) {
	          _this.add(context.unsubscribe.bind(context));
	        }

	        context.unsubscribe = _this.unsubscribe.bind(_this);
	      }
	    }

	    _this._context = context;
	    _this._next = next;
	    _this._error = error;
	    _this._complete = complete;
	    return _this;
	  }

	  SafeSubscriber.prototype.next = function (value) {
	    if (!this.isStopped && this._next) {
	      var _parentSubscriber = this._parentSubscriber;

	      if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
	        this.__tryOrUnsub(this._next, value);
	      } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
	        this.unsubscribe();
	      }
	    }
	  };

	  SafeSubscriber.prototype.error = function (err) {
	    if (!this.isStopped) {
	      var _parentSubscriber = this._parentSubscriber;
	      var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;

	      if (this._error) {
	        if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
	          this.__tryOrUnsub(this._error, err);

	          this.unsubscribe();
	        } else {
	          this.__tryOrSetError(_parentSubscriber, this._error, err);

	          this.unsubscribe();
	        }
	      } else if (!_parentSubscriber.syncErrorThrowable) {
	        this.unsubscribe();

	        if (useDeprecatedSynchronousErrorHandling) {
	          throw err;
	        }

	        hostReportError(err);
	      } else {
	        if (useDeprecatedSynchronousErrorHandling) {
	          _parentSubscriber.syncErrorValue = err;
	          _parentSubscriber.syncErrorThrown = true;
	        } else {
	          hostReportError(err);
	        }

	        this.unsubscribe();
	      }
	    }
	  };

	  SafeSubscriber.prototype.complete = function () {
	    var _this = this;

	    if (!this.isStopped) {
	      var _parentSubscriber = this._parentSubscriber;

	      if (this._complete) {
	        var wrappedComplete = function wrappedComplete() {
	          return _this._complete.call(_this._context);
	        };

	        if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
	          this.__tryOrUnsub(wrappedComplete);

	          this.unsubscribe();
	        } else {
	          this.__tryOrSetError(_parentSubscriber, wrappedComplete);

	          this.unsubscribe();
	        }
	      } else {
	        this.unsubscribe();
	      }
	    }
	  };

	  SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	    try {
	      fn.call(this._context, value);
	    } catch (err) {
	      this.unsubscribe();

	      if (config.useDeprecatedSynchronousErrorHandling) {
	        throw err;
	      } else {
	        hostReportError(err);
	      }
	    }
	  };

	  SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	    if (!config.useDeprecatedSynchronousErrorHandling) {
	      throw new Error('bad call');
	    }

	    try {
	      fn.call(this._context, value);
	    } catch (err) {
	      if (config.useDeprecatedSynchronousErrorHandling) {
	        parent.syncErrorValue = err;
	        parent.syncErrorThrown = true;
	        return true;
	      } else {
	        hostReportError(err);
	        return true;
	      }
	    }

	    return false;
	  };

	  SafeSubscriber.prototype._unsubscribe = function () {
	    var _parentSubscriber = this._parentSubscriber;
	    this._context = null;
	    this._parentSubscriber = null;

	    _parentSubscriber.unsubscribe();
	  };

	  return SafeSubscriber;
	}(Subscriber);

	function isTrustedSubscriber(obj) {
	  return obj instanceof Subscriber || '_addParentTeardownLogic' in obj && obj[rxSubscriber];
	}

	function toSubscriber(nextOrObserver, error, complete) {
	  if (nextOrObserver) {
	    if (nextOrObserver instanceof Subscriber) {
	      return nextOrObserver;
	    }

	    if (nextOrObserver[rxSubscriber]) {
	      return nextOrObserver[rxSubscriber]();
	    }
	  }

	  if (!nextOrObserver && !error && !complete) {
	    return new Subscriber(empty$1);
	  }

	  return new Subscriber(nextOrObserver, error, complete);
	}

	var observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';

	function noop() {}

	function pipeFromArray(fns) {
	  if (!fns) {
	    return noop;
	  }

	  if (fns.length === 1) {
	    return fns[0];
	  }

	  return function piped(input) {
	    return fns.reduce(function (prev, fn) {
	      return fn(prev);
	    }, input);
	  };
	}

	var Observable = function () {
	  function Observable(subscribe) {
	    this._isScalar = false;

	    if (subscribe) {
	      this._subscribe = subscribe;
	    }
	  }

	  Observable.prototype.lift = function (operator) {
	    var observable$$1 = new Observable();
	    observable$$1.source = this;
	    observable$$1.operator = operator;
	    return observable$$1;
	  };

	  Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	    var operator = this.operator;
	    var sink = toSubscriber(observerOrNext, error, complete);

	    if (operator) {
	      operator.call(sink, this.source);
	    } else {
	      sink._addParentTeardownLogic(this.source || config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
	    }

	    if (config.useDeprecatedSynchronousErrorHandling) {
	      if (sink.syncErrorThrowable) {
	        sink.syncErrorThrowable = false;

	        if (sink.syncErrorThrown) {
	          throw sink.syncErrorValue;
	        }
	      }
	    }

	    return sink;
	  };

	  Observable.prototype._trySubscribe = function (sink) {
	    try {
	      return this._subscribe(sink);
	    } catch (err) {
	      if (config.useDeprecatedSynchronousErrorHandling) {
	        sink.syncErrorThrown = true;
	        sink.syncErrorValue = err;
	      }

	      sink.error(err);
	    }
	  };

	  Observable.prototype.forEach = function (next, promiseCtor) {
	    var _this = this;

	    promiseCtor = getPromiseCtor(promiseCtor);
	    return new promiseCtor(function (resolve, reject) {
	      var subscription;
	      subscription = _this.subscribe(function (value) {
	        try {
	          next(value);
	        } catch (err) {
	          reject(err);

	          if (subscription) {
	            subscription.unsubscribe();
	          }
	        }
	      }, reject, resolve);
	    });
	  };

	  Observable.prototype._subscribe = function (subscriber) {
	    var source = this.source;
	    return source && source.subscribe(subscriber);
	  };

	  Observable.prototype[observable] = function () {
	    return this;
	  };

	  Observable.prototype.pipe = function () {
	    var operations = [];

	    for (var _i = 0; _i < arguments.length; _i++) {
	      operations[_i] = arguments[_i];
	    }

	    if (operations.length === 0) {
	      return this;
	    }

	    return pipeFromArray(operations)(this);
	  };

	  Observable.prototype.toPromise = function (promiseCtor) {
	    var _this = this;

	    promiseCtor = getPromiseCtor(promiseCtor);
	    return new promiseCtor(function (resolve, reject) {
	      var value;

	      _this.subscribe(function (x) {
	        return value = x;
	      }, function (err) {
	        return reject(err);
	      }, function () {
	        return resolve(value);
	      });
	    });
	  };

	  Observable.create = function (subscribe) {
	    return new Observable(subscribe);
	  };

	  return Observable;
	}();

	function getPromiseCtor(promiseCtor) {
	  if (!promiseCtor) {
	    promiseCtor = Promise;
	  }

	  if (!promiseCtor) {
	    throw new Error('no Promise impl found');
	  }

	  return promiseCtor;
	}

	function ObjectUnsubscribedErrorImpl() {
	  Error.call(this);
	  this.message = 'object unsubscribed';
	  this.name = 'ObjectUnsubscribedError';
	  return this;
	}

	ObjectUnsubscribedErrorImpl.prototype = Object.create(Error.prototype);
	var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

	var SubjectSubscription = function (_super) {
	  __extends(SubjectSubscription, _super);

	  function SubjectSubscription(subject, subscriber) {
	    var _this = _super.call(this) || this;

	    _this.subject = subject;
	    _this.subscriber = subscriber;
	    _this.closed = false;
	    return _this;
	  }

	  SubjectSubscription.prototype.unsubscribe = function () {
	    if (this.closed) {
	      return;
	    }

	    this.closed = true;
	    var subject = this.subject;
	    var observers = subject.observers;
	    this.subject = null;

	    if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
	      return;
	    }

	    var subscriberIndex = observers.indexOf(this.subscriber);

	    if (subscriberIndex !== -1) {
	      observers.splice(subscriberIndex, 1);
	    }
	  };

	  return SubjectSubscription;
	}(Subscription);

	var SubjectSubscriber = function (_super) {
	  __extends(SubjectSubscriber, _super);

	  function SubjectSubscriber(destination) {
	    var _this = _super.call(this, destination) || this;

	    _this.destination = destination;
	    return _this;
	  }

	  return SubjectSubscriber;
	}(Subscriber);

	var Subject = function (_super) {
	  __extends(Subject, _super);

	  function Subject() {
	    var _this = _super.call(this) || this;

	    _this.observers = [];
	    _this.closed = false;
	    _this.isStopped = false;
	    _this.hasError = false;
	    _this.thrownError = null;
	    return _this;
	  }

	  Subject.prototype[rxSubscriber] = function () {
	    return new SubjectSubscriber(this);
	  };

	  Subject.prototype.lift = function (operator) {
	    var subject = new AnonymousSubject(this, this);
	    subject.operator = operator;
	    return subject;
	  };

	  Subject.prototype.next = function (value) {
	    if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    }

	    if (!this.isStopped) {
	      var observers = this.observers;
	      var len = observers.length;
	      var copy = observers.slice();

	      for (var i = 0; i < len; i++) {
	        copy[i].next(value);
	      }
	    }
	  };

	  Subject.prototype.error = function (err) {
	    if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    }

	    this.hasError = true;
	    this.thrownError = err;
	    this.isStopped = true;
	    var observers = this.observers;
	    var len = observers.length;
	    var copy = observers.slice();

	    for (var i = 0; i < len; i++) {
	      copy[i].error(err);
	    }

	    this.observers.length = 0;
	  };

	  Subject.prototype.complete = function () {
	    if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    }

	    this.isStopped = true;
	    var observers = this.observers;
	    var len = observers.length;
	    var copy = observers.slice();

	    for (var i = 0; i < len; i++) {
	      copy[i].complete();
	    }

	    this.observers.length = 0;
	  };

	  Subject.prototype.unsubscribe = function () {
	    this.isStopped = true;
	    this.closed = true;
	    this.observers = null;
	  };

	  Subject.prototype._trySubscribe = function (subscriber) {
	    if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    } else {
	      return _super.prototype._trySubscribe.call(this, subscriber);
	    }
	  };

	  Subject.prototype._subscribe = function (subscriber) {
	    if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    } else if (this.hasError) {
	      subscriber.error(this.thrownError);
	      return Subscription.EMPTY;
	    } else if (this.isStopped) {
	      subscriber.complete();
	      return Subscription.EMPTY;
	    } else {
	      this.observers.push(subscriber);
	      return new SubjectSubscription(this, subscriber);
	    }
	  };

	  Subject.prototype.asObservable = function () {
	    var observable = new Observable();
	    observable.source = this;
	    return observable;
	  };

	  Subject.create = function (destination, source) {
	    return new AnonymousSubject(destination, source);
	  };

	  return Subject;
	}(Observable);

	var AnonymousSubject = function (_super) {
	  __extends(AnonymousSubject, _super);

	  function AnonymousSubject(destination, source) {
	    var _this = _super.call(this) || this;

	    _this.destination = destination;
	    _this.source = source;
	    return _this;
	  }

	  AnonymousSubject.prototype.next = function (value) {
	    var destination = this.destination;

	    if (destination && destination.next) {
	      destination.next(value);
	    }
	  };

	  AnonymousSubject.prototype.error = function (err) {
	    var destination = this.destination;

	    if (destination && destination.error) {
	      this.destination.error(err);
	    }
	  };

	  AnonymousSubject.prototype.complete = function () {
	    var destination = this.destination;

	    if (destination && destination.complete) {
	      this.destination.complete();
	    }
	  };

	  AnonymousSubject.prototype._subscribe = function (subscriber) {
	    var source = this.source;

	    if (source) {
	      return this.source.subscribe(subscriber);
	    } else {
	      return Subscription.EMPTY;
	    }
	  };

	  return AnonymousSubject;
	}(Subject);

	function refCount() {
	  return function refCountOperatorFunction(source) {
	    return source.lift(new RefCountOperator(source));
	  };
	}

	var RefCountOperator = function () {
	  function RefCountOperator(connectable) {
	    this.connectable = connectable;
	  }

	  RefCountOperator.prototype.call = function (subscriber, source) {
	    var connectable = this.connectable;
	    connectable._refCount++;
	    var refCounter = new RefCountSubscriber(subscriber, connectable);
	    var subscription = source.subscribe(refCounter);

	    if (!refCounter.closed) {
	      refCounter.connection = connectable.connect();
	    }

	    return subscription;
	  };

	  return RefCountOperator;
	}();

	var RefCountSubscriber = function (_super) {
	  __extends(RefCountSubscriber, _super);

	  function RefCountSubscriber(destination, connectable) {
	    var _this = _super.call(this, destination) || this;

	    _this.connectable = connectable;
	    return _this;
	  }

	  RefCountSubscriber.prototype._unsubscribe = function () {
	    var connectable = this.connectable;

	    if (!connectable) {
	      this.connection = null;
	      return;
	    }

	    this.connectable = null;
	    var refCount = connectable._refCount;

	    if (refCount <= 0) {
	      this.connection = null;
	      return;
	    }

	    connectable._refCount = refCount - 1;

	    if (refCount > 1) {
	      this.connection = null;
	      return;
	    }

	    var connection = this.connection;
	    var sharedConnection = connectable._connection;
	    this.connection = null;

	    if (sharedConnection && (!connection || sharedConnection === connection)) {
	      sharedConnection.unsubscribe();
	    }
	  };

	  return RefCountSubscriber;
	}(Subscriber);

	var ConnectableObservable = function (_super) {
	  __extends(ConnectableObservable, _super);

	  function ConnectableObservable(source, subjectFactory) {
	    var _this = _super.call(this) || this;

	    _this.source = source;
	    _this.subjectFactory = subjectFactory;
	    _this._refCount = 0;
	    _this._isComplete = false;
	    return _this;
	  }

	  ConnectableObservable.prototype._subscribe = function (subscriber) {
	    return this.getSubject().subscribe(subscriber);
	  };

	  ConnectableObservable.prototype.getSubject = function () {
	    var subject = this._subject;

	    if (!subject || subject.isStopped) {
	      this._subject = this.subjectFactory();
	    }

	    return this._subject;
	  };

	  ConnectableObservable.prototype.connect = function () {
	    var connection = this._connection;

	    if (!connection) {
	      this._isComplete = false;
	      connection = this._connection = new Subscription();
	      connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));

	      if (connection.closed) {
	        this._connection = null;
	        connection = Subscription.EMPTY;
	      } else {
	        this._connection = connection;
	      }
	    }

	    return connection;
	  };

	  ConnectableObservable.prototype.refCount = function () {
	    return refCount()(this);
	  };

	  return ConnectableObservable;
	}(Observable);

	var connectableProto = ConnectableObservable.prototype;
	var connectableObservableDescriptor = {
	  operator: {
	    value: null
	  },
	  _refCount: {
	    value: 0,
	    writable: true
	  },
	  _subject: {
	    value: null,
	    writable: true
	  },
	  _connection: {
	    value: null,
	    writable: true
	  },
	  _subscribe: {
	    value: connectableProto._subscribe
	  },
	  _isComplete: {
	    value: connectableProto._isComplete,
	    writable: true
	  },
	  getSubject: {
	    value: connectableProto.getSubject
	  },
	  connect: {
	    value: connectableProto.connect
	  },
	  refCount: {
	    value: connectableProto.refCount
	  }
	};

	var ConnectableSubscriber = function (_super) {
	  __extends(ConnectableSubscriber, _super);

	  function ConnectableSubscriber(destination, connectable) {
	    var _this = _super.call(this, destination) || this;

	    _this.connectable = connectable;
	    return _this;
	  }

	  ConnectableSubscriber.prototype._error = function (err) {
	    this._unsubscribe();

	    _super.prototype._error.call(this, err);
	  };

	  ConnectableSubscriber.prototype._complete = function () {
	    this.connectable._isComplete = true;

	    this._unsubscribe();

	    _super.prototype._complete.call(this);
	  };

	  ConnectableSubscriber.prototype._unsubscribe = function () {
	    var connectable = this.connectable;

	    if (connectable) {
	      this.connectable = null;
	      var connection = connectable._connection;
	      connectable._refCount = 0;
	      connectable._subject = null;
	      connectable._connection = null;

	      if (connection) {
	        connection.unsubscribe();
	      }
	    }
	  };

	  return ConnectableSubscriber;
	}(SubjectSubscriber);

	var RefCountSubscriber$1 = function (_super) {
	  __extends(RefCountSubscriber, _super);

	  function RefCountSubscriber(destination, connectable) {
	    var _this = _super.call(this, destination) || this;

	    _this.connectable = connectable;
	    return _this;
	  }

	  RefCountSubscriber.prototype._unsubscribe = function () {
	    var connectable = this.connectable;

	    if (!connectable) {
	      this.connection = null;
	      return;
	    }

	    this.connectable = null;
	    var refCount$$1 = connectable._refCount;

	    if (refCount$$1 <= 0) {
	      this.connection = null;
	      return;
	    }

	    connectable._refCount = refCount$$1 - 1;

	    if (refCount$$1 > 1) {
	      this.connection = null;
	      return;
	    }

	    var connection = this.connection;
	    var sharedConnection = connectable._connection;
	    this.connection = null;

	    if (sharedConnection && (!connection || sharedConnection === connection)) {
	      sharedConnection.unsubscribe();
	    }
	  };

	  return RefCountSubscriber;
	}(Subscriber);

	var GroupBySubscriber = function (_super) {
	  __extends(GroupBySubscriber, _super);

	  function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
	    var _this = _super.call(this, destination) || this;

	    _this.keySelector = keySelector;
	    _this.elementSelector = elementSelector;
	    _this.durationSelector = durationSelector;
	    _this.subjectSelector = subjectSelector;
	    _this.groups = null;
	    _this.attemptedToUnsubscribe = false;
	    _this.count = 0;
	    return _this;
	  }

	  GroupBySubscriber.prototype._next = function (value) {
	    var key;

	    try {
	      key = this.keySelector(value);
	    } catch (err) {
	      this.error(err);
	      return;
	    }

	    this._group(value, key);
	  };

	  GroupBySubscriber.prototype._group = function (value, key) {
	    var groups = this.groups;

	    if (!groups) {
	      groups = this.groups = new Map();
	    }

	    var group = groups.get(key);
	    var element;

	    if (this.elementSelector) {
	      try {
	        element = this.elementSelector(value);
	      } catch (err) {
	        this.error(err);
	      }
	    } else {
	      element = value;
	    }

	    if (!group) {
	      group = this.subjectSelector ? this.subjectSelector() : new Subject();
	      groups.set(key, group);
	      var groupedObservable = new GroupedObservable(key, group, this);
	      this.destination.next(groupedObservable);

	      if (this.durationSelector) {
	        var duration = void 0;

	        try {
	          duration = this.durationSelector(new GroupedObservable(key, group));
	        } catch (err) {
	          this.error(err);
	          return;
	        }

	        this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
	      }
	    }

	    if (!group.closed) {
	      group.next(element);
	    }
	  };

	  GroupBySubscriber.prototype._error = function (err) {
	    var groups = this.groups;

	    if (groups) {
	      groups.forEach(function (group, key) {
	        group.error(err);
	      });
	      groups.clear();
	    }

	    this.destination.error(err);
	  };

	  GroupBySubscriber.prototype._complete = function () {
	    var groups = this.groups;

	    if (groups) {
	      groups.forEach(function (group, key) {
	        group.complete();
	      });
	      groups.clear();
	    }

	    this.destination.complete();
	  };

	  GroupBySubscriber.prototype.removeGroup = function (key) {
	    this.groups.delete(key);
	  };

	  GroupBySubscriber.prototype.unsubscribe = function () {
	    if (!this.closed) {
	      this.attemptedToUnsubscribe = true;

	      if (this.count === 0) {
	        _super.prototype.unsubscribe.call(this);
	      }
	    }
	  };

	  return GroupBySubscriber;
	}(Subscriber);

	var GroupDurationSubscriber = function (_super) {
	  __extends(GroupDurationSubscriber, _super);

	  function GroupDurationSubscriber(key, group, parent) {
	    var _this = _super.call(this, group) || this;

	    _this.key = key;
	    _this.group = group;
	    _this.parent = parent;
	    return _this;
	  }

	  GroupDurationSubscriber.prototype._next = function (value) {
	    this.complete();
	  };

	  GroupDurationSubscriber.prototype._unsubscribe = function () {
	    var _a = this,
	        parent = _a.parent,
	        key = _a.key;

	    this.key = this.parent = null;

	    if (parent) {
	      parent.removeGroup(key);
	    }
	  };

	  return GroupDurationSubscriber;
	}(Subscriber);

	var GroupedObservable = function (_super) {
	  __extends(GroupedObservable, _super);

	  function GroupedObservable(key, groupSubject, refCountSubscription) {
	    var _this = _super.call(this) || this;

	    _this.key = key;
	    _this.groupSubject = groupSubject;
	    _this.refCountSubscription = refCountSubscription;
	    return _this;
	  }

	  GroupedObservable.prototype._subscribe = function (subscriber) {
	    var subscription = new Subscription();

	    var _a = this,
	        refCountSubscription = _a.refCountSubscription,
	        groupSubject = _a.groupSubject;

	    if (refCountSubscription && !refCountSubscription.closed) {
	      subscription.add(new InnerRefCountSubscription(refCountSubscription));
	    }

	    subscription.add(groupSubject.subscribe(subscriber));
	    return subscription;
	  };

	  return GroupedObservable;
	}(Observable);

	var InnerRefCountSubscription = function (_super) {
	  __extends(InnerRefCountSubscription, _super);

	  function InnerRefCountSubscription(parent) {
	    var _this = _super.call(this) || this;

	    _this.parent = parent;
	    parent.count++;
	    return _this;
	  }

	  InnerRefCountSubscription.prototype.unsubscribe = function () {
	    var parent = this.parent;

	    if (!parent.closed && !this.closed) {
	      _super.prototype.unsubscribe.call(this);

	      parent.count -= 1;

	      if (parent.count === 0 && parent.attemptedToUnsubscribe) {
	        parent.unsubscribe();
	      }
	    }
	  };

	  return InnerRefCountSubscription;
	}(Subscription);

	var BehaviorSubject = function (_super) {
	  __extends(BehaviorSubject, _super);

	  function BehaviorSubject(_value) {
	    var _this = _super.call(this) || this;

	    _this._value = _value;
	    return _this;
	  }

	  Object.defineProperty(BehaviorSubject.prototype, "value", {
	    get: function get() {
	      return this.getValue();
	    },
	    enumerable: true,
	    configurable: true
	  });

	  BehaviorSubject.prototype._subscribe = function (subscriber) {
	    var subscription = _super.prototype._subscribe.call(this, subscriber);

	    if (subscription && !subscription.closed) {
	      subscriber.next(this._value);
	    }

	    return subscription;
	  };

	  BehaviorSubject.prototype.getValue = function () {
	    if (this.hasError) {
	      throw this.thrownError;
	    } else if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    } else {
	      return this._value;
	    }
	  };

	  BehaviorSubject.prototype.next = function (value) {
	    _super.prototype.next.call(this, this._value = value);
	  };

	  return BehaviorSubject;
	}(Subject);

	var Action = function (_super) {
	  __extends(Action, _super);

	  function Action(scheduler, work) {
	    return _super.call(this) || this;
	  }

	  Action.prototype.schedule = function (state, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    return this;
	  };

	  return Action;
	}(Subscription);

	var AsyncAction = function (_super) {
	  __extends(AsyncAction, _super);

	  function AsyncAction(scheduler, work) {
	    var _this = _super.call(this, scheduler, work) || this;

	    _this.scheduler = scheduler;
	    _this.work = work;
	    _this.pending = false;
	    return _this;
	  }

	  AsyncAction.prototype.schedule = function (state, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (this.closed) {
	      return this;
	    }

	    this.state = state;
	    var id = this.id;
	    var scheduler = this.scheduler;

	    if (id != null) {
	      this.id = this.recycleAsyncId(scheduler, id, delay);
	    }

	    this.pending = true;
	    this.delay = delay;
	    this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
	    return this;
	  };

	  AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    return setInterval(scheduler.flush.bind(scheduler, this), delay);
	  };

	  AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay !== null && this.delay === delay && this.pending === false) {
	      return id;
	    }

	    clearInterval(id);
	  };

	  AsyncAction.prototype.execute = function (state, delay) {
	    if (this.closed) {
	      return new Error('executing a cancelled action');
	    }

	    this.pending = false;

	    var error = this._execute(state, delay);

	    if (error) {
	      return error;
	    } else if (this.pending === false && this.id != null) {
	      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
	    }
	  };

	  AsyncAction.prototype._execute = function (state, delay) {
	    var errored = false;
	    var errorValue = undefined;

	    try {
	      this.work(state);
	    } catch (e) {
	      errored = true;
	      errorValue = !!e && e || new Error(e);
	    }

	    if (errored) {
	      this.unsubscribe();
	      return errorValue;
	    }
	  };

	  AsyncAction.prototype._unsubscribe = function () {
	    var id = this.id;
	    var scheduler = this.scheduler;
	    var actions = scheduler.actions;
	    var index = actions.indexOf(this);
	    this.work = null;
	    this.state = null;
	    this.pending = false;
	    this.scheduler = null;

	    if (index !== -1) {
	      actions.splice(index, 1);
	    }

	    if (id != null) {
	      this.id = this.recycleAsyncId(scheduler, id, null);
	    }

	    this.delay = null;
	  };

	  return AsyncAction;
	}(Action);

	var QueueAction = function (_super) {
	  __extends(QueueAction, _super);

	  function QueueAction(scheduler, work) {
	    var _this = _super.call(this, scheduler, work) || this;

	    _this.scheduler = scheduler;
	    _this.work = work;
	    return _this;
	  }

	  QueueAction.prototype.schedule = function (state, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay > 0) {
	      return _super.prototype.schedule.call(this, state, delay);
	    }

	    this.delay = delay;
	    this.state = state;
	    this.scheduler.flush(this);
	    return this;
	  };

	  QueueAction.prototype.execute = function (state, delay) {
	    return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
	  };

	  QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
	      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	    }

	    return scheduler.flush(this);
	  };

	  return QueueAction;
	}(AsyncAction);

	var Scheduler = function () {
	  function Scheduler(SchedulerAction, now) {
	    if (now === void 0) {
	      now = Scheduler.now;
	    }

	    this.SchedulerAction = SchedulerAction;
	    this.now = now;
	  }

	  Scheduler.prototype.schedule = function (work, delay, state) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    return new this.SchedulerAction(this, work).schedule(state, delay);
	  };

	  Scheduler.now = function () {
	    return Date.now();
	  };

	  return Scheduler;
	}();

	var AsyncScheduler = function (_super) {
	  __extends(AsyncScheduler, _super);

	  function AsyncScheduler(SchedulerAction, now) {
	    if (now === void 0) {
	      now = Scheduler.now;
	    }

	    var _this = _super.call(this, SchedulerAction, function () {
	      if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
	        return AsyncScheduler.delegate.now();
	      } else {
	        return now();
	      }
	    }) || this;

	    _this.actions = [];
	    _this.active = false;
	    _this.scheduled = undefined;
	    return _this;
	  }

	  AsyncScheduler.prototype.schedule = function (work, delay, state) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
	      return AsyncScheduler.delegate.schedule(work, delay, state);
	    } else {
	      return _super.prototype.schedule.call(this, work, delay, state);
	    }
	  };

	  AsyncScheduler.prototype.flush = function (action) {
	    var actions = this.actions;

	    if (this.active) {
	      actions.push(action);
	      return;
	    }

	    var error;
	    this.active = true;

	    do {
	      if (error = action.execute(action.state, action.delay)) {
	        break;
	      }
	    } while (action = actions.shift());

	    this.active = false;

	    if (error) {
	      while (action = actions.shift()) {
	        action.unsubscribe();
	      }

	      throw error;
	    }
	  };

	  return AsyncScheduler;
	}(Scheduler);

	var QueueScheduler = function (_super) {
	  __extends(QueueScheduler, _super);

	  function QueueScheduler() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return QueueScheduler;
	}(AsyncScheduler);

	var queue$1 = new QueueScheduler(QueueAction);
	var EMPTY = new Observable(function (subscriber) {
	  return subscriber.complete();
	});

	function empty$1$1(scheduler) {
	  return scheduler ? emptyScheduled(scheduler) : EMPTY;
	}

	function emptyScheduled(scheduler) {
	  return new Observable(function (subscriber) {
	    return scheduler.schedule(function () {
	      return subscriber.complete();
	    });
	  });
	}

	function isScheduler(value) {
	  return value && typeof value.schedule === 'function';
	}

	var subscribeToArray = function subscribeToArray(array) {
	  return function (subscriber) {
	    for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
	      subscriber.next(array[i]);
	    }

	    if (!subscriber.closed) {
	      subscriber.complete();
	    }
	  };
	};

	function fromArray(input, scheduler) {
	  if (!scheduler) {
	    return new Observable(subscribeToArray(input));
	  } else {
	    return new Observable(function (subscriber) {
	      var sub = new Subscription();
	      var i = 0;
	      sub.add(scheduler.schedule(function () {
	        if (i === input.length) {
	          subscriber.complete();
	          return;
	        }

	        subscriber.next(input[i++]);

	        if (!subscriber.closed) {
	          sub.add(this.schedule());
	        }
	      }));
	      return sub;
	    });
	  }
	}

	function scalar(value) {
	  var result = new Observable(function (subscriber) {
	    subscriber.next(value);
	    subscriber.complete();
	  });
	  result._isScalar = true;
	  result.value = value;
	  return result;
	}

	function of() {
	  var args = [];

	  for (var _i = 0; _i < arguments.length; _i++) {
	    args[_i] = arguments[_i];
	  }

	  var scheduler = args[args.length - 1];

	  if (isScheduler(scheduler)) {
	    args.pop();
	  } else {
	    scheduler = undefined;
	  }

	  switch (args.length) {
	    case 0:
	      return empty$1$1(scheduler);

	    case 1:
	      return scheduler ? fromArray(args, scheduler) : scalar(args[0]);

	    default:
	      return fromArray(args, scheduler);
	  }
	}

	function throwError(error, scheduler) {
	  if (!scheduler) {
	    return new Observable(function (subscriber) {
	      return subscriber.error(error);
	    });
	  } else {
	    return new Observable(function (subscriber) {
	      return scheduler.schedule(dispatch, 0, {
	        error: error,
	        subscriber: subscriber
	      });
	    });
	  }
	}

	function dispatch(_a) {
	  var error = _a.error,
	      subscriber = _a.subscriber;
	  subscriber.error(error);
	}

	var Notification = function () {
	  function Notification(kind, value, error) {
	    this.kind = kind;
	    this.value = value;
	    this.error = error;
	    this.hasValue = kind === 'N';
	  }

	  Notification.prototype.observe = function (observer) {
	    switch (this.kind) {
	      case 'N':
	        return observer.next && observer.next(this.value);

	      case 'E':
	        return observer.error && observer.error(this.error);

	      case 'C':
	        return observer.complete && observer.complete();
	    }
	  };

	  Notification.prototype.do = function (next, error, complete) {
	    var kind = this.kind;

	    switch (kind) {
	      case 'N':
	        return next && next(this.value);

	      case 'E':
	        return error && error(this.error);

	      case 'C':
	        return complete && complete();
	    }
	  };

	  Notification.prototype.accept = function (nextOrObserver, error, complete) {
	    if (nextOrObserver && typeof nextOrObserver.next === 'function') {
	      return this.observe(nextOrObserver);
	    } else {
	      return this.do(nextOrObserver, error, complete);
	    }
	  };

	  Notification.prototype.toObservable = function () {
	    var kind = this.kind;

	    switch (kind) {
	      case 'N':
	        return of(this.value);

	      case 'E':
	        return throwError(this.error);

	      case 'C':
	        return empty$1$1();
	    }

	    throw new Error('unexpected notification kind value');
	  };

	  Notification.createNext = function (value) {
	    if (typeof value !== 'undefined') {
	      return new Notification('N', value);
	    }

	    return Notification.undefinedValueNotification;
	  };

	  Notification.createError = function (err) {
	    return new Notification('E', undefined, err);
	  };

	  Notification.createComplete = function () {
	    return Notification.completeNotification;
	  };

	  Notification.completeNotification = new Notification('C');
	  Notification.undefinedValueNotification = new Notification('N', undefined);
	  return Notification;
	}();

	var ObserveOnSubscriber = function (_super) {
	  __extends(ObserveOnSubscriber, _super);

	  function ObserveOnSubscriber(destination, scheduler, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    var _this = _super.call(this, destination) || this;

	    _this.scheduler = scheduler;
	    _this.delay = delay;
	    return _this;
	  }

	  ObserveOnSubscriber.dispatch = function (arg) {
	    var notification = arg.notification,
	        destination = arg.destination;
	    notification.observe(destination);
	    this.unsubscribe();
	  };

	  ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
	    this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
	  };

	  ObserveOnSubscriber.prototype._next = function (value) {
	    this.scheduleMessage(Notification.createNext(value));
	  };

	  ObserveOnSubscriber.prototype._error = function (err) {
	    this.scheduleMessage(Notification.createError(err));
	  };

	  ObserveOnSubscriber.prototype._complete = function () {
	    this.scheduleMessage(Notification.createComplete());
	  };

	  return ObserveOnSubscriber;
	}(Subscriber);

	var ObserveOnMessage = function () {
	  function ObserveOnMessage(notification, destination) {
	    this.notification = notification;
	    this.destination = destination;
	  }

	  return ObserveOnMessage;
	}();

	var ReplaySubject = function (_super) {
	  __extends(ReplaySubject, _super);

	  function ReplaySubject(bufferSize, windowTime, scheduler) {
	    if (bufferSize === void 0) {
	      bufferSize = Number.POSITIVE_INFINITY;
	    }

	    if (windowTime === void 0) {
	      windowTime = Number.POSITIVE_INFINITY;
	    }

	    var _this = _super.call(this) || this;

	    _this.scheduler = scheduler;
	    _this._events = [];
	    _this._infiniteTimeWindow = false;
	    _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
	    _this._windowTime = windowTime < 1 ? 1 : windowTime;

	    if (windowTime === Number.POSITIVE_INFINITY) {
	      _this._infiniteTimeWindow = true;
	      _this.next = _this.nextInfiniteTimeWindow;
	    } else {
	      _this.next = _this.nextTimeWindow;
	    }

	    return _this;
	  }

	  ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
	    var _events = this._events;

	    _events.push(value);

	    if (_events.length > this._bufferSize) {
	      _events.shift();
	    }

	    _super.prototype.next.call(this, value);
	  };

	  ReplaySubject.prototype.nextTimeWindow = function (value) {
	    this._events.push(new ReplayEvent(this._getNow(), value));

	    this._trimBufferThenGetEvents();

	    _super.prototype.next.call(this, value);
	  };

	  ReplaySubject.prototype._subscribe = function (subscriber) {
	    var _infiniteTimeWindow = this._infiniteTimeWindow;

	    var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();

	    var scheduler = this.scheduler;
	    var len = _events.length;
	    var subscription;

	    if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    } else if (this.isStopped || this.hasError) {
	      subscription = Subscription.EMPTY;
	    } else {
	      this.observers.push(subscriber);
	      subscription = new SubjectSubscription(this, subscriber);
	    }

	    if (scheduler) {
	      subscriber.add(subscriber = new ObserveOnSubscriber(subscriber, scheduler));
	    }

	    if (_infiniteTimeWindow) {
	      for (var i = 0; i < len && !subscriber.closed; i++) {
	        subscriber.next(_events[i]);
	      }
	    } else {
	      for (var i = 0; i < len && !subscriber.closed; i++) {
	        subscriber.next(_events[i].value);
	      }
	    }

	    if (this.hasError) {
	      subscriber.error(this.thrownError);
	    } else if (this.isStopped) {
	      subscriber.complete();
	    }

	    return subscription;
	  };

	  ReplaySubject.prototype._getNow = function () {
	    return (this.scheduler || queue$1).now();
	  };

	  ReplaySubject.prototype._trimBufferThenGetEvents = function () {
	    var now = this._getNow();

	    var _bufferSize = this._bufferSize;
	    var _windowTime = this._windowTime;
	    var _events = this._events;
	    var eventsCount = _events.length;
	    var spliceCount = 0;

	    while (spliceCount < eventsCount) {
	      if (now - _events[spliceCount].time < _windowTime) {
	        break;
	      }

	      spliceCount++;
	    }

	    if (eventsCount > _bufferSize) {
	      spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
	    }

	    if (spliceCount > 0) {
	      _events.splice(0, spliceCount);
	    }

	    return _events;
	  };

	  return ReplaySubject;
	}(Subject);

	var ReplayEvent = function () {
	  function ReplayEvent(time, value) {
	    this.time = time;
	    this.value = value;
	  }

	  return ReplayEvent;
	}();

	var AsyncSubject = function (_super) {
	  __extends(AsyncSubject, _super);

	  function AsyncSubject() {
	    var _this = _super !== null && _super.apply(this, arguments) || this;

	    _this.value = null;
	    _this.hasNext = false;
	    _this.hasCompleted = false;
	    return _this;
	  }

	  AsyncSubject.prototype._subscribe = function (subscriber) {
	    if (this.hasError) {
	      subscriber.error(this.thrownError);
	      return Subscription.EMPTY;
	    } else if (this.hasCompleted && this.hasNext) {
	      subscriber.next(this.value);
	      subscriber.complete();
	      return Subscription.EMPTY;
	    }

	    return _super.prototype._subscribe.call(this, subscriber);
	  };

	  AsyncSubject.prototype.next = function (value) {
	    if (!this.hasCompleted) {
	      this.value = value;
	      this.hasNext = true;
	    }
	  };

	  AsyncSubject.prototype.error = function (error) {
	    if (!this.hasCompleted) {
	      _super.prototype.error.call(this, error);
	    }
	  };

	  AsyncSubject.prototype.complete = function () {
	    this.hasCompleted = true;

	    if (this.hasNext) {
	      _super.prototype.next.call(this, this.value);
	    }

	    _super.prototype.complete.call(this);
	  };

	  return AsyncSubject;
	}(Subject);

	var nextHandle = 1;
	var tasksByHandle = {};

	function runIfPresent(handle) {
	  var cb = tasksByHandle[handle];

	  if (cb) {
	    cb();
	  }
	}

	var Immediate = {
	  setImmediate: function setImmediate(cb) {
	    var handle = nextHandle++;
	    tasksByHandle[handle] = cb;
	    Promise.resolve().then(function () {
	      return runIfPresent(handle);
	    });
	    return handle;
	  },
	  clearImmediate: function clearImmediate(handle) {
	    delete tasksByHandle[handle];
	  }
	};

	var AsapAction = function (_super) {
	  __extends(AsapAction, _super);

	  function AsapAction(scheduler, work) {
	    var _this = _super.call(this, scheduler, work) || this;

	    _this.scheduler = scheduler;
	    _this.work = work;
	    return _this;
	  }

	  AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay !== null && delay > 0) {
	      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	    }

	    scheduler.actions.push(this);
	    return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
	  };

	  AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
	      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
	    }

	    if (scheduler.actions.length === 0) {
	      Immediate.clearImmediate(id);
	      scheduler.scheduled = undefined;
	    }

	    return undefined;
	  };

	  return AsapAction;
	}(AsyncAction);

	var AsapScheduler = function (_super) {
	  __extends(AsapScheduler, _super);

	  function AsapScheduler() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  AsapScheduler.prototype.flush = function (action) {
	    this.active = true;
	    this.scheduled = undefined;
	    var actions = this.actions;
	    var error;
	    var index = -1;
	    var count = actions.length;
	    action = action || actions.shift();

	    do {
	      if (error = action.execute(action.state, action.delay)) {
	        break;
	      }
	    } while (++index < count && (action = actions.shift()));

	    this.active = false;

	    if (error) {
	      while (++index < count && (action = actions.shift())) {
	        action.unsubscribe();
	      }

	      throw error;
	    }
	  };

	  return AsapScheduler;
	}(AsyncScheduler);

	var asap = new AsapScheduler(AsapAction);
	var async = new AsyncScheduler(AsyncAction);

	var AnimationFrameAction = function (_super) {
	  __extends(AnimationFrameAction, _super);

	  function AnimationFrameAction(scheduler, work) {
	    var _this = _super.call(this, scheduler, work) || this;

	    _this.scheduler = scheduler;
	    _this.work = work;
	    return _this;
	  }

	  AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay !== null && delay > 0) {
	      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	    }

	    scheduler.actions.push(this);
	    return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () {
	      return scheduler.flush(null);
	    }));
	  };

	  AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
	      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
	    }

	    if (scheduler.actions.length === 0) {
	      cancelAnimationFrame(id);
	      scheduler.scheduled = undefined;
	    }

	    return undefined;
	  };

	  return AnimationFrameAction;
	}(AsyncAction);

	var AnimationFrameScheduler = function (_super) {
	  __extends(AnimationFrameScheduler, _super);

	  function AnimationFrameScheduler() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  AnimationFrameScheduler.prototype.flush = function (action) {
	    this.active = true;
	    this.scheduled = undefined;
	    var actions = this.actions;
	    var error;
	    var index = -1;
	    var count = actions.length;
	    action = action || actions.shift();

	    do {
	      if (error = action.execute(action.state, action.delay)) {
	        break;
	      }
	    } while (++index < count && (action = actions.shift()));

	    this.active = false;

	    if (error) {
	      while (++index < count && (action = actions.shift())) {
	        action.unsubscribe();
	      }

	      throw error;
	    }
	  };

	  return AnimationFrameScheduler;
	}(AsyncScheduler);

	var animationFrame = new AnimationFrameScheduler(AnimationFrameAction);

	var VirtualTimeScheduler = function (_super) {
	  __extends(VirtualTimeScheduler, _super);

	  function VirtualTimeScheduler(SchedulerAction, maxFrames) {
	    if (SchedulerAction === void 0) {
	      SchedulerAction = VirtualAction;
	    }

	    if (maxFrames === void 0) {
	      maxFrames = Number.POSITIVE_INFINITY;
	    }

	    var _this = _super.call(this, SchedulerAction, function () {
	      return _this.frame;
	    }) || this;

	    _this.maxFrames = maxFrames;
	    _this.frame = 0;
	    _this.index = -1;
	    return _this;
	  }

	  VirtualTimeScheduler.prototype.flush = function () {
	    var _a = this,
	        actions = _a.actions,
	        maxFrames = _a.maxFrames;

	    var error, action;

	    while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
	      if (error = action.execute(action.state, action.delay)) {
	        break;
	      }
	    }

	    if (error) {
	      while (action = actions.shift()) {
	        action.unsubscribe();
	      }

	      throw error;
	    }
	  };

	  VirtualTimeScheduler.frameTimeFactor = 10;
	  return VirtualTimeScheduler;
	}(AsyncScheduler);

	var VirtualAction = function (_super) {
	  __extends(VirtualAction, _super);

	  function VirtualAction(scheduler, work, index) {
	    if (index === void 0) {
	      index = scheduler.index += 1;
	    }

	    var _this = _super.call(this, scheduler, work) || this;

	    _this.scheduler = scheduler;
	    _this.work = work;
	    _this.index = index;
	    _this.active = true;
	    _this.index = scheduler.index = index;
	    return _this;
	  }

	  VirtualAction.prototype.schedule = function (state, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (!this.id) {
	      return _super.prototype.schedule.call(this, state, delay);
	    }

	    this.active = false;
	    var action = new VirtualAction(this.scheduler, this.work);
	    this.add(action);
	    return action.schedule(state, delay);
	  };

	  VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    this.delay = scheduler.frame + delay;
	    var actions = scheduler.actions;
	    actions.push(this);
	    actions.sort(VirtualAction.sortActions);
	    return true;
	  };

	  VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    return undefined;
	  };

	  VirtualAction.prototype._execute = function (state, delay) {
	    if (this.active === true) {
	      return _super.prototype._execute.call(this, state, delay);
	    }
	  };

	  VirtualAction.sortActions = function (a, b) {
	    if (a.delay === b.delay) {
	      if (a.index === b.index) {
	        return 0;
	      } else if (a.index > b.index) {
	        return 1;
	      } else {
	        return -1;
	      }
	    } else if (a.delay > b.delay) {
	      return 1;
	    } else {
	      return -1;
	    }
	  };

	  return VirtualAction;
	}(AsyncAction);

	function identity$1(x) {
	  return x;
	}

	function EmptyErrorImpl() {
	  Error.call(this);
	  this.message = 'no elements in sequence';
	  this.name = 'EmptyError';
	  return this;
	}

	EmptyErrorImpl.prototype = Object.create(Error.prototype);
	var EmptyError = EmptyErrorImpl;

	function map(project, thisArg) {
	  return function mapOperation(source) {
	    if (typeof project !== 'function') {
	      throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
	    }

	    return source.lift(new MapOperator(project, thisArg));
	  };
	}

	var MapOperator = function () {
	  function MapOperator(project, thisArg) {
	    this.project = project;
	    this.thisArg = thisArg;
	  }

	  MapOperator.prototype.call = function (subscriber, source) {
	    return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
	  };

	  return MapOperator;
	}();

	var MapSubscriber = function (_super) {
	  __extends(MapSubscriber, _super);

	  function MapSubscriber(destination, project, thisArg) {
	    var _this = _super.call(this, destination) || this;

	    _this.project = project;
	    _this.count = 0;
	    _this.thisArg = thisArg || _this;
	    return _this;
	  }

	  MapSubscriber.prototype._next = function (value) {
	    var result;

	    try {
	      result = this.project.call(this.thisArg, value, this.count++);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    this.destination.next(result);
	  };

	  return MapSubscriber;
	}(Subscriber);

	var OuterSubscriber = function (_super) {
	  __extends(OuterSubscriber, _super);

	  function OuterSubscriber() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.destination.next(innerValue);
	  };

	  OuterSubscriber.prototype.notifyError = function (error, innerSub) {
	    this.destination.error(error);
	  };

	  OuterSubscriber.prototype.notifyComplete = function (innerSub) {
	    this.destination.complete();
	  };

	  return OuterSubscriber;
	}(Subscriber);

	var InnerSubscriber = function (_super) {
	  __extends(InnerSubscriber, _super);

	  function InnerSubscriber(parent, outerValue, outerIndex) {
	    var _this = _super.call(this) || this;

	    _this.parent = parent;
	    _this.outerValue = outerValue;
	    _this.outerIndex = outerIndex;
	    _this.index = 0;
	    return _this;
	  }

	  InnerSubscriber.prototype._next = function (value) {
	    this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
	  };

	  InnerSubscriber.prototype._error = function (error) {
	    this.parent.notifyError(error, this);
	    this.unsubscribe();
	  };

	  InnerSubscriber.prototype._complete = function () {
	    this.parent.notifyComplete(this);
	    this.unsubscribe();
	  };

	  return InnerSubscriber;
	}(Subscriber);

	var subscribeToPromise = function subscribeToPromise(promise) {
	  return function (subscriber) {
	    promise.then(function (value) {
	      if (!subscriber.closed) {
	        subscriber.next(value);
	        subscriber.complete();
	      }
	    }, function (err) {
	      return subscriber.error(err);
	    }).then(null, hostReportError);
	    return subscriber;
	  };
	};

	function getSymbolIterator() {
	  if (typeof Symbol !== 'function' || !Symbol.iterator) {
	    return '@@iterator';
	  }

	  return Symbol.iterator;
	}

	var iterator = getSymbolIterator();

	var subscribeToIterable = function subscribeToIterable(iterable) {
	  return function (subscriber) {
	    var iterator$$1 = iterable[iterator]();

	    do {
	      var item = iterator$$1.next();

	      if (item.done) {
	        subscriber.complete();
	        break;
	      }

	      subscriber.next(item.value);

	      if (subscriber.closed) {
	        break;
	      }
	    } while (true);

	    if (typeof iterator$$1.return === 'function') {
	      subscriber.add(function () {
	        if (iterator$$1.return) {
	          iterator$$1.return();
	        }
	      });
	    }

	    return subscriber;
	  };
	};

	var subscribeToObservable = function subscribeToObservable(obj) {
	  return function (subscriber) {
	    var obs = obj[observable]();

	    if (typeof obs.subscribe !== 'function') {
	      throw new TypeError('Provided object does not correctly implement Symbol.observable');
	    } else {
	      return obs.subscribe(subscriber);
	    }
	  };
	};

	var isArrayLike = function isArrayLike(x) {
	  return x && typeof x.length === 'number' && typeof x !== 'function';
	};

	function isPromise(value) {
	  return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
	}

	var subscribeTo = function subscribeTo(result) {
	  if (result instanceof Observable) {
	    return function (subscriber) {
	      if (result._isScalar) {
	        subscriber.next(result.value);
	        subscriber.complete();
	        return undefined;
	      } else {
	        return result.subscribe(subscriber);
	      }
	    };
	  } else if (result && typeof result[observable] === 'function') {
	    return subscribeToObservable(result);
	  } else if (isArrayLike(result)) {
	    return subscribeToArray(result);
	  } else if (isPromise(result)) {
	    return subscribeToPromise(result);
	  } else if (result && typeof result[iterator] === 'function') {
	    return subscribeToIterable(result);
	  } else {
	    var value = isObject(result) ? 'an invalid object' : "'" + result + "'";
	    var msg = "You provided " + value + " where a stream was expected." + ' You can provide an Observable, Promise, Array, or Iterable.';
	    throw new TypeError(msg);
	  }
	};

	function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination) {
	  if (destination === void 0) {
	    destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
	  }

	  if (destination.closed) {
	    return;
	  }

	  return subscribeTo(result)(destination);
	}

	var NONE = {};

	var CombineLatestSubscriber = function (_super) {
	  __extends(CombineLatestSubscriber, _super);

	  function CombineLatestSubscriber(destination, resultSelector) {
	    var _this = _super.call(this, destination) || this;

	    _this.resultSelector = resultSelector;
	    _this.active = 0;
	    _this.values = [];
	    _this.observables = [];
	    return _this;
	  }

	  CombineLatestSubscriber.prototype._next = function (observable) {
	    this.values.push(NONE);
	    this.observables.push(observable);
	  };

	  CombineLatestSubscriber.prototype._complete = function () {
	    var observables = this.observables;
	    var len = observables.length;

	    if (len === 0) {
	      this.destination.complete();
	    } else {
	      this.active = len;
	      this.toRespond = len;

	      for (var i = 0; i < len; i++) {
	        var observable = observables[i];
	        this.add(subscribeToResult(this, observable, observable, i));
	      }
	    }
	  };

	  CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
	    if ((this.active -= 1) === 0) {
	      this.destination.complete();
	    }
	  };

	  CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    var values = this.values;
	    var oldVal = values[outerIndex];
	    var toRespond = !this.toRespond ? 0 : oldVal === NONE ? --this.toRespond : this.toRespond;
	    values[outerIndex] = innerValue;

	    if (toRespond === 0) {
	      if (this.resultSelector) {
	        this._tryResultSelector(values);
	      } else {
	        this.destination.next(values.slice());
	      }
	    }
	  };

	  CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
	    var result;

	    try {
	      result = this.resultSelector.apply(this, values);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    this.destination.next(result);
	  };

	  return CombineLatestSubscriber;
	}(OuterSubscriber);

	function isInteropObservable(input) {
	  return input && typeof input[observable] === 'function';
	}

	function isIterable(input) {
	  return input && typeof input[iterator] === 'function';
	}

	function fromPromise(input, scheduler) {
	  if (!scheduler) {
	    return new Observable(subscribeToPromise(input));
	  } else {
	    return new Observable(function (subscriber) {
	      var sub = new Subscription();
	      sub.add(scheduler.schedule(function () {
	        return input.then(function (value) {
	          sub.add(scheduler.schedule(function () {
	            subscriber.next(value);
	            sub.add(scheduler.schedule(function () {
	              return subscriber.complete();
	            }));
	          }));
	        }, function (err) {
	          sub.add(scheduler.schedule(function () {
	            return subscriber.error(err);
	          }));
	        });
	      }));
	      return sub;
	    });
	  }
	}

	function fromIterable(input, scheduler) {
	  if (!input) {
	    throw new Error('Iterable cannot be null');
	  }

	  if (!scheduler) {
	    return new Observable(subscribeToIterable(input));
	  } else {
	    return new Observable(function (subscriber) {
	      var sub = new Subscription();
	      var iterator$$1;
	      sub.add(function () {
	        if (iterator$$1 && typeof iterator$$1.return === 'function') {
	          iterator$$1.return();
	        }
	      });
	      sub.add(scheduler.schedule(function () {
	        iterator$$1 = input[iterator]();
	        sub.add(scheduler.schedule(function () {
	          if (subscriber.closed) {
	            return;
	          }

	          var value;
	          var done;

	          try {
	            var result = iterator$$1.next();
	            value = result.value;
	            done = result.done;
	          } catch (err) {
	            subscriber.error(err);
	            return;
	          }

	          if (done) {
	            subscriber.complete();
	          } else {
	            subscriber.next(value);
	            this.schedule();
	          }
	        }));
	      }));
	      return sub;
	    });
	  }
	}

	function fromObservable(input, scheduler) {
	  if (!scheduler) {
	    return new Observable(subscribeToObservable(input));
	  } else {
	    return new Observable(function (subscriber) {
	      var sub = new Subscription();
	      sub.add(scheduler.schedule(function () {
	        var observable$$1 = input[observable]();
	        sub.add(observable$$1.subscribe({
	          next: function next(value) {
	            sub.add(scheduler.schedule(function () {
	              return subscriber.next(value);
	            }));
	          },
	          error: function error(err) {
	            sub.add(scheduler.schedule(function () {
	              return subscriber.error(err);
	            }));
	          },
	          complete: function complete() {
	            sub.add(scheduler.schedule(function () {
	              return subscriber.complete();
	            }));
	          }
	        }));
	      }));
	      return sub;
	    });
	  }
	}

	function from(input, scheduler) {
	  if (!scheduler) {
	    if (input instanceof Observable) {
	      return input;
	    }

	    return new Observable(subscribeTo(input));
	  }

	  if (input != null) {
	    if (isInteropObservable(input)) {
	      return fromObservable(input, scheduler);
	    } else if (isPromise(input)) {
	      return fromPromise(input, scheduler);
	    } else if (isArrayLike(input)) {
	      return fromArray(input, scheduler);
	    } else if (isIterable(input) || typeof input === 'string') {
	      return fromIterable(input, scheduler);
	    }
	  }

	  throw new TypeError((input !== null && typeof input || input) + ' is not observable');
	}

	function mergeMap(project, resultSelector, concurrent) {
	  if (concurrent === void 0) {
	    concurrent = Number.POSITIVE_INFINITY;
	  }

	  if (typeof resultSelector === 'function') {
	    return function (source) {
	      return source.pipe(mergeMap(function (a, i) {
	        return from(project(a, i)).pipe(map(function (b, ii) {
	          return resultSelector(a, b, i, ii);
	        }));
	      }, concurrent));
	    };
	  } else if (typeof resultSelector === 'number') {
	    concurrent = resultSelector;
	  }

	  return function (source) {
	    return source.lift(new MergeMapOperator(project, concurrent));
	  };
	}

	var MergeMapOperator = function () {
	  function MergeMapOperator(project, concurrent) {
	    if (concurrent === void 0) {
	      concurrent = Number.POSITIVE_INFINITY;
	    }

	    this.project = project;
	    this.concurrent = concurrent;
	  }

	  MergeMapOperator.prototype.call = function (observer, source) {
	    return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
	  };

	  return MergeMapOperator;
	}();

	var MergeMapSubscriber = function (_super) {
	  __extends(MergeMapSubscriber, _super);

	  function MergeMapSubscriber(destination, project, concurrent) {
	    if (concurrent === void 0) {
	      concurrent = Number.POSITIVE_INFINITY;
	    }

	    var _this = _super.call(this, destination) || this;

	    _this.project = project;
	    _this.concurrent = concurrent;
	    _this.hasCompleted = false;
	    _this.buffer = [];
	    _this.active = 0;
	    _this.index = 0;
	    return _this;
	  }

	  MergeMapSubscriber.prototype._next = function (value) {
	    if (this.active < this.concurrent) {
	      this._tryNext(value);
	    } else {
	      this.buffer.push(value);
	    }
	  };

	  MergeMapSubscriber.prototype._tryNext = function (value) {
	    var result;
	    var index = this.index++;

	    try {
	      result = this.project(value, index);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    this.active++;

	    this._innerSub(result, value, index);
	  };

	  MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
	    var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
	    this.add(innerSubscriber);
	    subscribeToResult(this, ish, value, index, innerSubscriber);
	  };

	  MergeMapSubscriber.prototype._complete = function () {
	    this.hasCompleted = true;

	    if (this.active === 0 && this.buffer.length === 0) {
	      this.destination.complete();
	    }
	  };

	  MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.destination.next(innerValue);
	  };

	  MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
	    var buffer = this.buffer;
	    this.remove(innerSub);
	    this.active--;

	    if (buffer.length > 0) {
	      this._next(buffer.shift());
	    } else if (this.active === 0 && this.hasCompleted) {
	      this.destination.complete();
	    }
	  };

	  return MergeMapSubscriber;
	}(OuterSubscriber);

	function mergeAll(concurrent) {
	  if (concurrent === void 0) {
	    concurrent = Number.POSITIVE_INFINITY;
	  }

	  return mergeMap(identity$1, concurrent);
	}

	var ForkJoinSubscriber = function (_super) {
	  __extends(ForkJoinSubscriber, _super);

	  function ForkJoinSubscriber(destination, sources) {
	    var _this = _super.call(this, destination) || this;

	    _this.sources = sources;
	    _this.completed = 0;
	    _this.haveValues = 0;
	    var len = sources.length;
	    _this.values = new Array(len);

	    for (var i = 0; i < len; i++) {
	      var source = sources[i];
	      var innerSubscription = subscribeToResult(_this, source, null, i);

	      if (innerSubscription) {
	        _this.add(innerSubscription);
	      }
	    }

	    return _this;
	  }

	  ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.values[outerIndex] = innerValue;

	    if (!innerSub._hasValue) {
	      innerSub._hasValue = true;
	      this.haveValues++;
	    }
	  };

	  ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
	    var _a = this,
	        destination = _a.destination,
	        haveValues = _a.haveValues,
	        values = _a.values;

	    var len = values.length;

	    if (!innerSub._hasValue) {
	      destination.complete();
	      return;
	    }

	    this.completed++;

	    if (this.completed !== len) {
	      return;
	    }

	    if (haveValues === len) {
	      destination.next(values);
	    }

	    destination.complete();
	  };

	  return ForkJoinSubscriber;
	}(OuterSubscriber);

	function isNumeric(val) {
	  return !isArray$1(val) && val - parseFloat(val) + 1 >= 0;
	}

	function merge() {
	  var observables = [];

	  for (var _i = 0; _i < arguments.length; _i++) {
	    observables[_i] = arguments[_i];
	  }

	  var concurrent = Number.POSITIVE_INFINITY;
	  var scheduler = null;
	  var last = observables[observables.length - 1];

	  if (isScheduler(last)) {
	    scheduler = observables.pop();

	    if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
	      concurrent = observables.pop();
	    }
	  } else if (typeof last === 'number') {
	    concurrent = observables.pop();
	  }

	  if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable) {
	    return observables[0];
	  }

	  return mergeAll(concurrent)(fromArray(observables, scheduler));
	}

	var NEVER = new Observable(noop);

	var RaceSubscriber = function (_super) {
	  __extends(RaceSubscriber, _super);

	  function RaceSubscriber(destination) {
	    var _this = _super.call(this, destination) || this;

	    _this.hasFirst = false;
	    _this.observables = [];
	    _this.subscriptions = [];
	    return _this;
	  }

	  RaceSubscriber.prototype._next = function (observable) {
	    this.observables.push(observable);
	  };

	  RaceSubscriber.prototype._complete = function () {
	    var observables = this.observables;
	    var len = observables.length;

	    if (len === 0) {
	      this.destination.complete();
	    } else {
	      for (var i = 0; i < len && !this.hasFirst; i++) {
	        var observable = observables[i];
	        var subscription = subscribeToResult(this, observable, observable, i);

	        if (this.subscriptions) {
	          this.subscriptions.push(subscription);
	        }

	        this.add(subscription);
	      }

	      this.observables = null;
	    }
	  };

	  RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    if (!this.hasFirst) {
	      this.hasFirst = true;

	      for (var i = 0; i < this.subscriptions.length; i++) {
	        if (i !== outerIndex) {
	          var subscription = this.subscriptions[i];
	          subscription.unsubscribe();
	          this.remove(subscription);
	        }
	      }

	      this.subscriptions = null;
	    }

	    this.destination.next(innerValue);
	  };

	  return RaceSubscriber;
	}(OuterSubscriber);

	var ZipSubscriber = function (_super) {
	  __extends(ZipSubscriber, _super);

	  function ZipSubscriber(destination, resultSelector, values) {
	    if (values === void 0) {
	      values = Object.create(null);
	    }

	    var _this = _super.call(this, destination) || this;

	    _this.iterators = [];
	    _this.active = 0;
	    _this.resultSelector = typeof resultSelector === 'function' ? resultSelector : null;
	    _this.values = values;
	    return _this;
	  }

	  ZipSubscriber.prototype._next = function (value) {
	    var iterators = this.iterators;

	    if (isArray$1(value)) {
	      iterators.push(new StaticArrayIterator(value));
	    } else if (typeof value[iterator] === 'function') {
	      iterators.push(new StaticIterator(value[iterator]()));
	    } else {
	      iterators.push(new ZipBufferIterator(this.destination, this, value));
	    }
	  };

	  ZipSubscriber.prototype._complete = function () {
	    var iterators = this.iterators;
	    var len = iterators.length;

	    if (len === 0) {
	      this.destination.complete();
	      return;
	    }

	    this.active = len;

	    for (var i = 0; i < len; i++) {
	      var iterator$$1 = iterators[i];

	      if (iterator$$1.stillUnsubscribed) {
	        this.add(iterator$$1.subscribe(iterator$$1, i));
	      } else {
	        this.active--;
	      }
	    }
	  };

	  ZipSubscriber.prototype.notifyInactive = function () {
	    this.active--;

	    if (this.active === 0) {
	      this.destination.complete();
	    }
	  };

	  ZipSubscriber.prototype.checkIterators = function () {
	    var iterators = this.iterators;
	    var len = iterators.length;
	    var destination = this.destination;

	    for (var i = 0; i < len; i++) {
	      var iterator$$1 = iterators[i];

	      if (typeof iterator$$1.hasValue === 'function' && !iterator$$1.hasValue()) {
	        return;
	      }
	    }

	    var shouldComplete = false;
	    var args = [];

	    for (var i = 0; i < len; i++) {
	      var iterator$$1 = iterators[i];
	      var result = iterator$$1.next();

	      if (iterator$$1.hasCompleted()) {
	        shouldComplete = true;
	      }

	      if (result.done) {
	        destination.complete();
	        return;
	      }

	      args.push(result.value);
	    }

	    if (this.resultSelector) {
	      this._tryresultSelector(args);
	    } else {
	      destination.next(args);
	    }

	    if (shouldComplete) {
	      destination.complete();
	    }
	  };

	  ZipSubscriber.prototype._tryresultSelector = function (args) {
	    var result;

	    try {
	      result = this.resultSelector.apply(this, args);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    this.destination.next(result);
	  };

	  return ZipSubscriber;
	}(Subscriber);

	var StaticIterator = function () {
	  function StaticIterator(iterator$$1) {
	    this.iterator = iterator$$1;
	    this.nextResult = iterator$$1.next();
	  }

	  StaticIterator.prototype.hasValue = function () {
	    return true;
	  };

	  StaticIterator.prototype.next = function () {
	    var result = this.nextResult;
	    this.nextResult = this.iterator.next();
	    return result;
	  };

	  StaticIterator.prototype.hasCompleted = function () {
	    var nextResult = this.nextResult;
	    return nextResult && nextResult.done;
	  };

	  return StaticIterator;
	}();

	var StaticArrayIterator = function () {
	  function StaticArrayIterator(array) {
	    this.array = array;
	    this.index = 0;
	    this.length = 0;
	    this.length = array.length;
	  }

	  StaticArrayIterator.prototype[iterator] = function () {
	    return this;
	  };

	  StaticArrayIterator.prototype.next = function (value) {
	    var i = this.index++;
	    var array = this.array;
	    return i < this.length ? {
	      value: array[i],
	      done: false
	    } : {
	      value: null,
	      done: true
	    };
	  };

	  StaticArrayIterator.prototype.hasValue = function () {
	    return this.array.length > this.index;
	  };

	  StaticArrayIterator.prototype.hasCompleted = function () {
	    return this.array.length === this.index;
	  };

	  return StaticArrayIterator;
	}();

	var ZipBufferIterator = function (_super) {
	  __extends(ZipBufferIterator, _super);

	  function ZipBufferIterator(destination, parent, observable) {
	    var _this = _super.call(this, destination) || this;

	    _this.parent = parent;
	    _this.observable = observable;
	    _this.stillUnsubscribed = true;
	    _this.buffer = [];
	    _this.isComplete = false;
	    return _this;
	  }

	  ZipBufferIterator.prototype[iterator] = function () {
	    return this;
	  };

	  ZipBufferIterator.prototype.next = function () {
	    var buffer = this.buffer;

	    if (buffer.length === 0 && this.isComplete) {
	      return {
	        value: null,
	        done: true
	      };
	    } else {
	      return {
	        value: buffer.shift(),
	        done: false
	      };
	    }
	  };

	  ZipBufferIterator.prototype.hasValue = function () {
	    return this.buffer.length > 0;
	  };

	  ZipBufferIterator.prototype.hasCompleted = function () {
	    return this.buffer.length === 0 && this.isComplete;
	  };

	  ZipBufferIterator.prototype.notifyComplete = function () {
	    if (this.buffer.length > 0) {
	      this.isComplete = true;
	      this.parent.notifyInactive();
	    } else {
	      this.destination.complete();
	    }
	  };

	  ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.buffer.push(innerValue);
	    this.parent.checkIterators();
	  };

	  ZipBufferIterator.prototype.subscribe = function (value, index) {
	    return subscribeToResult(this, this.observable, this, index);
	  };

	  return ZipBufferIterator;
	}(OuterSubscriber);

	var AuditSubscriber = function (_super) {
	  __extends(AuditSubscriber, _super);

	  function AuditSubscriber(destination, durationSelector) {
	    var _this = _super.call(this, destination) || this;

	    _this.durationSelector = durationSelector;
	    _this.hasValue = false;
	    return _this;
	  }

	  AuditSubscriber.prototype._next = function (value) {
	    this.value = value;
	    this.hasValue = true;

	    if (!this.throttled) {
	      var duration = tryCatch(this.durationSelector)(value);

	      if (duration === errorObject) {
	        this.destination.error(errorObject.e);
	      } else {
	        var innerSubscription = subscribeToResult(this, duration);

	        if (!innerSubscription || innerSubscription.closed) {
	          this.clearThrottle();
	        } else {
	          this.add(this.throttled = innerSubscription);
	        }
	      }
	    }
	  };

	  AuditSubscriber.prototype.clearThrottle = function () {
	    var _a = this,
	        value = _a.value,
	        hasValue = _a.hasValue,
	        throttled = _a.throttled;

	    if (throttled) {
	      this.remove(throttled);
	      this.throttled = null;
	      throttled.unsubscribe();
	    }

	    if (hasValue) {
	      this.value = null;
	      this.hasValue = false;
	      this.destination.next(value);
	    }
	  };

	  AuditSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	    this.clearThrottle();
	  };

	  AuditSubscriber.prototype.notifyComplete = function () {
	    this.clearThrottle();
	  };

	  return AuditSubscriber;
	}(OuterSubscriber);

	var BufferSubscriber = function (_super) {
	  __extends(BufferSubscriber, _super);

	  function BufferSubscriber(destination, closingNotifier) {
	    var _this = _super.call(this, destination) || this;

	    _this.buffer = [];

	    _this.add(subscribeToResult(_this, closingNotifier));

	    return _this;
	  }

	  BufferSubscriber.prototype._next = function (value) {
	    this.buffer.push(value);
	  };

	  BufferSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    var buffer = this.buffer;
	    this.buffer = [];
	    this.destination.next(buffer);
	  };

	  return BufferSubscriber;
	}(OuterSubscriber);

	var BufferCountSubscriber = function (_super) {
	  __extends(BufferCountSubscriber, _super);

	  function BufferCountSubscriber(destination, bufferSize) {
	    var _this = _super.call(this, destination) || this;

	    _this.bufferSize = bufferSize;
	    _this.buffer = [];
	    return _this;
	  }

	  BufferCountSubscriber.prototype._next = function (value) {
	    var buffer = this.buffer;
	    buffer.push(value);

	    if (buffer.length == this.bufferSize) {
	      this.destination.next(buffer);
	      this.buffer = [];
	    }
	  };

	  BufferCountSubscriber.prototype._complete = function () {
	    var buffer = this.buffer;

	    if (buffer.length > 0) {
	      this.destination.next(buffer);
	    }

	    _super.prototype._complete.call(this);
	  };

	  return BufferCountSubscriber;
	}(Subscriber);

	var BufferSkipCountSubscriber = function (_super) {
	  __extends(BufferSkipCountSubscriber, _super);

	  function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
	    var _this = _super.call(this, destination) || this;

	    _this.bufferSize = bufferSize;
	    _this.startBufferEvery = startBufferEvery;
	    _this.buffers = [];
	    _this.count = 0;
	    return _this;
	  }

	  BufferSkipCountSubscriber.prototype._next = function (value) {
	    var _a = this,
	        bufferSize = _a.bufferSize,
	        startBufferEvery = _a.startBufferEvery,
	        buffers = _a.buffers,
	        count = _a.count;

	    this.count++;

	    if (count % startBufferEvery === 0) {
	      buffers.push([]);
	    }

	    for (var i = buffers.length; i--;) {
	      var buffer = buffers[i];
	      buffer.push(value);

	      if (buffer.length === bufferSize) {
	        buffers.splice(i, 1);
	        this.destination.next(buffer);
	      }
	    }
	  };

	  BufferSkipCountSubscriber.prototype._complete = function () {
	    var _a = this,
	        buffers = _a.buffers,
	        destination = _a.destination;

	    while (buffers.length > 0) {
	      var buffer = buffers.shift();

	      if (buffer.length > 0) {
	        destination.next(buffer);
	      }
	    }

	    _super.prototype._complete.call(this);
	  };

	  return BufferSkipCountSubscriber;
	}(Subscriber);

	var Context = function () {
	  function Context() {
	    this.buffer = [];
	  }

	  return Context;
	}();

	var BufferTimeSubscriber = function (_super) {
	  __extends(BufferTimeSubscriber, _super);

	  function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
	    var _this = _super.call(this, destination) || this;

	    _this.bufferTimeSpan = bufferTimeSpan;
	    _this.bufferCreationInterval = bufferCreationInterval;
	    _this.maxBufferSize = maxBufferSize;
	    _this.scheduler = scheduler;
	    _this.contexts = [];

	    var context = _this.openContext();

	    _this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;

	    if (_this.timespanOnly) {
	      var timeSpanOnlyState = {
	        subscriber: _this,
	        context: context,
	        bufferTimeSpan: bufferTimeSpan
	      };

	      _this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
	    } else {
	      var closeState = {
	        subscriber: _this,
	        context: context
	      };
	      var creationState = {
	        bufferTimeSpan: bufferTimeSpan,
	        bufferCreationInterval: bufferCreationInterval,
	        subscriber: _this,
	        scheduler: scheduler
	      };

	      _this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));

	      _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
	    }

	    return _this;
	  }

	  BufferTimeSubscriber.prototype._next = function (value) {
	    var contexts = this.contexts;
	    var len = contexts.length;
	    var filledBufferContext;

	    for (var i = 0; i < len; i++) {
	      var context_1 = contexts[i];
	      var buffer = context_1.buffer;
	      buffer.push(value);

	      if (buffer.length == this.maxBufferSize) {
	        filledBufferContext = context_1;
	      }
	    }

	    if (filledBufferContext) {
	      this.onBufferFull(filledBufferContext);
	    }
	  };

	  BufferTimeSubscriber.prototype._error = function (err) {
	    this.contexts.length = 0;

	    _super.prototype._error.call(this, err);
	  };

	  BufferTimeSubscriber.prototype._complete = function () {
	    var _a = this,
	        contexts = _a.contexts,
	        destination = _a.destination;

	    while (contexts.length > 0) {
	      var context_2 = contexts.shift();
	      destination.next(context_2.buffer);
	    }

	    _super.prototype._complete.call(this);
	  };

	  BufferTimeSubscriber.prototype._unsubscribe = function () {
	    this.contexts = null;
	  };

	  BufferTimeSubscriber.prototype.onBufferFull = function (context) {
	    this.closeContext(context);
	    var closeAction = context.closeAction;
	    closeAction.unsubscribe();
	    this.remove(closeAction);

	    if (!this.closed && this.timespanOnly) {
	      context = this.openContext();
	      var bufferTimeSpan = this.bufferTimeSpan;
	      var timeSpanOnlyState = {
	        subscriber: this,
	        context: context,
	        bufferTimeSpan: bufferTimeSpan
	      };
	      this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
	    }
	  };

	  BufferTimeSubscriber.prototype.openContext = function () {
	    var context = new Context();
	    this.contexts.push(context);
	    return context;
	  };

	  BufferTimeSubscriber.prototype.closeContext = function (context) {
	    this.destination.next(context.buffer);
	    var contexts = this.contexts;
	    var spliceIndex = contexts ? contexts.indexOf(context) : -1;

	    if (spliceIndex >= 0) {
	      contexts.splice(contexts.indexOf(context), 1);
	    }
	  };

	  return BufferTimeSubscriber;
	}(Subscriber);

	function dispatchBufferTimeSpanOnly(state) {
	  var subscriber = state.subscriber;
	  var prevContext = state.context;

	  if (prevContext) {
	    subscriber.closeContext(prevContext);
	  }

	  if (!subscriber.closed) {
	    state.context = subscriber.openContext();
	    state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
	  }
	}

	function dispatchBufferCreation(state) {
	  var bufferCreationInterval = state.bufferCreationInterval,
	      bufferTimeSpan = state.bufferTimeSpan,
	      subscriber = state.subscriber,
	      scheduler = state.scheduler;
	  var context = subscriber.openContext();
	  var action = this;

	  if (!subscriber.closed) {
	    subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, {
	      subscriber: subscriber,
	      context: context
	    }));
	    action.schedule(state, bufferCreationInterval);
	  }
	}

	function dispatchBufferClose(arg) {
	  var subscriber = arg.subscriber,
	      context = arg.context;
	  subscriber.closeContext(context);
	}

	var BufferToggleSubscriber = function (_super) {
	  __extends(BufferToggleSubscriber, _super);

	  function BufferToggleSubscriber(destination, openings, closingSelector) {
	    var _this = _super.call(this, destination) || this;

	    _this.openings = openings;
	    _this.closingSelector = closingSelector;
	    _this.contexts = [];

	    _this.add(subscribeToResult(_this, openings));

	    return _this;
	  }

	  BufferToggleSubscriber.prototype._next = function (value) {
	    var contexts = this.contexts;
	    var len = contexts.length;

	    for (var i = 0; i < len; i++) {
	      contexts[i].buffer.push(value);
	    }
	  };

	  BufferToggleSubscriber.prototype._error = function (err) {
	    var contexts = this.contexts;

	    while (contexts.length > 0) {
	      var context_1 = contexts.shift();
	      context_1.subscription.unsubscribe();
	      context_1.buffer = null;
	      context_1.subscription = null;
	    }

	    this.contexts = null;

	    _super.prototype._error.call(this, err);
	  };

	  BufferToggleSubscriber.prototype._complete = function () {
	    var contexts = this.contexts;

	    while (contexts.length > 0) {
	      var context_2 = contexts.shift();
	      this.destination.next(context_2.buffer);
	      context_2.subscription.unsubscribe();
	      context_2.buffer = null;
	      context_2.subscription = null;
	    }

	    this.contexts = null;

	    _super.prototype._complete.call(this);
	  };

	  BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
	  };

	  BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
	    this.closeBuffer(innerSub.context);
	  };

	  BufferToggleSubscriber.prototype.openBuffer = function (value) {
	    try {
	      var closingSelector = this.closingSelector;
	      var closingNotifier = closingSelector.call(this, value);

	      if (closingNotifier) {
	        this.trySubscribe(closingNotifier);
	      }
	    } catch (err) {
	      this._error(err);
	    }
	  };

	  BufferToggleSubscriber.prototype.closeBuffer = function (context) {
	    var contexts = this.contexts;

	    if (contexts && context) {
	      var buffer = context.buffer,
	          subscription = context.subscription;
	      this.destination.next(buffer);
	      contexts.splice(contexts.indexOf(context), 1);
	      this.remove(subscription);
	      subscription.unsubscribe();
	    }
	  };

	  BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
	    var contexts = this.contexts;
	    var buffer = [];
	    var subscription = new Subscription();
	    var context = {
	      buffer: buffer,
	      subscription: subscription
	    };
	    contexts.push(context);
	    var innerSubscription = subscribeToResult(this, closingNotifier, context);

	    if (!innerSubscription || innerSubscription.closed) {
	      this.closeBuffer(context);
	    } else {
	      innerSubscription.context = context;
	      this.add(innerSubscription);
	      subscription.add(innerSubscription);
	    }
	  };

	  return BufferToggleSubscriber;
	}(OuterSubscriber);

	var BufferWhenSubscriber = function (_super) {
	  __extends(BufferWhenSubscriber, _super);

	  function BufferWhenSubscriber(destination, closingSelector) {
	    var _this = _super.call(this, destination) || this;

	    _this.closingSelector = closingSelector;
	    _this.subscribing = false;

	    _this.openBuffer();

	    return _this;
	  }

	  BufferWhenSubscriber.prototype._next = function (value) {
	    this.buffer.push(value);
	  };

	  BufferWhenSubscriber.prototype._complete = function () {
	    var buffer = this.buffer;

	    if (buffer) {
	      this.destination.next(buffer);
	    }

	    _super.prototype._complete.call(this);
	  };

	  BufferWhenSubscriber.prototype._unsubscribe = function () {
	    this.buffer = null;
	    this.subscribing = false;
	  };

	  BufferWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.openBuffer();
	  };

	  BufferWhenSubscriber.prototype.notifyComplete = function () {
	    if (this.subscribing) {
	      this.complete();
	    } else {
	      this.openBuffer();
	    }
	  };

	  BufferWhenSubscriber.prototype.openBuffer = function () {
	    var closingSubscription = this.closingSubscription;

	    if (closingSubscription) {
	      this.remove(closingSubscription);
	      closingSubscription.unsubscribe();
	    }

	    var buffer = this.buffer;

	    if (this.buffer) {
	      this.destination.next(buffer);
	    }

	    this.buffer = [];
	    var closingNotifier = tryCatch(this.closingSelector)();

	    if (closingNotifier === errorObject) {
	      this.error(errorObject.e);
	    } else {
	      closingSubscription = new Subscription();
	      this.closingSubscription = closingSubscription;
	      this.add(closingSubscription);
	      this.subscribing = true;
	      closingSubscription.add(subscribeToResult(this, closingNotifier));
	      this.subscribing = false;
	    }
	  };

	  return BufferWhenSubscriber;
	}(OuterSubscriber);

	var CatchSubscriber = function (_super) {
	  __extends(CatchSubscriber, _super);

	  function CatchSubscriber(destination, selector, caught) {
	    var _this = _super.call(this, destination) || this;

	    _this.selector = selector;
	    _this.caught = caught;
	    return _this;
	  }

	  CatchSubscriber.prototype.error = function (err) {
	    if (!this.isStopped) {
	      var result = void 0;

	      try {
	        result = this.selector(err, this.caught);
	      } catch (err2) {
	        _super.prototype.error.call(this, err2);

	        return;
	      }

	      this._unsubscribeAndRecycle();

	      var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
	      this.add(innerSubscriber);
	      subscribeToResult(this, result, undefined, undefined, innerSubscriber);
	    }
	  };

	  return CatchSubscriber;
	}(OuterSubscriber);

	var CountSubscriber = function (_super) {
	  __extends(CountSubscriber, _super);

	  function CountSubscriber(destination, predicate, source) {
	    var _this = _super.call(this, destination) || this;

	    _this.predicate = predicate;
	    _this.source = source;
	    _this.count = 0;
	    _this.index = 0;
	    return _this;
	  }

	  CountSubscriber.prototype._next = function (value) {
	    if (this.predicate) {
	      this._tryPredicate(value);
	    } else {
	      this.count++;
	    }
	  };

	  CountSubscriber.prototype._tryPredicate = function (value) {
	    var result;

	    try {
	      result = this.predicate(value, this.index++, this.source);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    if (result) {
	      this.count++;
	    }
	  };

	  CountSubscriber.prototype._complete = function () {
	    this.destination.next(this.count);
	    this.destination.complete();
	  };

	  return CountSubscriber;
	}(Subscriber);

	var DebounceSubscriber = function (_super) {
	  __extends(DebounceSubscriber, _super);

	  function DebounceSubscriber(destination, durationSelector) {
	    var _this = _super.call(this, destination) || this;

	    _this.durationSelector = durationSelector;
	    _this.hasValue = false;
	    _this.durationSubscription = null;
	    return _this;
	  }

	  DebounceSubscriber.prototype._next = function (value) {
	    try {
	      var result = this.durationSelector.call(this, value);

	      if (result) {
	        this._tryNext(value, result);
	      }
	    } catch (err) {
	      this.destination.error(err);
	    }
	  };

	  DebounceSubscriber.prototype._complete = function () {
	    this.emitValue();
	    this.destination.complete();
	  };

	  DebounceSubscriber.prototype._tryNext = function (value, duration) {
	    var subscription = this.durationSubscription;
	    this.value = value;
	    this.hasValue = true;

	    if (subscription) {
	      subscription.unsubscribe();
	      this.remove(subscription);
	    }

	    subscription = subscribeToResult(this, duration);

	    if (subscription && !subscription.closed) {
	      this.add(this.durationSubscription = subscription);
	    }
	  };

	  DebounceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.emitValue();
	  };

	  DebounceSubscriber.prototype.notifyComplete = function () {
	    this.emitValue();
	  };

	  DebounceSubscriber.prototype.emitValue = function () {
	    if (this.hasValue) {
	      var value = this.value;
	      var subscription = this.durationSubscription;

	      if (subscription) {
	        this.durationSubscription = null;
	        subscription.unsubscribe();
	        this.remove(subscription);
	      }

	      this.value = null;
	      this.hasValue = false;

	      _super.prototype._next.call(this, value);
	    }
	  };

	  return DebounceSubscriber;
	}(OuterSubscriber);

	var DebounceTimeSubscriber = function (_super) {
	  __extends(DebounceTimeSubscriber, _super);

	  function DebounceTimeSubscriber(destination, dueTime, scheduler) {
	    var _this = _super.call(this, destination) || this;

	    _this.dueTime = dueTime;
	    _this.scheduler = scheduler;
	    _this.debouncedSubscription = null;
	    _this.lastValue = null;
	    _this.hasValue = false;
	    return _this;
	  }

	  DebounceTimeSubscriber.prototype._next = function (value) {
	    this.clearDebounce();
	    this.lastValue = value;
	    this.hasValue = true;
	    this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext$2, this.dueTime, this));
	  };

	  DebounceTimeSubscriber.prototype._complete = function () {
	    this.debouncedNext();
	    this.destination.complete();
	  };

	  DebounceTimeSubscriber.prototype.debouncedNext = function () {
	    this.clearDebounce();

	    if (this.hasValue) {
	      var lastValue = this.lastValue;
	      this.lastValue = null;
	      this.hasValue = false;
	      this.destination.next(lastValue);
	    }
	  };

	  DebounceTimeSubscriber.prototype.clearDebounce = function () {
	    var debouncedSubscription = this.debouncedSubscription;

	    if (debouncedSubscription !== null) {
	      this.remove(debouncedSubscription);
	      debouncedSubscription.unsubscribe();
	      this.debouncedSubscription = null;
	    }
	  };

	  return DebounceTimeSubscriber;
	}(Subscriber);

	function dispatchNext$2(subscriber) {
	  subscriber.debouncedNext();
	}

	var DefaultIfEmptySubscriber = function (_super) {
	  __extends(DefaultIfEmptySubscriber, _super);

	  function DefaultIfEmptySubscriber(destination, defaultValue) {
	    var _this = _super.call(this, destination) || this;

	    _this.defaultValue = defaultValue;
	    _this.isEmpty = true;
	    return _this;
	  }

	  DefaultIfEmptySubscriber.prototype._next = function (value) {
	    this.isEmpty = false;
	    this.destination.next(value);
	  };

	  DefaultIfEmptySubscriber.prototype._complete = function () {
	    if (this.isEmpty) {
	      this.destination.next(this.defaultValue);
	    }

	    this.destination.complete();
	  };

	  return DefaultIfEmptySubscriber;
	}(Subscriber);

	var DelaySubscriber = function (_super) {
	  __extends(DelaySubscriber, _super);

	  function DelaySubscriber(destination, delay, scheduler) {
	    var _this = _super.call(this, destination) || this;

	    _this.delay = delay;
	    _this.scheduler = scheduler;
	    _this.queue = [];
	    _this.active = false;
	    _this.errored = false;
	    return _this;
	  }

	  DelaySubscriber.dispatch = function (state) {
	    var source = state.source;
	    var queue = source.queue;
	    var scheduler = state.scheduler;
	    var destination = state.destination;

	    while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
	      queue.shift().notification.observe(destination);
	    }

	    if (queue.length > 0) {
	      var delay_1 = Math.max(0, queue[0].time - scheduler.now());
	      this.schedule(state, delay_1);
	    } else {
	      this.unsubscribe();
	      source.active = false;
	    }
	  };

	  DelaySubscriber.prototype._schedule = function (scheduler) {
	    this.active = true;
	    this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
	      source: this,
	      destination: this.destination,
	      scheduler: scheduler
	    }));
	  };

	  DelaySubscriber.prototype.scheduleNotification = function (notification) {
	    if (this.errored === true) {
	      return;
	    }

	    var scheduler = this.scheduler;
	    var message = new DelayMessage(scheduler.now() + this.delay, notification);
	    this.queue.push(message);

	    if (this.active === false) {
	      this._schedule(scheduler);
	    }
	  };

	  DelaySubscriber.prototype._next = function (value) {
	    this.scheduleNotification(Notification.createNext(value));
	  };

	  DelaySubscriber.prototype._error = function (err) {
	    this.errored = true;
	    this.queue = [];
	    this.destination.error(err);
	  };

	  DelaySubscriber.prototype._complete = function () {
	    this.scheduleNotification(Notification.createComplete());
	  };

	  return DelaySubscriber;
	}(Subscriber);

	var DelayMessage = function () {
	  function DelayMessage(time, notification) {
	    this.time = time;
	    this.notification = notification;
	  }

	  return DelayMessage;
	}();

	var DelayWhenSubscriber = function (_super) {
	  __extends(DelayWhenSubscriber, _super);

	  function DelayWhenSubscriber(destination, delayDurationSelector) {
	    var _this = _super.call(this, destination) || this;

	    _this.delayDurationSelector = delayDurationSelector;
	    _this.completed = false;
	    _this.delayNotifierSubscriptions = [];
	    _this.index = 0;
	    return _this;
	  }

	  DelayWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.destination.next(outerValue);
	    this.removeSubscription(innerSub);
	    this.tryComplete();
	  };

	  DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
	    this._error(error);
	  };

	  DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
	    var value = this.removeSubscription(innerSub);

	    if (value) {
	      this.destination.next(value);
	    }

	    this.tryComplete();
	  };

	  DelayWhenSubscriber.prototype._next = function (value) {
	    var index = this.index++;

	    try {
	      var delayNotifier = this.delayDurationSelector(value, index);

	      if (delayNotifier) {
	        this.tryDelay(delayNotifier, value);
	      }
	    } catch (err) {
	      this.destination.error(err);
	    }
	  };

	  DelayWhenSubscriber.prototype._complete = function () {
	    this.completed = true;
	    this.tryComplete();
	  };

	  DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
	    subscription.unsubscribe();
	    var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);

	    if (subscriptionIdx !== -1) {
	      this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
	    }

	    return subscription.outerValue;
	  };

	  DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
	    var notifierSubscription = subscribeToResult(this, delayNotifier, value);

	    if (notifierSubscription && !notifierSubscription.closed) {
	      this.add(notifierSubscription);
	      this.delayNotifierSubscriptions.push(notifierSubscription);
	    }
	  };

	  DelayWhenSubscriber.prototype.tryComplete = function () {
	    if (this.completed && this.delayNotifierSubscriptions.length === 0) {
	      this.destination.complete();
	    }
	  };

	  return DelayWhenSubscriber;
	}(OuterSubscriber);

	var SubscriptionDelayObservable = function (_super) {
	  __extends(SubscriptionDelayObservable, _super);

	  function SubscriptionDelayObservable(source, subscriptionDelay) {
	    var _this = _super.call(this) || this;

	    _this.source = source;
	    _this.subscriptionDelay = subscriptionDelay;
	    return _this;
	  }

	  SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
	    this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
	  };

	  return SubscriptionDelayObservable;
	}(Observable);

	var SubscriptionDelaySubscriber = function (_super) {
	  __extends(SubscriptionDelaySubscriber, _super);

	  function SubscriptionDelaySubscriber(parent, source) {
	    var _this = _super.call(this) || this;

	    _this.parent = parent;
	    _this.source = source;
	    _this.sourceSubscribed = false;
	    return _this;
	  }

	  SubscriptionDelaySubscriber.prototype._next = function (unused) {
	    this.subscribeToSource();
	  };

	  SubscriptionDelaySubscriber.prototype._error = function (err) {
	    this.unsubscribe();
	    this.parent.error(err);
	  };

	  SubscriptionDelaySubscriber.prototype._complete = function () {
	    this.subscribeToSource();
	  };

	  SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
	    if (!this.sourceSubscribed) {
	      this.sourceSubscribed = true;
	      this.unsubscribe();
	      this.source.subscribe(this.parent);
	    }
	  };

	  return SubscriptionDelaySubscriber;
	}(Subscriber);

	var DeMaterializeSubscriber = function (_super) {
	  __extends(DeMaterializeSubscriber, _super);

	  function DeMaterializeSubscriber(destination) {
	    return _super.call(this, destination) || this;
	  }

	  DeMaterializeSubscriber.prototype._next = function (value) {
	    value.observe(this.destination);
	  };

	  return DeMaterializeSubscriber;
	}(Subscriber);

	var DistinctSubscriber = function (_super) {
	  __extends(DistinctSubscriber, _super);

	  function DistinctSubscriber(destination, keySelector, flushes) {
	    var _this = _super.call(this, destination) || this;

	    _this.keySelector = keySelector;
	    _this.values = new Set();

	    if (flushes) {
	      _this.add(subscribeToResult(_this, flushes));
	    }

	    return _this;
	  }

	  DistinctSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.values.clear();
	  };

	  DistinctSubscriber.prototype.notifyError = function (error, innerSub) {
	    this._error(error);
	  };

	  DistinctSubscriber.prototype._next = function (value) {
	    if (this.keySelector) {
	      this._useKeySelector(value);
	    } else {
	      this._finalizeNext(value, value);
	    }
	  };

	  DistinctSubscriber.prototype._useKeySelector = function (value) {
	    var key;
	    var destination = this.destination;

	    try {
	      key = this.keySelector(value);
	    } catch (err) {
	      destination.error(err);
	      return;
	    }

	    this._finalizeNext(key, value);
	  };

	  DistinctSubscriber.prototype._finalizeNext = function (key, value) {
	    var values = this.values;

	    if (!values.has(key)) {
	      values.add(key);
	      this.destination.next(value);
	    }
	  };

	  return DistinctSubscriber;
	}(OuterSubscriber);

	function distinctUntilChanged(compare, keySelector) {
	  return function (source) {
	    return source.lift(new DistinctUntilChangedOperator(compare, keySelector));
	  };
	}

	var DistinctUntilChangedOperator = function () {
	  function DistinctUntilChangedOperator(compare, keySelector) {
	    this.compare = compare;
	    this.keySelector = keySelector;
	  }

	  DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
	    return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
	  };

	  return DistinctUntilChangedOperator;
	}();

	var DistinctUntilChangedSubscriber = function (_super) {
	  __extends(DistinctUntilChangedSubscriber, _super);

	  function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
	    var _this = _super.call(this, destination) || this;

	    _this.keySelector = keySelector;
	    _this.hasKey = false;

	    if (typeof compare === 'function') {
	      _this.compare = compare;
	    }

	    return _this;
	  }

	  DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
	    return x === y;
	  };

	  DistinctUntilChangedSubscriber.prototype._next = function (value) {
	    var keySelector = this.keySelector;
	    var key = value;

	    if (keySelector) {
	      key = tryCatch(this.keySelector)(value);

	      if (key === errorObject) {
	        return this.destination.error(errorObject.e);
	      }
	    }

	    var result = false;

	    if (this.hasKey) {
	      result = tryCatch(this.compare)(this.key, key);

	      if (result === errorObject) {
	        return this.destination.error(errorObject.e);
	      }
	    } else {
	      this.hasKey = true;
	    }

	    if (Boolean(result) === false) {
	      this.key = key;
	      this.destination.next(value);
	    }
	  };

	  return DistinctUntilChangedSubscriber;
	}(Subscriber);

	var FilterSubscriber = function (_super) {
	  __extends(FilterSubscriber, _super);

	  function FilterSubscriber(destination, predicate, thisArg) {
	    var _this = _super.call(this, destination) || this;

	    _this.predicate = predicate;
	    _this.thisArg = thisArg;
	    _this.count = 0;
	    return _this;
	  }

	  FilterSubscriber.prototype._next = function (value) {
	    var result;

	    try {
	      result = this.predicate.call(this.thisArg, value, this.count++);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    if (result) {
	      this.destination.next(value);
	    }
	  };

	  return FilterSubscriber;
	}(Subscriber);

	var TapSubscriber = function (_super) {
	  __extends(TapSubscriber, _super);

	  function TapSubscriber(destination, observerOrNext, error, complete) {
	    var _this = _super.call(this, destination) || this;

	    _this._tapNext = noop;
	    _this._tapError = noop;
	    _this._tapComplete = noop;
	    _this._tapError = error || noop;
	    _this._tapComplete = complete || noop;

	    if (isFunction(observerOrNext)) {
	      _this._context = _this;
	      _this._tapNext = observerOrNext;
	    } else if (observerOrNext) {
	      _this._context = observerOrNext;
	      _this._tapNext = observerOrNext.next || noop;
	      _this._tapError = observerOrNext.error || noop;
	      _this._tapComplete = observerOrNext.complete || noop;
	    }

	    return _this;
	  }

	  TapSubscriber.prototype._next = function (value) {
	    try {
	      this._tapNext.call(this._context, value);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    this.destination.next(value);
	  };

	  TapSubscriber.prototype._error = function (err) {
	    try {
	      this._tapError.call(this._context, err);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    this.destination.error(err);
	  };

	  TapSubscriber.prototype._complete = function () {
	    try {
	      this._tapComplete.call(this._context);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    return this.destination.complete();
	  };

	  return TapSubscriber;
	}(Subscriber);

	var TakeSubscriber = function (_super) {
	  __extends(TakeSubscriber, _super);

	  function TakeSubscriber(destination, total) {
	    var _this = _super.call(this, destination) || this;

	    _this.total = total;
	    _this.count = 0;
	    return _this;
	  }

	  TakeSubscriber.prototype._next = function (value) {
	    var total = this.total;
	    var count = ++this.count;

	    if (count <= total) {
	      this.destination.next(value);

	      if (count === total) {
	        this.destination.complete();
	        this.unsubscribe();
	      }
	    }
	  };

	  return TakeSubscriber;
	}(Subscriber);

	var EverySubscriber = function (_super) {
	  __extends(EverySubscriber, _super);

	  function EverySubscriber(destination, predicate, thisArg, source) {
	    var _this = _super.call(this, destination) || this;

	    _this.predicate = predicate;
	    _this.thisArg = thisArg;
	    _this.source = source;
	    _this.index = 0;
	    _this.thisArg = thisArg || _this;
	    return _this;
	  }

	  EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
	    this.destination.next(everyValueMatch);
	    this.destination.complete();
	  };

	  EverySubscriber.prototype._next = function (value) {
	    var result = false;

	    try {
	      result = this.predicate.call(this.thisArg, value, this.index++, this.source);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    if (!result) {
	      this.notifyComplete(false);
	    }
	  };

	  EverySubscriber.prototype._complete = function () {
	    this.notifyComplete(true);
	  };

	  return EverySubscriber;
	}(Subscriber);

	var SwitchFirstSubscriber = function (_super) {
	  __extends(SwitchFirstSubscriber, _super);

	  function SwitchFirstSubscriber(destination) {
	    var _this = _super.call(this, destination) || this;

	    _this.hasCompleted = false;
	    _this.hasSubscription = false;
	    return _this;
	  }

	  SwitchFirstSubscriber.prototype._next = function (value) {
	    if (!this.hasSubscription) {
	      this.hasSubscription = true;
	      this.add(subscribeToResult(this, value));
	    }
	  };

	  SwitchFirstSubscriber.prototype._complete = function () {
	    this.hasCompleted = true;

	    if (!this.hasSubscription) {
	      this.destination.complete();
	    }
	  };

	  SwitchFirstSubscriber.prototype.notifyComplete = function (innerSub) {
	    this.remove(innerSub);
	    this.hasSubscription = false;

	    if (this.hasCompleted) {
	      this.destination.complete();
	    }
	  };

	  return SwitchFirstSubscriber;
	}(OuterSubscriber);

	var ExhaustMapSubscriber = function (_super) {
	  __extends(ExhaustMapSubscriber, _super);

	  function ExhaustMapSubscriber(destination, project) {
	    var _this = _super.call(this, destination) || this;

	    _this.project = project;
	    _this.hasSubscription = false;
	    _this.hasCompleted = false;
	    _this.index = 0;
	    return _this;
	  }

	  ExhaustMapSubscriber.prototype._next = function (value) {
	    if (!this.hasSubscription) {
	      this.tryNext(value);
	    }
	  };

	  ExhaustMapSubscriber.prototype.tryNext = function (value) {
	    var result;
	    var index = this.index++;

	    try {
	      result = this.project(value, index);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    this.hasSubscription = true;

	    this._innerSub(result, value, index);
	  };

	  ExhaustMapSubscriber.prototype._innerSub = function (result, value, index) {
	    var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
	    this.add(innerSubscriber);
	    subscribeToResult(this, result, value, index, innerSubscriber);
	  };

	  ExhaustMapSubscriber.prototype._complete = function () {
	    this.hasCompleted = true;

	    if (!this.hasSubscription) {
	      this.destination.complete();
	    }
	  };

	  ExhaustMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.destination.next(innerValue);
	  };

	  ExhaustMapSubscriber.prototype.notifyError = function (err) {
	    this.destination.error(err);
	  };

	  ExhaustMapSubscriber.prototype.notifyComplete = function (innerSub) {
	    this.remove(innerSub);
	    this.hasSubscription = false;

	    if (this.hasCompleted) {
	      this.destination.complete();
	    }
	  };

	  return ExhaustMapSubscriber;
	}(OuterSubscriber);

	var ExpandSubscriber = function (_super) {
	  __extends(ExpandSubscriber, _super);

	  function ExpandSubscriber(destination, project, concurrent, scheduler) {
	    var _this = _super.call(this, destination) || this;

	    _this.project = project;
	    _this.concurrent = concurrent;
	    _this.scheduler = scheduler;
	    _this.index = 0;
	    _this.active = 0;
	    _this.hasCompleted = false;

	    if (concurrent < Number.POSITIVE_INFINITY) {
	      _this.buffer = [];
	    }

	    return _this;
	  }

	  ExpandSubscriber.dispatch = function (arg) {
	    var subscriber = arg.subscriber,
	        result = arg.result,
	        value = arg.value,
	        index = arg.index;
	    subscriber.subscribeToProjection(result, value, index);
	  };

	  ExpandSubscriber.prototype._next = function (value) {
	    var destination = this.destination;

	    if (destination.closed) {
	      this._complete();

	      return;
	    }

	    var index = this.index++;

	    if (this.active < this.concurrent) {
	      destination.next(value);
	      var result = tryCatch(this.project)(value, index);

	      if (result === errorObject) {
	        destination.error(errorObject.e);
	      } else if (!this.scheduler) {
	        this.subscribeToProjection(result, value, index);
	      } else {
	        var state = {
	          subscriber: this,
	          result: result,
	          value: value,
	          index: index
	        };
	        this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
	      }
	    } else {
	      this.buffer.push(value);
	    }
	  };

	  ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
	    this.active++;
	    this.add(subscribeToResult(this, result, value, index));
	  };

	  ExpandSubscriber.prototype._complete = function () {
	    this.hasCompleted = true;

	    if (this.hasCompleted && this.active === 0) {
	      this.destination.complete();
	    }
	  };

	  ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this._next(innerValue);
	  };

	  ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
	    var buffer = this.buffer;
	    this.remove(innerSub);
	    this.active--;

	    if (buffer && buffer.length > 0) {
	      this._next(buffer.shift());
	    }

	    if (this.hasCompleted && this.active === 0) {
	      this.destination.complete();
	    }
	  };

	  return ExpandSubscriber;
	}(OuterSubscriber);

	var FinallySubscriber = function (_super) {
	  __extends(FinallySubscriber, _super);

	  function FinallySubscriber(destination, callback) {
	    var _this = _super.call(this, destination) || this;

	    _this.add(new Subscription(callback));

	    return _this;
	  }

	  return FinallySubscriber;
	}(Subscriber);

	var FindValueSubscriber = function (_super) {
	  __extends(FindValueSubscriber, _super);

	  function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
	    var _this = _super.call(this, destination) || this;

	    _this.predicate = predicate;
	    _this.source = source;
	    _this.yieldIndex = yieldIndex;
	    _this.thisArg = thisArg;
	    _this.index = 0;
	    return _this;
	  }

	  FindValueSubscriber.prototype.notifyComplete = function (value) {
	    var destination = this.destination;
	    destination.next(value);
	    destination.complete();
	    this.unsubscribe();
	  };

	  FindValueSubscriber.prototype._next = function (value) {
	    var _a = this,
	        predicate = _a.predicate,
	        thisArg = _a.thisArg;

	    var index = this.index++;

	    try {
	      var result = predicate.call(thisArg || this, value, index, this.source);

	      if (result) {
	        this.notifyComplete(this.yieldIndex ? index : value);
	      }
	    } catch (err) {
	      this.destination.error(err);
	    }
	  };

	  FindValueSubscriber.prototype._complete = function () {
	    this.notifyComplete(this.yieldIndex ? -1 : undefined);
	  };

	  return FindValueSubscriber;
	}(Subscriber);

	var IgnoreElementsSubscriber = function (_super) {
	  __extends(IgnoreElementsSubscriber, _super);

	  function IgnoreElementsSubscriber() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  IgnoreElementsSubscriber.prototype._next = function (unused) {};

	  return IgnoreElementsSubscriber;
	}(Subscriber);

	var IsEmptySubscriber = function (_super) {
	  __extends(IsEmptySubscriber, _super);

	  function IsEmptySubscriber(destination) {
	    return _super.call(this, destination) || this;
	  }

	  IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
	    var destination = this.destination;
	    destination.next(isEmpty);
	    destination.complete();
	  };

	  IsEmptySubscriber.prototype._next = function (value) {
	    this.notifyComplete(false);
	  };

	  IsEmptySubscriber.prototype._complete = function () {
	    this.notifyComplete(true);
	  };

	  return IsEmptySubscriber;
	}(Subscriber);

	var TakeLastSubscriber = function (_super) {
	  __extends(TakeLastSubscriber, _super);

	  function TakeLastSubscriber(destination, total) {
	    var _this = _super.call(this, destination) || this;

	    _this.total = total;
	    _this.ring = new Array();
	    _this.count = 0;
	    return _this;
	  }

	  TakeLastSubscriber.prototype._next = function (value) {
	    var ring = this.ring;
	    var total = this.total;
	    var count = this.count++;

	    if (ring.length < total) {
	      ring.push(value);
	    } else {
	      var index = count % total;
	      ring[index] = value;
	    }
	  };

	  TakeLastSubscriber.prototype._complete = function () {
	    var destination = this.destination;
	    var count = this.count;

	    if (count > 0) {
	      var total = this.count >= this.total ? this.total : this.count;
	      var ring = this.ring;

	      for (var i = 0; i < total; i++) {
	        var idx = count++ % total;
	        destination.next(ring[idx]);
	      }
	    }

	    destination.complete();
	  };

	  return TakeLastSubscriber;
	}(Subscriber);

	var MapToSubscriber = function (_super) {
	  __extends(MapToSubscriber, _super);

	  function MapToSubscriber(destination, value) {
	    var _this = _super.call(this, destination) || this;

	    _this.value = value;
	    return _this;
	  }

	  MapToSubscriber.prototype._next = function (x) {
	    this.destination.next(this.value);
	  };

	  return MapToSubscriber;
	}(Subscriber);

	var MaterializeSubscriber = function (_super) {
	  __extends(MaterializeSubscriber, _super);

	  function MaterializeSubscriber(destination) {
	    return _super.call(this, destination) || this;
	  }

	  MaterializeSubscriber.prototype._next = function (value) {
	    this.destination.next(Notification.createNext(value));
	  };

	  MaterializeSubscriber.prototype._error = function (err) {
	    var destination = this.destination;
	    destination.next(Notification.createError(err));
	    destination.complete();
	  };

	  MaterializeSubscriber.prototype._complete = function () {
	    var destination = this.destination;
	    destination.next(Notification.createComplete());
	    destination.complete();
	  };

	  return MaterializeSubscriber;
	}(Subscriber);

	var ScanSubscriber = function (_super) {
	  __extends(ScanSubscriber, _super);

	  function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
	    var _this = _super.call(this, destination) || this;

	    _this.accumulator = accumulator;
	    _this._seed = _seed;
	    _this.hasSeed = hasSeed;
	    _this.index = 0;
	    return _this;
	  }

	  Object.defineProperty(ScanSubscriber.prototype, "seed", {
	    get: function get() {
	      return this._seed;
	    },
	    set: function set(value) {
	      this.hasSeed = true;
	      this._seed = value;
	    },
	    enumerable: true,
	    configurable: true
	  });

	  ScanSubscriber.prototype._next = function (value) {
	    if (!this.hasSeed) {
	      this.seed = value;
	      this.destination.next(value);
	    } else {
	      return this._tryNext(value);
	    }
	  };

	  ScanSubscriber.prototype._tryNext = function (value) {
	    var index = this.index++;
	    var result;

	    try {
	      result = this.accumulator(this.seed, value, index);
	    } catch (err) {
	      this.destination.error(err);
	    }

	    this.seed = result;
	    this.destination.next(result);
	  };

	  return ScanSubscriber;
	}(Subscriber);

	var MergeScanSubscriber = function (_super) {
	  __extends(MergeScanSubscriber, _super);

	  function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
	    var _this = _super.call(this, destination) || this;

	    _this.accumulator = accumulator;
	    _this.acc = acc;
	    _this.concurrent = concurrent;
	    _this.hasValue = false;
	    _this.hasCompleted = false;
	    _this.buffer = [];
	    _this.active = 0;
	    _this.index = 0;
	    return _this;
	  }

	  MergeScanSubscriber.prototype._next = function (value) {
	    if (this.active < this.concurrent) {
	      var index = this.index++;
	      var ish = tryCatch(this.accumulator)(this.acc, value);
	      var destination = this.destination;

	      if (ish === errorObject) {
	        destination.error(errorObject.e);
	      } else {
	        this.active++;

	        this._innerSub(ish, value, index);
	      }
	    } else {
	      this.buffer.push(value);
	    }
	  };

	  MergeScanSubscriber.prototype._innerSub = function (ish, value, index) {
	    var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
	    this.add(innerSubscriber);
	    subscribeToResult(this, ish, value, index, innerSubscriber);
	  };

	  MergeScanSubscriber.prototype._complete = function () {
	    this.hasCompleted = true;

	    if (this.active === 0 && this.buffer.length === 0) {
	      if (this.hasValue === false) {
	        this.destination.next(this.acc);
	      }

	      this.destination.complete();
	    }
	  };

	  MergeScanSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    var destination = this.destination;
	    this.acc = innerValue;
	    this.hasValue = true;
	    destination.next(innerValue);
	  };

	  MergeScanSubscriber.prototype.notifyComplete = function (innerSub) {
	    var buffer = this.buffer;
	    this.remove(innerSub);
	    this.active--;

	    if (buffer.length > 0) {
	      this._next(buffer.shift());
	    } else if (this.active === 0 && this.hasCompleted) {
	      if (this.hasValue === false) {
	        this.destination.next(this.acc);
	      }

	      this.destination.complete();
	    }
	  };

	  return MergeScanSubscriber;
	}(OuterSubscriber);

	var OnErrorResumeNextSubscriber = function (_super) {
	  __extends(OnErrorResumeNextSubscriber, _super);

	  function OnErrorResumeNextSubscriber(destination, nextSources) {
	    var _this = _super.call(this, destination) || this;

	    _this.destination = destination;
	    _this.nextSources = nextSources;
	    return _this;
	  }

	  OnErrorResumeNextSubscriber.prototype.notifyError = function (error, innerSub) {
	    this.subscribeToNextSource();
	  };

	  OnErrorResumeNextSubscriber.prototype.notifyComplete = function (innerSub) {
	    this.subscribeToNextSource();
	  };

	  OnErrorResumeNextSubscriber.prototype._error = function (err) {
	    this.subscribeToNextSource();
	  };

	  OnErrorResumeNextSubscriber.prototype._complete = function () {
	    this.subscribeToNextSource();
	  };

	  OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
	    var next = this.nextSources.shift();

	    if (next) {
	      var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
	      this.add(innerSubscriber);
	      subscribeToResult(this, next, undefined, undefined, innerSubscriber);
	    } else {
	      this.destination.complete();
	    }
	  };

	  return OnErrorResumeNextSubscriber;
	}(OuterSubscriber);

	var PairwiseSubscriber = function (_super) {
	  __extends(PairwiseSubscriber, _super);

	  function PairwiseSubscriber(destination) {
	    var _this = _super.call(this, destination) || this;

	    _this.hasPrev = false;
	    return _this;
	  }

	  PairwiseSubscriber.prototype._next = function (value) {
	    if (this.hasPrev) {
	      this.destination.next([this.prev, value]);
	    } else {
	      this.hasPrev = true;
	    }

	    this.prev = value;
	  };

	  return PairwiseSubscriber;
	}(Subscriber);

	var RepeatSubscriber = function (_super) {
	  __extends(RepeatSubscriber, _super);

	  function RepeatSubscriber(destination, count, source) {
	    var _this = _super.call(this, destination) || this;

	    _this.count = count;
	    _this.source = source;
	    return _this;
	  }

	  RepeatSubscriber.prototype.complete = function () {
	    if (!this.isStopped) {
	      var _a = this,
	          source = _a.source,
	          count = _a.count;

	      if (count === 0) {
	        return _super.prototype.complete.call(this);
	      } else if (count > -1) {
	        this.count = count - 1;
	      }

	      source.subscribe(this._unsubscribeAndRecycle());
	    }
	  };

	  return RepeatSubscriber;
	}(Subscriber);

	var RepeatWhenSubscriber = function (_super) {
	  __extends(RepeatWhenSubscriber, _super);

	  function RepeatWhenSubscriber(destination, notifier, source) {
	    var _this = _super.call(this, destination) || this;

	    _this.notifier = notifier;
	    _this.source = source;
	    _this.sourceIsBeingSubscribedTo = true;
	    return _this;
	  }

	  RepeatWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.sourceIsBeingSubscribedTo = true;
	    this.source.subscribe(this);
	  };

	  RepeatWhenSubscriber.prototype.notifyComplete = function (innerSub) {
	    if (this.sourceIsBeingSubscribedTo === false) {
	      return _super.prototype.complete.call(this);
	    }
	  };

	  RepeatWhenSubscriber.prototype.complete = function () {
	    this.sourceIsBeingSubscribedTo = false;

	    if (!this.isStopped) {
	      if (!this.retries) {
	        this.subscribeToRetries();
	      }

	      if (!this.retriesSubscription || this.retriesSubscription.closed) {
	        return _super.prototype.complete.call(this);
	      }

	      this._unsubscribeAndRecycle();

	      this.notifications.next();
	    }
	  };

	  RepeatWhenSubscriber.prototype._unsubscribe = function () {
	    var _a = this,
	        notifications = _a.notifications,
	        retriesSubscription = _a.retriesSubscription;

	    if (notifications) {
	      notifications.unsubscribe();
	      this.notifications = null;
	    }

	    if (retriesSubscription) {
	      retriesSubscription.unsubscribe();
	      this.retriesSubscription = null;
	    }

	    this.retries = null;
	  };

	  RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
	    var _unsubscribe = this._unsubscribe;
	    this._unsubscribe = null;

	    _super.prototype._unsubscribeAndRecycle.call(this);

	    this._unsubscribe = _unsubscribe;
	    return this;
	  };

	  RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
	    this.notifications = new Subject();
	    var retries = tryCatch(this.notifier)(this.notifications);

	    if (retries === errorObject) {
	      return _super.prototype.complete.call(this);
	    }

	    this.retries = retries;
	    this.retriesSubscription = subscribeToResult(this, retries);
	  };

	  return RepeatWhenSubscriber;
	}(OuterSubscriber);

	var RetrySubscriber = function (_super) {
	  __extends(RetrySubscriber, _super);

	  function RetrySubscriber(destination, count, source) {
	    var _this = _super.call(this, destination) || this;

	    _this.count = count;
	    _this.source = source;
	    return _this;
	  }

	  RetrySubscriber.prototype.error = function (err) {
	    if (!this.isStopped) {
	      var _a = this,
	          source = _a.source,
	          count = _a.count;

	      if (count === 0) {
	        return _super.prototype.error.call(this, err);
	      } else if (count > -1) {
	        this.count = count - 1;
	      }

	      source.subscribe(this._unsubscribeAndRecycle());
	    }
	  };

	  return RetrySubscriber;
	}(Subscriber);

	var RetryWhenSubscriber = function (_super) {
	  __extends(RetryWhenSubscriber, _super);

	  function RetryWhenSubscriber(destination, notifier, source) {
	    var _this = _super.call(this, destination) || this;

	    _this.notifier = notifier;
	    _this.source = source;
	    return _this;
	  }

	  RetryWhenSubscriber.prototype.error = function (err) {
	    if (!this.isStopped) {
	      var errors = this.errors;
	      var retries = this.retries;
	      var retriesSubscription = this.retriesSubscription;

	      if (!retries) {
	        errors = new Subject();
	        retries = tryCatch(this.notifier)(errors);

	        if (retries === errorObject) {
	          return _super.prototype.error.call(this, errorObject.e);
	        }

	        retriesSubscription = subscribeToResult(this, retries);
	      } else {
	        this.errors = null;
	        this.retriesSubscription = null;
	      }

	      this._unsubscribeAndRecycle();

	      this.errors = errors;
	      this.retries = retries;
	      this.retriesSubscription = retriesSubscription;
	      errors.next(err);
	    }
	  };

	  RetryWhenSubscriber.prototype._unsubscribe = function () {
	    var _a = this,
	        errors = _a.errors,
	        retriesSubscription = _a.retriesSubscription;

	    if (errors) {
	      errors.unsubscribe();
	      this.errors = null;
	    }

	    if (retriesSubscription) {
	      retriesSubscription.unsubscribe();
	      this.retriesSubscription = null;
	    }

	    this.retries = null;
	  };

	  RetryWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    var _unsubscribe = this._unsubscribe;
	    this._unsubscribe = null;

	    this._unsubscribeAndRecycle();

	    this._unsubscribe = _unsubscribe;
	    this.source.subscribe(this);
	  };

	  return RetryWhenSubscriber;
	}(OuterSubscriber);

	var SampleSubscriber = function (_super) {
	  __extends(SampleSubscriber, _super);

	  function SampleSubscriber() {
	    var _this = _super !== null && _super.apply(this, arguments) || this;

	    _this.hasValue = false;
	    return _this;
	  }

	  SampleSubscriber.prototype._next = function (value) {
	    this.value = value;
	    this.hasValue = true;
	  };

	  SampleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.emitValue();
	  };

	  SampleSubscriber.prototype.notifyComplete = function () {
	    this.emitValue();
	  };

	  SampleSubscriber.prototype.emitValue = function () {
	    if (this.hasValue) {
	      this.hasValue = false;
	      this.destination.next(this.value);
	    }
	  };

	  return SampleSubscriber;
	}(OuterSubscriber);

	var SampleTimeSubscriber = function (_super) {
	  __extends(SampleTimeSubscriber, _super);

	  function SampleTimeSubscriber(destination, period, scheduler) {
	    var _this = _super.call(this, destination) || this;

	    _this.period = period;
	    _this.scheduler = scheduler;
	    _this.hasValue = false;

	    _this.add(scheduler.schedule(dispatchNotification, period, {
	      subscriber: _this,
	      period: period
	    }));

	    return _this;
	  }

	  SampleTimeSubscriber.prototype._next = function (value) {
	    this.lastValue = value;
	    this.hasValue = true;
	  };

	  SampleTimeSubscriber.prototype.notifyNext = function () {
	    if (this.hasValue) {
	      this.hasValue = false;
	      this.destination.next(this.lastValue);
	    }
	  };

	  return SampleTimeSubscriber;
	}(Subscriber);

	function dispatchNotification(state) {
	  var subscriber = state.subscriber,
	      period = state.period;
	  subscriber.notifyNext();
	  this.schedule(state, period);
	}

	var SequenceEqualSubscriber = function (_super) {
	  __extends(SequenceEqualSubscriber, _super);

	  function SequenceEqualSubscriber(destination, compareTo, comparor) {
	    var _this = _super.call(this, destination) || this;

	    _this.compareTo = compareTo;
	    _this.comparor = comparor;
	    _this._a = [];
	    _this._b = [];
	    _this._oneComplete = false;

	    _this.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, _this)));

	    return _this;
	  }

	  SequenceEqualSubscriber.prototype._next = function (value) {
	    if (this._oneComplete && this._b.length === 0) {
	      this.emit(false);
	    } else {
	      this._a.push(value);

	      this.checkValues();
	    }
	  };

	  SequenceEqualSubscriber.prototype._complete = function () {
	    if (this._oneComplete) {
	      this.emit(this._a.length === 0 && this._b.length === 0);
	    } else {
	      this._oneComplete = true;
	    }
	  };

	  SequenceEqualSubscriber.prototype.checkValues = function () {
	    var _c = this,
	        _a = _c._a,
	        _b = _c._b,
	        comparor = _c.comparor;

	    while (_a.length > 0 && _b.length > 0) {
	      var a = _a.shift();

	      var b = _b.shift();

	      var areEqual = false;

	      if (comparor) {
	        areEqual = tryCatch(comparor)(a, b);

	        if (areEqual === errorObject) {
	          this.destination.error(errorObject.e);
	        }
	      } else {
	        areEqual = a === b;
	      }

	      if (!areEqual) {
	        this.emit(false);
	      }
	    }
	  };

	  SequenceEqualSubscriber.prototype.emit = function (value) {
	    var destination = this.destination;
	    destination.next(value);
	    destination.complete();
	  };

	  SequenceEqualSubscriber.prototype.nextB = function (value) {
	    if (this._oneComplete && this._a.length === 0) {
	      this.emit(false);
	    } else {
	      this._b.push(value);

	      this.checkValues();
	    }
	  };

	  return SequenceEqualSubscriber;
	}(Subscriber);

	var SequenceEqualCompareToSubscriber = function (_super) {
	  __extends(SequenceEqualCompareToSubscriber, _super);

	  function SequenceEqualCompareToSubscriber(destination, parent) {
	    var _this = _super.call(this, destination) || this;

	    _this.parent = parent;
	    return _this;
	  }

	  SequenceEqualCompareToSubscriber.prototype._next = function (value) {
	    this.parent.nextB(value);
	  };

	  SequenceEqualCompareToSubscriber.prototype._error = function (err) {
	    this.parent.error(err);
	  };

	  SequenceEqualCompareToSubscriber.prototype._complete = function () {
	    this.parent._complete();
	  };

	  return SequenceEqualCompareToSubscriber;
	}(Subscriber);

	var SingleSubscriber = function (_super) {
	  __extends(SingleSubscriber, _super);

	  function SingleSubscriber(destination, predicate, source) {
	    var _this = _super.call(this, destination) || this;

	    _this.predicate = predicate;
	    _this.source = source;
	    _this.seenValue = false;
	    _this.index = 0;
	    return _this;
	  }

	  SingleSubscriber.prototype.applySingleValue = function (value) {
	    if (this.seenValue) {
	      this.destination.error('Sequence contains more than one element');
	    } else {
	      this.seenValue = true;
	      this.singleValue = value;
	    }
	  };

	  SingleSubscriber.prototype._next = function (value) {
	    var index = this.index++;

	    if (this.predicate) {
	      this.tryNext(value, index);
	    } else {
	      this.applySingleValue(value);
	    }
	  };

	  SingleSubscriber.prototype.tryNext = function (value, index) {
	    try {
	      if (this.predicate(value, index, this.source)) {
	        this.applySingleValue(value);
	      }
	    } catch (err) {
	      this.destination.error(err);
	    }
	  };

	  SingleSubscriber.prototype._complete = function () {
	    var destination = this.destination;

	    if (this.index > 0) {
	      destination.next(this.seenValue ? this.singleValue : undefined);
	      destination.complete();
	    } else {
	      destination.error(new EmptyError());
	    }
	  };

	  return SingleSubscriber;
	}(Subscriber);

	function skip(count) {
	  return function (source) {
	    return source.lift(new SkipOperator(count));
	  };
	}

	var SkipOperator = function () {
	  function SkipOperator(total) {
	    this.total = total;
	  }

	  SkipOperator.prototype.call = function (subscriber, source) {
	    return source.subscribe(new SkipSubscriber(subscriber, this.total));
	  };

	  return SkipOperator;
	}();

	var SkipSubscriber = function (_super) {
	  __extends(SkipSubscriber, _super);

	  function SkipSubscriber(destination, total) {
	    var _this = _super.call(this, destination) || this;

	    _this.total = total;
	    _this.count = 0;
	    return _this;
	  }

	  SkipSubscriber.prototype._next = function (x) {
	    if (++this.count > this.total) {
	      this.destination.next(x);
	    }
	  };

	  return SkipSubscriber;
	}(Subscriber);

	var SkipLastSubscriber = function (_super) {
	  __extends(SkipLastSubscriber, _super);

	  function SkipLastSubscriber(destination, _skipCount) {
	    var _this = _super.call(this, destination) || this;

	    _this._skipCount = _skipCount;
	    _this._count = 0;
	    _this._ring = new Array(_skipCount);
	    return _this;
	  }

	  SkipLastSubscriber.prototype._next = function (value) {
	    var skipCount = this._skipCount;
	    var count = this._count++;

	    if (count < skipCount) {
	      this._ring[count] = value;
	    } else {
	      var currentIndex = count % skipCount;
	      var ring = this._ring;
	      var oldValue = ring[currentIndex];
	      ring[currentIndex] = value;
	      this.destination.next(oldValue);
	    }
	  };

	  return SkipLastSubscriber;
	}(Subscriber);

	var SkipUntilSubscriber = function (_super) {
	  __extends(SkipUntilSubscriber, _super);

	  function SkipUntilSubscriber(destination, notifier) {
	    var _this = _super.call(this, destination) || this;

	    _this.hasValue = false;
	    var innerSubscriber = new InnerSubscriber(_this, undefined, undefined);

	    _this.add(innerSubscriber);

	    _this.innerSubscription = innerSubscriber;
	    subscribeToResult(_this, notifier, undefined, undefined, innerSubscriber);
	    return _this;
	  }

	  SkipUntilSubscriber.prototype._next = function (value) {
	    if (this.hasValue) {
	      _super.prototype._next.call(this, value);
	    }
	  };

	  SkipUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.hasValue = true;

	    if (this.innerSubscription) {
	      this.innerSubscription.unsubscribe();
	    }
	  };

	  SkipUntilSubscriber.prototype.notifyComplete = function () {};

	  return SkipUntilSubscriber;
	}(OuterSubscriber);

	var SkipWhileSubscriber = function (_super) {
	  __extends(SkipWhileSubscriber, _super);

	  function SkipWhileSubscriber(destination, predicate) {
	    var _this = _super.call(this, destination) || this;

	    _this.predicate = predicate;
	    _this.skipping = true;
	    _this.index = 0;
	    return _this;
	  }

	  SkipWhileSubscriber.prototype._next = function (value) {
	    var destination = this.destination;

	    if (this.skipping) {
	      this.tryCallPredicate(value);
	    }

	    if (!this.skipping) {
	      destination.next(value);
	    }
	  };

	  SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
	    try {
	      var result = this.predicate(value, this.index++);
	      this.skipping = Boolean(result);
	    } catch (err) {
	      this.destination.error(err);
	    }
	  };

	  return SkipWhileSubscriber;
	}(Subscriber);

	var SubscribeOnObservable = function (_super) {
	  __extends(SubscribeOnObservable, _super);

	  function SubscribeOnObservable(source, delayTime, scheduler) {
	    if (delayTime === void 0) {
	      delayTime = 0;
	    }

	    if (scheduler === void 0) {
	      scheduler = asap;
	    }

	    var _this = _super.call(this) || this;

	    _this.source = source;
	    _this.delayTime = delayTime;
	    _this.scheduler = scheduler;

	    if (!isNumeric(delayTime) || delayTime < 0) {
	      _this.delayTime = 0;
	    }

	    if (!scheduler || typeof scheduler.schedule !== 'function') {
	      _this.scheduler = asap;
	    }

	    return _this;
	  }

	  SubscribeOnObservable.create = function (source, delay, scheduler) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (scheduler === void 0) {
	      scheduler = asap;
	    }

	    return new SubscribeOnObservable(source, delay, scheduler);
	  };

	  SubscribeOnObservable.dispatch = function (arg) {
	    var source = arg.source,
	        subscriber = arg.subscriber;
	    return this.add(source.subscribe(subscriber));
	  };

	  SubscribeOnObservable.prototype._subscribe = function (subscriber) {
	    var delay = this.delayTime;
	    var source = this.source;
	    var scheduler = this.scheduler;
	    return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
	      source: source,
	      subscriber: subscriber
	    });
	  };

	  return SubscribeOnObservable;
	}(Observable);

	var SwitchMapSubscriber = function (_super) {
	  __extends(SwitchMapSubscriber, _super);

	  function SwitchMapSubscriber(destination, project) {
	    var _this = _super.call(this, destination) || this;

	    _this.project = project;
	    _this.index = 0;
	    return _this;
	  }

	  SwitchMapSubscriber.prototype._next = function (value) {
	    var result;
	    var index = this.index++;

	    try {
	      result = this.project(value, index);
	    } catch (error) {
	      this.destination.error(error);
	      return;
	    }

	    this._innerSub(result, value, index);
	  };

	  SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
	    var innerSubscription = this.innerSubscription;

	    if (innerSubscription) {
	      innerSubscription.unsubscribe();
	    }

	    var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
	    this.add(innerSubscriber);
	    this.innerSubscription = subscribeToResult(this, result, value, index, innerSubscriber);
	  };

	  SwitchMapSubscriber.prototype._complete = function () {
	    var innerSubscription = this.innerSubscription;

	    if (!innerSubscription || innerSubscription.closed) {
	      _super.prototype._complete.call(this);
	    }
	  };

	  SwitchMapSubscriber.prototype._unsubscribe = function () {
	    this.innerSubscription = null;
	  };

	  SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
	    this.remove(innerSub);
	    this.innerSubscription = null;

	    if (this.isStopped) {
	      _super.prototype._complete.call(this);
	    }
	  };

	  SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.destination.next(innerValue);
	  };

	  return SwitchMapSubscriber;
	}(OuterSubscriber);

	var TakeUntilSubscriber = function (_super) {
	  __extends(TakeUntilSubscriber, _super);

	  function TakeUntilSubscriber(destination) {
	    var _this = _super.call(this, destination) || this;

	    _this.seenValue = false;
	    return _this;
	  }

	  TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.seenValue = true;
	    this.complete();
	  };

	  TakeUntilSubscriber.prototype.notifyComplete = function () {};

	  return TakeUntilSubscriber;
	}(OuterSubscriber);

	var TakeWhileSubscriber = function (_super) {
	  __extends(TakeWhileSubscriber, _super);

	  function TakeWhileSubscriber(destination, predicate) {
	    var _this = _super.call(this, destination) || this;

	    _this.predicate = predicate;
	    _this.index = 0;
	    return _this;
	  }

	  TakeWhileSubscriber.prototype._next = function (value) {
	    var destination = this.destination;
	    var result;

	    try {
	      result = this.predicate(value, this.index++);
	    } catch (err) {
	      destination.error(err);
	      return;
	    }

	    this.nextOrComplete(value, result);
	  };

	  TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
	    var destination = this.destination;

	    if (Boolean(predicateResult)) {
	      destination.next(value);
	    } else {
	      destination.complete();
	    }
	  };

	  return TakeWhileSubscriber;
	}(Subscriber);

	var ThrottleSubscriber = function (_super) {
	  __extends(ThrottleSubscriber, _super);

	  function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
	    var _this = _super.call(this, destination) || this;

	    _this.destination = destination;
	    _this.durationSelector = durationSelector;
	    _this._leading = _leading;
	    _this._trailing = _trailing;
	    _this._hasValue = false;
	    return _this;
	  }

	  ThrottleSubscriber.prototype._next = function (value) {
	    this._hasValue = true;
	    this._sendValue = value;

	    if (!this._throttled) {
	      if (this._leading) {
	        this.send();
	      } else {
	        this.throttle(value);
	      }
	    }
	  };

	  ThrottleSubscriber.prototype.send = function () {
	    var _a = this,
	        _hasValue = _a._hasValue,
	        _sendValue = _a._sendValue;

	    if (_hasValue) {
	      this.destination.next(_sendValue);
	      this.throttle(_sendValue);
	    }

	    this._hasValue = false;
	    this._sendValue = null;
	  };

	  ThrottleSubscriber.prototype.throttle = function (value) {
	    var duration = this.tryDurationSelector(value);

	    if (duration) {
	      this.add(this._throttled = subscribeToResult(this, duration));
	    }
	  };

	  ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
	    try {
	      return this.durationSelector(value);
	    } catch (err) {
	      this.destination.error(err);
	      return null;
	    }
	  };

	  ThrottleSubscriber.prototype.throttlingDone = function () {
	    var _a = this,
	        _throttled = _a._throttled,
	        _trailing = _a._trailing;

	    if (_throttled) {
	      _throttled.unsubscribe();
	    }

	    this._throttled = null;

	    if (_trailing) {
	      this.send();
	    }
	  };

	  ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.throttlingDone();
	  };

	  ThrottleSubscriber.prototype.notifyComplete = function () {
	    this.throttlingDone();
	  };

	  return ThrottleSubscriber;
	}(OuterSubscriber);

	var ThrottleTimeSubscriber = function (_super) {
	  __extends(ThrottleTimeSubscriber, _super);

	  function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
	    var _this = _super.call(this, destination) || this;

	    _this.duration = duration;
	    _this.scheduler = scheduler;
	    _this.leading = leading;
	    _this.trailing = trailing;
	    _this._hasTrailingValue = false;
	    _this._trailingValue = null;
	    return _this;
	  }

	  ThrottleTimeSubscriber.prototype._next = function (value) {
	    if (this.throttled) {
	      if (this.trailing) {
	        this._trailingValue = value;
	        this._hasTrailingValue = true;
	      }
	    } else {
	      this.add(this.throttled = this.scheduler.schedule(dispatchNext$3, this.duration, {
	        subscriber: this
	      }));

	      if (this.leading) {
	        this.destination.next(value);
	      }
	    }
	  };

	  ThrottleTimeSubscriber.prototype._complete = function () {
	    if (this._hasTrailingValue) {
	      this.destination.next(this._trailingValue);
	      this.destination.complete();
	    } else {
	      this.destination.complete();
	    }
	  };

	  ThrottleTimeSubscriber.prototype.clearThrottle = function () {
	    var throttled = this.throttled;

	    if (throttled) {
	      if (this.trailing && this._hasTrailingValue) {
	        this.destination.next(this._trailingValue);
	        this._trailingValue = null;
	        this._hasTrailingValue = false;
	      }

	      throttled.unsubscribe();
	      this.remove(throttled);
	      this.throttled = null;
	    }
	  };

	  return ThrottleTimeSubscriber;
	}(Subscriber);

	function dispatchNext$3(arg) {
	  var subscriber = arg.subscriber;
	  subscriber.clearThrottle();
	}

	var TimeoutWithSubscriber = function (_super) {
	  __extends(TimeoutWithSubscriber, _super);

	  function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
	    var _this = _super.call(this, destination) || this;

	    _this.absoluteTimeout = absoluteTimeout;
	    _this.waitFor = waitFor;
	    _this.withObservable = withObservable;
	    _this.scheduler = scheduler;
	    _this.action = null;

	    _this.scheduleTimeout();

	    return _this;
	  }

	  TimeoutWithSubscriber.dispatchTimeout = function (subscriber) {
	    var withObservable = subscriber.withObservable;

	    subscriber._unsubscribeAndRecycle();

	    subscriber.add(subscribeToResult(subscriber, withObservable));
	  };

	  TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
	    var action = this.action;

	    if (action) {
	      this.action = action.schedule(this, this.waitFor);
	    } else {
	      this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
	    }
	  };

	  TimeoutWithSubscriber.prototype._next = function (value) {
	    if (!this.absoluteTimeout) {
	      this.scheduleTimeout();
	    }

	    _super.prototype._next.call(this, value);
	  };

	  TimeoutWithSubscriber.prototype._unsubscribe = function () {
	    this.action = null;
	    this.scheduler = null;
	    this.withObservable = null;
	  };

	  return TimeoutWithSubscriber;
	}(OuterSubscriber);

	var WindowSubscriber = function (_super) {
	  __extends(WindowSubscriber, _super);

	  function WindowSubscriber(destination) {
	    var _this = _super.call(this, destination) || this;

	    _this.window = new Subject();
	    destination.next(_this.window);
	    return _this;
	  }

	  WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.openWindow();
	  };

	  WindowSubscriber.prototype.notifyError = function (error, innerSub) {
	    this._error(error);
	  };

	  WindowSubscriber.prototype.notifyComplete = function (innerSub) {
	    this._complete();
	  };

	  WindowSubscriber.prototype._next = function (value) {
	    this.window.next(value);
	  };

	  WindowSubscriber.prototype._error = function (err) {
	    this.window.error(err);
	    this.destination.error(err);
	  };

	  WindowSubscriber.prototype._complete = function () {
	    this.window.complete();
	    this.destination.complete();
	  };

	  WindowSubscriber.prototype._unsubscribe = function () {
	    this.window = null;
	  };

	  WindowSubscriber.prototype.openWindow = function () {
	    var prevWindow = this.window;

	    if (prevWindow) {
	      prevWindow.complete();
	    }

	    var destination = this.destination;
	    var newWindow = this.window = new Subject();
	    destination.next(newWindow);
	  };

	  return WindowSubscriber;
	}(OuterSubscriber);

	var WindowCountSubscriber = function (_super) {
	  __extends(WindowCountSubscriber, _super);

	  function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
	    var _this = _super.call(this, destination) || this;

	    _this.destination = destination;
	    _this.windowSize = windowSize;
	    _this.startWindowEvery = startWindowEvery;
	    _this.windows = [new Subject()];
	    _this.count = 0;
	    destination.next(_this.windows[0]);
	    return _this;
	  }

	  WindowCountSubscriber.prototype._next = function (value) {
	    var startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
	    var destination = this.destination;
	    var windowSize = this.windowSize;
	    var windows = this.windows;
	    var len = windows.length;

	    for (var i = 0; i < len && !this.closed; i++) {
	      windows[i].next(value);
	    }

	    var c = this.count - windowSize + 1;

	    if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
	      windows.shift().complete();
	    }

	    if (++this.count % startWindowEvery === 0 && !this.closed) {
	      var window_1 = new Subject();
	      windows.push(window_1);
	      destination.next(window_1);
	    }
	  };

	  WindowCountSubscriber.prototype._error = function (err) {
	    var windows = this.windows;

	    if (windows) {
	      while (windows.length > 0 && !this.closed) {
	        windows.shift().error(err);
	      }
	    }

	    this.destination.error(err);
	  };

	  WindowCountSubscriber.prototype._complete = function () {
	    var windows = this.windows;

	    if (windows) {
	      while (windows.length > 0 && !this.closed) {
	        windows.shift().complete();
	      }
	    }

	    this.destination.complete();
	  };

	  WindowCountSubscriber.prototype._unsubscribe = function () {
	    this.count = 0;
	    this.windows = null;
	  };

	  return WindowCountSubscriber;
	}(Subscriber);

	var CountedSubject = function (_super) {
	  __extends(CountedSubject, _super);

	  function CountedSubject() {
	    var _this = _super !== null && _super.apply(this, arguments) || this;

	    _this._numberOfNextedValues = 0;
	    return _this;
	  }

	  CountedSubject.prototype.next = function (value) {
	    this._numberOfNextedValues++;

	    _super.prototype.next.call(this, value);
	  };

	  Object.defineProperty(CountedSubject.prototype, "numberOfNextedValues", {
	    get: function get() {
	      return this._numberOfNextedValues;
	    },
	    enumerable: true,
	    configurable: true
	  });
	  return CountedSubject;
	}(Subject);

	var WindowTimeSubscriber = function (_super) {
	  __extends(WindowTimeSubscriber, _super);

	  function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
	    var _this = _super.call(this, destination) || this;

	    _this.destination = destination;
	    _this.windowTimeSpan = windowTimeSpan;
	    _this.windowCreationInterval = windowCreationInterval;
	    _this.maxWindowSize = maxWindowSize;
	    _this.scheduler = scheduler;
	    _this.windows = [];

	    var window = _this.openWindow();

	    if (windowCreationInterval !== null && windowCreationInterval >= 0) {
	      var closeState = {
	        subscriber: _this,
	        window: window,
	        context: null
	      };
	      var creationState = {
	        windowTimeSpan: windowTimeSpan,
	        windowCreationInterval: windowCreationInterval,
	        subscriber: _this,
	        scheduler: scheduler
	      };

	      _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));

	      _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
	    } else {
	      var timeSpanOnlyState = {
	        subscriber: _this,
	        window: window,
	        windowTimeSpan: windowTimeSpan
	      };

	      _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
	    }

	    return _this;
	  }

	  WindowTimeSubscriber.prototype._next = function (value) {
	    var windows = this.windows;
	    var len = windows.length;

	    for (var i = 0; i < len; i++) {
	      var window_1 = windows[i];

	      if (!window_1.closed) {
	        window_1.next(value);

	        if (window_1.numberOfNextedValues >= this.maxWindowSize) {
	          this.closeWindow(window_1);
	        }
	      }
	    }
	  };

	  WindowTimeSubscriber.prototype._error = function (err) {
	    var windows = this.windows;

	    while (windows.length > 0) {
	      windows.shift().error(err);
	    }

	    this.destination.error(err);
	  };

	  WindowTimeSubscriber.prototype._complete = function () {
	    var windows = this.windows;

	    while (windows.length > 0) {
	      var window_2 = windows.shift();

	      if (!window_2.closed) {
	        window_2.complete();
	      }
	    }

	    this.destination.complete();
	  };

	  WindowTimeSubscriber.prototype.openWindow = function () {
	    var window = new CountedSubject();
	    this.windows.push(window);
	    var destination = this.destination;
	    destination.next(window);
	    return window;
	  };

	  WindowTimeSubscriber.prototype.closeWindow = function (window) {
	    window.complete();
	    var windows = this.windows;
	    windows.splice(windows.indexOf(window), 1);
	  };

	  return WindowTimeSubscriber;
	}(Subscriber);

	function dispatchWindowTimeSpanOnly(state) {
	  var subscriber = state.subscriber,
	      windowTimeSpan = state.windowTimeSpan,
	      window = state.window;

	  if (window) {
	    subscriber.closeWindow(window);
	  }

	  state.window = subscriber.openWindow();
	  this.schedule(state, windowTimeSpan);
	}

	function dispatchWindowCreation(state) {
	  var windowTimeSpan = state.windowTimeSpan,
	      subscriber = state.subscriber,
	      scheduler = state.scheduler,
	      windowCreationInterval = state.windowCreationInterval;
	  var window = subscriber.openWindow();
	  var action = this;
	  var context = {
	    action: action,
	    subscription: null
	  };
	  var timeSpanState = {
	    subscriber: subscriber,
	    window: window,
	    context: context
	  };
	  context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
	  action.add(context.subscription);
	  action.schedule(state, windowCreationInterval);
	}

	function dispatchWindowClose(state) {
	  var subscriber = state.subscriber,
	      window = state.window,
	      context = state.context;

	  if (context && context.action && context.subscription) {
	    context.action.remove(context.subscription);
	  }

	  subscriber.closeWindow(window);
	}

	var WindowToggleSubscriber = function (_super) {
	  __extends(WindowToggleSubscriber, _super);

	  function WindowToggleSubscriber(destination, openings, closingSelector) {
	    var _this = _super.call(this, destination) || this;

	    _this.openings = openings;
	    _this.closingSelector = closingSelector;
	    _this.contexts = [];

	    _this.add(_this.openSubscription = subscribeToResult(_this, openings, openings));

	    return _this;
	  }

	  WindowToggleSubscriber.prototype._next = function (value) {
	    var contexts = this.contexts;

	    if (contexts) {
	      var len = contexts.length;

	      for (var i = 0; i < len; i++) {
	        contexts[i].window.next(value);
	      }
	    }
	  };

	  WindowToggleSubscriber.prototype._error = function (err) {
	    var contexts = this.contexts;
	    this.contexts = null;

	    if (contexts) {
	      var len = contexts.length;
	      var index = -1;

	      while (++index < len) {
	        var context_1 = contexts[index];
	        context_1.window.error(err);
	        context_1.subscription.unsubscribe();
	      }
	    }

	    _super.prototype._error.call(this, err);
	  };

	  WindowToggleSubscriber.prototype._complete = function () {
	    var contexts = this.contexts;
	    this.contexts = null;

	    if (contexts) {
	      var len = contexts.length;
	      var index = -1;

	      while (++index < len) {
	        var context_2 = contexts[index];
	        context_2.window.complete();
	        context_2.subscription.unsubscribe();
	      }
	    }

	    _super.prototype._complete.call(this);
	  };

	  WindowToggleSubscriber.prototype._unsubscribe = function () {
	    var contexts = this.contexts;
	    this.contexts = null;

	    if (contexts) {
	      var len = contexts.length;
	      var index = -1;

	      while (++index < len) {
	        var context_3 = contexts[index];
	        context_3.window.unsubscribe();
	        context_3.subscription.unsubscribe();
	      }
	    }
	  };

	  WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    if (outerValue === this.openings) {
	      var closingSelector = this.closingSelector;
	      var closingNotifier = tryCatch(closingSelector)(innerValue);

	      if (closingNotifier === errorObject) {
	        return this.error(errorObject.e);
	      } else {
	        var window_1 = new Subject();
	        var subscription = new Subscription();
	        var context_4 = {
	          window: window_1,
	          subscription: subscription
	        };
	        this.contexts.push(context_4);
	        var innerSubscription = subscribeToResult(this, closingNotifier, context_4);

	        if (innerSubscription.closed) {
	          this.closeWindow(this.contexts.length - 1);
	        } else {
	          innerSubscription.context = context_4;
	          subscription.add(innerSubscription);
	        }

	        this.destination.next(window_1);
	      }
	    } else {
	      this.closeWindow(this.contexts.indexOf(outerValue));
	    }
	  };

	  WindowToggleSubscriber.prototype.notifyError = function (err) {
	    this.error(err);
	  };

	  WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
	    if (inner !== this.openSubscription) {
	      this.closeWindow(this.contexts.indexOf(inner.context));
	    }
	  };

	  WindowToggleSubscriber.prototype.closeWindow = function (index) {
	    if (index === -1) {
	      return;
	    }

	    var contexts = this.contexts;
	    var context = contexts[index];
	    var window = context.window,
	        subscription = context.subscription;
	    contexts.splice(index, 1);
	    window.complete();
	    subscription.unsubscribe();
	  };

	  return WindowToggleSubscriber;
	}(OuterSubscriber);

	var WindowSubscriber$1 = function (_super) {
	  __extends(WindowSubscriber, _super);

	  function WindowSubscriber(destination, closingSelector) {
	    var _this = _super.call(this, destination) || this;

	    _this.destination = destination;
	    _this.closingSelector = closingSelector;

	    _this.openWindow();

	    return _this;
	  }

	  WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.openWindow(innerSub);
	  };

	  WindowSubscriber.prototype.notifyError = function (error, innerSub) {
	    this._error(error);
	  };

	  WindowSubscriber.prototype.notifyComplete = function (innerSub) {
	    this.openWindow(innerSub);
	  };

	  WindowSubscriber.prototype._next = function (value) {
	    this.window.next(value);
	  };

	  WindowSubscriber.prototype._error = function (err) {
	    this.window.error(err);
	    this.destination.error(err);
	    this.unsubscribeClosingNotification();
	  };

	  WindowSubscriber.prototype._complete = function () {
	    this.window.complete();
	    this.destination.complete();
	    this.unsubscribeClosingNotification();
	  };

	  WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
	    if (this.closingNotification) {
	      this.closingNotification.unsubscribe();
	    }
	  };

	  WindowSubscriber.prototype.openWindow = function (innerSub) {
	    if (innerSub === void 0) {
	      innerSub = null;
	    }

	    if (innerSub) {
	      this.remove(innerSub);
	      innerSub.unsubscribe();
	    }

	    var prevWindow = this.window;

	    if (prevWindow) {
	      prevWindow.complete();
	    }

	    var window = this.window = new Subject();
	    this.destination.next(window);
	    var closingNotifier = tryCatch(this.closingSelector)();

	    if (closingNotifier === errorObject) {
	      var err = errorObject.e;
	      this.destination.error(err);
	      this.window.error(err);
	    } else {
	      this.add(this.closingNotification = subscribeToResult(this, closingNotifier));
	    }
	  };

	  return WindowSubscriber;
	}(OuterSubscriber);

	var WithLatestFromSubscriber = function (_super) {
	  __extends(WithLatestFromSubscriber, _super);

	  function WithLatestFromSubscriber(destination, observables, project) {
	    var _this = _super.call(this, destination) || this;

	    _this.observables = observables;
	    _this.project = project;
	    _this.toRespond = [];
	    var len = observables.length;
	    _this.values = new Array(len);

	    for (var i = 0; i < len; i++) {
	      _this.toRespond.push(i);
	    }

	    for (var i = 0; i < len; i++) {
	      var observable = observables[i];

	      _this.add(subscribeToResult(_this, observable, observable, i));
	    }

	    return _this;
	  }

	  WithLatestFromSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.values[outerIndex] = innerValue;
	    var toRespond = this.toRespond;

	    if (toRespond.length > 0) {
	      var found = toRespond.indexOf(outerIndex);

	      if (found !== -1) {
	        toRespond.splice(found, 1);
	      }
	    }
	  };

	  WithLatestFromSubscriber.prototype.notifyComplete = function () {};

	  WithLatestFromSubscriber.prototype._next = function (value) {
	    if (this.toRespond.length === 0) {
	      var args = [value].concat(this.values);

	      if (this.project) {
	        this._tryProject(args);
	      } else {
	        this.destination.next(args);
	      }
	    }
	  };

	  WithLatestFromSubscriber.prototype._tryProject = function (args) {
	    var result;

	    try {
	      result = this.project.apply(this, args);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    this.destination.next(result);
	  };

	  return WithLatestFromSubscriber;
	}(OuterSubscriber);

	var TrackableManager = function () {
	  function TrackableManager() {
	    this.listenerStack = [];
	    this.listenStack = [];
	  }

	  var _proto = TrackableManager.prototype;

	  _proto.trackableAccessed = function trackableAccessed(subscribable) {
	    if (this.isListening) {
	      var top = this.listenStack[this.listenStack.length - 1];
	      if (top.indexOf(subscribable) === -1) top.push(subscribable);
	    }
	  };

	  _proto.startListening = function startListening(listener) {
	    this.listenerStack.push(listener);
	    this.listenStack.push([]);
	  };

	  _proto.stopListening = function stopListening() {
	    this.listenerStack.pop();
	    var dependencies = this.listenStack.pop();
	    if (dependencies == null) throw new Error("Listening stack malformed, could not pop dependencies from stack");
	    return dependencies;
	  };

	  createClass(TrackableManager, [{
	    key: "isListening",
	    get: function get() {
	      return this.listenStack.length > 0;
	    }
	  }]);

	  return TrackableManager;
	}();

	var trackableManager = new TrackableManager();

	var TrackedSubject = function () {
	  function TrackedSubject(initialValue, compare) {
	    this.subject = new BehaviorSubject(initialValue);
	    this.observable = this.subject.pipe(distinctUntilChanged(compare)).pipe(skip(1));
	  }

	  var _proto2 = TrackedSubject.prototype;

	  _proto2.subscribe = function subscribe(observer) {
	    return this.observable.subscribe(observer);
	  };

	  createClass(TrackedSubject, [{
	    key: "value",
	    get: function get() {
	      trackableManager.trackableAccessed(this);
	      return this.subject.value;
	    },
	    set: function set(value) {
	      this.subject.next(value);
	    }
	  }]);

	  return TrackedSubject;
	}();

	function shallowEqualArrays(a, b) {
	  if (a === b) {
	    return true;
	  }

	  var len = a.length;

	  if (b.length !== len) {
	    return false;
	  }

	  for (var i = 0; i < len; i++) {
	    if (a[i] !== b[i]) {
	      return false;
	    }
	  }

	  return true;
	}

	var TrackedArray = function () {
	  function TrackedArray(initialValue, compare) {
	    if (!Array.isArray(initialValue)) {
	      throw new Error("Trackable array must only be assigned an array as a value");
	    }

	    if (compare == null) compare = shallowEqualArrays;
	    this.subject = new TrackedSubject(initialValue, compare);
	  }

	  var _proto3 = TrackedArray.prototype;

	  _proto3.subscribe = function subscribe(observer) {
	    return this.observable.subscribe(observer);
	  };

	  createClass(TrackedArray, [{
	    key: "value",
	    get: function get() {
	      var arr = [].concat(this.subject.value);
	      Object.freeze(arr);
	      return arr;
	    },
	    set: function set(value) {
	      if (!Array.isArray(value)) {
	        throw new Error("Trackable array must only be assigned an array as a value");
	      }

	      this.subject.value = value;
	    }
	  }, {
	    key: "observable",
	    get: function get() {
	      return this.subject.observable;
	    }
	  }]);

	  return TrackedArray;
	}();

	var TrackedComputedSubject = function () {
	  function TrackedComputedSubject(getter) {
	    this._dependencies = [];
	    this.getter = getter;
	    this.subject = new BehaviorSubject(this.evaluateValue());
	    this.observable = this.subject.pipe(distinctUntilChanged()).pipe(skip(1));
	  }

	  var _proto4 = TrackedComputedSubject.prototype;

	  _proto4.evaluateValue = function evaluateValue() {
	    trackableManager.trackableAccessed(this);
	    trackableManager.startListening(this);
	    var val = this.getter();
	    var dependencies = trackableManager.stopListening();
	    this.updateSubscriptions(dependencies);
	    return val;
	  };

	  _proto4.updateSubscriptions = function updateSubscriptions(dependencies) {
	    var _this2 = this;

	    for (var _iterator = dependencies, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	      var _ref;

	      if (_isArray) {
	        if (_i2 >= _iterator.length) break;
	        _ref = _iterator[_i2++];
	      } else {
	        _i2 = _iterator.next();
	        if (_i2.done) break;
	        _ref = _i2.value;
	      }

	      var subscribable = _ref;

	      if (subscribable !== this && this._dependencies.indexOf(subscribable) === -1) {
	        subscribable.subscribe(function () {
	          _this2.subject.next(_this2.evaluateValue());
	        });

	        this._dependencies.push(subscribable);
	      }
	    }
	  };

	  _proto4.subscribe = function subscribe(observer) {
	    return this.observable.subscribe(observer);
	  };

	  createClass(TrackedComputedSubject, [{
	    key: "value",
	    get: function get() {
	      trackableManager.trackableAccessed(this);
	      return this.subject.value;
	    }
	  }]);

	  return TrackedComputedSubject;
	}();

	var TrackableEntityKey = "_trackableEntity";

	function trackable(constructor) {
	  constructor.prototype[TrackableEntityKey] = true;
	}

	var isTrackableEntity = function isTrackableEntity(obj) {
	  return typeof obj === "object" && obj[TrackableEntityKey] === true;
	};

	var TrackedPropertyDefinitionListKey = "_trackedPropertyDefinitions";

	var getTrackedPropertyDefinitionList = function getTrackedPropertyDefinitionList(obj) {
	  return obj[TrackedPropertyDefinitionListKey] = obj[TrackedPropertyDefinitionListKey] || {};
	};

	var registerTrackedPropertyDefinition = function registerTrackedPropertyDefinition(proto, name, computed) {
	  var list = getTrackedPropertyDefinitionList(proto);
	  list[name] = {
	    computed: computed
	  };
	};

	var ComputedPropertyListKey = "_computedProperties";

	var getComputedPropertyList = function getComputedPropertyList(obj) {
	  return obj[ComputedPropertyListKey] = obj[ComputedPropertyListKey] || {};
	};

	var getOrSetupComputedProperty = function getOrSetupComputedProperty(obj, name, getter) {
	  var list = getComputedPropertyList(obj);
	  var existing = list[name];

	  if (!existing) {
	    var subject = new TrackedComputedSubject(getter.bind(obj));
	    list[name] = {
	      subject: subject
	    };
	  }

	  return list[name].subject;
	};

	var getComputedProperty = function getComputedProperty(obj, name) {
	  var list = getComputedPropertyList(obj);
	  var existing = list[name];

	  if (!existing) {
	    throw new Error("Property accessed before initialized: " + name);
	  }

	  return existing.subject;
	};

	var TrackedPropertyListKey = "_trackedProperties";

	var getTrackedPropertyList = function getTrackedPropertyList(obj) {
	  return obj[TrackedPropertyListKey] = obj[TrackedPropertyListKey] || {};
	};

	var getTrackedProperty = function getTrackedProperty(obj, name, notFound) {
	  var list = getTrackedPropertyList(obj);
	  var existing = list[name];

	  if (!existing) {
	    if (notFound) return notFound(list, name);else throw new Error("Property accessed before initialized or property doesn't exist: " + name);
	  }

	  return existing.subject;
	};

	var getAllTrackedProperties = function getAllTrackedProperties(obj) {
	  var list = getTrackedPropertyDefinitionList(obj);
	  return Object.keys(list).map(function (key) {
	    return {
	      key: key,
	      definition: list[key]
	    };
	  }).map(function (_ref2) {
	    var key = _ref2.key,
	        definition = _ref2.definition;
	    return definition.computed ? getComputedProperty(obj, key) : getTrackedProperty(obj, key);
	  });
	};

	var getAllObservables = function getAllObservables(obj) {
	  return getAllTrackedProperties(obj).map(function (tracked) {
	    return tracked.observable;
	  });
	};

	var subscribeAll = function subscribeAll(obj, observer) {
	  return merge.apply(void 0, getAllObservables(obj)).subscribe(observer);
	};

	var TrackedEntity = function () {
	  function TrackedEntity(initialValue) {
	    var _this3 = this;

	    this.subscription = null;
	    this.subject = new TrackedSubject(initialValue);
	    this.observable = new Observable(function (subscriber) {
	      _this3.next = function () {
	        return subscriber.next();
	      };
	    });

	    if (isTrackableEntity(initialValue)) {
	      this.subscription = subscribeAll(initialValue, function () {
	        return _this3.next();
	      });
	    }
	  }

	  var _proto5 = TrackedEntity.prototype;

	  _proto5.subscribe = function subscribe(observer) {
	    return merge(this.observable, this.subject.observable).subscribe(observer);
	  };

	  createClass(TrackedEntity, [{
	    key: "value",
	    get: function get() {
	      return this.subject.value;
	    },
	    set: function set(value) {
	      if (value !== this.subject.value) {
	        if (this.subscription && !this.subscription.closed) {
	          this.subscription.unsubscribe();
	          this.subscription = null;
	        }
	      }

	      if (isTrackableEntity(value)) {
	        this.subscription = subscribeAll(value, this.next);
	      }

	      this.subject.value = value;
	    }
	  }]);

	  return TrackedEntity;
	}();

	var createTracked = function createTracked(value) {
	  if (Array.isArray(value)) {
	    return new TrackedArray(value);
	  } else if (isTrackableEntity(value)) {
	    return new TrackedEntity(value);
	  } else {
	    return new TrackedSubject(value);
	  }
	};

	var getOrSetupTrackedProperty = function getOrSetupTrackedProperty(obj, name, value) {
	  return getTrackedProperty(obj, name, function (list) {
	    return (list[name] = {
	      subject: createTracked(value)
	    }).subject;
	  });
	};

	function tracked(prototype, propertyName) {
	  registerTrackedPropertyDefinition(prototype, propertyName, false);
	  return {
	    set: function set(value) {
	      getOrSetupTrackedProperty(this, propertyName, value).value = value;
	    },
	    get: function get() {
	      return getTrackedProperty(this, propertyName).value;
	    },
	    enumerable: true,
	    configurable: true
	  };
	}

	function computed(proto, propertyName, descriptor) {
	  registerTrackedPropertyDefinition(proto, propertyName, true);
	  var getter = descriptor.get;

	  descriptor.get = function () {
	    return getOrSetupComputedProperty(this, propertyName, getter).value;
	  };

	  return descriptor;
	}

	var TrackablesImport = /*#__PURE__*/Object.freeze({
		TrackedArray: TrackedArray,
		TrackedComputedSubject: TrackedComputedSubject,
		TrackedSubject: TrackedSubject,
		createTracked: createTracked,
		tracked: tracked,
		trackable: trackable,
		isTrackableEntity: isTrackableEntity,
		computed: computed
	});

	var Page = function Page() {
	  var _this = this;

	  this.revealNavigation = new TrackedSubject(false);
	  this.disableScroll = new TrackedComputedSubject(function () {
	    return _this.revealNavigation.value;
	  });
	  this.topNavigationRendered = false;
	  this.onTopNavigationRendered = [];
	};
	var page = new Page();

	function _templateObject2() {
	  var data = taggedTemplateLiteralLoose(["<nav class=\"bt-top-navigation-links\">\n                        ", "\n                    </nav>"]);

	  _templateObject2 = function _templateObject2() {
	    return data;
	  };

	  return data;
	}

	function _templateObject() {
	  var data = taggedTemplateLiteralLoose(["\n                <a class=\"bt-top-navigation-logo\" href=\"", "\">\n                    ", "\n                </a>\n    \n            \n    \n                ", "\n                \n    \n                <button class=\"bt-top-navigation-toggle\" onclick=", "><span class=\"bt-top-navigation-toggle-text\">Toggle</span></button>\n            "]);

	  _templateObject = function _templateObject() {
	    return data;
	  };

	  return data;
	}

	function filterImageHtml(html) {
	  return "\n        <img width=\"963\" height=\"207\" src=\"https://wvalleyfiber.stagingsite.design/wp-content/uploads/2018/10/logo@2x.png\"\n        class=\"attachment-full size-full\" alt=\"\"\n        \n        >";
	}

	var TopNavigationElement = function (_HyperHTMLElement) {
	  inheritsLoose(TopNavigationElement, _HyperHTMLElement);

	  function TopNavigationElement() {
	    var _this;

	    _this = _HyperHTMLElement.apply(this, arguments) || this;

	    _this.toggleButtonClicked = function () {
	      page.revealNavigation.value = !page.revealNavigation.value;
	    };

	    return _this;
	  }

	  var _proto = TopNavigationElement.prototype;

	  _proto.created = function created() {
	    var _this2 = this;

	    this.items = new TrackedArray([]);
	    this.renderedHtml = new TrackedComputedSubject(function () {
	      var result = _this2.html(_templateObject(), _wpSiteInfo.homeUrl, _wpSiteInfo.customLogo ? {
	        html: filterImageHtml(_wpSiteInfo.customLogo.imageHtml)
	      } : _wpSiteInfo.siteDisplayName, _this2.items.value.length > 0 ? TopNavigationElement.wire()(_templateObject2(), _this2.items.value.map(function (item) {
	        return "<a class=\"bt-top-navigation-link\" href=\"" + item.url + "\">" + item.title + "</a>";
	      })) : null, _this2.toggleButtonClicked);

	      if (!page.topNavigationRendered && _this2.items.value.length > 0) {
	        page.onTopNavigationRendered.forEach(function (cb) {
	          return cb();
	        });
	        page.topNavigationRendered = true;
	      }

	      return result;
	    });
	    var client = new MenuItemClient();
	    client.getAll().then(function (items) {
	      return _this2.items.value = items;
	    }).catch(function (e) {
	      console.error(e);
	      throw e;
	    });
	    this.renderedHtml.subscribe(function () {
	      return _this2.render();
	    });
	    this.render();

	    var documentClickHandler = function documentClickHandler(e) {
	      var node = e.target;

	      while (node) {
	        console.log(node);

	        if (node["className"] && (node["className"].match(/bt-top-navigation-link([^s]|$)/) != null || node["className"].indexOf("bt-top-navigation-toggle") != -1)) {
	          return;
	        }

	        node = node.parentNode;
	      }

	      page.revealNavigation.value = false;
	    };

	    document.addEventListener("click", documentClickHandler);
	    document.addEventListener("touchend", documentClickHandler);
	  };

	  _proto.render = function render() {
	    return this.renderedHtml.value;
	  };

	  return TopNavigationElement;
	}(HyperHTMLElement);
	TopNavigationElement.define("bt-top-navigation");

	var PageElement = function (_HyperHTMLElement) {
	  inheritsLoose(PageElement, _HyperHTMLElement);

	  function PageElement() {
	    return _HyperHTMLElement.apply(this, arguments) || this;
	  }

	  var _proto = PageElement.prototype;

	  _proto.created = function created() {
	    var _this = this;

	    var updateRevealNavigationCss = function updateRevealNavigationCss(value) {
	      value ? _this.classList.add("bt-page-reveal-navigation") : _this.classList.remove("bt-page-reveal-navigation");
	    };

	    page.revealNavigation.subscribe(updateRevealNavigationCss);
	    updateRevealNavigationCss(page.revealNavigation.value);
	  };

	  _proto.render = function render() {
	    return this.childNodes;
	  };

	  return PageElement;
	}(HyperHTMLElement);
	PageElement.define("bt-page");

	var PageWrapperElement = function (_HyperHTMLElement) {
	  inheritsLoose(PageWrapperElement, _HyperHTMLElement);

	  function PageWrapperElement() {
	    return _HyperHTMLElement.apply(this, arguments) || this;
	  }

	  var _proto = PageWrapperElement.prototype;

	  _proto.created = function created() {};

	  _proto.render = function render() {
	    return this.childNodes;
	  };

	  return PageWrapperElement;
	}(HyperHTMLElement);
	PageWrapperElement.define("bt-page-wrapper");

	var AnimationLoop = function () {
	  function AnimationLoop() {
	    var _this = this;

	    this.frameNumber = 0;
	    this.reads = [];
	    this.writes = [];

	    var loop = function loop() {
	      _this.reads.slice(0).forEach(function (h) {
	        return h.callback();
	      });

	      _this.writes.slice(0).forEach(function (h) {
	        return h.callback();
	      });

	      _this.increment();

	      requestAnimationFrame(loop);
	    };

	    requestAnimationFrame(loop);
	  }

	  var _proto = AnimationLoop.prototype;

	  _proto.read = function read(callback, once, throttle) {
	    var _this2 = this;

	    if (once == null) once = true;
	    var resultCallback = callback;
	    if (once) resultCallback = function resultCallback() {
	      return _this2.removeReadEventHandler(id);
	    }, callback();

	    if (throttle) {
	      var originalResultCallback = resultCallback;

	      resultCallback = function resultCallback() {
	        if (_this2.frameNumber % throttle === 0) originalResultCallback();
	      };
	    }

	    var id = this.addReadEventHandler(resultCallback);
	    return id;
	  };

	  _proto.write = function write(callback, once, throttle) {
	    var _this3 = this;

	    if (once == null) once = true;
	    var resultCallback = callback;
	    if (once) resultCallback = function resultCallback() {
	      return _this3.removeWriteEventHandler(id);
	    }, callback();

	    if (throttle) {
	      var originalResultCallback = resultCallback;

	      resultCallback = function resultCallback() {
	        if (_this3.frameNumber % throttle === 0) originalResultCallback();
	      };
	    }

	    var id = this.addWriteEventHandler(resultCallback);
	    return id;
	  };

	  _proto.removeReadEventHandler = function removeReadEventHandler(id) {
	    return this.removeEventHandler(this.reads, id);
	  };

	  _proto.removeWriteEventHandler = function removeWriteEventHandler(id) {
	    return this.removeEventHandler(this.writes, id);
	  };

	  _proto.addWriteEventHandler = function addWriteEventHandler(callback) {
	    return this.addEventHandler(this.writes, callback);
	  };

	  _proto.increment = function increment() {
	    if (this.frameNumber === 59) this.frameNumber = 0;else this.frameNumber++;
	  };

	  _proto.addReadEventHandler = function addReadEventHandler(callback) {
	    return this.addEventHandler(this.reads, callback);
	  };

	  _proto.addEventHandler = function addEventHandler(eventArray, callback) {
	    var id = Math.random();
	    eventArray.push({
	      id: id,
	      callback: callback
	    });
	    return id;
	  };

	  _proto.removeEventHandler = function removeEventHandler(eventArray, id) {
	    var index = eventArray.findIndex(function (h) {
	      return h.id === id;
	    });

	    if (index !== -1) {
	      eventArray.splice(index, 1);
	      return true;
	    }

	    return false;
	  };

	  return AnimationLoop;
	}();

	var animationLoop = new AnimationLoop();

	var WindowState = function WindowState() {
	  var _this = this;

	  this.scrollY = new TrackedSubject(window.scrollY || document.documentElement.scrollTop);
	  this.innerHeight = new TrackedSubject(window.innerHeight);
	  this.clientHeight = new TrackedSubject(document.documentElement.clientHeight);
	  console.log('dadsadsa');
	  animationLoop.read(function () {
	    _this.scrollY.value = window.scrollY || document.documentElement.scrollTop;
	    _this.innerHeight.value = window.innerHeight;
	    _this.clientHeight.value = document.documentElement.clientHeight;
	  }, false);
	};
	var windowState = new WindowState();

	function offsetTopRecursive(element) {
	  var top = element.offsetTop;

	  while (element = element.offsetParent) {
	    top += element.offsetTop;
	  }

	  return top + document.documentElement.offsetTop;
	}

	var BaseTheme;

	(function (BaseTheme) {
	  BaseTheme.HyperHTMLElement = HyperHTMLElement;
	  BaseTheme.Trackables = TrackablesImport;
	  BaseTheme.page = page;
	  BaseTheme.windowState = windowState;
	  BaseTheme.utilities = {
	    offsetTopRecursive: offsetTopRecursive
	  };
	})(BaseTheme || (BaseTheme = {}));

	window.baseTheme = BaseTheme;

	function randomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	function initializeRevealEffect(element) {
	  var elementTop = new TrackedSubject(offsetTopRecursive(element));
	  var id = animationLoop.read(function () {
	    elementTop.value = offsetTopRecursive(element);
	  }, false, 20);

	  var evaluateScroll = function evaluateScroll(scrollY) {
	    if (scrollY + windowState.innerHeight.value * 0.9 > elementTop.value) {
	      reveal();
	    }
	  };

	  var subscription = windowState.scrollY.subscribe(evaluateScroll);
	  evaluateScroll(windowState.scrollY.value);

	  function reveal() {
	    setTimeout(function () {
	      var list = (element.className || "").split(" ");
	      list.splice(list.indexOf("bt-reveal"), 1);
	      element.className = list.join(" ");
	    }, randomInt(0, 150));
	    animationLoop.removeReadEventHandler(id);
	    subscription.unsubscribe();
	  }
	}

	function initializeFillHeight(element) {
	  var top = new TrackedSubject(offsetTopRecursive(element));
	  var handlerId = animationLoop.read(function () {
	    top.value = offsetTopRecursive(element);
	  }, false, 30);
	  var computed$$1 = new TrackedComputedSubject(function () {
	    return windowState.innerHeight.value - top.value;
	  });

	  var updateElementHeight = function updateElementHeight(value) {
	    element.style.height = value + "px";
	  };

	  var subscription = computed$$1.subscribe(updateElementHeight);
	  updateElementHeight(computed$$1.value);
	}

	function initializeBackgroundCover(element) {
	  var img = element.querySelector('img');
	}

	function initializeParallax(element, origin, multiplier) {
	  element.style["willChange"] = "transform";
	  var originMultiplier = origin === "top" ? 0 : origin === "bottom" ? 1 : origin === "center" ? 0.5 : origin;
	  var elementTop = new TrackedSubject(offsetTopRecursive(element));
	  var elementHeight = new TrackedSubject(element.offsetHeight);
	  animationLoop.read(function () {
	    elementTop.value = offsetTopRecursive(element);
	    elementHeight.value = element.offsetHeight;
	  }, false, 2);
	  var elementOrigin = new TrackedComputedSubject(function () {
	    return elementHeight.value * originMultiplier;
	  });
	  var windowOrigin = new TrackedComputedSubject(function () {
	    return windowState.clientHeight.value * originMultiplier;
	  });
	  var withinWindow = new TrackedComputedSubject(function () {
	    var margin = 100;
	    var x1 = windowState.scrollY.value - margin;
	    var x2 = windowState.scrollY.value + windowState.clientHeight.value + margin;
	    var y1 = elementTop.value;
	    var y2 = elementTop.value + elementHeight.value;
	    if (x1 <= y2 && y1 <= x2) return true;
	    return false;
	  });
	  var offset = new TrackedComputedSubject(function () {
	    return Math.round((elementTop.value + elementOrigin.value - (windowState.scrollY.value + windowOrigin.value)) * multiplier);
	  });
	  offset.subscribe(function (value) {
	    if (!withinWindow.value) return;
	    animationLoop.write(function () {
	      var transform = "translate3d(0, " + value + "px, 0)";
	      element.style.transform = transform;
	    }, true);
	  });
	  animationLoop.write(function () {
	    var transform = "translate3d(0, " + offset.value + "px, 0)";
	    element.style.transform = transform;
	  }, true);
	}

	document.addEventListener("DOMContentLoaded", function () {
	  var revealElements = document.querySelectorAll('.bt-reveal');

	  for (var i = 0; i < revealElements.length; i++) {
	    var el = revealElements[i];
	    initializeRevealEffect(el);
	  }

	  var fillHeightElements = document.querySelectorAll('.bt-fill-remaining-height');

	  for (var _i = 0; _i < fillHeightElements.length; _i++) {
	    var _el = fillHeightElements[_i];
	    initializeFillHeight(_el);
	  }

	  var backgroundCoverElements = document.querySelectorAll('.bt-background-cover');

	  for (var _i2 = 0; _i2 < backgroundCoverElements.length; _i2++) {
	    var _el2 = backgroundCoverElements[_i2];
	    initializeBackgroundCover(_el2);
	  }

	  var parallaxElements = document.querySelectorAll('.bt-parallax');

	  var _loop = function _loop(_i3) {
	    var el = parallaxElements[_i3];
	    var classArray = (el.className || "").split(" ");
	    classArray.forEach(function (cssClass) {
	      if (cssClass.match(/bt-parallax-/)) {
	        var matches = /bt-parallax-([^-]*?)-([-0-9]*)/.exec(cssClass);
	        var origin = matches[1];
	        var value = parseInt(matches[2]) / 100;
	        initializeParallax(el, origin, value);
	      }
	    });
	  };

	  for (var _i3 = 0; _i3 < parallaxElements.length; _i3++) {
	    _loop(_i3);
	  }

	  var updateDisableScrollCss = function updateDisableScrollCss(value) {
	    value ? document.body.classList.add("bt-disable-scroll") : document.body.classList.remove("bt-disable-scroll");
	  };

	  page.disableScroll.subscribe(updateDisableScrollCss);
	  updateDisableScrollCss(page.disableScroll.value);
	});

}());
