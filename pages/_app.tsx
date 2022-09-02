import type { AppProps } from "next/app"
import { QueryClient } from "react-query"
import { QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
