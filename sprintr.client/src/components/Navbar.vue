<template>
  <div class="bg-dark font-light">
    <div class="container-fluid">
      <div class="row justify-content-between">
        <div class="col-6">
          <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center text-light">
        <i class="fas fa-running fa-3x"></i>
        <h1 class="ml-2">Sprintr</h1>
      </div>
          </router-link>
        </div>
            <div class="col-6 text-right">
             <span class="navbar-text">
                <button
                  class="btn btn-outline-primary text-uppercase"
                  @click="login"
                   v-if="!user.isAuthenticated">Login
                </button>
                <div class="dropdown" v-else>
                   <div class="dropdown-toggle" @click="state.dropOpen = !state.dropOpen">
                      <img
                        :src="user.picture"
                        alt="user photo"
                        height="40"
                        class="rounded-circle"
                      />
                      <span class="mx-3">{{ user.name }}</span>
                   </div>
                    <div class="dropdown-menu p-0 list-group w-100" :class="{ show: state.dropOpen }" @click="state.dropOpen = false">
                    <router-link :to="{ name: 'Account' }">
                <div class="list-group-item list-group-item-action hoverable">
                    Account
                </div>
              </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--light);
}
.font-light{
color:white
}
</style>
