<?php
add_action('rest_api_init', function () {
	register_rest_route('abit/v1', '/faculties', [
		'methods' => WP_REST_Server::CREATABLE,
		'callback' => 'abit_create_faculty',
		'permission_callback' => '__return_true',
	]);

	register_rest_route('abit/v1', '/faculties', [
		'methods' => WP_REST_Server::READABLE,
		'callback' => 'abit_get_all_faculties',
		'permission_callback' => '__return_true',
	]);

	register_rest_route('abit/v1', '/faculties/(?P<id>\d+)', [
		'methods' => WP_REST_Server::READABLE,
		'callback' => 'abit_get_faculty',
		'permission_callback' => '__return_true',
	]);

	register_rest_route('abit/v1', '/faculties/(?P<id>\d+)', [
		'methods' => WP_REST_Server::EDITABLE,
		'callback' => 'abit_update_faculty',
		'permission_callback' => '__return_true',
	]);

	register_rest_route('abit/v1', '/faculties/(?P<id>\d+)', [
		'methods' => WP_REST_Server::DELETABLE,
		'callback' => 'abit_delete_faculty',
		'permission_callback' => '__return_true',
	]);

	register_rest_route('abit/v1', '/faculties/(?P<id>\d+)/move', [
		'methods' => WP_REST_Server::EDITABLE,
		'callback' => 'abit_move_faculty',
		'permission_callback' => '__return_true',
	]);
});

function abit_create_faculty($request)
{
	$params = $request->get_json_params();
	$post_id = wp_insert_post([
		'post_type'   => 'faculty',
		'post_status' => 'publish',
		'post_title'  => $params['faculty'],
		'menu_order'  => isset($params['order']) ? intval($params['order']) : 0
	]);

	if (is_wp_error($post_id)) {
		return new WP_Error('create_error', 'Failed to create faculty', ['status' => 500]);
	}

	foreach ($params as $key => $value) {
		update_post_meta($post_id, $key, sanitize_text_field($value));
	}

	return ['id' => $post_id, 'message' => 'Faculty created successfully'];
}

function abit_get_all_faculties($request)
{
	$faculties = get_posts([
		'post_type'   => 'faculty',
		'post_status' => 'publish',
		'numberposts' => -1,
		'orderby'     => 'menu_order',
		'order'       => 'ASC'
	]);

	$result = [];
	foreach ($faculties as $faculty) {
		$result[] = [
			'id' => $faculty->ID,
			'faculty' => $faculty->post_title,
			'teacher' => get_post_meta($faculty->ID, 'teacher', true),
			'teacher_position' => get_post_meta($faculty->ID, 'teacher_position', true),
			'vk_link' => get_post_meta($faculty->ID, 'vk_link', true),
			'tel1' => get_post_meta($faculty->ID, 'tel1', true),
			'tel2' => get_post_meta($faculty->ID, 'tel2', true),
			'tel3' => get_post_meta($faculty->ID, 'tel3', true),
			'order' => $faculty->menu_order
		];
	}

	return $result;
}

function abit_get_faculty($request)
{
	$post_id = $request['id'];
	$post = get_post($post_id);

	if (!$post || $post->post_type !== 'faculty') {
		return new WP_Error('not_found', 'Faculty not found', ['status' => 404]);
	}

	return [
		'faculty' => get_the_title($post_id),
		'teacher' => get_post_meta($post_id, 'teacher', true),
		'teacher_position' => get_post_meta($post_id, 'teacher_position', true),
		'vk_link' => get_post_meta($post_id, 'vk_link', true),
		'tel1' => get_post_meta($post_id, 'tel1', true),
		'tel2' => get_post_meta($post_id, 'tel2', true),
		'tel3' => get_post_meta($post_id, 'tel3', true),
		'order' => get_post_field('menu_order', $post_id)
	];
}

function abit_update_faculty($request)
{
	$post_id = $request['id'];
	$params = $request->get_json_params();

	if (!get_post($post_id) || get_post_type($post_id) !== 'faculty') {
		return new WP_Error('not_found', 'Faculty not found', ['status' => 404]);
	}

	// Обновление заголовка (названия факультета)
	if (isset($params['faculty'])) {
		wp_update_post([
			'ID'         => $post_id,
			'post_title' => sanitize_text_field($params['faculty'])
		]);
	}

	foreach ($params as $key => $value) {
		if ($key !== 'faculty') {
			update_post_meta($post_id, $key, sanitize_text_field($value));
		}
	}

	if (isset($params['order'])) {
		wp_update_post(['ID' => $post_id, 'menu_order' => intval($params['order'])]);
	}

	return ['message' => 'Faculty updated successfully'];
}


function abit_delete_faculty($request)
{
	$post_id = $request['id'];

	if (!get_post($post_id) || get_post_type($post_id) !== 'faculty') {
		return new WP_Error('not_found', 'Faculty not found', ['status' => 404]);
	}

	wp_delete_post($post_id, true);

	return ['message' => 'Faculty deleted successfully'];
}

function abit_move_faculty($request)
{
	$post_id = $request['id'];
	$direction = $request->get_param('direction');

	$post = get_post($post_id);
	if (!$post || $post->post_type !== 'faculty') {
		return new WP_Error('not_found', 'Faculty not found', ['status' => 404]);
	}

	$current_order = $post->menu_order;
	$new_order = ($direction === 'up') ? $current_order - 1 : $current_order + 1;

	wp_update_post(['ID' => $post_id, 'menu_order' => $new_order]);

	return ['message' => 'Faculty moved successfully', 'new_order' => $new_order];
}
