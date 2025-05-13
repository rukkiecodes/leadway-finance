<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { ref, watch, computed } from 'vue'
import { userName } from '@/utils/fetchUserData' // adjust path if needed

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps<{
  data: {
    userId: string
    profit: number
    loss: number
  }[]
}>()

// Ref to hold mapped data with names
const enrichedData = ref<{ name: string; profit: number; loss: number }[]>([])

// Watch the prop and fetch names when it changes
watch(
  () => props.data,
  async (newData) => {
    const resolved = await Promise.all(
      newData.map(async (entry) => {
        const name = await userName(entry.userId)
        return {
          name,
          profit: entry.profit,
          loss: entry.loss,
        }
      })
    )
    enrichedData.value = resolved
  },
  { immediate: true }
)

const chartData = computed(() => ({
  labels: enrichedData.value.map(user => user.name),
  datasets: [
    {
      label: 'Profit',
      data: enrichedData.value.map(user => user.profit),
      backgroundColor: 'rgba(54, 162, 235, 0.7)', // Blue
    },
    {
      label: 'Loss',
      data: enrichedData.value.map(user => user.loss),
      backgroundColor: 'rgba(255, 99, 132, 0.7)', // Red
    },
  ],
}))

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}
</script>

<template>
  <div v-if="enrichedData.length">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
  <div v-else>
    Loading chart...
  </div>
</template>
