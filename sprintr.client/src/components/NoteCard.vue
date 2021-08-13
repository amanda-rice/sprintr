<template>
  <div class="col-12 py-2 bg-white d-flex">
    <img :src="account.picture"
         :alt="account.name"
         height="50"
         class="rounded-circle"
    >
    <h5 class="d-flex align-self-center">
      {{ account.name }} :
    </h5>
    <div class="mx-3 d-flex align-self-center">
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
