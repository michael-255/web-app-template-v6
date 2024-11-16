<script setup lang="ts">
import { compactDateFromMs } from '@/shared/utils'
import { useRecordStore } from '@/stores/record'
import { computed } from 'vue'
import BaseInspectItem from './BaseInspectItem.vue'

const props = defineProps<{
  label: string
  recordKey: string
}>()

const recordStore = useRecordStore()

const property = computed(() => recordStore.record[props.recordKey])
</script>

<template>
  <BaseInspectItem :label="label">
    <div v-if="property">
      {{ compactDateFromMs(property) }}
    </div>
    <div v-else>-</div>
  </BaseInspectItem>
</template>
