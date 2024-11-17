import { ExampleResultSI } from '@/services/ExampleResultService'
import { ExampleSI } from '@/services/ExampleService'
import { LogSI } from '@/services/LogService'
import { SettingSI } from '@/services/SettingService'
import { RouteNameEnum, TableEnum } from '@/shared/enums'
import type { ServiceType } from '@/shared/types'
import useLogger from '@/use/useLogger'
import { useRoute, useRouter } from 'vue-router'

/**
 * Provides some routing utilities and access to the current route Service if any.
 */
export default function useRouting() {
  // Do NOT return route or router from any composable due to performance issues
  const route = useRoute()
  const router = useRouter()
  const { log } = useLogger()

  // Current table used by the route is any
  const routeTable = Array.isArray(route.params.table)
    ? route.params.table[0]
    : route.params.table

  // Service associated with the current route table if any
  let routeService: ServiceType = null!

  switch (routeTable) {
    case TableEnum.SETTINGS:
      routeService = SettingSI
      break
    case TableEnum.LOGS:
      routeService = LogSI
      break
    case TableEnum.EXAMPLES:
      routeService = ExampleSI
      break
    case TableEnum.EXAMPLE_RESULTS:
      routeService = ExampleResultSI
      break
  }

  /**
   * Go to the specified data table route.
   */
  function goToTable(table: TableEnum) {
    try {
      router.push({
        name: RouteNameEnum.TABLE,
        params: { table },
      })
    } catch (error) {
      log.error('Error accessing Table route', error as Error)
    }
  }

  /**
   * Go back if previous route state is part of the app history, otherwise go to root path.
   */
  function goBack() {
    try {
      if (router?.options?.history?.state?.back) {
        router.back()
      } else {
        router.push('/')
      }
    } catch (error) {
      log.error('Error accessing previous route', error as Error)
    }
  }

  return {
    routeTable,
    routeService,
    goToTable,
    goBack,
  }
}
