<template>
  <div class="col-12 bg-white d-flex">
    <img :src="account.picture" :alt="account.name">
    <div>{{ account.name }} says:</div>
    <div class="mx-3">
      {{ note.body }}
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // const router = useRouter()
    const state = reactive({
      createdNote: {}
    })

    return {
      state,
      account: computed(() => AppState.account)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
