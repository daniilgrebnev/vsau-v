import axios from 'axios'

const localBaseUrl = 'http://localhost/abit/wp-json/abit/v1'
const baseURL = 'http://verba.gurgurich.ru/wp-json/abit/v1'

const webState = process.env.NODE_ENV

const api = axios.create({
	baseURL: webState === 'development' ? localBaseUrl : baseURL,
})

export const getByCategory = async (category: string) => {
	return api
		.get(`/news/all?category=${category}`)
		.then(res => {
			return res.data
		})
		.catch(err => {
			console.log(err)
			return null
		})
}
export const getPostContent = async (id: number) => {
	return api
		.get(`/news?id=${id}`)
		.then(res => {
			return res.data
		})
		.catch(err => {
			console.log(err)
			return null
		})
}
export const getFaculties = async () => {
	return api
		.get(`/faculties`)
		.then(res => {
			return res.data
		})
		.catch(err => {
			console.log(err)
			return null
		})
}
export const getAdmissions = async () => {
	return api
		.get(`/admission`)
		.then(res => {
			return res.data
		})
		.catch(err => {
			console.log(err)
			return null
		})
}
export const getNews = async () => {
	return axios
		.get(`https://www.vsau.ru/wp-json/abit/v1/posts`)
		.then(res => {
			return res.data
		})
		.catch(err => {
			console.log(err)
			return null
		})
}
export const getProgramsTable = async () => {
	return api
		.get(`/table/html`)
		.then(res => {
			return res.data
		})
		.catch(err => {
			console.log(err)
			return null
		})
}
