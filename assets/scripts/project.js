'use strict';

/**
 * File js-enabled.js
 *
 * If Javascript is enabled, replace the <body> class "no-js".
 */
document.body.className = document.body.className.replace('no-js', 'js');
'use strict';

/**
 * File login-with-ajax.js
 *
 * Deal with multiple modals and their media.
 */
window.lavanderLoginWithAjax = {};

(function (window, $, app) {
	// Constructor.
	app.init = function () {
		app.cache();

		if (app.meetsRequirements()) {
			app.bindEvents();
		}
	};

	// Cache all the things.
	app.cache = function () {
		app.$c = {
			'body': $('body')
		};
	};

	// Do we meet the requirements?
	app.meetsRequirements = function () {
		return $('.lwa-register').length;
	};

	// Combine all events.
	app.bindEvents = function () {

		// Trigger a modal to open.
		app.$c.body.on('click touchstart', '.register', app.showRegisterForm);

		// Trigger the close button to close the modal.
		app.$c.body.on('click touchstart', '.close', app.closeFrom);

		// Allow the user to close the modal by clicking outside of the modal.
		app.$c.body.on('click touchstart', 'div.modal-open', app.closeModalByClick);
	};

	// Open the modal.
	app.showRegisterForm = function () {

		event.preventDefault();
		// Figure out what we show.
		var $register_form = $(this).parents('.lwa').find('.lwa-register');
		// Display the register form.
		if (register_form.length > 0) {
			alert('');
			event.preventDefault();
			register_form.toggle('slow');
			$(this).parents('.lwa').find('.lwa-remember').toggle('slow');
		}

		// Display the modal.
		$modal.addClass('modal-open');

		// Add body class.
		app.$c.body.addClass('modal-open');
	};

	// Close the modal.
	app.closeFrom = function () {
		// Figure the opened modal we're closing and store the object.
		var $modal = $($('div.modal-open .close').data('target'));

		// Find the iframe in the $modal object.
		var $iframe = $modal.find('iframe');

		// Get the iframe src URL.
		var url = $iframe.attr('src');

		// Remove the source URL, then add it back, so the video can be played again later.
		$iframe.attr('src', '').attr('src', url);

		// Finally, hide the modal.
		$modal.removeClass('modal-open');

		// Remove the body class.
		app.$c.body.removeClass('modal-open');
	};

	// Close if the user clicks outside of the modal
	app.closeModalByClick = function (event) {
		// If the parent container is NOT the modal dialog container, close the modal
		if (!$(event.target).parents('div').hasClass('modal-dialog')) {
			app.closeForm();
		}
	};

	// Engage!
	$(app.init);
})(window, jQuery, window.lavanderLoginWithAjax);
'use strict';

/**
 * file menu.js
 *
 * Mobile Navigation Menu
 */
window.lavanderMobileNav = {};
(function (window, $, app) {
	// Constructor
	app.init = function () {
		app.cache();

		if (app.meetsRequirements()) {
			app.bindEvents();
		}
	};

	// Cache all the things
	app.cache = function () {
		app.$c = {
			'window': $(window),
			'body': $('body'),
			'navMenuContainer': $('.menu')
		};
	};

	// Combine all events
	app.bindEvents = function () {

		// Show more items when the "more" item is clicked.
		app.$c.body.on('click', '.menu-btn', app.displayMenu);

		// Add the more classes when hovering a parent menu item.
		app.$c.body.on('click', '.menu .menu-item-has-children > a', app.setSecondClick);

		// Hide the menu when the close button is clicked.
		app.$c.body.on('click', '.close-menu', app.hideMenu);
	};

	// Do we meet the requirements?
	app.meetsRequirements = function () {
		return app.$c.navMenuContainer.length;
	};

	// Toggle the menu items on a click of the "more" link.
	app.displayMenu = function (event) {
		event.preventDefault();

		// Hide the menu if it's already opened
		if (app.$c.body.hasClass('menu-more') && !app.$c.body.hasClass('sub-menu-more')) {
			app.removeMenuClasses();
			return;
		}

		// Remove any instances of classes already in place.
		// This makes sure we can click to switch between submenus.
		app.removeMenuClasses();

		app.$c.navMenuContainer.toggleClass('more');
		app.$c.body.toggleClass('menu-more');
	};

	// Let the submenu parent be a normal link on the second click
	app.setSecondClick = function (event) {
		// Check to see if this parent has the visible class
		if (!$(this).parent('li').hasClass('visible')) {
			// Don't let the link fire as a normal link
			event.preventDefault();
		}

		// Remove any instances of classes already in place
		// This makes sure we can click to switch between submenus
		app.removeMenuClasses();

		// Toggle the class to display the submenu
		$(this).parent('li').toggleClass('visible');

		// Add our "more" classes as we do when clicking the "More" link
		app.$c.navMenuContainer.toggleClass('more');
		app.$c.body.toggleClass('menu-more sub-menu-more');
	};

	// Hide the menu items
	app.hideMenu = function () {
		app.removeMenuClasses();
	};

	app.removeMenuClasses = function () {
		// Remove any instances of classes already in place
		// This makes sure we can click to switch between submenus
		app.$c.body.removeClass('menu-more');
		app.$c.navMenuContainer.removeClass('visible');
		// $( '.menu-item-has-children' ).removeClass( 'visible' );
	};

	// Engage
	$(app.init);
})(window, jQuery, window.lavanderMobileNav);
'use strict';

/**
 * File modal.js
 *
 * Deal with multiple modals and their media.
 */
window.lavanderModal = {};

