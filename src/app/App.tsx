
import { useEffect } from 'react';
import { RouteGenerator } from '../routes/RouteGenerator';
import { useGetMenuQuery } from '../features/navigation/services/menuApi';
import { LoadingSpinner } from '../shared/components/ui';
import { useAppDispatch } from '../app/store';
import { setMenuItems } from '../features/navigation/slices/navigationSlice';

import { mockMenuData } from '../features/navigation/services/mockMenuData';


export const App = () => {
  const dispatch = useAppDispatch();
  const isDev = import.meta.env.MODE === 'development';

  console.log('isDev', isDev);

  const { isLoading, error, data } = useGetMenuQuery(undefined, {
    skip: isDev, // ✅ skip API entirely in dev
  });

  useEffect(() => {
    if (isDev) {
      console.log('Using mock menu data');
      dispatch(setMenuItems(mockMenuData));
    } else if (data) {
      dispatch(setMenuItems(data));
    } else if (error) {
      console.error('Menu API failed, falling back to mock');
      dispatch(setMenuItems(mockMenuData));
    }
  }, [data, error, isDev, dispatch]);

  // ✅ In dev, skip loading/error gates entirely
  if (!isDev) {
    if (isLoading) return <LoadingSpinner fullScreen />;
    if (error) return <div>Failed to load application</div>;
  }

  return <RouteGenerator />;
};