<template>
  <div class="row justify-content-between comp-thread py-4 my-5">
    <div class="col-6">
      <h1 class="text-primary">
        Projects
      </h1>
      <p>all of the projects created by {{ account.email }} </p>
    </div>
    <div class="col-6">
      <button class="btn btn-large btn-primary" data-toggle="modal" data-target="#create-project" title="Create Project">
        <i class="fas fa-plus text-white"> Create Project</i>
      </button>
    </div>
    <div class="col-4">
      <h2><u>Name</u></h2>
    </div>
    <div class="col-4">
      <h2><u>Description</u></h2>
    </div>
    <div class="col-4">
      <h2><u>Started</u></h2>
    </div>
    <ProjectsComponent v-for="p in projects" :key="p.id" :project="p" />
  </div>
  <CreateProjectModal />
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'ProjectsThread',
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style>
.comp-thread{
  background-color: lavender;
  box-shadow: 1px 1px 15px darkslategray;
}
</style>
