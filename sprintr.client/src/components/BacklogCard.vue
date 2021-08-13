<template>
  <div class="col-11 py-5 my-3 border border-primary">
    <div class="row bg-light">
      
      <div class="col-3">
       <h2>{{ backlogItem.name }}</h2>
       <p>Backlog Items Weight: {{totalWeight}}</p>
      </div>
      <div class="col-3">
        {{ completed.length }} / {{ tasks.length }} Tasks Completed
      </div>
      <div class="col-3">
        <i class="fa text-right hoverable fa-trash text-secondary pl-4" aria-hidden="true" title="Delete Backlog Item" @click="destroy"></i>
      </div>
      <div>
        <button class="btn btn-primary" data-toggle="modal" :data-target="'#create-task' + backlogItem.id" title="Create New Task">
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
          for(let i = 0; i<tasks.length; i++){
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

</style>
