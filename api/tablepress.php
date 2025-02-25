<?php
// Регистрация API маршрутов
add_action('rest_api_init', function () {
	// Получение HTML таблицы TablePress по ID (POST)
	register_rest_route('abit', '/table/(?P<id>\d+)', [
		'methods'  => 'POST',
		'callback' => 'get_tablepress_html',
		'args'     => ['id' => ['required' => true, 'validate_callback' => 'is_numeric']],
		'permission_callback' => '__return_true',
	]);
});

// Функция получения HTML таблицы TablePress
function get_tablepress_html(WP_REST_Request $request)
{
	$table_id = $request->get_param('id');

	if (!shortcode_exists('tablepress')) {
		return new WP_Error('tablepress_not_found', 'TablePress не установлен', ['status' => 400]);
	}

	$table_html = do_shortcode("[tablepress id={$table_id} /]");

	if (empty($table_html)) {
		return new WP_Error('table_not_found', 'Таблица не найдена', ['status' => 404]);
	}

	return ['html' => $table_html];
}
