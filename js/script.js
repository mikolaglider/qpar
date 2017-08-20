window.isMobile = window.innerWidth < 768;
window.addEventListener("resize", function () {
	window.isMobile = window.innerWidth < 768;
}, false);

jqWar(document).ready(function () {

	function initMenuCatalogButton() {

		var button = jqWar('.menu-catalog__btn'),
			menuBlock = jqWar('.menu-catalog');
		if(button.length && menuBlock.length){
			button.on('click', function () {
				if (menuBlock.hasClass('menu-catalog--show')) {
					menuBlock.removeClass('menu-catalog--show');
					jqWar('.shadow').removeClass('shadow--open');
				} else {
					menuBlock.addClass('menu-catalog--show');
					jqWar('.shadow').addClass('shadow--open');
				}
			});

			jqWar('.shadow').on('click', function(){
				menuBlock.removeClass('menu-catalog--show');
			});
		}

	}

	initMenuCatalogButton();

	/* Begin Меню с кнопкой еще
	 --------------------*/
	setTimeout(alignMenu, 0);

	/**
	 * Обработка меню, для схлопывания элементов в пункт 'ЕЩЁ'
	 */
	function alignMenu() {
		var hideIndex = 0,
			elementsWidth = [],
			nav = jqWar(".top-nav"),
			init = false,
			elements = nav.children();

		var calcElementsWidth = function() {
			jqWar.each(elements, function () {
				var elWidth = jqWar(this).outerWidth(true);
				elementsWidth.push(elWidth);
			});
		};

		jqWar(window).resize(function () {
			var w = 0,
				maxWidthMenu = nav.width();

			if (!nav.is(':visible')) {
				return;
			}

			if (!init) {
				init = true;
				calcElementsWidth();
				nav.removeClass('top-nav--noinit');
			}

			for (var i = 0, len = elementsWidth.length; i < len; i++) {
				w += elementsWidth[i];

				if (maxWidthMenu < w) {
					if (hideIndex != i) {
						hideIndex = i;
						alignMenuRender(elements, i);
					}
					break;
				}
			}
		}).trigger('resize');
	}
	
	/**
	 * Отрисовак меню с пунктом 'ЕЩЁ'
	 *
	 * @param elements - набор пунктов меню
	 * @param index - идекс элемента, который уже не помещается в меню
	 */
	function alignMenuRender(elements, index) {
		var moreMenuHTML = '',
			hideElements = elements.slice(index - 1);

		if (hideElements.length < 1) {
			return;
		}

		jqWar(".top-nav").html(elements.slice(0, index - 1));

		jqWar.each(hideElements, function () {
			var el = jqWar(this);
			moreMenuHTML += jqWar('<div>').append(el.clone()).html();
		});

		jqWar(".top-nav").append(
			'<li href="#" class="top-nav__item top-nav__item--more hideshow">' +
			'<a class="top-nav__link" href="#">' + trJs('Ещё') + ' ' +
			'</a><ul class="sub-more">' +
			moreMenuHTML + '</ul></li>');

		jqWar(".top-nav .hideshow").click(function () {
			jqWar(this).children("ul").toggle();
		});
	}

	/* End Меню с кнопкой еще
	 --------------------*/

	/* Begin Показ настроек поиска
	 --------------------*/
	function searchSettingsToggle() {

		var controlButton = document.querySelector('.search-setting__icon'),
			fadeFull = document.querySelector('.search-setting__options');

		function SettingsToggle(settingDiv, fadeDiv) {
			this.cl = 'search-setting__options--showed';
			this.settingDiv = settingDiv;
			this.fadeDiv = fadeDiv;
			this.showed = false;
			var self = this;
			this.hideEvent = function(e){
				if(self.showed) {
					if(!self.fadeDiv.contains(e.target)){
						self.hide();
					}
				}
			};
		}

		SettingsToggle.prototype.toggle = function() {
			this.showed ? this.hide() : this.show();
		};

		SettingsToggle.prototype.show = function() {
			this.settingDiv.classList.add(this.cl);
			this.showed = true;
			var self = this;
			setTimeout(function(){
				document.addEventListener('click', self.hideEvent);
			},0);

		};

		SettingsToggle.prototype.hide = function() {
			this.settingDiv.classList.remove(this.cl);
			this.showed = false;
			document.removeEventListener('click', this.hideEvent);
		};

		var setting = new SettingsToggle(fadeFull, fadeFull);

		if(fadeFull && controlButton) {
			controlButton.addEventListener('click', function() {
				setting.toggle();
			});
		}

	};

	searchSettingsToggle();

	/* End Показ настроек поиска
	 --------------------*/

	/* Begin Мобильное меню
	 --------------------*/

	(function () {

		var TogglewMobileMenu = function () {

			this.css = {
				navbarInner: 'navbar-push__inner',
				navbar: 'navbar-push',
				navbarShow: 'navbar-push--open',
				navbarInnerShow: 'navbar-push__inner--show'
			};
			this.open = false;
			this.shadow = document.querySelector('.shadow');
			this.navbar = document.querySelector('.' + this.css.navbar);
			this.navbarInner = document.querySelector('.' + this.css.navbarInner);

			this.closeMenu();

		};

		TogglewMobileMenu.prototype.closeMenu = function () {

			if (this.navbarInner) this.navbarInner.classList.remove(this.css.navbarInnerShow);
			if (this.navbar) this.navbar.classList.remove(this.css.navbarShow);
			this.open = false;
			this.setShadow();

		};

		TogglewMobileMenu.prototype.openMenu = function () {

			this.navbarInner.classList.add(this.css.navbarInnerShow);
			this.navbar.classList.add(this.css.navbarShow);
			this.open = true;
			this.setShadow();

		};

		TogglewMobileMenu.prototype.toggle = function () {

			if (this.open) {
				this.closeMenu();
			} else {
				this.openMenu();
			}
		};

		TogglewMobileMenu.prototype.setShadow = function () {
			if (!this.shadow) return;
			var cl = 'shadow--open';
			if (this.open) {
				this.shadow.classList.add(cl);
			} else {
				this.shadow.classList.remove(cl);
			}
		};

		var mobMenu = new TogglewMobileMenu();

		if (mobMenu) {
			var btn = document.querySelector('.btn-mobile');
			if (btn) {
				btn.addEventListener('click', function () {
					mobMenu.openMenu();
				});
			}

			var closeBtn = document.querySelector('.navbar-push__close');
			if (closeBtn) {
				closeBtn.addEventListener('click', function () {
					mobMenu.closeMenu();
				});
			}

			var shadow = document.querySelector('.shadow');
			if (shadow) {
				shadow.addEventListener('click', function () {
					mobMenu.closeMenu();
				});
			}
		}

	})();

	jqWar('.mobile-nav__btn-back').on('click', function () {
		jqWar('.mobile-nav').removeClass('mobile-nav--forward').addClass('mobile-nav--back');
	});

	jqWar('.mobile-nav__btn-login, .mobile-nav__btn-account').on('click', function () {
		jqWar('.mobile-nav').removeClass('mobile-nav--back').addClass('mobile-nav--forward');
	});


	var mobileMenuLink = jqWar('.mobile-menu__link'),
		mobileMenuSub = jqWar('.mobile-menu-sub'),
		mobileMenuSubLink = jqWar('.mobile-menu-sub__link');

	mobileMenuLink.click(function () {
		var $this = jqWar(this);
		if ($this.next('ul').length > 0) {
			mobileMenuSub.slideUp();
			mobileMenuLink.removeClass('mobile-menu__link--active');
			$this.addClass('mobile-menu__link--active');

			if ($this.next().is(":visible")) {
				$this.next().slideUp();
				$this.removeClass('mobile-menu__link--active');
			} else {
				$this.next().slideToggle();
			}

			return false;
		} else {
			return;
		}

	});

	mobileMenuSubLink.click(function () {
		var $this = jqWar(this);
		mobileMenuSubLink.removeClass('mobile-menu-sub__link--active');
		$this.addClass('mobile-menu-sub__link--active');
	});

	/* End Мобильное меню
	 --------------------*/

	/* Begin Меню каталоги
	 --------------------*/
	//jqWar(document).click(function (event) {
	//	if (
	//
	//		jqWar(event.target).closest("#search-full").length ||
	//		jqWar(event.target).is(".search-setting")) return;
	//	jqWar('.menu-catalog__btn').removeClass('menu-catalog__btn--show');
	//	jqWar('.shadow').removeClass('shadow--open');
	//	jqWar('#search-full').fadeOut();
	//	event.stopPropagation();
	//});

	/* End Меню каталоги
	 --------------------*/

	function stickyTopPanel(options){

		if(!options.panelContainer || !options.panel) return;

		this.panelContainer = options.panelContainer;
		this.panel = options.panel;
		this.cssFixedPanelClass = options.cssFixedPanelClass || 'header-catalog__panel--fixed';

		this.init();

	}

	stickyTopPanel.prototype.init = function() {

		this.stikyState = false

		var self = this;

		setTimeout(function(){
			self.setPanelHeight();
			self.setPanelOffsetTop();
		}, 0);

		document.addEventListener('scroll', function(e){

			if(window.pageYOffset >= self.panelOffsetTop){
				self.sticky();
			} else {
				self.unsticky()
			}

		})

		window.addEventListener('resize', function() {

			setTimeout(function(){
				self.setPanelOffsetTop();
			}, 0);

		});

	};

	stickyTopPanel.prototype.setPanelHeight = function() {

		this.panelHeight = this.panel.offsetHeight;

	};

	stickyTopPanel.prototype.setPanelOffsetTop = function() {

		if(this.stikyState){
			this.panelOffsetTop = this.panelContainer.offsetTop;
		} else {
			this.panelOffsetTop = this.panel.offsetTop;
		}

	};

	stickyTopPanel.prototype.sticky = function() {

		if(this.stikyState) return;

		this.panelContainer.style.height = this.panelHeight + 'px';
		this.panel.classList.add(this.cssFixedPanelClass);
		this.stikyState = true;

	};

	stickyTopPanel.prototype.unsticky = function() {

		if(!this.stikyState) return;

		this.panelContainer.style.height = 'auto';
		this.panel.classList.remove(this.cssFixedPanelClass);
		this.stikyState = false;

	};

	(function(){
		var hCatalog = document.getElementsByClassName('header-catalog')[0];
		if(hCatalog){
			var hCatalogPanel = hCatalog.getElementsByClassName('header-catalog__panel')[0];
			if(hCatalogPanel){
				var panel = new stickyTopPanel({
					panel: hCatalogPanel,
					panelContainer: hCatalog
				})
			}
		}

	})();

	/* Begin Замена картинок сортировки
	 --------------------*/

	if (document.querySelector('.web-table')) {
		jqWar('.sort_link img').each(function () {
			var className = this.getAttribute('src').slice(9).slice(0, -4);
			this.parentNode.classList.add('web-table__' + className);
		});
	}

	/* End Замена картинок сортировки
	 --------------------*/

	if (window._forms && window._forms['registration']) {

		window._forms['registration'].initCustom = function () {
			var tooltips = document.querySelectorAll("[data-tooltip]");
			for (var i = 0; i < tooltips.length; i++) {
				this.setTooltip(tooltips[i], null);
			}
			var self = this;
			var formGroupsControls = this.form.querySelectorAll('.form-gr__control');
			if (formGroupsControls) {
				formGroupsControls.forEach(function (control) {
					control.classList.add('form-gr__control--tooltip');
				});
			}
			var controls = this.form.querySelectorAll('.required');
			if (controls) {
				controls.forEach(function (control) {
					self.setRequiredParentControlClasses(control);
				});
			}
		};

		window._forms['registration'].setTooltip = function (field, tooltip, required) {

			if (!tooltip) tooltip = (field.getAttribute("data-tooltip") ? field.getAttribute("data-tooltip") : "");
			var tooltipId = field.id + "-tooltip";
			var tooltipEl = this.form.querySelector("#" + tooltipId);
			if (!tooltipEl) {
				tooltipEl = document.createElement('div');
				tooltipEl.id = tooltipId;
				tooltipEl.classList.add('form-gr__tooltip');

				var parent = jqWar(field).parents('.form-gr__control');
				if (parent.length > 0) {
					parent[0].parentNode.appendChild(tooltipEl);
				} else {
					field.parentNode.appendChild(tooltipEl);
				}
			}

			tooltipEl.innerText = tooltip;
		};

		window._forms['registration'].onElementFail = function (field, msg) {
			this.__proto__.onElementFail.apply(this, arguments);
			if (!this.ajaxCheckLoading) {
				this.setTooltip(field, msg, true);
				if (field.classList.contains('required') && field.parentNode.classList.contains('form-gr__control')) {
					this.setRequiredParentControlClasses(field);
				}
			} else {
				this.setTooltip(field, '...');
			}
		};

		window._forms['registration'].onElementSucces = function (field) {
			this.__proto__.onElementSucces.apply(this, arguments);
			this.setTooltip(field, null);
			if (field.parentNode.classList.contains('form-gr__control--required')) {
				field.parentNode.classList.remove('form-gr__control--required');
			}
		};

		window._forms['registration'].setRequiredParentControlClasses = function (control) {
			if (control.parentNode && control.parentNode.classList.contains('form-gr__control')) {
				control.parentNode.classList.add('form-gr__control--required');
			}
		};
	}

	var userMenuContainers = document.querySelectorAll(".auth-user");
	for (var i = 0; i < userMenuContainers.length; i++) {
		new UserMenu(userMenuContainers[i]);
	}

	new Ccatalogs();
	

});

