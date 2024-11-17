import type { ServiceType } from '@/shared/types'
import useLogger from '@/use/useLogger'
import { onUnmounted, ref, type Ref } from 'vue'

/**
 * Provides a reactive Dexie live query that updates when the underlying data changes.
 */
export default function useLiveQuery<T>(
  service: ServiceType,
  methodName: 'liveDashboard' | 'liveTable',
) {
  const { log } = useLogger()

  const liveData: Ref<T[]> = ref([])
  const isLiveQueryFinished = ref(false)

  const subscription = service[methodName]<T>().subscribe({
    next: (data) => {
      liveData.value = data
      isLiveQueryFinished.value = true
    },
    error: (error) => {
      log.error(
        `Error loading live ${service.labelPlural} data`,
        error as Error,
      )
      isLiveQueryFinished.value = true
    },
  })

  onUnmounted(() => {
    subscription.unsubscribe()
  })

  return { isLiveQueryFinished, liveData }
}
