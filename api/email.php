<?php
// Добавляем хук для проверки и создания таблицы при загрузке темы
add_action('init', 'check_and_create_abit_table');

function check_and_create_abit_table()
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'abit_emails';

	// Проверяем, существует ли таблица
	if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
		// Если таблица не существует, создаем её
		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            email varchar(100) NOT NULL,
            abit_email varchar(100) NOT NULL,
            abit_fio varchar(100) NOT NULL,
            abit_text text NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY (id)
        ) $charset_collate;";

		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);
	}
}

// Регистрируем REST API endpoint
add_action('rest_api_init', function () {
	register_rest_route('abit/v1', '/email', array(
		'methods' => 'POST',
		'callback' => 'handle_abit_email',
		'permission_callback' => '__return_true'
	));
});

function handle_abit_email(WP_REST_Request $request)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'abit_emails';

	$email = sanitize_email($request->get_param('email'));
	$abit_email = sanitize_email($request->get_param('abit_email'));
	$abit_fio = sanitize_text_field($request->get_param('abit_fio'));
	$abit_text = sanitize_textarea_field($request->get_param('abit_text'));

	if (empty($email) || empty($abit_email) || empty($abit_fio) || empty($abit_text)) {
		return new WP_Error('missing_fields', 'Все поля обязательны для заполнения', array('status' => 400));
	}

	$result = $wpdb->insert($table_name, array(
		'email' => $email,
		'abit_email' => $abit_email,
		'abit_fio' => $abit_fio,
		'abit_text' => $abit_text
	));

	if ($result === false) {
		error_log('Database error: ' . $wpdb->last_error);
		return new WP_Error('db_error', 'Ошибка при сохранении данных: ' . $wpdb->last_error, array('status' => 500));
	}

	$id = $wpdb->insert_id;

	if ($id) {
		$subject = "Обращение абитуриента №$id";
		$message = "Дата и время: " . current_time('mysql') . "\n";
		$message .= "Почта абитуриента: $abit_email\n";
		$message .= "ФИО абитуриента: $abit_fio\n";
		$message .= "Текст обращения абитуриента: $abit_text\n";

		wp_mail($email, $subject, $message);

		return new WP_REST_Response(array('message' => 'Обращение успешно отправлено', 'id' => $id), 200);
	} else {
		return new WP_Error('db_error', 'Ошибка при сохранении данных', array('status' => 500));
	}
}

// Регистрируем GET endpoint для получения данных
add_action('rest_api_init', function () {
	register_rest_route('abit/v1', '/email', array(
		'methods' => 'GET',
		'callback' => 'get_abit_emails',
		'permission_callback' => '__return_true'
	));
});

function get_abit_emails()
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'abit_emails';

	$results = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");

	if ($results) {
		return new WP_REST_Response($results, 200);
	} else {
		return new WP_Error('no_data', 'Данные не найдены', array('status' => 404));
	}
}
