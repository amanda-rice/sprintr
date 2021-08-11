<template>
  <div class="component">
    <aside>
      <router-link>Backlog</router-link>
      <router-link>Settings</router-link>
      <router-link>Add Sprint</router-link>
    </aside>
    <div class="row">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Component',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
