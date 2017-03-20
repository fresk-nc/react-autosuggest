'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('./redux');

var _reactAutowhatever = require('react-autowhatever');

var _reactAutowhatever2 = _interopRequireDefault(_reactAutowhatever);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function mapStateToProps(state) {
  return {
    isFocused: state.isFocused,
    isCollapsed: state.isCollapsed,
    focusedSectionIndex: state.focusedSectionIndex,
    focusedSuggestionIndex: state.focusedSuggestionIndex,
    valueBeforeUpDown: state.valueBeforeUpDown,
    lastAction: state.lastAction
  };
}

var Autosuggest = function (_Component) {
  _inherits(Autosuggest, _Component);

  function Autosuggest() {
    _classCallCheck(this, Autosuggest);

    var _this = _possibleConstructorReturn(this, (Autosuggest.__proto__ || Object.getPrototypeOf(Autosuggest)).call(this));

    _this.storeInputReference = _this.storeInputReference.bind(_this);
    _this.onSuggestionMouseEnter = _this.onSuggestionMouseEnter.bind(_this);
    _this.onSuggestionMouseLeave = _this.onSuggestionMouseLeave.bind(_this);
    _this.onSuggestionMouseDown = _this.onSuggestionMouseDown.bind(_this);
    _this.onSuggestionClick = _this.onSuggestionClick.bind(_this);
    _this.itemProps = _this.itemProps.bind(_this);
    return _this;
  }

  _createClass(Autosuggest, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.suggestions !== this.props.suggestions) {
        var suggestions = nextProps.suggestions,
            inputProps = nextProps.inputProps,
            shouldRenderSuggestions = nextProps.shouldRenderSuggestions,
            isCollapsed = nextProps.isCollapsed,
            revealSuggestions = nextProps.revealSuggestions,
            lastAction = nextProps.lastAction;
        var value = inputProps.value;


        if (suggestions.length > 0 && shouldRenderSuggestions(value)) {
          this.maybeFocusFirstSuggestion();

          if (isCollapsed && lastAction !== 'click' && lastAction !== 'enter') {
            revealSuggestions();
          }
        }
      }
    }
  }, {
    key: 'getSuggestion',
    value: function getSuggestion(sectionIndex, suggestionIndex) {
      var _props = this.props,
          suggestions = _props.suggestions,
          multiSection = _props.multiSection,
          getSectionSuggestions = _props.getSectionSuggestions;


      if (multiSection) {
        return getSectionSuggestions(suggestions[sectionIndex])[suggestionIndex];
      }

      return suggestions[suggestionIndex];
    }
  }, {
    key: 'getFocusedSuggestion',
    value: function getFocusedSuggestion() {
      var _props2 = this.props,
          focusedSectionIndex = _props2.focusedSectionIndex,
          focusedSuggestionIndex = _props2.focusedSuggestionIndex;


      if (focusedSuggestionIndex === null) {
        return null;
      }

      return this.getSuggestion(focusedSectionIndex, focusedSuggestionIndex);
    }
  }, {
    key: 'getSuggestionValueByIndex',
    value: function getSuggestionValueByIndex(sectionIndex, suggestionIndex) {
      var getSuggestionValue = this.props.getSuggestionValue;


      return getSuggestionValue(this.getSuggestion(sectionIndex, suggestionIndex));
    }
  }, {
    key: 'getSuggestionIndices',
    value: function getSuggestionIndices(suggestionElement) {
      var sectionIndex = suggestionElement.getAttribute('data-section-index');
      var suggestionIndex = suggestionElement.getAttribute('data-suggestion-index');

      return {
        sectionIndex: typeof sectionIndex === 'string' ? parseInt(sectionIndex, 10) : null,
        suggestionIndex: parseInt(suggestionIndex, 10)
      };
    }
  }, {
    key: 'findSuggestionElement',
    value: function findSuggestionElement(startNode) {
      var node = startNode;

      do {
        if (node.getAttribute('data-suggestion-index') !== null) {
          return node;
        }

        node = node.parentNode;
      } while (node !== null);

      console.error('Clicked element:', startNode); // eslint-disable-line no-console
      throw new Error('Couldn\'t find suggestion element');
    }
  }, {
    key: 'maybeCallOnChange',
    value: function maybeCallOnChange(event, newValue, method) {
      var _props$inputProps = this.props.inputProps,
          value = _props$inputProps.value,
          onChange = _props$inputProps.onChange;


      if (newValue !== value) {
        onChange && onChange(event, { newValue: newValue, method: method });
      }
    }
  }, {
    key: 'maybeCallOnSuggestionsUpdateRequested',
    value: function maybeCallOnSuggestionsUpdateRequested(data) {
      var _props3 = this.props,
          onSuggestionsUpdateRequested = _props3.onSuggestionsUpdateRequested,
          shouldRenderSuggestions = _props3.shouldRenderSuggestions;


      if (shouldRenderSuggestions(data.value)) {
        onSuggestionsUpdateRequested(data);
      }
    }
  }, {
    key: 'maybeFocusFirstSuggestion',
    value: function maybeFocusFirstSuggestion() {
      var _props4 = this.props,
          focusFirstSuggestion = _props4.focusFirstSuggestion,
          multiSection = _props4.multiSection,
          updateFocusedSuggestion = _props4.updateFocusedSuggestion;


      if (focusFirstSuggestion) {
        updateFocusedSuggestion(multiSection ? 0 : null, 0);
      }
    }
  }, {
    key: 'willRenderSuggestions',
    value: function willRenderSuggestions() {
      var _props5 = this.props,
          suggestions = _props5.suggestions,
          inputProps = _props5.inputProps,
          shouldRenderSuggestions = _props5.shouldRenderSuggestions;
      var value = inputProps.value;


      return suggestions.length > 0 && shouldRenderSuggestions(value);
    }
  }, {
    key: 'storeInputReference',
    value: function storeInputReference(autowhatever) {
      if (autowhatever !== null) {
        var input = autowhatever.input;

        this.input = input;
        this.props.inputRef(input);
      }
    }
  }, {
    key: 'onSuggestionMouseEnter',
    value: function onSuggestionMouseEnter(event, _ref) {
      var sectionIndex = _ref.sectionIndex,
          itemIndex = _ref.itemIndex;

      this.props.updateFocusedSuggestion(sectionIndex, itemIndex);
    }
  }, {
    key: 'onSuggestionMouseLeave',
    value: function onSuggestionMouseLeave() {
      this.props.updateFocusedSuggestion(null, null);
    }
  }, {
    key: 'onSuggestionMouseDown',
    value: function onSuggestionMouseDown() {
      this.justClickedOnSuggestion = true;
    }
  }, {
    key: 'onSuggestionClick',
    value: function onSuggestionClick(event) {
      var _this2 = this;

      var _props6 = this.props,
          inputProps = _props6.inputProps,
          shouldRenderSuggestions = _props6.shouldRenderSuggestions,
          onSuggestionSelected = _props6.onSuggestionSelected,
          focusInputOnSuggestionClick = _props6.focusInputOnSuggestionClick,
          inputBlurred = _props6.inputBlurred,
          closeSuggestions = _props6.closeSuggestions;
      var value = inputProps.value,
          onBlur = inputProps.onBlur;

      var _getSuggestionIndices = this.getSuggestionIndices(this.findSuggestionElement(event.target)),
          sectionIndex = _getSuggestionIndices.sectionIndex,
          suggestionIndex = _getSuggestionIndices.suggestionIndex;

      var clickedSuggestion = this.getSuggestion(sectionIndex, suggestionIndex);
      var clickedSuggestionValue = this.props.getSuggestionValue(clickedSuggestion);

      this.maybeCallOnChange(event, clickedSuggestionValue, 'click');
      onSuggestionSelected(event, {
        suggestion: clickedSuggestion,
        suggestionValue: clickedSuggestionValue,
        sectionIndex: sectionIndex,
        method: 'click'
      });
      closeSuggestions('click');

      if (focusInputOnSuggestionClick === true) {
        this.input.focus();
      } else {
        inputBlurred(shouldRenderSuggestions(value));
        onBlur && onBlur(this.onBlurEvent);
      }

      this.maybeCallOnSuggestionsUpdateRequested({ value: clickedSuggestionValue, reason: 'click' });

      setTimeout(function () {
        _this2.justClickedOnSuggestion = false;
      });
    }
  }, {
    key: 'itemProps',
    value: function itemProps(_ref2) {
      var sectionIndex = _ref2.sectionIndex,
          itemIndex = _ref2.itemIndex;

      return {
        'data-section-index': sectionIndex,
        'data-suggestion-index': itemIndex,
        onMouseEnter: this.onSuggestionMouseEnter,
        onMouseLeave: this.onSuggestionMouseLeave,
        onMouseDown: this.onSuggestionMouseDown,
        onTouchStart: this.onSuggestionMouseDown, // Because on iOS `onMouseDown` is not triggered
        onClick: this.onSuggestionClick
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this,
          _extends2;

      var _props7 = this.props,
          suggestions = _props7.suggestions,
          renderSuggestion = _props7.renderSuggestion,
          inputProps = _props7.inputProps,
          shouldRenderSuggestions = _props7.shouldRenderSuggestions,
          onSuggestionSelected = _props7.onSuggestionSelected,
          multiSection = _props7.multiSection,
          renderSectionTitle = _props7.renderSectionTitle,
          id = _props7.id,
          getSectionSuggestions = _props7.getSectionSuggestions,
          theme = _props7.theme,
          isFocused = _props7.isFocused,
          isCollapsed = _props7.isCollapsed,
          focusedSectionIndex = _props7.focusedSectionIndex,
          focusedSuggestionIndex = _props7.focusedSuggestionIndex,
          valueBeforeUpDown = _props7.valueBeforeUpDown,
          inputFocused = _props7.inputFocused,
          inputBlurred = _props7.inputBlurred,
          inputChanged = _props7.inputChanged,
          updateFocusedSuggestion = _props7.updateFocusedSuggestion,
          revealSuggestions = _props7.revealSuggestions,
          closeSuggestions = _props7.closeSuggestions,
          getSuggestionValue = _props7.getSuggestionValue,
          alwaysRenderSuggestions = _props7.alwaysRenderSuggestions;
      var value = inputProps.value,
          _onBlur = inputProps.onBlur,
          _onFocus = inputProps.onFocus,
          _onKeyDown = inputProps.onKeyDown;

      var isOpen = alwaysRenderSuggestions || isFocused && !isCollapsed && this.willRenderSuggestions();
      var items = isOpen ? suggestions : [];
      var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
      var autowhateverInputProps = _extends({}, inputProps, (_extends2 = {
        onFocus: function onFocus(event) {
          if (!_this3.justClickedOnSuggestion) {
            inputFocused(shouldRenderSuggestions(value));
            _onFocus && _onFocus(event);

            if (suggestions.length > 0) {
              _this3.maybeFocusFirstSuggestion();
            }
          }
        },
        onBlur: function onBlur(event) {
          _this3.onBlurEvent = event;

          if (!_this3.justClickedOnSuggestion) {
            inputBlurred(shouldRenderSuggestions(value));
            _onBlur && _onBlur(event);

            if (valueBeforeUpDown !== null && value !== valueBeforeUpDown) {
              _this3.maybeCallOnSuggestionsUpdateRequested({ value: value, reason: 'blur' });
            }
          }
        }
      }, _defineProperty(_extends2, isIE11 ? 'onInput' : 'onChange', function (event) {
        var value = event.target.value;
        var shouldRenderSuggestions = _this3.props.shouldRenderSuggestions;


        _this3.maybeCallOnChange(event, value, 'type');
        inputChanged(shouldRenderSuggestions(value), 'type');
        _this3.maybeCallOnSuggestionsUpdateRequested({ value: value, reason: 'type' });
      }), _defineProperty(_extends2, 'onKeyDown', function onKeyDown(event, data) {
        switch (event.key) {
          case 'ArrowDown':
          case 'ArrowUp':
            if (isCollapsed) {
              if (_this3.willRenderSuggestions()) {
                revealSuggestions();
              }
            } else if (suggestions.length > 0) {
              var newFocusedSectionIndex = data.newFocusedSectionIndex,
                  newFocusedItemIndex = data.newFocusedItemIndex;


              var newValue = void 0;

              if (newFocusedItemIndex === null) {
                // valueBeforeUpDown can be null if, for example, user
                // hovers on the first suggestion and then pressed Up.
                // If that happens, use the original input value.
                newValue = valueBeforeUpDown === null ? value : valueBeforeUpDown;
              } else {
                newValue = _this3.getSuggestionValueByIndex(newFocusedSectionIndex, newFocusedItemIndex);
              }

              updateFocusedSuggestion(newFocusedSectionIndex, newFocusedItemIndex, value);
              _this3.maybeCallOnChange(event, newValue, event.key === 'ArrowDown' ? 'down' : 'up');
            }
            event.preventDefault();
            break;

          case 'Enter':
            {
              var focusedSuggestion = _this3.getFocusedSuggestion();

              if (isOpen && !alwaysRenderSuggestions) {
                closeSuggestions('enter');
              }

              if (focusedSuggestion !== null) {
                var _newValue = getSuggestionValue(focusedSuggestion);

                onSuggestionSelected(event, {
                  suggestion: focusedSuggestion,
                  suggestionValue: _newValue,
                  sectionIndex: focusedSectionIndex,
                  method: 'enter'
                });

                _this3.maybeCallOnChange(event, _newValue, 'enter');
                _this3.maybeCallOnSuggestionsUpdateRequested({ value: _newValue, reason: 'enter' });
              }
              break;
            }

          case 'Escape':
            if (isOpen) {
              // If input.type === 'search', the browser clears the input
              // when Escape is pressed. We want to disable this default
              // behaviour so that, when suggestions are shown, we just hide
              // them, without clearing the input.
              event.preventDefault();
            }

            if (valueBeforeUpDown === null) {
              // Didn't interact with Up/Down
              if (alwaysRenderSuggestions || !isOpen) {
                _this3.maybeCallOnChange(event, '', 'escape');
                _this3.maybeCallOnSuggestionsUpdateRequested({ value: '', reason: 'escape' });
              }
            } else {
              // Interacted with Up/Down
              _this3.maybeCallOnChange(event, valueBeforeUpDown, 'escape');
            }

            if (isOpen && !alwaysRenderSuggestions) {
              closeSuggestions('escape');
            } else {
              updateFocusedSuggestion(null, null);
            }

            break;
        }

        _onKeyDown && _onKeyDown(event);
      }), _extends2));
      var renderSuggestionData = {
        query: (valueBeforeUpDown || value).trim()
      };

      return _react2.default.createElement(_reactAutowhatever2.default, {
        multiSection: multiSection,
        items: items,
        renderItem: renderSuggestion,
        renderItemData: renderSuggestionData,
        renderSectionTitle: renderSectionTitle,
        getSectionItems: getSectionSuggestions,
        focusedSectionIndex: focusedSectionIndex,
        focusedItemIndex: focusedSuggestionIndex,
        inputProps: autowhateverInputProps,
        itemProps: this.itemProps,
        theme: theme,
        id: id,
        ref: this.storeInputReference });
    }
  }]);

  return Autosuggest;
}(_react.Component);

