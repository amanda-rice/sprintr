<template>
  <div class="col-11 py-5 my-3 border border-primary">
    <div class="row bg-light">
      <div class="col-4">
        {{backlogItem.name}}
      </div>
      <div class="col-4">
        Tasks Completed 
      </div>
      <div class="col-4">
        <i class="fa text-right hoverable fa-trash text-secondary pl-4" aria-hidden="true" title="Delete Backlog Item" @click="destroy"></i>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { backlogItemsService } from '../services/BacklogItemsService'

export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await backlogItemsService.destroy(props.backlogItem.id)
            Pop.toast('Deleted Project Successfully', 'success')
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