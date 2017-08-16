<template>
  <div id="home">
    <!--<Desktop v-if="this.mode=='desktop'" :locationList="locationList" :preferenceList="preferenceList" :nationalityList="nationalityList" :massage="massage" :age="age"></Desktop>-->
    <!--<Mobile v-else :locationList="locationList" :preferenceList="preferenceList" :nationalityList="nationalityList" :massage="massage" :age="age" ></Mobile>-->
    <Desktop v-if="this.mode=='desktop'" @loadMore="loadMore"></Desktop>
    <Mobile v-else @loadMore="loadMore"></Mobile>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import Desktop from './Desktop'
  import Mobile from './Mobile'
  import {women} from '@/mock/mock'

  export default {
    name: 'home',
    data () {
      return {}
    },
    components: {
      Desktop, Mobile
    },
    computed: {
      ...mapState ({
        mode: (state) => state.mode
      })
    },
    methods: {
      ...mapMutations ({
        updateCardList: 'UPDATE_CARD_LIST'
      }),
      initCardList () {
        this.$axios.get ('http://cardList.cn').then (response => {
//          this.cardList = response.data.datas
//          this.cardList.push (...response.data.datas)
          this.updateCardList ({cardList: response.data.datas})
        }).catch (error => {
          console.log (error)
        })
      },
      loadMore () {
        this.initCardList ()
      }
    },
    mounted () {
      this.initCardList ()
    }
  }
</script>

<style scoped>
  .container-fluid {
    padding: 0;
  }
</style>
