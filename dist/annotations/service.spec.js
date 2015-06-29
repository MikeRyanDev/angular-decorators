'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _moduleModule = require('../module/module');

var _service = require('./service');

var _utilTests = require('../util/tests');

describe('@Service Annotation', function () {
	it('should annotate a class', function () {
		var MyService = (function () {
			function MyService() {
				_classCallCheck(this, _MyService);
			}

			var _MyService = MyService;
			MyService = (0, _service.Service)(MyService) || MyService;
			return MyService;
		})();

		MyService.should.have.property('$provider');
		MyService.$provider.name.should.equal('MyService');
		MyService.$provider.type.should.equal('service');
	});

	it('should adhere to inheritance', function () {
		var BaseClass = (function () {
			function BaseClass() {
				_classCallCheck(this, _BaseClass);
			}

			var _BaseClass = BaseClass;
			BaseClass = (0, _service.Service)(BaseClass) || BaseClass;
			return BaseClass;
		})();

		var MyClass = (function (_BaseClass2) {
			function MyClass() {
				_classCallCheck(this, _MyClass);

				_get(Object.getPrototypeOf(_MyClass.prototype), 'constructor', this).apply(this, arguments);
			}

			_inherits(MyClass, _BaseClass2);

			var _MyClass = MyClass;
			MyClass = (0, _service.Service)(MyClass) || MyClass;
			return MyClass;
		})(BaseClass);

		BaseClass.$provider.name.should.equal('BaseClass');
		MyClass.$provider.name.should.equal('MyClass');
	});

	it('should let you specify a name for the service', function () {
		var BaseClass = (function () {
			function BaseClass() {
				_classCallCheck(this, _BaseClass3);
			}

			var _BaseClass3 = BaseClass;
			BaseClass = (0, _service.Service)('Renamed')(BaseClass) || BaseClass;
			return BaseClass;
		})();

		BaseClass.$provider.name.should.eql('Renamed');
		BaseClass.$provider.type.should.eql('service');
	});

	describe('Parser', function () {
		var parser = undefined,
		    module = undefined;

		beforeEach(function () {
			parser = _moduleModule.Module.getParser('service');
			module = {
				service: _utilTests.sinon.spy()
			};
		});

		it('should register itself with Module', function () {
			parser.should.be.defined;
		});

		it('should parse an annotated class into an ng service', function () {
			var MyService = (function () {
				function MyService() {
					_classCallCheck(this, _MyService2);
				}

				var _MyService2 = MyService;
				MyService = (0, _service.Service)(MyService) || MyService;
				return MyService;
			})();

			parser(MyService, module);

			var name = module.service.args[0][0];
			var service = module.service.args[0][1];

			name.should.equal('MyService');
			service.should.eql(MyService);
		});
	});
});