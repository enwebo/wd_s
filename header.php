<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Lavander
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<?php
	// @codingStandardsIgnoreStart
	global $is_IE;
	if ( $is_IE ) :
	// @codingStandardsIgnoreEnd ?>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<?php endif; ?>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<?php wp_site_icon(); ?>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'lavander' ); ?></a>

	<header class="site-header">
		<div class="wrap">
			<div class="header-content">

				<div class="site-actions">
					<?php lavander_display_lwa_forms(); ?>
				</div>

				<div class="site-logo">
					<?php lavander_display_logo(); ?>
				</div>

				<div class="site-branding">
					<?php if ( is_front_page() && is_home() ) : ?>
						<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
					<?php else : ?>
						<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
					<?php endif;

					$description = get_bloginfo( 'description', 'display' ); ?>
					<?php if ( $description || is_customize_preview() ) : ?>
						<p class="site-description"><?php echo $description; // WPCS: xss ok. ?></p>
					<?php endif; ?>
				</div><!-- .site-branding -->

				<nav id="site-navigation" class="main-navigation">
					<div class="menu-btn">
						<div class="menu-title"><?php esc_html_e( 'Menu', 'lavander' ) ?></div>
						<div class="menu-icon">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					<?php
						wp_nav_menu( array(
							'theme_location' => 'primary',
							'menu_id'        => 'primary-menu',
							'menu_class'     => 'menu dropdown center',
						) );
					?>
				</nav><!-- #site-navigation -->

				<div class="site-socials header-socials">
					<?php echo lavander_get_social_network_links(); ?>
				</div><!-- .site-socials -->

			</div><!-- .header-content -->

			<div class="header-image">
				<?php lavander_get_header_image(); ?>
			</div><!-- .header-image -->

		</div><!-- .wrap -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
