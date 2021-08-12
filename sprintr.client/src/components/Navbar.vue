<template>
  <div class="bg-light font-dark">
    <div class="container-fluid">
      <div class="row justify-content-between">
        <div class="col-md-6">
          <div class="d-flex align-items-center">
            <router-link class="navbar-brand d-flex text-dark" :to="{ name: 'Home' }" title="Navigate to Home Page">
              <svg xmlns="http://www.w3.org/2000/svg"
                   x="0px"
                   y="0px"
                   width="70"
                   height="70"
                   viewBox="0 0 226 226"
                   style=" fill:#000000;"
              ><g fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
              ><path d="M0,226v-226h226v226z" fill="none"></path><g fill="#AA29C4"><path d="M225.83992,76.88708c0.02825,-0.52733 0.16008,-1.017 0.16008,-1.55375c0,-13.14567 -6.75175,-24.6905 -16.95942,-31.42342c0,-0.00942 0.02825,-0.07533 0.02825,-0.07533c0,0 -39.56883,-34.41792 -105.4855,-34.41792c-10.40542,0 -18.83333,8.42792 -18.83333,18.83333c0,10.40542 8.42792,18.83333 18.83333,18.83333c1.582,0 3.09808,-0.25425 4.5765,-0.6215c4.294,-0.96992 23.843,-4.71775 44.47492,1.95867c-3.85142,3.76667 -6.79883,8.39025 -8.77633,13.51292c-21.68658,-2.98508 -63.13875,-7.54275 -78.3655,-4.41642c-17.92933,3.68192 -32.49692,18.08942 -36.20708,36.01875c-0.24483,1.1865 -0.36725,2.35417 -0.52733,3.52183c-2.8815,-1.808 -6.2715,-2.89092 -9.92517,-2.89092c-10.40542,0 -18.83333,8.42792 -18.83333,18.83333c0,10.40542 8.42792,18.83333 18.83333,18.83333c5.86658,0 11.04575,-2.74025 14.50167,-6.9495c0.83808,1.64792 1.77033,3.2205 2.78733,4.746c0.16008,0.29192 0.34842,0.55558 0.54617,0.904c5.40517,9.61442 0.60267,27.64733 -5.84775,36.19767c-4.69892,6.22442 0.08475,12.68425 8.50325,15.07608c24.6905,7.02483 34.86992,11.61075 56.84842,31.66825c6.64817,5.51817 18.03292,2.64608 22.8825,-3.2205c4.28458,-5.74417 4.28458,-14.68058 -3.49358,-21.3005c-13.37167,-10.92333 -22.05383,-18.72975 -35.03942,-23.88067c13.52233,-5.79125 23.81475,-14.20975 30.47233,-25.27433c0.01883,-0.00942 0.03767,-0.01883 0.0565,-0.02825c3.83258,-6.30917 16.17783,-4.03033 15.481,3.68192c-0.64033,7.05308 -4.71775,9.16242 -9.91575,13.62592c-9.75567,8.38083 1.50667,29.65308 18.03292,20.43417c31.56467,-17.59975 40.6235,-49.16442 43.2225,-64.61717c0.34842,0.00942 0.678,0.10358 1.04525,0.10358h9.41667c16.73342,0 30.74542,-10.97983 35.66092,-26.06533c1.16767,-2.50483 2.00575,-5.17917 2.00575,-8.249c0,-0.58383 -0.12242,-1.19592 -0.16008,-1.79858z" opacity="0.35"></path><path d="M56.5,37.66667h-28.25c-5.198,0 -9.41667,-4.21867 -9.41667,-9.41667c0,-5.198 4.21867,-9.41667 9.41667,-9.41667h28.25c5.198,0 9.41667,4.21867 9.41667,9.41667c0,5.198 -4.21867,9.41667 -9.41667,9.41667z"></path><path d="M28.25,65.91667h-18.83333c-5.198,0 -9.41667,-4.21867 -9.41667,-9.41667c0,-5.198 4.21867,-9.41667 9.41667,-9.41667h18.83333c5.198,0 9.41667,4.21867 9.41667,9.41667c0,5.198 -4.21867,9.41667 -9.41667,9.41667z"></path><circle cx="21" cy="7" transform="scale(9.41667,9.41667)" r="1"></circle></g></g></svg>
              <h1 class="ml-2">
                Sprintr
              </h1>
            </router-link>
          </div>
        </div>
        <div class="col-md-6 text-right">
          <span class="navbar-text hoverable">
            <button
              class="btn btn-outline-primary hoverable text-uppercase"
              @click="login"
              v-if="!user.isAuthenticated"
            >Login
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
