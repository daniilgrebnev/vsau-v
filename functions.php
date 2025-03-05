<?php

/**
 * abit functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package abit
 */




add_action('init', function () {
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
	header("Access-Control-Allow-Headers: Content-Type, Authorization");
});


if (! defined('_S_VERSION')) {
	// Replace the version number of the theme on each release.
	define('_S_VERSION', '1.0.0');
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function abit_setup()
{
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on abit, use a find and replace
		* to change 'abit' to the name of your theme in all the template files.
		*/
	load_theme_textdomain('abit', get_template_directory() . '/languages');

	// Add default posts and comments RSS feed links to head.
	add_theme_support('automatic-feed-links');

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support('title-tag');

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support('post-thumbnails');

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__('Primary', 'abit'),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'abit_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support('customize-selective-refresh-widgets');

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action('after_setup_theme', 'abit_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function abit_content_width()
{
	$GLOBALS['content_width'] = apply_filters('abit_content_width', 640);
}
add_action('after_setup_theme', 'abit_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function abit_widgets_init()
{
	register_sidebar(
		array(
			'name'          => esc_html__('Sidebar', 'abit'),
			'id'            => 'sidebar-1',
			'description'   => esc_html__('Add widgets here.', 'abit'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action('widgets_init', 'abit_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function abit_scripts()
{
	wp_enqueue_style('abit-style', get_stylesheet_uri(), array(), _S_VERSION);
	wp_style_add_data('abit-style', 'rtl', 'replace');

	wp_enqueue_script('abit-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true);

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'abit_scripts');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
	require get_template_directory() . '/inc/jetpack.php';
}

include get_template_directory() . '/api/api.php';
include get_template_directory() . '/api/faculties.php';
include get_template_directory() . '/api/admission.php';
include get_template_directory() . '/api/tablepress.php';
include get_template_directory() . '/api/email.php';
include get_template_directory() . '/api/menus.php';
function abit_add_admin_page()
{
	add_menu_page(
		'Основное', // Название вкладки
		'Основное',   // Название в меню
		'manage_options', // Права доступа (администраторы)
		'abit-admin-page', // Уникальный slug
		'abit_admin_page_content', // Функция отображения контента
		'dashicons-admin-generic', // Иконка (можно заменить)
		25 // Позиция в меню
	);
}
//df
add_action('admin_menu', 'abit_add_admin_page');

function abit_admin_page_content()
{
	$admin_page = get_template_directory() . '/admin/index.php';

	if (file_exists($admin_page)) {
		include $admin_page;
	} else {
		echo '<h2>Файл admin/index.php не найден</h2>';
	}
}


function serve_react_app($template)
{
	// Путь к вашему index.html в React-приложении
	$react_app_path = get_template_directory() . '/app/index.php';

	if (file_exists($react_app_path)) {
		return $react_app_path;
	}

	return $template;
}
add_filter('template_include', 'serve_react_app');
