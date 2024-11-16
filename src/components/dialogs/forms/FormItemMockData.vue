<script setup lang="ts">
import BaseFormItem from '@/components/dialogs/forms/BaseFormItem.vue'
import { mockDataSchema } from '@/shared/schemas'
import { useRecordStore } from '@/stores/record'
import { useQuasar } from 'quasar'
import { computed } from 'vue'

const $q = useQuasar()
const recordStore = useRecordStore()

const isDisabled = computed(
  () => $q.loading.isActive || recordStore.lockedStatus,
)
</script>

<template>
  <BaseFormItem
    label="Mock Data"
    description="Positive or negative number value that represents mock data for charts."
  >
    <q-item-label caption>
      <q-input
        v-model.number="recordStore.record.mockData"
        :rules="[
          (val: number) => mockDataSchema.safeParse(val).success || 'Required',
        ]"
        :disable="isDisabled"
        type="number"
        lazy-rules
        dense
        outlined
        color="primary"
      />
    </q-item-label>
  </BaseFormItem>
</template>
