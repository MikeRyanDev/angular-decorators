'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilTests = require('../util/tests');

var _utilTests2 = _interopRequireDefault(_utilTests);

var _require = require('./require');

describe('@Require annotation for requiring directive controllers', function () {
	it('should add $component meta data', function () {
		var MyComponent = (function () {
			function MyComponent() {
				_classCallCheck(this, _MyComponent);
			}

			var _MyComponent = MyComponent;
			MyComponent = (0, _require.Require)('^parentCtrl', 'siblingCtrl')(MyComponent) || MyComponent;
			return MyComponent;
		})();

		MyComponent.$component.require.should.eql(['^parentCtrl', 'siblingCtrl']);
	});

	it('should add a convience static method for unpacking requires', function () {
		var MyComponent = (function () {
			function MyComponent() {
				_classCallCheck(this, _MyComponent2);
			}

			var _MyComponent2 = MyComponent;

			_createClass(_MyComponent2, null, [{
				key: 'link',
				value: function link(scope, element, attrs, ctrls) {
					var _MyComponent$unpackRequires = MyComponent.unpackRequires(ctrls);

					var parentCtrl = _MyComponent$unpackRequires.parentCtrl;
					var siblingCtrl = _MyComponent$unpackRequires.siblingCtrl;

					parentCtrl.should.eql('Parent Controller');
					siblingCtrl.should.eql('Sibling Controller');
				}
			}]);

			MyComponent = (0, _require.Require)('^parentCtrl', 'siblingCtrl')(MyComponent) || MyComponent;
			return MyComponent;
		})();

		MyComponent.link(0, 0, 0, ['Parent Controller', 'Sibling Controller']);
	});

	it('should adhere to inheritance', function () {
		var Test = (function () {
			function Test() {
				_classCallCheck(this, _Test);
			}

			var _Test = Test;
			Test = (0, _require.Require)('^parent')(Test) || Test;
			return Test;
		})();

		var NewTest = (function (_Test2) {
			function NewTest() {
				_classCallCheck(this, _NewTest);

				_get(Object.getPrototypeOf(_NewTest.prototype), 'constructor', this).apply(this, arguments);
			}

			_inherits(NewTest, _Test2);

			var _NewTest = NewTest;
			NewTest = (0, _require.Require)('sibling')(NewTest) || NewTest;
			return NewTest;
		})(Test);

		Test.$component.require.should.eql(['^parent']);

		NewTest.$component.require.should.eql(['^parent', 'sibling']);
	});
});