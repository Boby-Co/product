<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
        width: 0
      }
    },
    computed: {
      ...mapState ({
        mode: state => state.mode
      })
    },
    mounted () {
      this.windowResize ()
      this.changeMode ()
    },
    methods: {
      ...mapMutations ({
        updateMode: 'UPDATE_MODE',
        updateWidth: 'UPDATE_WIDTH'
      }),
      changeMode () {
        this.updateWidth({'width': $ (window).width ()})
        $ (window).width () < 992 ? this.updateMode ({mode: 'mobile'}) : this.updateMode ({mode: 'desktop'})
      },
      windowResize () {
        $ (window).resize (() => {
          this.changeMode ()
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
</style>
