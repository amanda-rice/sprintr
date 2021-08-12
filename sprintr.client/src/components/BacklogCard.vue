<template>
  <div class="col-12">

    <div class="col-4">
      {{backlogItem.name}}
    </div>
    <div class="col-3">
      Tasks Completed 
    </div>
    <div class="col-4">
      <i class="fa hoverable fa-trash text-secondary pl-4" aria-hidden="true" title="Delete Project" @click="destroy"></i>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
// import { backlogItemsService } from '../services/BacklogItemsService'

export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      // account: computed(() => AppState.account),
      // async destroy() {
      //   try {
      //     if (await Pop.confirm()) {
      //       await backlogItemsService.destroy(props.backlogItem.id)
      //       Pop.toast('Deleted Project Successfully', 'success')
      //     }
      //   } catch (error) {
      //     Pop.toast(error, 'error')
      //   }
      // }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>