import LayoutMenu from '@/layouts/LayoutMenu.vue'
import { RouteNameEnum } from '@/shared/enums'
import { tableSchema } from '@/shared/schemas'
import PageDashboardExamples from '@/views/ViewDashboardExamples.vue'
import PageTable from '@/views/ViewTable.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Dashboard components are more unique and will likely need dedicated routes
    {
      path: '/',
      redirect: `/examples-dashboard`, // Your default route
      name: RouteNameEnum.MENU_LAYOUT,
      component: LayoutMenu, // Must use a different layout for other primary routes
      children: [
        {
          path: '/examples-dashboard',
          name: RouteNameEnum.EXAMPLES_DASHBOARD,
          component: PageDashboardExamples,
        },
        {
          path: '/settings',
          name: RouteNameEnum.SETTINGS,
          component: () => import('@/views/ViewSettings.vue'),
        },
        {
          path: '/about',
          name: RouteNameEnum.ABOUT,
          component: () => import('@/views/ViewAbout.vue'),
        },
        {
          path: '/donate',
          name: RouteNameEnum.DONATE,
          component: () => import('@/views/ViewDonate.vue'),
        },
        {
          path: '/:pathMatch(.*)*', // 404 Not Found. Part of default route path.
          name: RouteNameEnum.NOT_FOUND,
          component: () => import('@/views/ViewNotFound.vue'),
        },
      ],
    },
    // Table routes are fullscreen and have no layout
    {
      path: '/:table/table',
      name: RouteNameEnum.TABLE,
      component: PageTable,
      beforeEnter: (to: any, _: any, next: Function) => {
        const routeTable = to.params.table
        const isRouteTable = tableSchema.safeParse(routeTable).success

        if (!isRouteTable) {
          return next({
            name: RouteNameEnum.NOT_FOUND,
          })
        }
        return next()
      },
    },
  ],
})

export default router
