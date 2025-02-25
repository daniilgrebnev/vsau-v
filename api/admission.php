<?PHP

add_action('rest_api_init', function () {
	register_rest_route('abit/v1', '/admission', [
		'methods' => WP_REST_Server::CREATABLE,
		'callback' => 'abit_create_admission',
		'permission_callback' => '__return_true',
	]);

	register_rest_route('abit/v1', '/admission', [
		'methods' => WP_REST_Server::READABLE,
		'callback' => 'abit_get_all_admissions',
		'permission_callback' => '__return_true',
	]);

	register_rest_route('abit/v1', '/admission/(?P<id>\d+)', [
		'methods' => WP_REST_Server::EDITABLE,
		'callback' => 'abit_update_admission',
		'permission_callback' => '__return_true',
	]);

	register_rest_route('abit/v1', '/admission/(?P<id>\d+)', [
		'methods' => WP_REST_Server::DELETABLE,
		'callback' => 'abit_delete_admission',
		'permission_callback' => '__return_true',
	]);

	register_rest_route('abit/v1', '/admission/bulk_update', [
		'methods' => WP_REST_Server::EDITABLE,
		'callback' => 'abit_bulk_update_admissions',
		'permission_callback' => '__return_true',
	]);
});

function abit_create_admission($request)
{
	$params = $request->get_json_params();
	$post_id = wp_insert_post([
		'post_type'   => 'admission',
		'post_status' => 'publish',
		'post_title'  => sanitize_text_field($params['name']),
		// Можно задать menu_order, если нужно
		'menu_order'  => 0,
	]);

	if (is_wp_error($post_id)) {
		return new WP_Error('create_error', 'Failed to create admission', ['status' => 500]);
	}

	update_post_meta($post_id, 'link', sanitize_text_field($params['link']));

	return ['id' => $post_id, 'name' => $params['name'], 'link' => $params['link']];
}

function abit_get_all_admissions($request)
{
	$posts = get_posts([
		'post_type'   => 'admission',
		'orderby'     => 'menu_order',
		'order'       => 'ASC',
		'numberposts' => -1,
	]);

	$result = array_map(function ($post) {
		return [
			'id'   => $post->ID,
			'name' => get_the_title($post->ID),
			'link' => get_post_meta($post->ID, 'link', true)
		];
	}, $posts);

	return $result;
}

function abit_update_admission($request)
{
	$post_id = $request['id'];
	$params = $request->get_json_params();

	if (!get_post($post_id) || get_post_type($post_id) !== 'admission') {
		return new WP_Error('not_found', 'Admission not found', ['status' => 404]);
	}

	wp_update_post([
		'ID'         => $post_id,
		'post_title' => sanitize_text_field($params['name'])
	]);

	update_post_meta($post_id, 'link', sanitize_text_field($params['link']));

	return ['id' => $post_id, 'name' => $params['name'], 'link' => $params['link']];
}

function abit_delete_admission($request)
{
	$post_id = $request['id'];

	if (!get_post($post_id) || get_post_type($post_id) !== 'admission') {
		return new WP_Error('not_found', 'Admission not found', ['status' => 404]);
	}

	wp_delete_post($post_id, true);

	return ['message' => 'Admission deleted successfully'];
}

function abit_bulk_update_admissions($request)
{
	$params = $request->get_json_params();

	if (!is_array($params)) {
		return new WP_Error('invalid_data', 'Invalid data format', ['status' => 400]);
	}

	$updated_admissions = [];

	// Используем индекс массива для установки menu_order
	foreach ($params as $index => $item) {
		if (
			!isset($item['id'], $item['name'], $item['link']) ||
			!get_post($item['id']) ||
			get_post_type($item['id']) !== 'admission'
		) {
			return new WP_Error('invalid_entry', 'Invalid admission entry', ['status' => 400]);
		}

		wp_update_post([
			'ID'         => $item['id'],
			'post_title' => sanitize_text_field($item['name']),
			'menu_order' => $index,
		]);

		update_post_meta($item['id'], 'link', sanitize_text_field($item['link']));

		$updated_admissions[] = [
			'id'   => $item['id'],
			'name' => $item['name'],
			'link' => $item['link']
		];
	}

	return $updated_admissions;
}
