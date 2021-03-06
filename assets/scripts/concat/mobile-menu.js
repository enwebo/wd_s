/**
 * File: mobile-menu.js
 *
 * Create an accordion style dropdown.
 */
window.wdsMobileMenu = {};
( function( window, $, app ) {

	// Constructor.
	app.init = function() {
		app.cache();

		if ( app.meetsRequirements() ) {
			app.bindEvents();
		}
	};

	// Cache all the things.
	app.cache = function() {
		app.$c = {
			window: $( window ),
			subMenuContainer: $( '.mobile-menu .sub-menu' ),
			subMenuParentItem: $( '.mobile-menu li.menu-item-has-children' ),
			offCanvasContainer: $( '.off-canvas-container' )
		};
	};

	// Combine all events.
	app.bindEvents = function() {
		app.$c.window.on( 'load', app.addDownArrow );
		app.$c.subMenuParentItem.on( 'click', app.toggleSubmenu );
		app.$c.subMenuParentItem.on( 'transitionend', app.resetSubMenu );
		app.$c.offCanvasContainer.on( 'transitionend', app.forceCloseSubmenus );
	};

	// Do we meet the requirements?
	app.meetsRequirements = function() {
		return app.$c.subMenuContainer.length;
	};

	// Reset the submenus after it's done closing.
	app.resetSubMenu = function( e ) {
		const $target = $( e.target );

		// When the list item is done transitioning in height,
		// remove the classes from the submenu so it is ready to toggle again.
		if ( $target.is( 'li.menu-item-has-children' ) && ! $target.hasClass( 'is-visible' ) ) {
			$target.find( 'ul.sub-menu' ).removeClass( 'slideOutLeft is-visible' );
		}

	};

	// Slide out the submenu items.
	app.slideOutSubMenus = function() {
		app.$c.subMenuContainer.each( function() {

			// Only try to close submenus that are actually open.
			if ( $( this ).hasClass( 'slideInLeft' ) ) {

				// Close the parent list item, and set the corresponding button aria to false.
				$( this ).parent().removeClass( 'is-visible' ).find( '.parent-indicator' ).attr( 'aria-expanded', false );

				// Slide out the submenu.
				$( this ).removeClass( 'slideInLeft' ).addClass( 'slideOutLeft' );
			}

		});
	};

	// Add the down arrow to submenu parents.
	app.addDownArrow = function() {
		app.$c.subMenuParentItem.prepend( '<button type="button" aria-expanded="false" class="parent-indicator" aria-label="Open submenu"><span class="down-arrow"></span></button>' );
	};

	// Deal with the submenu.
	app.toggleSubmenu = function( e ) {

		let el = $( this ), // The menu element which was clicked on.
			subMenu = el.children( 'ul.sub-menu' ), // The nearest submenu.
			$target = $( e.target ); // the element that's actually being clicked (child of the li that triggered the click event).

		// Figure out if we're clicking the button or its arrow child,
		// if so, we can just open or close the menu and bail.
		if ( $target.hasClass( 'down-arrow' ) || $target.hasClass( 'parent-indicator' ) ) {

			// First, collapse any already opened submenus.
			app.slideOutSubMenus();

			if ( ! subMenu.hasClass( 'is-visible' ) ) {

				// Open the submenu.
				app.openSubmenu( el, subMenu );

			}

			return false;
		}

	};

	// Open a submenu.
	app.openSubmenu = function( parent, subMenu ) {

		// Expand the list menu item, and set the corresponding button aria to true.
		parent.addClass( 'is-visible' ).find( '.parent-indicator' ).attr( 'aria-expanded', true );

		// Slide the menu in.
		subMenu.addClass( 'is-visible animated slideInLeft' );

	};

	// Force close all the submenus when the main menu container is closed.
	app.forceCloseSubmenus = function() {

		// The transitionend event triggers on open and on close, need to make sure we only do this on close.
		if ( ! $( this ).hasClass( 'is-visible' ) ) {
			app.$c.subMenuParentItem.removeClass( 'is-visible' ).find( '.parent-indicator' ).attr( 'aria-expanded', false );
			app.$c.subMenuContainer.removeClass( 'is-visible slideInLeft' );
		}

	};

	// Engage!
	$( app.init );

})( window, jQuery, window.wdsMobileMenu );
