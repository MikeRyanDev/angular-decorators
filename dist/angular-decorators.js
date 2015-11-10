(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.angularDecorators = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

},{}],2:[function(_dereq_,module,exports){
_dereq_('reflect-metadata');

module.exports = (function(){
	function Metawriter(namespace, parent){
		this.namespace = parent ? ( parent.namespace + ':' + namespace )  : namespace;
	}

	/**
	 * Get metadata for the given target/propertyKey
	 *
	 * @param  {string} key         The key of the metadata
	 * @param  {any} target      The target class, function, or object
	 * @param  {string} propertyKey Optional property key of the class, function, or object
	 * @return {any}             The metadata for the key on the target/property key
	 */
	Metawriter.prototype.get = function(key, target, propertyKey){
		return Reflect.getMetadata(this._k(key), target, propertyKey);
	};

	Metawriter.prototype.getOwn = function(key, target, propertyKey){
		return Reflect.getOwnMetadata(this._k(key), target, propertyKey);
	};

	Metawriter.prototype.set = function(key, value, target, propertyKey){
		Reflect.defineMetadata(this._k(key), value, target, propertyKey);
	};

	Metawriter.prototype.push = function(key, value, target, propertyKey){
		if(!this.has(key, target, propertyKey)){
			this.set(key, [], target, propertyKey);
		}

		this.get(key, target, propertyKey).push(value);
	};

	Metawriter.prototype.has = function(key, target, propertyKey){
		return Reflect.hasMetadata(this._k(key), target, propertyKey);
	};

	Metawriter.prototype.hasOwn = function(key, target, propertyKey){
		return Reflect.hasOwnMetadata(this._k(key), target, propertyKey);
	};

	Metawriter.prototype.keys = function(target, propertyKey){
		return this._cleanKeys(Reflect.getMetadataKeys(target, propertyKey));
	};

	Metawriter.prototype.ownKeys = function(target, propertyKey){
		return this._cleanKeys(Reflect.getOwnMetadataKeys(target, propertyKey));
	};

	Metawriter.prototype.values = function(target, propertyKey){
		var keys = this.keys(target, propertyKey);
		var values = [];

		for(var i = 0; i < keys.length; i++)
		{
			values.push(this.get(keys[i], target, propertyKey));
		}

		return values;
	};

	Metawriter.prototype.ownValues = function(target, propertyKey){
		var keys = this.ownKeys(target, propertyKey);
		var values = [];

		for(var i = 0; i < keys.length; i++)
		{
			values.push(this.getOwn(keys[i], target, propertyKey));
		}

		return values;
	};

	Metawriter.prototype.forEach = function(callback, target, propertyKey){
		var keys = this.keys(target, propertyKey);

		for(var i = 0; i < keys.length; i++)
		{
			callback(this.get(keys[i], target, propertyKey), keys[i]);
		}
	};

	Metawriter.prototype.forEachOwn = function(callback, target, propertyKey){
		var keys = this.ownKeys(target, propertyKey);

		for(var i = 0; i < keys.length; i++)
		{
			callback(this.getOwn(keys[i], target, propertyKey), keys[i]);
		}
	};

	Metawriter.prototype.delete = function(key, target, propertyKey){
		Reflect.deleteMetadata(this._k(key), target, propertyKey);
	};

	Metawriter.prototype.deleteKeys = function(keys, target, propertyKey){
		for(var i = 0; i < keys.length; i++)
		{
			this.delete(keys[i], target, propertyKey);
		}
	};

	Metawriter.prototype.clear = function(target, propertyKey){
		this.deleteKeys(this.keys(target, propertyKey), target, propertyKey);
	};

	Metawriter.prototype.clearOwn = function(target, propertyKey){
		this.deleteKeys(this.ownKeys(target, propertyKey), target, propertyKey);
	};

	Metawriter.prototype._mine = function(key){
		return key.indexOf(this.namespace) === 0
	};

	Metawriter.prototype._k = function(key){
		if(typeof key != 'string')
		{
			throw new TypeError('Metawriter only supports string-based key names');
		}
		else if(key.length === 0)
		{
			throw new Error('Key length must be greater than zero');
		}

		return this.namespace + ':' + key;
	};

	Metawriter.prototype._strip = function(key){
		if(this._mine(key))
		{
			return key.substr(this.namespace.length + 1);
		}
		else
		{
			return key;
		}
	};

	Metawriter.prototype._cleanKeys = function(rawKeys){
		var keys = [];

		for(var i = 0; i < rawKeys.length; i++)
		{
			if(this._mine(rawKeys[i])) keys.push(this._strip(rawKeys[i]));
		}

		return keys;
	};

	return Metawriter;
})();

},{"reflect-metadata":1}],3:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _writers = _dereq_('../../writers');

