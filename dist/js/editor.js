(function () {
  'use strict';

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
  var directive = function directive(f) {
    return function () {
      var d = f.apply(void 0, arguments);
      directives.set(d, true);
      return d;
    };
  };
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

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
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
  var previousValues = new WeakMap();
  var unsafeHTML = directive(function (value) {
    return function (part) {
      if (!(part instanceof NodePart)) {
        throw new Error('unsafeHTML can only be used in text bindings');
      }

      var previousValue = previousValues.get(part);

      if (previousValue !== undefined && isPrimitive(value) && value === previousValue.value && part.value === previousValue.fragment) {
        return;
      }

      var template = document.createElement('template');
      template.innerHTML = value;
      var fragment = document.importNode(template.content, true);
      part.setValue(fragment);
      previousValues.set(part, {
        value: value,
        fragment: fragment
      });
    };
  });

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

  var empty = {
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

  var isArray = Array.isArray || function (x) {
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

      if (isArray(_subscriptions)) {
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
          _this.destination = empty;
          break;

        case 1:
          if (!destinationOrNext) {
            _this.destination = empty;
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

        if (observerOrNext !== empty) {
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
      return new Subscriber(empty);
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

  var queue = new QueueScheduler(QueueAction);
  var EMPTY = new Observable(function (subscriber) {
    return subscriber.complete();
  });

  function empty$1(scheduler) {
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
        return empty$1(scheduler);

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
          return empty$1();
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
      return (this.scheduler || queue).now();
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

  function identity(x) {
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

    return mergeMap(identity, concurrent);
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
    return !isArray(val) && val - parseFloat(val) + 1 >= 0;
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

      if (isArray(value)) {
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

  var isTrackableEntity = function isTrackableEntity(obj) {
    return typeof obj === "object" && obj[TrackableEntityKey] === true;
  };

  var TrackedPropertyDefinitionListKey = "_trackedPropertyDefinitions";

  var getTrackedPropertyDefinitionList = function getTrackedPropertyDefinitionList(obj) {
    return obj[TrackedPropertyDefinitionListKey] = obj[TrackedPropertyDefinitionListKey] || {};
  };

  var ComputedPropertyListKey = "_computedProperties";

  var getComputedPropertyList = function getComputedPropertyList(obj) {
    return obj[ComputedPropertyListKey] = obj[ComputedPropertyListKey] || {};
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

  function _templateObject3() {
    var data = taggedTemplateLiteralLoose(["\n                        <a class=\"base-top-navigation-link base-menu-item-", "\" href=", ">\n                            ", "\n                        </a>\n                    "]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    var data = taggedTemplateLiteralLoose(["<nav class=\"base-top-navigation-links\">\n                    ", "\n                </nav>"]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = taggedTemplateLiteralLoose(["\n            <a class=\"base-top-navigation-logo\" href=\"", "\">\n                ", "\n            </a>\n\n            ", "\n\n            <button\n                class=\"base-top-navigation-toggle\"\n                @click=", ">\n                <span class=\"fas fa-bars\"></span>\n                <span class=\"base-top-navigation-toggle-text\">Toggle</span>\n            </button>\n        "]);

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

  function filterImageHtml(html$$1) {
    return html$$1.replace(/srcset="[^"]*"/gi, "").replace(/sizes="[^"]*"/gi, "").replace(/ +/gi, " ");
  }

  var TopNavigationElement = function (_LitElement) {
    inheritsLoose(TopNavigationElement, _LitElement);

    function TopNavigationElement() {
      var _this;

      _this = _LitElement.apply(this, arguments) || this;

      _this.toggleButtonClicked = function () {
        page.revealNavigation.value = !page.revealNavigation.value;
      };

      return _this;
    }

    var _proto = TopNavigationElement.prototype;

    _proto.createRenderRoot = function createRenderRoot() {
      return this;
    };

    _proto.firstUpdated = function firstUpdated() {
      var _this2 = this;

      var client = new MenuItemClient();
      client.getAll().then(function (items) {
        return _this2.items = items;
      }).catch(function (e) {
        console.error(e);
        throw e;
      });
    };

    _proto.updated = function updated() {
      if (!page.topNavigationRendered && this.items && this.items.length > 0) {
        page.onTopNavigationRendered.forEach(function (cb) {
          return cb();
        });
        page.topNavigationRendered = true;
      }
    };

    _proto.render = function render() {
      return html(_templateObject(), _wpSiteInfo.homeUrl, _wpSiteInfo.customLogo ? unsafeHTML([filterImageHtml(_wpSiteInfo.customLogo.imageHtml)]) : _wpSiteInfo.siteDisplayName, this.items && this.items.length > 0 ? html(_templateObject2(), this.items.map(function (item) {
        return html(_templateObject3(), item.id, item.url, item.title);
      })) : null, this.toggleButtonClicked);
    };

    return TopNavigationElement;
  }(LitElement);

  __decorate([property({
    type: Array
  })], TopNavigationElement.prototype, "items", void 0);

  TopNavigationElement = __decorate([customElement("base-top-navigation")], TopNavigationElement);

  var __decorate$1 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
      if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  var PageElement = function (_LitElement) {
    inheritsLoose(PageElement, _LitElement);

    function PageElement() {
      return _LitElement.apply(this, arguments) || this;
    }

    var _proto = PageElement.prototype;

    _proto.createRenderRoot = function createRenderRoot() {
      return this;
    };

    _proto.firstUpdated = function firstUpdated() {
      var _this = this;

      console.log("Done");

      var updateRevealNavigationCss = function updateRevealNavigationCss(value) {
        value ? _this.classList.add("base-page-reveal-navigation") : _this.classList.remove("base-page-reveal-navigation");
      };

      page.revealNavigation.subscribe(updateRevealNavigationCss);
      updateRevealNavigationCss(page.revealNavigation.value);
    };

    return PageElement;
  }(LitElement);

  PageElement = __decorate$1([customElement("base-page")], PageElement);

  (function () {
    var _wp$editor = wp.editor,
        InspectorControls = _wp$editor.InspectorControls,
        InnerBlocks = _wp$editor.InnerBlocks,
        MediaPlaceholder = _wp$editor.MediaPlaceholder;
    var Fragment = wp.element.Fragment;
    var _wp$components = wp.components,
        Panel = _wp$components.Panel,
        PanelBody = _wp$components.PanelBody,
        PanelRow = _wp$components.PanelRow,
        Button = _wp$components.Button,
        TextControl = _wp$components.TextControl,
        CheckboxControl = _wp$components.CheckboxControl,
        ToggleControl = _wp$components.ToggleControl;

    var backgroundPanel = function backgroundPanel(props) {
      function onSelectImage(image) {
        console.log("Image selected!", arguments);
        props.setAttributes({
          backgroundUrl: image.url
        });
      }

      function onRemoveImage() {
        props.setAttributes({
          backgroundUrl: ''
        });
      }

      return wp.element.createElement(PanelBody, {
        title: "Background",
        initialOpen: true
      }, wp.element.createElement(ToggleControl, {
        label: "Use simple (CSS) background",
        checked: !props.attributes.backgroundIsElement,
        onChange: function onChange(backgroundIsNotElement) {
          return props.setAttributes({
            backgroundIsElement: !backgroundIsNotElement
          });
        }
      }), !props.attributes.backgroundIsElement ? wp.element.createElement(Fragment, null, wp.element.createElement("p", null, "Background Image"), props.attributes.backgroundUrl ? wp.element.createElement(Fragment, null, wp.element.createElement(Button, {
        style: {
          display: 'block',
          width: '100%',
          textAlign: 'center'
        },
        isDefault: true,
        onClick: onRemoveImage
      }, "Remove Background Image")) : wp.element.createElement(MediaPlaceholder, {
        icon: "format-image",
        labels: {
          title: "Select image"
        },
        onSelect: onSelectImage,
        accept: "image/*",
        allowedTypes: ['image']
      })) : wp.element.createElement(Fragment, null, wp.element.createElement(TextControl, {
        label: "Background Element CSS Classes",
        value: props.attributes.backgroundElementClasses || "",
        onChange: function onChange(value) {
          return props.setAttributes({
            backgroundElementClasses: value
          });
        }
      }), wp.element.createElement(ToggleControl, {
        label: "Use video background",
        checked: props.attributes.backgroundIsVideo,
        onChange: function onChange(backgroundIsVideo) {
          return props.setAttributes({
            backgroundIsVideo: backgroundIsVideo
          });
        }
      }), props.attributes.backgroundUrl ? wp.element.createElement(Fragment, null, wp.element.createElement(Button, {
        style: {
          display: 'block',
          width: '100%',
          textAlign: 'center'
        },
        isDefault: true,
        onClick: onRemoveImage
      }, "Remove Background Image/Video")) : wp.element.createElement(Fragment, null, props.attributes.backgroundIsVideo ? "(Not implemented)" : wp.element.createElement(MediaPlaceholder, {
        icon: "format-image",
        labels: {
          title: "Select image"
        },
        onSelect: onSelectImage,
        accept: "image/*",
        allowedTypes: ['image']
      }))));
    };

    var cssPanel = function cssPanel(props) {
      return wp.element.createElement(PanelBody, {
        title: "CSS",
        initialOpen: false
      }, wp.element.createElement(TextControl, {
        label: "Additional CSS Classes",
        value: props.attributes.additionalClasses || "",
        onChange: function onChange(value) {
          return props.setAttributes({
            additionalClasses: value
          });
        }
      }));
    };

    var inspectorControls = function inspectorControls(props) {
      return wp.element.createElement(InspectorControls, null, [backgroundPanel(props), cssPanel(props)]);
    };

    var render = function render(props, innerBlocks) {
      var sectionStyle = {};
      if (!props.attributes.backgroundIsElement && props.attributes.backgroundUrl) sectionStyle.backgroundImage = "url('" + props.attributes.backgroundUrl + "')";
      var classArray = ['base-section'];
      if (props.attributes.backgroundIsElement) classArray.push("base-section-has-background-element");
      if (props.attributes.additionalClasses) classArray = classArray.concat(props.attributes.additionalClasses.split(" "));
      var className = classArray.join(" ");
      var backgroundElementClasses = ['base-section-background'];
      if (props.attributes.backgroundElementClasses) backgroundElementClasses = backgroundElementClasses.concat(props.attributes.backgroundElementClasses.split(" "));
      var backgroundClassName = backgroundElementClasses.join(" ");
      return wp.element.createElement("div", {
        className: className,
        style: sectionStyle
      }, props.attributes.backgroundIsElement ? wp.element.createElement("div", {
        className: backgroundClassName
      }, props.attributes.backgroundIsVideo ? null : wp.element.createElement("div", {
        className: "base-background-image",
        style: {
          backgroundImage: "url('" + props.attributes.backgroundUrl + "')"
        }
      })) : null, wp.element.createElement("div", {
        className: "base-section-container"
      }, innerBlocks()));
    };

    var settings = wp.blocks.registerBlockType('base-theme/section', {
      title: 'Section',
      icon: 'id',
      category: 'layout',
      keywords: [],
      attributes: {
        backgroundIsElement: {
          type: 'boolean',
          defaultValue: false
        },
        backgroundElementClasses: {
          type: 'string'
        },
        backgroundIsVideo: {
          type: 'boolean',
          defaultValue: false
        },
        backgroundUrl: {
          type: 'string'
        },
        additionalClasses: {
          type: 'string'
        }
      },
      supports: {
        customClassName: false,
        className: false
      },
      getEditWrapperProps: function getEditWrapperProps(attributes) {
        return {
          "data-align": "full"
        };
      },
      edit: function edit(props, state) {
        return wp.element.createElement(Fragment, null, render(props, function () {
          return wp.element.createElement(InnerBlocks, {
            template: [],
            templateLock: false
          });
        }), inspectorControls(props));
      },
      save: function save(props) {
        return render(props, function () {
          return wp.element.createElement(InnerBlocks.Content, null);
        });
      },
      deprecated: [{
        attributes: {
          backgroundIsElement: {
            type: 'boolean',
            defaultValue: false
          },
          backgroundElementClasses: {
            type: 'string'
          },
          backgroundIsVideo: {
            type: 'boolean',
            defaultValue: false
          },
          backgroundUrl: {
            type: 'string'
          },
          additionalClasses: {
            type: 'string'
          }
        },
        supports: {
          customClassName: false,
          className: false
        },
        save: function save(props) {
          var render = function render(props, innerBlocks) {
            var sectionStyle = {};
            if (!props.attributes.backgroundIsElement && props.attributes.backgroundUrl) sectionStyle.backgroundImage = "url('" + props.attributes.backgroundUrl + "')";
            var classArray = ['bt-section'];
            if (props.attributes.backgroundIsElement) classArray.push("bt-section-has-background-element");
            if (props.attributes.additionalClasses) classArray = classArray.concat(props.attributes.additionalClasses.split(" "));
            var className = classArray.join(" ");
            var backgroundElementClasses = ['bt-section-background'];
            if (props.attributes.backgroundElementClasses) backgroundElementClasses = backgroundElementClasses.concat(props.attributes.backgroundElementClasses.split(" "));
            var backgroundClassName = backgroundElementClasses.join(" ");
            return wp.element.createElement("div", {
              className: className,
              style: sectionStyle
            }, props.attributes.backgroundIsElement ? wp.element.createElement("div", {
              className: backgroundClassName
            }, props.attributes.backgroundIsVideo ? null : wp.element.createElement("div", {
              className: "bt-background-image",
              style: {
                backgroundImage: "url('" + props.attributes.backgroundUrl + "')"
              }
            })) : null, wp.element.createElement("div", {
              className: "bt-section-container"
            }, innerBlocks()));
          };

          return render(props, function () {
            return wp.element.createElement(InnerBlocks.Content, null);
          });
        }
      }, {
        attributes: {
          backgroundIsElement: {
            type: 'boolean',
            defaultValue: false
          },
          backgroundElementClasses: {
            type: 'string'
          },
          backgroundIsVideo: {
            type: 'boolean',
            defaultValue: false
          },
          backgroundUrl: {
            type: 'string'
          },
          additionalClasses: {
            type: 'string'
          }
        },
        supports: {
          customClassName: false,
          className: false
        },
        save: function save(props) {
          var innerBlocks = function innerBlocks() {
            return wp.element.createElement(InnerBlocks.Content, null);
          };

          var sectionStyle = {};
          if (!props.attributes.backgroundIsElement && props.attributes.backgroundUrl) sectionStyle.backgroundImage = "url('" + props.attributes.backgroundUrl + "')";
          var classArray = ['base-section'];
          if (props.attributes.backgroundIsElement) classArray.push("base-section-has-background-element");
          if (props.attributes.additionalClasses) classArray = classArray.concat(props.attributes.additionalClasses.split(" "));
          var className = classArray.join(" ");
          var backgroundElementClasses = ['base-section-background'];
          if (props.attributes.backgroundElementClasses) backgroundElementClasses = backgroundElementClasses.concat(props.attributes.backgroundElementClasses.split(" "));
          var backgroundClassName = backgroundElementClasses.join(" ");
          return wp.element.createElement("div", {
            className: className,
            style: sectionStyle
          }, props.attributes.backgroundIsElement ? wp.element.createElement("div", {
            className: backgroundClassName
          }, props.attributes.backgroundIsVideo ? null : wp.element.createElement("div", {
            className: "base-background-image-wrapper"
          }, wp.element.createElement("img", {
            src: props.attributes.backgroundUrl,
            alt: "Background image",
            "aria-hidden": "true"
          }))) : null, wp.element.createElement("div", {
            className: "base-section-container"
          }, innerBlocks()));
        }
      }]
    });
  })();

  (function () {
    var _wp$editor = wp.editor,
        InspectorControls = _wp$editor.InspectorControls,
        InnerBlocks = _wp$editor.InnerBlocks,
        MediaPlaceholder = _wp$editor.MediaPlaceholder;
    var Fragment = wp.element.Fragment;
    var _wp$components = wp.components,
        Panel = _wp$components.Panel,
        PanelBody = _wp$components.PanelBody,
        PanelRow = _wp$components.PanelRow,
        Button = _wp$components.Button,
        TextControl = _wp$components.TextControl;
    var settings = wp.blocks.registerBlockType('base-theme/group', {
      title: 'Group',
      icon: 'id',
      category: 'layout',
      keywords: [],
      attributes: {
        additionalClasses: {
          type: 'string'
        }
      },
      supports: {
        customClassName: false,
        className: false
      },
      getEditWrapperProps: function getEditWrapperProps(attributes) {
        return {
          "data-align": "full"
        };
      },
      edit: function edit(props, state) {
        var classArray = ['base-group'];
        if (props.attributes.additionalClasses) classArray = classArray.concat(props.attributes.additionalClasses.split(" "));
        var className = classArray.join(" ");
        return wp.element.createElement(Fragment, null, wp.element.createElement("div", {
          className: className
        }, wp.element.createElement(InnerBlocks, {
          template: [],
          templateLock: false
        })), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
          title: "CSS",
          initialOpen: true
        }, wp.element.createElement(TextControl, {
          label: "Additional CSS Classes",
          value: props.attributes.additionalClasses || "",
          onChange: function onChange(value) {
            return props.setAttributes({
              additionalClasses: value
            });
          }
        }))));
      },
      save: function save(props) {
        return wp.element.createElement(Fragment, null, wp.element.createElement("div", {
          className: props.attributes.additionalClasses || ""
        }, wp.element.createElement(InnerBlocks.Content, null)));
      }
    });
    console.log('settings', settings);
  })();

  (function () {
    var _wp$editor = wp.editor,
        InspectorControls = _wp$editor.InspectorControls,
        InnerBlocks = _wp$editor.InnerBlocks,
        MediaPlaceholder = _wp$editor.MediaPlaceholder;
    var Fragment = wp.element.Fragment;
    var _wp$components = wp.components,
        Panel = _wp$components.Panel,
        PanelBody = _wp$components.PanelBody,
        PanelRow = _wp$components.PanelRow,
        Button = _wp$components.Button,
        TextControl = _wp$components.TextControl;
    var settings = wp.blocks.registerBlockType('base-theme/anchor-group', {
      title: 'Anchor Group',
      icon: 'id',
      category: 'layout',
      keywords: [],
      attributes: {
        href: {
          type: 'string'
        },
        additionalClasses: {
          type: 'string'
        }
      },
      supports: {
        customClassName: false,
        className: false
      },
      getEditWrapperProps: function getEditWrapperProps(attributes) {
        return {
          "data-align": "full"
        };
      },
      edit: function edit(props, state) {
        return wp.element.createElement(Fragment, null, wp.element.createElement("a", {
          className: props.attributes.additionalClasses || "",
          href: props.attributes.href || null,
          onClick: function onClick(e) {
            e.preventDefault();
            console.log('hi');
          }
        }, wp.element.createElement(InnerBlocks, {
          template: [],
          templateLock: false
        })), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
          title: "Anchor",
          initialOpen: true
        }, wp.element.createElement(TextControl, {
          label: "Link URL",
          value: props.attributes.href || "",
          onChange: function onChange(value) {
            return props.setAttributes({
              href: value
            });
          }
        })), wp.element.createElement(PanelBody, {
          title: "CSS",
          initialOpen: true
        }, wp.element.createElement(TextControl, {
          label: "Additional CSS Classes",
          value: props.attributes.additionalClasses || "",
          onChange: function onChange(value) {
            return props.setAttributes({
              additionalClasses: value
            });
          }
        }))));
      },
      save: function save(props) {
        return wp.element.createElement(Fragment, null, wp.element.createElement("a", {
          className: props.attributes.additionalClasses || "",
          href: props.attributes.href || null
        }, wp.element.createElement(InnerBlocks.Content, null)));
      }
    });
  })();

}());
