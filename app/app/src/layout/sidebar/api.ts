import axios from 'axios'
import { ISidebarMenuItem } from './interface'

export const sidebarItems = () => {
	return axios
		.get('https://www.vsau.ru/wp-json/api/v1/menu1')
		.then(response => {
			return response.data as ISidebarMenuItem[]
		})
		.catch(error => {
			console.log(error)
		})
}
