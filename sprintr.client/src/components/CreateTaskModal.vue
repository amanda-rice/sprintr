<template>
  <div class="modal fade"
       :id="'create-task' + backlogItem.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="create-task"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            New Task
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createTask">
            {{ backlogItem.id }}
            <div class="form-group">
              <label class="pr-2" for="name">New Task</label>
              <input type="text"
                     id="name"
                     class="form-control"
                     placeholder="Add task..."
                     maxlength="100"
                     required
                     v-model="state.createdTask.name"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="name">Weight</label>
              <input type="text"
                     id="number"
                     class="form-control"
                     placeholder="Add weight..."
                     max="100"
                     required
                     v-model="state.createdTask.weight"
              >
            </div>
            <div>
              <select v-model="state.createdTask.sprintId" @change="setSprint">
                <option v-for="(value, key) in sprint" :key="key" :value="value.id">
                  {{ value.name }}
                </option>
              </select>
              <div class="mt-3">
                <button v-if="state.createdTask" type="submit" class="btn btn-primary mr-3">
                  Save
                </button>
                <button type="button"
                        class="btn btn-secondary closeModal"
                        data-dismiss="modal"
                        @click="closeModal"
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pop from '../utils/Notifier'
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { sprintsService } from '../services/SprintsService'
import { tasksService } from '../services/TasksService'

export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  },
  name: 'Component',
  setup(props) {
    const route = useRoute()
    const state = reactive({
      createdTask: {},
      thisTask: computed(() => AppState.activeTask),
      projectId: route.params.projectId,
      backlogId: computed(() => AppState.activeBacklog.id)
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
      backlogId: computed(() => AppState.activeBacklog.id),
      async createTask() {
        try {
          state.createdTask.projectId = state.projectId
          state.createdTask.backlogItemId = props.backlogItem.id
          await tasksService.createTask(state.createdTask)
          state.createdTask = {}
          $(`#create-task${props.backlogItem.id}`).modal('hide')
          Pop.toast('Created Task Successfully', 'success')
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
