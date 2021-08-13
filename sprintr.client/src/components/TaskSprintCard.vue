<template>
  <div class="col-12 border border-secondary my-4">
    <div class="row">
      <div class="col-12 d-flex">
        <h4 class="px-2">
          Task: {{ task.name }}
          <i class="fa fa-trash text-secondary px-2" aria-hidden="true" title="Delete Note"></i>
        </h4>
      </div>
      <div class="col-12 d-flex">
        <p class="px-2">
          <i class="fas fa-weight-hanging text-dark" title="Delete Task"></i> {{ task.weight }}
        </p>
      </div>
      <div class="col-12 mb-3">
        <button class="btn btn-outline-primary" data-toggle="modal" :data-target="'#create-note' + task.id" title="Create New Note">
          Add Note
        </button>
      </div>
      <div class="col-12">
        <p>Status: {{currentTask.status}}</p>
      </div>
      <div class="col-12">
        <NotesThread :note="note" />
      </div>
    </div>
  </div>
  <CreateNoteModal :task="task" />
</template>

<script>
import { computed, reactive, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { notesService } from '../services/NotesService'
import { sprintsService } from '../services/SprintsService'
import { tasksService } from '../services/TasksService'
import {useRoute} from 'vue-router'

export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    onMounted(async() => {
      await notesService.getNotesByTaskId(props.task.id)
    })
    const route = useRoute()
    const state = reactive({
      projectId: route.params.projectId,
      sprintId: computed(()=>route.params.sprintId)
    })
    return {
      state,
      note: computed(() => AppState.notes[props.task.id]),
      currentTask: computed(()=> AppState.sprintTasks[props.task.sprintId].find(t=>t.id === props.task.id)),
      async setSprint() {
        try {
          state.updateTask.id = props.task.id
          state.updateTask.status = props.task.status
          state.updateTask.backlogItemId = props.task.backlogItemId
          console.log(state.updateTask, 'updateTask')
          await tasksService.update(state.updateTask)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
