<?php
// Создание таблицы и установка значения table_id = 1 при активации темы
function abit_create_table_on_theme_activation()
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'abit_table';
	$charset_collate = $wpdb->get_charset_collate();

	// SQL-запрос для создания таблицы
	$sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id INT AUTO_INCREMENT PRIMARY KEY,
        table_id INT NOT NULL
    ) $charset_collate;";

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	dbDelta($sql);

	// Проверяем, есть ли уже запись
	$exists = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");

	// Если записи нет, добавляем table_id = 1
	if ($exists == 0) {
		$wpdb->insert($table_name, ['table_id' => 1]);
	}
}

// Хук срабатывает при активации темы
add_action('after_switch_theme', 'abit_create_table_on_theme_activation');

// Регистрация API маршрутов
add_action('rest_api_init', function () {
	// Получить table_id
	register_rest_route('abit/v1', '/table', [
		'methods'  => 'GET',
		'callback' => 'abit_get_table_id',
		'permission_callback' => '__return_true',
	]);

	// Изменить table_id
	register_rest_route('abit/v1', '/table', [
		'methods'  => 'POST',
		'callback' => 'abit_update_table_id',
		'permission_callback' => '__return_true',
	]);

	// Получить HTML таблицы TablePress по сохранённому table_id
	register_rest_route('abit/v1', '/table/html', [
		'methods'  => 'GET',
		'callback' => 'abit_get_tablepress_html',
		'permission_callback' => '__return_true',
	]);
});

// Функция для получения table_id
function abit_get_table_id(WP_REST_Request $request)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'abit_table';

	$result = $wpdb->get_var("SELECT table_id FROM $table_name LIMIT 1");

	if (!$result) {
		return new WP_Error('not_found', 'table_id не найден', ['status' => 404]);
	}

	return ['table_id' => intval($result)];
}

// Функция для обновления table_id
function abit_update_table_id(WP_REST_Request $request)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'abit_table';

	$params = $request->get_json_params();

	if (empty($params['table_id']) || !is_numeric($params['table_id'])) {
		return new WP_Error('invalid_data', 'Некорректный table_id', ['status' => 400]);
	}

	$table_id = intval($params['table_id']);

	// Проверяем, есть ли запись в базе
	$exists = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");

	if ($exists == 0) {
		// Если записи нет, создаём её
		$inserted = $wpdb->insert($table_name, ['table_id' => $table_id]);
		if ($inserted === false) {
			return new WP_Error('db_error', 'Ошибка создания записи', ['status' => 500]);
		}
		return ['message' => 'table_id создан', 'table_id' => $table_id];
	}

	// Обновляем существующую запись
	$updated = $wpdb->update($table_name, ['table_id' => $table_id], ['id' => 1]);

	if ($updated === false) {
		return new WP_Error('db_error', 'Ошибка обновления table_id', ['status' => 500]);
	}

	return ['message' => 'table_id обновлён', 'table_id' => $table_id];
}

// Функция для получения HTML таблицы TablePress по сохранённому table_id
function abit_get_tablepress_html(WP_REST_Request $request)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'abit_table';

	$table_id = $wpdb->get_var("SELECT table_id FROM $table_name LIMIT 1");

	if (!$table_id) {
		return new WP_Error('not_found', 'table_id не найден', ['status' => 404]);
	}



	$table_html = do_shortcode("[table id={$table_id} /]");

	if (empty($table_html)) {
		return new WP_Error('table_not_found', 'Таблица не найдена', ['status' => 404]);
	}

	return ['html' => $table_html];
}