var Require = function Require() {
	for (var _len = arguments.length, components = Array(_len), _key = 0; _key < _len; _key++) {
		components[_key] = arguments[_key];
	}

	return function (t) {
		if (_writers.componentWriter.has('require', t)) {
			var oldRequires = _writers.componentWriter.get('require', t);
			_writers.componentWriter.set('require', [].concat(_toConsumableArray(oldRequires), components), t);
		} else {
			_writers.componentWriter.set('require', components, t);
		}
	};
};
exports.Require = Require;

},{"../../writers":21}],4:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _writers = _dereq_('../../writers');

var Transclude = function Transclude(maybeT) {
	if (typeof maybeT === 'string' || typeof maybeT === 'boolean') {
		return function (t) {
			return _writers.componentWriter.set('transclude', maybeT, t);
		};
	} else {
		_writers.componentWriter.set('transclude', true, maybeT);
	}
};
exports.Transclude = Transclude;

},{"../../writers":21}],5:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _writers = _dereq_('../../writers');

var View = function View(config) {
	return function (t) {
		if (typeof config !== 'object' || !config.templateUrl && !config.template || t === undefined) {
			throw new Error('Config object must be passed to the view decorator with either a view url or an inline template');
		}

		if (config.templateUrl) {
			if (_writers.componentWriter.has('template', t)) {
				_writers.componentWriter.set('template', undefined, t);
			}

			_writers.componentWriter.set('templateUrl', config.templateUrl, t);
		} else if (config.template) {
			if (_writers.componentWriter.has('templateUrl', t)) {
				_writers.componentWriter.set('templateUrl', undefined, t);
			}

			_writers.componentWriter.set('template', config.template, t);
		}
	};
};
exports.View = View;

},{"../../writers":21}],6:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _writers = _dereq_('../writers');

var Inject = function Inject() {
	for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
		dependencies[_key] = arguments[_key];
	}

	return function (t) {
		if (_writers.baseWriter.has('$inject', t)) {
			var parentInjects = _writers.baseWriter.get('$inject', t);
			_writers.baseWriter.set('$inject', [].concat(dependencies, _toConsumableArray(parentInjects)), t);
		} else {
			_writers.baseWriter.set('$inject', dependencies, t);
		}
	};
};
exports.Inject = Inject;

},{"../writers":21}],7:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _bind = Function.prototype.bind;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _module2 = _dereq_('../../module');

var _module3 = _interopRequireDefault(_module2);

var _writers = _dereq_('../../writers');

var _utilParseSelector = _dereq_('../../util/parse-selector');

var _utilParseSelector2 = _interopRequireDefault(_utilParseSelector);

var TYPE = 'animation';

var Animation = function Animation(className) {
	if (typeof className !== 'string') {
		throw new Error('@Animation must be supplied with the name of a class: @Animation(\'.my-animation\'');
	}

	var _parseSelector = (0, _utilParseSelector2['default'])(className);

	var type = _parseSelector.type;

	if (type !== 'C') {
		throw new Error('Invalid selector passed to @Animation: ' + className + ' is not a class selector');
	}

	return function (target) {

		_writers.providerWriter.set('type', TYPE, target);
		_writers.providerWriter.set('name', className, target);
	};
};

exports.Animation = Animation;
_module3['default'].addProvider(TYPE, function (provider, name, injects, ngModule) {
	ngModule.animation(name, [].concat(_toConsumableArray(injects), [function () {
		for (var _len = arguments.length, depends = Array(_len), _key = 0; _key < _len; _key++) {
			depends[_key] = arguments[_key];
		}

		return new (_bind.apply(provider, [null].concat(depends)))();
	}]));
});

},{"../../module":16,"../../util/parse-selector":20,"../../writers":21}],8:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilParseSelector = _dereq_('../../util/parse-selector');

var _utilParseSelector2 = _interopRequireDefault(_utilParseSelector);

var _utilDecorateDirective = _dereq_('../../util/decorate-directive');

var _utilDecorateDirective2 = _interopRequireDefault(_utilDecorateDirective);

