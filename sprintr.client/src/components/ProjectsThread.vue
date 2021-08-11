<template>
  <div class="row justify-content-between">
    <div class="col-6">
      <h3>Projects</h3>
      <p>all of the projects created by {{ account.email }} </p>
    </div>
    <div class="col-6">
      <button class="btn btn-large btn-outline-primary">
        Create Project
      </button>
    </div>
    <div class="col-4">
      <p><u>Name</u></p>
    </div>
    <div class="col-4">
      <p><u>Description</u></p>
    </div>
    <div class="col-4">
      <p><u>Started</u></p>
    </div>
    <ProjectsComponent v-for="p in projects" :key="p.id" :project="p" />
  </div>
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
