<template>
  <div class="col-4 hoverable" @click="toProjectPage">
    {{ project.name }}
  </div>
  <div class="col-3 hoverable" @click="toProjectPage">
    {{ project.description }}
  </div>
  <div class="col-4 hoverable" @click="toProjectPage">
    {{ new Date(project.createdAt).toLocaleString() }}
    <i class="fa hoverable fa-trash text-secondary pl-4" aria-hidden="true" title="Delete Project" @click="destroy"></i>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { useRouter } from 'vue-router'
import { projectsService } from '../services/ProjectsService'

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({
      activeProject: computed(() => AppState.activeProject)
    })
    return {
      state,
      account: computed(() => AppState.account),
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await projectsService.destroy(props.project.id)
            Pop.toast('Deleted Project Successfully', 'success')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async toProjectPage() {
        try {
          const id = await projectsService.getById(props.project.id)
          router.push({ name: 'Project', params: { projectId: state.activeProject.id } })
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
