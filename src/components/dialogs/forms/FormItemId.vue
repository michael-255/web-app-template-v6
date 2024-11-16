<script setup lang="ts">
import BaseFormItem from '@/components/dialogs/forms/BaseFormItem.vue'
import { useRecordStore } from '@/stores/record'

const recordStore = useRecordStore()
</script>

<template>
  <BaseFormItem
    label="Id"
    description="An auto generated value that uniquely identifies this record."
  >
    <q-item-label caption>
      {{ recordStore.record.id ?? '-' }}
    </q-item-label>
  </BaseFormItem>
</template>
