<template>
  <div class="col-12 border border-secondary my-4">
    <div class="row">
      <div class="col-12 d-flex">
        <h4 class="px-2">
          Task: {{ task.name }}
            <i class="fa text-right hoverable fa-trash text-secondary pl-4" aria-hidden="true" title="Delete Task" @click="destroy"></i>
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
        <select name="status" v-model="state.updateTask.status" @change="setStatus">
            <option value="pending">
              Pending
            </option>
            <option value="in-progress">
              In-Progress
            </option>
            <option value="review">
              Review
            </option>
            <option value="done">
              Done
            </option>
          </select>
      </div>
      <div class="col-12">
        <p>Status: {{currentTask.status}}</p>
        <div v-if="sprint[0]">
          <label for="sprint">Assign Sprint: </label>
          <select name="sprint" v-model="state.updateTask.sprintId" @change="setSprint">
            <option v-for="(value, key) in sprint" :key="key" :value="value.id">
              {{ value.name }}
            </option>
          </select>
          <div v-if="task.sprintId && sprint.find(s=>s.id === task.sprintId)">Current Sprint: {{sprint.find(s=>s.id === task.sprintId).name}}</div>
          <div v-else>Not currently assigned to a sprint</div>
        </div>
        <div v-else>
          <p>No Sprints to assign to</p>
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
import {useRoute, useRouter} from 'vue-router'

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
    const router = useRouter()  
    const state = reactive({
      updateTask: {},
      projectId: route.params.projectId,
    })
    onMounted(async() => {
      try {
        await sprintsService.getSprintsByProjectId(props.task.projectId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    onMounted(async() => {
      try {
        await tasksService.getTasksByBacklogItemId(props.task.backlogItemId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      sprint: computed(() => AppState.sprints),
      note: computed(() => AppState.notes[props.task.id]),
      currentTask: computed(()=> AppState.tasks[props.task.backlogItemId].find(t=>t.id === props.task.id)),
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
      async setStatus() {
        try {
          state.updateTask.id = props.task.id
          if(props.task.sprintId){
            state.updateTask.sprintId = props.task.sprintId
          }
          state.updateTask.backlogItemId = props.task.backlogItemId
          console.log(state.updateTask, 'updateTask')
          await tasksService.update(state.updateTask)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await tasksService.destroy(props.task.id, props.task.backlogItemId)
            Pop.toast('Deleted Task Successfully', 'success')
          }
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
