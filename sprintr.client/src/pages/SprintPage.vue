<template>
  <div class="row">
    <div class="col-md-6">
      <h1>{{thisSprint.name}}</h1>
      <h2>Task Weight: {{completed}}</h2>
    </div>
    <div class="col-12">
      <TaskSprintThread :tasks="tasks" />
    </div>
  </div>
</template>


<script>
import { reactive, computed, onMounted } from 'vue'
import {useRoute} from 'vue-router'
import {AppState} from '../AppState'
import {projectsService} from '../services/ProjectsService'
import {sprintsService} from '../services/SprintsService'
import {tasksService} from '../services/TasksService'
import Pop from '../utils/Notifier'

export default {
  name: 'Component',
  setup() {
    const route = useRoute()
    const state = reactive({
      projectId: route.params.projectId,
      sprintId: computed(()=>route.params.sprintId)
    })
    onMounted(async() => {
    try {
      await tasksService.getTasksBySprintId(state.sprintId)
    } catch (error) {
      Pop.toast(error, 'error')
    }
  })
  onMounted(async() => {
    try {
      await sprintsService.getById(state.sprintId)
    } catch (error) {
      Pop.toast(error, 'error')
    }
  })
    return{
      state,
      thisSprint: computed(()=>AppState.activeSprint),
      backlogItems: computed(()=>AppState.backlogItems),
      activeBacklog: computed(()=>AppState.activeBacklog),
      tasks: computed(()=> AppState.sprintTasks[state.sprintId]),
      completed: computed(() => {
        const tasks = AppState.sprintTasks[state.sprintId]
        let totWeight = 0
        if (tasks) {
          for(let i = 0; i<tasks.length; i++){
            totWeight += tasks[i].weight
          }
        }
        return totWeight
      }),
      async getByProjectId(){
        try {
          await projectsService.getBacklogItemsByProjectId(state.projectId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
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