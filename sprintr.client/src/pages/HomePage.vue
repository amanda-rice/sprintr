<template>
  <div class="container-fluid">
    <div class="row justify-content-center" v-if="user.isAuthenticated">
      <div class="container-fluid home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <ProjectsThread :projects="projects" />
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-md-4 bg-primary text-center glowing my-5">
        <h1>Log in to start Sprinting!</h1>
        <h1>
          <i class="fas party fa-carrot fa-3x text-light text-center m-md-4 my-4 m-0"></i>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
// import Pop from '../utils/Notifier'
// import { projectsService } from '../services/ProjectsService'

export default {
  name: 'Home',
  setup() {
    // onMounted(async () => {
    //   try {
    //     await projectsService.getAll()
    //   } catch (error) {
    //     Pop.toast(error, 'error')
    //   }
    // })
    return {
      user: computed(() => AppState.user),
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
 } img{
    height: 200px;
    width: 200px;
  }
.glowing{
 box-shadow: 1px 1px 15px darkslategray;
}
.party:hover{
 text-shadow: 3px 3px 7px rgb(223, 103, 163);
}
</style>
