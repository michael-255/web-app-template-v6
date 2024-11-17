<script setup lang="ts">
import DashboardCard from '@/components/dashboard/DashboardCard.vue'
import DashboardEmptyMessage from '@/components/dashboard/DashboardEmptyMessage.vue'
import PageFabMenu from '@/components/page/PageFabMenu.vue'
import PageHeading from '@/components/page/PageHeading.vue'
import PageResponsive from '@/components/page/PageResponsive.vue'
import { ExampleResultSI } from '@/services/ExampleResultService'
import { ExampleSI } from '@/services/ExampleService'
import { appName } from '@/shared/constants'
import { RouteNameEnum, StatusEnum, TableEnum } from '@/shared/enums'
import { addIcon, examplesPageIcon } from '@/shared/icons'
import type { ExampleType } from '@/shared/types'
import useLiveQuery from '@/use/useLiveQuery'
import { useMeta, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

useMeta({ title: `${appName} - Examples Dashboard` })

const $q = useQuasar()
const router = useRouter()
const { isLiveQueryFinished, liveData } = useLiveQuery<ExampleType>(
  ExampleSI,
  'liveDashboard',
)
</script>

<template>
  <PageResponsive>
    <PageFabMenu
      :isLoading="$q.loading.isActive"
      :subButtons="[
        {
          label: 'Examples Data',
          color: 'primary',
          icon: ExampleSI.tableIcon,
          handleClick: () =>
            router.push({
              name: RouteNameEnum.TABLE,
              params: { table: TableEnum.EXAMPLES },
            }),
        },
        {
          label: 'Example Results Data',
          color: 'primary',
          icon: ExampleResultSI.tableIcon,
          handleClick: () =>
            router.push({
              name: RouteNameEnum.TABLE,
              params: { table: TableEnum.EXAMPLE_RESULTS },
            }),
        },
        {
          label: 'Create Example',
          color: 'positive',
          icon: addIcon,
          handleClick: () => $q.dialog(ExampleSI.createDialogOptions()),
        },
      ]"
    />

    <PageHeading :headingIcon="examplesPageIcon" headingTitle="Examples" />

    <q-list padding>
      <DashboardEmptyMessage
        v-if="isLiveQueryFinished && liveData.length === 0"
        :title="`No Examples Found`"
        :messages="[
          'If this is your first time using the app, try creating a new Example below.',
          'Don\'t see an Example that you created? Make sure it does not have the hidden status.',
        ]"
        buttonLabel="Create Example"
        buttonColor="positive"
        @onEmptyAction="() => $q.dialog(ExampleSI.createDialogOptions())"
      />

      <q-item v-for="example in liveData" :key="example.id">
        <q-item-section>
          <DashboardCard
            :recordName="example?.name"
            :recordDesc="example?.desc"
            :recordLastChildCreatedAt="example?.lastChild?.createdAt"
            :recordLastChildNote="example?.lastChild?.note"
            :isLoading="$q.loading.isActive"
            :hasLastChild="!!example?.lastChild"
            :hasLockedStatus="example.status.includes(StatusEnum.LOCKED)"
            :hasFavoriteStatus="example.status.includes(StatusEnum.FAVORITED)"
            :supportsCharts="ExampleSI.supportsCharts"
            :supportsInspect="ExampleSI.supportsInspect"
            :supportsEdit="ExampleSI.supportsEdit"
            :supportsDelete="ExampleSI.supportsDelete"
            @onCharts="
              () => $q.dialog(ExampleSI.chartsDialogOptions(example.id))
            "
            @onInspect="
              () => $q.dialog(ExampleSI.inspectDialogOptions(example.id))
            "
            @onEdit="() => $q.dialog(ExampleSI.editDialogOptions(example.id))"
            @onDelete="
              () => $q.dialog(ExampleSI.deleteDialogOptions(example.id))
            "
            @onFavorite="
              () => $q.dialog(ExampleSI.toggleFavoriteDialogOptions(example.id))
            "
            @onAddEntry="
              () => $q.dialog(ExampleResultSI.createDialogOptions(example.id))
            "
          />
        </q-item-section>
      </q-item>
    </q-list>
  </PageResponsive>
</template>
