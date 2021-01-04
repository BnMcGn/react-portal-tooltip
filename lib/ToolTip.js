"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Card = _interopRequireDefault(require("./Card"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var portalNodes = {};

var ToolTip = /*#__PURE__*/function (_React$Component) {
  _inherits(ToolTip, _React$Component);

  var _super = _createSuper(ToolTip);

  function ToolTip() {
    _classCallCheck(this, ToolTip);

    return _super.apply(this, arguments);
  }

  _createClass(ToolTip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentDidUpdate(ToolTip.defaultProps, this.state);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this = this;

      var portalNode = portalNodes[this.props.group];

      if (this.props.active) {
        if (!portalNode) {
          portalNode = ToolTip.createPortal();
          portalNodes[this.props.group] = portalNode;
        }

        if (portalNode.timeout) {
          clearTimeout(portalNode.timeout);
        }

        portalNode.timeout = setTimeout(function () {
          ToolTip.renderPortal(portalNode, _this.props);
        }, 0);
      } else if (prevProps.active && portalNode) {
        if (portalNode.timeout) {
          clearTimeout(portalNode.timeout);
        }

        portalNode.timeout = setTimeout(function () {
          ToolTip.renderPortal(portalNode, _this.props);
        }, this.props.tooltipTimeout);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var portalNode = portalNodes[this.props.group];

      if (portalNode) {
        _reactDom.default.unmountComponentAtNode(portalNode.node);

        clearTimeout(portalNode.timeout);

        try {
          document.body.removeChild(portalNode.node);
        } catch (e) {}

        portalNodes[this.props.group] = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "createPortal",
    value: function createPortal() {
      var portalNode = {
        node: document.createElement('div'),
        timeout: false
      };
      portalNode.node.className = 'ToolTipPortal';
      document.body.appendChild(portalNode.node);
      return portalNode;
    }
  }, {
    key: "renderPortal",
    value: function renderPortal(portalNode, props) {
      var parent = props.parent,
          other = _objectWithoutProperties(props, ["parent"]);

      var parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent;

      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_Card.default, _extends({
        parentEl: parentEl
      }, other)), portalNode.node);
    }
  }]);

  return ToolTip;
}(_react.default.Component);

exports.default = ToolTip;

_defineProperty(ToolTip, "propTypes", {
  parent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]).isRequired,
  active: _propTypes.default.bool,
  group: _propTypes.default.string,
  tooltipTimeout: _propTypes.default.number
});

_defineProperty(ToolTip, "defaultProps", {
  active: false,
  group: 'main',
  tooltipTimeout: 500
});