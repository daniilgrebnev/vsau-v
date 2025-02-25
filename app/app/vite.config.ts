import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import postcssUrl from 'postcss-url'
import { defineConfig } from 'vite'

export default defineConfig({
	// Все пути будут относительными
	base: './',
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		// Отключаем разделение CSS, чтобы все стили оказались в одном файле
		cssCodeSplit: false,
		outDir: '../',
		assetsDir: 'assets',
		rollupOptions: {
			output: {
				entryFileNames: 'index.js', // Основной JS-файл
				chunkFileNames: '[name].js', // Чанки без хеша
				assetFileNames: assetInfo => {
					// Если это CSS, выводим его в корень с именем style.css
					if (assetInfo.name && assetInfo.name.endsWith('.css')) {
						return 'style.css'
					}
					// Для остальных ассетов используем папку assets
					return 'assets/[name][extname]'
				},
			},
		},
	},
	css: {
		postcss: {
			plugins: [
				postcssUrl({
					url: 'inline', // Инлайн ресурсов, если необходимо
				}),
			],
		},
	},
})
