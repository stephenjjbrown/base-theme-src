(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/**
	@license @nocompile
	Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	(function () {

	  var r,
	      t = "undefined" != typeof window && window === this ? this : "undefined" != typeof commonjsGlobal && null != commonjsGlobal ? commonjsGlobal : this,
	      ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
	    a != Array.prototype && a != Object.prototype && (a[b] = c.value);
	  };

	  function ca() {
	    ca = function ca() {};

	    t.Symbol || (t.Symbol = da);
	  }

	  var da = function () {
	    var a = 0;
	    return function (b) {
	      return "jscomp_symbol_" + (b || "") + a++;
	    };
	  }();

	  function ea() {
	    ca();
	    var a = t.Symbol.iterator;
	    a || (a = t.Symbol.iterator = t.Symbol("iterator"));
	    "function" != typeof Array.prototype[a] && ba(Array.prototype, a, {
	      configurable: !0,
	      writable: !0,
	      value: function value() {
	        return fa(this);
	      }
	    });

	    ea = function ea() {};
	  }

	  function fa(a) {
	    var b = 0;
	    return ha(function () {
	      return b < a.length ? {
	        done: !1,
	        value: a[b++]
	      } : {
	        done: !0
	      };
	    });
	  }

	  function ha(a) {
	    ea();
	    a = {
	      next: a
	    };

	    a[t.Symbol.iterator] = function () {
	      return this;
	    };

	    return a;
	  }

	  function ia(a) {
	    ea();
	    var b = a[Symbol.iterator];
	    return b ? b.call(a) : fa(a);
	  }

	  function ja(a) {
	    for (var b, c = []; !(b = a.next()).done;) {
	      c.push(b.value);
	    }

	    return c;
	  }

	  var ka;
	  if ("function" == typeof Object.setPrototypeOf) ka = Object.setPrototypeOf;else {
	    var la;

	    a: {
	      var ma = {
	        Ga: !0
	      },
	          na = {};

	      try {
	        na.__proto__ = ma;
	        la = na.Ga;
	        break a;
	      } catch (a) {}

	      la = !1;
	    }

	    ka = la ? function (a, b) {
	      a.__proto__ = b;
	      if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
	      return a;
	    } : null;
	  }
	  var oa = ka;

	  function pa() {
	    this.f = !1;
	    this.b = null;
	    this.ca = void 0;
	    this.a = 1;
	    this.F = 0;
	    this.c = null;
	  }

	  function qa(a) {
	    if (a.f) throw new TypeError("Generator is already running");
	    a.f = !0;
	  }

	  pa.prototype.u = function (a) {
	    this.ca = a;
	  };

	  function ra(a, b) {
	    a.c = {
	      Ja: b,
	      Na: !0
	    };
	    a.a = a.F;
	  }

	  pa.prototype.return = function (a) {
	    this.c = {
	      return: a
	    };
	    this.a = this.F;
	  };

	  function sa(a, b) {
	    a.a = 3;
	    return {
	      value: b
	    };
	  }

	  function ta(a) {
	    this.a = new pa();
	    this.b = a;
	  }

	  function ua(a, b) {
	    qa(a.a);
	    var c = a.a.b;
	    if (c) return va(a, "return" in c ? c["return"] : function (a) {
	      return {
	        value: a,
	        done: !0
	      };
	    }, b, a.a.return);
	    a.a.return(b);
	    return wa(a);
	  }

	  function va(a, b, c, d) {
	    try {
	      var e = b.call(a.a.b, c);
	      if (!(e instanceof Object)) throw new TypeError("Iterator result " + e + " is not an object");
	      if (!e.done) return a.a.f = !1, e;
	      var f = e.value;
	    } catch (g) {
	      return a.a.b = null, ra(a.a, g), wa(a);
	    }

	    a.a.b = null;
	    d.call(a.a, f);
	    return wa(a);
	  }

	  function wa(a) {
	    for (; a.a.a;) {
	      try {
	        var b = a.b(a.a);
	        if (b) return a.a.f = !1, {
	          value: b.value,
	          done: !1
	        };
	      } catch (c) {
	        a.a.ca = void 0, ra(a.a, c);
	      }
	    }

	    a.a.f = !1;

	    if (a.a.c) {
	      b = a.a.c;
	      a.a.c = null;
	      if (b.Na) throw b.Ja;
	      return {
	        value: b.return,
	        done: !0
	      };
	    }

	    return {
	      value: void 0,
	      done: !0
	    };
	  }

	  function xa(a) {
	    this.next = function (b) {
	      qa(a.a);
	      a.a.b ? b = va(a, a.a.b.next, b, a.a.u) : (a.a.u(b), b = wa(a));
	      return b;
	    };

	    this.throw = function (b) {
	      qa(a.a);
	      a.a.b ? b = va(a, a.a.b["throw"], b, a.a.u) : (ra(a.a, b), b = wa(a));
	      return b;
	    };

	    this.return = function (b) {
	      return ua(a, b);
	    };

	    ea();

	    this[Symbol.iterator] = function () {
	      return this;
	    };
	  }

	  function Aa(a, b) {
	    b = new xa(new ta(b));
	    oa && oa(b, a.prototype);
	    return b;
	  }

	  (function () {
	    if (!function () {
	      var a = document.createEvent("Event");
	      a.initEvent("foo", !0, !0);
	      a.preventDefault();
	      return a.defaultPrevented;
	    }()) {
	      var a = Event.prototype.preventDefault;

	      Event.prototype.preventDefault = function () {
	        this.cancelable && (a.call(this), Object.defineProperty(this, "defaultPrevented", {
	          get: function get() {
	            return !0;
	          },
	          configurable: !0
	        }));
	      };
	    }

	    var b = /Trident/.test(navigator.userAgent);
	    if (!window.CustomEvent || b && "function" !== typeof window.CustomEvent) window.CustomEvent = function (a, b) {
	      b = b || {};
	      var c = document.createEvent("CustomEvent");
	      c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);
	      return c;
	    }, window.CustomEvent.prototype = window.Event.prototype;

	    if (!window.Event || b && "function" !== typeof window.Event) {
	      var c = window.Event;

	      window.Event = function (a, b) {
	        b = b || {};
	        var c = document.createEvent("Event");
	        c.initEvent(a, !!b.bubbles, !!b.cancelable);
	        return c;
	      };

	      if (c) for (var d in c) {
	        window.Event[d] = c[d];
	      }
	      window.Event.prototype = c.prototype;
	    }

	    if (!window.MouseEvent || b && "function" !== typeof window.MouseEvent) {
	      b = window.MouseEvent;

	      window.MouseEvent = function (a, b) {
	        b = b || {};
	        var c = document.createEvent("MouseEvent");
	        c.initMouseEvent(a, !!b.bubbles, !!b.cancelable, b.view || window, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget);
	        return c;
	      };

	      if (b) for (d in b) {
	        window.MouseEvent[d] = b[d];
	      }
	      window.MouseEvent.prototype = b.prototype;
	    }

	    Array.from || (Array.from = function (a) {
	      return [].slice.call(a);
	    });
	    Object.assign || (Object.assign = function (a, b) {
	      for (var c = [].slice.call(arguments, 1), d = 0, e; d < c.length; d++) {
	        if (e = c[d]) for (var f = a, n = e, p = Object.getOwnPropertyNames(n), G = 0; G < p.length; G++) {
	          e = p[G], f[e] = n[e];
	        }
	      }

	      return a;
	    });
	  })(window.WebComponents);

	  (function () {
	    function a() {}

	    function b(a, b) {
	      if (!a.childNodes.length) return [];

	      switch (a.nodeType) {
	        case Node.DOCUMENT_NODE:
	          return Q.call(a, b);

	        case Node.DOCUMENT_FRAGMENT_NODE:
	          return Ab.call(a, b);

	        default:
	          return x.call(a, b);
	      }
	    }

	    var c = "undefined" === typeof HTMLTemplateElement,
	        d = !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment),
	        e = !1;
	    /Trident/.test(navigator.userAgent) && function () {
	      function a(a, b) {
	        if (a instanceof DocumentFragment) for (var d; d = a.firstChild;) {
	          c.call(this, d, b);
	        } else c.call(this, a, b);
	        return a;
	      }

	      e = !0;
	      var b = Node.prototype.cloneNode;

	      Node.prototype.cloneNode = function (a) {
	        a = b.call(this, a);
	        this instanceof DocumentFragment && (a.__proto__ = DocumentFragment.prototype);
	        return a;
	      };

	      DocumentFragment.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll;
	      DocumentFragment.prototype.querySelector = HTMLElement.prototype.querySelector;
	      Object.defineProperties(DocumentFragment.prototype, {
	        nodeType: {
	          get: function get() {
	            return Node.DOCUMENT_FRAGMENT_NODE;
	          },
	          configurable: !0
	        },
	        localName: {
	          get: function get() {},
	          configurable: !0
	        },
	        nodeName: {
	          get: function get() {
	            return "#document-fragment";
	          },
	          configurable: !0
	        }
	      });
	      var c = Node.prototype.insertBefore;
	      Node.prototype.insertBefore = a;
	      var d = Node.prototype.appendChild;

	      Node.prototype.appendChild = function (b) {
	        b instanceof DocumentFragment ? a.call(this, b, null) : d.call(this, b);
	        return b;
	      };

	      var f = Node.prototype.removeChild,
	          g = Node.prototype.replaceChild;

	      Node.prototype.replaceChild = function (b, c) {
	        b instanceof DocumentFragment ? (a.call(this, b, c), f.call(this, c)) : g.call(this, b, c);
	        return c;
	      };

	      Document.prototype.createDocumentFragment = function () {
	        var a = this.createElement("df");
	        a.__proto__ = DocumentFragment.prototype;
	        return a;
	      };

	      var h = Document.prototype.importNode;

	      Document.prototype.importNode = function (a, b) {
	        b = h.call(this, a, b || !1);
	        a instanceof DocumentFragment && (b.__proto__ = DocumentFragment.prototype);
	        return b;
	      };
	    }();

	    var f = Node.prototype.cloneNode,
	        g = Document.prototype.createElement,
	        h = Document.prototype.importNode,
	        k = Node.prototype.removeChild,
	        m = Node.prototype.appendChild,
	        n = Node.prototype.replaceChild,
	        p = DOMParser.prototype.parseFromString,
	        G = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML") || {
	      get: function get() {
	        return this.innerHTML;
	      },
	      set: function set(a) {
	        this.innerHTML = a;
	      }
	    },
	        u = Object.getOwnPropertyDescriptor(window.Node.prototype, "childNodes") || {
	      get: function get() {
	        return this.childNodes;
	      }
	    },
	        x = Element.prototype.querySelectorAll,
	        Q = Document.prototype.querySelectorAll,
	        Ab = DocumentFragment.prototype.querySelectorAll,
	        Bb = function () {
	      if (!c) {
	        var a = document.createElement("template"),
	            b = document.createElement("template");
	        b.content.appendChild(document.createElement("div"));
	        a.content.appendChild(b);
	        a = a.cloneNode(!0);
	        return 0 === a.content.childNodes.length || 0 === a.content.firstChild.content.childNodes.length || d;
	      }
	    }();

	    if (c) {
	      var T = document.implementation.createHTMLDocument("template"),
	          Ka = !0,
	          q = document.createElement("style");
	      q.textContent = "template{display:none;}";
	      var ya = document.head;
	      ya.insertBefore(q, ya.firstElementChild);
	      a.prototype = Object.create(HTMLElement.prototype);
	      var Z = !document.createElement("div").hasOwnProperty("innerHTML");

	      a.P = function (b) {
	        if (!b.content && b.namespaceURI === document.documentElement.namespaceURI) {
	          b.content = T.createDocumentFragment();

	          for (var c; c = b.firstChild;) {
	            m.call(b.content, c);
	          }

	          if (Z) b.__proto__ = a.prototype;else if (b.cloneNode = function (b) {
	            return a.b(this, b);
	          }, Ka) try {
	            l(b), y(b);
	          } catch (jh) {
	            Ka = !1;
	          }
	          a.a(b.content);
	        }
	      };

	      var X = {
	        option: ["select"],
	        thead: ["table"],
	        col: ["colgroup", "table"],
	        tr: ["tbody", "table"],
	        th: ["tr", "tbody", "table"],
	        td: ["tr", "tbody", "table"]
	      },
	          l = function l(b) {
	        Object.defineProperty(b, "innerHTML", {
	          get: function get() {
	            return aa(this);
	          },
	          set: function set(b) {
	            var c = X[(/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(b) || ["", ""])[1].toLowerCase()];
	            if (c) for (var d = 0; d < c.length; d++) {
	              b = "<" + c[d] + ">" + b + "</" + c[d] + ">";
	            }
	            T.body.innerHTML = b;

	            for (a.a(T); this.content.firstChild;) {
	              k.call(this.content, this.content.firstChild);
	            }

	            b = T.body;
	            if (c) for (d = 0; d < c.length; d++) {
	              b = b.lastChild;
	            }

	            for (; b.firstChild;) {
	              m.call(this.content, b.firstChild);
	            }
	          },
	          configurable: !0
	        });
	      },
	          y = function y(a) {
	        Object.defineProperty(a, "outerHTML", {
	          get: function get() {
	            return "<template>" + this.innerHTML + "</template>";
	          },
	          set: function set(a) {
	            if (this.parentNode) {
	              T.body.innerHTML = a;

	              for (a = this.ownerDocument.createDocumentFragment(); T.body.firstChild;) {
	                m.call(a, T.body.firstChild);
	              }

	              n.call(this.parentNode, a, this);
	            } else throw Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");
	          },
	          configurable: !0
	        });
	      };

	      l(a.prototype);
	      y(a.prototype);

	      a.a = function (c) {
	        c = b(c, "template");

	        for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) {
	          a.P(f);
	        }
	      };

	      document.addEventListener("DOMContentLoaded", function () {
	        a.a(document);
	      });

	      Document.prototype.createElement = function () {
	        var b = g.apply(this, arguments);
	        "template" === b.localName && a.P(b);
	        return b;
	      };

	      DOMParser.prototype.parseFromString = function () {
	        var b = p.apply(this, arguments);
	        a.a(b);
	        return b;
	      };

	      Object.defineProperty(HTMLElement.prototype, "innerHTML", {
	        get: function get() {
	          return aa(this);
	        },
	        set: function set(b) {
	          G.set.call(this, b);
	          a.a(this);
	        },
	        configurable: !0,
	        enumerable: !0
	      });

	      var Y = /[&\u00A0"]/g,
	          Cb = /[&\u00A0<>]/g,
	          La = function La(a) {
	        switch (a) {
	          case "&":
	            return "&amp;";

	          case "<":
	            return "&lt;";

	          case ">":
	            return "&gt;";

	          case '"':
	            return "&quot;";

	          case "\xA0":
	            return "&nbsp;";
	        }
	      };

	      q = function q(a) {
	        for (var b = {}, c = 0; c < a.length; c++) {
	          b[a[c]] = !0;
	        }

	        return b;
	      };

	      var za = q("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
	          Ma = q("style script xmp iframe noembed noframes plaintext noscript".split(" ")),
	          aa = function aa(a, b) {
	        "template" === a.localName && (a = a.content);

	        for (var c = "", d = b ? b(a) : u.get.call(a), e = 0, f = d.length, g; e < f && (g = d[e]); e++) {
	          a: {
	            var h = g;
	            var k = a;
	            var m = b;

	            switch (h.nodeType) {
	              case Node.ELEMENT_NODE:
	                for (var l = h.localName, n = "<" + l, p = h.attributes, x = 0; k = p[x]; x++) {
	                  n += " " + k.name + '="' + k.value.replace(Y, La) + '"';
	                }

	                n += ">";
	                h = za[l] ? n : n + aa(h, m) + "</" + l + ">";
	                break a;

	              case Node.TEXT_NODE:
	                h = h.data;
	                h = k && Ma[k.localName] ? h : h.replace(Cb, La);
	                break a;

	              case Node.COMMENT_NODE:
	                h = "\x3c!--" + h.data + "--\x3e";
	                break a;

	              default:
	                throw window.console.error(h), Error("not implemented");
	            }
	          }

	          c += h;
	        }

	        return c;
	      };
	    }

	    if (c || Bb) {
	      a.b = function (a, b) {
	        var c = f.call(a, !1);
	        this.P && this.P(c);
	        b && (m.call(c.content, f.call(a.content, !0)), Na(c.content, a.content));
	        return c;
	      };

	      var Na = function Na(c, d) {
	        if (d.querySelectorAll && (d = b(d, "template"), 0 !== d.length)) {
	          c = b(c, "template");

	          for (var e = 0, f = c.length, g, h; e < f; e++) {
	            h = d[e], g = c[e], a && a.P && a.P(h), n.call(g.parentNode, mf.call(h, !0), g);
	          }
	        }
	      },
	          mf = Node.prototype.cloneNode = function (b) {
	        if (!e && d && this instanceof DocumentFragment) {
	          if (b) var c = nf.call(this.ownerDocument, this, !0);else return this.ownerDocument.createDocumentFragment();
	        } else this.nodeType === Node.ELEMENT_NODE && "template" === this.localName && this.namespaceURI == document.documentElement.namespaceURI ? c = a.b(this, b) : c = f.call(this, b);
	        b && Na(c, this);
	        return c;
	      },
	          nf = Document.prototype.importNode = function (c, d) {
	        d = d || !1;
	        if ("template" === c.localName) return a.b(c, d);
	        var e = h.call(this, c, d);

	        if (d) {
	          Na(e, c);
	          c = b(e, 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]');

	          for (var f, k = 0; k < c.length; k++) {
	            f = c[k];
	            d = g.call(document, "script");
	            d.textContent = f.textContent;

	            for (var m = f.attributes, l = 0, p; l < m.length; l++) {
	              p = m[l], d.setAttribute(p.name, p.value);
	            }

	            n.call(f.parentNode, d, f);
	          }
	        }

	        return e;
	      };
	    }

	    c && (window.HTMLTemplateElement = a);
	  })();

	  var Ba = setTimeout;

	  function Ca() {}

	  function Da(a, b) {
	    return function () {
	      a.apply(b, arguments);
	    };
	  }

	  function v(a) {
	    if (!(this instanceof v)) throw new TypeError("Promises must be constructed via new");
	    if ("function" !== typeof a) throw new TypeError("not a function");
	    this.I = 0;
	    this.sa = !1;
	    this.w = void 0;
	    this.S = [];
	    Ea(a, this);
	  }

	  function Fa(a, b) {
	    for (; 3 === a.I;) {
	      a = a.w;
	    }

	    0 === a.I ? a.S.push(b) : (a.sa = !0, Ga(function () {
	      var c = 1 === a.I ? b.Pa : b.Qa;
	      if (null === c) (1 === a.I ? Ha : Ia)(b.oa, a.w);else {
	        try {
	          var d = c(a.w);
	        } catch (e) {
	          Ia(b.oa, e);
	          return;
	        }

	        Ha(b.oa, d);
	      }
	    }));
	  }

	  function Ha(a, b) {
	    try {
	      if (b === a) throw new TypeError("A promise cannot be resolved with itself.");

	      if (b && ("object" === typeof b || "function" === typeof b)) {
	        var c = b.then;

	        if (b instanceof v) {
	          a.I = 3;
	          a.w = b;
	          Ja(a);
	          return;
	        }

	        if ("function" === typeof c) {
	          Ea(Da(c, b), a);
	          return;
	        }
	      }

	      a.I = 1;
	      a.w = b;
	      Ja(a);
	    } catch (d) {
	      Ia(a, d);
	    }
	  }

	  function Ia(a, b) {
	    a.I = 2;
	    a.w = b;
	    Ja(a);
	  }

	  function Ja(a) {
	    2 === a.I && 0 === a.S.length && Ga(function () {
	      a.sa || "undefined" !== typeof console && console && console.warn("Possible Unhandled Promise Rejection:", a.w);
	    });

	    for (var b = 0, c = a.S.length; b < c; b++) {
	      Fa(a, a.S[b]);
	    }

	    a.S = null;
	  }

	  function Oa(a, b, c) {
	    this.Pa = "function" === typeof a ? a : null;
	    this.Qa = "function" === typeof b ? b : null;
	    this.oa = c;
	  }

	  function Ea(a, b) {
	    var c = !1;

	    try {
	      a(function (a) {
	        c || (c = !0, Ha(b, a));
	      }, function (a) {
	        c || (c = !0, Ia(b, a));
	      });
	    } catch (d) {
	      c || (c = !0, Ia(b, d));
	    }
	  }

	  v.prototype["catch"] = function (a) {
	    return this.then(null, a);
	  };

	  v.prototype.then = function (a, b) {
	    var c = new this.constructor(Ca);
	    Fa(this, new Oa(a, b, c));
	    return c;
	  };

	  v.prototype["finally"] = function (a) {
	    var b = this.constructor;
	    return this.then(function (c) {
	      return b.resolve(a()).then(function () {
	        return c;
	      });
	    }, function (c) {
	      return b.resolve(a()).then(function () {
	        return b.reject(c);
	      });
	    });
	  };

	  function Pa(a) {
	    return new v(function (b, c) {
	      function d(a, g) {
	        try {
	          if (g && ("object" === typeof g || "function" === typeof g)) {
	            var h = g.then;

	            if ("function" === typeof h) {
	              h.call(g, function (b) {
	                d(a, b);
	              }, c);
	              return;
	            }
	          }

	          e[a] = g;
	          0 === --f && b(e);
	        } catch (n) {
	          c(n);
	        }
	      }

	      if (!a || "undefined" === typeof a.length) throw new TypeError("Promise.all accepts an array");
	      var e = Array.prototype.slice.call(a);
	      if (0 === e.length) return b([]);

	      for (var f = e.length, g = 0; g < e.length; g++) {
	        d(g, e[g]);
	      }
	    });
	  }

	  function Qa(a) {
	    return a && "object" === typeof a && a.constructor === v ? a : new v(function (b) {
	      b(a);
	    });
	  }

	  function Ra(a) {
	    return new v(function (b, c) {
	      c(a);
	    });
	  }

	  function Sa(a) {
	    return new v(function (b, c) {
	      for (var d = 0, e = a.length; d < e; d++) {
	        a[d].then(b, c);
	      }
	    });
	  }

	  var Ga = "function" === typeof setImmediate && function (a) {
	    setImmediate(a);
	  } || function (a) {
	    Ba(a, 0);
	  };

	  if (!window.Promise) {
	    window.Promise = v;
	    v.prototype.then = v.prototype.then;
	    v.all = Pa;
	    v.race = Sa;
	    v.resolve = Qa;
	    v.reject = Ra;
	    var Ta = document.createTextNode(""),
	        Ua = [];
	    new MutationObserver(function () {
	      for (var a = Ua.length, b = 0; b < a; b++) {
	        Ua[b]();
	      }

	      Ua.splice(0, a);
	    }).observe(Ta, {
	      characterData: !0
	    });

	    Ga = function Ga(a) {
	      Ua.push(a);
	      Ta.textContent = 0 < Ta.textContent.length ? "" : "a";
	    };
	  }

	  (function (a, b) {
	    if (!(b in a)) {
	      var c = typeof commonjsGlobal === typeof c ? window : commonjsGlobal,
	          d = 0,
	          e = "" + Math.random(),
	          f = "__\x01symbol@@" + e,
	          g = a.getOwnPropertyNames,
	          h = a.getOwnPropertyDescriptor,
	          k = a.create,
	          m = a.keys,
	          n = a.freeze || a,
	          p = a.defineProperty,
	          G = a.defineProperties,
	          u = h(a, "getOwnPropertyNames"),
	          x = a.prototype,
	          Q = x.hasOwnProperty,
	          Ab = x.propertyIsEnumerable,
	          Bb = x.toString,
	          T = function T(a, b, c) {
	        Q.call(a, f) || p(a, f, {
	          enumerable: !1,
	          configurable: !1,
	          writable: !1,
	          value: {}
	        });
	        a[f]["@@" + b] = c;
	      },
	          Ka = function Ka(a, b) {
	        var c = k(a);
	        g(b).forEach(function (a) {
	          X.call(b, a) && za(c, a, b[a]);
	        });
	        return c;
	      },
	          q = function q() {},
	          ya = function ya(a) {
	        return a != f && !Q.call(Y, a);
	      },
	          Z = function Z(a) {
	        return a != f && Q.call(Y, a);
	      },
	          X = function X(a) {
	        var b = "" + a;
	        return Z(b) ? Q.call(this, b) && this[f]["@@" + b] : Ab.call(this, a);
	      },
	          l = function l(b) {
	        p(x, b, {
	          enumerable: !1,
	          configurable: !0,
	          get: q,
	          set: function set(a) {
	            aa(this, b, {
	              enumerable: !1,
	              configurable: !0,
	              writable: !0,
	              value: a
	            });
	            T(this, b, !0);
	          }
	        });
	        return n(Y[b] = p(a(b), "constructor", Cb));
	      },
	          y = function y(a) {
	        if (this && this !== c) throw new TypeError("Symbol is not a constructor");
	        return l("__\x01symbol:".concat(a || "", e, ++d));
	      },
	          Y = k(null),
	          Cb = {
	        value: y
	      },
	          La = function La(a) {
	        return Y[a];
	      },
	          za = function za(a, b, c) {
	        var d = "" + b;

	        if (Z(d)) {
	          b = aa;

	          if (c.enumerable) {
	            var e = k(c);
	            e.enumerable = !1;
	          } else e = c;

	          b(a, d, e);
	          T(a, d, !!c.enumerable);
	        } else p(a, b, c);

	        return a;
	      },
	          Ma = function Ma(a) {
	        return g(a).filter(Z).map(La);
	      };

	      u.value = za;
	      p(a, "defineProperty", u);
	      u.value = Ma;
	      p(a, b, u);

	      u.value = function (a) {
	        return g(a).filter(ya);
	      };

	      p(a, "getOwnPropertyNames", u);

	      u.value = function (a, b) {
	        var c = Ma(b);
	        c.length ? m(b).concat(c).forEach(function (c) {
	          X.call(b, c) && za(a, c, b[c]);
	        }) : G(a, b);
	        return a;
	      };

	      p(a, "defineProperties", u);
	      u.value = X;
	      p(x, "propertyIsEnumerable", u);
	      u.value = y;
	      p(c, "Symbol", u);

	      u.value = function (a) {
	        a = "__\x01symbol:".concat("__\x01symbol:", a, e);
	        return a in x ? Y[a] : l(a);
	      };

	      p(y, "for", u);

	      u.value = function (a) {
	        if (ya(a)) throw new TypeError(a + " is not a symbol");
	        return Q.call(Y, a) ? a.slice(20, -e.length) : void 0;
	      };

	      p(y, "keyFor", u);

	      u.value = function (a, b) {
	        var c = h(a, b);
	        c && Z(b) && (c.enumerable = X.call(a, b));
	        return c;
	      };

	      p(a, "getOwnPropertyDescriptor", u);

	      u.value = function (a, b) {
	        return 1 === arguments.length ? k(a) : Ka(a, b);
	      };

	      p(a, "create", u);

	      u.value = function () {
	        var a = Bb.call(this);
	        return "[object String]" === a && Z(this) ? "[object Symbol]" : a;
	      };

	      p(x, "toString", u);

	      try {
	        var aa = k(p({}, "__\x01symbol:", {
	          get: function get() {
	            return p(this, "__\x01symbol:", {
	              value: !1
	            })["__\x01symbol:"];
	          }
	        }))["__\x01symbol:"] || p;
	      } catch (Na) {
	        aa = function aa(a, b, c) {
	          var d = h(x, b);
	          delete x[b];
	          p(a, b, c);
	          p(x, b, d);
	        };
	      }
	    }
	  })(Object, "getOwnPropertySymbols");

	  (function (a) {
	    var b = a.defineProperty,
	        c = a.prototype,
	        d = c.toString,
	        e;
	    "iterator match replace search split hasInstance isConcatSpreadable unscopables species toPrimitive toStringTag".split(" ").forEach(function (f) {
	      if (!(f in Symbol)) switch (b(Symbol, f, {
	        value: Symbol(f)
	      }), f) {
	        case "toStringTag":
	          e = a.getOwnPropertyDescriptor(c, "toString"), e.value = function () {
	            var a = d.call(this),
	                b = this[Symbol.toStringTag];
	            return "undefined" === typeof b ? a : "[object " + b + "]";
	          }, b(c, "toString", e);
	      }
	    });
	  })(Object, Symbol);

	  (function (a, b, c) {
	    function d() {
	      return this;
	    }

	    b[a] || (b[a] = function () {
	      var b = 0,
	          c = this,
	          g = {
	        next: function next() {
	          var a = c.length <= b;
	          return a ? {
	            done: a
	          } : {
	            done: a,
	            value: c[b++]
	          };
	        }
	      };
	      g[a] = d;
	      return g;
	    });
	    c[a] || (c[a] = function () {
	      var b = String.fromCodePoint,
	          c = this,
	          g = 0,
	          h = c.length,
	          k = {
	        next: function next() {
	          var a = h <= g,
	              d = a ? "" : b(c.codePointAt(g));
	          g += d.length;
	          return a ? {
	            done: a
	          } : {
	            done: a,
	            value: d
	          };
	        }
	      };
	      k[a] = d;
	      return k;
	    });
	  })(Symbol.iterator, Array.prototype, String.prototype);

	  var Va = Object.prototype.toString;

	  Object.prototype.toString = function () {
	    return void 0 === this ? "[object Undefined]" : null === this ? "[object Null]" : Va.call(this);
	  };

	  Object.keys = function (a) {
	    return Object.getOwnPropertyNames(a).filter(function (b) {
	      return (b = Object.getOwnPropertyDescriptor(a, b)) && b.enumerable;
	    });
	  };

	  var Wa = window.Symbol.iterator;
	  String.prototype[Wa] && String.prototype.codePointAt || (String.prototype[Wa] = function Xa() {
	    var b,
	        c = this;
	    return Aa(Xa, function (d) {
	      1 == d.a && (b = 0);
	      if (3 != d.a) return b < c.length ? d = sa(d, c[b]) : (d.a = 0, d = void 0), d;
	      b++;
	      d.a = 2;
	    });
	  });
	  Set.prototype[Wa] || (Set.prototype[Wa] = function Ya() {
	    var b,
	        c = this,
	        d;
	    return Aa(Ya, function (e) {
	      1 == e.a && (b = [], c.forEach(function (c) {
	        b.push(c);
	      }), d = 0);
	      if (3 != e.a) return d < b.length ? e = sa(e, b[d]) : (e.a = 0, e = void 0), e;
	      d++;
	      e.a = 2;
	    });
	  });
	  Map.prototype[Wa] || (Map.prototype[Wa] = function Za() {
	    var b,
	        c = this,
	        d;
	    return Aa(Za, function (e) {
	      1 == e.a && (b = [], c.forEach(function (c, d) {
	        b.push([d, c]);
	      }), d = 0);
	      if (3 != e.a) return d < b.length ? e = sa(e, b[d]) : (e.a = 0, e = void 0), e;
	      d++;
	      e.a = 2;
	    });
	  });
	  window.WebComponents = window.WebComponents || {
	    flags: {}
	  };
	  var $a = document.querySelector('script[src*="webcomponents-bundle"]'),
	      ab = /wc-(.+)/,
	      w = {};

	  if (!w.noOpts) {
	    location.search.slice(1).split("&").forEach(function (a) {
	      a = a.split("=");
	      var b;
	      a[0] && (b = a[0].match(ab)) && (w[b[1]] = a[1] || !0);
	    });
	    if ($a) for (var bb = 0, cb = void 0; cb = $a.attributes[bb]; bb++) {
	      "src" !== cb.name && (w[cb.name] = cb.value || !0);
	    }

	    if (w.log && w.log.split) {
	      var db = w.log.split(",");
	      w.log = {};
	      db.forEach(function (a) {
	        w.log[a] = !0;
	      });
	    } else w.log = {};
	  }

	  window.WebComponents.flags = w;
	  var eb = w.shadydom;
	  eb && (window.ShadyDOM = window.ShadyDOM || {}, window.ShadyDOM.force = eb);
	  var fb = w.register || w.ce;
	  fb && window.customElements && (window.customElements.forcePolyfill = fb);

	  function gb() {
	    this.va = this.root = null;
	    this.ba = !1;
	    this.N = this.Z = this.ka = this.assignedSlot = this.assignedNodes = this.R = null;
	    this.childNodes = this.nextSibling = this.previousSibling = this.lastChild = this.firstChild = this.parentNode = this.U = void 0;
	    this.qa = this.ra = !1;
	    this.Y = {};
	  }

	  gb.prototype.toJSON = function () {
	    return {};
	  };

	  function z(a) {
	    a.__shady || (a.__shady = new gb());
	    return a.__shady;
	  }

	  function A(a) {
	    return a && a.__shady;
	  }
	  var B = window.ShadyDOM || {};
	  B.La = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);
	  var hb = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");
	  B.D = !!(hb && hb.configurable && hb.get);
	  B.ma = B.force || !B.La;
	  B.T = B.noPatch || !1;
	  B.ua = B.preferPerformance;

	  function ib(a) {
	    return (a = A(a)) && void 0 !== a.firstChild;
	  }

	  function C(a) {
	    return "ShadyRoot" === a.Da;
	  }

	  function jb(a) {
	    return (a = (a = A(a)) && a.root) && kb(a);
	  }

	  var lb = Element.prototype,
	      mb = lb.matches || lb.matchesSelector || lb.mozMatchesSelector || lb.msMatchesSelector || lb.oMatchesSelector || lb.webkitMatchesSelector,
	      nb = document.createTextNode(""),
	      ob = 0,
	      pb = [];
	  new MutationObserver(function () {
	    for (; pb.length;) {
	      try {
	        pb.shift()();
	      } catch (a) {
	        throw nb.textContent = ob++, a;
	      }
	    }
	  }).observe(nb, {
	    characterData: !0
	  });

	  function qb(a) {
	    pb.push(a);
	    nb.textContent = ob++;
	  }

	  var rb = !!document.contains;

	  function sb(a, b) {
	    for (; b;) {
	      if (b == a) return !0;
	      b = b.__shady_parentNode;
	    }

	    return !1;
	  }

	  function tb(a) {
	    for (var b = a.length - 1; 0 <= b; b--) {
	      var c = a[b],
	          d = c.getAttribute("id") || c.getAttribute("name");
	      d && "length" !== d && isNaN(d) && (a[d] = c);
	    }

	    a.item = function (b) {
	      return a[b];
	    };

	    a.namedItem = function (b) {
	      if ("length" !== b && isNaN(b) && a[b]) return a[b];

	      for (var c = ia(a), d = c.next(); !d.done; d = c.next()) {
	        if (d = d.value, (d.getAttribute("id") || d.getAttribute("name")) == b) return d;
	      }

	      return null;
	    };

	    return a;
	  }

	  function D(a, b, c, d) {
	    c = void 0 === c ? "" : c;

	    for (var e in b) {
	      var f = b[e];

	      if (!(d && 0 <= d.indexOf(e))) {
	        f.configurable = !0;
	        var g = c + e;
	        if (f.value) a[g] = f.value;else try {
	          Object.defineProperty(a, g, f);
	        } catch (h) {}
	      }
	    }
	  }

	  function E(a) {
	    var b = {};
	    Object.getOwnPropertyNames(a).forEach(function (c) {
	      b[c] = Object.getOwnPropertyDescriptor(a, c);
	    });
	    return b;
	  }
	  var ub = [],
	      vb;

	  function wb(a) {
	    vb || (vb = !0, qb(xb));
	    ub.push(a);
	  }

	  function xb() {
	    vb = !1;

	    for (var a = !!ub.length; ub.length;) {
	      ub.shift()();
	    }

	    return a;
	  }

	  xb.list = ub;

	  function yb() {
	    this.a = !1;
	    this.addedNodes = [];
	    this.removedNodes = [];
	    this.aa = new Set();
	  }

	  function zb(a) {
	    a.a || (a.a = !0, qb(function () {
	      a.flush();
	    }));
	  }

	  yb.prototype.flush = function () {
	    if (this.a) {
	      this.a = !1;
	      var a = this.takeRecords();
	      a.length && this.aa.forEach(function (b) {
	        b(a);
	      });
	    }
	  };

	  yb.prototype.takeRecords = function () {
	    if (this.addedNodes.length || this.removedNodes.length) {
	      var a = [{
	        addedNodes: this.addedNodes,
	        removedNodes: this.removedNodes
	      }];
	      this.addedNodes = [];
	      this.removedNodes = [];
	      return a;
	    }

	    return [];
	  };

	  function Db(a, b) {
	    var c = z(a);
	    c.R || (c.R = new yb());
	    c.R.aa.add(b);
	    var d = c.R;
	    return {
	      Ca: b,
	      O: d,
	      Ea: a,
	      takeRecords: function takeRecords() {
	        return d.takeRecords();
	      }
	    };
	  }

	  function Eb(a) {
	    var b = a && a.O;
	    b && (b.aa.delete(a.Ca), b.aa.size || (z(a.Ea).R = null));
	  }

	  function Fb(a, b) {
	    var c = b.getRootNode();
	    return a.map(function (a) {
	      var b = c === a.target.getRootNode();

	      if (b && a.addedNodes) {
	        if (b = Array.from(a.addedNodes).filter(function (a) {
	          return c === a.getRootNode();
	        }), b.length) return a = Object.create(a), Object.defineProperty(a, "addedNodes", {
	          value: b,
	          configurable: !0
	        }), a;
	      } else if (b) return a;
	    }).filter(function (a) {
	      return a;
	    });
	  }
	  var Gb = /[&\u00A0"]/g,
	      Hb = /[&\u00A0<>]/g;

	  function Ib(a) {
	    switch (a) {
	      case "&":
	        return "&amp;";

	      case "<":
	        return "&lt;";

	      case ">":
	        return "&gt;";

	      case '"':
	        return "&quot;";

	      case "\xA0":
	        return "&nbsp;";
	    }
	  }

	  function Jb(a) {
	    for (var b = {}, c = 0; c < a.length; c++) {
	      b[a[c]] = !0;
	    }

	    return b;
	  }

	  var Kb = Jb("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
	      Lb = Jb("style script xmp iframe noembed noframes plaintext noscript".split(" "));

	  function Mb(a, b) {
	    "template" === a.localName && (a = a.content);

	    for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, g = void 0; e < f && (g = d[e]); e++) {
	      a: {
	        var h = g;
	        var k = a,
	            m = b;

	        switch (h.nodeType) {
	          case Node.ELEMENT_NODE:
	            k = h.localName;

	            for (var n = "<" + k, p = h.attributes, G = 0, u; u = p[G]; G++) {
	              n += " " + u.name + '="' + u.value.replace(Gb, Ib) + '"';
	            }

	            n += ">";
	            h = Kb[k] ? n : n + Mb(h, m) + "</" + k + ">";
	            break a;

	          case Node.TEXT_NODE:
	            h = h.data;
	            h = k && Lb[k.localName] ? h : h.replace(Hb, Ib);
	            break a;

	          case Node.COMMENT_NODE:
	            h = "\x3c!--" + h.data + "--\x3e";
	            break a;

	          default:
	            throw window.console.error(h), Error("not implemented");
	        }
	      }

	      c += h;
	    }

	    return c;
	  }
	  var Nb = B.D,
	      Ob = {
	    querySelector: function querySelector(a) {
	      return this.__shady_native_querySelector(a);
	    },
	    querySelectorAll: function querySelectorAll(a) {
	      return this.__shady_native_querySelectorAll(a);
	    }
	  },
	      Pb = {};

	  function Qb(a) {
	    Pb[a] = function (b) {
	      return b["__shady_native_" + a];
	    };
	  }

	  function Rb(a, b) {
	    D(a, b, "__shady_native_");

	    for (var c in b) {
	      Qb(c);
	    }
	  }

	  function F(a, b) {
	    b = void 0 === b ? [] : b;

	    for (var c = 0; c < b.length; c++) {
	      var d = b[c],
	          e = Object.getOwnPropertyDescriptor(a, d);
	      e && (Object.defineProperty(a, "__shady_native_" + d, e), e.value ? Ob[d] || (Ob[d] = e.value) : Qb(d));
	    }
	  }

	  var H = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
	      I = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1),
	      Sb = document.implementation.createHTMLDocument("inert");

	  function Tb(a) {
	    for (var b; b = a.__shady_native_firstChild;) {
	      a.__shady_native_removeChild(b);
	    }
	  }

	  var Ub = ["firstElementChild", "lastElementChild", "children", "childElementCount"],
	      Vb = ["querySelector", "querySelectorAll"];

	  function Wb() {
	    var a = ["dispatchEvent", "addEventListener", "removeEventListener"];
	    window.EventTarget ? F(window.EventTarget.prototype, a) : (F(Node.prototype, a), F(Window.prototype, a));
	    Nb ? F(Node.prototype, "parentNode firstChild lastChild previousSibling nextSibling childNodes parentElement textContent".split(" ")) : Rb(Node.prototype, {
	      parentNode: {
	        get: function get() {
	          H.currentNode = this;
	          return H.parentNode();
	        }
	      },
	      firstChild: {
	        get: function get() {
	          H.currentNode = this;
	          return H.firstChild();
	        }
	      },
	      lastChild: {
	        get: function get() {
	          H.currentNode = this;
	          return H.lastChild();
	        }
	      },
	      previousSibling: {
	        get: function get() {
	          H.currentNode = this;
	          return H.previousSibling();
	        }
	      },
	      nextSibling: {
	        get: function get() {
	          H.currentNode = this;
	          return H.nextSibling();
	        }
	      },
	      childNodes: {
	        get: function get() {
	          var a = [];
	          H.currentNode = this;

	          for (var c = H.firstChild(); c;) {
	            a.push(c), c = H.nextSibling();
	          }

	          return a;
	        }
	      },
	      parentElement: {
	        get: function get() {
	          I.currentNode = this;
	          return I.parentNode();
	        }
	      },
	      textContent: {
	        get: function get() {
	          switch (this.nodeType) {
	            case Node.ELEMENT_NODE:
	            case Node.DOCUMENT_FRAGMENT_NODE:
	              for (var a = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, !1), c = "", d; d = a.nextNode();) {
	                c += d.nodeValue;
	              }

	              return c;

	            default:
	              return this.nodeValue;
	          }
	        },
	        set: function set(a) {
	          if ("undefined" === typeof a || null === a) a = "";

	          switch (this.nodeType) {
	            case Node.ELEMENT_NODE:
	            case Node.DOCUMENT_FRAGMENT_NODE:
	              Tb(this);
	              (0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_native_insertBefore(document.createTextNode(a), void 0);
	              break;

	            default:
	              this.nodeValue = a;
	          }
	        }
	      }
	    });
	    F(Node.prototype, "appendChild insertBefore removeChild replaceChild cloneNode contains".split(" "));
	    a = {
	      firstElementChild: {
	        get: function get() {
	          I.currentNode = this;
	          return I.firstChild();
	        }
	      },
	      lastElementChild: {
	        get: function get() {
	          I.currentNode = this;
	          return I.lastChild();
	        }
	      },
	      children: {
	        get: function get() {
	          var a = [];
	          I.currentNode = this;

	          for (var c = I.firstChild(); c;) {
	            a.push(c), c = I.nextSibling();
	          }

	          return tb(a);
	        }
	      },
	      childElementCount: {
	        get: function get() {
	          return this.children ? this.children.length : 0;
	        }
	      }
	    };
	    Nb ? (F(Element.prototype, Ub), F(Element.prototype, ["previousElementSibling", "nextElementSibling", "innerHTML"]), Object.getOwnPropertyDescriptor(HTMLElement.prototype, "children") && F(HTMLElement.prototype, ["children"]), Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML") && F(HTMLElement.prototype, ["innerHTML"])) : (Rb(Element.prototype, a), Rb(Element.prototype, {
	      previousElementSibling: {
	        get: function get() {
	          I.currentNode = this;
	          return I.previousSibling();
	        }
	      },
	      nextElementSibling: {
	        get: function get() {
	          I.currentNode = this;
	          return I.nextSibling();
	        }
	      },
	      innerHTML: {
	        get: function get() {
	          return Mb(this, function (a) {
	            return a.__shady_native_childNodes;
	          });
	        },
	        set: function set(a) {
	          var b = "template" === this.localName ? this.content : this;
	          Tb(b);
	          var d = this.localName || "div";
	          d = this.namespaceURI && this.namespaceURI !== Sb.namespaceURI ? Sb.createElementNS(this.namespaceURI, d) : Sb.createElement(d);
	          d.innerHTML = a;

	          for (a = "template" === this.localName ? d.content : d; d = a.__shady_native_firstChild;) {
	            b.__shady_native_insertBefore(d, void 0);
	          }
	        }
	      }
	    }));
	    F(Element.prototype, "setAttribute getAttribute hasAttribute removeAttribute focus blur".split(" "));
	    F(Element.prototype, Vb);
	    F(HTMLElement.prototype, ["focus", "blur", "contains"]);
	    Nb && F(HTMLElement.prototype, ["parentElement", "children", "innerHTML"]);
	    window.HTMLTemplateElement && F(window.HTMLTemplateElement.prototype, ["innerHTML"]);
	    Nb ? F(DocumentFragment.prototype, Ub) : Rb(DocumentFragment.prototype, a);
	    F(DocumentFragment.prototype, Vb);
	    Nb ? (F(Document.prototype, Ub), F(Document.prototype, ["activeElement"])) : Rb(Document.prototype, a);
	    F(Document.prototype, ["importNode", "getElementById"]);
	    F(Document.prototype, Vb);
	  }
	  var Xb = E({
	    get childNodes() {
	      return this.__shady_childNodes;
	    },

	    get firstChild() {
	      return this.__shady_firstChild;
	    },

	    get lastChild() {
	      return this.__shady_lastChild;
	    },

	    get textContent() {
	      return this.__shady_textContent;
	    },

	    set textContent(a) {
	      this.__shady_textContent = a;
	    },

	    get childElementCount() {
	      return this.__shady_childElementCount;
	    },

	    get children() {
	      return this.__shady_children;
	    },

	    get firstElementChild() {
	      return this.__shady_firstElementChild;
	    },

	    get lastElementChild() {
	      return this.__shady_lastElementChild;
	    },

	    get innerHTML() {
	      return this.__shady_innerHTML;
	    },

	    set innerHTML(a) {
	      return this.__shady_innerHTML = a;
	    },

	    get shadowRoot() {
	      return this.__shady_shadowRoot;
	    }

	  }),
	      Yb = E({
	    get parentElement() {
	      return this.__shady_parentElement;
	    },

	    get parentNode() {
	      return this.__shady_parentNode;
	    },

	    get nextSibling() {
	      return this.__shady_nextSibling;
	    },

	    get previousSibling() {
	      return this.__shady_previousSibling;
	    },

	    get nextElementSibling() {
	      return this.__shady_nextElementSibling;
	    },

	    get previousElementSibling() {
	      return this.__shady_previousElementSibling;
	    },

	    get className() {
	      return this.__shady_className;
	    },

	    set className(a) {
	      return this.__shady_className = a;
	    }

	  }),
	      Zb;

	  for (Zb in Xb) {
	    Xb[Zb].enumerable = !1;
	  }

	  for (var $b in Yb) {
	    Yb[$b].enumerable = !1;
	  }

	  var ac = B.D || B.T,
	      bc = ac ? function () {} : function (a) {
	    var b = z(a);
	    b.ra || (b.ra = !0, D(a, Yb));
	  },
	      cc = ac ? function () {} : function (a) {
	    var b = z(a);
	    b.qa || (b.qa = !0, D(a, Xb));
	  };

	  var dc = "__eventWrappers" + Date.now(),
	      ec = function () {
	    var a = Object.getOwnPropertyDescriptor(Event.prototype, "composed");
	    return a ? function (b) {
	      return a.get.call(b);
	    } : null;
	  }(),
	      fc = {
	    blur: !0,
	    focus: !0,
	    focusin: !0,
	    focusout: !0,
	    click: !0,
	    dblclick: !0,
	    mousedown: !0,
	    mouseenter: !0,
	    mouseleave: !0,
	    mousemove: !0,
	    mouseout: !0,
	    mouseover: !0,
	    mouseup: !0,
	    wheel: !0,
	    beforeinput: !0,
	    input: !0,
	    keydown: !0,
	    keyup: !0,
	    compositionstart: !0,
	    compositionupdate: !0,
	    compositionend: !0,
	    touchstart: !0,
	    touchend: !0,
	    touchmove: !0,
	    touchcancel: !0,
	    pointerover: !0,
	    pointerenter: !0,
	    pointerdown: !0,
	    pointermove: !0,
	    pointerup: !0,
	    pointercancel: !0,
	    pointerout: !0,
	    pointerleave: !0,
	    gotpointercapture: !0,
	    lostpointercapture: !0,
	    dragstart: !0,
	    drag: !0,
	    dragenter: !0,
	    dragleave: !0,
	    dragover: !0,
	    drop: !0,
	    dragend: !0,
	    DOMActivate: !0,
	    DOMFocusIn: !0,
	    DOMFocusOut: !0,
	    keypress: !0
	  },
	      gc = {
	    DOMAttrModified: !0,
	    DOMAttributeNameChanged: !0,
	    DOMCharacterDataModified: !0,
	    DOMElementNameChanged: !0,
	    DOMNodeInserted: !0,
	    DOMNodeInsertedIntoDocument: !0,
	    DOMNodeRemoved: !0,
	    DOMNodeRemovedFromDocument: !0,
	    DOMSubtreeModified: !0
	  };

	  function hc(a) {
	    return a instanceof Node ? a.__shady_getRootNode() : a;
	  }

	  function ic(a, b) {
	    var c = [],
	        d = a;

	    for (a = hc(a); d;) {
	      c.push(d), d.__shady_assignedSlot ? d = d.__shady_assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d = d.host : d = d.__shady_parentNode;
	    }

	    c[c.length - 1] === document && c.push(window);
	    return c;
	  }

	  function jc(a) {
	    a.__composedPath || (a.__composedPath = ic(a.target, !0));
	    return a.__composedPath;
	  }

	  function kc(a, b) {
	    if (!C) return a;
	    a = ic(a, !0);

	    for (var c = 0, d, e = void 0, f, g = void 0; c < b.length; c++) {
	      if (d = b[c], f = hc(d), f !== e && (g = a.indexOf(f), e = f), !C(f) || -1 < g) return d;
	    }
	  }

	  function lc(a) {
	    function b(b, d) {
	      b = new a(b, d);
	      b.__composed = d && !!d.composed;
	      return b;
	    }

	    b.__proto__ = a;
	    b.prototype = a.prototype;
	    return b;
	  }

	  var mc = {
	    focus: !0,
	    blur: !0
	  };

	  function nc(a) {
	    return a.__target !== a.target || a.__relatedTarget !== a.relatedTarget;
	  }

	  function oc(a, b, c) {
	    if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]) for (var d = 0, e; (e = c[d]) && (!nc(a) || a.target !== a.relatedTarget) && (e.call(b, a), !a.__immediatePropagationStopped); d++) {
	    }
	  }

	  function pc(a) {
	    var b = a.composedPath();
	    Object.defineProperty(a, "currentTarget", {
	      get: function get() {
	        return d;
	      },
	      configurable: !0
	    });

	    for (var c = b.length - 1; 0 <= c; c--) {
	      var d = b[c];
	      oc(a, d, "capture");
	      if (a.ha) return;
	    }

	    Object.defineProperty(a, "eventPhase", {
	      get: function get() {
	        return Event.AT_TARGET;
	      }
	    });
	    var e;

	    for (c = 0; c < b.length; c++) {
	      d = b[c];
	      var f = A(d);
	      f = f && f.root;
	      if (0 === c || f && f === e) if (oc(a, d, "bubble"), d !== window && (e = d.__shady_getRootNode()), a.ha) break;
	    }
	  }

	  function qc(a, b, c, d, e, f) {
	    for (var g = 0; g < a.length; g++) {
	      var h = a[g],
	          k = h.type,
	          m = h.capture,
	          n = h.once,
	          p = h.passive;
	      if (b === h.node && c === k && d === m && e === n && f === p) return g;
	    }

	    return -1;
	  }

	  function rc(a, b, c) {
	    if (b) {
	      var d = typeof b;
	      if ("function" === d || "object" === d) if ("object" !== d || b.handleEvent && "function" === typeof b.handleEvent) {
	        if (gc[a]) return this.__shady_native_addEventListener(a, b, c);

	        if (c && "object" === typeof c) {
	          var e = !!c.capture;
	          var f = !!c.once;
	          var g = !!c.passive;
	        } else e = !!c, g = f = !1;

	        var h = c && c.ia || this,
	            k = b[dc];

	        if (k) {
	          if (-1 < qc(k, h, a, e, f, g)) return;
	        } else b[dc] = [];

	        k = function k(e) {
	          f && this.__shady_removeEventListener(a, b, c);
	          e.__target || sc(e);

	          if (h !== this) {
	            var g = Object.getOwnPropertyDescriptor(e, "currentTarget");
	            Object.defineProperty(e, "currentTarget", {
	              get: function get() {
	                return h;
	              },
	              configurable: !0
	            });
	          }

	          e.__previousCurrentTarget = e.currentTarget;
	          if (!C(h) || -1 != e.composedPath().indexOf(h)) if (e.composed || -1 < e.composedPath().indexOf(h)) if (nc(e) && e.target === e.relatedTarget) e.eventPhase === Event.BUBBLING_PHASE && e.stopImmediatePropagation();else if (e.eventPhase === Event.CAPTURING_PHASE || e.bubbles || e.target === h || h instanceof Window) {
	            var k = "function" === d ? b.call(h, e) : b.handleEvent && b.handleEvent(e);
	            h !== this && (g ? (Object.defineProperty(e, "currentTarget", g), g = null) : delete e.currentTarget);
	            return k;
	          }
	        };

	        b[dc].push({
	          node: h,
	          type: a,
	          capture: e,
	          once: f,
	          passive: g,
	          $a: k
	        });
	        mc[a] ? (this.__handlers = this.__handlers || {}, this.__handlers[a] = this.__handlers[a] || {
	          capture: [],
	          bubble: []
	        }, this.__handlers[a][e ? "capture" : "bubble"].push(k)) : this.__shady_native_addEventListener(a, k, c);
	      }
	    }
	  }

	  function tc(a, b, c) {
	    if (b) {
	      if (gc[a]) return this.__shady_native_removeEventListener(a, b, c);

	      if (c && "object" === typeof c) {
	        var d = !!c.capture;
	        var e = !!c.once;
	        var f = !!c.passive;
	      } else d = !!c, f = e = !1;

	      var g = c && c.ia || this,
	          h = void 0;
	      var k = null;

	      try {
	        k = b[dc];
	      } catch (m) {}

	      k && (e = qc(k, g, a, d, e, f), -1 < e && (h = k.splice(e, 1)[0].$a, k.length || (b[dc] = void 0)));

	      this.__shady_native_removeEventListener(a, h || b, c);

	      h && mc[a] && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][d ? "capture" : "bubble"], h = a.indexOf(h), -1 < h && a.splice(h, 1));
	    }
	  }

	  function uc() {
	    for (var a in mc) {
	      window.__shady_native_addEventListener(a, function (a) {
	        a.__target || (sc(a), pc(a));
	      }, !0);
	    }
	  }

	  var vc = E({
	    get composed() {
	      void 0 === this.__composed && (ec ? this.__composed = "focusin" === this.type || "focusout" === this.type || ec(this) : !1 !== this.isTrusted && (this.__composed = fc[this.type]));
	      return this.__composed || !1;
	    },

	    composedPath: function composedPath() {
	      this.__composedPath || (this.__composedPath = ic(this.__target, this.composed));
	      return this.__composedPath;
	    },

	    get target() {
	      return kc(this.currentTarget || this.__previousCurrentTarget, this.composedPath());
	    },

	    get relatedTarget() {
	      if (!this.__relatedTarget) return null;
	      this.__relatedTargetComposedPath || (this.__relatedTargetComposedPath = ic(this.__relatedTarget, !0));
	      return kc(this.currentTarget || this.__previousCurrentTarget, this.__relatedTargetComposedPath);
	    },

	    stopPropagation: function stopPropagation() {
	      Event.prototype.stopPropagation.call(this);
	      this.ha = !0;
	    },
	    stopImmediatePropagation: function stopImmediatePropagation() {
	      Event.prototype.stopImmediatePropagation.call(this);
	      this.ha = this.__immediatePropagationStopped = !0;
	    }
	  });

	  function sc(a) {
	    a.__target = a.target;
	    a.__relatedTarget = a.relatedTarget;

	    if (B.D) {
	      var b = Object.getPrototypeOf(a);

	      if (!Object.hasOwnProperty(b, "__shady_patchedProto")) {
	        var c = Object.create(b);
	        c.__shady_sourceProto = b;
	        D(c, vc);
	        b.__shady_patchedProto = c;
	      }

	      a.__proto__ = b.__shady_patchedProto;
	    } else D(a, vc);
	  }

	  var wc = lc(Event),
	      xc = lc(CustomEvent),
	      yc = lc(MouseEvent);

	  function zc() {
	    if (!ec && Object.getOwnPropertyDescriptor(Event.prototype, "isTrusted")) {
	      var a = function a() {
	        var a = new MouseEvent("click", {
	          bubbles: !0,
	          cancelable: !0,
	          composed: !0
	        });

	        this.__shady_dispatchEvent(a);
	      };

	      Element.prototype.click ? Element.prototype.click = a : HTMLElement.prototype.click && (HTMLElement.prototype.click = a);
	    }
	  }

	  var Ac = Object.getOwnPropertyNames(Document.prototype).filter(function (a) {
	    return "on" === a.substring(0, 2);
	  });

	  function Bc(a, b) {
	    return {
	      index: a,
	      V: [],
	      $: b
	    };
	  }

	  function Cc(a, b, c, d) {
	    var e = 0,
	        f = 0,
	        g = 0,
	        h = 0,
	        k = Math.min(b - e, d - f);
	    if (0 == e && 0 == f) a: {
	      for (g = 0; g < k; g++) {
	        if (a[g] !== c[g]) break a;
	      }

	      g = k;
	    }

	    if (b == a.length && d == c.length) {
	      h = a.length;

	      for (var m = c.length, n = 0; n < k - g && Dc(a[--h], c[--m]);) {
	        n++;
	      }

	      h = n;
	    }

	    e += g;
	    f += g;
	    b -= h;
	    d -= h;
	    if (0 == b - e && 0 == d - f) return [];

	    if (e == b) {
	      for (b = Bc(e, 0); f < d;) {
	        b.V.push(c[f++]);
	      }

	      return [b];
	    }

	    if (f == d) return [Bc(e, b - e)];
	    k = e;
	    g = f;
	    d = d - g + 1;
	    h = b - k + 1;
	    b = Array(d);

	    for (m = 0; m < d; m++) {
	      b[m] = Array(h), b[m][0] = m;
	    }

	    for (m = 0; m < h; m++) {
	      b[0][m] = m;
	    }

	    for (m = 1; m < d; m++) {
	      for (n = 1; n < h; n++) {
	        if (a[k + n - 1] === c[g + m - 1]) b[m][n] = b[m - 1][n - 1];else {
	          var p = b[m - 1][n] + 1,
	              G = b[m][n - 1] + 1;
	          b[m][n] = p < G ? p : G;
	        }
	      }
	    }

	    k = b.length - 1;
	    g = b[0].length - 1;
	    d = b[k][g];

	    for (a = []; 0 < k || 0 < g;) {
	      0 == k ? (a.push(2), g--) : 0 == g ? (a.push(3), k--) : (h = b[k - 1][g - 1], m = b[k - 1][g], n = b[k][g - 1], p = m < n ? m < h ? m : h : n < h ? n : h, p == h ? (h == d ? a.push(0) : (a.push(1), d = h), k--, g--) : p == m ? (a.push(3), k--, d = m) : (a.push(2), g--, d = n));
	    }

	    a.reverse();
	    b = void 0;
	    k = [];

	    for (g = 0; g < a.length; g++) {
	      switch (a[g]) {
	        case 0:
	          b && (k.push(b), b = void 0);
	          e++;
	          f++;
	          break;

	        case 1:
	          b || (b = Bc(e, 0));
	          b.$++;
	          e++;
	          b.V.push(c[f]);
	          f++;
	          break;

	        case 2:
	          b || (b = Bc(e, 0));
	          b.$++;
	          e++;
	          break;

	        case 3:
	          b || (b = Bc(e, 0)), b.V.push(c[f]), f++;
	      }
	    }

	    b && k.push(b);
	    return k;
	  }

	  function Dc(a, b) {
	    return a === b;
	  }

	  function Ec(a, b, c) {
	    bc(a);
	    c = c || null;
	    var d = z(a),
	        e = z(b),
	        f = c ? z(c) : null;
	    d.previousSibling = c ? f.previousSibling : b.__shady_lastChild;
	    if (f = A(d.previousSibling)) f.nextSibling = a;
	    if (f = A(d.nextSibling = c)) f.previousSibling = a;
	    d.parentNode = b;
	    c ? c === e.firstChild && (e.firstChild = a) : (e.lastChild = a, e.firstChild || (e.firstChild = a));
	    e.childNodes = null;
	  }

	  function Fc(a, b, c) {
	    cc(b);
	    var d = z(b);
	    void 0 !== d.firstChild && (d.childNodes = null);

	    if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
	      d = a.__shady_childNodes;

	      for (var e = 0; e < d.length; e++) {
	        Ec(d[e], b, c);
	      }

	      a = z(a);
	      b = void 0 !== a.firstChild ? null : void 0;
	      a.firstChild = a.lastChild = b;
	      a.childNodes = b;
	    } else Ec(a, b, c);
	  }

	  function Gc(a, b) {
	    var c = z(a);
	    b = z(b);
	    a === b.firstChild && (b.firstChild = c.nextSibling);
	    a === b.lastChild && (b.lastChild = c.previousSibling);
	    a = c.previousSibling;
	    var d = c.nextSibling;
	    a && (z(a).nextSibling = d);
	    d && (z(d).previousSibling = a);
	    c.parentNode = c.previousSibling = c.nextSibling = void 0;
	    void 0 !== b.childNodes && (b.childNodes = null);
	  }

	  function Hc(a) {
	    var b = z(a);

	    if (void 0 === b.firstChild) {
	      b.childNodes = null;
	      var c = b.firstChild = a.__shady_native_firstChild || null;
	      b.lastChild = a.__shady_native_lastChild || null;
	      cc(a);
	      b = c;

	      for (c = void 0; b; b = b.__shady_native_nextSibling) {
	        var d = z(b);
	        d.parentNode = a;
	        d.nextSibling = b.__shady_native_nextSibling || null;
	        d.previousSibling = c || null;
	        c = b;
	        bc(b);
	      }
	    }
	  }
	  var Ic = null;

	  function Jc() {
	    Ic || (Ic = window.ShadyCSS && window.ShadyCSS.ScopingShim);
	    return Ic || null;
	  }

	  function Kc(a, b) {
	    var c = Jc();
	    c && c.unscopeNode(a, b);
	  }

	  function Lc(a, b) {
	    var c = Jc();
	    if (!c) return !0;

	    if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
	      c = !0;
	      a = a.__shady_childNodes;

	      for (var d = 0; c && d < a.length; d++) {
	        c = c && Lc(a[d], b);
	      }

	      return c;
	    }

	    return a.nodeType !== Node.ELEMENT_NODE ? !0 : c.currentScopeForNode(a) === b;
	  }

	  function Mc(a) {
	    if (a.nodeType !== Node.ELEMENT_NODE) return "";
	    var b = Jc();
	    return b ? b.currentScopeForNode(a) : "";
	  }

	  function Nc(a, b) {
	    if (a) {
	      a.nodeType === Node.ELEMENT_NODE && b(a);
	      a = a.__shady_childNodes;

	      for (var c = 0, d; c < a.length; c++) {
	        d = a[c], d.nodeType === Node.ELEMENT_NODE && Nc(d, b);
	      }
	    }
	  }
	  var Oc = window.document,
	      Pc = B.ua,
	      Qc = Object.getOwnPropertyDescriptor(Node.prototype, "isConnected"),
	      Rc = Qc && Qc.get;

	  function Sc(a) {
	    for (var b; b = a.__shady_firstChild;) {
	      a.__shady_removeChild(b);
	    }
	  }

	  function Tc(a) {
	    var b = A(a);

	    if (b && void 0 !== b.U) {
	      b = a.__shady_childNodes;

	      for (var c = 0, d = b.length, e = void 0; c < d && (e = b[c]); c++) {
	        Tc(e);
	      }
	    }

	    if (a = A(a)) a.U = void 0;
	  }

	  function Uc(a) {
	    var b = a;
	    a && "slot" === a.localName && (b = (b = (b = A(a)) && b.N) && b.length ? b[0] : Uc(a.__shady_nextSibling));
	    return b;
	  }

	  function Vc(a, b, c) {
	    if (a = (a = A(a)) && a.R) b && a.addedNodes.push(b), c && a.removedNodes.push(c), zb(a);
	  }

	  var Zc = E({
	    get parentNode() {
	      var a = A(this);
	      a = a && a.parentNode;
	      return void 0 !== a ? a : this.__shady_native_parentNode;
	    },

	    get firstChild() {
	      var a = A(this);
	      a = a && a.firstChild;
	      return void 0 !== a ? a : this.__shady_native_firstChild;
	    },

	    get lastChild() {
	      var a = A(this);
	      a = a && a.lastChild;
	      return void 0 !== a ? a : this.__shady_native_lastChild;
	    },

	    get nextSibling() {
	      var a = A(this);
	      a = a && a.nextSibling;
	      return void 0 !== a ? a : this.__shady_native_nextSibling;
	    },

	    get previousSibling() {
	      var a = A(this);
	      a = a && a.previousSibling;
	      return void 0 !== a ? a : this.__shady_native_previousSibling;
	    },

	    get childNodes() {
	      if (ib(this)) {
	        var a = A(this);

	        if (!a.childNodes) {
	          a.childNodes = [];

	          for (var b = this.__shady_firstChild; b; b = b.__shady_nextSibling) {
	            a.childNodes.push(b);
	          }
	        }

	        var c = a.childNodes;
	      } else c = this.__shady_native_childNodes;

	      c.item = function (a) {
	        return c[a];
	      };

	      return c;
	    },

	    get parentElement() {
	      var a = A(this);
	      (a = a && a.parentNode) && a.nodeType !== Node.ELEMENT_NODE && (a = null);
	      return void 0 !== a ? a : this.__shady_native_parentElement;
	    },

	    get isConnected() {
	      if (Rc && Rc.call(this)) return !0;
	      if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return !1;
	      var a = this.ownerDocument;

	      if (rb) {
	        if (a.__shady_native_contains(this)) return !0;
	      } else if (a.documentElement && a.documentElement.__shady_native_contains(this)) return !0;

	      for (a = this; a && !(a instanceof Document);) {
	        a = a.__shady_parentNode || (C(a) ? a.host : void 0);
	      }

	      return !!(a && a instanceof Document);
	    },

	    get textContent() {
	      if (ib(this)) {
	        for (var a = [], b = 0, c = this.__shady_childNodes, d; d = c[b]; b++) {
	          d.nodeType !== Node.COMMENT_NODE && a.push(d.__shady_textContent);
	        }

	        return a.join("");
	      }

	      return this.__shady_native_textContent;
	    },

	    set textContent(a) {
	      if ("undefined" === typeof a || null === a) a = "";

	      switch (this.nodeType) {
	        case Node.ELEMENT_NODE:
	        case Node.DOCUMENT_FRAGMENT_NODE:
	          if (!ib(this) && B.D) {
	            var b = this.__shady_firstChild;
	            (b != this.__shady_lastChild || b && b.nodeType != Node.TEXT_NODE) && Sc(this);
	            this.__shady_native_textContent = a;
	          } else Sc(this), (0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_insertBefore(document.createTextNode(a));

	          break;

	        default:
	          this.nodeValue = a;
	      }
	    },

	    insertBefore: function insertBefore(a, b) {
	      if (this.ownerDocument !== Oc && a.ownerDocument !== Oc) return this.__shady_native_insertBefore(a, b), a;
	      if (a === this) throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");

	      if (b) {
	        var c = A(b);
	        c = c && c.parentNode;
	        if (void 0 !== c && c !== this || void 0 === c && b.__shady_native_parentNode !== this) throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
	      }

	      if (b === a) return a;
	      var d = [],
	          e = (c = Wc(this)) ? c.host.localName : Mc(this),
	          f = a.__shady_parentNode;

	      if (f) {
	        var g = Mc(a);

	        f.__shady_removeChild(a, !!c || !Wc(a));
	      }

	      f = !0;
	      var h = (!Pc || void 0 === a.__noInsertionPoint) && !Lc(a, e),
	          k = c && !a.__noInsertionPoint && (!Pc || a.nodeType === Node.DOCUMENT_FRAGMENT_NODE);
	      if (k || h) h && (g = g || Mc(a)), Nc(a, function (a) {
	        k && "slot" === a.localName && d.push(a);

	        if (h) {
	          var b = g;
	          Jc() && (b && Kc(a, b), (b = Jc()) && b.scopeNode(a, e));
	        }
	      });
	      if ("slot" === this.localName || d.length) d.length && (c.c = c.c || [], c.a = c.a || [], c.b = c.b || {}, c.c.push.apply(c.c, d instanceof Array ? d : ja(ia(d)))), c && Xc(c);
	      ib(this) && (Fc(a, this, b), c = A(this), jb(this) ? (Xc(c.root), f = !1) : c.root && (f = !1));
	      f ? (c = C(this) ? this.host : this, b ? (b = Uc(b), c.__shady_native_insertBefore(a, b)) : c.__shady_native_appendChild(a)) : a.ownerDocument !== this.ownerDocument && this.ownerDocument.adoptNode(a);
	      Vc(this, a);
	      return a;
	    },
	    appendChild: function appendChild(a) {
	      return this.__shady_insertBefore(a);
	    },
	    removeChild: function removeChild(a, b) {
	      b = void 0 === b ? !1 : b;
	      if (this.ownerDocument !== Oc) return this.__shady_native_removeChild(a);
	      if (a.__shady_parentNode !== this) throw Error("The node to be removed is not a child of this node: " + a);
	      var c = Wc(a),
	          d = c && Yc(c, a),
	          e = A(this);

	      if (ib(this) && (Gc(a, this), jb(this))) {
	        Xc(e.root);
	        var f = !0;
	      }

	      if (Jc() && !b && c) {
	        var g = Mc(a);
	        Nc(a, function (a) {
	          Kc(a, g);
	        });
	      }

	      Tc(a);
	      c && ((b = this && "slot" === this.localName) && (f = !0), (d || b) && Xc(c));
	      f || (f = C(this) ? this.host : this, (!e.root && "slot" !== a.localName || f === a.__shady_native_parentNode) && f.__shady_native_removeChild(a));
	      Vc(this, null, a);
	      return a;
	    },
	    replaceChild: function replaceChild(a, b) {
	      this.__shady_insertBefore(a, b);

	      this.__shady_removeChild(b);

	      return a;
	    },
	    cloneNode: function cloneNode(a) {
	      if ("template" == this.localName) return this.__shady_native_cloneNode(a);

	      var b = this.__shady_native_cloneNode(!1);

	      if (a && b.nodeType !== Node.ATTRIBUTE_NODE) {
	        a = this.__shady_childNodes;

	        for (var c = 0, d; c < a.length; c++) {
	          d = a[c].__shady_cloneNode(!0), b.__shady_appendChild(d);
	        }
	      }

	      return b;
	    },
	    getRootNode: function getRootNode(a) {
	      if (this && this.nodeType) {
	        var b = z(this),
	            c = b.U;
	        void 0 === c && (C(this) ? (c = this, b.U = c) : (c = (c = this.__shady_parentNode) ? c.__shady_getRootNode(a) : this, document.documentElement.__shady_native_contains(this) && (b.U = c)));
	        return c;
	      }
	    },
	    contains: function contains(a) {
	      return sb(this, a);
	    }
	  });

	  function $c(a, b, c) {
	    var d = [];
	    ad(a.__shady_childNodes, b, c, d);
	    return d;
	  }

	  function ad(a, b, c, d) {
	    for (var e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++) {
	      var h;

	      if (h = g.nodeType === Node.ELEMENT_NODE) {
	        h = g;
	        var k = b,
	            m = c,
	            n = d,
	            p = k(h);
	        p && n.push(h);
	        m && m(p) ? h = p : (ad(h.__shady_childNodes, k, m, n), h = void 0);
	      }

	      if (h) break;
	    }
	  }

	  var bd = E({
	    get firstElementChild() {
	      var a = A(this);

	      if (a && void 0 !== a.firstChild) {
	        for (a = this.__shady_firstChild; a && a.nodeType !== Node.ELEMENT_NODE;) {
	          a = a.__shady_nextSibling;
	        }

	        return a;
	      }

	      return this.__shady_native_firstElementChild;
	    },

	    get lastElementChild() {
	      var a = A(this);

	      if (a && void 0 !== a.lastChild) {
	        for (a = this.__shady_lastChild; a && a.nodeType !== Node.ELEMENT_NODE;) {
	          a = a.__shady_previousSibling;
	        }

	        return a;
	      }

	      return this.__shady_native_lastElementChild;
	    },

	    get children() {
	      return ib(this) ? tb(Array.prototype.filter.call(this.__shady_childNodes, function (a) {
	        return a.nodeType === Node.ELEMENT_NODE;
	      })) : this.__shady_native_children;
	    },

	    get childElementCount() {
	      var a = this.__shady_children;
	      return a ? a.length : 0;
	    }

	  }),
	      cd = E({
	    querySelector: function querySelector(a) {
	      return $c(this, function (b) {
	        return mb.call(b, a);
	      }, function (a) {
	        return !!a;
	      })[0] || null;
	    },
	    querySelectorAll: function querySelectorAll(a, b) {
	      if (b) {
	        b = Array.prototype.slice.call(this.__shady_native_querySelectorAll(a));

	        var c = this.__shady_getRootNode();

	        return b.filter(function (a) {
	          return a.__shady_getRootNode() == c;
	        });
	      }

	      return $c(this, function (b) {
	        return mb.call(b, a);
	      });
	    }
	  }),
	      dd = B.ua ? Object.assign({}, bd) : bd;
	  Object.assign(bd, cd);
	  var ed = E({
	    getElementById: function getElementById(a) {
	      return "" === a ? null : $c(this, function (b) {
	        return b.id == a;
	      }, function (a) {
	        return !!a;
	      })[0] || null;
	    }
	  });
	  var fd = E({
	    get activeElement() {
	      var a = B.D ? document.__shady_native_activeElement : document.activeElement;
	      if (!a || !a.nodeType) return null;
	      var b = !!C(this);
	      if (!(this === document || b && this.host !== a && this.host.__shady_native_contains(a))) return null;

	      for (b = Wc(a); b && b !== this;) {
	        a = b.host, b = Wc(a);
	      }

	      return this === document ? b ? null : a : b === this ? a : null;
	    }

	  });
	  var gd = document.implementation.createHTMLDocument("inert"),
	      hd = E({
	    get innerHTML() {
	      return ib(this) ? Mb("template" === this.localName ? this.content : this, function (a) {
	        return a.__shady_childNodes;
	      }) : this.__shady_native_innerHTML;
	    },

	    set innerHTML(a) {
	      if ("template" === this.localName) this.__shady_native_innerHTML = a;else {
	        Sc(this);
	        var b = this.localName || "div";
	        b = this.namespaceURI && this.namespaceURI !== gd.namespaceURI ? gd.createElementNS(this.namespaceURI, b) : gd.createElement(b);

	        for (B.D ? b.__shady_native_innerHTML = a : b.innerHTML = a; a = b.__shady_firstChild;) {
	          this.__shady_insertBefore(a);
	        }
	      }
	    }

	  });
	  var id = E({
	    addEventListener: function addEventListener(a, b, c) {
	      "object" !== typeof c && (c = {
	        capture: !!c
	      });
	      c.ia = this;

	      this.host.__shady_addEventListener(a, b, c);
	    },
	    removeEventListener: function removeEventListener(a, b, c) {
	      "object" !== typeof c && (c = {
	        capture: !!c
	      });
	      c.ia = this;

	      this.host.__shady_removeEventListener(a, b, c);
	    }
	  });

	  function jd(a, b) {
	    D(a, id, b);
	    D(a, fd, b);
	    D(a, hd, b);
	    D(a, bd, b);
	    B.T && !b ? (D(a, Zc, b), D(a, ed, b)) : B.D || (D(a, Yb), D(a, Xb));
	  }
	  var kd = {},
	      ld = B.deferConnectionCallbacks && "loading" === document.readyState,
	      md;

	  function nd(a) {
	    var b = [];

	    do {
	      b.unshift(a);
	    } while (a = a.__shady_parentNode);

	    return b;
	  }

	  function od(a, b, c) {
	    if (a !== kd) throw new TypeError("Illegal constructor");
	    this.Da = "ShadyRoot";
	    this.host = b;
	    this.mode = c && c.mode;
	    Hc(b);
	    a = z(b);
	    a.root = this;
	    a.va = "closed" !== this.mode ? this : null;
	    a = z(this);
	    a.firstChild = a.lastChild = a.parentNode = a.nextSibling = a.previousSibling = null;
	    a.childNodes = [];
	    this.ja = this.M = !1;
	    this.c = this.b = this.a = null;
	    if (B.preferPerformance) for (; a = b.__shady_native_firstChild;) {
	      b.__shady_native_removeChild(a);
	    } else Xc(this);
	  }

	  function Xc(a) {
	    a.M || (a.M = !0, wb(function () {
	      return pd(a);
	    }));
	  }

	  function pd(a) {
	    var b;

	    if (b = a.M) {
	      for (var c; a;) {
	        a: {
	          a.M && (c = a), b = a;
	          a = b.host.__shady_getRootNode();
	          if (C(a) && (b = A(b.host)) && 0 < b.X) break a;
	          a = void 0;
	        }
	      }

	      b = c;
	    }

	    (c = b) && c._renderSelf();
	  }

	  od.prototype._renderSelf = function () {
	    var a = ld;
	    ld = !0;
	    this.M = !1;

	    if (this.a) {
	      qd(this);

	      for (var b = 0, c; b < this.a.length; b++) {
	        c = this.a[b];
	        var d = A(c),
	            e = d.assignedNodes;
	        d.assignedNodes = [];
	        d.N = [];
	        if (d.ka = e) for (d = 0; d < e.length; d++) {
	          var f = A(e[d]);
	          f.Z = f.assignedSlot;
	          f.assignedSlot === c && (f.assignedSlot = null);
	        }
	      }

	      for (b = this.host.__shady_firstChild; b; b = b.__shady_nextSibling) {
	        rd(this, b);
	      }

	      for (b = 0; b < this.a.length; b++) {
	        c = this.a[b];
	        e = A(c);
	        if (!e.assignedNodes.length) for (d = c.__shady_firstChild; d; d = d.__shady_nextSibling) {
	          rd(this, d, c);
	        }
	        (d = (d = A(c.__shady_parentNode)) && d.root) && (kb(d) || d.M) && d._renderSelf();
	        sd(this, e.N, e.assignedNodes);

	        if (d = e.ka) {
	          for (f = 0; f < d.length; f++) {
	            A(d[f]).Z = null;
	          }

	          e.ka = null;
	          d.length > e.assignedNodes.length && (e.ba = !0);
	        }

	        e.ba && (e.ba = !1, td(this, c));
	      }

	      c = this.a;
	      b = [];

	      for (e = 0; e < c.length; e++) {
	        d = c[e].__shady_parentNode, (f = A(d)) && f.root || !(0 > b.indexOf(d)) || b.push(d);
	      }

	      for (c = 0; c < b.length; c++) {
	        f = b[c];
	        e = f === this ? this.host : f;
	        d = [];
	        f = f.__shady_childNodes;

	        for (var g = 0; g < f.length; g++) {
	          var h = f[g];

	          if ("slot" == h.localName) {
	            h = A(h).N;

	            for (var k = 0; k < h.length; k++) {
	              d.push(h[k]);
	            }
	          } else d.push(h);
	        }

	        f = Array.prototype.slice.call(e.__shady_native_childNodes);
	        g = Cc(d, d.length, f, f.length);
	        k = h = 0;

	        for (var m = void 0; h < g.length && (m = g[h]); h++) {
	          for (var n = 0, p = void 0; n < m.V.length && (p = m.V[n]); n++) {
	            p.__shady_native_parentNode === e && e.__shady_native_removeChild(p), f.splice(m.index + k, 1);
	          }

	          k -= m.$;
	        }

	        k = 0;

	        for (m = void 0; k < g.length && (m = g[k]); k++) {
	          for (h = f[m.index], n = m.index; n < m.index + m.$; n++) {
	            p = d[n], e.__shady_native_insertBefore(p, h), f.splice(n, 0, p);
	          }
	        }
	      }
	    }

	    if (!B.preferPerformance && !this.ja) for (b = this.host.__shady_childNodes, c = 0, e = b.length; c < e; c++) {
	      d = b[c], f = A(d), d.__shady_native_parentNode !== this.host || "slot" !== d.localName && f.assignedSlot || this.host.__shady_native_removeChild(d);
	    }
	    this.ja = !0;
	    ld = a;
	    md && md();
	  };

	  function rd(a, b, c) {
	    var d = z(b),
	        e = d.Z;
	    d.Z = null;
	    c || (c = (a = a.b[b.__shady_slot || "__catchall"]) && a[0]);
	    c ? (z(c).assignedNodes.push(b), d.assignedSlot = c) : d.assignedSlot = void 0;
	    e !== d.assignedSlot && d.assignedSlot && (z(d.assignedSlot).ba = !0);
	  }

	  function sd(a, b, c) {
	    for (var d = 0, e = void 0; d < c.length && (e = c[d]); d++) {
	      if ("slot" == e.localName) {
	        var f = A(e).assignedNodes;
	        f && f.length && sd(a, b, f);
	      } else b.push(c[d]);
	    }
	  }

	  function td(a, b) {
	    b.__shady_native_dispatchEvent(new Event("slotchange"));

	    b = A(b);
	    b.assignedSlot && td(a, b.assignedSlot);
	  }

	  function qd(a) {
	    if (a.c && a.c.length) {
	      for (var b = a.c, c, d = 0; d < b.length; d++) {
	        var e = b[d];
	        Hc(e);
	        var f = e.__shady_parentNode;
	        Hc(f);
	        f = A(f);
	        f.X = (f.X || 0) + 1;
	        f = ud(e);
	        a.b[f] ? (c = c || {}, c[f] = !0, a.b[f].push(e)) : a.b[f] = [e];
	        a.a.push(e);
	      }

	      if (c) for (var g in c) {
	        a.b[g] = vd(a.b[g]);
	      }
	      a.c = [];
	    }
	  }

	  function ud(a) {
	    var b = a.name || a.getAttribute("name") || "__catchall";
	    return a.Ba = b;
	  }

	  function vd(a) {
	    return a.sort(function (a, c) {
	      a = nd(a);

	      for (var b = nd(c), e = 0; e < a.length; e++) {
	        c = a[e];
	        var f = b[e];
	        if (c !== f) return a = Array.from(c.__shady_parentNode.__shady_childNodes), a.indexOf(c) - a.indexOf(f);
	      }
	    });
	  }

	  function Yc(a, b) {
	    if (a.a) {
	      qd(a);
	      var c = a.b,
	          d;

	      for (d in c) {
	        for (var e = c[d], f = 0; f < e.length; f++) {
	          var g = e[f];

	          if (sb(b, g)) {
	            e.splice(f, 1);
	            var h = a.a.indexOf(g);
	            0 <= h && (a.a.splice(h, 1), (h = A(g.__shady_parentNode)) && h.X && h.X--);
	            f--;
	            g = A(g);
	            if (h = g.N) for (var k = 0; k < h.length; k++) {
	              var m = h[k],
	                  n = m.__shady_native_parentNode;
	              n && n.__shady_native_removeChild(m);
	            }
	            g.N = [];
	            g.assignedNodes = [];
	            h = !0;
	          }
	        }
	      }

	      return h;
	    }
	  }

	  function kb(a) {
	    qd(a);
	    return !(!a.a || !a.a.length);
	  }

	  (function (a) {
	    a.__proto__ = DocumentFragment.prototype;
	    jd(a, "__shady_");
	    jd(a);
	    Object.defineProperties(a, {
	      nodeType: {
	        value: Node.DOCUMENT_FRAGMENT_NODE,
	        configurable: !0
	      },
	      nodeName: {
	        value: "#document-fragment",
	        configurable: !0
	      },
	      nodeValue: {
	        value: null,
	        configurable: !0
	      }
	    });
	    ["localName", "namespaceURI", "prefix"].forEach(function (b) {
	      Object.defineProperty(a, b, {
	        value: void 0,
	        configurable: !0
	      });
	    });
	    ["ownerDocument", "baseURI", "isConnected"].forEach(function (b) {
	      Object.defineProperty(a, b, {
	        get: function get() {
	          return this.host[b];
	        },
	        configurable: !0
	      });
	    });
	  })(od.prototype);

	  if (window.customElements && B.ma && !B.preferPerformance) {
	    var wd = new Map();

	    md = function md() {
	      var a = [];
	      wd.forEach(function (b, c) {
	        a.push([c, b]);
	      });
	      wd.clear();

	      for (var b = 0; b < a.length; b++) {
	        var c = a[b][0];
	        a[b][1] ? c.za() : c.Aa();
	      }
	    };

	    ld && document.addEventListener("readystatechange", function () {
	      ld = !1;
	      md();
	    }, {
	      once: !0
	    });

	    var xd = function xd(a, b, c) {
	      var d = 0,
	          e = "__isConnected" + d++;
	      if (b || c) a.prototype.connectedCallback = a.prototype.za = function () {
	        ld ? wd.set(this, !0) : this[e] || (this[e] = !0, b && b.call(this));
	      }, a.prototype.disconnectedCallback = a.prototype.Aa = function () {
	        ld ? this.isConnected || wd.set(this, !1) : this[e] && (this[e] = !1, c && c.call(this));
	      };
	      return a;
	    },
	        define = window.customElements.define;

	    Object.defineProperty(window.CustomElementRegistry.prototype, "define", {
	      value: function value(a, b) {
	        var c = b.prototype.connectedCallback,
	            d = b.prototype.disconnectedCallback;
	        define.call(window.customElements, a, xd(b, c, d));
	        b.prototype.connectedCallback = c;
	        b.prototype.disconnectedCallback = d;
	      }
	    });
	  }

	  function Wc(a) {
	    a = a.__shady_getRootNode();
	    if (C(a)) return a;
	  }

	  function yd(a) {
	    this.node = a;
	  }

	  r = yd.prototype;

	  r.addEventListener = function (a, b, c) {
	    return this.node.__shady_addEventListener(a, b, c);
	  };

	  r.removeEventListener = function (a, b, c) {
	    return this.node.__shady_removeEventListener(a, b, c);
	  };

	  r.appendChild = function (a) {
	    return this.node.__shady_appendChild(a);
	  };

	  r.insertBefore = function (a, b) {
	    return this.node.__shady_insertBefore(a, b);
	  };

	  r.removeChild = function (a) {
	    return this.node.__shady_removeChild(a);
	  };

	  r.replaceChild = function (a, b) {
	    return this.node.__shady_replaceChild(a, b);
	  };

	  r.cloneNode = function (a) {
	    return this.node.__shady_cloneNode(a);
	  };

	  r.getRootNode = function (a) {
	    return this.node.__shady_getRootNode(a);
	  };

	  r.contains = function (a) {
	    return this.node.__shady_contains(a);
	  };

	  r.dispatchEvent = function (a) {
	    return this.node.__shady_dispatchEvent(a);
	  };

	  r.setAttribute = function (a, b) {
	    this.node.__shady_setAttribute(a, b);
	  };

	  r.getAttribute = function (a) {
	    return this.node.__shady_native_getAttribute(a);
	  };

	  r.hasAttribute = function (a) {
	    return this.node.__shady_native_hasAttribute(a);
	  };

	  r.removeAttribute = function (a) {
	    this.node.__shady_removeAttribute(a);
	  };

	  r.attachShadow = function (a) {
	    return this.node.__shady_attachShadow(a);
	  };

	  r.focus = function () {
	    this.node.__shady_native_focus();
	  };

	  r.blur = function () {
	    this.node.__shady_blur();
	  };

	  r.importNode = function (a, b) {
	    if (this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_importNode(a, b);
	  };

	  r.getElementById = function (a) {
	    if (this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_getElementById(a);
	  };

	  r.querySelector = function (a) {
	    return this.node.__shady_querySelector(a);
	  };

	  r.querySelectorAll = function (a, b) {
	    return this.node.__shady_querySelectorAll(a, b);
	  };

	  r.assignedNodes = function (a) {
	    if ("slot" === this.node.localName) return this.node.__shady_assignedNodes(a);
	  };

	  t.Object.defineProperties(yd.prototype, {
	    activeElement: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        if (C(this.node) || this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_activeElement;
	      }
	    },
	    _activeElement: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.activeElement;
	      }
	    },
	    host: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        if (C(this.node)) return this.node.host;
	      }
	    },
	    parentNode: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_parentNode;
	      }
	    },
	    firstChild: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_firstChild;
	      }
	    },
	    lastChild: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_lastChild;
	      }
	    },
	    nextSibling: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_nextSibling;
	      }
	    },
	    previousSibling: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_previousSibling;
	      }
	    },
	    childNodes: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_childNodes;
	      }
	    },
	    parentElement: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_parentElement;
	      }
	    },
	    firstElementChild: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_firstElementChild;
	      }
	    },
	    lastElementChild: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_lastElementChild;
	      }
	    },
	    nextElementSibling: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_nextElementSibling;
	      }
	    },
	    previousElementSibling: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_previousElementSibling;
	      }
	    },
	    children: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_children;
	      }
	    },
	    childElementCount: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_childElementCount;
	      }
	    },
	    shadowRoot: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_shadowRoot;
	      }
	    },
	    assignedSlot: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_assignedSlot;
	      }
	    },
	    isConnected: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_isConnected;
	      }
	    },
	    innerHTML: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_innerHTML;
	      },
	      set: function set(a) {
	        this.node.__shady_innerHTML = a;
	      }
	    },
	    textContent: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_textContent;
	      },
	      set: function set(a) {
	        this.node.__shady_textContent = a;
	      }
	    },
	    slot: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return this.node.__shady_slot;
	      },
	      set: function set(a) {
	        this.node.__shady_slot = a;
	      }
	    }
	  });
	  Ac.forEach(function (a) {
	    Object.defineProperty(yd.prototype, a, {
	      get: function get() {
	        return this.node["__shady_" + a];
	      },
	      set: function set(b) {
	        this.node["__shady_" + a] = b;
	      },
	      configurable: !0
	    });
	  });
	  var zd = new WeakMap();

	  function Ad(a) {
	    if (C(a) || a instanceof yd) return a;
	    var b = zd.get(a);
	    b || (b = new yd(a), zd.set(a, b));
	    return b;
	  }
	  var Bd = E({
	    dispatchEvent: function dispatchEvent(a) {
	      xb();
	      return this.__shady_native_dispatchEvent(a);
	    },
	    addEventListener: rc,
	    removeEventListener: tc
	  });
	  var Cd = E({
	    get assignedSlot() {
	      var a = this.__shady_parentNode;
	      (a = a && a.__shady_shadowRoot) && pd(a);
	      return (a = A(this)) && a.assignedSlot || null;
	    }

	  });
	  var Dd = window.document;

	  function Ed(a, b) {
	    if ("slot" === b) a = a.__shady_parentNode, jb(a) && Xc(A(a).root);else if ("slot" === a.localName && "name" === b && (b = Wc(a))) {
	      if (b.a) {
	        qd(b);
	        var c = a.Ba,
	            d = ud(a);

	        if (d !== c) {
	          c = b.b[c];
	          var e = c.indexOf(a);
	          0 <= e && c.splice(e, 1);
	          c = b.b[d] || (b.b[d] = []);
	          c.push(a);
	          1 < c.length && (b.b[d] = vd(c));
	        }
	      }

	      Xc(b);
	    }
	  }

	  var Fd = E({
	    get previousElementSibling() {
	      var a = A(this);

	      if (a && void 0 !== a.previousSibling) {
	        for (a = this.__shady_previousSibling; a && a.nodeType !== Node.ELEMENT_NODE;) {
	          a = a.__shady_previousSibling;
	        }

	        return a;
	      }

	      return this.__shady_native_previousElementSibling;
	    },

	    get nextElementSibling() {
	      var a = A(this);

	      if (a && void 0 !== a.nextSibling) {
	        for (a = this.__shady_nextSibling; a && a.nodeType !== Node.ELEMENT_NODE;) {
	          a = a.__shady_nextSibling;
	        }

	        return a;
	      }

	      return this.__shady_native_nextElementSibling;
	    },

	    get slot() {
	      return this.getAttribute("slot");
	    },

	    set slot(a) {
	      this.__shady_setAttribute("slot", a);
	    },

	    get shadowRoot() {
	      var a = A(this);
	      return a && a.va || null;
	    },

	    get className() {
	      return this.getAttribute("class") || "";
	    },

	    set className(a) {
	      this.__shady_setAttribute("class", a);
	    },

	    setAttribute: function setAttribute(a, b) {
	      if (this.ownerDocument !== Dd) this.__shady_native_setAttribute(a, b);else {
	        var c;
	        (c = Jc()) && "class" === a ? (c.setElementClass(this, b), c = !0) : c = !1;
	        c || (this.__shady_native_setAttribute(a, b), Ed(this, a));
	      }
	    },
	    removeAttribute: function removeAttribute(a) {
	      this.__shady_native_removeAttribute(a);

	      Ed(this, a);
	    },
	    attachShadow: function attachShadow(a) {
	      if (!this) throw Error("Must provide a host.");
	      if (!a) throw Error("Not enough arguments.");
	      return new od(kd, this, a);
	    }
	  });
	  var Gd = E({
	    blur: function blur() {
	      var a = A(this);
	      (a = (a = a && a.root) && a.activeElement) ? a.__shady_blur() : this.__shady_native_blur();
	    }
	  });
	  Ac.forEach(function (a) {
	    Gd[a] = {
	      set: function set(b) {
	        var c = z(this),
	            d = a.substring(2);
	        c.Y[a] && this.removeEventListener(d, c.Y[a]);

	        this.__shady_addEventListener(d, b);

	        c.Y[a] = b;
	      },
	      get: function get() {
	        var b = A(this);
	        return b && b.Y[a];
	      },
	      configurable: !0
	    };
	  });
	  var Hd = E({
	    assignedNodes: function assignedNodes(a) {
	      if ("slot" === this.localName) {
	        var b = this.__shady_getRootNode();

	        b && C(b) && pd(b);
	        return (b = A(this)) ? (a && a.flatten ? b.N : b.assignedNodes) || [] : [];
	      }
	    }
	  });
	  var Id = window.document,
	      Jd = E({
	    importNode: function importNode(a, b) {
	      if (a.ownerDocument !== Id || "template" === a.localName) return this.__shady_native_importNode(a, b);

	      var c = this.__shady_native_importNode(a, !1);

	      if (b) {
	        a = a.__shady_childNodes;
	        b = 0;

	        for (var d; b < a.length; b++) {
	          d = this.__shady_importNode(a[b], !0), c.__shady_appendChild(d);
	        }
	      }

	      return c;
	    }
	  });
	  var Kd = E({
	    addEventListener: rc.bind(window),
	    removeEventListener: tc.bind(window)
	  });
	  var Ld = {};
	  Object.getOwnPropertyDescriptor(HTMLElement.prototype, "parentElement") && (Ld.parentElement = Zc.parentElement);
	  Object.getOwnPropertyDescriptor(HTMLElement.prototype, "contains") && (Ld.contains = Zc.contains);
	  Object.getOwnPropertyDescriptor(HTMLElement.prototype, "children") && (Ld.children = bd.children);
	  Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML") && (Ld.innerHTML = hd.innerHTML);
	  Object.getOwnPropertyDescriptor(HTMLElement.prototype, "className") && (Ld.className = Fd.className);
	  var Md = {
	    EventTarget: [Bd],
	    Node: [Zc, window.EventTarget ? null : Bd],
	    Text: [Cd],
	    Element: [Fd, bd, Cd, !B.D || "innerHTML" in Element.prototype ? hd : null, window.HTMLSlotElement ? null : Hd],
	    HTMLElement: [Gd, Ld],
	    HTMLSlotElement: [Hd],
	    DocumentFragment: [dd, ed],
	    Document: [Jd, dd, ed, fd],
	    Window: [Kd]
	  },
	      Nd = B.D ? null : ["innerHTML", "textContent"];

	  function Od(a) {
	    var b = a ? null : Nd,
	        c = {},
	        d;

	    for (d in Md) {
	      c.fa = window[d] && window[d].prototype, Md[d].forEach(function (c) {
	        return function (d) {
	          return c.fa && d && D(c.fa, d, a, b);
	        };
	      }(c)), c = {
	        fa: c.fa
	      };
	    }
	  }

	  if (B.ma) {
	    var ShadyDOM = {
	      inUse: B.ma,
	      patch: function patch(a) {
	        cc(a);
	        bc(a);
	        return a;
	      },
	      isShadyRoot: C,
	      enqueue: wb,
	      flush: xb,
	      flushInitial: function flushInitial(a) {
	        !a.ja && a.M && pd(a);
	      },
	      settings: B,
	      filterMutations: Fb,
	      observeChildren: Db,
	      unobserveChildren: Eb,
	      deferConnectionCallbacks: B.deferConnectionCallbacks,
	      preferPerformance: B.preferPerformance,
	      handlesDynamicScoping: !0,
	      wrap: B.T ? Ad : function (a) {
	        return a;
	      },
	      Wrapper: yd,
	      composedPath: jc,
	      noPatch: B.T,
	      nativeMethods: Ob,
	      nativeTree: Pb
	    };
	    window.ShadyDOM = ShadyDOM;
	    Wb();
	    Od("__shady_");
	    Object.defineProperty(document, "_activeElement", fd.activeElement);
	    D(Window.prototype, Kd, "__shady_");
	    B.T || (Od(), zc());
	    uc();
	    window.Event = wc;
	    window.CustomEvent = xc;
	    window.MouseEvent = yc;
	    window.ShadowRoot = od;
	  }
	  var Pd = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));

	  function Qd(a) {
	    var b = Pd.has(a);
	    a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);
	    return !b && a;
	  }

	  function J(a) {
	    var b = a.isConnected;
	    if (void 0 !== b) return b;

	    for (; a && !(a.__CE_isImportDocument || a instanceof Document);) {
	      a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
	    }

	    return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
	  }

	  function Rd(a, b) {
	    for (; b && b !== a && !b.nextSibling;) {
	      b = b.parentNode;
	    }

	    return b && b !== a ? b.nextSibling : null;
	  }

	  function Sd(a, b, c) {
	    c = void 0 === c ? new Set() : c;

	    for (var d = a; d;) {
	      if (d.nodeType === Node.ELEMENT_NODE) {
	        var e = d;
	        b(e);
	        var f = e.localName;

	        if ("link" === f && "import" === e.getAttribute("rel")) {
	          d = e.import;
	          if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) {
	            Sd(d, b, c);
	          }
	          d = Rd(a, e);
	          continue;
	        } else if ("template" === f) {
	          d = Rd(a, e);
	          continue;
	        }

	        if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) {
	          Sd(e, b, c);
	        }
	      }

	      d = d.firstChild ? d.firstChild : Rd(a, d);
	    }
	  }

	  function K(a, b, c) {
	    a[b] = c;
	  }

	  function Td() {
	    this.a = new Map();
	    this.u = new Map();
	    this.f = [];
	    this.c = !1;
	  }

	  function Ud(a, b, c) {
	    a.a.set(b, c);
	    a.u.set(c.constructorFunction, c);
	  }

	  function Vd(a, b) {
	    a.c = !0;
	    a.f.push(b);
	  }

	  function Wd(a, b) {
	    a.c && Sd(b, function (b) {
	      return a.b(b);
	    });
	  }

	  Td.prototype.b = function (a) {
	    if (this.c && !a.__CE_patched) {
	      a.__CE_patched = !0;

	      for (var b = 0; b < this.f.length; b++) {
	        this.f[b](a);
	      }
	    }
	  };

	  function L(a, b) {
	    var c = [];
	    Sd(b, function (a) {
	      return c.push(a);
	    });

	    for (b = 0; b < c.length; b++) {
	      var d = c[b];
	      1 === d.__CE_state ? a.connectedCallback(d) : Xd(a, d);
	    }
	  }

	  function M(a, b) {
	    var c = [];
	    Sd(b, function (a) {
	      return c.push(a);
	    });

	    for (b = 0; b < c.length; b++) {
	      var d = c[b];
	      1 === d.__CE_state && a.disconnectedCallback(d);
	    }
	  }

	  function N(a, b, c) {
	    c = void 0 === c ? {} : c;

	    var d = c.Za || new Set(),
	        e = c.ga || function (b) {
	      return Xd(a, b);
	    },
	        f = [];

	    Sd(b, function (b) {
	      if ("link" === b.localName && "import" === b.getAttribute("rel")) {
	        var c = b.import;
	        c instanceof Node && (c.__CE_isImportDocument = !0, c.__CE_hasRegistry = !0);
	        c && "complete" === c.readyState ? c.__CE_documentLoadHandled = !0 : b.addEventListener("load", function () {
	          var c = b.import;

	          if (!c.__CE_documentLoadHandled) {
	            c.__CE_documentLoadHandled = !0;
	            var f = new Set(d);
	            f.delete(c);
	            N(a, c, {
	              Za: f,
	              ga: e
	            });
	          }
	        });
	      } else f.push(b);
	    }, d);
	    if (a.c) for (b = 0; b < f.length; b++) {
	      a.b(f[b]);
	    }

	    for (b = 0; b < f.length; b++) {
	      e(f[b]);
	    }
	  }

	  function Xd(a, b) {
	    if (void 0 === b.__CE_state) {
	      var c = b.ownerDocument;
	      if (c.defaultView || c.__CE_isImportDocument && c.__CE_hasRegistry) if (c = a.a.get(b.localName)) {
	        c.constructionStack.push(b);
	        var d = c.constructorFunction;

	        try {
	          try {
	            if (new d() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
	          } finally {
	            c.constructionStack.pop();
	          }
	        } catch (g) {
	          throw b.__CE_state = 2, g;
	        }

	        b.__CE_state = 1;
	        b.__CE_definition = c;
	        if (c.attributeChangedCallback) for (c = c.observedAttributes, d = 0; d < c.length; d++) {
	          var e = c[d],
	              f = b.getAttribute(e);
	          null !== f && a.attributeChangedCallback(b, e, null, f, null);
	        }
	        J(b) && a.connectedCallback(b);
	      }
	    }
	  }

	  Td.prototype.connectedCallback = function (a) {
	    var b = a.__CE_definition;
	    b.connectedCallback && b.connectedCallback.call(a);
	  };

	  Td.prototype.disconnectedCallback = function (a) {
	    var b = a.__CE_definition;
	    b.disconnectedCallback && b.disconnectedCallback.call(a);
	  };

	  Td.prototype.attributeChangedCallback = function (a, b, c, d, e) {
	    var f = a.__CE_definition;
	    f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, c, d, e);
	  };

	  function Yd(a) {
	    var b = document;
	    this.b = a;
	    this.a = b;
	    this.O = void 0;
	    N(this.b, this.a);
	    "loading" === this.a.readyState && (this.O = new MutationObserver(this.c.bind(this)), this.O.observe(this.a, {
	      childList: !0,
	      subtree: !0
	    }));
	  }

	  function Zd(a) {
	    a.O && a.O.disconnect();
	  }

	  Yd.prototype.c = function (a) {
	    var b = this.a.readyState;
	    "interactive" !== b && "complete" !== b || Zd(this);

	    for (b = 0; b < a.length; b++) {
	      for (var c = a[b].addedNodes, d = 0; d < c.length; d++) {
	        N(this.b, c[d]);
	      }
	    }
	  };

	  function $d() {
	    var a = this;
	    this.a = this.w = void 0;
	    this.b = new Promise(function (b) {
	      a.a = b;
	      a.w && b(a.w);
	    });
	  }

	  $d.prototype.resolve = function (a) {
	    if (this.w) throw Error("Already resolved.");
	    this.w = a;
	    this.a && this.a(a);
	  };

	  function O(a) {
	    this.c = !1;
	    this.a = a;
	    this.F = new Map();

	    this.f = function (a) {
	      return a();
	    };

	    this.b = !1;
	    this.u = [];
	    this.ca = new Yd(a);
	  }

	  r = O.prototype;

	  r.xa = function (a, b) {
	    var c = this;
	    if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
	    if (!Qd(a)) throw new SyntaxError("The element name '" + a + "' is not valid.");
	    if (this.a.a.get(a)) throw Error("A custom element with name '" + a + "' has already been defined.");
	    if (this.c) throw Error("A custom element is already being defined.");
	    this.c = !0;

	    try {
	      var d = function d(a) {
	        var b = e[a];
	        if (void 0 !== b && !(b instanceof Function)) throw Error("The '" + a + "' callback must be a function.");
	        return b;
	      },
	          e = b.prototype;

	      if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
	      var f = d("connectedCallback");
	      var g = d("disconnectedCallback");
	      var h = d("adoptedCallback");
	      var k = d("attributeChangedCallback");
	      var m = b.observedAttributes || [];
	    } catch (n) {
	      return;
	    } finally {
	      this.c = !1;
	    }

	    b = {
	      localName: a,
	      constructorFunction: b,
	      connectedCallback: f,
	      disconnectedCallback: g,
	      adoptedCallback: h,
	      attributeChangedCallback: k,
	      observedAttributes: m,
	      constructionStack: []
	    };
	    Ud(this.a, a, b);
	    this.u.push(b);
	    this.b || (this.b = !0, this.f(function () {
	      return ae(c);
	    }));
	  };

	  r.ga = function (a) {
	    N(this.a, a);
	  };

	  function ae(a) {
	    if (!1 !== a.b) {
	      a.b = !1;

	      for (var b = a.u, c = [], d = new Map(), e = 0; e < b.length; e++) {
	        d.set(b[e].localName, []);
	      }

	      N(a.a, document, {
	        ga: function ga(b) {
	          if (void 0 === b.__CE_state) {
	            var e = b.localName,
	                f = d.get(e);
	            f ? f.push(b) : a.a.a.get(e) && c.push(b);
	          }
	        }
	      });

	      for (e = 0; e < c.length; e++) {
	        Xd(a.a, c[e]);
	      }

	      for (; 0 < b.length;) {
	        var f = b.shift();
	        e = f.localName;
	        f = d.get(f.localName);

	        for (var g = 0; g < f.length; g++) {
	          Xd(a.a, f[g]);
	        }

	        (e = a.F.get(e)) && e.resolve(void 0);
	      }
	    }
	  }

	  r.get = function (a) {
	    if (a = this.a.a.get(a)) return a.constructorFunction;
	  };

	  r.ya = function (a) {
	    if (!Qd(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
	    var b = this.F.get(a);
	    if (b) return b.b;
	    b = new $d();
	    this.F.set(a, b);
	    this.a.a.get(a) && !this.u.some(function (b) {
	      return b.localName === a;
	    }) && b.resolve(void 0);
	    return b.b;
	  };

	  r.Ra = function (a) {
	    Zd(this.ca);
	    var b = this.f;

	    this.f = function (c) {
	      return a(function () {
	        return b(c);
	      });
	    };
	  };

	  window.CustomElementRegistry = O;
	  O.prototype.define = O.prototype.xa;
	  O.prototype.upgrade = O.prototype.ga;
	  O.prototype.get = O.prototype.get;
	  O.prototype.whenDefined = O.prototype.ya;
	  O.prototype.polyfillWrapFlushCallback = O.prototype.Ra;
	  var be = window.Document.prototype.createElement,
	      ce = window.Document.prototype.createElementNS,
	      de = window.Document.prototype.importNode,
	      ee = window.Document.prototype.prepend,
	      fe = window.Document.prototype.append,
	      ge = window.DocumentFragment.prototype.prepend,
	      he = window.DocumentFragment.prototype.append,
	      ie = window.Node.prototype.cloneNode,
	      je = window.Node.prototype.appendChild,
	      ke = window.Node.prototype.insertBefore,
	      le = window.Node.prototype.removeChild,
	      me = window.Node.prototype.replaceChild,
	      ne = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
	      oe = window.Element.prototype.attachShadow,
	      pe = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
	      qe = window.Element.prototype.getAttribute,
	      re = window.Element.prototype.setAttribute,
	      se = window.Element.prototype.removeAttribute,
	      te = window.Element.prototype.getAttributeNS,
	      ue = window.Element.prototype.setAttributeNS,
	      ve = window.Element.prototype.removeAttributeNS,
	      we = window.Element.prototype.insertAdjacentElement,
	      xe = window.Element.prototype.insertAdjacentHTML,
	      ye = window.Element.prototype.prepend,
	      ze = window.Element.prototype.append,
	      Ae = window.Element.prototype.before,
	      Be = window.Element.prototype.after,
	      Ce = window.Element.prototype.replaceWith,
	      De = window.Element.prototype.remove,
	      Ee = window.HTMLElement,
	      Fe = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
	      Ge = window.HTMLElement.prototype.insertAdjacentElement,
	      He = window.HTMLElement.prototype.insertAdjacentHTML;
	  var Ie = new function () {}();

	  function Je() {
	    var a = Ke;

	    window.HTMLElement = function () {
	      function b() {
	        var b = this.constructor,
	            d = a.u.get(b);
	        if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");
	        var e = d.constructionStack;
	        if (0 === e.length) return e = be.call(document, d.localName), Object.setPrototypeOf(e, b.prototype), e.__CE_state = 1, e.__CE_definition = d, a.b(e), e;
	        d = e.length - 1;
	        var f = e[d];
	        if (f === Ie) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
	        e[d] = Ie;
	        Object.setPrototypeOf(f, b.prototype);
	        a.b(f);
	        return f;
	      }

	      b.prototype = Ee.prototype;
	      Object.defineProperty(b.prototype, "constructor", {
	        writable: !0,
	        configurable: !0,
	        enumerable: !1,
	        value: b
	      });
	      return b;
	    }();
	  }

	  function Le(a, b, c) {
	    function d(b) {
	      return function (c) {
	        for (var d = [], e = 0; e < arguments.length; ++e) {
	          d[e] = arguments[e];
	        }

	        e = [];

	        for (var f = [], m = 0; m < d.length; m++) {
	          var n = d[m];
	          n instanceof Element && J(n) && f.push(n);
	          if (n instanceof DocumentFragment) for (n = n.firstChild; n; n = n.nextSibling) {
	            e.push(n);
	          } else e.push(n);
	        }

	        b.apply(this, d);

	        for (d = 0; d < f.length; d++) {
	          M(a, f[d]);
	        }

	        if (J(this)) for (d = 0; d < e.length; d++) {
	          f = e[d], f instanceof Element && L(a, f);
	        }
	      };
	    }

	    void 0 !== c.ea && (b.prepend = d(c.ea));
	    void 0 !== c.append && (b.append = d(c.append));
	  }

	  function Me() {
	    var a = Ke;
	    K(Document.prototype, "createElement", function (b) {
	      if (this.__CE_hasRegistry) {
	        var c = a.a.get(b);
	        if (c) return new c.constructorFunction();
	      }

	      b = be.call(this, b);
	      a.b(b);
	      return b;
	    });
	    K(Document.prototype, "importNode", function (b, c) {
	      b = de.call(this, b, !!c);
	      this.__CE_hasRegistry ? N(a, b) : Wd(a, b);
	      return b;
	    });
	    K(Document.prototype, "createElementNS", function (b, c) {
	      if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
	        var d = a.a.get(c);
	        if (d) return new d.constructorFunction();
	      }

	      b = ce.call(this, b, c);
	      a.b(b);
	      return b;
	    });
	    Le(a, Document.prototype, {
	      ea: ee,
	      append: fe
	    });
	  }

	  function Ne() {
	    function a(a, d) {
	      Object.defineProperty(a, "textContent", {
	        enumerable: d.enumerable,
	        configurable: !0,
	        get: d.get,
	        set: function set(a) {
	          if (this.nodeType === Node.TEXT_NODE) d.set.call(this, a);else {
	            var c = void 0;

	            if (this.firstChild) {
	              var e = this.childNodes,
	                  h = e.length;

	              if (0 < h && J(this)) {
	                c = Array(h);

	                for (var k = 0; k < h; k++) {
	                  c[k] = e[k];
	                }
	              }
	            }

	            d.set.call(this, a);
	            if (c) for (a = 0; a < c.length; a++) {
	              M(b, c[a]);
	            }
	          }
	        }
	      });
	    }

	    var b = Ke;
	    K(Node.prototype, "insertBefore", function (a, d) {
	      if (a instanceof DocumentFragment) {
	        var c = Array.prototype.slice.apply(a.childNodes);
	        a = ke.call(this, a, d);
	        if (J(this)) for (d = 0; d < c.length; d++) {
	          L(b, c[d]);
	        }
	        return a;
	      }

	      c = J(a);
	      d = ke.call(this, a, d);
	      c && M(b, a);
	      J(this) && L(b, a);
	      return d;
	    });
	    K(Node.prototype, "appendChild", function (a) {
	      if (a instanceof DocumentFragment) {
	        var c = Array.prototype.slice.apply(a.childNodes);
	        a = je.call(this, a);
	        if (J(this)) for (var e = 0; e < c.length; e++) {
	          L(b, c[e]);
	        }
	        return a;
	      }

	      c = J(a);
	      e = je.call(this, a);
	      c && M(b, a);
	      J(this) && L(b, a);
	      return e;
	    });
	    K(Node.prototype, "cloneNode", function (a) {
	      a = ie.call(this, !!a);
	      this.ownerDocument.__CE_hasRegistry ? N(b, a) : Wd(b, a);
	      return a;
	    });
	    K(Node.prototype, "removeChild", function (a) {
	      var c = J(a),
	          e = le.call(this, a);
	      c && M(b, a);
	      return e;
	    });
	    K(Node.prototype, "replaceChild", function (a, d) {
	      if (a instanceof DocumentFragment) {
	        var c = Array.prototype.slice.apply(a.childNodes);
	        a = me.call(this, a, d);
	        if (J(this)) for (M(b, d), d = 0; d < c.length; d++) {
	          L(b, c[d]);
	        }
	        return a;
	      }

	      c = J(a);
	      var f = me.call(this, a, d),
	          g = J(this);
	      g && M(b, d);
	      c && M(b, a);
	      g && L(b, a);
	      return f;
	    });
	    ne && ne.get ? a(Node.prototype, ne) : Vd(b, function (b) {
	      a(b, {
	        enumerable: !0,
	        configurable: !0,
	        get: function get() {
	          for (var a = [], b = 0; b < this.childNodes.length; b++) {
	            a.push(this.childNodes[b].textContent);
	          }

	          return a.join("");
	        },
	        set: function set(a) {
	          for (; this.firstChild;) {
	            le.call(this, this.firstChild);
	          }

	          je.call(this, document.createTextNode(a));
	        }
	      });
	    });
	  }

	  function Oe(a) {
	    function b(b) {
	      return function (c) {
	        for (var d = [], e = 0; e < arguments.length; ++e) {
	          d[e] = arguments[e];
	        }

	        e = [];

	        for (var h = [], k = 0; k < d.length; k++) {
	          var m = d[k];
	          m instanceof Element && J(m) && h.push(m);
	          if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) {
	            e.push(m);
	          } else e.push(m);
	        }

	        b.apply(this, d);

	        for (d = 0; d < h.length; d++) {
	          M(a, h[d]);
	        }

	        if (J(this)) for (d = 0; d < e.length; d++) {
	          h = e[d], h instanceof Element && L(a, h);
	        }
	      };
	    }

	    var c = Element.prototype;
	    void 0 !== Ae && (c.before = b(Ae));
	    void 0 !== Ae && (c.after = b(Be));
	    void 0 !== Ce && K(c, "replaceWith", function (b) {
	      for (var c = [], d = 0; d < arguments.length; ++d) {
	        c[d] = arguments[d];
	      }

	      d = [];

	      for (var g = [], h = 0; h < c.length; h++) {
	        var k = c[h];
	        k instanceof Element && J(k) && g.push(k);
	        if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) {
	          d.push(k);
	        } else d.push(k);
	      }

	      h = J(this);
	      Ce.apply(this, c);

	      for (c = 0; c < g.length; c++) {
	        M(a, g[c]);
	      }

	      if (h) for (M(a, this), c = 0; c < d.length; c++) {
	        g = d[c], g instanceof Element && L(a, g);
	      }
	    });
	    void 0 !== De && K(c, "remove", function () {
	      var b = J(this);
	      De.call(this);
	      b && M(a, this);
	    });
	  }

	  function Pe() {
	    function a(a, b) {
	      Object.defineProperty(a, "innerHTML", {
	        enumerable: b.enumerable,
	        configurable: !0,
	        get: b.get,
	        set: function set(a) {
	          var c = this,
	              e = void 0;
	          J(this) && (e = [], Sd(this, function (a) {
	            a !== c && e.push(a);
	          }));
	          b.set.call(this, a);
	          if (e) for (var f = 0; f < e.length; f++) {
	            var g = e[f];
	            1 === g.__CE_state && d.disconnectedCallback(g);
	          }
	          this.ownerDocument.__CE_hasRegistry ? N(d, this) : Wd(d, this);
	          return a;
	        }
	      });
	    }

	    function b(a, b) {
	      K(a, "insertAdjacentElement", function (a, c) {
	        var e = J(c);
	        a = b.call(this, a, c);
	        e && M(d, c);
	        J(a) && L(d, c);
	        return a;
	      });
	    }

	    function c(a, b) {
	      function c(a, b) {
	        for (var c = []; a !== b; a = a.nextSibling) {
	          c.push(a);
	        }

	        for (b = 0; b < c.length; b++) {
	          N(d, c[b]);
	        }
	      }

	      K(a, "insertAdjacentHTML", function (a, d) {
	        a = a.toLowerCase();

	        if ("beforebegin" === a) {
	          var e = this.previousSibling;
	          b.call(this, a, d);
	          c(e || this.parentNode.firstChild, this);
	        } else if ("afterbegin" === a) e = this.firstChild, b.call(this, a, d), c(this.firstChild, e);else if ("beforeend" === a) e = this.lastChild, b.call(this, a, d), c(e || this.firstChild, null);else if ("afterend" === a) e = this.nextSibling, b.call(this, a, d), c(this.nextSibling, e);else throw new SyntaxError("The value provided (" + String(a) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
	      });
	    }

	    var d = Ke;
	    oe && K(Element.prototype, "attachShadow", function (a) {
	      return this.__CE_shadowRoot = a = oe.call(this, a);
	    });
	    pe && pe.get ? a(Element.prototype, pe) : Fe && Fe.get ? a(HTMLElement.prototype, Fe) : Vd(d, function (b) {
	      a(b, {
	        enumerable: !0,
	        configurable: !0,
	        get: function get() {
	          return ie.call(this, !0).innerHTML;
	        },
	        set: function set(a) {
	          var b = "template" === this.localName,
	              c = b ? this.content : this,
	              d = ce.call(document, this.namespaceURI, this.localName);

	          for (d.innerHTML = a; 0 < c.childNodes.length;) {
	            le.call(c, c.childNodes[0]);
	          }

	          for (a = b ? d.content : d; 0 < a.childNodes.length;) {
	            je.call(c, a.childNodes[0]);
	          }
	        }
	      });
	    });
	    K(Element.prototype, "setAttribute", function (a, b) {
	      if (1 !== this.__CE_state) return re.call(this, a, b);
	      var c = qe.call(this, a);
	      re.call(this, a, b);
	      b = qe.call(this, a);
	      d.attributeChangedCallback(this, a, c, b, null);
	    });
	    K(Element.prototype, "setAttributeNS", function (a, b, c) {
	      if (1 !== this.__CE_state) return ue.call(this, a, b, c);
	      var e = te.call(this, a, b);
	      ue.call(this, a, b, c);
	      c = te.call(this, a, b);
	      d.attributeChangedCallback(this, b, e, c, a);
	    });
	    K(Element.prototype, "removeAttribute", function (a) {
	      if (1 !== this.__CE_state) return se.call(this, a);
	      var b = qe.call(this, a);
	      se.call(this, a);
	      null !== b && d.attributeChangedCallback(this, a, b, null, null);
	    });
	    K(Element.prototype, "removeAttributeNS", function (a, b) {
	      if (1 !== this.__CE_state) return ve.call(this, a, b);
	      var c = te.call(this, a, b);
	      ve.call(this, a, b);
	      var e = te.call(this, a, b);
	      c !== e && d.attributeChangedCallback(this, b, c, e, a);
	    });
	    Ge ? b(HTMLElement.prototype, Ge) : we ? b(Element.prototype, we) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
	    He ? c(HTMLElement.prototype, He) : xe ? c(Element.prototype, xe) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");
	    Le(d, Element.prototype, {
	      ea: ye,
	      append: ze
	    });
	    Oe(d);
	  }
	  var Qe = window.customElements;

	  if (!Qe || Qe.forcePolyfill || "function" != typeof Qe.define || "function" != typeof Qe.get) {
	    var Ke = new Td();
	    Je();
	    Me();
	    Le(Ke, DocumentFragment.prototype, {
	      ea: ge,
	      append: he
	    });
	    Ne();
	    Pe();
	    document.__CE_hasRegistry = !0;
	    var customElements = new O(Ke);
	    Object.defineProperty(window, "customElements", {
	      configurable: !0,
	      enumerable: !0,
	      value: customElements
	    });
	  }

	  function Re() {
	    this.end = this.start = 0;
	    this.rules = this.parent = this.previous = null;
	    this.cssText = this.parsedCssText = "";
	    this.atRule = !1;
	    this.type = 0;
	    this.parsedSelector = this.selector = this.keyframesName = "";
	  }

	  function Se(a) {
	    a = a.replace(Te, "").replace(Ue, "");
	    var b = Ve,
	        c = a,
	        d = new Re();
	    d.start = 0;
	    d.end = c.length;

	    for (var e = d, f = 0, g = c.length; f < g; f++) {
	      if ("{" === c[f]) {
	        e.rules || (e.rules = []);
	        var h = e,
	            k = h.rules[h.rules.length - 1] || null;
	        e = new Re();
	        e.start = f + 1;
	        e.parent = h;
	        e.previous = k;
	        h.rules.push(e);
	      } else "}" === c[f] && (e.end = f + 1, e = e.parent || d);
	    }

	    return b(d, a);
	  }

	  function Ve(a, b) {
	    var c = b.substring(a.start, a.end - 1);
	    a.parsedCssText = a.cssText = c.trim();
	    a.parent && (c = b.substring(a.previous ? a.previous.end : a.parent.start, a.start - 1), c = We(c), c = c.replace(Xe, " "), c = c.substring(c.lastIndexOf(";") + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = 0 === c.indexOf("@"), a.atRule ? 0 === c.indexOf("@media") ? a.type = Ye : c.match(Ze) && (a.type = $e, a.keyframesName = a.selector.split(Xe).pop()) : a.type = 0 === c.indexOf("--") ? af : bf);
	    if (c = a.rules) for (var d = 0, e = c.length, f = void 0; d < e && (f = c[d]); d++) {
	      Ve(f, b);
	    }
	    return a;
	  }

	  function We(a) {
	    return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (a, c) {
	      a = c;

	      for (c = 6 - a.length; c--;) {
	        a = "0" + a;
	      }

	      return "\\" + a;
	    });
	  }

	  function cf(a, b, c) {
	    c = void 0 === c ? "" : c;
	    var d = "";

	    if (a.cssText || a.rules) {
	      var e = a.rules,
	          f;
	      if (f = e) f = e[0], f = !(f && f.selector && 0 === f.selector.indexOf("--"));

	      if (f) {
	        f = 0;

	        for (var g = e.length, h = void 0; f < g && (h = e[f]); f++) {
	          d = cf(h, b, d);
	        }
	      } else b ? b = a.cssText : (b = a.cssText, b = b.replace(df, "").replace(ef, ""), b = b.replace(ff, "").replace(gf, "")), (d = b.trim()) && (d = "  " + d + "\n");
	    }

	    d && (a.selector && (c += a.selector + " {\n"), c += d, a.selector && (c += "}\n\n"));
	    return c;
	  }

	  var bf = 1,
	      $e = 7,
	      Ye = 4,
	      af = 1E3,
	      Te = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
	      Ue = /@import[^;]*;/gim,
	      df = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
	      ef = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
	      ff = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
	      gf = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
	      Ze = /^@[^\s]*keyframes/,
	      Xe = /\s+/g;
	  var P = !(window.ShadyDOM && window.ShadyDOM.inUse),
	      hf;

	  function jf(a) {
	    hf = a && a.shimcssproperties ? !1 : P || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)"));
	  }

	  var kf;
	  window.ShadyCSS && void 0 !== window.ShadyCSS.cssBuild && (kf = window.ShadyCSS.cssBuild);
	  var lf = !(!window.ShadyCSS || !window.ShadyCSS.disableRuntime);
	  window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? hf = window.ShadyCSS.nativeCss : window.ShadyCSS ? (jf(window.ShadyCSS), window.ShadyCSS = void 0) : jf(window.WebComponents && window.WebComponents.flags);
	  var R = hf,
	      of = kf;
	  var pf = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
	      qf = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
	      rf = /(--[\w-]+)\s*([:,;)]|$)/gi,
	      sf = /(animation\s*:)|(animation-name\s*:)/,
	      tf = /@media\s(.*)/,
	      uf = /\{[^}]*\}/g;
	  var vf = new Set();

	  function wf(a, b) {
	    if (!a) return "";
	    "string" === typeof a && (a = Se(a));
	    b && xf(a, b);
	    return cf(a, R);
	  }

	  function yf(a) {
	    !a.__cssRules && a.textContent && (a.__cssRules = Se(a.textContent));
	    return a.__cssRules || null;
	  }

	  function zf(a) {
	    return !!a.parent && a.parent.type === $e;
	  }

	  function xf(a, b, c, d) {
	    if (a) {
	      var e = !1,
	          f = a.type;

	      if (d && f === Ye) {
	        var g = a.selector.match(tf);
	        g && (window.matchMedia(g[1]).matches || (e = !0));
	      }

	      f === bf ? b(a) : c && f === $e ? c(a) : f === af && (e = !0);
	      if ((a = a.rules) && !e) for (e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++) {
	        xf(g, b, c, d);
	      }
	    }
	  }

	  function Af(a, b, c, d) {
	    var e = document.createElement("style");
	    b && e.setAttribute("scope", b);
	    e.textContent = a;
	    Bf(e, c, d);
	    return e;
	  }

	  var Cf = null;

	  function Df(a) {
	    a = document.createComment(" Shady DOM styles for " + a + " ");
	    var b = document.head;
	    b.insertBefore(a, (Cf ? Cf.nextSibling : null) || b.firstChild);
	    return Cf = a;
	  }

	  function Bf(a, b, c) {
	    b = b || document.head;
	    b.insertBefore(a, c && c.nextSibling || b.firstChild);
	    Cf ? a.compareDocumentPosition(Cf) === Node.DOCUMENT_POSITION_PRECEDING && (Cf = a) : Cf = a;
	  }

	  function Ef(a, b) {
	    for (var c = 0, d = a.length; b < d; b++) {
	      if ("(" === a[b]) c++;else if (")" === a[b] && 0 === --c) return b;
	    }

	    return -1;
	  }

	  function Ff(a, b) {
	    var c = a.indexOf("var(");
	    if (-1 === c) return b(a, "", "", "");
	    var d = Ef(a, c + 3),
	        e = a.substring(c + 4, d);
	    c = a.substring(0, c);
	    a = Ff(a.substring(d + 1), b);
	    d = e.indexOf(",");
	    return -1 === d ? b(c, e.trim(), "", a) : b(c, e.substring(0, d).trim(), e.substring(d + 1).trim(), a);
	  }

	  function Gf(a, b) {
	    P ? a.setAttribute("class", b) : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b);
	  }

	  var Hf = window.ShadyDOM && window.ShadyDOM.wrap || function (a) {
	    return a;
	  };

	  function If(a) {
	    var b = a.localName,
	        c = "";
	    b ? -1 < b.indexOf("-") || (c = b, b = a.getAttribute && a.getAttribute("is") || "") : (b = a.is, c = a.extends);
	    return {
	      is: b,
	      W: c
	    };
	  }

	  function Jf(a) {
	    for (var b = [], c = "", d = 0; 0 <= d && d < a.length; d++) {
	      if ("(" === a[d]) {
	        var e = Ef(a, d);
	        c += a.slice(d, e + 1);
	        d = e;
	      } else "," === a[d] ? (b.push(c), c = "") : c += a[d];
	    }

	    c && b.push(c);
	    return b;
	  }

	  function Kf(a) {
	    if (void 0 !== of) return of;

	    if (void 0 === a.__cssBuild) {
	      var b = a.getAttribute("css-build");
	      if (b) a.__cssBuild = b;else {
	        a: {
	          b = "template" === a.localName ? a.content.firstChild : a.firstChild;

	          if (b instanceof Comment && (b = b.textContent.trim().split(":"), "css-build" === b[0])) {
	            b = b[1];
	            break a;
	          }

	          b = "";
	        }

	        if ("" !== b) {
	          var c = "template" === a.localName ? a.content.firstChild : a.firstChild;
	          c.parentNode.removeChild(c);
	        }

	        a.__cssBuild = b;
	      }
	    }

	    return a.__cssBuild || "";
	  }

	  function Lf(a) {
	    a = void 0 === a ? "" : a;
	    return "" !== a && R ? P ? "shadow" === a : "shady" === a : !1;
	  }

	  function Mf() {}

	  function Nf(a, b) {
	    Of(S, a, function (a) {
	      Pf(a, b || "");
	    });
	  }

	  function Of(a, b, c) {
	    b.nodeType === Node.ELEMENT_NODE && c(b);
	    var d;
	    "template" === b.localName ? d = (b.content || b._content || b).childNodes : d = b.children || b.childNodes;
	    if (d) for (b = 0; b < d.length; b++) {
	      Of(a, d[b], c);
	    }
	  }

	  function Pf(a, b, c) {
	    if (b) if (a.classList) c ? (a.classList.remove("style-scope"), a.classList.remove(b)) : (a.classList.add("style-scope"), a.classList.add(b));else if (a.getAttribute) {
	      var d = a.getAttribute("class");
	      c ? d && (b = d.replace("style-scope", "").replace(b, ""), Gf(a, b)) : Gf(a, (d ? d + " " : "") + "style-scope " + b);
	    }
	  }

	  function Qf(a, b, c) {
	    Of(S, a, function (a) {
	      Pf(a, b, !0);
	      Pf(a, c);
	    });
	  }

	  function Rf(a, b) {
	    Of(S, a, function (a) {
	      Pf(a, b || "", !0);
	    });
	  }

	  function Sf(a, b, c, d, e) {
	    var f = S;
	    e = void 0 === e ? "" : e;
	    "" === e && (P || "shady" === (void 0 === d ? "" : d) ? e = wf(b, c) : (a = If(a), e = Tf(f, b, a.is, a.W, c) + "\n\n"));
	    return e.trim();
	  }

	  function Tf(a, b, c, d, e) {
	    var f = Uf(c, d);
	    c = c ? "." + c : "";
	    return wf(b, function (b) {
	      b.c || (b.selector = b.C = Vf(a, b, a.b, c, f), b.c = !0);
	      e && e(b, c, f);
	    });
	  }

	  function Uf(a, b) {
	    return b ? "[is=" + a + "]" : a;
	  }

	  function Vf(a, b, c, d, e) {
	    var f = Jf(b.selector);

	    if (!zf(b)) {
	      b = 0;

	      for (var g = f.length, h = void 0; b < g && (h = f[b]); b++) {
	        f[b] = c.call(a, h, d, e);
	      }
	    }

	    return f.filter(function (a) {
	      return !!a;
	    }).join(",");
	  }

	  function Wf(a) {
	    return a.replace(Xf, function (a, c, d) {
	      -1 < d.indexOf("+") ? d = d.replace(/\+/g, "___") : -1 < d.indexOf("___") && (d = d.replace(/___/g, "+"));
	      return ":" + c + "(" + d + ")";
	    });
	  }

	  function Yf(a) {
	    for (var b = [], c; c = a.match(Zf);) {
	      var d = c.index,
	          e = Ef(a, d);
	      if (-1 === e) throw Error(c.input + " selector missing ')'");
	      c = a.slice(d, e + 1);
	      a = a.replace(c, "\uE000");
	      b.push(c);
	    }

	    return {
	      pa: a,
	      matches: b
	    };
	  }

	  function $f(a, b) {
	    var c = a.split("\uE000");
	    return b.reduce(function (a, b, f) {
	      return a + b + c[f + 1];
	    }, c[0]);
	  }

	  Mf.prototype.b = function (a, b, c) {
	    var d = !1;
	    a = a.trim();
	    var e = Xf.test(a);
	    e && (a = a.replace(Xf, function (a, b, c) {
	      return ":" + b + "(" + c.replace(/\s/g, "") + ")";
	    }), a = Wf(a));
	    var f = Zf.test(a);

	    if (f) {
	      var g = Yf(a);
	      a = g.pa;
	      g = g.matches;
	    }

	    a = a.replace(ag, ":host $1");
	    a = a.replace(bg, function (a, e, f) {
	      d || (a = cg(f, e, b, c), d = d || a.stop, e = a.Ha, f = a.value);
	      return e + f;
	    });
	    f && (a = $f(a, g));
	    e && (a = Wf(a));
	    return a;
	  };

	  function cg(a, b, c, d) {
	    var e = a.indexOf("::slotted");
	    0 <= a.indexOf(":host") ? a = dg(a, d) : 0 !== e && (a = c ? eg(a, c) : a);
	    c = !1;
	    0 <= e && (b = "", c = !0);

	    if (c) {
	      var f = !0;
	      c && (a = a.replace(fg, function (a, b) {
	        return " > " + b;
	      }));
	    }

	    a = a.replace(gg, function (a, b, c) {
	      return '[dir="' + c + '"] ' + b + ", " + b + '[dir="' + c + '"]';
	    });
	    return {
	      value: a,
	      Ha: b,
	      stop: f
	    };
	  }

	  function eg(a, b) {
	    a = a.split(/(\[.+?\])/);

	    for (var c = [], d = 0; d < a.length; d++) {
	      if (1 === d % 2) c.push(a[d]);else {
	        var e = a[d];
	        if ("" !== e || d !== a.length - 1) e = e.split(":"), e[0] += b, c.push(e.join(":"));
	      }
	    }

	    return c.join("");
	  }

	  function dg(a, b) {
	    var c = a.match(hg);
	    return (c = c && c[2].trim() || "") ? c[0].match(ig) ? a.replace(hg, function (a, c, f) {
	      return b + f;
	    }) : c.split(ig)[0] === b ? c : "should_not_match" : a.replace(":host", b);
	  }

	  function jg(a) {
	    ":root" === a.selector && (a.selector = "html");
	  }

	  Mf.prototype.c = function (a) {
	    return a.match(":host") ? "" : a.match("::slotted") ? this.b(a, ":not(.style-scope)") : eg(a.trim(), ":not(.style-scope)");
	  };

	  t.Object.defineProperties(Mf.prototype, {
	    a: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return "style-scope";
	      }
	    }
	  });
	  var Xf = /:(nth[-\w]+)\(([^)]+)\)/,
	      bg = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
	      ig = /[[.:#*]/,
	      ag = /^(::slotted)/,
	      hg = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
	      fg = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
	      gg = /(.*):dir\((?:(ltr|rtl))\)/,
	      Zf = /:(?:matches|any|-(?:webkit|moz)-any)/,
	      S = new Mf();

	  function kg(a, b, c, d, e) {
	    this.L = a || null;
	    this.b = b || null;
	    this.na = c || [];
	    this.G = null;
	    this.cssBuild = e || "";
	    this.W = d || "";
	    this.a = this.H = this.K = null;
	  }

	  function U(a) {
	    return a ? a.__styleInfo : null;
	  }

	  function lg(a, b) {
	    return a.__styleInfo = b;
	  }

	  kg.prototype.c = function () {
	    return this.L;
	  };

	  kg.prototype._getStyleRules = kg.prototype.c;

	  function mg(a) {
	    var b = this.matches || this.matchesSelector || this.mozMatchesSelector || this.msMatchesSelector || this.oMatchesSelector || this.webkitMatchesSelector;
	    return b && b.call(this, a);
	  }

	  var ng = navigator.userAgent.match("Trident");

	  function og() {}

	  function pg(a) {
	    var b = {},
	        c = [],
	        d = 0;
	    xf(a, function (a) {
	      qg(a);
	      a.index = d++;
	      a = a.A.cssText;

	      for (var c; c = rf.exec(a);) {
	        var e = c[1];
	        ":" !== c[2] && (b[e] = !0);
	      }
	    }, function (a) {
	      c.push(a);
	    });
	    a.b = c;
	    a = [];

	    for (var e in b) {
	      a.push(e);
	    }

	    return a;
	  }

	  function qg(a) {
	    if (!a.A) {
	      var b = {},
	          c = {};
	      rg(a, c) && (b.J = c, a.rules = null);
	      b.cssText = a.parsedCssText.replace(uf, "").replace(pf, "");
	      a.A = b;
	    }
	  }

	  function rg(a, b) {
	    var c = a.A;

	    if (c) {
	      if (c.J) return Object.assign(b, c.J), !0;
	    } else {
	      c = a.parsedCssText;

	      for (var d; a = pf.exec(c);) {
	        d = (a[2] || a[3]).trim();
	        if ("inherit" !== d || "unset" !== d) b[a[1].trim()] = d;
	        d = !0;
	      }

	      return d;
	    }
	  }

	  function sg(a, b, c) {
	    b && (b = 0 <= b.indexOf(";") ? tg(a, b, c) : Ff(b, function (b, e, f, g) {
	      if (!e) return b + g;
	      (e = sg(a, c[e], c)) && "initial" !== e ? "apply-shim-inherit" === e && (e = "inherit") : e = sg(a, c[f] || f, c) || f;
	      return b + (e || "") + g;
	    }));
	    return b && b.trim() || "";
	  }

	  function tg(a, b, c) {
	    b = b.split(";");

	    for (var d = 0, e, f; d < b.length; d++) {
	      if (e = b[d]) {
	        qf.lastIndex = 0;
	        if (f = qf.exec(e)) e = sg(a, c[f[1]], c);else if (f = e.indexOf(":"), -1 !== f) {
	          var g = e.substring(f);
	          g = g.trim();
	          g = sg(a, g, c) || g;
	          e = e.substring(0, f) + g;
	        }
	        b[d] = e && e.lastIndexOf(";") === e.length - 1 ? e.slice(0, -1) : e || "";
	      }
	    }

	    return b.join(";");
	  }

	  function ug(a, b) {
	    var c = {},
	        d = [];
	    xf(a, function (a) {
	      a.A || qg(a);
	      var e = a.C || a.parsedSelector;
	      b && a.A.J && e && mg.call(b, e) && (rg(a, c), a = a.index, e = parseInt(a / 32, 10), d[e] = (d[e] || 0) | 1 << a % 32);
	    }, null, !0);
	    return {
	      J: c,
	      key: d
	    };
	  }

	  function vg(a, b, c, d) {
	    b.A || qg(b);

	    if (b.A.J) {
	      var e = If(a);
	      a = e.is;
	      e = e.W;
	      e = a ? Uf(a, e) : "html";
	      var f = b.parsedSelector,
	          g = ":host > *" === f || "html" === f,
	          h = 0 === f.indexOf(":host") && !g;
	      "shady" === c && (g = f === e + " > *." + e || -1 !== f.indexOf("html"), h = !g && 0 === f.indexOf(e));
	      if (g || h) c = e, h && (b.C || (b.C = Vf(S, b, S.b, a ? "." + a : "", e)), c = b.C || e), d({
	        pa: c,
	        Oa: h,
	        ab: g
	      });
	    }
	  }

	  function wg(a, b, c) {
	    var d = {},
	        e = {};
	    xf(b, function (b) {
	      vg(a, b, c, function (c) {
	        mg.call(a._element || a, c.pa) && (c.Oa ? rg(b, d) : rg(b, e));
	      });
	    }, null, !0);
	    return {
	      Ta: e,
	      Ma: d
	    };
	  }

	  function xg(a, b, c, d) {
	    var e = If(b),
	        f = Uf(e.is, e.W),
	        g = new RegExp("(?:^|[^.#[:])" + (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) + "($|[.:[\\s>+~])"),
	        h = U(b);
	    e = h.L;
	    h = h.cssBuild;
	    var k = yg(e, d);
	    return Sf(b, e, function (b) {
	      var e = "";
	      b.A || qg(b);
	      b.A.cssText && (e = tg(a, b.A.cssText, c));
	      b.cssText = e;

	      if (!P && !zf(b) && b.cssText) {
	        var h = e = b.cssText;
	        null == b.ta && (b.ta = sf.test(e));
	        if (b.ta) if (null == b.da) {
	          b.da = [];

	          for (var m in k) {
	            h = k[m], h = h(e), e !== h && (e = h, b.da.push(m));
	          }
	        } else {
	          for (m = 0; m < b.da.length; ++m) {
	            h = k[b.da[m]], e = h(e);
	          }

	          h = e;
	        }
	        b.cssText = h;
	        b.C = b.C || b.selector;
	        e = "." + d;
	        m = Jf(b.C);
	        h = 0;

	        for (var u = m.length, x = void 0; h < u && (x = m[h]); h++) {
	          m[h] = x.match(g) ? x.replace(f, e) : e + " " + x;
	        }

	        b.selector = m.join(",");
	      }
	    }, h);
	  }

	  function yg(a, b) {
	    a = a.b;
	    var c = {};
	    if (!P && a) for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
	      var f = e,
	          g = b;
	      f.f = new RegExp("\\b" + f.keyframesName + "(?!\\B|-)", "g");
	      f.a = f.keyframesName + "-" + g;
	      f.C = f.C || f.selector;
	      f.selector = f.C.replace(f.keyframesName, f.a);
	      c[e.keyframesName] = zg(e);
	    }
	    return c;
	  }

	  function zg(a) {
	    return function (b) {
	      return b.replace(a.f, a.a);
	    };
	  }

	  function Ag(a, b) {
	    var c = Bg,
	        d = yf(a);
	    a.textContent = wf(d, function (a) {
	      var d = a.cssText = a.parsedCssText;
	      a.A && a.A.cssText && (d = d.replace(df, "").replace(ef, ""), a.cssText = tg(c, d, b));
	    });
	  }

	  t.Object.defineProperties(og.prototype, {
	    a: {
	      configurable: !0,
	      enumerable: !0,
	      get: function get() {
	        return "x-scope";
	      }
	    }
	  });
	  var Bg = new og();
	  var Cg = {},
	      Dg = window.customElements;

	  if (Dg && !P && !lf) {
	    var Eg = Dg.define;

	    Dg.define = function (a, b, c) {
	      Cg[a] || (Cg[a] = Df(a));
	      Eg.call(Dg, a, b, c);
	    };
	  }

	  function Fg() {
	    this.cache = {};
	  }

	  Fg.prototype.store = function (a, b, c, d) {
	    var e = this.cache[a] || [];
	    e.push({
	      J: b,
	      styleElement: c,
	      H: d
	    });
	    100 < e.length && e.shift();
	    this.cache[a] = e;
	  };

	  function Gg() {}

	  var Hg = new RegExp(S.a + "\\s*([^\\s]*)");

	  function Ig(a) {
	    return (a = (a.classList && a.classList.value ? a.classList.value : a.getAttribute("class") || "").match(Hg)) ? a[1] : "";
	  }

	  function Jg(a) {
	    var b = Hf(a).getRootNode();
	    return b === a || b === a.ownerDocument ? "" : (a = b.host) ? If(a).is : "";
	  }

	  function Kg(a) {
	    for (var b = 0; b < a.length; b++) {
	      var c = a[b];
	      if (c.target !== document.documentElement && c.target !== document.head) for (var d = 0; d < c.addedNodes.length; d++) {
	        var e = c.addedNodes[d];

	        if (e.nodeType === Node.ELEMENT_NODE) {
	          var f = e.getRootNode(),
	              g = Ig(e);
	          if (g && f === e.ownerDocument && ("style" !== e.localName && "template" !== e.localName || "" === Kf(e))) Rf(e, g);else if (f instanceof ShadowRoot) for (f = Jg(e), f !== g && Qf(e, g, f), e = window.ShadyDOM.nativeMethods.querySelectorAll.call(e, ":not(." + S.a + ")"), g = 0; g < e.length; g++) {
	            f = e[g];
	            var h = Jg(f);
	            h && Pf(f, h);
	          }
	        }
	      }
	    }
	  }

	  if (!(P || window.ShadyDOM && window.ShadyDOM.handlesDynamicScoping)) {
	    var Lg = new MutationObserver(Kg),
	        Mg = function Mg(a) {
	      Lg.observe(a, {
	        childList: !0,
	        subtree: !0
	      });
	    };

	    if (window.customElements && !window.customElements.polyfillWrapFlushCallback) Mg(document);else {
	      var Ng = function Ng() {
	        Mg(document.body);
	      };

	      window.HTMLImports ? window.HTMLImports.whenReady(Ng) : requestAnimationFrame(function () {
	        if ("loading" === document.readyState) {
	          var a = function a() {
	            Ng();
	            document.removeEventListener("readystatechange", a);
	          };

	          document.addEventListener("readystatechange", a);
	        } else Ng();
	      });
	    }

	    Gg = function Gg() {
	      Kg(Lg.takeRecords());
	    };
	  }

	  var Og = Gg;
	  var Pg = {};
	  var Qg = Promise.resolve();

	  function Rg(a) {
	    if (a = Pg[a]) a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1;
	  }

	  function Sg(a) {
	    return a._applyShimCurrentVersion === a._applyShimNextVersion;
	  }

	  function Tg(a) {
	    a._applyShimValidatingVersion = a._applyShimNextVersion;
	    a._validating || (a._validating = !0, Qg.then(function () {
	      a._applyShimCurrentVersion = a._applyShimNextVersion;
	      a._validating = !1;
	    }));
	  }
	  var Ug = {},
	      Vg = new Fg();

	  function V() {
	    this.F = {};
	    this.c = document.documentElement;
	    var a = new Re();
	    a.rules = [];
	    this.f = lg(this.c, new kg(a));
	    this.u = !1;
	    this.b = this.a = null;
	  }

	  r = V.prototype;

	  r.flush = function () {
	    Og();
	  };

	  r.Ka = function (a) {
	    return yf(a);
	  };

	  r.Xa = function (a) {
	    return wf(a);
	  };

	  r.prepareTemplate = function (a, b, c) {
	    this.prepareTemplateDom(a, b);
	    this.prepareTemplateStyles(a, b, c);
	  };

	  r.prepareTemplateStyles = function (a, b, c) {
	    if (!a._prepared && !lf) {
	      P || Cg[b] || (Cg[b] = Df(b));
	      a._prepared = !0;
	      a.name = b;
	      a.extends = c;
	      Pg[b] = a;
	      var d = Kf(a),
	          e = Lf(d);
	      c = {
	        is: b,
	        extends: c
	      };

	      for (var f = [], g = a.content.querySelectorAll("style"), h = 0; h < g.length; h++) {
	        var k = g[h];

	        if (k.hasAttribute("shady-unscoped")) {
	          if (!P) {
	            var m = k.textContent;
	            vf.has(m) || (vf.add(m), m = k.cloneNode(!0), document.head.appendChild(m));
	            k.parentNode.removeChild(k);
	          }
	        } else f.push(k.textContent), k.parentNode.removeChild(k);
	      }

	      f = f.join("").trim() + (Ug[b] || "");
	      Wg(this);

	      if (!e) {
	        if (g = !d) g = qf.test(f) || pf.test(f), qf.lastIndex = 0, pf.lastIndex = 0;
	        h = Se(f);
	        g && R && this.a && this.a.transformRules(h, b);
	        a._styleAst = h;
	      }

	      g = [];
	      R || (g = pg(a._styleAst));
	      if (!g.length || R) h = P ? a.content : null, b = Cg[b] || null, d = Sf(c, a._styleAst, null, d, e ? f : ""), d = d.length ? Af(d, c.is, h, b) : null, a._style = d;
	      a.a = g;
	    }
	  };

	  r.Sa = function (a, b) {
	    Ug[b] = a.join(" ");
	  };

	  r.prepareTemplateDom = function (a, b) {
	    if (!lf) {
	      var c = Kf(a);
	      P || "shady" === c || a._domPrepared || (a._domPrepared = !0, Nf(a.content, b));
	    }
	  };

	  function Xg(a) {
	    var b = If(a),
	        c = b.is;
	    b = b.W;
	    var d = Cg[c] || null,
	        e = Pg[c];

	    if (e) {
	      c = e._styleAst;
	      var f = e.a;
	      e = Kf(e);
	      b = new kg(c, d, f, b, e);
	      lg(a, b);
	      return b;
	    }
	  }

	  function Yg(a) {
	    !a.b && window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && (a.b = window.ShadyCSS.CustomStyleInterface, a.b.transformCallback = function (b) {
	      a.wa(b);
	    }, a.b.validateCallback = function () {
	      requestAnimationFrame(function () {
	        (a.b.enqueued || a.u) && a.flushCustomStyles();
	      });
	    });
	  }

	  function Wg(a) {
	    !a.a && window.ShadyCSS && window.ShadyCSS.ApplyShim && (a.a = window.ShadyCSS.ApplyShim, a.a.invalidCallback = Rg);
	    Yg(a);
	  }

	  r.flushCustomStyles = function () {
	    if (!lf && (Wg(this), this.b)) {
	      var a = this.b.processStyles();

	      if (this.b.enqueued && !Lf(this.f.cssBuild)) {
	        if (R) {
	          if (!this.f.cssBuild) for (var b = 0; b < a.length; b++) {
	            var c = this.b.getStyleForCustomStyle(a[b]);

	            if (c && R && this.a) {
	              var d = yf(c);
	              Wg(this);
	              this.a.transformRules(d);
	              c.textContent = wf(d);
	            }
	          }
	        } else {
	          Zg(this, this.c, this.f);

	          for (b = 0; b < a.length; b++) {
	            (c = this.b.getStyleForCustomStyle(a[b])) && Ag(c, this.f.K);
	          }

	          this.u && this.styleDocument();
	        }

	        this.b.enqueued = !1;
	      }
	    }
	  };

	  r.styleElement = function (a, b) {
	    if (lf) {
	      if (b) {
	        U(a) || lg(a, new kg(null));
	        var c = U(a);
	        c.G = c.G || {};
	        Object.assign(c.G, b);
	        $g(this, a, c);
	      }
	    } else if (c = U(a) || Xg(a)) if (a !== this.c && (this.u = !0), b && (c.G = c.G || {}, Object.assign(c.G, b)), R) $g(this, a, c);else if (this.flush(), Zg(this, a, c), c.na && c.na.length) {
	      b = If(a).is;
	      var d;

	      a: {
	        if (d = Vg.cache[b]) for (var e = d.length - 1; 0 <= e; e--) {
	          var f = d[e];

	          b: {
	            var g = c.na;

	            for (var h = 0; h < g.length; h++) {
	              var k = g[h];

	              if (f.J[k] !== c.K[k]) {
	                g = !1;
	                break b;
	              }
	            }

	            g = !0;
	          }

	          if (g) {
	            d = f;
	            break a;
	          }
	        }
	        d = void 0;
	      }

	      g = d ? d.styleElement : null;
	      e = c.H;
	      (f = d && d.H) || (f = this.F[b] = (this.F[b] || 0) + 1, f = b + "-" + f);
	      c.H = f;
	      f = c.H;
	      h = Bg;
	      h = g ? g.textContent || "" : xg(h, a, c.K, f);
	      k = U(a);
	      var m = k.a;
	      m && !P && m !== g && (m._useCount--, 0 >= m._useCount && m.parentNode && m.parentNode.removeChild(m));
	      P ? k.a ? (k.a.textContent = h, g = k.a) : h && (g = Af(h, f, a.shadowRoot, k.b)) : g ? g.parentNode || (ng && -1 < h.indexOf("@media") && (g.textContent = h), Bf(g, null, k.b)) : h && (g = Af(h, f, null, k.b));
	      g && (g._useCount = g._useCount || 0, k.a != g && g._useCount++, k.a = g);
	      f = g;
	      P || (g = c.H, k = h = a.getAttribute("class") || "", e && (k = h.replace(new RegExp("\\s*x-scope\\s*" + e + "\\s*", "g"), " ")), k += (k ? " " : "") + "x-scope " + g, h !== k && Gf(a, k));
	      d || Vg.store(b, c.K, f, c.H);
	    }
	  };

	  function $g(a, b, c) {
	    var d = If(b).is;

	    if (c.G) {
	      var e = c.G,
	          f;

	      for (f in e) {
	        null === f ? b.style.removeProperty(f) : b.style.setProperty(f, e[f]);
	      }
	    }

	    e = Pg[d];

	    if (!(!e && b !== a.c || e && "" !== Kf(e)) && e && e._style && !Sg(e)) {
	      if (Sg(e) || e._applyShimValidatingVersion !== e._applyShimNextVersion) Wg(a), a.a && a.a.transformRules(e._styleAst, d), e._style.textContent = Sf(b, c.L), Tg(e);
	      P && (a = b.shadowRoot) && (a = a.querySelector("style")) && (a.textContent = Sf(b, c.L));
	      c.L = e._styleAst;
	    }
	  }

	  function ah(a, b) {
	    return (b = Hf(b).getRootNode().host) ? U(b) || Xg(b) ? b : ah(a, b) : a.c;
	  }

	  function Zg(a, b, c) {
	    var d = ah(a, b),
	        e = U(d),
	        f = e.K;
	    d === a.c || f || (Zg(a, d, e), f = e.K);
	    a = Object.create(f || null);
	    d = wg(b, c.L, c.cssBuild);
	    b = ug(e.L, b).J;
	    Object.assign(a, d.Ma, b, d.Ta);
	    b = c.G;

	    for (var g in b) {
	      if ((e = b[g]) || 0 === e) a[g] = e;
	    }

	    g = Bg;
	    b = Object.getOwnPropertyNames(a);

	    for (e = 0; e < b.length; e++) {
	      d = b[e], a[d] = sg(g, a[d], a);
	    }

	    c.K = a;
	  }

	  r.styleDocument = function (a) {
	    this.styleSubtree(this.c, a);
	  };

	  r.styleSubtree = function (a, b) {
	    var c = Hf(a),
	        d = c.shadowRoot;
	    (d || a === this.c) && this.styleElement(a, b);
	    if (a = d && (d.children || d.childNodes)) for (c = 0; c < a.length; c++) {
	      this.styleSubtree(a[c]);
	    } else if (c = c.children || c.childNodes) for (a = 0; a < c.length; a++) {
	      this.styleSubtree(c[a]);
	    }
	  };

	  r.wa = function (a) {
	    var b = this,
	        c = Kf(a);
	    c !== this.f.cssBuild && (this.f.cssBuild = c);

	    if (!Lf(c)) {
	      var d = yf(a);
	      xf(d, function (a) {
	        if (P) jg(a);else {
	          var d = S;
	          a.selector = a.parsedSelector;
	          jg(a);
	          a.selector = a.C = Vf(d, a, d.c, void 0, void 0);
	        }
	        R && "" === c && (Wg(b), b.a && b.a.transformRule(a));
	      });
	      R ? a.textContent = wf(d) : this.f.L.rules.push(d);
	    }
	  };

	  r.getComputedStyleValue = function (a, b) {
	    var c;
	    R || (c = (U(a) || U(ah(this, a))).K[b]);
	    return (c = c || window.getComputedStyle(a).getPropertyValue(b)) ? c.trim() : "";
	  };

	  r.Wa = function (a, b) {
	    var c = Hf(a).getRootNode();
	    b = b ? b.split(/\s/) : [];
	    c = c.host && c.host.localName;

	    if (!c) {
	      var d = a.getAttribute("class");

	      if (d) {
	        d = d.split(/\s/);

	        for (var e = 0; e < d.length; e++) {
	          if (d[e] === S.a) {
	            c = d[e + 1];
	            break;
	          }
	        }
	      }
	    }

	    c && b.push(S.a, c);
	    R || (c = U(a)) && c.H && b.push(Bg.a, c.H);
	    Gf(a, b.join(" "));
	  };

	  r.Fa = function (a) {
	    return U(a);
	  };

	  r.Va = function (a, b) {
	    Pf(a, b);
	  };

	  r.Ya = function (a, b) {
	    Pf(a, b, !0);
	  };

	  r.Ua = function (a) {
	    return Jg(a);
	  };

	  r.Ia = function (a) {
	    return Ig(a);
	  };

	  V.prototype.flush = V.prototype.flush;
	  V.prototype.prepareTemplate = V.prototype.prepareTemplate;
	  V.prototype.styleElement = V.prototype.styleElement;
	  V.prototype.styleDocument = V.prototype.styleDocument;
	  V.prototype.styleSubtree = V.prototype.styleSubtree;
	  V.prototype.getComputedStyleValue = V.prototype.getComputedStyleValue;
	  V.prototype.setElementClass = V.prototype.Wa;
	  V.prototype._styleInfoForNode = V.prototype.Fa;
	  V.prototype.transformCustomStyleForDocument = V.prototype.wa;
	  V.prototype.getStyleAst = V.prototype.Ka;
	  V.prototype.styleAstToString = V.prototype.Xa;
	  V.prototype.flushCustomStyles = V.prototype.flushCustomStyles;
	  V.prototype.scopeNode = V.prototype.Va;
	  V.prototype.unscopeNode = V.prototype.Ya;
	  V.prototype.scopeForNode = V.prototype.Ua;
	  V.prototype.currentScopeForNode = V.prototype.Ia;
	  V.prototype.prepareAdoptedCssText = V.prototype.Sa;
	  Object.defineProperties(V.prototype, {
	    nativeShadow: {
	      get: function get() {
	        return P;
	      }
	    },
	    nativeCss: {
	      get: function get() {
	        return R;
	      }
	    }
	  });
	  var W = new V(),
	      bh,
	      ch;
	  window.ShadyCSS && (bh = window.ShadyCSS.ApplyShim, ch = window.ShadyCSS.CustomStyleInterface);
	  window.ShadyCSS = {
	    ScopingShim: W,
	    prepareTemplate: function prepareTemplate(a, b, c) {
	      W.flushCustomStyles();
	      W.prepareTemplate(a, b, c);
	    },
	    prepareTemplateDom: function prepareTemplateDom(a, b) {
	      W.prepareTemplateDom(a, b);
	    },
	    prepareTemplateStyles: function prepareTemplateStyles(a, b, c) {
	      W.flushCustomStyles();
	      W.prepareTemplateStyles(a, b, c);
	    },
	    styleSubtree: function styleSubtree(a, b) {
	      W.flushCustomStyles();
	      W.styleSubtree(a, b);
	    },
	    styleElement: function styleElement(a) {
	      W.flushCustomStyles();
	      W.styleElement(a);
	    },
	    styleDocument: function styleDocument(a) {
	      W.flushCustomStyles();
	      W.styleDocument(a);
	    },
	    flushCustomStyles: function flushCustomStyles() {
	      W.flushCustomStyles();
	    },
	    getComputedStyleValue: function getComputedStyleValue(a, b) {
	      return W.getComputedStyleValue(a, b);
	    },
	    nativeCss: R,
	    nativeShadow: P,
	    cssBuild: of,
	    disableRuntime: lf
	  };
	  bh && (window.ShadyCSS.ApplyShim = bh);
	  ch && (window.ShadyCSS.CustomStyleInterface = ch);

	  (function (a) {
	    function b(a) {
	      "" == a && (f.call(this), this.i = !0);
	      return a.toLowerCase();
	    }

	    function c(a) {
	      var b = a.charCodeAt(0);
	      return 32 < b && 127 > b && -1 == [34, 35, 60, 62, 63, 96].indexOf(b) ? a : encodeURIComponent(a);
	    }

	    function d(a) {
	      var b = a.charCodeAt(0);
	      return 32 < b && 127 > b && -1 == [34, 35, 60, 62, 96].indexOf(b) ? a : encodeURIComponent(a);
	    }

	    function e(a, e, g) {
	      function h(a) {
	      }

	      var k = e || "scheme start",
	          x = 0,
	          q = "",
	          u = !1,
	          Q = !1;

	      a: for (; (void 0 != a[x - 1] || 0 == x) && !this.i;) {
	        var l = a[x];

	        switch (k) {
	          case "scheme start":
	            if (l && p.test(l)) q += l.toLowerCase(), k = "scheme";else if (e) {
	              break a;
	            } else {
	              q = "";
	              k = "no scheme";
	              continue;
	            }
	            break;

	          case "scheme":
	            if (l && G.test(l)) q += l.toLowerCase();else if (":" == l) {
	              this.h = q;
	              q = "";
	              if (e) break a;
	              void 0 !== m[this.h] && (this.B = !0);
	              k = "file" == this.h ? "relative" : this.B && g && g.h == this.h ? "relative or authority" : this.B ? "authority first slash" : "scheme data";
	            } else if (e) {
	              break a;
	            } else {
	              q = "";
	              x = 0;
	              k = "no scheme";
	              continue;
	            }
	            break;

	          case "scheme data":
	            "?" == l ? (this.o = "?", k = "query") : "#" == l ? (this.v = "#", k = "fragment") : void 0 != l && "\t" != l && "\n" != l && "\r" != l && (this.la += c(l));
	            break;

	          case "no scheme":
	            if (g && void 0 !== m[g.h]) {
	              k = "relative";
	              continue;
	            } else f.call(this), this.i = !0;

	            break;

	          case "relative or authority":
	            if ("/" == l && "/" == a[x + 1]) k = "authority ignore slashes";else {
	              k = "relative";
	              continue;
	            }
	            break;

	          case "relative":
	            this.B = !0;
	            "file" != this.h && (this.h = g.h);

	            if (void 0 == l) {
	              this.j = g.j;
	              this.m = g.m;
	              this.l = g.l.slice();
	              this.o = g.o;
	              this.s = g.s;
	              this.g = g.g;
	              break a;
	            } else if ("/" == l || "\\" == l) k = "relative slash";else if ("?" == l) this.j = g.j, this.m = g.m, this.l = g.l.slice(), this.o = "?", this.s = g.s, this.g = g.g, k = "query";else if ("#" == l) this.j = g.j, this.m = g.m, this.l = g.l.slice(), this.o = g.o, this.v = "#", this.s = g.s, this.g = g.g, k = "fragment";else {
	              k = a[x + 1];
	              var y = a[x + 2];
	              if ("file" != this.h || !p.test(l) || ":" != k && "|" != k || void 0 != y && "/" != y && "\\" != y && "?" != y && "#" != y) this.j = g.j, this.m = g.m, this.s = g.s, this.g = g.g, this.l = g.l.slice(), this.l.pop();
	              k = "relative path";
	              continue;
	            }

	            break;

	          case "relative slash":
	            if ("/" == l || "\\" == l) k = "file" == this.h ? "file host" : "authority ignore slashes";else {
	              "file" != this.h && (this.j = g.j, this.m = g.m, this.s = g.s, this.g = g.g);
	              k = "relative path";
	              continue;
	            }
	            break;

	          case "authority first slash":
	            if ("/" == l) k = "authority second slash";else {
	              k = "authority ignore slashes";
	              continue;
	            }
	            break;

	          case "authority second slash":
	            k = "authority ignore slashes";

	            if ("/" != l) {
	              continue;
	            }

	            break;

	          case "authority ignore slashes":
	            if ("/" != l && "\\" != l) {
	              k = "authority";
	              continue;
	            }

	            break;

	          case "authority":
	            if ("@" == l) {
	              u && (q += "%40");
	              u = !0;

	              for (l = 0; l < q.length; l++) {
	                y = q[l], "\t" == y || "\n" == y || "\r" == y ? h("Invalid whitespace in authority.") : ":" == y && null === this.g ? this.g = "" : (y = c(y), null !== this.g ? this.g += y : this.s += y);
	              }

	              q = "";
	            } else if (void 0 == l || "/" == l || "\\" == l || "?" == l || "#" == l) {
	              x -= q.length;
	              q = "";
	              k = "host";
	              continue;
	            } else q += l;

	            break;

	          case "file host":
	            if (void 0 == l || "/" == l || "\\" == l || "?" == l || "#" == l) {
	              2 != q.length || !p.test(q[0]) || ":" != q[1] && "|" != q[1] ? (0 != q.length && (this.j = b.call(this, q), q = ""), k = "relative path start") : k = "relative path";
	              continue;
	            } else "\t" == l || "\n" == l || "\r" == l ? h("Invalid whitespace in file host.") : q += l;

	            break;

	          case "host":
	          case "hostname":
	            if (":" != l || Q) {
	              if (void 0 == l || "/" == l || "\\" == l || "?" == l || "#" == l) {
	                this.j = b.call(this, q);
	                q = "";
	                k = "relative path start";
	                if (e) break a;
	                continue;
	              } else "\t" != l && "\n" != l && "\r" != l ? ("[" == l ? Q = !0 : "]" == l && (Q = !1), q += l) : h("Invalid code point in host/hostname: " + l);
	            } else if (this.j = b.call(this, q), q = "", k = "port", "hostname" == e) break a;
	            break;

	          case "port":
	            if (/[0-9]/.test(l)) q += l;else if (void 0 == l || "/" == l || "\\" == l || "?" == l || "#" == l || e) {
	              "" != q && (q = parseInt(q, 10), q != m[this.h] && (this.m = q + ""), q = "");
	              if (e) break a;
	              k = "relative path start";
	              continue;
	            } else "\t" == l || "\n" == l || "\r" == l ? h("Invalid code point in port: " + l) : (f.call(this), this.i = !0);
	            break;

	          case "relative path start":
	            k = "relative path";
	            if ("/" != l && "\\" != l) continue;
	            break;

	          case "relative path":
	            if (void 0 != l && "/" != l && "\\" != l && (e || "?" != l && "#" != l)) "\t" != l && "\n" != l && "\r" != l && (q += c(l));else {
	              if (y = n[q.toLowerCase()]) q = y;
	              ".." == q ? (this.l.pop(), "/" != l && "\\" != l && this.l.push("")) : "." == q && "/" != l && "\\" != l ? this.l.push("") : "." != q && ("file" == this.h && 0 == this.l.length && 2 == q.length && p.test(q[0]) && "|" == q[1] && (q = q[0] + ":"), this.l.push(q));
	              q = "";
	              "?" == l ? (this.o = "?", k = "query") : "#" == l && (this.v = "#", k = "fragment");
	            }
	            break;

	          case "query":
	            e || "#" != l ? void 0 != l && "\t" != l && "\n" != l && "\r" != l && (this.o += d(l)) : (this.v = "#", k = "fragment");
	            break;

	          case "fragment":
	            void 0 != l && "\t" != l && "\n" != l && "\r" != l && (this.v += l);
	        }

	        x++;
	      }
	    }

	    function f() {
	      this.s = this.la = this.h = "";
	      this.g = null;
	      this.m = this.j = "";
	      this.l = [];
	      this.v = this.o = "";
	      this.B = this.i = !1;
	    }

	    function g(a, b) {
	      void 0 === b || b instanceof g || (b = new g(String(b)));
	      this.a = a;
	      f.call(this);
	      a = this.a.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");
	      e.call(this, a, null, b);
	    }

	    var h = !1;

	    try {
	      var k = new URL("b", "http://a");
	      k.pathname = "c%20d";
	      h = "http://a/c%20d" === k.href;
	    } catch (x) {}

	    if (!h) {
	      var m = Object.create(null);
	      m.ftp = 21;
	      m.file = 0;
	      m.gopher = 70;
	      m.http = 80;
	      m.https = 443;
	      m.ws = 80;
	      m.wss = 443;
	      var n = Object.create(null);
	      n["%2e"] = ".";
	      n[".%2e"] = "..";
	      n["%2e."] = "..";
	      n["%2e%2e"] = "..";
	      var p = /[a-zA-Z]/,
	          G = /[a-zA-Z0-9\+\-\.]/;
	      g.prototype = {
	        toString: function toString() {
	          return this.href;
	        },

	        get href() {
	          if (this.i) return this.a;
	          var a = "";
	          if ("" != this.s || null != this.g) a = this.s + (null != this.g ? ":" + this.g : "") + "@";
	          return this.protocol + (this.B ? "//" + a + this.host : "") + this.pathname + this.o + this.v;
	        },

	        set href(a) {
	          f.call(this);
	          e.call(this, a);
	        },

	        get protocol() {
	          return this.h + ":";
	        },

	        set protocol(a) {
	          this.i || e.call(this, a + ":", "scheme start");
	        },

	        get host() {
	          return this.i ? "" : this.m ? this.j + ":" + this.m : this.j;
	        },

	        set host(a) {
	          !this.i && this.B && e.call(this, a, "host");
	        },

	        get hostname() {
	          return this.j;
	        },

	        set hostname(a) {
	          !this.i && this.B && e.call(this, a, "hostname");
	        },

	        get port() {
	          return this.m;
	        },

	        set port(a) {
	          !this.i && this.B && e.call(this, a, "port");
	        },

	        get pathname() {
	          return this.i ? "" : this.B ? "/" + this.l.join("/") : this.la;
	        },

	        set pathname(a) {
	          !this.i && this.B && (this.l = [], e.call(this, a, "relative path start"));
	        },

	        get search() {
	          return this.i || !this.o || "?" == this.o ? "" : this.o;
	        },

	        set search(a) {
	          !this.i && this.B && (this.o = "?", "?" == a[0] && (a = a.slice(1)), e.call(this, a, "query"));
	        },

	        get hash() {
	          return this.i || !this.v || "#" == this.v ? "" : this.v;
	        },

	        set hash(a) {
	          this.i || (a ? (this.v = "#", "#" == a[0] && (a = a.slice(1)), e.call(this, a, "fragment")) : this.v = "");
	        },

	        get origin() {
	          var a;
	          if (this.i || !this.h) return "";

	          switch (this.h) {
	            case "data":
	            case "file":
	            case "javascript":
	            case "mailto":
	              return "null";
	          }

	          return (a = this.host) ? this.h + "://" + a : "";
	        }

	      };
	      var u = a.URL;
	      u && (g.createObjectURL = function (a) {
	        return u.createObjectURL.apply(u, arguments);
	      }, g.revokeObjectURL = function (a) {
	        u.revokeObjectURL(a);
	      });
	      a.URL = g;
	    }
	  })(window);

	  Object.getOwnPropertyDescriptor(Node.prototype, "baseURI") || Object.defineProperty(Node.prototype, "baseURI", {
	    get: function get() {
	      var a = (this.ownerDocument || this).querySelector("base[href]");
	      return a && a.href || window.location.href;
	    },
	    configurable: !0,
	    enumerable: !0
	  });
	  var dh = document.createElement("style");
	  dh.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";
	  var eh = document.querySelector("head");
	  eh.insertBefore(dh, eh.firstChild);
	  var fh = window.customElements,
	      gh = !1,
	      hh = null;
	  fh.polyfillWrapFlushCallback && fh.polyfillWrapFlushCallback(function (a) {
	    hh = a;
	    gh && a();
	  });

	  function ih() {
	    window.HTMLTemplateElement.bootstrap && window.HTMLTemplateElement.bootstrap(window.document);
	    hh && hh();
	    gh = !0;
	    window.WebComponents.ready = !0;
	    document.dispatchEvent(new CustomEvent("WebComponentsReady", {
	      bubbles: !0
	    }));
	  }

	  "complete" !== document.readyState ? (window.addEventListener("load", ih), window.addEventListener("DOMContentLoaded", function () {
	    window.removeEventListener("load", ih);
	    ih();
	  })) : ih();
	}).call(commonjsGlobal);

	function _taggedTemplateLiteralLoose(strings, raw) {
	  if (!raw) {
	    raw = strings.slice(0);
	  }

	  strings.raw = raw;
	  return strings;
	}

	var taggedTemplateLiteralLoose = _taggedTemplateLiteralLoose;

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

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	var inheritsLoose = _inheritsLoose;

	/**
	 * @license
	 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */
	var directives = new WeakMap();
	var isDirective = function isDirective(o) {
	  return typeof o === 'function' && directives.has(o);
	};

	/**
	 * @license
	 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */
	var isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
	var reparentNodes = function reparentNodes(container, start, end, before) {
	  if (end === void 0) {
	    end = null;
	  }

	  if (before === void 0) {
	    before = null;
	  }

	  var node = start;

	  while (node !== end) {
	    var n = node.nextSibling;
	    container.insertBefore(node, before);
	    node = n;
	  }
	};
	var removeNodes = function removeNodes(container, startNode, endNode) {
	  if (endNode === void 0) {
	    endNode = null;
	  }

	  var node = startNode;

	  while (node !== endNode) {
	    var n = node.nextSibling;
	    container.removeChild(node);
	    node = n;
	  }
	};

	/**
	 * @license
	 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */
	var noChange = {};
	var nothing = {};

	/**
	 * @license
	 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */
	var marker = "{{lit-" + String(Math.random()).slice(2) + "}}";
	var nodeMarker = "<!--" + marker + "-->";
	var markerRegex = new RegExp(marker + "|" + nodeMarker);
	var boundAttributeSuffix = '$lit$';
	var Template = function Template(result, element) {
	  var _this = this;

	  this.parts = [];
	  this.element = element;
	  var index = -1;
	  var partIndex = 0;
	  var nodesToRemove = [];

	  var _prepareTemplate = function _prepareTemplate(template) {
	    var content = template.content;
	    var walker = document.createTreeWalker(content, 133, null, false);
	    var lastPartIndex = 0;

	    while (walker.nextNode()) {
	      index++;
	      var node = walker.currentNode;

	      if (node.nodeType === 1) {
	          if (node.hasAttributes()) {
	            var attributes = node.attributes;
	            var count = 0;

	            for (var i = 0; i < attributes.length; i++) {
	              if (attributes[i].value.indexOf(marker) >= 0) {
	                count++;
	              }
	            }

	            while (count-- > 0) {
	              var stringForPart = result.strings[partIndex];
	              var name = lastAttributeNameRegex.exec(stringForPart)[2];
	              var attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
	              var attributeValue = node.getAttribute(attributeLookupName);
	              var strings = attributeValue.split(markerRegex);

	              _this.parts.push({
	                type: 'attribute',
	                index: index,
	                name: name,
	                strings: strings
	              });

	              node.removeAttribute(attributeLookupName);
	              partIndex += strings.length - 1;
	            }
	          }

	          if (node.tagName === 'TEMPLATE') {
	            _prepareTemplate(node);
	          }
	        } else if (node.nodeType === 3) {
	          var data = node.data;

	          if (data.indexOf(marker) >= 0) {
	            var parent = node.parentNode;

	            var _strings = data.split(markerRegex);

	            var lastIndex = _strings.length - 1;

	            for (var _i = 0; _i < lastIndex; _i++) {
	              parent.insertBefore(_strings[_i] === '' ? createMarker() : document.createTextNode(_strings[_i]), node);

	              _this.parts.push({
	                type: 'node',
	                index: ++index
	              });
	            }

	            if (_strings[lastIndex] === '') {
	              parent.insertBefore(createMarker(), node);
	              nodesToRemove.push(node);
	            } else {
	              node.data = _strings[lastIndex];
	            }

	            partIndex += lastIndex;
	          }
	        } else if (node.nodeType === 8) {
	          if (node.data === marker) {
	            var _parent = node.parentNode;

	            if (node.previousSibling === null || index === lastPartIndex) {
	              index++;

	              _parent.insertBefore(createMarker(), node);
	            }

	            lastPartIndex = index;

	            _this.parts.push({
	              type: 'node',
	              index: index
	            });

	            if (node.nextSibling === null) {
	              node.data = '';
	            } else {
	              nodesToRemove.push(node);
	              index--;
	            }

	            partIndex++;
	          } else {
	            var _i2 = -1;

	            while ((_i2 = node.data.indexOf(marker, _i2 + 1)) !== -1) {
	              _this.parts.push({
	                type: 'node',
	                index: -1
	              });
	            }
	          }
	        }
	    }
	  };

	  _prepareTemplate(element);

	  for (var _i3 = 0; _i3 < nodesToRemove.length; _i3++) {
	    var n = nodesToRemove[_i3];
	    n.parentNode.removeChild(n);
	  }
	};
	var isTemplatePartActive = function isTemplatePartActive(part) {
	  return part.index !== -1;
	};
	var createMarker = function createMarker() {
	  return document.createComment('');
	};
	var lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

	/**
	 * @license
	 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */
	var TemplateInstance = function () {
	  function TemplateInstance(template, processor, options) {
	    this._parts = [];
	    this.template = template;
	    this.processor = processor;
	    this.options = options;
	  }

	  var _proto = TemplateInstance.prototype;

	  _proto.update = function update(values) {
	    var i = 0;

	    for (var _iterator = this._parts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var part = _ref;

	      if (part !== undefined) {
	        part.setValue(values[i]);
	      }

	      i++;
	    }

	    for (var _iterator2 = this._parts, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	      var _ref2;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref2 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref2 = _i2.value;
	      }

	      var _part = _ref2;

	      if (_part !== undefined) {
	        _part.commit();
	      }
	    }
	  };

	  _proto._clone = function _clone() {
	    var _this = this;

	    var fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
	    var parts = this.template.parts;
	    var partIndex = 0;
	    var nodeIndex = 0;

	    var _prepareInstance = function _prepareInstance(fragment) {
	      var walker = document.createTreeWalker(fragment, 133, null, false);
	      var node = walker.nextNode();

	      while (partIndex < parts.length && node !== null) {
	        var part = parts[partIndex];

	        if (!isTemplatePartActive(part)) {
	          _this._parts.push(undefined);

	          partIndex++;
	        } else if (nodeIndex === part.index) {
	          if (part.type === 'node') {
	            var _part2 = _this.processor.handleTextExpression(_this.options);

	            _part2.insertAfterNode(node.previousSibling);

	            _this._parts.push(_part2);
	          } else {
	            var _this$_parts;

	            (_this$_parts = _this._parts).push.apply(_this$_parts, _this.processor.handleAttributeExpressions(node, part.name, part.strings, _this.options));
	          }

	          partIndex++;
	        } else {
	          nodeIndex++;

	          if (node.nodeName === 'TEMPLATE') {
	            _prepareInstance(node.content);
	          }

	          node = walker.nextNode();
	        }
	      }
	    };

	    _prepareInstance(fragment);

	    if (isCEPolyfill) {
	      document.adoptNode(fragment);
	      customElements.upgrade(fragment);
	    }

	    return fragment;
	  };

	  return TemplateInstance;
	}();

	var TemplateResult = function () {
	  function TemplateResult(strings, values, type, processor) {
	    this.strings = strings;
	    this.values = values;
	    this.type = type;
	    this.processor = processor;
	  }

	  var _proto = TemplateResult.prototype;

	  _proto.getHTML = function getHTML() {
	    var endIndex = this.strings.length - 1;
	    var html = '';

	    for (var i = 0; i < endIndex; i++) {
	      var s = this.strings[i];
	      var match = lastAttributeNameRegex.exec(s);

	      if (match) {
	        html += s.substr(0, match.index) + match[1] + match[2] + boundAttributeSuffix + match[3] + marker;
	      } else {
	        html += s + nodeMarker;
	      }
	    }

	    return html + this.strings[endIndex];
	  };

	  _proto.getTemplateElement = function getTemplateElement() {
	    var template = document.createElement('template');
	    template.innerHTML = this.getHTML();
	    return template;
	  };

	  return TemplateResult;
	}();
	var SVGTemplateResult = function (_TemplateResult) {
	  inheritsLoose(SVGTemplateResult, _TemplateResult);

	  function SVGTemplateResult() {
	    return _TemplateResult.apply(this, arguments) || this;
	  }

	  var _proto2 = SVGTemplateResult.prototype;

	  _proto2.getHTML = function getHTML() {
	    return "<svg>" + _TemplateResult.prototype.getHTML.call(this) + "</svg>";
	  };

	  _proto2.getTemplateElement = function getTemplateElement() {
	    var template = _TemplateResult.prototype.getTemplateElement.call(this);

	    var content = template.content;
	    var svgElement = content.firstChild;
	    content.removeChild(svgElement);
	    reparentNodes(content, svgElement.firstChild);
	    return template;
	  };

	  return SVGTemplateResult;
	}(TemplateResult);

	var isPrimitive = function isPrimitive(value) {
	  return value === null || !(typeof value === 'object' || typeof value === 'function');
	};
	var AttributeCommitter = function () {
	  function AttributeCommitter(element, name, strings) {
	    this.dirty = true;
	    this.element = element;
	    this.name = name;
	    this.strings = strings;
	    this.parts = [];

	    for (var i = 0; i < strings.length - 1; i++) {
	      this.parts[i] = this._createPart();
	    }
	  }

	  var _proto = AttributeCommitter.prototype;

	  _proto._createPart = function _createPart() {
	    return new AttributePart(this);
	  };

	  _proto._getValue = function _getValue() {
	    var strings = this.strings;
	    var l = strings.length - 1;
	    var text = '';

	    for (var i = 0; i < l; i++) {
	      text += strings[i];
	      var part = this.parts[i];

	      if (part !== undefined) {
	        var v = part.value;

	        if (v != null && (Array.isArray(v) || typeof v !== 'string' && v[Symbol.iterator])) {
	          for (var _iterator = v, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	              if (_i >= _iterator.length) break;
	              _ref = _iterator[_i++];
	            } else {
	              _i = _iterator.next();
	              if (_i.done) break;
	              _ref = _i.value;
	            }

	            var t = _ref;
	            text += typeof t === 'string' ? t : String(t);
	          }
	        } else {
	          text += typeof v === 'string' ? v : String(v);
	        }
	      }
	    }

	    text += strings[l];
	    return text;
	  };

	  _proto.commit = function commit() {
	    if (this.dirty) {
	      this.dirty = false;
	      this.element.setAttribute(this.name, this._getValue());
	    }
	  };

	  return AttributeCommitter;
	}();
	var AttributePart = function () {
	  function AttributePart(comitter) {
	    this.value = undefined;
	    this.committer = comitter;
	  }

	  var _proto2 = AttributePart.prototype;

	  _proto2.setValue = function setValue(value) {
	    if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
	      this.value = value;

	      if (!isDirective(value)) {
	        this.committer.dirty = true;
	      }
	    }
	  };

	  _proto2.commit = function commit() {
	    while (isDirective(this.value)) {
	      var directive$$1 = this.value;
	      this.value = noChange;
	      directive$$1(this);
	    }

	    if (this.value === noChange) {
	      return;
	    }

	    this.committer.commit();
	  };

	  return AttributePart;
	}();
	var NodePart = function () {
	  function NodePart(options) {
	    this.value = undefined;
	    this._pendingValue = undefined;
	    this.options = options;
	  }

	  var _proto3 = NodePart.prototype;

	  _proto3.appendInto = function appendInto(container) {
	    this.startNode = container.appendChild(createMarker());
	    this.endNode = container.appendChild(createMarker());
	  };

	  _proto3.insertAfterNode = function insertAfterNode(ref) {
	    this.startNode = ref;
	    this.endNode = ref.nextSibling;
	  };

	  _proto3.appendIntoPart = function appendIntoPart(part) {
	    part._insert(this.startNode = createMarker());

	    part._insert(this.endNode = createMarker());
	  };

	  _proto3.insertAfterPart = function insertAfterPart(ref) {
	    ref._insert(this.startNode = createMarker());

	    this.endNode = ref.endNode;
	    ref.endNode = this.startNode;
	  };

	  _proto3.setValue = function setValue(value) {
	    this._pendingValue = value;
	  };

	  _proto3.commit = function commit() {
	    while (isDirective(this._pendingValue)) {
	      var directive$$1 = this._pendingValue;
	      this._pendingValue = noChange;
	      directive$$1(this);
	    }

	    var value = this._pendingValue;

	    if (value === noChange) {
	      return;
	    }

	    if (isPrimitive(value)) {
	      if (value !== this.value) {
	        this._commitText(value);
	      }
	    } else if (value instanceof TemplateResult) {
	      this._commitTemplateResult(value);
	    } else if (value instanceof Node) {
	      this._commitNode(value);
	    } else if (Array.isArray(value) || value[Symbol.iterator]) {
	      this._commitIterable(value);
	    } else if (value === nothing) {
	      this.value = nothing;
	      this.clear();
	    } else {
	      this._commitText(value);
	    }
	  };

	  _proto3._insert = function _insert(node) {
	    this.endNode.parentNode.insertBefore(node, this.endNode);
	  };

	  _proto3._commitNode = function _commitNode(value) {
	    if (this.value === value) {
	      return;
	    }

	    this.clear();

	    this._insert(value);

	    this.value = value;
	  };

	  _proto3._commitText = function _commitText(value) {
	    var node = this.startNode.nextSibling;
	    value = value == null ? '' : value;

	    if (node === this.endNode.previousSibling && node.nodeType === 3) {
	        node.data = value;
	      } else {
	      this._commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
	    }

	    this.value = value;
	  };

	  _proto3._commitTemplateResult = function _commitTemplateResult(value) {
	    var template = this.options.templateFactory(value);

	    if (this.value instanceof TemplateInstance && this.value.template === template) {
	      this.value.update(value.values);
	    } else {
	      var instance = new TemplateInstance(template, value.processor, this.options);

	      var fragment = instance._clone();

	      instance.update(value.values);

	      this._commitNode(fragment);

	      this.value = instance;
	    }
	  };

	  _proto3._commitIterable = function _commitIterable(value) {
	    if (!Array.isArray(this.value)) {
	      this.value = [];
	      this.clear();
	    }

	    var itemParts = this.value;
	    var partIndex = 0;
	    var itemPart;

	    for (var _iterator2 = value, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	      var _ref2;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref2 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref2 = _i2.value;
	      }

	      var item = _ref2;
	      itemPart = itemParts[partIndex];

	      if (itemPart === undefined) {
	        itemPart = new NodePart(this.options);
	        itemParts.push(itemPart);

	        if (partIndex === 0) {
	          itemPart.appendIntoPart(this);
	        } else {
	          itemPart.insertAfterPart(itemParts[partIndex - 1]);
	        }
	      }

	      itemPart.setValue(item);
	      itemPart.commit();
	      partIndex++;
	    }

	    if (partIndex < itemParts.length) {
	      itemParts.length = partIndex;
	      this.clear(itemPart && itemPart.endNode);
	    }
	  };

	  _proto3.clear = function clear(startNode) {
	    if (startNode === void 0) {
	      startNode = this.startNode;
	    }

	    removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
	  };

	  return NodePart;
	}();
	var BooleanAttributePart = function () {
	  function BooleanAttributePart(element, name, strings) {
	    this.value = undefined;
	    this._pendingValue = undefined;

	    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
	      throw new Error('Boolean attributes can only contain a single expression');
	    }

	    this.element = element;
	    this.name = name;
	    this.strings = strings;
	  }

	  var _proto4 = BooleanAttributePart.prototype;

	  _proto4.setValue = function setValue(value) {
	    this._pendingValue = value;
	  };

	  _proto4.commit = function commit() {
	    while (isDirective(this._pendingValue)) {
	      var directive$$1 = this._pendingValue;
	      this._pendingValue = noChange;
	      directive$$1(this);
	    }

	    if (this._pendingValue === noChange) {
	      return;
	    }

	    var value = !!this._pendingValue;

	    if (this.value !== value) {
	      if (value) {
	        this.element.setAttribute(this.name, '');
	      } else {
	        this.element.removeAttribute(this.name);
	      }
	    }

	    this.value = value;
	    this._pendingValue = noChange;
	  };

	  return BooleanAttributePart;
	}();
	var PropertyCommitter = function (_AttributeCommitter) {
	  inheritsLoose(PropertyCommitter, _AttributeCommitter);

	  function PropertyCommitter(element, name, strings) {
	    var _this;

	    _this = _AttributeCommitter.call(this, element, name, strings) || this;
	    _this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
	    return _this;
	  }

	  var _proto5 = PropertyCommitter.prototype;

	  _proto5._createPart = function _createPart() {
	    return new PropertyPart(this);
	  };

	  _proto5._getValue = function _getValue() {
	    if (this.single) {
	      return this.parts[0].value;
	    }

	    return _AttributeCommitter.prototype._getValue.call(this);
	  };

	  _proto5.commit = function commit() {
	    if (this.dirty) {
	      this.dirty = false;
	      this.element[this.name] = this._getValue();
	    }
	  };

	  return PropertyCommitter;
	}(AttributeCommitter);
	var PropertyPart = function (_AttributePart) {
	  inheritsLoose(PropertyPart, _AttributePart);

	  function PropertyPart() {
	    return _AttributePart.apply(this, arguments) || this;
	  }

	  return PropertyPart;
	}(AttributePart);
	var eventOptionsSupported = false;

	try {
	  var options = {
	    get capture() {
	      eventOptionsSupported = true;
	      return false;
	    }

	  };
	  window.addEventListener('test', options, options);
	  window.removeEventListener('test', options, options);
	} catch (_e) {}

	var EventPart = function () {
	  function EventPart(element, eventName, eventContext) {
	    var _this2 = this;

	    this.value = undefined;
	    this._pendingValue = undefined;
	    this.element = element;
	    this.eventName = eventName;
	    this.eventContext = eventContext;

	    this._boundHandleEvent = function (e) {
	      return _this2.handleEvent(e);
	    };
	  }

	  var _proto6 = EventPart.prototype;

	  _proto6.setValue = function setValue(value) {
	    this._pendingValue = value;
	  };

	  _proto6.commit = function commit() {
	    while (isDirective(this._pendingValue)) {
	      var directive$$1 = this._pendingValue;
	      this._pendingValue = noChange;
	      directive$$1(this);
	    }

	    if (this._pendingValue === noChange) {
	      return;
	    }

	    var newListener = this._pendingValue;
	    var oldListener = this.value;
	    var shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
	    var shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

	    if (shouldRemoveListener) {
	      this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options);
	    }

	    if (shouldAddListener) {
	      this._options = getOptions(newListener);
	      this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options);
	    }

	    this.value = newListener;
	    this._pendingValue = noChange;
	  };

	  _proto6.handleEvent = function handleEvent(event) {
	    if (typeof this.value === 'function') {
	      this.value.call(this.eventContext || this.element, event);
	    } else {
	      this.value.handleEvent(event);
	    }
	  };

	  return EventPart;
	}();

	var getOptions = function getOptions(o) {
	  return o && (eventOptionsSupported ? {
	    capture: o.capture,
	    passive: o.passive,
	    once: o.once
	  } : o.capture);
	};

	/**
	 * @license
	 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */
	var DefaultTemplateProcessor = function () {
	  function DefaultTemplateProcessor() {}

	  var _proto = DefaultTemplateProcessor.prototype;

	  _proto.handleAttributeExpressions = function handleAttributeExpressions(element, name, strings, options) {
	    var prefix = name[0];

	    if (prefix === '.') {
	      var _comitter = new PropertyCommitter(element, name.slice(1), strings);

	      return _comitter.parts;
	    }

	    if (prefix === '@') {
	      return [new EventPart(element, name.slice(1), options.eventContext)];
	    }

	    if (prefix === '?') {
	      return [new BooleanAttributePart(element, name.slice(1), strings)];
	    }

	    var comitter = new AttributeCommitter(element, name, strings);
	    return comitter.parts;
	  };

	  _proto.handleTextExpression = function handleTextExpression(options) {
	    return new NodePart(options);
	  };

	  return DefaultTemplateProcessor;
	}();
	var defaultTemplateProcessor = new DefaultTemplateProcessor();

	/**
	 * @license
	 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */
	function templateFactory(result) {
	  var templateCache = templateCaches.get(result.type);

	  if (templateCache === undefined) {
	    templateCache = {
	      stringsArray: new WeakMap(),
	      keyString: new Map()
	    };
	    templateCaches.set(result.type, templateCache);
	  }

	  var template = templateCache.stringsArray.get(result.strings);

	  if (template !== undefined) {
	    return template;
	  }

	  var key = result.strings.join(marker);
	  template = templateCache.keyString.get(key);

	  if (template === undefined) {
	    template = new Template(result, result.getTemplateElement());
	    templateCache.keyString.set(key, template);
	  }

	  templateCache.stringsArray.set(result.strings, template);
	  return template;
	}
	var templateCaches = new Map();

	/**
	 * @license
	 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */
	var parts = new WeakMap();
	var render = function render(result, container, options) {
	  var part = parts.get(container);

	  if (part === undefined) {
	    removeNodes(container, container.firstChild);
	    parts.set(container, part = new NodePart(Object.assign({
	      templateFactory: templateFactory
	    }, options)));
	    part.appendInto(container);
	  }

	  part.setValue(result);
	  part.commit();
	};

	/**
	 * @license
	 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */
	(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.0.0');
	var html = function html(strings) {
	  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    values[_key - 1] = arguments[_key];
	  }

	  return new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
	};

	/**
	 * @license
	 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */
	var walkerNodeFilter = 133;
	function removeNodesFromTemplate(template, nodesToRemove) {
	  var content = template.element.content,
	      parts = template.parts;
	  var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
	  var partIndex = nextActiveIndexInTemplateParts(parts);
	  var part = parts[partIndex];
	  var nodeIndex = -1;
	  var removeCount = 0;
	  var nodesToRemoveInTemplate = [];
	  var currentRemovingNode = null;

	  while (walker.nextNode()) {
	    nodeIndex++;
	    var node = walker.currentNode;

	    if (node.previousSibling === currentRemovingNode) {
	      currentRemovingNode = null;
	    }

	    if (nodesToRemove.has(node)) {
	      nodesToRemoveInTemplate.push(node);

	      if (currentRemovingNode === null) {
	        currentRemovingNode = node;
	      }
	    }

	    if (currentRemovingNode !== null) {
	      removeCount++;
	    }

	    while (part !== undefined && part.index === nodeIndex) {
	      part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
	      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
	      part = parts[partIndex];
	    }
	  }

	  nodesToRemoveInTemplate.forEach(function (n) {
	    return n.parentNode.removeChild(n);
	  });
	}

	var countNodes = function countNodes(node) {
	  var count = node.nodeType === 11 ? 0 : 1;
	  var walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

	  while (walker.nextNode()) {
	    count++;
	  }

	  return count;
	};

	var nextActiveIndexInTemplateParts = function nextActiveIndexInTemplateParts(parts, startIndex) {
	  if (startIndex === void 0) {
	    startIndex = -1;
	  }

	  for (var i = startIndex + 1; i < parts.length; i++) {
	    var part = parts[i];

	    if (isTemplatePartActive(part)) {
	      return i;
	    }
	  }

	  return -1;
	};

	function insertNodeIntoTemplate(template, node, refNode) {
	  if (refNode === void 0) {
	    refNode = null;
	  }

	  var content = template.element.content,
	      parts = template.parts;

	  if (refNode === null || refNode === undefined) {
	    content.appendChild(node);
	    return;
	  }

	  var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
	  var partIndex = nextActiveIndexInTemplateParts(parts);
	  var insertCount = 0;
	  var walkerIndex = -1;

	  while (walker.nextNode()) {
	    walkerIndex++;
	    var walkerNode = walker.currentNode;

	    if (walkerNode === refNode) {
	      insertCount = countNodes(node);
	      refNode.parentNode.insertBefore(node, refNode);
	    }

	    while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
	      if (insertCount > 0) {
	        while (partIndex !== -1) {
	          parts[partIndex].index += insertCount;
	          partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
	        }

	        return;
	      }

	      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
	    }
	  }
	}

	/**
	 * @license
	 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */

	var getTemplateCacheKey = function getTemplateCacheKey(type, scopeName) {
	  return type + "--" + scopeName;
	};

	var compatibleShadyCSSVersion = true;

	if (typeof window.ShadyCSS === 'undefined') {
	  compatibleShadyCSSVersion = false;
	} else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
	  console.warn("Incompatible ShadyCSS version detected." + "Please update to at least @webcomponents/webcomponentsjs@2.0.2 and" + "@webcomponents/shadycss@1.3.1.");
	  compatibleShadyCSSVersion = false;
	}

	var shadyTemplateFactory = function shadyTemplateFactory(scopeName) {
	  return function (result) {
	    var cacheKey = getTemplateCacheKey(result.type, scopeName);
	    var templateCache = templateCaches.get(cacheKey);

	    if (templateCache === undefined) {
	      templateCache = {
	        stringsArray: new WeakMap(),
	        keyString: new Map()
	      };
	      templateCaches.set(cacheKey, templateCache);
	    }

	    var template = templateCache.stringsArray.get(result.strings);

	    if (template !== undefined) {
	      return template;
	    }

	    var key = result.strings.join(marker);
	    template = templateCache.keyString.get(key);

	    if (template === undefined) {
	      var element = result.getTemplateElement();

	      if (compatibleShadyCSSVersion) {
	        window.ShadyCSS.prepareTemplateDom(element, scopeName);
	      }

	      template = new Template(result, element);
	      templateCache.keyString.set(key, template);
	    }

	    templateCache.stringsArray.set(result.strings, template);
	    return template;
	  };
	};

	var TEMPLATE_TYPES = ['html', 'svg'];

	var removeStylesFromLitTemplates = function removeStylesFromLitTemplates(scopeName) {
	  TEMPLATE_TYPES.forEach(function (type) {
	    var templates = templateCaches.get(getTemplateCacheKey(type, scopeName));

	    if (templates !== undefined) {
	      templates.keyString.forEach(function (template) {
	        var content = template.element.content;
	        var styles = new Set();
	        Array.from(content.querySelectorAll('style')).forEach(function (s) {
	          styles.add(s);
	        });
	        removeNodesFromTemplate(template, styles);
	      });
	    }
	  });
	};

	var shadyRenderSet = new Set();

	var prepareTemplateStyles = function prepareTemplateStyles(renderedDOM, template, scopeName) {
	  shadyRenderSet.add(scopeName);
	  var styles = renderedDOM.querySelectorAll('style');

	  if (styles.length === 0) {
	    window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);
	    return;
	  }

	  var condensedStyle = document.createElement('style');

	  for (var i = 0; i < styles.length; i++) {
	    var style = styles[i];
	    style.parentNode.removeChild(style);
	    condensedStyle.textContent += style.textContent;
	  }

	  removeStylesFromLitTemplates(scopeName);
	  insertNodeIntoTemplate(template, condensedStyle, template.element.content.firstChild);
	  window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);

	  if (window.ShadyCSS.nativeShadow) {
	    var _style = template.element.content.querySelector('style');

	    renderedDOM.insertBefore(_style.cloneNode(true), renderedDOM.firstChild);
	  } else {
	    template.element.content.insertBefore(condensedStyle, template.element.content.firstChild);
	    var removes = new Set();
	    removes.add(condensedStyle);
	    removeNodesFromTemplate(template, removes);
	  }
	};

	var render$1 = function render$$1(result, container, options) {
	  var scopeName = options.scopeName;
	  var hasRendered = parts.has(container);
	  var needsScoping = container instanceof ShadowRoot && compatibleShadyCSSVersion && result instanceof TemplateResult;
	  var firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
	  var renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
	  render(result, renderContainer, Object.assign({
	    templateFactory: shadyTemplateFactory(scopeName)
	  }, options));

	  if (firstScopeRender) {
	    var part = parts.get(renderContainer);
	    parts.delete(renderContainer);

	    if (part.value instanceof TemplateInstance) {
	      prepareTemplateStyles(renderContainer, part.value.template, scopeName);
	    }

	    removeNodes(container, container.firstChild);
	    container.appendChild(renderContainer);
	    parts.set(container, part);
	  }

	  if (!hasRendered && needsScoping) {
	    window.ShadyCSS.styleElement(container.host);
	  }
	};

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

	var setPrototypeOf = createCommonjsModule(function (module) {
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

	var construct = createCommonjsModule(function (module) {
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
	      if (Class) setPrototypeOf(instance, Class.prototype);
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
	      return construct(Class, arguments, getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return setPrototypeOf(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	module.exports = _wrapNativeSuper;
	});

	/**
	 * @license
	 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */
	window.JSCompiler_renameProperty = function (prop, _obj) {
	  return prop;
	};

	var defaultConverter = {
	  toAttribute: function toAttribute(value, type) {
	    switch (type) {
	      case Boolean:
	        return value ? '' : null;

	      case Object:
	      case Array:
	        return value == null ? value : JSON.stringify(value);
	    }

	    return value;
	  },
	  fromAttribute: function fromAttribute(value, type) {
	    switch (type) {
	      case Boolean:
	        return value !== null;

	      case Number:
	        return value === null ? null : Number(value);

	      case Object:
	      case Array:
	        return JSON.parse(value);
	    }

	    return value;
	  }
	};
	var notEqual = function notEqual(value, old) {
	  return old !== value && (old === old || value === value);
	};
	var defaultPropertyDeclaration = {
	  attribute: true,
	  type: String,
	  converter: defaultConverter,
	  reflect: false,
	  hasChanged: notEqual
	};
	var microtaskPromise = Promise.resolve(true);
	var STATE_HAS_UPDATED = 1;
	var STATE_UPDATE_REQUESTED = 1 << 2;
	var STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
	var STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
	var STATE_HAS_CONNECTED = 1 << 5;
	var UpdatingElement = function (_HTMLElement) {
	  inheritsLoose(UpdatingElement, _HTMLElement);

	  function UpdatingElement() {
	    var _this;

	    _this = _HTMLElement.call(this) || this;
	    _this._updateState = 0;
	    _this._instanceProperties = undefined;
	    _this._updatePromise = microtaskPromise;
	    _this._hasConnectedResolver = undefined;
	    _this._changedProperties = new Map();
	    _this._reflectingProperties = undefined;

	    _this.initialize();

	    return _this;
	  }

	  UpdatingElement._ensureClassProperties = function _ensureClassProperties() {
	    var _this2 = this;

	    if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
	      this._classProperties = new Map();

	      var superProperties = Object.getPrototypeOf(this)._classProperties;

	      if (superProperties !== undefined) {
	        superProperties.forEach(function (v, k) {
	          return _this2._classProperties.set(k, v);
	        });
	      }
	    }
	  };

	  UpdatingElement.createProperty = function createProperty(name, options) {
	    if (options === void 0) {
	      options = defaultPropertyDeclaration;
	    }

	    this._ensureClassProperties();

	    this._classProperties.set(name, options);

	    if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
	      return;
	    }

	    var key = typeof name === 'symbol' ? Symbol() : "__" + name;
	    Object.defineProperty(this.prototype, name, {
	      get: function get() {
	        return this[key];
	      },
	      set: function set(value) {
	        var oldValue = this[name];
	        this[key] = value;
	        this.requestUpdate(name, oldValue);
	      },
	      configurable: true,
	      enumerable: true
	    });
	  };

	  UpdatingElement.finalize = function finalize() {
	    if (this.hasOwnProperty(JSCompiler_renameProperty('finalized', this)) && this.finalized) {
	      return;
	    }

	    var superCtor = Object.getPrototypeOf(this);

	    if (typeof superCtor.finalize === 'function') {
	      superCtor.finalize();
	    }

	    this.finalized = true;

	    this._ensureClassProperties();

	    this._attributeToPropertyMap = new Map();

	    if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
	      var props = this.properties;
	      var propKeys = [].concat(Object.getOwnPropertyNames(props), typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : []);

	      for (var _iterator = propKeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;

	        if (_isArray) {
	          if (_i >= _iterator.length) break;
	          _ref = _iterator[_i++];
	        } else {
	          _i = _iterator.next();
	          if (_i.done) break;
	          _ref = _i.value;
	        }

	        var p = _ref;
	        this.createProperty(p, props[p]);
	      }
	    }
	  };

	  UpdatingElement._attributeNameForProperty = function _attributeNameForProperty(name, options) {
	    var attribute = options.attribute;
	    return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
	  };

	  UpdatingElement._valueHasChanged = function _valueHasChanged(value, old, hasChanged) {
	    if (hasChanged === void 0) {
	      hasChanged = notEqual;
	    }

	    return hasChanged(value, old);
	  };

	  UpdatingElement._propertyValueFromAttribute = function _propertyValueFromAttribute(value, options) {
	    var type = options.type;
	    var converter = options.converter || defaultConverter;
	    var fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
	    return fromAttribute ? fromAttribute(value, type) : value;
	  };

	  UpdatingElement._propertyValueToAttribute = function _propertyValueToAttribute(value, options) {
	    if (options.reflect === undefined) {
	      return;
	    }

	    var type = options.type;
	    var converter = options.converter;
	    var toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
	    return toAttribute(value, type);
	  };

	  var _proto = UpdatingElement.prototype;

	  _proto.initialize = function initialize() {
	    this._saveInstanceProperties();
	  };

	  _proto._saveInstanceProperties = function _saveInstanceProperties() {
	    var _this3 = this;

	    this.constructor._classProperties.forEach(function (_v, p) {
	      if (_this3.hasOwnProperty(p)) {
	        var value = _this3[p];
	        delete _this3[p];

	        if (!_this3._instanceProperties) {
	          _this3._instanceProperties = new Map();
	        }

	        _this3._instanceProperties.set(p, value);
	      }
	    });
	  };

	  _proto._applyInstanceProperties = function _applyInstanceProperties() {
	    var _this4 = this;

	    this._instanceProperties.forEach(function (v, p) {
	      return _this4[p] = v;
	    });

	    this._instanceProperties = undefined;
	  };

	  _proto.connectedCallback = function connectedCallback() {
	    this._updateState = this._updateState | STATE_HAS_CONNECTED;

	    if (this._hasConnectedResolver) {
	      this._hasConnectedResolver();

	      this._hasConnectedResolver = undefined;
	    } else {
	      this.requestUpdate();
	    }
	  };

	  _proto.disconnectedCallback = function disconnectedCallback() {};

	  _proto.attributeChangedCallback = function attributeChangedCallback(name, old, value) {
	    if (old !== value) {
	      this._attributeToProperty(name, value);
	    }
	  };

	  _proto._propertyToAttribute = function _propertyToAttribute(name, value, options) {
	    if (options === void 0) {
	      options = defaultPropertyDeclaration;
	    }

	    var ctor = this.constructor;

	    var attr = ctor._attributeNameForProperty(name, options);

	    if (attr !== undefined) {
	      var attrValue = ctor._propertyValueToAttribute(value, options);

	      if (attrValue === undefined) {
	        return;
	      }

	      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

	      if (attrValue == null) {
	        this.removeAttribute(attr);
	      } else {
	        this.setAttribute(attr, attrValue);
	      }

	      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
	    }
	  };

	  _proto._attributeToProperty = function _attributeToProperty(name, value) {
	    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
	      return;
	    }

	    var ctor = this.constructor;

	    var propName = ctor._attributeToPropertyMap.get(name);

	    if (propName !== undefined) {
	      var options = ctor._classProperties.get(propName) || defaultPropertyDeclaration;
	      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
	      this[propName] = ctor._propertyValueFromAttribute(value, options);
	      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
	    }
	  };

	  _proto.requestUpdate = function requestUpdate(name, oldValue) {
	    var shouldRequestUpdate = true;

	    if (name !== undefined && !this._changedProperties.has(name)) {
	      var ctor = this.constructor;
	      var options = ctor._classProperties.get(name) || defaultPropertyDeclaration;

	      if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
	        this._changedProperties.set(name, oldValue);

	        if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
	          if (this._reflectingProperties === undefined) {
	            this._reflectingProperties = new Map();
	          }

	          this._reflectingProperties.set(name, options);
	        }
	      } else {
	        shouldRequestUpdate = false;
	      }
	    }

	    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
	      this._enqueueUpdate();
	    }

	    return this.updateComplete;
	  };

	  _proto._enqueueUpdate = function () {
	    var _enqueueUpdate2 = asyncToGenerator(regenerator.mark(function _callee() {
	      var _this5 = this;

	      var resolve, previousUpdatePromise, result;
	      return regenerator.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
	              previousUpdatePromise = this._updatePromise;
	              this._updatePromise = new Promise(function (res) {
	                return resolve = res;
	              });
	              _context.next = 5;
	              return previousUpdatePromise;

	            case 5:
	              if (this._hasConnected) {
	                _context.next = 8;
	                break;
	              }

	              _context.next = 8;
	              return new Promise(function (res) {
	                return _this5._hasConnectedResolver = res;
	              });

	            case 8:
	              result = this.performUpdate();

	              if (!(result != null && typeof result.then === 'function')) {
	                _context.next = 12;
	                break;
	              }

	              _context.next = 12;
	              return result;

	            case 12:
	              resolve(!this._hasRequestedUpdate);

	            case 13:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    }));

	    function _enqueueUpdate() {
	      return _enqueueUpdate2.apply(this, arguments);
	    }

	    return _enqueueUpdate;
	  }();

	  _proto.performUpdate = function performUpdate() {
	    if (this._instanceProperties) {
	      this._applyInstanceProperties();
	    }

	    if (this.shouldUpdate(this._changedProperties)) {
	      var changedProperties = this._changedProperties;
	      this.update(changedProperties);

	      this._markUpdated();

	      if (!(this._updateState & STATE_HAS_UPDATED)) {
	        this._updateState = this._updateState | STATE_HAS_UPDATED;
	        this.firstUpdated(changedProperties);
	      }

	      this.updated(changedProperties);
	    } else {
	      this._markUpdated();
	    }
	  };

	  _proto._markUpdated = function _markUpdated() {
	    this._changedProperties = new Map();
	    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
	  };

	  _proto.shouldUpdate = function shouldUpdate(_changedProperties) {
	    return true;
	  };

	  _proto.update = function update(_changedProperties) {
	    var _this6 = this;

	    if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
	      this._reflectingProperties.forEach(function (v, k) {
	        return _this6._propertyToAttribute(k, _this6[k], v);
	      });

	      this._reflectingProperties = undefined;
	    }
	  };

	  _proto.updated = function updated(_changedProperties) {};

	  _proto.firstUpdated = function firstUpdated(_changedProperties) {};

	  createClass(UpdatingElement, [{
	    key: "_hasConnected",
	    get: function get() {
	      return this._updateState & STATE_HAS_CONNECTED;
	    }
	  }, {
	    key: "_hasRequestedUpdate",
	    get: function get() {
	      return this._updateState & STATE_UPDATE_REQUESTED;
	    }
	  }, {
	    key: "hasUpdated",
	    get: function get() {
	      return this._updateState & STATE_HAS_UPDATED;
	    }
	  }, {
	    key: "updateComplete",
	    get: function get() {
	      return this._updatePromise;
	    }
	  }], [{
	    key: "observedAttributes",
	    get: function get() {
	      var _this7 = this;

	      this.finalize();
	      var attributes = [];

	      this._classProperties.forEach(function (v, p) {
	        var attr = _this7._attributeNameForProperty(p, v);

	        if (attr !== undefined) {
	          _this7._attributeToPropertyMap.set(attr, p);

	          attributes.push(attr);
	        }
	      });

	      return attributes;
	    }
	  }]);

	  return UpdatingElement;
	}(wrapNativeSuper(HTMLElement));
	UpdatingElement.finalized = true;

	/**
	 * @license
	 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at
	 * http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at
	 * http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at
	 * http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at
	 * http://polymer.github.io/PATENTS.txt
	 */
	var legacyCustomElement = function legacyCustomElement(tagName, clazz) {
	  window.customElements.define(tagName, clazz);
	  return clazz;
	};

	var standardCustomElement = function standardCustomElement(tagName, descriptor) {
	  var kind = descriptor.kind,
	      elements = descriptor.elements;
	  return {
	    kind: kind,
	    elements: elements,
	    finisher: function finisher(clazz) {
	      window.customElements.define(tagName, clazz);
	    }
	  };
	};

	var customElement = function customElement(tagName) {
	  return function (classOrDescriptor) {
	    return typeof classOrDescriptor === 'function' ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);
	  };
	};

	var standardProperty = function standardProperty(options, element) {
	  if (element.kind === 'method' && element.descriptor && !('value' in element.descriptor)) {
	    return Object.assign({}, element, {
	      finisher: function finisher(clazz) {
	        clazz.createProperty(element.key, options);
	      }
	    });
	  } else {
	    return {
	      kind: 'field',
	      key: Symbol(),
	      placement: 'own',
	      descriptor: {},
	      initializer: function initializer() {
	        if (typeof element.initializer === 'function') {
	          this[element.key] = element.initializer.call(this);
	        }
	      },
	      finisher: function finisher(clazz) {
	        clazz.createProperty(element.key, options);
	      }
	    };
	  }
	};

	var legacyProperty = function legacyProperty(options, proto, name) {
	  proto.constructor.createProperty(name, options);
	};

	function property(options) {
	  return function (protoOrDescriptor, name) {
	    return name !== undefined ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
	  };
	}

	/**
	@license
	Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at
	http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
	http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
	found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
	part of the polymer project is also subject to an additional IP rights grant
	found at http://polymer.github.io/PATENTS.txt
	*/
	var supportsAdoptingStyleSheets = 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
	var constructionToken = Symbol();
	var CSSResult = function () {
	  function CSSResult(cssText, safeToken) {
	    if (safeToken !== constructionToken) {
	      throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
	    }

	    this.cssText = cssText;
	  }

	  var _proto = CSSResult.prototype;

	  _proto.toString = function toString() {
	    return this.cssText;
	  };

	  createClass(CSSResult, [{
	    key: "styleSheet",
	    get: function get() {
	      if (this._styleSheet === undefined) {
	        if (supportsAdoptingStyleSheets) {
	          this._styleSheet = new CSSStyleSheet();

	          this._styleSheet.replaceSync(this.cssText);
	        } else {
	          this._styleSheet = null;
	        }
	      }

	      return this._styleSheet;
	    }
	  }]);

	  return CSSResult;
	}();

	(window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.0.1');

	function arrayFlat(styles, result) {
	  if (result === void 0) {
	    result = [];
	  }

	  for (var i = 0, length = styles.length; i < length; i++) {
	    var value = styles[i];

	    if (Array.isArray(value)) {
	      arrayFlat(value, result);
	    } else {
	      result.push(value);
	    }
	  }

	  return result;
	}

	var flattenStyles = function flattenStyles(styles) {
	  return styles.flat ? styles.flat(Infinity) : arrayFlat(styles);
	};

	var LitElement = function (_UpdatingElement) {
	  inheritsLoose(LitElement, _UpdatingElement);

	  function LitElement() {
	    return _UpdatingElement.apply(this, arguments) || this;
	  }

	  LitElement.finalize = function finalize() {
	    _UpdatingElement.finalize.call(this);

	    this._styles = this.hasOwnProperty(JSCompiler_renameProperty('styles', this)) ? this._getUniqueStyles() : this._styles || [];
	  };

	  LitElement._getUniqueStyles = function _getUniqueStyles() {
	    var userStyles = this.styles;
	    var styles = [];

	    if (Array.isArray(userStyles)) {
	      var flatStyles = flattenStyles(userStyles);
	      var styleSet = flatStyles.reduceRight(function (set, s) {
	        set.add(s);
	        return set;
	      }, new Set());
	      styleSet.forEach(function (v) {
	        return styles.unshift(v);
	      });
	    } else if (userStyles) {
	      styles.push(userStyles);
	    }

	    return styles;
	  };

	  var _proto = LitElement.prototype;

	  _proto.initialize = function initialize() {
	    _UpdatingElement.prototype.initialize.call(this);

	    this.renderRoot = this.createRenderRoot();

	    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
	      this.adoptStyles();
	    }
	  };

	  _proto.createRenderRoot = function createRenderRoot() {
	    return this.attachShadow({
	      mode: 'open'
	    });
	  };

	  _proto.adoptStyles = function adoptStyles() {
	    var styles = this.constructor._styles;

	    if (styles.length === 0) {
	      return;
	    }

	    if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
	      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(function (s) {
	        return s.cssText;
	      }), this.localName);
	    } else if (supportsAdoptingStyleSheets) {
	      this.renderRoot.adoptedStyleSheets = styles.map(function (s) {
	        return s.styleSheet;
	      });
	    } else {
	      this._needsShimAdoptedStyleSheets = true;
	    }
	  };

	  _proto.connectedCallback = function connectedCallback() {
	    _UpdatingElement.prototype.connectedCallback.call(this);

	    if (this.hasUpdated && window.ShadyCSS !== undefined) {
	      window.ShadyCSS.styleElement(this);
	    }
	  };

	  _proto.update = function update(changedProperties) {
	    var _this = this;

	    _UpdatingElement.prototype.update.call(this, changedProperties);

	    var templateResult = this.render();

	    if (templateResult instanceof TemplateResult) {
	      this.constructor.render(templateResult, this.renderRoot, {
	        scopeName: this.localName,
	        eventContext: this
	      });
	    }

	    if (this._needsShimAdoptedStyleSheets) {
	      this._needsShimAdoptedStyleSheets = false;

	      this.constructor._styles.forEach(function (s) {
	        var style = document.createElement('style');
	        style.textContent = s.cssText;

	        _this.renderRoot.appendChild(style);
	      });
	    }
	  };

	  _proto.render = function render$$1() {};

	  return LitElement;
	}(UpdatingElement);
	LitElement.finalized = true;
	LitElement.render = render$1;

	var PublicSettingsClient = function () {
	  function PublicSettingsClient() {}

	  var _proto = PublicSettingsClient.prototype;

	  _proto.get = function get() {
	    return fetch(this.apiUrl).then(function (r) {
	      return r.json();
	    });
	  };

	  _proto.update = function update(data) {
	    return fetch(this.apiUrl, {
	      method: "POST",
	      body: JSON.stringify(data),
	      credentials: 'include',
	      headers: new Headers({
	        "Content-Type": "application/json",
	        'X-WP-Nonce': wpApiSettings.nonce
	      })
	    });
	  };

	  createClass(PublicSettingsClient, [{
	    key: "apiUrl",
	    get: function get() {
	      return wpApiSettings.restUrl + "base-api/v1/public-settings";
	    }
	  }]);

	  return PublicSettingsClient;
	}();

	var showPageHeadingsMap = {
	  always: "Always",
	  excludeGutenbergPages: "All except Gutenberg pages"
	};

	function _templateObject() {
	  var data = taggedTemplateLiteralLoose(["\n            <div style=\"height: 500px;\" id=", "></div>\n        "]);

	  _templateObject = function _templateObject() {
	    return data;
	  };

	  return data;
	}

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	  var c = arguments.length,
	      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	      d;
	  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	  }
	  return c > 3 && r && Object.defineProperty(target, key, r), r;
	};

	var MonacoEditorElement = function (_LitElement) {
	  inheritsLoose(MonacoEditorElement, _LitElement);

	  function MonacoEditorElement() {
	    var _this;

	    _this = _LitElement.apply(this, arguments) || this;
	    _this.uniqueId = "id-" + Math.floor(Math.random() * 1000000);
	    return _this;
	  }

	  var _proto = MonacoEditorElement.prototype;

	  _proto.createRenderRoot = function createRenderRoot() {
	    return this;
	  };

	  _proto.firstUpdated = function firstUpdated() {
	    var element = document.querySelector("#" + this.uniqueId);
	    console.warn(element);

	    require.config({
	      paths: {
	        'vs': _wpSiteInfo.themeUrl + '/vs'
	      }
	    });

	    require(['vs/editor/editor.main'], function () {
	      var editor = monaco.editor.create(element, {
	        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
	        language: 'html',
	        theme: "vs-dark"
	      });
	    });
	  };

	  _proto.render = function render() {
	    return html(_templateObject(), this.uniqueId);
	  };

	  return MonacoEditorElement;
	}(LitElement);

	MonacoEditorElement = __decorate([customElement("monaco-editor")], MonacoEditorElement);

	function _templateObject5() {
	  var data = taggedTemplateLiteralLoose(["<span class=\"spinner-border spinner-border-sm\"></span> Saving..."]);

	  _templateObject5 = function _templateObject5() {
	    return data;
	  };

	  return data;
	}

	function _templateObject4() {
	  var data = taggedTemplateLiteralLoose(["\n                                    <option\n                                        value=", "\n                                        ?selected=", ">\n                                        ", "\n                                    </option>\n                                "]);

	  _templateObject4 = function _templateObject4() {
	    return data;
	  };

	  return data;
	}

	function _templateObject3() {
	  var data = taggedTemplateLiteralLoose(["\n                        <h2>Page Headers</h2>\n\n                        <div class=\"form-group\">\n                            <label>Show Page Headers</label>\n                            <select\n                                class=\"form-control ts-input-small\"\n                                .value=", "\n                                @change=", ">\n                                ", "\n                            </select>\n                            <p class=\"form-text text-muted ts-input-small\">When and where to add H1 headings to pages and posts</p>\n                        </div>\n                        \n                        <hr>\n\n                        <h2>Footer</h2>\n\n                        <div class=\"form-group\">\n                            <label>Footer Page ID</label>\n                            <input\n                                class=\"form-control ts-input-small\"\n                                .value=", "\n                                @input=", ">\n                            <p class=\"form-text text-muted ts-input-small\">Set this to the ID of a (private) post or page to be included as footer. This enables you to use the entire page builder (Gutenberg or otherwise) to compose site footer, rather than being confined to only classic-style widgets.</p>\n                        </div>\n\n                        <monaco-editor>\n                        \n                        <hr>\n\n                        <button\n                            class=\"btn btn-success\"\n                            ?disabled=", "\n                            @click=", ">\n                            ", "\n                        </button>\n                    "]);

	  _templateObject3 = function _templateObject3() {
	    return data;
	  };

	  return data;
	}

	function _templateObject2() {
	  var data = taggedTemplateLiteralLoose(["\n                        <div class=\"d-flex align-items-center\" role=\"status\">\n                            <strong>Loading...</strong>\n                            <div class=\"spinner-border ml-auto\"></div>\n                        </div>\n                    "]);

	  _templateObject2 = function _templateObject2() {
	    return data;
	  };

	  return data;
	}

	function _templateObject$1() {
	  var data = taggedTemplateLiteralLoose(["\n            <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">\n\n            <div class=\"container\">\n                <br><br>\n                <h1>Base Theme Settings <span class=\"badge badge-info\">Beta</span></h1>\n                <hr>\n                ", "\n            </div>\n            <style>\n                .ts-input-small {\n                    max-width: 400px;\n                }\n            </style>\n        "]);

	  _templateObject$1 = function _templateObject() {
	    return data;
	  };

	  return data;
	}

	var __decorate$1 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	  var c = arguments.length,
	      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	      d;
	  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	  }
	  return c > 3 && r && Object.defineProperty(target, key, r), r;
	};

	var ThemeSettingsElement = function (_LitElement) {
	  inheritsLoose(ThemeSettingsElement, _LitElement);

	  function ThemeSettingsElement() {
	    var _this;

	    _this = _LitElement.call(this) || this;
	    _this.loading = true;
	    _this.saving = false;
	    _this.publicSettingsClient = new PublicSettingsClient();

	    _this.getSettings();

	    return _this;
	  }

	  var _proto = ThemeSettingsElement.prototype;

	  _proto.createRenderRoot = function createRenderRoot() {
	    return this;
	  };

	  _proto.setPublicSetting = function setPublicSetting(data) {
	    this.publicSettings = Object.assign(Object.assign({}, this.publicSettings), data);
	  };

	  _proto.getSettings = function () {
	    var _getSettings = asyncToGenerator(regenerator.mark(function _callee() {
	      return regenerator.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              this.loading = true;
	              _context.next = 3;
	              return this.publicSettingsClient.get();

	            case 3:
	              this.publicSettings = _context.sent;
	              this.loading = false;

	            case 5:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    }));

	    function getSettings() {
	      return _getSettings.apply(this, arguments);
	    }

	    return getSettings;
	  }();

	  _proto.saveSettings = function () {
	    var _saveSettings = asyncToGenerator(regenerator.mark(function _callee2() {
	      return regenerator.wrap(function _callee2$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              this.saving = true;
	              _context2.next = 3;
	              return this.publicSettingsClient.update(this.publicSettings);

	            case 3:
	              _context2.next = 5;
	              return this.publicSettingsClient.get();

	            case 5:
	              this.publicSettings = _context2.sent;
	              this.saving = false;

	            case 7:
	            case "end":
	              return _context2.stop();
	          }
	        }
	      }, _callee2, this);
	    }));

	    function saveSettings() {
	      return _saveSettings.apply(this, arguments);
	    }

	    return saveSettings;
	  }();

	  _proto.render = function render() {
	    var _this2 = this;

	    return html(_templateObject$1(), this.loading ? html(_templateObject2()) : html(_templateObject3(), this.publicSettings.showPageHeadings, function (e) {
	      return _this2.setPublicSetting({
	        showPageHeadings: e.target.value
	      });
	    }, Object.keys(showPageHeadingsMap).map(function (key) {
	      return html(_templateObject4(), key, _this2.publicSettings.showPageHeadings == key, showPageHeadingsMap[key]);
	    }), this.publicSettings.footerPageId || "", function (e) {
	      return _this2.setPublicSetting({
	        footerPageId: e.target.value
	      });
	    }, this.saving, function () {
	      return _this2.saveSettings();
	    }, this.saving ? html(_templateObject5()) : "Save"));
	  };

	  return ThemeSettingsElement;
	}(LitElement);

	__decorate$1([property()], ThemeSettingsElement.prototype, "loading", void 0);

	__decorate$1([property()], ThemeSettingsElement.prototype, "saving", void 0);

	__decorate$1([property({
	  type: Object,
	  reflect: true
	})], ThemeSettingsElement.prototype, "publicSettings", void 0);

	ThemeSettingsElement = __decorate$1([customElement('base-theme-settings')], ThemeSettingsElement);

}());
