import { QueryClient, QueryClientProvider } from 'react-query'
import { Index } from './pages';

interface AppDependencies {
  queryClient: QueryClient;
}

function App({ queryClient }: AppDependencies) {

  return (
    <QueryClientProvider client={queryClient}>
      <Index />
    </QueryClientProvider>
  )
}

export default App
