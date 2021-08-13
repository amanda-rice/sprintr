<template>
  <div class="modal fade"
       :id="'create-note'+ task.id"
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
          <form @submit.prevent="createNote">
            <div class="form-group">
              <label class="pr-2" for="body">New Note</label>
              <input type="text"
                     id="body"
                     class="form-control"
                     placeholder="Add note..."
                     maxlength="100"
                     required
                     v-model="state.createdNote.body"
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
import $ from 'jquery'
import Pop from '../utils/Notifier'
import { notesService } from '../services/NotesService'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'

export default {
  props: {
    task: {
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
      async createNote() {
        try {
          state.createdNote.taskId = props.task.id
          await notesService.create(state.createdNote)
          state.createdNote = {}
          $(`#create-note${props.task.id}`).modal('hide')
          Pop.toast('Created Note Successfully', 'success')
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
