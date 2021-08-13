<template>
  <div class="col-11 py-5 my-3 border snow border-info">
    <div class="row bg-light">
      <div class="col-6">
        <h1>Backlog Item: {{ backlogItem.name }}</h1>
        <h2>
          <i class="fas fa-weight-hanging text-dark"></i>
          Total Backlog Weight: {{ totalWeight }}
          <div class="mt-1">
            {{ completed.length }} / {{ tasks.length }} Tasks Completed
          </div>
        </h2>
      </div>
      <div class="col-6 mt-3">
        <button class="btn btn-secondary text-dark hoverable mx-2" @click="destroy">
          <i class="fa fa-trash text-dark" title="Delete Backlog Item"></i>
          Delete Item
        </button>
        <button class="btn btn-info text-white mx-2" data-toggle="modal" :data-target="'#create-task' + backlogItem.id" title="Create New Task">
          + Add Task
        </button>
      </div>
    </div>
    <TasksThread :tasks="tasks" />
    <CreateTaskModal :backlog-item="backlogItem" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { backlogItemsService } from '../services/BacklogItemsService'
import { tasksService } from '../services/TasksService'

export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    onMounted(async() => {
      try {
        await tasksService.getTasksByBacklogItemId(props.backlogItem.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      tasks: computed(() => AppState.tasks[props.backlogItem.id] || []),
      completed: computed(() => {
        const tasks = AppState.tasks[props.backlogItem.id]
        if (tasks) {
          return tasks.filter(t => t.status === 'done')
        }
        return []
      }),
      totalWeight: computed(() => {
        const tasks = AppState.tasks[props.backlogItem.id]
        let totWeight = 0
        if (tasks) {
          for (let i = 0; i < tasks.length; i++) {
            totWeight += tasks[i].weight
          }
        }
        return totWeight
      }),
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await backlogItemsService.destroy(props.backlogItem.id)
            Pop.toast('Deleted BacklogItem Successfully', 'success')
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
.snow{
  background-color: snow;
}

h1{
  font-size: 30px;
}

h2{
  font-size: 15px;
  font-style: italic;
}

</style>
