<template>
  <div class="modal fade"
       id="create-backlog-item"
       tabindex="-1"
       role="dialog"
       aria-labelledby="create-backlog-item"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            New Project
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createBacklogItem">
            <div class="form-group">
              <label class="pr-2" for="name">Project Name</label>
              <input type="text"
                     id="name"
                     class="form-control"
                     placeholder="Project Name..."
                     maxlength="30"
                     v-model="state.createBacklogItem.name"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="class">Description</label>
              <input type="text"
                     id="description"
                     class="form-control"
                     placeholder="Description..."
                     maxlength="25"
                     v-model="state.createBacklogItem.body"
              >
            </div>
            <div>
              <button v-if="state.createBacklogItem" type="submit" class="btn btn-primary mr-3">
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

import { backlogItemsService } from '../services/BacklogItemsService'
import { reactive, computed } from 'vue'
import {useRoute} from 'vue-router'
import {AppState} from '../AppState'

export default {
  name: 'Component',
  setup() {
    const route = useRoute()
    const state = reactive({
      projectId: route.params.projectId,
      createBacklogItem: {},
      thisProject: computed(()=> AppState.activeProject)
    })

    return {
      state,
      async createBacklogItem() {
        try {
          state.createBacklogItem['projectId'] = state.projectId
          console.log(state.createBacklogItem)
          let id = await backlogItemsService.createBacklogItem(state.createBacklogItem)
          state.createBacklogItem = {}
          $('#create-backlog-item').modal('hide')
          Pop.toast('Created Project Successfully', 'success')
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
