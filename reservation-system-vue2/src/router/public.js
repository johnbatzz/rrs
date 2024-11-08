export default [
    { 
        name: 'home',
        path: '/',
        component: () => import('@/views/Home')
    },
    {
        name: 'reservations',
        path: '/reservations',
        component: () => import('@/views/Reservations')
    },
]