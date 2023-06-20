var ECL = (function (exports) {
  'use strict';

  var formatBytes = function formatBytes(bytes, decimals) {
    if (decimals === void 0) {
      decimals = 2;
    }
    if (bytes === 0) return '0 Bytes';
    var k = 1024;
    var dm = decimals < 0 ? 0 : decimals;
    var sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };
  var queryOne = function queryOne(selector, context) {
    if (context === void 0) {
      context = document;
    }
    return context.querySelector(selector);
  };

  /**
   * @param {HTMLElement} element DOM element for component instantiation and scope
   * @param {Object} options
   * @param {String} options.groupSelector Selector for file upload form group
   * @param {String} options.buttonSelector Selector for file upload button
   * @param {String} options.listSelector Selector for list of file names
   * @param {String} options.labelChoose Label choose state
   * @param {String} options.labelReplace Label replace state
   * @param {Boolean} options.attachChangeListener Whether or not to bind change events on toggle
   */
  var FileUpload = /*#__PURE__*/function () {
    /**
     * @static
     * Shorthand for instance creation and initialisation.
     *
     * @param {HTMLElement} root DOM element for component instantiation and scope
     *
     * @return {FileUpload} An instance of FileUpload.
     */
    FileUpload.autoInit = function autoInit(root, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$FILE_UPLOAD = _ref.FILE_UPLOAD,
        defaultOptions = _ref$FILE_UPLOAD === void 0 ? {} : _ref$FILE_UPLOAD;
      var fileUpload = new FileUpload(root, defaultOptions);
      fileUpload.init();
      root.ECLFileUpload = fileUpload;
      return fileUpload;
    };
    function FileUpload(element, _temp2) {
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$groupSelector = _ref2.groupSelector,
        groupSelector = _ref2$groupSelector === void 0 ? '[data-ecl-file-upload-group]' : _ref2$groupSelector,
        _ref2$buttonSelector = _ref2.buttonSelector,
        buttonSelector = _ref2$buttonSelector === void 0 ? '[data-ecl-file-upload-button]' : _ref2$buttonSelector,
        _ref2$listSelector = _ref2.listSelector,
        listSelector = _ref2$listSelector === void 0 ? '[data-ecl-file-upload-list]' : _ref2$listSelector,
        _ref2$labelChoose = _ref2.labelChoose,
        labelChoose = _ref2$labelChoose === void 0 ? 'data-ecl-file-upload-label-choose' : _ref2$labelChoose,
        _ref2$labelReplace = _ref2.labelReplace,
        labelReplace = _ref2$labelReplace === void 0 ? 'data-ecl-file-upload-label-replace' : _ref2$labelReplace,
        _ref2$attachChangeLis = _ref2.attachChangeListener,
        attachChangeListener = _ref2$attachChangeLis === void 0 ? true : _ref2$attachChangeLis;
      // Check element
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      // Options
      this.groupSelector = groupSelector;
      this.buttonSelector = buttonSelector;
      this.listSelector = listSelector;
      this.labelChoose = labelChoose;
      this.labelReplace = labelReplace;
      this.attachChangeListener = attachChangeListener;

      // Private variables
      this.fileUploadGroup = null;
      this.fileUploadInput = null;
      this.fileUploadButton = null;
      this.fileUploadList = null;

      // Bind `this` for use in callbacks
      this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Initialise component.
     */
    var _proto = FileUpload.prototype;
    _proto.init = function init() {
      this.fileUploadGroup = this.element.closest(this.groupSelector);
      this.fileUploadInput = this.element;
      this.fileUploadButton = queryOne(this.buttonSelector, this.fileUploadGroup);
      this.fileUploadList = queryOne(this.listSelector, this.fileUploadGroup);

      // Bind events on input
      if (this.attachChangeListener && this.fileUploadInput) {
        this.fileUploadInput.addEventListener('change', this.handleChange);
      }

      // Set ecl initialized attribute
      this.element.setAttribute('data-ecl-auto-initialized', 'true');
    }

    /**
     * Destroy component.
     */;
    _proto.destroy = function destroy() {
      if (this.attachChangeListener && this.fileUploadInput) {
        this.fileUploadInput.removeEventListener('change', this.handleChange);
      }
      if (this.element) {
        this.element.removeAttribute('data-ecl-auto-initialized');
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleChange = function handleChange(e) {
      if (!('files' in e.target)) {
        if (this.fileUploadButton.hasAttribute(this.labelChoose)) {
          this.fileUploadButton.innerHTML = this.fileUploadButton.getAttribute(this.labelChoose);
        }
        return;
      }
      var fileList = '';

      // Get file names
      Array.prototype.forEach.call(e.target.files, function (file) {
        var fileSize = formatBytes(file.size, 1);
        var fileExtension = file.name.split('.').pop();
        fileList += "<li class=\"ecl-file-upload__item\">\n      <span class=\"ecl-file-upload__item-name\">" + file.name + "</span>\n      <span class=\"ecl-file-upload__item-meta\">(" + fileSize + " - " + fileExtension + ")</span>\n      </li>";
      });

      // Update file list
      this.fileUploadList.innerHTML = fileList;

      // Update button label
      if (this.fileUploadButton.hasAttribute(this.labelReplace)) {
        this.fileUploadButton.innerHTML = this.fileUploadButton.getAttribute(this.labelReplace);
      }
    };
    return FileUpload;
  }();

  exports.FileUpload = FileUpload;
  exports.default = FileUpload;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