(function (window, $, app) {
	// Constructor.
	app.init = function () {
		app.cache();

		if (app.meetsRequirements()) {
			app.bindEvents();
		}
	};

	// Cache all the things.
	app.cache = function () {
		app.$c = {
			'body': $('body')
		};
	};

	// Do we meet the requirements?
	app.meetsRequirements = function () {
		return $('.modal-trigger').length;
	};

	// Combine all events.
	app.bindEvents = function () {
		// Trigger a modal to open.
		app.$c.body.on('click touchstart', '.modal-trigger', app.openModal);

		// Trigger the close button to close the modal.
		app.$c.body.on('click touchstart', '.close', app.closeModal);

		// Allow the user to close the modal by hitting the esc key.
		app.$c.body.on('keydown', app.escKeyClose);

		// Allow the user to close the modal by clicking outside of the modal.
		app.$c.body.on('click touchstart', 'div.modal-open', app.closeModalByClick);
	};

	// Open the modal.
	app.openModal = function () {
		// Figure out which modal we're opening and store the object.
		var $modal = $($(this).data('target'));

		// Display the modal.
		$modal.addClass('modal-open');

		// Add body class.
		app.$c.body.addClass('modal-open');
	};

	// Close the modal.
	app.closeModal = function () {
		// Figure the opened modal we're closing and store the object.
		var $modal = $($('div.modal-open .close').data('target'));

		// Find the iframe in the $modal object.
		var $iframe = $modal.find('iframe');

		// Get the iframe src URL.
		var url = $iframe.attr('src');

		// Remove the source URL, then add it back, so the video can be played again later.
		$iframe.attr('src', '').attr('src', url);

		// Finally, hide the modal.
		$modal.removeClass('modal-open');

		// Remove the body class.
		app.$c.body.removeClass('modal-open');
	};

	// Close if "esc" key is pressed.
	app.escKeyClose = function (event) {
		if (27 === event.keyCode) {
			app.closeModal();
		}
	};

	// Close if the user clicks outside of the modal
	app.closeModalByClick = function (event) {
		// If the parent container is NOT the modal dialog container, close the modal
		if (!$(event.target).parents('div').hasClass('modal-dialog')) {
			app.closeModal();
		}
	};

	// Engage!
	$(app.init);
})(window, jQuery, window.lavanderModal);
'use strict';

/**
 * File search.js
 *
 * Deal with the search form.
 */
window.lavanderSearch = {};

(function (window, $, app) {
	// Constructor.
	app.init = function () {
		app.cache();

		if (app.meetsRequirements()) {
			app.bindEvents();
		}
	};

	// Cache all the things.
	app.cache = function () {
		app.$c = {
			'body': $('body')
		};
	};

	// Do we meet the requirements?
	app.meetsRequirements = function () {
		return $('.search-field').length;
	};

	// Combine all events.
	app.bindEvents = function () {
		// Remove placeholder text from search field on focus.
		app.$c.body.on('focus', '.search-field', app.removePlaceholderText);

		// Add placeholder text back to search field on blur.
		app.$c.body.on('blur', '.search-field', app.addPlaceholderText);
	};

	// Remove placeholder text from search field.
	app.removePlaceholderText = function () {
		var $search_field = $(this);

		$search_field.data('placeholder', $search_field.attr('placeholder')).attr('placeholder', '');
	};

	// Replace placeholder text from search field.
	app.addPlaceholderText = function () {
		var $search_field = $(this);

		$search_field.attr('placeholder', $search_field.data('placeholder')).data('placeholder', '');
	};

	// Engage!
	$(app.init);
})(window, jQuery, window.lavanderSearch);
'use strict';

/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
	var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

	if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
		window.addEventListener('hashchange', function () {
			var id = location.hash.substring(1),
			    element;

			if (!/^[A-z0-9_-]+$/.test(id)) {
				return;
			}

			element = document.getElementById(id);

			if (element) {
				if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false);
	}
})();
'use strict';

/**
 * File window-ready.js
 *
 * Add a "ready" class to <body> when window is ready.
 */
