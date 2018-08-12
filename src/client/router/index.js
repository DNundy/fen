import index from '@/components/index/index'
import personal from '@/components/index/personal'
import collect from '@/components/index/collect'
import tips from '@/components/index/tips'

export default [
    {
        path: '/',
        name: 'Index',
        component: index
    },
    {
        path: '/tips',
        name: 'Tips',
        component: tips
    },
    {
        path: '/personal',
        name: 'Personal',
        component: personal
    },
    {
        path: '/collect',
        name: 'collect',
        component: collect
    },
    {
        path: '*',
        component: index
    }
]
