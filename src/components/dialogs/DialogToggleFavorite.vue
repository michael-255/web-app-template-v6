<script setup lang="ts">
import { favoriteOffIcon, favoriteOnIcon } from '@/shared/icons'
import type { IdType, ServiceType } from '@/shared/types'
import { useRecordStore } from '@/stores/record'
import useLogger from '@/use/useLogger'
import { extend, useDialogPluginComponent, useQuasar } from 'quasar'
import { computed, onMounted } from 'vue'
import type { z } from 'zod'

const props = defineProps<{
  id: IdType
  service: ServiceType
}>()

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()

const $q = useQuasar()
const { log } = useLogger()
const recordStore = useRecordStore()

const action = computed(() =>
  recordStore.favoritedStatus ? 'Unfavorite' : 'Favorite',
)
const message = computed(
  () =>
    `Do you want to ${action.value.toLocaleLowerCase()} ${recordStore.record.name}?`,
)
const icon = computed(() =>
  recordStore.favoritedStatus ? favoriteOffIcon : favoriteOnIcon,
)

onMounted(async () => {
  try {
    recordStore.record = await props.service.getRecord(props.id)
  } catch (error) {
    log.error('Error loading record', error as Error)
  }
})

async function onToggleFavorite() {
  const recordDeepCopy = extend(true, {}, recordStore.record) as z.infer<
    typeof props.service.modelSchema
  >

  try {
    $q.loading.show()
    await props.service.toggleFavorite(recordDeepCopy)
    log.info(`${action.value}d ${recordDeepCopy.name}`, recordDeepCopy)
  } catch (error) {
    log.error(`${action.value} failed`, error as Error)
  } finally {
    $q.loading.hide()
    onDialogOK() // Close the dialog at this point
  }
}
</script>

<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-on:keyup.enter="onToggleFavorite"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="bg-info text-white q-pt-sm q-pb-xs">
        <q-icon :name="icon" size="sm" class="q-pb-sm q-mr-md" />
        <span class="text-h6">{{ action }}</span>
      </q-card-section>

      <q-card-section class="q-mt-lg">{{ message }}</q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" @click="onDialogCancel" />
        <q-btn flat label="Confirm" color="info" @click="onToggleFavorite" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
