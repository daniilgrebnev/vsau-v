<?php

// Регистрация маршрута для получения записи по ID
function register_news_api_route()
{
	register_rest_route('abit/v1', '/news/', array(
		'methods' => 'GET',
		'callback' => 'get_news_by_id',
		'args' => array(
			'id' => array(
				'required' => true,
				'validate_callback' => function ($param, $request, $key) {
					return is_numeric($param);
				}
			),
		),
	));
}

add_action('rest_api_init', 'register_news_api_route');

// Регистрация маршрута для получения всех записей
function register_all_news_api_route()
{
	register_rest_route('abit/v1', '/news/all/', array(
		'methods' => 'GET',
		'callback' => 'get_all_news',
		'args' => array(
			'category' => array(
				'required' => false,
				'validate_callback' => function ($param, $request, $key) {
					return is_string($param);
				}
			),
		),
	));
}

add_action('rest_api_init', 'register_all_news_api_route');

// Функция для получения записи по ID
function get_news_by_id($data)
{
	$id = absint($data['id']);

	// Получаем пост типа 'post' по ID
	$post = get_post($id);

	if (!$post || $post->post_type !== 'post') {
		return new WP_Error('no_news_found', 'News not found', array('status' => 404));
	}

	// Получаем контент записи
	$content = apply_filters('the_content', $post->post_content);

	// Возвращаем ID, title и content
	return array(
		'id'      => $post->ID,
		'title'   => $post->post_title,
		'content' => $content,
	);
}

// Функция для получения всех записей с возможностью фильтрации по категории
function get_all_news($data)
{
	$args = array(
		'post_type'      => 'post', // Только записи типа 'post'
		'posts_per_page' => -1, // Получаем все посты
		'post_status'    => 'publish', // Только опубликованные
	);

	// Фильтрация по категории, если передан параметр
	if (isset($data['category']) && !empty($data['category'])) {
		$category_slug = sanitize_text_field($data['category']);

		// Получаем категорию по слагу
		$category = get_term_by('slug', $category_slug, 'category');

		if ($category) {
			// Добавляем фильтрацию по категории в запрос
			$args['cat'] = $category->term_id;
		} else {
			return new WP_Error('no_category_found', 'Category not found', array('status' => 404));
		}
	}

	// Выполняем запрос
	$query = new WP_Query($args);

	if ($query->have_posts()) {
		$news_items = [];

		while ($query->have_posts()) {
			$query->the_post();

			// Сохраняем только ID и title
			$news_items[] = array(
				'id'    => get_the_ID(),
				'title' => get_the_title(),
			);
		}

		// Восстанавливаем глобальный пост
		wp_reset_postdata();

		return $news_items;
	} else {
		return new WP_Error('no_news_found', 'No news found', array('status' => 404));
	}
}
