<template>
  <div class="row">
    <div class="col-md-6">
      <h1>Backlog</h1>
    </div>
    <div class="col-md-6 mt-3">
      <button class="btn btn-info text-white" data-toggle="modal" data-target="#create-backlog-item" title="Create Project">
        + Add Item
      </button>
    </div>
  </div>
  <BacklogItemsThread :backlog-items="backlogItems" />
  <CreateBacklogItemModal />
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'
import { backlogItemsService } from '../services/BacklogItemsService'

export default {
  name: 'Component',
  setup() {
    const route = useRoute()
    const state = reactive({
      projectId: route.params.projectId
    })
    onMounted(async() => {
      try {
        await projectsService.getBacklogItemsByProjectId(state.projectId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      backlogItems: computed(() => AppState.backlogItems),
      activeBacklog: computed(() => AppState.activeBacklog),
      async getByProjectId() {
        try {
          await projectsService.getBacklogItemsByProjectId(state.projectId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async create() {
        try {
          await backlogItemsService.createBacklogItem(state.backlogItemId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
