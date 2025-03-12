import axios from 'axios'

const baseURL = 'https://www.vsau.ru/wp-json/abit/v1'

const api = axios.create({
	baseURL,
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

export interface IMenuItem {
	id: string
	name: string
	image: string
	slug: string
}
export const getMenu = async ({
	menuName,
}: {
	menuName: string
}): Promise<IMenuItem[] | null> => {
	return api
		.get(`/menu/${menuName}`)
		.then(res => {
			return res.data as IMenuItem[]
		})
		.catch(err => {
			console.log(err)
			return null
		})
}
export const getPage = async ({ id }: { id: string }) => {
	return api
		.get(`/page/${id}/html`)
		.then(res => {
			return res.data as HTMLCollection
		})
		.catch(err => {
			console.log(err)
			return null
		})
}
