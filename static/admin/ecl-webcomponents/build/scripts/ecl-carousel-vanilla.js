var ECL = (function (exports) {
  'use strict';

  var queryAll = function queryAll(selector, context) {
    if (context === void 0) {
      context = document;
    }
    return [].slice.call(context.querySelectorAll(selector));
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
   * @param {String} options.toggleSelector Selector for toggling element
   * @param {String} options.prevSelector Selector for prev element
   * @param {String} options.nextSelector Selector for next element
   * @param {String} options.contentClass Selector for the content container
   * @param {String} options.slidesClass Selector for the slides container
   * @param {String} options.slideClass Selector for the slide items
   * @param {String} options.navigationClass Selector for the navigation container
   * @param {String} options.currentSlideClass Selector for the counter current slide number
   */
  var Carousel = /*#__PURE__*/function () {
    /**
     * @static
     * Shorthand for instance creation and initialisation.
     *
     * @param {HTMLElement} root DOM element for component instantiation and scope
     *
     * @return {Carousel} An instance of Carousel.
     */
    Carousel.autoInit = function autoInit(root, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$CAROUSEL = _ref.CAROUSEL,
        defaultOptions = _ref$CAROUSEL === void 0 ? {} : _ref$CAROUSEL;
      var carousel = new Carousel(root, defaultOptions);
      carousel.init();
      root.ECLCarousel = carousel;
      return carousel;
    };
    function Carousel(element, _temp2) {
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$playSelector = _ref2.playSelector,
        playSelector = _ref2$playSelector === void 0 ? '.ecl-carousel__play' : _ref2$playSelector,
        _ref2$pauseSelector = _ref2.pauseSelector,
        pauseSelector = _ref2$pauseSelector === void 0 ? '.ecl-carousel__pause' : _ref2$pauseSelector,
        _ref2$prevSelector = _ref2.prevSelector,
        prevSelector = _ref2$prevSelector === void 0 ? '.ecl-carousel__prev' : _ref2$prevSelector,
        _ref2$nextSelector = _ref2.nextSelector,
        nextSelector = _ref2$nextSelector === void 0 ? '.ecl-carousel__next' : _ref2$nextSelector,
        _ref2$containerClass = _ref2.containerClass,
        containerClass = _ref2$containerClass === void 0 ? '.ecl-carousel__container' : _ref2$containerClass,
        _ref2$slidesClass = _ref2.slidesClass,
        slidesClass = _ref2$slidesClass === void 0 ? '.ecl-carousel__slides' : _ref2$slidesClass,
        _ref2$slideClass = _ref2.slideClass,
        slideClass = _ref2$slideClass === void 0 ? '.ecl-carousel__slide' : _ref2$slideClass,
        _ref2$currentSlideCla = _ref2.currentSlideClass,
        currentSlideClass = _ref2$currentSlideCla === void 0 ? '.ecl-carousel__current' : _ref2$currentSlideCla,
        _ref2$navigationItems = _ref2.navigationItemsClass,
        navigationItemsClass = _ref2$navigationItems === void 0 ? '.ecl-carousel__navigation-item' : _ref2$navigationItems,
        _ref2$controlsClass = _ref2.controlsClass,
        controlsClass = _ref2$controlsClass === void 0 ? '.ecl-carousel__controls' : _ref2$controlsClass,
        _ref2$paginationClass = _ref2.paginationClass,
        paginationClass = _ref2$paginationClass === void 0 ? '.ecl-carousel__pagination' : _ref2$paginationClass,
        _ref2$attachClickList = _ref2.attachClickListener,
        attachClickListener = _ref2$attachClickList === void 0 ? true : _ref2$attachClickList,
        _ref2$attachResizeLis = _ref2.attachResizeListener,
        attachResizeListener = _ref2$attachResizeLis === void 0 ? true : _ref2$attachResizeLis;
      // Check element
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      // Options
      this.playSelector = playSelector;
      this.pauseSelector = pauseSelector;
      this.prevSelector = prevSelector;
      this.nextSelector = nextSelector;
      this.containerClass = containerClass;
      this.slidesClass = slidesClass;
      this.slideClass = slideClass;
      this.currentSlideClass = currentSlideClass;
      this.navigationItemsClass = navigationItemsClass;
      this.controlsClass = controlsClass;
      this.paginationClass = paginationClass;
      this.attachClickListener = attachClickListener;
      this.attachResizeListener = attachResizeListener;

      // Private variables
      this.container = null;
      this.slides = null;
      this.btnPlay = null;
      this.btnPause = null;
      this.btnPrev = null;
      this.btnNext = null;
      this.index = 1;
      this.total = 0;
      this.allowShift = true;
      this.activeNav = null;
      this.autoPlay = null;
      this.autoPlayInterval = null;
      this.hoverAutoPlay = null;
      this.resizeTimer = null;
      this.posX1 = 0;
      this.posX2 = 0;
      this.posInitial = 0;
      this.posFinal = 0;
      this.threshold = 80;
      this.navigationItems = null;
      this.navigation = null;
      this.controls = null;
      this.direction = 'ltr';
      this.cloneFirstSLide = null;
      this.cloneLastSLide = null;

      // Bind `this` for use in callbacks
      this.handleAutoPlay = this.handleAutoPlay.bind(this);
      this.handleMouseOver = this.handleMouseOver.bind(this);
      this.handleMouseOut = this.handleMouseOut.bind(this);
      this.shiftSlide = this.shiftSlide.bind(this);
      this.checkIndex = this.checkIndex.bind(this);
      this.moveSlides = this.moveSlides.bind(this);
      this.handleResize = this.handleResize.bind(this);
      this.dragStart = this.dragStart.bind(this);
      this.dragEnd = this.dragEnd.bind(this);
      this.dragAction = this.dragAction.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
      this.handleKeyboardOnPlay = this.handleKeyboardOnPlay.bind(this);
      this.handleKeyboardOnBullets = this.handleKeyboardOnBullets.bind(this);
    }

    /**
     * Initialise component.
     */
    var _proto = Carousel.prototype;
    _proto.init = function init() {
      var _this$slidesContainer,
        _this = this;
      this.btnPlay = queryOne(this.playSelector, this.element);
      this.btnPause = queryOne(this.pauseSelector, this.element);
      this.btnPrev = queryOne(this.prevSelector, this.element);
      this.btnNext = queryOne(this.nextSelector, this.element);
      this.slidesContainer = queryOne(this.slidesClass, this.element);
      this.container = queryOne(this.containerClass, this.element);
      this.navigation = queryOne('.ecl-carousel__navigation', this.element);
      this.navigationItems = queryAll(this.navigationItemsClass, this.element);
      this.pagination = queryOne(this.paginationClass, this.element);
      this.controls = queryOne(this.controlsClass, this.element);
      this.currentSlide = queryOne(this.currentSlideClass, this.element);
      this.direction = getComputedStyle(this.element).direction;
      this.slides = queryAll(this.slideClass, this.element);
      this.slidesContainer.innerHTML = '';
      (_this$slidesContainer = this.slidesContainer).append.apply(_this$slidesContainer, this.slides);
      this.total = this.slides.length;

      // If only one slide, don't initialize carousel and hide controls
      if (this.total <= 1) {
        if (this.btnNext) {
          this.btnNext.style.display = 'none';
        }
        if (this.btnPrev) {
          this.btnPrev.style.display = 'none';
        }
        if (this.controls) {
          this.controls.style.display = 'none';
        }
        if (this.slidesContainer) {
          this.slidesContainer.style.display = 'block';
        }
        return false;
      }

      // Start initializing carousel
      var firstSlide = this.slides[0];
      var lastSlide = this.slides[this.slides.length - 1];
      this.cloneFirstSLide = firstSlide.cloneNode(true);
      this.cloneLastSLide = lastSlide.cloneNode(true);

      // Clone first and last slide
      this.slidesContainer.appendChild(this.cloneFirstSLide);
      this.slidesContainer.insertBefore(this.cloneLastSLide, firstSlide);

      // Refresh the slides variable after adding new cloned slides
      this.slides = queryAll(this.slideClass, this.element);

      // Initialize position of slides and size of the carousel
      this.slides.forEach(function (slide) {
        slide.style.width = 100 / _this.slides.length + "%";
      });
      this.handleResize();

      // Initialze pagination and navigation
      this.checkIndex();

      // Bind events
      if (this.navigationItems) {
        this.navigationItems.forEach(function (nav, index) {
          nav.addEventListener('click', _this.shiftSlide.bind(_this, index + 1, true));
        });
      }
      if (this.navigation) {
        this.navigation.addEventListener('keydown', this.handleKeyboardOnBullets);
      }
      if (this.attachClickListener && this.btnPlay && this.btnPause) {
        this.btnPlay.addEventListener('click', this.handleAutoPlay);
        this.btnPause.addEventListener('click', this.handleAutoPlay);
      }
      if (this.btnPlay) {
        this.btnPlay.addEventListener('keydown', this.handleKeyboardOnPlay);
      }
      if (this.attachClickListener && this.btnNext) {
        this.btnNext.addEventListener('click', this.shiftSlide.bind(this, 'next', true));
      }
      if (this.attachClickListener && this.btnPrev) {
        this.btnPrev.addEventListener('click', this.shiftSlide.bind(this, 'prev', true));
      }
      if (this.slidesContainer) {
        // Mouse events
        this.slidesContainer.addEventListener('mouseover', this.handleMouseOver);
        this.slidesContainer.addEventListener('mouseout', this.handleMouseOut);

        // Touch events
        this.slidesContainer.addEventListener('touchstart', this.dragStart);
        this.slidesContainer.addEventListener('touchend', this.dragEnd);
        this.slidesContainer.addEventListener('touchmove', this.dragAction);
        this.slidesContainer.addEventListener('transitionend', this.checkIndex);
      }
      if (this.container) {
        this.container.addEventListener('focus', this.handleFocus, true);
      }
      if (this.attachResizeListener) {
        window.addEventListener('resize', this.handleResize);
      }

      // Set ecl initialized attribute
      this.element.setAttribute('data-ecl-auto-initialized', 'true');
      return this;
    }

    /**
     * Destroy component.
     */;
    _proto.destroy = function destroy() {
      if (this.cloneFirstSLide && this.cloneLastSLide) {
        this.cloneFirstSLide.remove();
        this.cloneLastSLide.remove();
      }
      if (this.btnPlay) {
        this.btnPlay.replaceWith(this.btnPlay.cloneNode(true));
      }
      if (this.btnPause) {
        this.btnPause.replaceWith(this.btnPause.cloneNode(true));
      }
      if (this.btnNext) {
        this.btnNext.replaceWith(this.btnNext.cloneNode(true));
      }
      if (this.btnPrev) {
        this.btnPrev.replaceWith(this.btnPrev.cloneNode(true));
      }
      if (this.slidesContainer) {
        this.slidesContainer.removeEventListener('mouseover', this.handleMouseOver);
        this.slidesContainer.removeEventListener('mouseout', this.handleMouseOut);
        this.slidesContainer.removeEventListener('touchstart', this.dragStart);
        this.slidesContainer.removeEventListener('touchend', this.dragEnd);
        this.slidesContainer.removeEventListener('touchmove', this.dragAction);
        this.slidesContainer.removeEventListener('transitionend', this.checkIndex);
      }
      if (this.container) {
        this.container.removeEventListener('focus', this.handleFocus, true);
      }
      if (this.navigationItems) {
        this.navigationItems.forEach(function (nav) {
          nav.replaceWith(nav.cloneNode(true));
        });
      }
      if (this.attachResizeListener) {
        window.removeEventListener('resize', this.handleResize);
      }
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlay = null;
      }
      if (this.element) {
        this.element.removeAttribute('data-ecl-auto-initialized');
      }
    }

    /**
     * TouchStart handler.
     * @param {Event} e
     */;
    _proto.dragStart = function dragStart(e) {
      e = e || window.event;
      this.posInitial = this.slidesContainer.offsetLeft;
      if (e.type === 'touchstart') {
        this.posX1 = e.touches[0].clientX;
      }
    }

    /**
     * TouchMove handler.
     * @param {Event} e
     */;
    _proto.dragAction = function dragAction(e) {
      e = e || window.event;
      if (e.type === 'touchmove') {
        e.preventDefault();
        this.posX2 = this.posX1 - e.touches[0].clientX;
        this.posX1 = e.touches[0].clientX;
      }
      this.slidesContainer.style.left = this.slidesContainer.offsetLeft - this.posX2 + "px";
    }

    /**
     * TouchEnd handler.
     */;
    _proto.dragEnd = function dragEnd() {
      this.posFinal = this.slidesContainer.offsetLeft;
      if (this.posFinal - this.posInitial < -this.threshold) {
        this.shiftSlide('next', true);
      } else if (this.posFinal - this.posInitial > this.threshold) {
        this.shiftSlide('prev', true);
      } else {
        this.slidesContainer.style.left = this.posInitial + "px";
      }
    }

    /**
     * Action to shift next or previous slide.
     * @param {int|string} dir
     * @param {Boolean} stopAutoPlay
     */;
    _proto.shiftSlide = function shiftSlide(dir, stopAutoPlay) {
      if (this.allowShift) {
        if (typeof dir === 'number') {
          this.index = dir;
        } else {
          this.index = dir === 'next' ? this.index + 1 : this.index - 1;
        }
        this.moveSlides(true);
      }
      if (stopAutoPlay && this.autoPlay) {
        this.handleAutoPlay();
      }
      this.allowShift = false;
    }

    /**
     * Transition for the slides.
     * @param {Boolean} transition
     */;
    _proto.moveSlides = function moveSlides(transition) {
      var newOffset = this.container.offsetWidth * this.index;
      this.slidesContainer.style.transitionDuration = transition ? '0.4s' : '0s';
      if (this.direction === 'rtl') {
        this.slidesContainer.style.right = "-" + newOffset + "px";
      } else {
        this.slidesContainer.style.left = "-" + newOffset + "px";
      }
    }

    /**
     * Action to update slides index and position.
     */;
    _proto.checkIndex = function checkIndex() {
      var _this2 = this;
      // Update index
      if (this.index === 0) {
        this.index = this.total;
      }
      if (this.index === this.total + 1) {
        this.index = 1;
      }

      // Move slide without transition to ensure infinity loop
      this.moveSlides(false);

      // Update pagination
      if (this.currentSlide) {
        this.currentSlide.textContent = this.index;
      }

      // Update slides
      if (this.slides) {
        this.slides.forEach(function (slide, index) {
          var cta = queryOne('.ecl-link--cta', slide);
          if (_this2.index === index) {
            slide.removeAttribute('inert', 'true');
            if (cta) {
              cta.removeAttribute('tabindex', -1);
            }
          } else {
            slide.setAttribute('inert', 'true');
            if (cta) {
              cta.setAttribute('tabindex', -1);
            }
          }
        });
      }

      // Update navigation
      if (this.navigationItems) {
        this.navigationItems.forEach(function (nav, index) {
          if (_this2.index === index + 1) {
            nav.setAttribute('aria-current', 'true');
          } else {
            nav.removeAttribute('aria-current', 'true');
          }
        });
      }
      this.allowShift = true;
    }

    /**
     * Toggles play/pause slides.
     */;
    _proto.handleAutoPlay = function handleAutoPlay() {
      var _this3 = this;
      if (!this.autoPlay) {
        this.autoPlayInterval = setInterval(function () {
          _this3.shiftSlide('next');
        }, 5000);
        this.autoPlay = true;
        var isFocus = document.activeElement === this.btnPlay;
        this.btnPlay.style.display = 'none';
        this.btnPause.style.display = 'flex';
        if (isFocus) {
          this.btnPause.focus();
        }
      } else {
        clearInterval(this.autoPlayInterval);
        this.autoPlay = false;
        var _isFocus = document.activeElement === this.btnPause;
        this.btnPlay.style.display = 'flex';
        this.btnPause.style.display = 'none';
        if (_isFocus) {
          this.btnPlay.focus();
        }
      }
    }

    /**
     * Trigger events on mouseover.
     */;
    _proto.handleMouseOver = function handleMouseOver() {
      this.hoverAutoPlay = this.autoPlay;
      if (this.hoverAutoPlay) {
        this.handleAutoPlay();
      }
      return this;
    }

    /**
     * Trigger events on mouseout.
     */;
    _proto.handleMouseOut = function handleMouseOut() {
      if (this.hoverAutoPlay) {
        this.handleAutoPlay();
      }
      return this;
    }

    /**
     * Trigger events on resize.
     */;
    _proto.handleResize = function handleResize() {
      var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      var containerWidth = this.container.offsetWidth;
      this.slidesContainer.style.width = containerWidth * this.slides.length + "px";
      this.moveSlides(false);

      // Add class to set a left margin to banner content and avoid arrow overlapping
      if (vw >= 1140 && vw <= 1260) {
        this.container.classList.add('ecl-carousel-container--padded');
      } else {
        this.container.classList.remove('ecl-carousel-container--padded');
      }

      // Move previous and next buttons in or out the control bar
      if (vw < 1140) {
        this.pagination.parentNode.insertBefore(this.btnPrev, this.pagination);
        this.pagination.parentNode.insertBefore(this.btnNext, this.pagination.nextSibling);
      } else {
        this.container.insertBefore(this.btnPrev, this.slidesContainer.nextSibling);
        this.container.insertBefore(this.btnNext, this.btnPrev.nextSibling);
      }

      // Desactivate autoPlay for mobile or activate autoPlay onLoad for desktop
      if (vw <= 768 && this.autoPlay || vw > 768 && this.autoPlay === null) {
        this.handleAutoPlay();
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleKeyboardOnPlay = function handleKeyboardOnPlay(e) {
      switch (e.key) {
        case 'Tab':
        case 'ArrowRight':
          e.preventDefault();
          this.activeNav = queryOne(this.navigationItemsClass + "[aria-current=\"true\"]");
          if (this.activeNav) {
            this.activeNav.focus();
          }
          if (this.autoPlay) {
            this.handleAutoPlay();
          }
          break;
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleKeyboardOnBullets = function handleKeyboardOnBullets(e) {
      var focusedEl = document.activeElement;
      switch (e.key) {
        case 'Tab':
        case 'ArrowRight':
          e.preventDefault();
          if (focusedEl.nextSibling) {
            this.shiftSlide('next', true);
            focusedEl.nextSibling.focus();
          } else {
            this.btnPrev.focus();
          }
          break;
        case 'ArrowLeft':
          if (focusedEl.previousSibling) {
            this.shiftSlide('prev', true);
            focusedEl.previousSibling.focus();
          } else {
            this.btnPlay.focus();
          }
          break;
      }
    }

    /**
     * Trigger events on focus.
     * @param {Event} e
     */;
    _proto.handleFocus = function handleFocus(e) {
      var focusElement = e.target;
      // Disable autoplay if focus is on a slide CTA
      if (focusElement && focusElement.contains(document.activeElement) && this.autoPlay) {
        this.handleAutoPlay();
      }
      return this;
    };
    return Carousel;
  }();

  exports.Carousel = Carousel;
  exports.default = Carousel;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
