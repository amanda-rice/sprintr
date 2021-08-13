<template>
  <div class="row">
    <div class="col-md-6">
      <div class="d-flex">
        <h1>{{thisSprint.name}}</h1>
        <i class="fa text-right hoverable fa-trash fa-2x text-secondary pl-4 pb-0 pt-2" aria-hidden="true" title="Delete Backlog Item" @click="destroy"></i>
      </div>
      <h2>Task Weight: {{totalWeight}}</h2>
    </div>
    <div class="col-11 py=5 my-3 border snow">
      <TaskSprintThread :tasks="tasks" />
    </div>
  </div>
</template>


<script>
import { reactive, computed, onMounted } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {AppState} from '../AppState'
import {projectsService} from '../services/ProjectsService'
import {sprintsService} from '../services/SprintsService'
import {tasksService} from '../services/TasksService'
import Pop from '../utils/Notifier'

export default {
  name: 'Component',
  setup() {
    const route = useRoute()
    const router = useRouter()
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
      thisSprint: computed(()=>AppState.sprints.find(s => s.id ===state.sprintId)),
      backlogItems: computed(()=>AppState.backlogItems),
      activeBacklog: computed(()=>AppState.activeBacklog),
      tasks: computed(()=> AppState.sprintTasks[state.sprintId]),
      totalWeight: computed(() => {
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
      },
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await sprintsService.destroy(state.sprintId)
            router.push({ name: 'Project', params: { projectId: state.projectId } })
            Pop.toast('Deleted Sprint Successfully', 'success')
          }
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