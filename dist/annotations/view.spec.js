'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _view = require('./view');

var _utilTests = require('../util/tests');

var _utilTests2 = _interopRequireDefault(_utilTests);

describe('@View Annotation', function () {
	it('should add a template option to a component', function () {
		var MyClass = (function () {
			function MyClass() {
				_classCallCheck(this, _MyClass);
			}

			var _MyClass = MyClass;
			MyClass = (0, _view.View)({ template: 'test' })(MyClass) || MyClass;
			return MyClass;
		})();

		MyClass.should.have.property('$component');
		MyClass.$component.should.have.property('template');
	});

	it('should support inline templates', function () {
		var MyClass = (function () {
			function MyClass() {
				_classCallCheck(this, _MyClass2);
			}

			var _MyClass2 = MyClass;
			MyClass = (0, _view.View)({ template: 'test' })(MyClass) || MyClass;
			return MyClass;
		})();

		MyClass.$component.should.have.property('template', 'test');
	});

	it('should support template URLs', function () {
		var MyClass = (function () {
			function MyClass() {
				_classCallCheck(this, _MyClass3);
			}

			var _MyClass3 = MyClass;
			MyClass = (0, _view.View)({ templateUrl: '/path/to/it' })(MyClass) || MyClass;
			return MyClass;
		})();

		MyClass.$component.should.have.property('templateUrl', '/path/to/it');
	});

	it('should overwrite previously set template options via inheritance', function () {
		var MyClass = (function () {
			function MyClass() {
				_classCallCheck(this, _MyClass4);
			}

			var _MyClass4 = MyClass;
			MyClass = (0, _view.View)({ template: 'test' })(MyClass) || MyClass;
			return MyClass;
		})();

		var NewClass = (function (_MyClass5) {
			function NewClass() {
				_classCallCheck(this, _NewClass);

				_get(Object.getPrototypeOf(_NewClass.prototype), 'constructor', this).apply(this, arguments);
			}

			_inherits(NewClass, _MyClass5);

			var _NewClass = NewClass;
			NewClass = (0, _view.View)({ templateUrl: '/path/to/it' })(NewClass) || NewClass;
			return NewClass;
		})(MyClass);

		var TestClass = (function (_NewClass2) {
			function TestClass() {
				_classCallCheck(this, _TestClass);

				_get(Object.getPrototypeOf(_TestClass.prototype), 'constructor', this).apply(this, arguments);
			}

			_inherits(TestClass, _NewClass2);

			var _TestClass = TestClass;
			TestClass = (0, _view.View)({ template: 'new test' })(TestClass) || TestClass;
			return TestClass;
		})(NewClass);

		MyClass.$component.should.have.property('template', 'test');
		NewClass.$component.should.have.property('templateUrl', '/path/to/it');
		NewClass.$component.should.not.have.property('template');
		TestClass.$component.should.have.property('template', 'new test');
		TestClass.$component.should.not.have.property('templateUrl');
	});
});