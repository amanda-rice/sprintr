<template>
  <div class="modal fade"
       id="create-sprint"
       tabindex="-1"
       role="dialog"
       aria-labelledby="create-sprint"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            New Sprint
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createSprint">
            <div class="form-group">
              <label class="pr-2" for="name">Sprint Name</label>
              <input type="text"
                     id="name"
                     class="form-control"
                     placeholder="Sprint Name..."
                     maxlength="30"
                     v-model="state.createSprint.name"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="class">Start Date</label>
              <input type="date"
                     id="start-date"
                     class="form-control"
                     placeholder="Start Date..."
                     v-model="state.createSprint.startDate"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="class">End Date</label>
              <input type="date"
                     id="end-date"
                     class="form-control"
                     placeholder="End Date..."
                     v-model="state.createSprint.endDate"
              >
            </div>
            <div>
              <button v-if="state.createSprint" type="submit" class="btn btn-primary mr-3">
                Save
              </button>
              <button type="button" class="btn btn-secondary closeModal" data-dismiss="modal" @click="closeModal">
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
import { projectsService } from '../services/ProjectsService'

import { sprintsService } from '../services/SprintsService'
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'

export default {
  name: 'Component',
  setup() {
    const route = useRoute()
    const state = reactive({
      projectId: route.params.projectId,
      createSprint: {},
      thisProject: computed(() => AppState.activeProject)
    })

    return {
      state,
      async createSprint() {
        try {
          state.createSprint.projectId = state.projectId
          const id = await sprintsService.createSprint(state.createSprint)
          state.createSprint = {}
          $('#create-sprint').modal('hide')
          Pop.toast('Created Sprint Successfully', 'success')
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
