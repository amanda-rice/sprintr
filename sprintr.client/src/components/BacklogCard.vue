<template>
  <div class="col-4">
    Backlog Item
  </div>
  <div class="col-3">
    Tasks: 2/3 Complete
  </div>
  <div class="col-4">
    <i class="fa hoverable fa-trash text-secondary pl-4" aria-hidden="true" title="Delete Project" @click="destroy"></i>
  </div>
</template>


<script>
export default {
  name: 'BacklogCard',
  setup(){
    return {}
  },
  components:{}
}
</script>


<style lang="scss" scoped>

</style>