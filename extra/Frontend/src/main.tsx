import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient } from 'react-query'

import App from './App.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App queryClient={queryClient} />
  </React.StrictMode>,
)
