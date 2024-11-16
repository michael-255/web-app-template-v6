<script setup lang="ts">
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
    <div v-if="property === true" class="text-weight-bold text-positive">
      Yes
    </div>
    <div v-else-if="property === false" class="text-weight-bold text-negative">
      No
    </div>
    <div v-else>-</div>
  </BaseInspectItem>
</template>
