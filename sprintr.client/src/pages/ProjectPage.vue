<template>
  <div class="component">
    <aside>
      <router-link :to="{name: 'Project.Backlog'}">
            Backlog
      </router-link>
        <router-link :to="{name: 'Project.Settings'}">
            Settings
      </router-link>
            <button class="btn btn-lg btn-outline-info"> + Add New Sprint</button>
    </aside>
    <div class="row">
      {{state.param}}
      <router-view />
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import {useRoute} from 'vue-router'
import {AppState} from '../AppState'

export default {
  name: 'Component',
  setup() {
    const route = useRoute()
    const state = reactive({
      param: route.params.projectId
    })
    return{
      state,
      activeProject: computed(()=>AppState.activeProject)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
