<template>
  <div class="row">
    <div class="col-md-6">
      Backlog Items:
    </div>
    <div class="col-md-6">
      <button class="btn btn-outline-primary" data-toggle="modal" data-target="#create-backlog-item" title="Create Project">Add Item</button>
    </div>
  </div>
  <BacklogItemsThread :backlogItems="backlogItems" />
  <CreateBacklogItemModal />
</template>


<script>
import { reactive, computed, onMounted } from 'vue'
import {useRoute} from 'vue-router'
import {AppState} from '../AppState'
import {projectsService} from '../services/ProjectsService'
import Pop from '../utils/Notifier'

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
    return{
      state,
      backlogItems: computed(()=>AppState.backlogItems),
      activeBacklog: computed(()=>AppState.activeBacklog),
      async getByProjectId(){
        try {
          await projectsService.getBacklogItemsByProjectId(state.projectId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
       async create(){
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