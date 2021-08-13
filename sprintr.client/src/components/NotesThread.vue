<template>
  <h3 class="text-center">Notes:</h3>
  <div class="row justify-content-center pt-2 pb-4">
    <NoteCard v-for="n in note" :key="n.id" :note="n" />
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'NotesThread',
  props: {
    note: {
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
