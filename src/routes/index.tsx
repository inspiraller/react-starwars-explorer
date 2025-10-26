import { JSX, lazy, LazyExoticComponent } from 'react';

interface IRoutes {
  path: string;
  element: LazyExoticComponent<() => JSX.Element | null>;
  children?: IRoutes[];
  authRedirect?: boolean;
  protected?: boolean;
}

export const AppRoutes: IRoutes[] = [
  {
    path: '/',
    element: lazy(() => import('@/pages/Home')),
  },
  {
    path: '/people',
    element: lazy(() => import('@/pages/People')),
  },
  {
    path: '/starships',
    element: lazy(() => import('@/pages/Starships')),
  },
  {
    path: '/vehicles',
    element: lazy(() => import('@/pages/Vehicles')),
  },
  {
    path: '/species',
    element: lazy(() => import('@/pages/Species')),
  },
  {
    path: '/films',
    element: lazy(() => import('@/pages/Films')),
  },
  {
    path: '/planets',
    element: lazy(() => import('@/pages/Planets')),
  },
];