function Ccatalogs() {

	var self = this;
	document.addEventListener("catalog-loaded", function () {
		self.parseBreadcrumbs();
	});
}

Ccatalogs.prototype.parseBreadcrumbs = function () {
	var ul = document.querySelector("[class='way']");
	if (!ul) return;
	var originalBreadcrumbs = document.querySelector("#breadcrumbs-list .breadcrumbs");
	var breadcrumbs = [];
	for (var i = 0; i < ul.children.length; i++) {
		var link = ul.children[i].querySelector('a');
		if (link) {
			breadcrumbs.push(this.generateBreadcrumbsEl(link.innerText, link.href));
		} else {
			breadcrumbs.push(this.generateBreadcrumbsEl(ul.children[i].innerText));
		}
	}
	if (originalBreadcrumbs && breadcrumbs.length > 0) {
		var endClass = "breadcrumbs__item-end";
		var originalEndEl = document.querySelector("#breadcrumbs-list ." + endClass);
		if (originalEndEl) originalEndEl.remove();
		breadcrumbs[breadcrumbs.length - 1].classList.add(endClass);
		ul.remove();
		breadcrumbs.forEach(function (li) {
			originalBreadcrumbs.appendChild(li);
		});
	}
};

Ccatalogs.prototype.generateBreadcrumbsEl = function (text, link) {
	var li = document.createElement("li");
	li.classList.add("breadcrumbs__item");
	if (link) {
		var a = document.createElement("a");
		a.classList.add("breadcrumbs__link");
		a.href = link;
		a.innerText = text;
		li.appendChild(a);
	} else {
		li.innerText = text;
	}
	return li;
};


