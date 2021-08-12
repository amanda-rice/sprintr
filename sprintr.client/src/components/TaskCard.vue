<template>
  <div class="col-12 border border-secondary my-4">
    <div class="row">
      <div class="col-12 d-flex">
        <p class="px-2">
          {{ task.name }}
        </p>
        <i class="fa fa-trash px-2" aria-hidden="true"></i>
        <p class="px-2">
          edit
        </p>
      </div>
      <div class="col-12 d-flex">
        <p class="px-2">
          Task Weight: {{ task.weight }}
          <button class="btn btn-outline-primary" data-toggle="modal" :data-target="'#create-note' + task.id" title="Create New Note">
            Add Note
          </button>
        </p>
      </div>
      <div class="col-12">
        <div>
          <select v-model="state.updateTask.sprintId" @change="setSprint">
            <option v-for="(value, key) in sprint" :key="key">
              {{ value.id }}
            </option>
          </select>
        </div>
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
    const state = reactive({
      updateTask: {}
    })
    onMounted(async() => {
      try {
        await sprintsService.getSprintsByProjectId(state.projectId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      sprint: computed(() => AppState.sprints),
      note: computed(() => AppState.notes[props.task.id]),
      async setSprint() {
        try {
          state.updateTask.id = props.task.id
          state.updateTask.weight = props.task.weight
          await tasksService.update(state.updateTask)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
