<script setup lang="ts">
import BaseFormItem from '@/components/dialogs/forms/BaseFormItem.vue'
import { StatusEnum } from '@/shared/enums'
import type { StatusType } from '@/shared/types'
import { useRecordStore } from '@/stores/record'
import { useQuasar } from 'quasar'
import { computed } from 'vue'

const $q = useQuasar()
const recordStore = useRecordStore()

const isDisabled = computed(
  () => $q.loading.isActive || recordStore.lockedStatus,
)

// LOCKED status is handled by the app and is not user-editable
const hidden = computedStatus(StatusEnum.HIDDEN, () => recordStore.hiddenStatus)
const favorited = computedStatus(
  StatusEnum.FAVORITED,
  () => recordStore.favoritedStatus,
)

/**
 * Helper function to create a computed property that sets the status of a record. This might need
 * to be extracted out into a composable or utility function in the future.
 */
function computedStatus(targetStatus: StatusType, statusGetter: () => boolean) {
  return computed({
    get: statusGetter,
    set: (bool: boolean) => {
      if (!recordStore.record.status) {
        recordStore.record.status = []
      }
      const index = recordStore.record.status.indexOf(targetStatus)
      if (bool && index === -1) {
        recordStore.record.status.push(targetStatus)
      } else if (!bool && index !== -1) {
        recordStore.record.status.splice(index, 1)
      }
    },
  })
}
</script>

<template>
  <BaseFormItem
    label="Status"
    description="Options that determine how the app treats this record in certain circumstances."
  >
    <q-item-label>
      <q-list padding>
        <q-item :disable="isDisabled" tag="label">
          <q-item-section top>
            <q-item-label>Hidden</q-item-label>
            <q-item-label caption>
              Record is hidden and only selectable in the data table.
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-toggle :disable="isDisabled" v-model="hidden" size="lg" />
          </q-item-section>
        </q-item>

        <q-item :disable="isDisabled" tag="label">
          <q-item-section top>
            <q-item-label>Favorited</q-item-label>
            <q-item-label caption>
              Record is given priority sorting.
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-toggle :disable="isDisabled" v-model="favorited" size="lg" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-item-label>
  </BaseFormItem>
</template>
