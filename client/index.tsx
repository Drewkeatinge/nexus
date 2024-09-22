import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import CsvUploader from './components/App.tsx'
import ProductPage from './components/ProductPage.tsx'

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<CsvUploader />} />
          <Route path="/product/:id" element={<ProductPage/>} />
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
})