var _writers = _dereq_('../../writers');

var TYPE = 'directive';

var Component = function Component(config) {
	return function (t) {
		if (!config.selector) {
			throw new Error('Component selector must be provided');
		}

		var _parseSelector = (0, _utilParseSelector2['default'])(config.selector);

		var name = _parseSelector.name;
		var restrict = _parseSelector.type;

		if (restrict !== 'E') {
			throw new Error('@Component selectors can only be elements. Perhaps you meant to use @Directive?');
		}

		_writers.providerWriter.set('name', name, t);
		_writers.providerWriter.set('type', TYPE, t);

		// Sensible defaults for components
		if (!_writers.componentWriter.has('restrict', t)) {
			_writers.componentWriter.set('restrict', restrict, t);
		}
		if (!_writers.componentWriter.has('scope', t)) {
			_writers.componentWriter.set('scope', {}, t);
		}
		if (!_writers.componentWriter.has('bindToController', t)) {
			_writers.componentWriter.set('bindToController', true, t);
		}

		_writers.componentWriter.set('controllerAs', name, t);

		(0, _utilDecorateDirective2['default'])(config, t);
	};
};
exports.Component = Component;

},{"../../util/decorate-directive":17,"../../util/parse-selector":20,"../../writers":21}],9:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _module2 = _dereq_('../../module');

var _module3 = _interopRequireDefault(_module2);

var _utilDecoratorFactory = _dereq_('../../util/decorator-factory');

var _utilDecoratorFactory2 = _interopRequireDefault(_utilDecoratorFactory);

var TYPE = 'controller';

var Controller = (0, _utilDecoratorFactory2['default'])(TYPE);

exports.Controller = Controller;
_module3['default'].addProvider(TYPE, function (provider, name, injects, ngModule) {
	ngModule.controller(name, [].concat(_toConsumableArray(injects), [provider]));
});

},{"../../module":16,"../../util/decorator-factory":18}],10:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilDecorateDirective = _dereq_('../../util/decorate-directive');

var _utilDecorateDirective2 = _interopRequireDefault(_utilDecorateDirective);

var _utilParseSelector = _dereq_('../../util/parse-selector');

var _utilParseSelector2 = _interopRequireDefault(_utilParseSelector);

var _writers = _dereq_('../../writers');

var TYPE = 'directive';

var Directive = function Directive(config) {
	return function (t) {
		if (!config.selector) {
			throw new Error('Directive selector must be provided');
		}

		var _parseSelector = (0, _utilParseSelector2['default'])(config.selector);

		var name = _parseSelector.name;
		var type = _parseSelector.type;

		if (type === 'E') {
			throw new Error('Directives cannot be elements. Perhaps you meant to use @Component?');
		}

		_writers.providerWriter.set('name', name, t);
		_writers.providerWriter.set('type', TYPE, t);

		// Sensible defaults for attribute directives
		_writers.componentWriter.set('scope', false, t);
		_writers.componentWriter.set('restrict', type, t);

		(0, _utilDecorateDirective2['default'])(config, t);
	};
};
exports.Directive = Directive;

},{"../../util/decorate-directive":17,"../../util/parse-selector":20,"../../writers":21}],11:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _bind = Function.prototype.bind;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _module2 = _dereq_('../../module');

var _module3 = _interopRequireDefault(_module2);

var _utilDecoratorFactory = _dereq_('../../util/decorator-factory');

var _utilDecoratorFactory2 = _interopRequireDefault(_utilDecoratorFactory);

var TYPE = 'factory';

var Factory = (0, _utilDecoratorFactory2['default'])(TYPE);

exports.Factory = Factory;
_module3['default'].addProvider(TYPE, function (provider, name, injects, ngModule) {
	var create = provider.create || function (dependencies) {
		for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			params[_key - 1] = arguments[_key];
		}

		return new (_bind.apply(provider, [null].concat(_toConsumableArray(dependencies), params)))();
	};

	function factory() {
		for (var _len2 = arguments.length, dependencies = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			dependencies[_key2] = arguments[_key2];
		}

		return function () {
			for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				params[_key3] = arguments[_key3];
			}

			return create.apply(undefined, [dependencies].concat(params));
		};
	}

	ngModule.factory(name, [].concat(_toConsumableArray(injects), [factory]));
});

},{"../../module":16,"../../util/decorator-factory":18}],12:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _bind = Function.prototype.bind;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _module2 = _dereq_('../../module');

