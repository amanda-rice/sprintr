<template>
  <aside>
      <router-link :to="{name: 'Project.Backlog'}">
            Backlog
      </router-link>
        <router-link :to="{name: 'Project.Settings'}">
            Settings
      </router-link>
      <p v-for="(value, key) in sprints" :key="key">
            <router-link :to="{name: 'Project.Sprint', params: {id: value.id}}">
              {{ value.name }}
            </router-link>
          </p> 
          <button class="btn btn-outline-primary" data-toggle="modal" data-target="#create-sprint" title="Create New Sprint">Add Sprint</button>
          <CreateSprintModal/>
    </aside>
    
    <div class="container-fluid">
      <router-view />
    </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import {useRoute} from 'vue-router'
import {AppState} from '../AppState'
import Pop from '../utils/Notifier'
import { projectsService } from '../services/ProjectsService'

export default {
  name: 'Component',
  setup() {
    const route = useRoute()
    const state = reactive({
      projectId: route.params.projectId
    })
    onMounted(async() => {
    try {
      await projectsService.getSprintsByProjectId(state.projectId)
    } catch (error) {
      Pop.toast(error, 'error')
    }
  })
    return{
      state,
      activeProject: computed(()=>AppState.activeProject),
      sprints: computed(()=>AppState.sprints)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
