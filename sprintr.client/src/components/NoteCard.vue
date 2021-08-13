<template>
  <div class="col-11 py-4 mt-3 bg-white d-flex shadow">
    <div class="row">
      <div class="col-12 d-flex justify-content-between">
        <div class="d-flex">
          <img :src="account.picture"
          :alt="account.name"
          height="50"
          class="rounded-circle"
          >
          <h5 class="d-flex align-self-center pl-1">
            {{ account.name }} :
          </h5>
        </div>
        <div class="">
          <i class="fa text-right hoverable fa-trash text-secondary pl-4" aria-hidden="true" title="Delete Note" @click="destroy"></i>
        </div>
      </div>
      <div class="col-12 py-2">
        <div class="mx-3 d-flex align-self-center">
          {{ note.body }}
        </div>
        </div>

    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { notesService } from '../services/NotesService'

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
      account: computed(() => AppState.account),
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await notesService.destroy(props.note.id, props.note.taskId)
            Pop.toast('Deleted Note Successfully', 'success')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