var _module3 = _interopRequireDefault(_module2);

var _utilDecoratorFactory = _dereq_('../../util/decorator-factory');

var _utilDecoratorFactory2 = _interopRequireDefault(_utilDecoratorFactory);

var TYPE = 'filter';

var Filter = (0, _utilDecoratorFactory2['default'])(TYPE);

exports.Filter = Filter;
_module3['default'].addProvider(TYPE, function (provider, name, injects, ngModule) {
	ngModule.filter(name, [].concat(_toConsumableArray(injects), [function () {
		for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
			dependencies[_key] = arguments[_key];
		}

		var filter = new (_bind.apply(provider, [null].concat(dependencies)))();

		if (!filter.transform) {
			throw new Error('Filters must implement a transform method');
		}

		return function (input) {
			for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				params[_key2 - 1] = arguments[_key2];
			}

			if (filter.supports && !filter.supports(input)) {
				throw new Error('Filter ' + name + ' does not support ' + input);
			}

			return filter.transform.apply(filter, [input].concat(params));
		};
	}]));
});

},{"../../module":16,"../../util/decorator-factory":18}],13:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _module2 = _dereq_('../../module');

var _module3 = _interopRequireDefault(_module2);

var _utilDecoratorFactory = _dereq_('../../util/decorator-factory');

var _utilDecoratorFactory2 = _interopRequireDefault(_utilDecoratorFactory);

var TYPE = 'provider';

var Provider = (0, _utilDecoratorFactory2['default'])(TYPE);

exports.Provider = Provider;
_module3['default'].addProvider(TYPE, function (provider, name, injects, ngModule) {
	ngModule.provider(name, [].concat(_toConsumableArray(injects), [provider]));
});

},{"../../module":16,"../../util/decorator-factory":18}],14:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _module2 = _dereq_('../../module');

var _module3 = _interopRequireDefault(_module2);

var _utilDecoratorFactory = _dereq_('../../util/decorator-factory');

var _utilDecoratorFactory2 = _interopRequireDefault(_utilDecoratorFactory);

var TYPE = 'service';

var Service = (0, _utilDecoratorFactory2['default'])(TYPE);

exports.Service = Service;
_module3['default'].addProvider(TYPE, function (provider, name, injects, ngModule) {
	ngModule.service(name, [].concat(_toConsumableArray(injects), [provider]));
});

},{"../../module":16,"../../util/decorator-factory":18}],15:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _module2 = _dereq_('./module');

var _module3 = _interopRequireDefault(_module2);

var _decoratorsInject = _dereq_('./decorators/inject');

var _decoratorsProvidersAnimation = _dereq_('./decorators/providers/animation');

var _decoratorsProvidersComponent = _dereq_('./decorators/providers/component');

var _decoratorsProvidersController = _dereq_('./decorators/providers/controller');

var _decoratorsProvidersDirective = _dereq_('./decorators/providers/directive');

var _decoratorsProvidersFactory = _dereq_('./decorators/providers/factory');

var _decoratorsProvidersFilter = _dereq_('./decorators/providers/filter');

var _decoratorsProvidersProvider = _dereq_('./decorators/providers/provider');

var _decoratorsProvidersService = _dereq_('./decorators/providers/service');

var _decoratorsComponentRequire = _dereq_('./decorators/component/require');

var _decoratorsComponentView = _dereq_('./decorators/component/view');

var _decoratorsComponentTransclude = _dereq_('./decorators/component/transclude');

exports.Module = _module3['default'];
exports.Inject = _decoratorsInject.Inject;
exports.Component = _decoratorsProvidersComponent.Component;
exports.Controller = _decoratorsProvidersController.Controller;
exports.Directive = _decoratorsProvidersDirective.Directive;
exports.Filter = _decoratorsProvidersFilter.Filter;
exports.Provider = _decoratorsProvidersProvider.Provider;
exports.Factory = _decoratorsProvidersFactory.Factory;
exports.Service = _decoratorsProvidersService.Service;
exports.Animation = _decoratorsProvidersAnimation.Animation;
exports.Require = _decoratorsComponentRequire.Require;
exports.View = _decoratorsComponentView.View;
exports.Transclude = _decoratorsComponentTransclude.Transclude;

},{"./decorators/component/require":3,"./decorators/component/transclude":4,"./decorators/component/view":5,"./decorators/inject":6,"./decorators/providers/animation":7,"./decorators/providers/component":8,"./decorators/providers/controller":9,"./decorators/providers/directive":10,"./decorators/providers/factory":11,"./decorators/providers/filter":12,"./decorators/providers/provider":13,"./decorators/providers/service":14,"./module":16}],16:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _writers = _dereq_('./writers');

