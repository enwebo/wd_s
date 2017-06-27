<?php
/**
 * Custom scripts and styles.
 *
 * @package Lavander
 */

/**
 * Register Google font.
 *
 * @link http://themeshaper.com/2014/08/13/how-to-add-google-fonts-to-wordpress-themes/
 */
function lavander_font_url() {

	$fonts_url = '';

	/**
	 * Translators: If there are characters in your language that are not
	 * supported by the following, translate this to 'off'. Do not translate
	 * into your own language.
	 */
	$roboto = _x( 'on', 'Raleway font: on or off', 'lavander' );
	$pt_sans = _x( 'on', 'PT Sans font: on or off', 'lavander' );

	if ( 'off' !== $roboto || 'off' !== $pt_sans ) {
		$font_families = array();

		if ( 'off' !== $roboto ) {
			$font_families[] = 'Raleway:400,600,700,800,900';
		}

		if ( 'off' !== $pt_sans ) {
			$font_families[] = 'PT Sans:400,300,700';
		}

		$query_args = array(
			'family' => urlencode( implode( '|', $font_families ) ),
		);

		$fonts_url = add_query_arg( $query_args, '//fonts.googleapis.com/css' );
	}

	return $fonts_url;
}

/**
 * Enqueue scripts and styles.
 */
function lavander_scripts() {
	/**
	 * If WP is in script debug, or we pass ?script_debug in a URL - set debug to true.
	 */
	$debug = ( defined( 'SCRIPT_DEBUG' ) && true === SCRIPT_DEBUG ) || ( isset( $_GET['script_debug'] ) ) ? true : false;

	/**
	 * If we are debugging the site, use a unique version every page load so as to ensure no cache issues.
	 */
	$version = '1.0.0';

	/**
	 * Should we load minified files?
	 */
	$suffix = ( true === $debug ) ? '' : '.min';

	// Register styles.
	wp_register_style( 'lavander-google-font', lavander_font_url(), array(), null );

	// Enqueue styles.
	wp_enqueue_style( 'lavander-google-font' );
	wp_enqueue_style( 'lavander-style', get_stylesheet_directory_uri() . '/style' . $suffix . '.css', array(), $version );

	if ( class_exists( 'LoginWithAjax' ) ) {
		wp_enqueue_style( 'lavander-login-with-ajax', get_template_directory_uri() . '/assets/css/login-with-ajax' . $suffix . '.css', array(), $version );
	}

	// Enqueue scripts.
	wp_enqueue_script( 'lavander-scripts', get_template_directory_uri() . '/assets/scripts/project' . $suffix . '.js', array( 'jquery' ), $version, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	// Enqueue the mobile nav script
	// Since we're showing/hiding based on CSS and wp_is_mobile is wp_is_imperfect, enqueue this everywhere.
	// wp_enqueue_script( 'lavander-mobile-nav', get_template_directory_uri() . '/assets/scripts/mobile-nav-menu' . $suffix . '.js', array( 'jquery' ), $version, true );
}
add_action( 'wp_enqueue_scripts', 'lavander_scripts' );

/**
 * Add SVG definitions to footer.
 */
function lavander_include_svg_icons() {

	// Define SVG sprite file.
	$svg_icons = get_template_directory() . '/assets/images/svg-icons.svg';

	// If it exists, include it.
	if ( file_exists( $svg_icons ) ) {
		require_once( $svg_icons );
	}
}
add_action( 'wp_footer', 'lavander_include_svg_icons', 9999 );
