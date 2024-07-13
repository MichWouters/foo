import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Routing from './navigation/Routing'
import ThemeContextProvider from './context/themeContext.tsx'
import ColorPicker from './components/colorPicker.tsx'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: import.meta.env.PROD,
            useErrorBoundary: false,
            suspense: true,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <ThemeContextProvider>
                  <ColorPicker/>
                  <Routing></Routing>
              </ThemeContextProvider>
          </QueryClientProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