var _parsers = {};

var DecoratedModule = (function () {
	function DecoratedModule(name) {
		var modules = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

		_classCallCheck(this, DecoratedModule);

		this.name = name;
		this.moduleList(modules);

		if (modules) {
			this._module = angular.module(name, this._dependencies);
		} else {
			this._module = angular.module(name);
		}
	}

	_createClass(DecoratedModule, [{
		key: 'add',
		value: function add() {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _len = arguments.length, providers = Array(_len), _key = 0; _key < _len; _key++) {
					providers[_key] = arguments[_key];
				}

				for (var _iterator = providers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var provider = _step.value;

					if (!_writers.providerWriter.has('type', provider)) {
						throw new Error('Cannot read provider metadata. Are you adding a class that hasn\'t been decorated yet?');
					}

					var type = _writers.providerWriter.get('type', provider);
					var _name = _writers.providerWriter.get('name', provider);
					var inject = _writers.baseWriter.get('$inject', provider) || [];

					if (_parsers[type]) {
						_parsers[type](provider, _name, inject, this._module);
					} else {
						throw new Error('No parser registered for type \'' + type + '\'');
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return this;
		}
	}, {
		key: 'publish',
		value: function publish() {
			return this._module;
		}
	}, {
		key: 'moduleList',
		value: function moduleList(modules) {
			this._dependencies = [];

			if (modules && modules.length !== 0) {
				for (var i = 0; i < modules.length; i++) {
					if (modules[i] && modules[i].name) {
						this._dependencies.push(modules[i].name);
					} else if (typeof modules[i] === 'string') {
						this._dependencies.push(modules[i]);
					} else {
						throw new Error('Cannot read module: Unknown module in ' + this.name);
					}
				}
			}
		}
	}, {
		key: 'config',
		value: function config(configFunc) {
			this._module.config(configFunc);

			return this;
		}
	}, {
		key: 'run',
		value: function run(runFunc) {
			this._module.run(runFunc);

			return this;
		}
	}, {
		key: 'value',
		value: function value() {
			var _module2;

			(_module2 = this._module).value.apply(_module2, arguments);

			return this;
		}
	}, {
		key: 'constant',
		value: function constant() {
			var _module3;

			(_module3 = this._module).constant.apply(_module3, arguments);

			return this;
		}
	}]);

	return DecoratedModule;
})();

function Module() {
	for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		params[_key2] = arguments[_key2];
	}

	return new (_bind.apply(DecoratedModule, [null].concat(params)))();
}

Module.addProvider = function (providerType, parser) {
	_parsers[providerType] = parser;
};

Module.getParser = function (providerType) {
	return _parsers[providerType];
};

exports['default'] = Module;
module.exports = exports['default'];

},{"./writers":21}],17:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _module2 = _dereq_('../module');

var _module3 = _interopRequireDefault(_module2);

var _writers = _dereq_('../writers');

var _parseProperties = _dereq_('./parse-properties');

var _parseProperties2 = _interopRequireDefault(_parseProperties);

exports['default'] = function (config, t) {
	// Support for legacy angular-decorators bind config
	if (config.bind) {
		_writers.componentWriter.set('scope', config.bind, t);
		_writers.componentWriter.set('bindToController', true, t);
	}

	// Check for scope
	if (config.scope) {
		var scope = _writers.componentWriter.get('scope', t);

		if (scope && typeof scope === 'object') {
			_writers.componentWriter.set('scope', _extends({}, scope, config.scope), t);
		} else {
			_writers.componentWriter.set('scope', config.scope, t);
		}
	}

	// Check for Angular 2 style properties
	if (config.properties && Array.isArray(config.properties)) {
		var binders = (0, _parseProperties2['default'])(config.properties);
		var previous = _writers.componentWriter.get('bindToController', t);

		if (previous && typeof previous === 'object') {
			_writers.componentWriter.set('bindToController', _extends({}, previous, binders), t);
		} else {
			_writers.componentWriter.set('bindToController', (0, _parseProperties2['default'])(config.properties), t);
		}
	} else if (config.properties !== undefined) {
		throw new TypeError('Component properties must be an array');
	}

	// Allow for renaming the controllerAs
	if (config.controllerAs) {
		_writers.componentWriter.set('controllerAs', config.controllerAs, t);
	}

	// Set a link function
	if (t.link) {
		_writers.componentWriter.set('link', t.link, t);
	}

	// Set a controller function
	if (t.compile) {
		_writers.componentWriter.set('compile', t.compile, t);
	}
};

