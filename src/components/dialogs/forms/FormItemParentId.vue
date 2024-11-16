<script setup lang="ts">
import BaseFormItem from '@/components/dialogs/forms/BaseFormItem.vue'
import { idSchema } from '@/shared/schemas'
import type { ServiceType } from '@/shared/types'
import { useRecordStore } from '@/stores/record'
import useLogger from '@/use/useLogger'
import { useQuasar } from 'quasar'
import { computed, onMounted, ref, type Ref } from 'vue'

const props = defineProps<{
  parentService: ServiceType
}>()

const $q = useQuasar()
const { log } = useLogger()
const recordStore = useRecordStore()

const isDisabled = computed(
  () => $q.loading.isActive || recordStore.lockedStatus,
)
const options: Ref<{ value: string; label: string; disable: boolean }[]> = ref(
  [],
)

onMounted(async () => {
  try {
    // Get Parent record options for the child record to select
    options.value = await props.parentService.getSelectOptions()
    // Check if the selected parentId is in the options
    const parentIdMatch = options.value.some(
      (i) => i.value === recordStore.record.parentId,
    )

    if (!parentIdMatch) {
      recordStore.record.parentId = undefined! // If no options, or id is invalid
    }
  } catch (error) {
    log.error('Error loading Parent Example Id options', error as Error)
  }
})
</script>

<template>
  <BaseFormItem
    label="Parent Example Id"
    description="Id of the parent record that this child record is associated with."
  >
    <q-item-label caption>
      <q-select
        v-model="recordStore.record.parentId"
        :rules="[
          (val: string) => idSchema.safeParse(val).success || 'Required',
        ]"
        :disable="isDisabled"
        :options="options"
        lazy-rules
        emit-value
        map-options
        options-dense
        dense
        outlined
        color="primary"
      />
    </q-item-label>
  </BaseFormItem>
</template>
