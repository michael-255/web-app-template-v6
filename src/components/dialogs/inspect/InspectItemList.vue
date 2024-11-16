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
    <ul v-if="property && property?.length > 0" class="q-pl-sm q-my-none">
      <li v-for="i in property" :key="i" class="q-ml-sm">
        {{ i }}
      </li>
    </ul>
    <div v-else>-</div>
  </BaseInspectItem>
</template>
