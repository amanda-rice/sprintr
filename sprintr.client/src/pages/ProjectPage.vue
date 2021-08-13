<template>
  <aside class="bg-dark mr-4">
    <div class="row flex-column justify-content-center pt-4">
      <div class="col-12 pl-5 pr-0">
        <router-link :to="{name: 'Project.Backlog'}">
          <h1 title="Navigate to Backlog Page">
            Backlog
          </h1>
        </router-link>
      </div>
      <div class="col-12 pl-5 pr-0">
        <router-link :to="{name: 'Project.Settings'}">
          <h1 title="Navigate to Settings Page">
            Settings
          </h1>
        </router-link>
      </div>
      <div class="col-12 pl-5 pr-0">
        <h1 v-for="(value, key) in sprints" :key="key">
          <router-link :to="{name: 'Project.Sprint', params: {sprintId: value.id}}">
            <h1 :title="'Navigate to ' + value.name + ' Page'">
              {{ value.name }}
            </h1>
          </router-link>
        </h1>
      </div>
      <div class="col-12 pl-5 my-2 glowing pr-0">
        <button class="btn btn-info" data-toggle="modal" data-target="#create-sprint" title="Create New Sprint">
          + Add Sprint
        </button>
      </div>
      <div class="col-12 pl-5 my-1 pr-0">
        <button class="btn btn-ponk hoverable text-dark" @click="destroy" title="Delete Project">
          <i class="fa fa-trash text-dark" aria-hidden="true"></i>
          Delete Project
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
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { projectsService } from '../services/ProjectsService'
import { tasksService } from '../services/TasksService'

export default {
  name: 'Component',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      projectId: route.params.projectId
    })
    onMounted(async() => {
      try {
        await projectsService.getSprintsByProjectId(state.projectId)
        const sprints = AppState.sprints
        sprints.forEach(element => {
          tasksService.getTasksBySprintId(element.id)
        })
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      activeProject: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      async getSprints(id) {
        try {
          await tasksService.getTasksBySprintId(id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await projectsService.destroy(state.projectId)
            Pop.toast('Deleted Project Successfully', 'success')
            router.push({ name: 'Home' })
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
h1{
  color: lavender ;
  text-shadow: 1px 1px darkslategray;
  font-size: 25px;
}
aside{
  min-width: 15vw
}

.btn-ponk{
  background-color: #fbadcf;
}

</style>
