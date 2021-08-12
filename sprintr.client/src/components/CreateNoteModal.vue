<template>
  <div class="modal fade"
       id="create-note"
       tabindex="-1"
       role="dialog"
       aria-labelledby="create-note"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            New Note
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createdNote">
            <div class="form-group">
              <label class="pr-2" for="name">New Note</label>
              <input type="text"
                     id="name"
                     class="form-control"
                     placeholder="Add note..."
                     maxlength="100"
                     v-model="state.createdNote.name"
              >
            </div>
            <div>
              <button v-if="state.createdNote" type="submit" class="btn btn-primary mr-3">
                Save
              </button>
              <button type="button"
                      class="btn btn-secondary closeModal"
                      data-dismiss="modal"
                      @click="closeModal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
// import Pop from '../utils/Notifier'
// import { notesService } from '../services/NotesService'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'

export default {
  name: 'Component',
  setup() {
    // const router = useRouter()
    const state = reactive({
      createdNote: {},
      thisNote: computed(() => AppState.activeNote)
    })

    return {
      state
    //   async createdNote() {
    //     try {
    //       const id = await notesService.createNote(state.createdNote)
    //       state.createdNote = {}
    //       $('#create-note').modal('hide')
    //       router.push({ name: 'Note', params: { noteId: id } })
    //       Pop.toast('Created Note Successfully', 'success')
    //     } catch (error) {
    //       Pop.toast(error, 'error')
    //     }
    //   }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
