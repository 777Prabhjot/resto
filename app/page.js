'use client'
import Dishs from '@/components/Dishs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

export default function Home() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Dishs />
      </QueryClientProvider>
    </>
  )
}
