<template>
  <BacklogCard />
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
      activeBacklog: computed(()=>AppState.activeBacklog),
      async getByProjectId(){
        try {
          await projectsService.getBacklogItemsByProjectId(state.projectId)
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