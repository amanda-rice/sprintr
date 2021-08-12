<template>
  <div class="row justify-content-between py-5">
    <TaskCard v-for="t in tasks" :key="t.id" :task="t" />
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'TasksThread',
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style>
.comp-thread{
  background-color: lavender;
  box-shadow: 1px 1px 15px darkslategray;
}
</style>
