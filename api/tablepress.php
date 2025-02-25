<?php

/**
 * Плагин для хранения table_id и API
 * 
 * Plugin Name: Abit Table API
 * Description: API для хранения и работы с table_id из TablePress
 * Version: 1.0
 * Author: Developer
 */

if (!defined('ABSPATH')) {
	exit; // Запрещаем прямой доступ
}

// Хук для создания таблицы при активации плагина
register_activation_hook(__FILE__, 'abit_create_table');

function abit_create_table()
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'abit_table';

	$charset_collate = $wpdb->get_charset_collate();

	$sql = "CREATE TABLE $table_name (
        id INT AUTO_INCREMENT PRIMARY KEY,
        table_id INT NOT NULL
    ) $charset_collate;";

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	dbDelta($sql);

	// Добавляем начальное значение, если оно не существует
	$wpdb->insert($table_name, ['table_id' => 1]);
}

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

	// Получить HTML таблицу TablePress по сохранённому table_id
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
	$updated = $wpdb->update($table_name, ['table_id' => $table_id], ['id' => 1]);

	if ($updated === false) {
		return new WP_Error('db_error', 'Ошибка обновления', ['status' => 500]);
	}

	return ['message' => 'table_id обновлён', 'table_id' => $table_id];
}

// Функция для получения HTML таблицы по сохранённому table_id
function abit_get_tablepress_html(WP_REST_Request $request)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'abit_table';

	$table_id = $wpdb->get_var("SELECT table_id FROM $table_name LIMIT 1");

	if (!$table_id) {
		return new WP_Error('not_found', 'table_id не найден', ['status' => 404]);
	}

	if (!shortcode_exists('tablepress')) {
		return new WP_Error('tablepress_not_found', 'TablePress не установлен', ['status' => 400]);
	}

	$table_html = do_shortcode("[tablepress id={$table_id} /]");

	if (empty($table_html)) {
		return new WP_Error('table_not_found', 'Таблица не найдена', ['status' => 404]);
	}

	return ['html' => $table_html];
}
