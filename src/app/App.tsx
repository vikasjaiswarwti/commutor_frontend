
import { useEffect } from 'react';
import { RouteGenerator } from '../routes/RouteGenerator';
import { useGetMenuQuery } from '../features/navigation/services/menuApi';
import { LoadingSpinner } from '../shared/components/ui';
import { useAppDispatch } from '../app/store';
import { setMenuItems } from '../features/navigation/slices/navigationSlice';

import { mockMenuData } from '../features/navigation/services/mockMenuData';

export const App = () => {

  const dispatch = useAppDispatch();
  const { isLoading, error, refetch, data } = useGetMenuQuery(undefined, {
    skip: false, // Set to true if you want to skip API calls entirely
  });

  // Use import.meta.env.MODE instead of process.env.NODE_ENV
  const isDev = import.meta.env.MODE === 'development';

  useEffect(() => {
    // If API fails or we're in development, use mock data
    if (error || isDev) {
      console.log('Using mock menu data');
      dispatch(setMenuItems(mockMenuData));
    } else if (data) {
      dispatch(setMenuItems(data));
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    // Only refetch if not in development mode
    if (isDev) {
      refetch();
    }
  }, [refetch]);

  if (error && !isDev) {
    return <div>Failed to load application</div>;
  }

  if (isLoading && !isDev) {
    return <LoadingSpinner fullScreen />;
  }

  return <RouteGenerator />;
};