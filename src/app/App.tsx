import { useEffect } from 'react'
import { RouteGenerator } from '@/routes/RouteGenerator'
import { useGetMenuQuery } from '@/features/navigation/services/menuApi'
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner'

export const App = () => {
  const { isLoading, error, refetch } = useGetMenuQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  if (error) {
    return <div>Failed to load application</div>
  }

  if (isLoading) {
    return <LoadingSpinner fullScreen />
  }

  return <RouteGenerator />
}