function UserMenu(container) {
	this.container = container;
	this.menuSelector = ".user-menu";
	this.menuShowCss = "user-menu--show";
	this.init();
}

UserMenu.prototype.init = function () {

	this.menu = this.container.querySelector(this.menuSelector);
	if (!this.menu) return;

	var self = this;
	this.container.addEventListener("click", function () {
		self.menuToggle();
	});

	this.container.addEventListener("mouseover", function () {
		self.menuShow();
	});

	this.container.addEventListener("mouseout", function () {
		self.menuHide();
	});
};

UserMenu.prototype.menuToggle = function () {
	if (this.menu.classList.contains(this.menuShowCss)) {
		this.menuHide();
	} else {
		this.menuShow();
	}
};

UserMenu.prototype.menuShow = function () {
	this.menu.classList.add(this.menuShowCss);
};

UserMenu.prototype.menuHide = function () {
	this.menu.classList.remove(this.menuShowCss);
};

(function($) {
	//поддержка svg as external file для IE через svg4everybody
	//https://github.com/jonathantneal/svg4everybody
	var isIE = false;
	isIE = document.all && document.addEventListener;
	if(!isIE) {
		//IE11
		isIE = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
	}
	if(isIE){
		$(document).ready(function(){
			$.ajax({
				url: "https://api.cdnjs.com/libraries/?search=svg4everybody"
			})
				.done(function(data){
					if(data.results !== undefined){
						if(data.total > 0 && data.results[0] !== undefined) {
							$.getScript( data.results[0].latest, function() {
								svg4everybody();
							});
						}
					}
				});
		});
	}
})(jqWar);