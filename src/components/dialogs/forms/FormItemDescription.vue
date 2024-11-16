<script setup lang="ts">
import BaseFormItem from '@/components/dialogs/forms/BaseFormItem.vue'
import { LimitEnum } from '@/shared/enums'
import { cancelIcon } from '@/shared/icons'
import { textAreaSchema } from '@/shared/schemas'
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
    label="Description"
    description="Optional description for this record."
  >
    <q-item-label>
      <q-input
        v-model="recordStore.record.desc"
        @blur="recordStore.record.desc = recordStore.record.desc?.trim()"
        :rules="[
          (val: string) =>
            textAreaSchema.safeParse(val).success ||
            `Description cannot exceed ${LimitEnum.MAX_TEXT_AREA} characters`,
        ]"
        :maxlength="LimitEnum.MAX_TEXT_AREA"
        :disable="isDisabled"
        type="textarea"
        lazy-rules
        autogrow
        counter
        dense
        outlined
        color="primary"
      >
        <template v-slot:append>
          <q-icon
            v-if="recordStore.record.desc !== ''"
            @click="recordStore.record.desc = ''"
            class="cursor-pointer"
            :name="cancelIcon"
          />
        </template>
      </q-input>
    </q-item-label>
  </BaseFormItem>
</template>
