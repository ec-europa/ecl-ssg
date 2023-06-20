var ECL = (function (exports) {
  'use strict';

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var iconSvgAllCheckEc = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><path d=\"m20 28 16-16 4 4-20 20L8 24l4-4 8 8Z\" fill-rule=\"evenodd\"/></svg>";

  var iconSvgAllCornerArrowEc = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><path d=\"M0 0h48v48H0z\" fill=\"none\"/><path d=\"M40 39 24 21 8 39l-6-6L24 9l22 24-6 6Z\" fill-rule=\"evenodd\"/></svg>";

  var iconSvgAllCheck = iconSvgAllCheckEc;
  var iconSvgAllCornerArrow = iconSvgAllCornerArrowEc;

  /**
   * There are multiple labels contained in this component. You can set them in 2 ways: directly as a string or through data attributes.
   * Textual values have precedence and if they are not provided, then DOM data attributes are used.
   *
   * @param {HTMLElement} element DOM element for component instantiation and scope
   * @param {Object} options
   * @param {String} options.defaultText The default placeholder
   * @param {String} options.searchText The label for search
   * @param {String} options.selectAllText The label for select all
   * @param {String} options.selectMultipleId The id attribute of the select multiple
   * @param {String} options.selectMultipleSelector The data attribute selector of the select multiple
   * @param {String} options.defaultTextAttribute The data attribute for the default placeholder text
   * @param {String} options.searchTextAttribute The data attribute for the default search text
   * @param {String} options.selectAllTextAttribute The data attribute for the select all text
   * @param {String} options.noResultsTextAttribute The data attribute for the no results options text
   */
  var Select = /*#__PURE__*/function () {
    /**
     * @static
     * Shorthand for instance creation and initialisation.
     *
     * @param {HTMLElement} root DOM element for component instantiation and scope
     *
     * @return {Select} An instance of Select.
     */
    Select.autoInit = function autoInit(root, defaultOptions) {
      if (defaultOptions === void 0) {
        defaultOptions = {};
      }
      var select = new Select(root, defaultOptions);
      select.init();
      root.ECLSelect = select;
      return select;
    };
    function Select(element, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$defaultText = _ref.defaultText,
        defaultText = _ref$defaultText === void 0 ? '' : _ref$defaultText,
        _ref$searchText = _ref.searchText,
        searchText = _ref$searchText === void 0 ? '' : _ref$searchText,
        _ref$selectAllText = _ref.selectAllText,
        selectAllText = _ref$selectAllText === void 0 ? '' : _ref$selectAllText,
        _ref$noResultsText = _ref.noResultsText,
        noResultsText = _ref$noResultsText === void 0 ? '' : _ref$noResultsText,
        _ref$selectMultipleId = _ref.selectMultipleId,
        selectMultipleId = _ref$selectMultipleId === void 0 ? 'select-multiple' : _ref$selectMultipleId,
        _ref$selectMultipleSe = _ref.selectMultipleSelector,
        selectMultipleSelector = _ref$selectMultipleSe === void 0 ? '[data-ecl-select-multiple]' : _ref$selectMultipleSe,
        _ref$defaultTextAttri = _ref.defaultTextAttribute,
        defaultTextAttribute = _ref$defaultTextAttri === void 0 ? 'data-ecl-select-default' : _ref$defaultTextAttri,
        _ref$searchTextAttrib = _ref.searchTextAttribute,
        searchTextAttribute = _ref$searchTextAttrib === void 0 ? 'data-ecl-select-search' : _ref$searchTextAttrib,
        _ref$selectAllTextAtt = _ref.selectAllTextAttribute,
        selectAllTextAttribute = _ref$selectAllTextAtt === void 0 ? 'data-ecl-select-all' : _ref$selectAllTextAtt,
        _ref$noResultsTextAtt = _ref.noResultsTextAttribute,
        noResultsTextAttribute = _ref$noResultsTextAtt === void 0 ? 'data-ecl-select-no-results' : _ref$noResultsTextAtt,
        _ref$closeLabelAttrib = _ref.closeLabelAttribute,
        closeLabelAttribute = _ref$closeLabelAttrib === void 0 ? 'data-ecl-select-close' : _ref$closeLabelAttrib,
        _ref$clearAllLabelAtt = _ref.clearAllLabelAttribute,
        clearAllLabelAttribute = _ref$clearAllLabelAtt === void 0 ? 'data-ecl-select-clear-all' : _ref$clearAllLabelAtt,
        _ref$selectMultiplesS = _ref.selectMultiplesSelectionCountSelector,
        selectMultiplesSelectionCountSelector = _ref$selectMultiplesS === void 0 ? 'ecl-select-multiple-selections-counter' : _ref$selectMultiplesS,
        _ref$closeButtonLabel = _ref.closeButtonLabel,
        closeButtonLabel = _ref$closeButtonLabel === void 0 ? '' : _ref$closeButtonLabel,
        _ref$clearAllButtonLa = _ref.clearAllButtonLabel,
        clearAllButtonLabel = _ref$clearAllButtonLa === void 0 ? '' : _ref$clearAllButtonLa;
      // Check element
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      // Options
      this.selectMultipleId = selectMultipleId;
      this.selectMultipleSelector = selectMultipleSelector;
      this.selectMultiplesSelectionCountSelector = selectMultiplesSelectionCountSelector;
      this.defaultTextAttribute = defaultTextAttribute;
      this.searchTextAttribute = searchTextAttribute;
      this.selectAllTextAttribute = selectAllTextAttribute;
      this.noResultsTextAttribute = noResultsTextAttribute;
      this.defaultText = defaultText;
      this.searchText = searchText;
      this.selectAllText = selectAllText;
      this.noResultsText = noResultsText;
      this.clearAllButtonLabel = clearAllButtonLabel;
      this.closeButtonLabel = closeButtonLabel;
      this.closeLabelAttribute = closeLabelAttribute;
      this.clearAllLabelAttribute = clearAllLabelAttribute;

      // Private variables
      this.input = null;
      this.search = null;
      this.checkboxes = null;
      this.select = null;
      this.selectAll = null;
      this.selectIcon = null;
      this.textDefault = null;
      this.textSearch = null;
      this.textSelectAll = null;
      this.textNoResults = null;
      this.selectMultiple = null;
      this.inputContainer = null;
      this.optionsContainer = null;
      this.searchContainer = null;
      this.countSelections = null;
      this.form = null;

      // Bind `this` for use in callbacks
      this.updateCurrentValue = this.updateCurrentValue.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
      this.handleClickOption = this.handleClickOption.bind(this);
      this.handleClickSelectAll = this.handleClickSelectAll.bind(this);
      this.handleEsc = this.handleEsc.bind(this);
      this.handleFocusout = this.handleFocusout.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
      this.moveFocus = this.moveFocus.bind(this);
      this.resetForm = this.resetForm.bind(this);
      this.handleClickOnClearAll = this.handleClickOnClearAll.bind(this);
      this.handleKeyboardOnSelect = this.handleKeyboardOnSelect.bind(this);
      this.handleKeyboardOnSelectAll = this.handleKeyboardOnSelectAll.bind(this);
      this.handleKeyboardOnSearch = this.handleKeyboardOnSearch.bind(this);
      this.handleKeyboardOnOptions = this.handleKeyboardOnOptions.bind(this);
      this.handleKeyboardOnOption = this.handleKeyboardOnOption.bind(this);
      this.handleKeyboardOnClearAll = this.handleKeyboardOnClearAll.bind(this);
      this.handleKeyboardOnClose = this.handleKeyboardOnClose.bind(this);
      this.updateSelectionsCount = this.updateSelectionsCount.bind(this);
    }

    /**
     * @returns {HTMLElement}
     */
    Select.createSvgIcon = function createSvgIcon(icon, classes) {
      var tempElement = document.createElement('div');
      tempElement.innerHTML = icon; // avoiding the use of not-so-stable createElementNs
      var svg = tempElement.children[0];
      svg.removeAttribute('height');
      svg.removeAttribute('width');
      svg.setAttribute('focusable', false);
      svg.setAttribute('aria-hidden', true);
      // The following element is <path> which does not support classList API as others.
      svg.setAttribute('class', classes);
      return svg;
    }

    /**
     * @param {Object} options
     * @param {String} options.id
     * @param {String} options.text
     * @param {String} [options.extraClass] - additional CSS class
     * @param {String} [options.disabled] - relevant when re-creating an option
     * @param {String} [options.selected] - relevant when re-creating an option
     * @param {String} ctx
     * @returns {HTMLElement}
     */;
    Select.createCheckbox = function createCheckbox(options, ctx) {
      // Early returns.
      if (!options || !ctx) return '';
      var id = options.id,
        text = options.text,
        disabled = options.disabled,
        selected = options.selected,
        extraClass = options.extraClass;
      if (!id || !text) return '';

      // Elements to work with.
      var checkbox = document.createElement('div');
      var input = document.createElement('input');
      var label = document.createElement('label');
      var box = document.createElement('span');
      var labelText = document.createElement('span');

      // Respect optional input parameters.
      if (extraClass) {
        checkbox.classList.add(extraClass);
      }
      if (selected) {
        input.setAttribute('checked', true);
      }
      if (disabled) {
        checkbox.classList.add('ecl-checkbox--disabled');
        input.setAttribute('disabled', disabled);
      }

      // Imperative work follows.
      checkbox.classList.add('ecl-checkbox');
      checkbox.setAttribute('data-select-multiple-value', text);
      input.classList.add('ecl-checkbox__input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', ctx + "-" + id);
      checkbox.appendChild(input);
      label.classList.add('ecl-checkbox__label');
      label.setAttribute('for', ctx + "-" + id);
      box.classList.add('ecl-checkbox__box');
      box.appendChild(Select.createSvgIcon(iconSvgAllCheck, 'ecl-icon ecl-icon--s ecl-checkbox__icon'));
      label.appendChild(box);
      labelText.classList.add('ecl-checkbox__label-text');
      labelText.innerHTML = text;
      label.appendChild(labelText);
      checkbox.appendChild(label);
      return checkbox;
    }

    /**
     * @returns {HTMLElement}
     */;
    Select.createSelectIcon = function createSelectIcon() {
      var wrapper = document.createElement('div');
      wrapper.classList.add('ecl-select__icon');
      var icon = Select.createSvgIcon(iconSvgAllCornerArrow, 'ecl-icon ecl-icon--s ecl-select__icon-shape ecl-icon--rotate-180');
      wrapper.appendChild(icon);
      return wrapper;
    }

    /**
     * Manually checks an ECL-specific checkbox when previously default has been prevented.
     * @param {Event} e
     */;
    Select.checkCheckbox = function checkCheckbox(e) {
      var input = e.target.closest('.ecl-checkbox').querySelector('input');
      input.checked = !input.checked;
      return input.checked;
    }

    /**
     * Generate random string
     * @param {number} length
     */;
    Select.generateRandomId = function generateRandomId(length) {
      return Math.random().toString(36).substr(2, length);
    }

    /**
     * Initialise component.
     */;
    var _proto = Select.prototype;
    _proto.init = function init() {
      var _this$inputContainer$,
        _this$searchContainer,
        _this = this;
      this.select = this.element;
      var containerClasses = Array.from(this.select.parentElement.classList);
      this.textDefault = this.defaultText || this.element.getAttribute(this.defaultTextAttribute);
      this.textSearch = this.searchText || this.element.getAttribute(this.searchTextAttribute);
      this.textSelectAll = this.selectAllText || this.element.getAttribute(this.selectAllTextAttribute);
      this.textNoResults = this.noResultsText || this.element.getAttribute(this.noResultsTextAttribute);
      this.closeButtonLabel = this.closeButtonLabel || this.element.getAttribute(this.closeLabelAttribute);
      this.clearAllButtonLabel = this.clearAllButtonLabel || this.element.getAttribute(this.clearAllLabelAttribute);
      this.selectMultiple = document.createElement('div');
      this.selectMultiple.classList.add('ecl-select__multiple');
      // Close the searchContainer when tabbing out of the selectMultple
      this.selectMultiple.addEventListener('focusout', this.handleFocusout);
      this.inputContainer = document.createElement('div');
      (_this$inputContainer$ = this.inputContainer.classList).add.apply(_this$inputContainer$, containerClasses);
      this.selectMultiple.appendChild(this.inputContainer);
      this.input = document.createElement('input');
      this.input.classList.add('ecl-select', 'ecl-select__multiple-toggle');
      this.input.setAttribute('type', 'text');
      this.input.setAttribute('placeholder', this.textDefault || '');
      this.input.setAttribute('readonly', true);
      if (containerClasses.find(function (c) {
        return c.includes('disabled');
      })) {
        this.input.setAttribute('disabled', true);
      }
      this.input.addEventListener('keydown', this.handleKeyboardOnSelect);
      this.input.addEventListener('click', this.handleToggle);
      this.selectionCount = document.createElement('div');
      this.selectionCount.classList.add(this.selectMultiplesSelectionCountSelector);
      this.selectionCountText = document.createElement('span');
      this.selectionCount.appendChild(this.selectionCountText);
      this.inputContainer.appendChild(this.selectionCount);
      this.inputContainer.appendChild(this.input);
      this.inputContainer.appendChild(Select.createSelectIcon());
      this.searchContainer = document.createElement('div');
      this.searchContainer.style.display = 'none';
      (_this$searchContainer = this.searchContainer.classList).add.apply(_this$searchContainer, ['ecl-select__multiple-dropdown'].concat(containerClasses));
      this.selectMultiple.appendChild(this.searchContainer);
      this.search = document.createElement('input');
      this.search.classList.add('ecl-text-input');
      this.search.setAttribute('type', 'search');
      this.search.setAttribute('placeholder', this.textSearch || '');
      this.search.addEventListener('keyup', this.handleSearch);
      this.search.addEventListener('search', this.handleSearch);
      this.searchContainer.appendChild(this.search);
      if (this.textSelectAll) {
        var optionsCount = Array.from(this.select.options).filter(function (option) {
          return !option.disabled;
        }).length;
        this.selectAll = Select.createCheckbox({
          id: "all-" + Select.generateRandomId(4),
          text: this.textSelectAll + " (" + optionsCount + ")",
          extraClass: 'ecl-select__multiple-all'
        }, this.selectMultipleId);
        this.selectAll.addEventListener('click', this.handleClickSelectAll);
        this.selectAll.addEventListener('keypress', this.handleClickSelectAll);
        this.selectAll.addEventListener('change', this.handleClickSelectAll);
        this.searchContainer.appendChild(this.selectAll);
      }
      this.search.addEventListener('keydown', this.handleKeyboardOnSearch);
      this.optionsContainer = document.createElement('div');
      this.optionsContainer.classList.add('ecl-select__multiple-options');
      this.searchContainer.appendChild(this.optionsContainer);
      // Toolbar
      if (this.clearAllButtonLabel || this.closeButtonLabel) {
        this.dropDownToolbar = document.createElement('div');
        this.dropDownToolbar.classList.add('ecl-select-multiple-toolbar');
        if (this.clearAllButtonLabel) {
          this.clearAllButton = document.createElement('button');
          this.clearAllButton.textContent = this.clearAllButtonLabel;
          this.clearAllButton.classList.add('ecl-button', 'ecl-button--ghost');
          this.clearAllButton.addEventListener('click', this.handleClickOnClearAll);
          this.clearAllButton.addEventListener('keydown', this.handleKeyboardOnClearAll);
          this.dropDownToolbar.appendChild(this.clearAllButton);
        }
        if (this.closeButtonLabel) {
          this.closeButton = document.createElement('button');
          this.closeButton.textContent = this.closeButtonLabel;
          this.closeButton.classList.add('ecl-button', 'ecl-button--primary');
          this.closeButton.addEventListener('click', this.handleEsc);
          this.closeButton.addEventListener('keydown', this.handleKeyboardOnClose);
          if (this.dropDownToolbar) {
            this.dropDownToolbar.appendChild(this.closeButton);
            this.searchContainer.appendChild(this.dropDownToolbar);
            this.dropDownToolbar.style.display = 'none';
          }
        }
      }
      this.selectAll.addEventListener('keydown', this.handleKeyboardOnSelectAll);
      this.optionsContainer.addEventListener('keydown', this.handleKeyboardOnOptions);
      if (this.select.options && this.select.options.length > 0) {
        this.checkboxes = Array.from(this.select.options).map(function (option) {
          var optgroup = '';
          var checkbox = '';
          if (option.parentNode.tagName === 'OPTGROUP') {
            if (!_this.optionsContainer.querySelector("div[data-ecl-multiple-group=\"" + option.parentNode.getAttribute('label') + "\"]")) {
              optgroup = document.createElement('div');
              var title = document.createElement('h5');
              title.classList.add('ecl-select__multiple-group__title');
              title.innerHTML = option.parentNode.getAttribute('label');
              optgroup.appendChild(title);
              optgroup.setAttribute('data-ecl-multiple-group', option.parentNode.getAttribute('label'));
              optgroup.classList.add('ecl-select__multiple-group');
              _this.optionsContainer.appendChild(optgroup);
            } else {
              optgroup = _this.optionsContainer.querySelector("div[data-ecl-multiple-group=\"" + option.parentNode.getAttribute('label') + "\"]");
            }
          }
          if (option.selected) {
            _this.updateSelectionsCount(1);
            if (_this.dropDownToolbar) {
              _this.dropDownToolbar.style.display = 'flex';
            }
          }
          checkbox = Select.createCheckbox({
            // spread operator does not work in storybook context so we map 1:1
            id: option.value,
            text: option.text,
            disabled: option.disabled,
            selected: option.selected
          }, _this.selectMultipleId);
          checkbox.setAttribute('data-visible', true);
          if (!checkbox.classList.contains('ecl-checkbox--disabled')) {
            checkbox.addEventListener('click', _this.handleClickOption);
            checkbox.addEventListener('keydown', _this.handleKeyboardOnOption);
          }
          if (optgroup) {
            optgroup.appendChild(checkbox);
          } else {
            _this.optionsContainer.appendChild(checkbox);
          }
          return checkbox;
        });
      }
      this.select.parentNode.parentNode.insertBefore(this.selectMultiple, this.select.parentNode.nextSibling);
      document.addEventListener('click', this.handleClickOutside);
      this.select.parentNode.classList.add('ecl-select__container--hidden');

      // Respect default selected options.
      this.updateCurrentValue();
      this.form = this.element.closest('form');
      if (this.form) {
        this.form.addEventListener('reset', this.resetForm);
      }

      // Set ecl initialized attribute
      this.element.setAttribute('data-ecl-auto-initialized', 'true');
    }

    /**
     * Destroy component.
     */;
    _proto.destroy = function destroy() {
      var _this2 = this;
      this.selectMultiple.removeEventListener('focusout', this.handleFocusout);
      this.input.removeEventListener('keydown', this.handleKeyboardOnSelect);
      this.input.removeEventListener('click', this.handleToggle);
      this.search.removeEventListener('keyup', this.handleSearch);
      this.search.removeEventListener('keydown', this.handleKeyboardOnSearch);
      this.selectAll.removeEventListener('click', this.handleClickSelectAll);
      this.selectAll.removeEventListener('keypress', this.handleClickSelectAll);
      this.selectAll.removeEventListener('keydown', this.handleKeyboardOnSelectAll);
      this.optionsContainer.removeEventListener('keydown', this.handleKeyboardOnOptions);
      this.checkboxes.forEach(function (checkbox) {
        checkbox.removeEventListener('click', _this2.handleClickSelectAll);
        checkbox.removeEventListener('click', _this2.handleClickOption);
        checkbox.removeEventListener('keydown', _this2.handleKeyboardOnOption);
      });
      document.removeEventListener('click', this.handleClickOutside);
      if (this.closeButton) {
        this.closeButton.removeEventListener('click', this.handleEsc);
        this.closeButton.removeEventListener('keydown', this.handleKeyboardOnClose);
      }
      if (this.clearAllButton) {
        this.clearAllButton.removeEventListener('click', this.handleClickOnClearAll);
        this.clearAllButton.removeEventListener('keydown', this.handleKeyboardOnClearAll);
      }
      if (this.selectMultiple) {
        this.selectMultiple.remove();
      }
      this.select.parentNode.classList.remove('ecl-select__container--hidden');
      if (this.element) {
        this.element.removeAttribute('data-ecl-auto-initialized');
      }
    }

    /**
     * @param {Integer} i
     */;
    _proto.updateSelectionsCount = function updateSelectionsCount(i) {
      var selectedOptionsCount = 0;
      if (i > 0) {
        this.selectionCount.querySelector('span').innerHTML += i;
      } else {
        selectedOptionsCount = Array.from(this.select.options).filter(function (option) {
          return option.selected;
        }).length;
      }
      if (selectedOptionsCount > 0) {
        this.selectionCount.querySelector('span').innerHTML = selectedOptionsCount;
        this.selectionCount.classList.add('ecl-select-multiple-selections-counter--visible');
        if (this.dropDownToolbar) {
          this.dropDownToolbar.style.display = 'flex';
        }
      } else {
        this.selectionCount.classList.remove('ecl-select-multiple-selections-counter--visible');
        if (this.dropDownToolbar) {
          this.dropDownToolbar.style.display = 'none';
        }
      }
      if (selectedOptionsCount >= 100) {
        this.selectionCount.classList.add('ecl-select-multiple-selections-counter--xxl');
      }
    };
    _proto.updateCurrentValue = function updateCurrentValue() {
      this.input.value = Array.from(this.select.options).filter(function (option) {
        return option.selected;
      }) // do not rely on getAttribute as it does not work in all cases
      .map(function (option) {
        return option.text;
      }).join(', ');
      // Dispatch a change event once the value of the select has changed.
      this.select.dispatchEvent(new window.Event('change', {
        bubbles: true
      }));
    }

    /**
     * @param {Event} e
     */;
    _proto.handleToggle = function handleToggle(e) {
      e.preventDefault();
      if (this.searchContainer.style.display === 'none') {
        this.searchContainer.style.display = 'block';
      } else {
        this.searchContainer.style.display = 'none';
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleClickOption = function handleClickOption(e) {
      var _this3 = this;
      e.preventDefault();
      Select.checkCheckbox(e);

      // Toggle values
      var checkbox = e.target.closest('.ecl-checkbox');
      Array.from(this.select.options).forEach(function (option) {
        if (option.text === checkbox.getAttribute('data-select-multiple-value')) {
          if (option.getAttribute('selected') || option.selected) {
            option.selected = false;
            _this3.selectAll.querySelector('input').checked = false;
          } else {
            option.selected = true;
          }
        }
      });
      this.updateCurrentValue();
      this.updateSelectionsCount();
    }

    /**
     * @param {Event} e
     */;
    _proto.handleClickSelectAll = function handleClickSelectAll(e) {
      e.preventDefault();
      // Early returns.
      if (this.selectAll.querySelector('input').disabled) {
        return;
      }
      var checked = Select.checkCheckbox(e);
      var options = Array.from(this.select.options).filter(function (o) {
        return !o.disabled;
      });
      var checkboxes = Array.from(this.searchContainer.querySelectorAll('[data-visible="true"]')).filter(function (checkbox) {
        return !checkbox.querySelector('input').disabled;
      });
      checkboxes.forEach(function (checkbox) {
        checkbox.querySelector('input').checked = checked;
        var option = options.find(function (o) {
          return o.text === checkbox.getAttribute('data-select-multiple-value');
        });
        if (option) {
          if (checked) {
            option.selected = true;
          } else {
            option.selected = false;
          }
        }
      });
      this.updateCurrentValue();
      this.updateSelectionsCount();
    }

    /**
     * @param {Event} e
     */;
    _proto.handleFocusout = function handleFocusout(e) {
      if (e.relatedTarget && this.selectMultiple && !this.selectMultiple.contains(e.relatedTarget) && this.searchContainer.style.display === 'block') {
        this.searchContainer.style.display = 'none';
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleSearch = function handleSearch(e) {
      var dropDownHeight = this.optionsContainer.offsetHeight;
      var visible = [];
      var keyword = e.target.value.toLowerCase();
      if (dropDownHeight > 0) {
        this.optionsContainer.style.height = dropDownHeight + "px";
      }
      this.checkboxes.forEach(function (checkbox) {
        if (!checkbox.getAttribute('data-select-multiple-value').toLocaleLowerCase().includes(keyword)) {
          checkbox.removeAttribute('data-visible');
          checkbox.style.display = 'none';
        } else {
          checkbox.setAttribute('data-visible', true);
          checkbox.style.display = 'flex';
          // Highlight keyword in checkbox label.
          var checkboxLabelText = checkbox.querySelector('.ecl-checkbox__label-text');
          checkboxLabelText.textContent = checkboxLabelText.textContent.replace('.cls-1{fill:none}', '');
          if (keyword) {
            checkboxLabelText.innerHTML = checkboxLabelText.textContent.replace(new RegExp(keyword + "(?!([^<]+)?<)", 'gi'), '<b>$&</b>');
          }
          visible.push(checkbox);
        }
      });
      // Select all checkbox follows along.
      var checked = visible.filter(function (c) {
        return c.querySelector('input').checked;
      });
      if (visible.length === 0 || visible.length !== checked.length) {
        this.selectAll.querySelector('input').checked = false;
      } else {
        this.selectAll.querySelector('input').checked = true;
      }
      // Display no-results message.
      var noResultsElement = this.searchContainer.querySelector('.ecl-select__multiple-no-results');
      var groups = this.optionsContainer.getElementsByClassName('ecl-select__multiple-group');
      // eslint-disable-next-line no-restricted-syntax
      for (var _iterator = _createForOfIteratorHelperLoose(groups), _step; !(_step = _iterator()).done;) {
        var group = _step.value;
        group.style.display = 'none';
        // eslint-disable-next-line no-restricted-syntax
        var groupedCheckboxes = [].concat(group.children).filter(function (node) {
          return node.classList.contains('ecl-checkbox');
        });
        groupedCheckboxes.forEach(function (single) {
          if (single.hasAttribute('data-visible')) {
            single.closest('.ecl-select__multiple-group').style.display = 'block';
          }
        });
      }
      if (visible.length === 0 && !noResultsElement) {
        // Create no-results element.
        var noResultsContainer = document.createElement('div');
        var noResultsLabel = document.createElement('span');
        noResultsContainer.classList.add('ecl-select__multiple-no-results');
        noResultsLabel.innerHTML = this.textNoResults;
        noResultsContainer.appendChild(noResultsLabel);
        this.optionsContainer.appendChild(noResultsContainer);
      } else if (visible.length > 0 && noResultsElement !== null) {
        noResultsElement.parentNode.removeChild(noResultsElement);
      }
      // reset
      if (keyword.length === 0) {
        this.checkboxes.forEach(function (checkbox) {
          checkbox.setAttribute('data-visible', true);
          checkbox.style.display = 'flex';
        });
        // Enable select all checkbox.
        this.selectAll.classList.remove('ecl-checkbox--disabled');
        this.selectAll.querySelector('input').disabled = false;
      } else {
        // Disable select all checkbox.
        this.selectAll.classList.add('ecl-checkbox--disabled');
        this.selectAll.querySelector('input').disabled = true;
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleClickOutside = function handleClickOutside(e) {
      if (e.target && this.selectMultiple && !this.selectMultiple.contains(e.target) && this.searchContainer.style.display === 'block') {
        this.searchContainer.style.display = 'none';
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleKeyboardOnSelect = function handleKeyboardOnSelect(e) {
      switch (e.key) {
        case 'Escape':
          this.handleEsc();
          break;
        case ' ':
        case 'ArrowDown':
          this.handleToggle(e);
          this.search.focus();
          break;
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleKeyboardOnSelectAll = function handleKeyboardOnSelectAll(e) {
      switch (e.key) {
        case 'Escape':
          this.handleEsc();
          break;
        case 'ArrowDown':
          this.optionsContainer.querySelectorAll('input')[0].focus();
          e.preventDefault();
          break;
        case 'ArrowUp':
          this.search.focus();
          break;
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleKeyboardOnOptions = function handleKeyboardOnOptions(e) {
      switch (e.key) {
        case 'Escape':
          this.handleEsc();
          break;
        case 'ArrowDown':
          this.moveFocus('down');
          break;
        case 'ArrowUp':
          this.moveFocus('up');
          break;
        case 'Tab':
          e.preventDefault();
          this.moveFocus('down');
          break;
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleKeyboardOnSearch = function handleKeyboardOnSearch(e) {
      switch (e.key) {
        case 'Escape':
          this.handleEsc();
          break;
        case 'ArrowDown':
          if (this.selectAll.querySelector('input').disabled) {
            var firstAvailable = Array.from(this.optionsContainer.querySelectorAll('.ecl-checkbox')).filter(function (el) {
              return el.style.display !== 'none';
            });
            if (firstAvailable[0]) {
              firstAvailable[0].querySelector('input').focus();
            }
          } else {
            this.selectAll.querySelector('input').focus();
          }
          break;
        case 'ArrowUp':
          this.input.focus();
          this.handleToggle(e);
          break;
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleKeyboardOnOption = function handleKeyboardOnOption(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        this.handleClickOption(e);
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleKeyboardOnClearAll = function handleKeyboardOnClearAll(e) {
      e.preventDefault();
      switch (e.key) {
        case 'Enter':
        case ' ':
          this.handleClickOnClearAll();
          this.input.focus();
          break;
        case 'ArrowRight':
          this.clearAllButton.nextSibling.focus();
          break;
        case 'ArrowUp':
          this.optionsContainer.lastChild.querySelector('input').focus();
          break;
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleKeyboardOnClose = function handleKeyboardOnClose(e) {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowLeft':
          this.closeButton.previousSibling.focus();
          break;
        case 'ArrowUp':
          this.optionsContainer.lastChild.querySelector('input').focus();
          break;
        case 'Tab':
          e.preventDefault();
          this.input.focus();
          break;
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleEsc = function handleEsc(e) {
      e.preventDefault();
      if (this.searchContainer.style.display === 'block') {
        this.searchContainer.style.display = 'none';
      }
    }

    /**
     * @param {upOrDown}
     */;
    _proto.moveFocus = function moveFocus(upOrDown) {
      var activeEl = document.activeElement;
      var hasGroups = activeEl.parentElement.parentElement.classList.contains('ecl-select__multiple-group');
      var options = !hasGroups ? Array.from(activeEl.parentElement.parentElement.querySelectorAll('.ecl-checkbox__input')) : Array.from(activeEl.parentElement.parentElement.parentElement.querySelectorAll('.ecl-checkbox__input'));
      var activeIndex = options.indexOf(activeEl);
      if (upOrDown === 'down') {
        var nextSiblings = options.splice(activeIndex + 1, options.length).filter(function (el) {
          return !el.disabled && el.parentElement.style.display !== 'none';
        });
        if (nextSiblings.length > 0) {
          nextSiblings[0].focus();
        } else {
          // eslint-disable-next-line no-lonely-if
          if (this.dropDownToolbar && this.dropDownToolbar.style.display === 'flex') {
            this.dropDownToolbar.firstChild.focus();
          } else {
            this.input.focus();
          }
        }
      } else {
        var previousSiblings = options.splice(0, activeIndex).filter(function (el) {
          return !el.disabled && el.parentElement.style.display !== 'none';
        });
        if (previousSiblings.length > 0) {
          previousSiblings.pop().focus();
        } else {
          this.optionsContainer.scrollTop = 0;
          if (!this.selectAll.querySelector('input').disabled) {
            this.selectAll.querySelector('input').focus();
          } else {
            this.search.focus();
          }
        }
      }
    }

    /**
     * @param {Event} e
     *
     * Reset values of the Multiselect.
     *
     */;
    _proto.handleClickOnClearAll = function handleClickOnClearAll(e) {
      var _this4 = this;
      e.preventDefault();
      Array.from(this.select.options).forEach(function (option) {
        var checkbox = _this4.selectMultiple.querySelector("[data-select-multiple-value=\"" + option.text + "\"]");
        var input = checkbox.querySelector('.ecl-checkbox__input');
        input.checked = false;
        option.selected = false;
      });
      this.selectAll.querySelector('.ecl-checkbox__input').checked = false;
      this.updateCurrentValue();
      this.updateSelectionsCount(0);
    }

    /**
     * Reset Multiselect.
     */;
    _proto.resetForm = function resetForm() {
      var _this5 = this;
      // A slight timeout is necessary to execute the function just after the original reset of the form.
      setTimeout(function () {
        Array.from(_this5.select.options).forEach(function (option) {
          var checkbox = _this5.selectMultiple.querySelector("[data-select-multiple-value=\"" + option.text + "\"]");
          var input = checkbox.querySelector('.ecl-checkbox__input');
          if (input.checked) {
            option.selected = true;
          } else {
            option.selected = false;
          }
        });
        _this5.updateCurrentValue();
        _this5.updateSelectionsCount(0);
      }, 10);
    };
    return Select;
  }();

  exports.Select = Select;
  exports.default = Select;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