window.lavanderWindowReady = {};
(function (window, $, app) {
	// Constructor.
	app.init = function () {
		app.cache();
		app.bindEvents();
	};

	// Cache document elements.
	app.cache = function () {
		app.$c = {
			'window': $(window),
			'body': $(document.body)
		};
	};

	// Combine all events.
	app.bindEvents = function () {
		app.$c.window.load(app.addBodyClass);
	};

	// Add a class to <body>.
	app.addBodyClass = function () {
		app.$c.body.addClass('ready');
	};

	// Engage!
	$(app.init);
})(window, jQuery, window.lavanderWindowReady);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzLWVuYWJsZWQuanMiLCJsb2dpbi13aXRoLWFqYXguanMiLCJtZW51LmpzIiwibW9kYWwuanMiLCJzZWFyY2guanMiLCJza2lwLWxpbmstZm9jdXMtZml4LmpzIiwid2luZG93LXJlYWR5LmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYm9keSIsImNsYXNzTmFtZSIsInJlcGxhY2UiLCJ3aW5kb3ciLCJsYXZhbmRlckxvZ2luV2l0aEFqYXgiLCIkIiwiYXBwIiwiaW5pdCIsImNhY2hlIiwibWVldHNSZXF1aXJlbWVudHMiLCJiaW5kRXZlbnRzIiwiJGMiLCJsZW5ndGgiLCJvbiIsInNob3dSZWdpc3RlckZvcm0iLCJjbG9zZUZyb20iLCJjbG9zZU1vZGFsQnlDbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCIkcmVnaXN0ZXJfZm9ybSIsInBhcmVudHMiLCJmaW5kIiwicmVnaXN0ZXJfZm9ybSIsImFsZXJ0IiwidG9nZ2xlIiwiJG1vZGFsIiwiYWRkQ2xhc3MiLCJkYXRhIiwiJGlmcmFtZSIsInVybCIsImF0dHIiLCJyZW1vdmVDbGFzcyIsInRhcmdldCIsImhhc0NsYXNzIiwiY2xvc2VGb3JtIiwialF1ZXJ5IiwibGF2YW5kZXJNb2JpbGVOYXYiLCJkaXNwbGF5TWVudSIsInNldFNlY29uZENsaWNrIiwiaGlkZU1lbnUiLCJuYXZNZW51Q29udGFpbmVyIiwicmVtb3ZlTWVudUNsYXNzZXMiLCJ0b2dnbGVDbGFzcyIsInBhcmVudCIsImxhdmFuZGVyTW9kYWwiLCJvcGVuTW9kYWwiLCJjbG9zZU1vZGFsIiwiZXNjS2V5Q2xvc2UiLCJrZXlDb2RlIiwibGF2YW5kZXJTZWFyY2giLCJyZW1vdmVQbGFjZWhvbGRlclRleHQiLCJhZGRQbGFjZWhvbGRlclRleHQiLCIkc2VhcmNoX2ZpZWxkIiwiaXNXZWJraXQiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJpc09wZXJhIiwiaXNJZSIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlkIiwibG9jYXRpb24iLCJoYXNoIiwic3Vic3RyaW5nIiwiZWxlbWVudCIsInRlc3QiLCJ0YWdOYW1lIiwidGFiSW5kZXgiLCJmb2N1cyIsImxhdmFuZGVyV2luZG93UmVhZHkiLCJsb2FkIiwiYWRkQm9keUNsYXNzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7OztBQUtBQSxTQUFTQyxJQUFULENBQWNDLFNBQWQsR0FBMEJGLFNBQVNDLElBQVQsQ0FBY0MsU0FBZCxDQUF3QkMsT0FBeEIsQ0FBaUMsT0FBakMsRUFBMEMsSUFBMUMsQ0FBMUI7OztBQ0xBOzs7OztBQUtBQyxPQUFPQyxxQkFBUCxHQUErQixFQUEvQjs7QUFFQSxDQUFFLFVBQVdELE1BQVgsRUFBbUJFLENBQW5CLEVBQXNCQyxHQUF0QixFQUE0QjtBQUM3QjtBQUNBQSxLQUFJQyxJQUFKLEdBQVcsWUFBWTtBQUN0QkQsTUFBSUUsS0FBSjs7QUFFQSxNQUFLRixJQUFJRyxpQkFBSixFQUFMLEVBQStCO0FBQzlCSCxPQUFJSSxVQUFKO0FBQ0E7QUFDRCxFQU5EOztBQVFBO0FBQ0FKLEtBQUlFLEtBQUosR0FBWSxZQUFZO0FBQ3ZCRixNQUFJSyxFQUFKLEdBQVM7QUFDUixXQUFRTixFQUFHLE1BQUg7QUFEQSxHQUFUO0FBR0EsRUFKRDs7QUFNQTtBQUNBQyxLQUFJRyxpQkFBSixHQUF3QixZQUFZO0FBQ25DLFNBQU9KLEVBQUcsZUFBSCxFQUFxQk8sTUFBNUI7QUFDQSxFQUZEOztBQUlBO0FBQ0FOLEtBQUlJLFVBQUosR0FBaUIsWUFBWTs7QUFFNUI7QUFDQUosTUFBSUssRUFBSixDQUFPWCxJQUFQLENBQVlhLEVBQVosQ0FBZ0Isa0JBQWhCLEVBQW9DLFdBQXBDLEVBQWlEUCxJQUFJUSxnQkFBckQ7O0FBRUE7QUFDQVIsTUFBSUssRUFBSixDQUFPWCxJQUFQLENBQVlhLEVBQVosQ0FBZ0Isa0JBQWhCLEVBQW9DLFFBQXBDLEVBQThDUCxJQUFJUyxTQUFsRDs7QUFFQTtBQUNBVCxNQUFJSyxFQUFK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WUFBSixHQUFtQixZQUFZO0FBQzlCbkUsTUFBSUssRUFBSixDQUFPWCxJQUFQLENBQVkwQixRQUFaLENBQXNCLE9BQXRCO0FBQ0EsRUFGRDs7QUFJQTtBQUNBckIsR0FBR0MsSUFBSUMsSUFBUDtBQUNBLENBM0JELEVBMkJLSixNQTNCTCxFQTJCYWdDLE1BM0JiLEVBMkJxQmhDLE9BQU9vRSxtQkEzQjVCIiwiZmlsZSI6InByb2plY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEZpbGUganMtZW5hYmxlZC5qc1xuICpcbiAqIElmIEphdmFzY3JpcHQgaXMgZW5hYmxlZCwgcmVwbGFjZSB0aGUgPGJvZHk+IGNsYXNzIFwibm8tanNcIi5cbiAqL1xuZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZS5yZXBsYWNlKCAnbm8tanMnLCAnanMnICk7XG4iLCIvKipcbiAqIEZpbGUgbG9naW4td2l0aC1hamF4LmpzXG4gKlxuICogRGVhbCB3aXRoIG11bHRpcGxlIG1vZGFscyBhbmQgdGhlaXIgbWVkaWEuXG4gKi9cbndpbmRvdy5sYXZhbmRlckxvZ2luV2l0aEFqYXggPSB7fTtcblxuKCBmdW5jdGlvbiAoIHdpbmRvdywgJCwgYXBwICkge1xuXHQvLyBDb25zdHJ1Y3Rvci5cblx0YXBwLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YXBwLmNhY2hlKCk7XG5cblx0XHRpZiAoIGFwcC5tZWV0c1JlcXVpcmVtZW50cygpICkge1xuXHRcdFx0YXBwLmJpbmRFdmVudHMoKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gQ2FjaGUgYWxsIHRoZSB0aGluZ3MuXG5cdGFwcC5jYWNoZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuJGMgPSB7XG5cdFx0XHQnYm9keSc6ICQoICdib2R5JyApXG5cdFx0fTtcblx0fTtcblxuXHQvLyBEbyB3ZSBtZWV0IHRoZSByZXF1aXJlbWVudHM/XG5cdGFwcC5tZWV0c1JlcXVpcmVtZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gJCggJy5sd2EtcmVnaXN0ZXInICkubGVuZ3RoO1xuXHR9O1xuXG5cdC8vIENvbWJpbmUgYWxsIGV2ZW50cy5cblx0YXBwLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBUcmlnZ2VyIGEgbW9kYWwgdG8gb3Blbi5cblx0XHRhcHAuJGMuYm9keS5vbiggJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLnJlZ2lzdGVyJywgYXBwLnNob3dSZWdpc3RlckZvcm0gKTtcblxuXHRcdC8vIFRyaWdnZXIgdGhlIGNsb3NlIGJ1dHRvbiB0byBjbG9zZSB0aGUgbW9kYWwuXG5cdFx0YXBwLiRjLmJvZHkub24oICdjbGljayB0b3VjaHN0YXJ0JywgJy5jbG9zZScsIGFwcC5jbG9zZUZyb20gKTtcblxuXHRcdC8vIEFsbG93IHRoZSB1c2VyIHRvIGNsb3NlIHRoZSBtb2RhbCBieSBjbGlja2luZyBvdXRzaWRlIG9mIHRoZSBtb2RhbC5cblx0XHRhcHAuJGMuYm9keS5vbiggJ2NsaWNrIHRvdWNoc3RhcnQnLCAnZGl2Lm1vZGFsLW9wZW4nLCBhcHAuY2xvc2VNb2RhbEJ5Q2xpY2sgKTtcblx0fTtcblxuXHQvLyBPcGVuIHRoZSBtb2RhbC5cblx0YXBwLnNob3dSZWdpc3RlckZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdC8vIEZpZ3VyZSBvdXQgd2hhdCB3ZSBzaG93LlxuXHRcdHZhciAkcmVnaXN0ZXJfZm9ybSA9ICQodGhpcykucGFyZW50cygnLmx3YScpLmZpbmQoJy5sd2EtcmVnaXN0ZXInKTtcblx0XHQvLyBEaXNwbGF5IHRoZSByZWdpc3RlciBmb3JtLlxuXHRcdGlmKCByZWdpc3Rlcl9mb3JtLmxlbmd0aCA+IDAgKXtcblx0XHRcdGFsZXJ0KCcnKTtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRyZWdpc3Rlcl9mb3JtLnRvZ2dsZSgnc2xvdycpO1xuXHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcubHdhJykuZmluZCgnLmx3YS1yZW1lbWJlcicpLnRvZ2dsZSgnc2xvdycpO1xuXHRcdH1cblxuXG5cdFx0Ly8gRGlzcGxheSB0aGUgbW9kYWwuXG5cdFx0JG1vZGFsLmFkZENsYXNzKCAnbW9kYWwtb3BlbicgKTtcblxuXHRcdC8vIEFkZCBib2R5IGNsYXNzLlxuXHRcdGFwcC4kYy5ib2R5LmFkZENsYXNzKCAnbW9kYWwtb3BlbicgKTtcblx0fTtcblxuXHQvLyBDbG9zZSB0aGUgbW9kYWwuXG5cdGFwcC5jbG9zZUZyb20gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gRmlndXJlIHRoZSBvcGVuZWQgbW9kYWwgd2UncmUgY2xvc2luZyBhbmQgc3RvcmUgdGhlIG9iamVjdC5cblx0XHR2YXIgJG1vZGFsID0gJCggJCggJ2Rpdi5tb2RhbC1vcGVuIC5jbG9zZScgKS5kYXRhKCAndGFyZ2V0JyApICk7XG5cblx0XHQvLyBGaW5kIHRoZSBpZnJhbWUgaW4gdGhlICRtb2RhbCBvYmplY3QuXG5cdFx0dmFyICRpZnJhbWUgPSAkbW9kYWwuZmluZCggJ2lmcmFtZScgKTtcblxuXHRcdC8vIEdldCB0aGUgaWZyYW1lIHNyYyBVUkwuXG5cdFx0dmFyIHVybCA9ICRpZnJhbWUuYXR0ciggJ3NyYycgKTtcblxuXHRcdC8vIFJlbW92ZSB0aGUgc291cmNlIFVSTCwgdGhlbiBhZGQgaXQgYmFjaywgc28gdGhlIHZpZGVvIGNhbiBiZSBwbGF5ZWQgYWdhaW4gbGF0ZXIuXG5cdFx0JGlmcmFtZS5hdHRyKCAnc3JjJywgJycgKS5hdHRyKCAnc3JjJywgdXJsICk7XG5cblx0XHQvLyBGaW5hbGx5LCBoaWRlIHRoZSBtb2RhbC5cblx0XHQkbW9kYWwucmVtb3ZlQ2xhc3MoICdtb2RhbC1vcGVuJyApO1xuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBib2R5IGNsYXNzLlxuXHRcdGFwcC4kYy5ib2R5LnJlbW92ZUNsYXNzKCAnbW9kYWwtb3BlbicgKTtcblx0fTtcblxuXHQvLyBDbG9zZSBpZiB0aGUgdXNlciBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgbW9kYWxcblx0YXBwLmNsb3NlTW9kYWxCeUNsaWNrID0gZnVuY3Rpb24gKCBldmVudCApIHtcblx0XHQvLyBJZiB0aGUgcGFyZW50IGNvbnRhaW5lciBpcyBOT1QgdGhlIG1vZGFsIGRpYWxvZyBjb250YWluZXIsIGNsb3NlIHRoZSBtb2RhbFxuXHRcdGlmICggISQoIGV2ZW50LnRhcmdldCApLnBhcmVudHMoICdkaXYnICkuaGFzQ2xhc3MoICdtb2RhbC1kaWFsb2cnICkgKSB7XG5cdFx0XHRhcHAuY2xvc2VGb3JtKCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIEVuZ2FnZSFcblx0JCggYXBwLmluaXQgKTtcbn0gKSggd2luZG93LCBqUXVlcnksIHdpbmRvdy5sYXZhbmRlckxvZ2luV2l0aEFqYXggKTtcbiIsIi8qKlxuICogZmlsZSBtZW51LmpzXG4gKlxuICogTW9iaWxlIE5hdmlnYXRpb24gTWVudVxuICovXG53aW5kb3cubGF2YW5kZXJNb2JpbGVOYXYgPSB7fTtcbiggZnVuY3Rpb24gKCB3aW5kb3csICQsIGFwcCApIHtcblx0Ly8gQ29uc3RydWN0b3Jcblx0YXBwLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YXBwLmNhY2hlKCk7XG5cblx0XHRpZiAoIGFwcC5tZWV0c1JlcXVpcmVtZW50cygpICkge1xuXHRcdFx0YXBwLmJpbmRFdmVudHMoKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gQ2FjaGUgYWxsIHRoZSB0aGluZ3Ncblx0YXBwLmNhY2hlID0gZnVuY3Rpb24gKCkge1xuXHRcdGFwcC4kYyA9IHtcblx0XHRcdCd3aW5kb3cnOiAkKCB3aW5kb3cgKSxcblx0XHRcdCdib2R5JzogJCggJ2JvZHknICksXG5cdFx0XHQnbmF2TWVudUNvbnRhaW5lcic6ICQoICcubWVudScgKSxcblx0XHR9O1xuXHR9O1xuXG5cdC8vIENvbWJpbmUgYWxsIGV2ZW50c1xuXHRhcHAuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcblxuXG5cdFx0Ly8gU2hvdyBtb3JlIGl0ZW1zIHdoZW4gdGhlIFwibW9yZVwiIGl0ZW0gaXMgY2xpY2tlZC5cblx0XHRhcHAuJGMuYm9keS5vbiggJ2NsaWNrJywgJy5tZW51LWJ0bicsIGFwcC5kaXNwbGF5TWVudSApO1xuXG5cdFx0Ly8gQWRkIHRoZSBtb3JlIGNsYXNzZXMgd2hlbiBob3ZlcmluZyBhIHBhcmVudCBtZW51IGl0ZW0uXG5cdFx0YXBwLiRjLmJvZHkub24oICdjbGljaycsICcubWVudSAubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IGEnLCBhcHAuc2V0U2Vjb25kQ2xpY2sgKTtcblxuXHRcdC8vIEhpZGUgdGhlIG1lbnUgd2hlbiB0aGUgY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWQuXG5cdFx0YXBwLiRjLmJvZHkub24oICdjbGljaycsICcuY2xvc2UtbWVudScsIGFwcC5oaWRlTWVudSApO1xuXHR9O1xuXG5cdC8vIERvIHdlIG1lZXQgdGhlIHJlcXVpcmVtZW50cz9cblx0YXBwLm1lZXRzUmVxdWlyZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBhcHAuJGMubmF2TWVudUNvbnRhaW5lci5sZW5ndGg7XG5cdH07XG5cblx0Ly8gVG9nZ2xlIHRoZSBtZW51IGl0ZW1zIG9uIGEgY2xpY2sgb2YgdGhlIFwibW9yZVwiIGxpbmsuXG5cdGFwcC5kaXNwbGF5TWVudSA9IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIEhpZGUgdGhlIG1lbnUgaWYgaXQncyBhbHJlYWR5IG9wZW5lZFxuXHRcdGlmICggYXBwLiRjLmJvZHkuaGFzQ2xhc3MoICdtZW51LW1vcmUnICkgJiYgIWFwcC4kYy5ib2R5Lmhhc0NsYXNzKCAnc3ViLW1lbnUtbW9yZScgKSApIHtcblx0XHRcdGFwcC5yZW1vdmVNZW51Q2xhc3NlcygpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSBhbnkgaW5zdGFuY2VzIG9mIGNsYXNzZXMgYWxyZWFkeSBpbiBwbGFjZS5cblx0XHQvLyBUaGlzIG1ha2VzIHN1cmUgd2UgY2FuIGNsaWNrIHRvIHN3aXRjaCBiZXR3ZWVuIHN1Ym1lbnVzLlxuXHRcdGFwcC5yZW1vdmVNZW51Q2xhc3NlcygpO1xuXG5cdFx0YXBwLiRjLm5hdk1lbnVDb250YWluZXIudG9nZ2xlQ2xhc3MoICdtb3JlJyApO1xuXHRcdGFwcC4kYy5ib2R5LnRvZ2dsZUNsYXNzKCAnbWVudS1tb3JlJyApO1xuXHR9O1xuXG5cdC8vIExldCB0aGUgc3VibWVudSBwYXJlbnQgYmUgYSBub3JtYWwgbGluayBvbiB0aGUgc2Vjb25kIGNsaWNrXG5cdGFwcC5zZXRTZWNvbmRDbGljayA9IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHRoaXMgcGFyZW50IGhhcyB0aGUgdmlzaWJsZSBjbGFzc1xuXHRcdGlmKCAhJCggdGhpcyApLnBhcmVudCggJ2xpJyApLmhhc0NsYXNzKCAndmlzaWJsZScgKSApIHtcblx0XHRcdC8vIERvbid0IGxldCB0aGUgbGluayBmaXJlIGFzIGEgbm9ybWFsIGxpbmtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIGFueSBpbnN0YW5jZXMgb2YgY2xhc3NlcyBhbHJlYWR5IGluIHBsYWNlXG5cdFx0Ly8gVGhpcyBtYWtlcyBzdXJlIHdlIGNhbiBjbGljayB0byBzd2l0Y2ggYmV0d2VlbiBzdWJtZW51c1xuXHRcdGFwcC5yZW1vdmVNZW51Q2xhc3NlcygpO1xuXG5cdFx0Ly8gVG9nZ2xlIHRoZSBjbGFzcyB0byBkaXNwbGF5IHRoZSBzdWJtZW51XG5cdFx0JCggdGhpcyApLnBhcmVudCggJ2xpJyApLnRvZ2dsZUNsYXNzKCAndmlzaWJsZScgKTtcblxuXHRcdC8vIEFkZCBvdXIgXCJtb3JlXCIgY2xhc3NlcyBhcyB3ZSBkbyB3aGVuIGNsaWNraW5nIHRoZSBcIk1vcmVcIiBsaW5rXG5cdFx0YXBwLiRjLm5hdk1lbnVDb250YWluZXIudG9nZ2xlQ2xhc3MoICdtb3JlJyApO1xuXHRcdGFwcC4kYy5ib2R5LnRvZ2dsZUNsYXNzKCAnbWVudS1tb3JlIHN1Yi1tZW51LW1vcmUnICk7XG5cdH07XG5cblx0Ly8gSGlkZSB0aGUgbWVudSBpdGVtc1xuXHRhcHAuaGlkZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YXBwLnJlbW92ZU1lbnVDbGFzc2VzKCk7XG5cdH07XG5cblx0YXBwLnJlbW92ZU1lbnVDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuXHRcdC8vIFJlbW92ZSBhbnkgaW5zdGFuY2VzIG9mIGNsYXNzZXMgYWxyZWFkeSBpbiBwbGFjZVxuXHRcdC8vIFRoaXMgbWFrZXMgc3VyZSB3ZSBjYW4gY2xpY2sgdG8gc3dpdGNoIGJldHdlZW4gc3VibWVudXNcblx0XHRhcHAuJGMuYm9keS5yZW1vdmVDbGFzcyggJ21lbnUtbW9yZScgKTtcblx0XHRhcHAuJGMubmF2TWVudUNvbnRhaW5lci5yZW1vdmVDbGFzcyggJ3Zpc2libGUnICk7XG5cdFx0Ly8gJCggJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJyApLnJlbW92ZUNsYXNzKCAndmlzaWJsZScgKTtcblx0fTtcblxuXHQvLyBFbmdhZ2Vcblx0JCggYXBwLmluaXQgKTtcbn0gKSggd2luZG93LCBqUXVlcnksIHdpbmRvdy5sYXZhbmRlck1vYmlsZU5hdiApO1xuIiwiLyoqXG4gKiBGaWxlIG1vZGFsLmpzXG4gKlxuICogRGVhbCB3aXRoIG11bHRpcGxlIG1vZGFscyBhbmQgdGhlaXIgbWVkaWEuXG4gKi9cbndpbmRvdy5sYXZhbmRlck1vZGFsID0ge307XG5cbiggZnVuY3Rpb24gKCB3aW5kb3csICQsIGFwcCApIHtcblx0Ly8gQ29uc3RydWN0b3IuXG5cdGFwcC5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdGFwcC5jYWNoZSgpO1xuXG5cdFx0aWYgKCBhcHAubWVldHNSZXF1aXJlbWVudHMoKSApIHtcblx0XHRcdGFwcC5iaW5kRXZlbnRzKCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIENhY2hlIGFsbCB0aGUgdGhpbmdzLlxuXHRhcHAuY2FjaGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YXBwLiRjID0ge1xuXHRcdFx0J2JvZHknOiAkKCAnYm9keScgKVxuXHRcdH07XG5cdH07XG5cblx0Ly8gRG8gd2UgbWVldCB0aGUgcmVxdWlyZW1lbnRzP1xuXHRhcHAubWVldHNSZXF1aXJlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuICQoICcubW9kYWwtdHJpZ2dlcicgKS5sZW5ndGg7XG5cdH07XG5cblx0Ly8gQ29tYmluZSBhbGwgZXZlbnRzLlxuXHRhcHAuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBUcmlnZ2VyIGEgbW9kYWwgdG8gb3Blbi5cblx0XHRhcHAuJGMuYm9keS5vbiggJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLm1vZGFsLXRyaWdnZXInLCBhcHAub3Blbk1vZGFsICk7XG5cblx0XHQvLyBUcmlnZ2VyIHRoZSBjbG9zZSBidXR0b24gdG8gY2xvc2UgdGhlIG1vZGFsLlxuXHRcdGFwcC4kYy5ib2R5Lm9uKCAnY2xpY2sgdG91Y2hzdGFydCcsICcuY2xvc2UnLCBhcHAuY2xvc2VNb2RhbCApO1xuXG5cdFx0Ly8gQWxsb3cgdGhlIHVzZXIgdG8gY2xvc2UgdGhlIG1vZGFsIGJ5IGhpdHRpbmcgdGhlIGVzYyBrZXkuXG5cdFx0YXBwLiRjLmJvZHkub24oICdrZXlkb3duJywgYXBwLmVzY0tleUNsb3NlICk7XG5cblx0XHQvLyBBbGxvdyB0aGUgdXNlciB0byBjbG9zZSB0aGUgbW9kYWwgYnkgY2xpY2tpbmcgb3V0c2lkZSBvZiB0aGUgbW9kYWwuXG5cdFx0YXBwLiRjLmJvZHkub24oICdjbGljayB0b3VjaHN0YXJ0JywgJ2Rpdi5tb2RhbC1vcGVuJywgYXBwLmNsb3NlTW9kYWxCeUNsaWNrICk7XG5cdH07XG5cblx0Ly8gT3BlbiB0aGUgbW9kYWwuXG5cdGFwcC5vcGVuTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gRmlndXJlIG91dCB3aGljaCBtb2RhbCB3ZSdyZSBvcGVuaW5nIGFuZCBzdG9yZSB0aGUgb2JqZWN0LlxuXHRcdHZhciAkbW9kYWwgPSAkKCAkKCB0aGlzICkuZGF0YSggJ3RhcmdldCcgKSApO1xuXG5cdFx0Ly8gRGlzcGxheSB0aGUgbW9kYWwuXG5cdFx0JG1vZGFsLmFkZENsYXNzKCAnbW9kYWwtb3BlbicgKTtcblxuXHRcdC8vIEFkZCBib2R5IGNsYXNzLlxuXHRcdGFwcC4kYy5ib2R5LmFkZENsYXNzKCAnbW9kYWwtb3BlbicgKTtcblx0fTtcblxuXHQvLyBDbG9zZSB0aGUgbW9kYWwuXG5cdGFwcC5jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuXHRcdC8vIEZpZ3VyZSB0aGUgb3BlbmVkIG1vZGFsIHdlJ3JlIGNsb3NpbmcgYW5kIHN0b3JlIHRoZSBvYmplY3QuXG5cdFx0dmFyICRtb2RhbCA9ICQoICQoICdkaXYubW9kYWwtb3BlbiAuY2xvc2UnICkuZGF0YSggJ3RhcmdldCcgKSApO1xuXG5cdFx0Ly8gRmluZCB0aGUgaWZyYW1lIGluIHRoZSAkbW9kYWwgb2JqZWN0LlxuXHRcdHZhciAkaWZyYW1lID0gJG1vZGFsLmZpbmQoICdpZnJhbWUnICk7XG5cblx0XHQvLyBHZXQgdGhlIGlmcmFtZSBzcmMgVVJMLlxuXHRcdHZhciB1cmwgPSAkaWZyYW1lLmF0dHIoICdzcmMnICk7XG5cblx0XHQvLyBSZW1vdmUgdGhlIHNvdXJjZSBVUkwsIHRoZW4gYWRkIGl0IGJhY2ssIHNvIHRoZSB2aWRlbyBjYW4gYmUgcGxheWVkIGFnYWluIGxhdGVyLlxuXHRcdCRpZnJhbWUuYXR0ciggJ3NyYycsICcnICkuYXR0ciggJ3NyYycsIHVybCApO1xuXG5cdFx0Ly8gRmluYWxseSwgaGlkZSB0aGUgbW9kYWwuXG5cdFx0JG1vZGFsLnJlbW92ZUNsYXNzKCAnbW9kYWwtb3BlbicgKTtcblxuXHRcdC8vIFJlbW92ZSB0aGUgYm9keSBjbGFzcy5cblx0XHRhcHAuJGMuYm9keS5yZW1vdmVDbGFzcyggJ21vZGFsLW9wZW4nICk7XG5cdH07XG5cblx0Ly8gQ2xvc2UgaWYgXCJlc2NcIiBrZXkgaXMgcHJlc3NlZC5cblx0YXBwLmVzY0tleUNsb3NlID0gZnVuY3Rpb24gKCBldmVudCApIHtcblx0XHRpZiAoIDI3ID09PSBldmVudC5rZXlDb2RlICkge1xuXHRcdFx0YXBwLmNsb3NlTW9kYWwoKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gQ2xvc2UgaWYgdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgdGhlIG1vZGFsXG5cdGFwcC5jbG9zZU1vZGFsQnlDbGljayA9IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cdFx0Ly8gSWYgdGhlIHBhcmVudCBjb250YWluZXIgaXMgTk9UIHRoZSBtb2RhbCBkaWFsb2cgY29udGFpbmVyLCBjbG9zZSB0aGUgbW9kYWxcblx0XHRpZiAoICEkKCBldmVudC50YXJnZXQgKS5wYXJlbnRzKCAnZGl2JyApLmhhc0NsYXNzKCAnbW9kYWwtZGlhbG9nJyApICkge1xuXHRcdFx0YXBwLmNsb3NlTW9kYWwoKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gRW5nYWdlIVxuXHQkKCBhcHAuaW5pdCApO1xufSApKCB3aW5kb3csIGpRdWVyeSwgd2luZG93LmxhdmFuZGVyTW9kYWwgKTtcbiIsIi8qKlxuICogRmlsZSBzZWFyY2guanNcbiAqXG4gKiBEZWFsIHdpdGggdGhlIHNlYXJjaCBmb3JtLlxuICovXG53aW5kb3cubGF2YW5kZXJTZWFyY2ggPSB7fTtcblxuKCBmdW5jdGlvbiAoIHdpbmRvdywgJCwgYXBwICkge1xuXHQvLyBDb25zdHJ1Y3Rvci5cblx0YXBwLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YXBwLmNhY2hlKCk7XG5cblx0XHRpZiAoIGFwcC5tZWV0c1JlcXVpcmVtZW50cygpICkge1xuXHRcdFx0YXBwLmJpbmRFdmVudHMoKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gQ2FjaGUgYWxsIHRoZSB0aGluZ3MuXG5cdGFwcC5jYWNoZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuJGMgPSB7XG5cdFx0XHQnYm9keSc6ICQoICdib2R5JyApXG5cdFx0fTtcblx0fTtcblxuXHQvLyBEbyB3ZSBtZWV0IHRoZSByZXF1aXJlbWVudHM/XG5cdGFwcC5tZWV0c1JlcXVpcmVtZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gJCggJy5zZWFyY2gtZmllbGQnICkubGVuZ3RoO1xuXHR9O1xuXG5cdC8vIENvbWJpbmUgYWxsIGV2ZW50cy5cblx0YXBwLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gUmVtb3ZlIHBsYWNlaG9sZGVyIHRleHQgZnJvbSBzZWFyY2ggZmllbGQgb24gZm9jdXMuXG5cdFx0YXBwLiRjLmJvZHkub24oICdmb2N1cycsICcuc2VhcmNoLWZpZWxkJywgYXBwLnJlbW92ZVBsYWNlaG9sZGVyVGV4dCApO1xuXG5cdFx0Ly8gQWRkIHBsYWNlaG9sZGVyIHRleHQgYmFjayB0byBzZWFyY2ggZmllbGQgb24gYmx1ci5cblx0XHRhcHAuJGMuYm9keS5vbiggJ2JsdXInLCAnLnNlYXJjaC1maWVsZCcsIGFwcC5hZGRQbGFjZWhvbGRlclRleHQgKTtcblx0fTtcblxuXHQvLyBSZW1vdmUgcGxhY2Vob2xkZXIgdGV4dCBmcm9tIHNlYXJjaCBmaWVsZC5cblx0YXBwLnJlbW92ZVBsYWNlaG9sZGVyVGV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgJHNlYXJjaF9maWVsZCA9ICQoIHRoaXMgKTtcblxuXHRcdCRzZWFyY2hfZmllbGQuZGF0YSggJ3BsYWNlaG9sZGVyJywgJHNlYXJjaF9maWVsZC5hdHRyKCAncGxhY2Vob2xkZXInICkgKS5hdHRyKCAncGxhY2Vob2xkZXInLCAnJyApO1xuXHR9O1xuXG5cdC8vIFJlcGxhY2UgcGxhY2Vob2xkZXIgdGV4dCBmcm9tIHNlYXJjaCBmaWVsZC5cblx0YXBwLmFkZFBsYWNlaG9sZGVyVGV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgJHNlYXJjaF9maWVsZCA9ICQoIHRoaXMgKTtcblxuXHRcdCRzZWFyY2hfZmllbGQuYXR0ciggJ3BsYWNlaG9sZGVyJywgJHNlYXJjaF9maWVsZC5kYXRhKCAncGxhY2Vob2xkZXInICkgKS5kYXRhKCAncGxhY2Vob2xkZXInLCAnJyApO1xuXHR9O1xuXG5cdC8vIEVuZ2FnZSFcblx0JCggYXBwLmluaXQgKTtcbn0gKSggd2luZG93LCBqUXVlcnksIHdpbmRvdy5sYXZhbmRlclNlYXJjaCApO1xuIiwiLyoqXG4gKiBGaWxlIHNraXAtbGluay1mb2N1cy1maXguanMuXG4gKlxuICogSGVscHMgd2l0aCBhY2Nlc3NpYmlsaXR5IGZvciBrZXlib2FyZCBvbmx5IHVzZXJzLlxuICpcbiAqIExlYXJuIG1vcmU6IGh0dHBzOi8vZ2l0LmlvL3ZXZHIyXG4gKi9cbiggZnVuY3Rpb24gKCkge1xuXHR2YXIgaXNXZWJraXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZiggJ3dlYmtpdCcgKSA+IC0xLFxuXHRcdGlzT3BlcmEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZiggJ29wZXJhJyApID4gLTEsXG5cdFx0aXNJZSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCAnbXNpZScgKSA+IC0xO1xuXG5cdGlmICggKCBpc1dlYmtpdCB8fCBpc09wZXJhIHx8IGlzSWUgKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgaWQgPSBsb2NhdGlvbi5oYXNoLnN1YnN0cmluZyggMSApLFxuXHRcdFx0XHRlbGVtZW50O1xuXG5cdFx0XHRpZiAoICEoIC9eW0EtejAtOV8tXSskLyApLnRlc3QoIGlkICkgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXG5cdFx0XHRpZiAoIGVsZW1lbnQgKSB7XG5cdFx0XHRcdGlmICggISggL14oPzphfHNlbGVjdHxpbnB1dHxidXR0b258dGV4dGFyZWEpJC9pICkudGVzdCggZWxlbWVudC50YWdOYW1lICkgKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC50YWJJbmRleCA9IC0xO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxlbWVudC5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH0sIGZhbHNlICk7XG5cdH1cbn0gKSgpO1xuIiwiLyoqXG4gKiBGaWxlIHdpbmRvdy1yZWFkeS5qc1xuICpcbiAqIEFkZCBhIFwicmVhZHlcIiBjbGFzcyB0byA8Ym9keT4gd2hlbiB3aW5kb3cgaXMgcmVhZHkuXG4gKi9cbndpbmRvdy5sYXZhbmRlcldpbmRvd1JlYWR5ID0ge307XG4oIGZ1bmN0aW9uICggd2luZG93LCAkLCBhcHAgKSB7XG5cdC8vIENvbnN0cnVjdG9yLlxuXHRhcHAuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuY2FjaGUoKTtcblx0XHRhcHAuYmluZEV2ZW50cygpO1xuXHR9O1xuXG5cdC8vIENhY2hlIGRvY3VtZW50IGVsZW1lbnRzLlxuXHRhcHAuY2FjaGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YXBwLiRjID0ge1xuXHRcdFx0J3dpbmRvdyc6ICQoIHdpbmRvdyApLFxuXHRcdFx0J2JvZHknOiAkKCBkb2N1bWVudC5ib2R5IClcblx0XHR9O1xuXHR9O1xuXG5cdC8vIENvbWJpbmUgYWxsIGV2ZW50cy5cblx0YXBwLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YXBwLiRjLndpbmRvdy5sb2FkKCBhcHAuYWRkQm9keUNsYXNzICk7XG5cdH07XG5cblx0Ly8gQWRkIGEgY2xhc3MgdG8gPGJvZHk+LlxuXHRhcHAuYWRkQm9keUNsYXNzID0gZnVuY3Rpb24gKCkge1xuXHRcdGFwcC4kYy5ib2R5LmFkZENsYXNzKCAncmVhZHknICk7XG5cdH07XG5cblx0Ly8gRW5nYWdlIVxuXHQkKCBhcHAuaW5pdCApO1xufSApKCB3aW5kb3csIGpRdWVyeSwgd2luZG93LmxhdmFuZGVyV2luZG93UmVhZHkgKTtcbiJdfQ==
