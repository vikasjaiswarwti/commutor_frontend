import { useMemo, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import { staticRoutes } from './config/routeConfig'
import { generateDynamicRoutes } from './utils/routeUtils'

import { featureModules } from './utils/featureModules'

import { useNavigation } from '../features/navigation/hooks/useNavigation'
import { LoadingSpinner } from '../shared/components/ui/LoadingSpinner'

export const RouteGenerator = () => {

    const { menuItems } = useNavigation()

    const dynamicRoutes = useMemo(() => {
        if (!menuItems) return []
        return generateDynamicRoutes(menuItems, featureModules)
    }, [menuItems])

    const routes = [...staticRoutes, ...dynamicRoutes];

    console.log('routes from route generator', routes);

    const element = useRoutes(routes);

    return (
        <Suspense fallback={<LoadingSpinner />}>
            {element}
        </Suspense>
    )
}