Autosuggest.propTypes = {
  suggestions: _react.PropTypes.array.isRequired,
  onSuggestionsUpdateRequested: _react.PropTypes.func.isRequired,
  getSuggestionValue: _react.PropTypes.func.isRequired,
  renderSuggestion: _react.PropTypes.func.isRequired,
  inputProps: _react.PropTypes.object.isRequired,
  shouldRenderSuggestions: _react.PropTypes.func.isRequired,
  alwaysRenderSuggestions: _react.PropTypes.bool.isRequired,
  onSuggestionSelected: _react.PropTypes.func.isRequired,
  multiSection: _react.PropTypes.bool.isRequired,
  renderSectionTitle: _react.PropTypes.func.isRequired,
  getSectionSuggestions: _react.PropTypes.func.isRequired,
  focusInputOnSuggestionClick: _react.PropTypes.bool.isRequired,
  focusFirstSuggestion: _react.PropTypes.bool.isRequired,
  theme: _react.PropTypes.object.isRequired,
  id: _react.PropTypes.string.isRequired,
  inputRef: _react.PropTypes.func.isRequired,

  isFocused: _react.PropTypes.bool.isRequired,
  isCollapsed: _react.PropTypes.bool.isRequired,
  focusedSectionIndex: _react.PropTypes.number,
  focusedSuggestionIndex: _react.PropTypes.number,
  valueBeforeUpDown: _react.PropTypes.string,
  lastAction: _react.PropTypes.string,

  inputFocused: _react.PropTypes.func.isRequired,
  inputBlurred: _react.PropTypes.func.isRequired,
  inputChanged: _react.PropTypes.func.isRequired,
  updateFocusedSuggestion: _react.PropTypes.func.isRequired,
  revealSuggestions: _react.PropTypes.func.isRequired,
  closeSuggestions: _react.PropTypes.func.isRequired
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, _redux.actionCreators)(Autosuggest);