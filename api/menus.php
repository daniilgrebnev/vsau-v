<?php

function get_custom_menu_by_name($request)
{
	$menu_name = $request['name'];
	$locations = get_nav_menu_locations();
	$menu = wp_get_nav_menu_object($menu_name);

	if (!$menu) {
		return new WP_Error('menu_not_found', 'Menu not found', array('status' => 404));
	}

	$menu_items = wp_get_nav_menu_items($menu->term_id);
	$menu_data = array();

	foreach ($menu_items as $item) {
		if ($item->object == 'page') {
			$page_id = $item->object_id;
			$page = get_post($page_id);
			$image = get_the_post_thumbnail_url($page_id, 'thumbnail');
			$menu_data[] = array(
				'id' => $page_id,
				'name' => $page->post_title,
				'image' => $image ? $image : '',
				'slug' => get_page_uri($page_id)
			);
		}
	}

	return rest_ensure_response($menu_data);
}

function register_custom_menu_endpoint()
{
	register_rest_route('abit/v1', '/menu/(?P<name>[a-zA-Z0-9-]+)', array(
		'methods' => 'GET',
		'callback' => 'get_custom_menu_by_name',
	));
}
add_action('rest_api_init', 'register_custom_menu_endpoint');


function get_page_html_by_id($request)
{
	$page_id = $request['id'];
	$page = get_post($page_id);

	if (!$page || $page->post_type != 'page') {
		return new WP_Error('page_not_found', 'Page not found', array('status' => 404));
	}

	$page_content = apply_filters('the_content', $page->post_content);
	return rest_ensure_response(array('html' => $page_content));
}

function register_page_html_endpoint()
{
	register_rest_route('abit/v1', '/page/(?P<id>\d+)/html', array(
		'methods' => 'GET',
		'callback' => 'get_page_html_by_id',
	));
}
add_action('rest_api_init', 'register_page_html_endpoint');
