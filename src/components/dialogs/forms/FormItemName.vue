<script setup lang="ts">
import BaseFormItem from '@/components/dialogs/forms/BaseFormItem.vue'
import { LimitEnum } from '@/shared/enums'
import { cancelIcon } from '@/shared/icons'
import { textLineSchema } from '@/shared/schemas'
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
  <BaseFormItem label="Name" description="Customizable name for this record.">
    <q-item-label>
      <q-input
        v-model="recordStore.record.name"
        @blur="recordStore.record.name = recordStore.record.name?.trim()"
        :rules="[
          (val: string) =>
            textLineSchema.safeParse(val).success ||
            `Name must be between 1 and ${LimitEnum.MAX_TEXT_LINE} characters`,
        ]"
        :maxlength="LimitEnum.MAX_TEXT_LINE"
        :disable="isDisabled"
        type="text"
        lazy-rules
        counter
        dense
        outlined
        color="primary"
      >
        <template v-slot:append>
          <q-icon
            v-if="recordStore.record.name !== ''"
            @click="recordStore.record.name = ''"
            class="cursor-pointer"
            :name="cancelIcon"
          />
        </template>
      </q-input>
    </q-item-label>
  </BaseFormItem>
</template>
