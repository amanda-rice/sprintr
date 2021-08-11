<template>
  <div class="col-4">
    {{ project.name }}
  </div>
  <div class="col-3">
    {{ project.description }}
  </div>
  <div class="col-4">
    {{ new Date(project.createdAt).toLocaleString() }}
    <i class="fa hoverable fa-trash text-secondary pl-4" aria-hidden="true" title="Delete Project" @click="destroy"></i>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { projectsService } from '../services/ProjectsService'

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
