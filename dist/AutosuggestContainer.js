'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _redux2 = require('./redux');

var _redux3 = _interopRequireDefault(_redux2);

var _Autosuggest = require('./Autosuggest');

var _Autosuggest2 = _interopRequireDefault(_Autosuggest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noop = function noop() {};
var alwaysTrue = function alwaysTrue() {
  return true;
};

var defaultTheme = {
  container: 'react-autosuggest__container',
  containerOpen: 'react-autosuggest__container--open',
  input: 'react-autosuggest__input',
  suggestionsContainer: 'react-autosuggest__suggestions-container',
  suggestion: 'react-autosuggest__suggestion',
  suggestionFocused: 'react-autosuggest__suggestion--focused',
  sectionContainer: 'react-autosuggest__section-container',
  sectionTitle: 'react-autosuggest__section-title',
  sectionSuggestionsContainer: 'react-autosuggest__section-suggestions-container'
};

function mapToAutowhateverTheme(theme) {
  var result = {};

  for (var key in theme) {
    switch (key) {
      case 'suggestionsContainer':
        result['itemsContainer'] = theme[key];
        break;

      case 'suggestion':
        result['item'] = theme[key];
        break;

      case 'suggestionFocused':
        result['itemFocused'] = theme[key];
        break;

      case 'sectionSuggestionsContainer':
        result['sectionItemsContainer'] = theme[key];
        break;

      default:
        result[key] = theme[key];
    }
  }

  return result;
}

var AutosuggestContainer = function (_Component) {
  _inherits(AutosuggestContainer, _Component);

  function AutosuggestContainer(_ref) {
    var alwaysRenderSuggestions = _ref.alwaysRenderSuggestions;

    _classCallCheck(this, AutosuggestContainer);

    var _this = _possibleConstructorReturn(this, (AutosuggestContainer.__proto__ || Object.getPrototypeOf(AutosuggestContainer)).call(this));

    var initialState = {
      isFocused: false,
      isCollapsed: !alwaysRenderSuggestions,
      focusedSectionIndex: null,
      focusedSuggestionIndex: null,
      valueBeforeUpDown: null,
      lastAction: null
    };

    _this.store = (0, _redux.createStore)(_redux3.default, initialState);

    _this.storeInputReference = _this.storeInputReference.bind(_this);
    return _this;
  }

  _createClass(AutosuggestContainer, [{
    key: 'storeInputReference',
    value: function storeInputReference(input) {
      this.input = input;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          multiSection = _props.multiSection,
          shouldRenderSuggestions = _props.shouldRenderSuggestions,
          suggestions = _props.suggestions,
          onSuggestionsUpdateRequested = _props.onSuggestionsUpdateRequested,
          getSuggestionValue = _props.getSuggestionValue,
          renderSuggestion = _props.renderSuggestion,
          renderSectionTitle = _props.renderSectionTitle,
          getSectionSuggestions = _props.getSectionSuggestions,
          inputProps = _props.inputProps,
          onSuggestionSelected = _props.onSuggestionSelected,
          focusInputOnSuggestionClick = _props.focusInputOnSuggestionClick,
          focusFirstSuggestion = _props.focusFirstSuggestion,
          alwaysRenderSuggestions = _props.alwaysRenderSuggestions,
          theme = _props.theme,
          id = _props.id;


      return _react2.default.createElement(_Autosuggest2.default, {
        multiSection: multiSection,
        shouldRenderSuggestions: alwaysRenderSuggestions ? alwaysTrue : shouldRenderSuggestions,
        alwaysRenderSuggestions: alwaysRenderSuggestions,
        suggestions: suggestions,
        onSuggestionsUpdateRequested: onSuggestionsUpdateRequested,
        getSuggestionValue: getSuggestionValue,
        renderSuggestion: renderSuggestion,
        renderSectionTitle: renderSectionTitle,
        getSectionSuggestions: getSectionSuggestions,
        inputProps: inputProps,
        onSuggestionSelected: onSuggestionSelected,
        focusInputOnSuggestionClick: focusInputOnSuggestionClick,
        focusFirstSuggestion: focusFirstSuggestion,
        theme: mapToAutowhateverTheme(theme),
        id: id,
        inputRef: this.storeInputReference,
        store: this.store });
    }
  }]);

  return AutosuggestContainer;
}(_react.Component);

AutosuggestContainer.propTypes = {
  suggestions: _react.PropTypes.array.isRequired,
  onSuggestionsUpdateRequested: _react.PropTypes.func,
  getSuggestionValue: _react.PropTypes.func.isRequired,
  renderSuggestion: _react.PropTypes.func.isRequired,
  inputProps: function inputProps(props, propName) {
    var inputProps = props[propName];

    if (!inputProps.hasOwnProperty('value')) {
      throw new Error('\'inputProps\' must have \'value\'.');
    }

    if (!inputProps.hasOwnProperty('onChange')) {
      throw new Error('\'inputProps\' must have \'onChange\'.');
    }
  },
  shouldRenderSuggestions: _react.PropTypes.func,
  alwaysRenderSuggestions: _react.PropTypes.bool,
  onSuggestionSelected: _react.PropTypes.func,
  multiSection: _react.PropTypes.bool,
  renderSectionTitle: _react.PropTypes.func,
  getSectionSuggestions: _react.PropTypes.func,
  focusInputOnSuggestionClick: _react.PropTypes.bool,
  focusFirstSuggestion: _react.PropTypes.bool,
  theme: _react.PropTypes.object,
  id: _react.PropTypes.string
};
AutosuggestContainer.defaultProps = {
  onSuggestionsUpdateRequested: noop,
  shouldRenderSuggestions: function shouldRenderSuggestions(value) {
    return value.trim().length > 0;
  },
  alwaysRenderSuggestions: false,
  onSuggestionSelected: noop,
  multiSection: false,
  renderSectionTitle: function renderSectionTitle() {
    throw new Error('`renderSectionTitle` must be provided');
  },
  getSectionSuggestions: function getSectionSuggestions() {
    throw new Error('`getSectionSuggestions` must be provided');
  },

  focusInputOnSuggestionClick: true,
  focusFirstSuggestion: false,
  theme: defaultTheme,
  id: '1'
};
exports.default = AutosuggestContainer;