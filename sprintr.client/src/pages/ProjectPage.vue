<template>
  <aside class="bg-dark w-25 mr-4">
    <div class="row flex-column justify-content-center pt-4">
      <div class="col-12 pl-5 pr-0">
        <router-link :to="{name: 'Project.Backlog'}">
          <h4 class="glowing">
            Backlog
          </h4>
        </router-link>
      </div>
      <div class="col-12 pl-5 pr-0">
        <router-link :to="{name: 'Project.Settings'}">
          <h4 class="glowing">
            Settings
          </h4>
        </router-link>
      </div>
      <div class="col-12 pl-5 pr-0">
        <h4 class="glowing" v-for="(value, key) in sprints" :key="key">
          <router-link :to="{name: 'Project.Sprint', params: {sprintId: value.id}}">
            {{ value.name }}
          </router-link>
        </h4>
      </div>
      <div class="col-12 pl-5 glowing pr-0">
        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#create-sprint" title="Create New Sprint">
          Add Sprint
        </button>
      </div>
    </div>

    <CreateSprintModal />
  </aside>

  <div class="container-fluid">
    <router-view />
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { projectsService } from '../services/ProjectsService'
import { tasksService } from '../services/TasksService'

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
        let sprints = AppState.sprints
        sprints.forEach(element => {
          tasksService.getTasksBySprintId(element.id)
        });
        
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      activeProject: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      async getSprints(id){
        try {
          await tasksService.getTasksBySprintId(id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .glowing:hover {
//   text-shadow: 0 0 2px black, 0 0 5px whitesmoke,
//     0 0 5px whitesmoke;
//   cursor: pointer;
// }

</style>
