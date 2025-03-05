import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './layout/Layout'

import { Contacts } from './pages/Contacts/Contacts'
import { Documents } from './pages/Documents/Documents'
import { Faculties } from './pages/Faculties/Faculties'
import { Main } from './pages/Main/Main'
import { Page } from './pages/Page/Page'
import { Programs } from './pages/Programs/Programs'
import { Reception } from './pages/Reception/Reception'
import { Single } from './pages/Single/Single'

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route index element={<Main />} />
					<Route path={`/faculties`} element={<Faculties />} />
					<Route path={`/reception`} element={<Reception />} />
					<Route path={`/documents`} element={<Documents />} />
					<Route path={`/contacts`} element={<Contacts />} />
					<Route path={`/programs`} element={<Programs />} />
					<Route path={`/post/:id`} element={<Single />} />
					<Route path={`/page/:id`} element={<Page />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	)
}

export default App
