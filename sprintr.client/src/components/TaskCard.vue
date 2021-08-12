<template>
  <div class="col-12 border border-secondary my-4">
    <div class="row">
      <div class="col-12 d-flex">
        <p class="px-2">{{task.name}}</p>
        <p class="px-2">delete</p>
        <p class="px-2">edit</p>
      </div>
      <!-- <select v-model="state.newSprintId" @change="setSprint">
        <option :value="sprint.id" v-for="sprint in sprints" :key="sprint.id">
          {{sprint.name}}
        </option>
      </select> -->
      <div class="col-12 d-flex">
        <p class="px-2">Notes Button</p>
      <p class="px-2">{{task.weight}}</p>
    </div>
    </div>
  </div>
</template>


<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
// import { backlogItemsService } from '../services/BacklogItemsService'
// import {tasksService} from '../services/TasksService'
export default {
  props:{
    task: {
      type: Object,
      required: true
    }
  },
  setup(props){
    const state = reactive({
      // newSprintId: props.task.sprintId
    })
    return {
      state,
      // sprints: computed(()=> AppState.sprints)
    }
  },
  components:{}
}
</script>


<style lang="scss" scoped>

</style>