<template>
  <div class="row justify-content-between comp-thread py-5">
    <BacklogCard v-for="b in backlogItems" :key="b.id" :backlogItem="b" />
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'BacklogItemsThread',
  props: {
    backlogItems: {
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