_module3['default'].addProvider('directive', function (target, name, injects, ngModule) {
	var ddo = {};

	_writers.componentWriter.forEach(function (val, key) {
		ddo[key] = val;
	}, target);

	ddo.controller = [].concat(_toConsumableArray(injects), [target]);

	ngModule.directive(name, function () {
		return ddo;
	});
});
module.exports = exports['default'];

},{"../module":16,"../writers":21,"./parse-properties":19}],18:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _writers = _dereq_('../writers');

exports['default'] = function (type) {
	return function (maybeT) {
		if (typeof maybeT === 'string') {
			return function (t) {
				_writers.providerWriter.set('type', type, t);
				_writers.providerWriter.set('name', maybeT, t);
			};
		} else {
			_writers.providerWriter.set('type', type, maybeT);
			_writers.providerWriter.set('name', maybeT.name, maybeT);
		}
	};
};

module.exports = exports['default'];

},{"../writers":21}],19:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var ALLOWED_SYMBOLS = ['&', '=', '@', '=', '*', '?'];

function checkBindingType(str) {
	return ALLOWED_SYMBOLS.indexOf(str.charAt(0)) !== -1;
}

function parseProperty(str) {
	var symbols = [];

	function getName(_x) {
		var _again = true;

		_function: while (_again) {
			var input = _x;
			_again = false;

			if (checkBindingType(input.join(''))) {
				symbols.push(input.shift());
				_x = input;
				_again = true;
				continue _function;
			}

			return input;
		}
	}

	var name = getName(str.split(''));

	return { name: name.join(''), symbols: symbols.join('') };
}

exports['default'] = function (props) {
	var map = {};

	for (var i = 0; i < props.length; i++) {
		var split = props[i].split(':');

		for (var y = 0; y < split.length; y++) {
			split[y] = split[y].trim();
		}

		if (split.length === 1 && checkBindingType(split[0])) {
			var _parseProperty = parseProperty(split[0]);

			var _name = _parseProperty.name;
			var symbols = _parseProperty.symbols;

			map[_name] = symbols;
		} else if (split.length === 2 && checkBindingType(split[1])) {
			map[split[0]] = split[1];
		} else {
			throw new Error('Properties must be in the form of "propName: [&, @, =, =*, =?, =*?]attrName" or in the form of "[&, @, =, =*, =?, =*?]attrName"');
		}
	}

	return map;
};

module.exports = exports['default'];

},{}],20:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

exports['default'] = function (selector) {
	var selectorArray = undefined;
	var type = undefined;

	if (selector.match(/\[(.*?)\]/) !== null) {
		selectorArray = selector.slice(1, selector.length - 1).split('-');
		type = 'A';
	} else if (selector[0] === '.') {
		selectorArray = selector.slice(1, selector.length).split('-');
		type = 'C';
	} else {
		selectorArray = selector.split('-');
		type = 'E';
	}

	var first = selectorArray.shift();
	var name = undefined;

	if (selectorArray.length > 0) {
		for (var i = 0; i < selectorArray.length; i++) {
			var s = selectorArray[i];
			s = s.slice(0, 1).toUpperCase() + s.slice(1, s.length);
			selectorArray[i] = s;
		}

		name = [first].concat(_toConsumableArray(selectorArray)).join('');
	} else {
		name = first;
	}

	return { name: name, type: type };
};

module.exports = exports['default'];

},{}],21:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _metawriter = _dereq_('metawriter');

var _metawriter2 = _interopRequireDefault(_metawriter);

var baseWriter = new _metawriter2['default']('$ng-decs');
exports.baseWriter = baseWriter;
var providerWriter = new _metawriter2['default']('provider', baseWriter);
exports.providerWriter = providerWriter;
var componentWriter = new _metawriter2['default']('component', baseWriter);
exports.componentWriter = componentWriter;

},{"metawriter":2}]},{},[15])(15)
});