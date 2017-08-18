<template>
  <div class="mobile container-fluid" :style="{'width': width +'px'}">
    <header>
      <div class="row">
        <div class="text-left col-xs-2">
          <i v-if="header.isFilter||header.isInfo || header.isAbout" class="fa fa-long-arrow-left"
             @click="header={isHome: true,isFilter: false,isSearch: false,isInfo: false}"></i>
          <i v-else-if="header.isHome" class="fa fa-bars"
             @click="header={isHome: false,isFilter: true,isSearch: false,isInfo: false}"></i>
          <h5 class="title" v-else="header.isSearch"
              @click="header={isHome: true,isFilter: false,isSearch: false,isInfo: false}">Cancel</h5>
        </div>
        <div class="text-center col-xs-7">
          <h4 class="title" v-if="header.isFilter">Filter</h4>
          <h4 class="title" v-else-if="header.isAbout">About</h4>
          <h4 class="logo" v-else-if="header.isHome">
            <strong>Hot</strong><span>Gilr.</span>
            <p>co.nz</p>
          </h4>
          <h4 class="title" v-else-if="header.isSearch">
            <div class="input-group">
              <span class="input-group-addon" id="search-addon">
                <img src="../images/desktop/search.png" alt="">
              </span>
              <input type="text" class="form-control" placeholder="Search" aria-describedby="search-addon"
                     v-model.trim="searchModel">
            </div>
          </h4>
          <h4 class="title" v-else-if="header.isInfo">
            <div>&nbsp;</div>
          </h4>
        </div>
        <div class="text-right col-xs-3">
          <i class="fa fa-search" v-if="header.isHome"
             @click="header={isHome: false,isFilter: false,isSearch: true,isInfo: false}"></i>
          <h5 class="title" v-else-if="header.isFilter"
              @click="header={isHome: true,isFilter: false,isSearch: false,isInfo: false}">Save</h5>
          <h5 class="title" v-else-if="header.isSearch">
            <button @click="search" class="btn">Search</button>
          </h5>
        </div>
      </div>
    </header>
    <section :class="{'no-margin-x': header.isFilter||header.isInfo}">
      <div v-if="header.isHome||header.isSearch" class="card-list">
        <div class="tab">
          <ul class="list-inline">
            <li class="tab-item" :class="{selected: tabIndex==1}" @click="tabIndex=1"><h6>Most Recent</h6></li>
            <li class="tab-item" :class="{selected: tabIndex==2}" @click="tabIndex=2"><h6>Most Viewed</h6></li>
            <li class="tab-item" :class="{selected: tabIndex==3}" @click="tabIndex=3"><h6>Most Linked</h6></li>
            <li class="tab-item" :class="{selected: tabIndex==4}" @click="tabIndex=4"><h6>Promotion</h6></li>
          </ul>
        </div>
        <div>
          <div class="row">
            <div class="card col-xs-6"
                 :class="{first: index%2==0, second: index%2==1}" v-for="(item, index) in cardListFilter" :key="index">
              <div class="inline">
                <a @click.prevent="showInfo(item, index)" href="#" class="thumbnail">
                  <img :src="item.cover" alt="" style="width: 100%; height: 100%">
                </a>
                <div class="desc">
                  <h5>
                    <span class="name" v-text="item.contact.name"></span>
                    <span class="age" v-text="item.contact.age"></span>
                  </h5>
                  <div class="location">
                    <img src="../images/desktop/address-icon.png" alt="">
                    <h6 v-text="item.contact.location"></h6>
                  </div>
                  <div class="nationality">
                    <img src="../images/desktop/www.png" alt="">
                    <h6 v-text="item.contact.nationality"></h6>
                    <i @click="attention(item)" class="fa fa-heart" :class="{attention: item.isAttention}"
                       aria-hidden="true"><span v-text="item.attention"></span></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more" @click="loadMore">
          <h5>Load more</h5>
        </div>
      </div>
      <div class="about" v-else-if="header.isAbout">
        <h1>Title</h1>
        <h4 v-text="about"></h4>
      </div>
      <div class="info" v-else-if="header.isInfo">
        <div class="banner">
          <img :src="showModel.pearsonShow" :style="{'width': width+'px','height': width/4*3+'px'}" alt="">
          <div class="summary nowrap-ellipsis">
            <h4 v-text="showModel.summary"></h4>
          </div>
        </div>
        <div class="self-introduction">
          <div class="title">
            <h2 class="nowrap-ellipsis" v-text="showModel.self_introduction_title"></h2>
          </div>
          <div class="content">
            <h4 v-text="showModel.self_introduction_content"></h4>
          </div>
          <div class="more"><h4>Read More</h4></div>
        </div>
        <div class="personal">
          <div class="contact">
            <h2>About me</h2>
            <div>
              <h4 class="label">Name:</h4>
              <h4 class="text" v-text="showModel.contact.name"></h4>
            </div>
            <div>
              <h4 class="label">Age:</h4>
              <h4 class="text" v-text="showModel.contact.age"></h4>
            </div>
            <div>
              <h4 class="label">Nationality:</h4>
              <h4 class="text" v-text="showModel.contact.nationality"></h4>
            </div>
            <div>
              <h4 class="label">Location:</h4>
              <h4 class="text" v-text="showModel.contact.location"></h4>
            </div>
            <div>
              <h4 class="label">Contect:</h4>
              <h4 class="text" v-text="showModel.contact.contect"></h4>
            </div>
          </div>
          <div class="about">
            <div>
              <h4 class="label">Gender:</h4>
              <h4 class="text" v-text="showModel.about.Gender"></h4>
            </div>
            <div>
              <h4 class="label">Bust size:</h4>
              <h4 class="text" v-text="showModel.about.Bust_size"></h4>
            </div>
            <div>
              <h4 class="label">Height:</h4>
              <h4 class="text" v-text="showModel.about.Height"></h4>
            </div>
            <div>
              <h4 class="label">Weight:</h4>
              <h4 class="text" v-text="showModel.about.Weight"></h4>
            </div>
            <div>
              <h4 class="label">Eye color:</h4>
              <h4 class="text" v-text="showModel.about.Eye_color"></h4>
            </div>
            <div>
              <h4 class="label">Hair color:</h4>
              <h4 class="text" v-text="showModel.about.Hair_color"></h4>
            </div>
            <div>
              <h4 class="label">InCall:</h4>
              <h4 class="text" v-text="showModel.about.incall"></h4>
            </div>
            <div>
              <h4 class="label">OutCall:</h4>
              <h4 class="text" v-text="showModel.about.outcall"></h4>
            </div>
          </div>
          <div class="working">
            <h2>Working Hours</h2>
            <div>
              <h4 class="label">Monday:</h4>
              <h4 class="text" v-text="showModel.work.Monday"></h4>
            </div>
            <div>
              <h4 class="label">Tuesday:</h4>
              <h4 class="text" v-text="showModel.work.Tuesday"></h4>
            </div>
            <div>
              <h4 class="label">Wednesday:</h4>
              <h4 class="text" v-text="showModel.work.Wednesday"></h4>
            </div>
            <div>
              <h4 class="label">Thursday:</h4>
              <h4 class="text" v-text="showModel.work.Thursday"></h4>
            </div>
            <div>
              <h4 class="label">Friday:</h4>
              <h4 class="text" v-text="showModel.work.Friday"></h4>
            </div>
            <div>
              <h4 class="label">Saturday:</h4>
              <h4 class="text" v-text="showModel.work.Saturday"></h4>
            </div>
            <div>
              <h4 class="label">Sunday:</h4>
              <h4 class="text" v-text="showModel.work.Sunday"></h4>
            </div>
          </div>
          <div class="fees">
            <h2>My fees</h2>
            <div>
              <h4 class="label">30 mins:</h4>
              <h4 class="text" v-text="showModel.fees.thirty"></h4>
            </div>
            <div>
              <h4 class="label">45 mins:</h4>
              <h4 class="text" v-text="showModel.fees.fourty"></h4>
            </div>
            <div>
              <h4 class="label">1hr:</h4>
              <h4 class="text" v-text="showModel.fees.one"></h4>
            </div>
            <div>
              <h4 class="label">over night:</h4>
              <h4 class="text" v-text="showModel.fees.night"></h4>
            </div>
          </div>
        </div>

        <div class="images">
          <swipe :style="{'width': width+'px','height': width/4*3+'px'}">
            <swipe-item v-for="(item, index) in showModel.images" :key="index">
              <img style="width: 100%; height: 100%" :src="item.url" alt="">
            </swipe-item>
          </swipe>
        </div>
      </div>
      <div class="filter" v-else-if="header.isFilter">
        <div class="my-filter">
          <h4>My Filter:</h4>
          <div style="display: inline" v-for="(item, index) in finalFilters" :key="index">
            <ul class="filter-info list-inline">
              <li v-for="(item1, index1) in item.filterName"><h6 v-text="item1"></h6><i
                @click="removeFilter(item.type, item1)" class="fa fa-times"></i></li>
            </ul>
          </div>
        </div>
        <div class="check-list" :style="{'paddingTop': filterHeight}">
          <div class="check-item">
            <div class="label">
              <h2>Location</h2>
            </div>
            <ul class="check list-unstyled">
              <li :class="{selected: item.isChecked}"
                  v-for="(item, index) in locationList" :key="index">
                <h4 @click="selected( 'Location', locationList, item, index)" v-text="item.text"></h4>
                <ul v-if="item.showSuburb&&item.text!='All'" class="suburb list-unstyled">
                  <li :class="{selected: locationChecked(item, 'All')}" @click="selectLocation(item, 'All', index, 0)">
                    <h4>All</h4></li>
                  <li :class="{selected: locationChecked(item, 'CBD')}" @click="selectLocation(item, 'CBD', index, 1)">
                    <h4>CBD</h4></li>
                  <li :class="{selected: locationChecked(item, 'Suburb2')}"
                      @click="selectLocation(item, 'Suburb2', index, 2)"><h4>Suburb2</h4></li>
                  <li :class="{selected: locationChecked(item, 'Suburb3')}"
                      @click="selectLocation(item, 'Suburb3', index, 3)"><h4>Suburb3</h4></li>
                  <li :class="{selected: locationChecked(item, 'Suburb4')}"
                      @click="selectLocation(item, 'Suburb4', index, 4)"><h4>Suburb4</h4></li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="check-item">
            <div class="label">
              <h2>Preference</h2>
            </div>
            <ul class="check list-unstyled">
              <li @click="selected('Preference', preferenceList, item, index)" :class="{selected: item.isChecked}"
                  v-for="(item, index) in preferenceList" :key="index"><h4 v-text="item.text"></h4></li>
            </ul>
          </div>
          <div class="check-item">
            <div class="label">
              <h2>Nationality</h2>
            </div>
            <ul class="check list-unstyled">
              <li @click="selected('Nationality', nationalityFilter, item, index)" :class="{selected: item.isChecked}"
                  v-for="(item, index) in nationalityFilter" :key="index"><h4 v-text="item.text"></h4></li>
            </ul>
            <div class="more" @click="showMore=!showMore"><h4 v-text="showMore?'Show Less':'Show More'"></h4></div>
          </div>
          <div class="check-item">
            <div class="label">
              <h2>Service</h2>
            </div>
            <ul class="check list-unstyled" style="width: 80%">
              <li @click="selected('Service', massage, item, index)" :class="{selected: item.isChecked}"
                  v-for="(item, index) in massage" :key="index"><h4 v-text="item.text"></h4></li>
            </ul>
          </div>
          <div class="check-item">
            <div class="label">
              <h2>Age</h2>
            </div>
            <ul class="check list-unstyled">
              <li @click="selected('Age', age, item, index)" :class="{selected: item.isChecked}"
                  v-for="(item, index) in age" :key="index"><h4 v-text="item.text"></h4></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <footer v-if="!header.isAbout">
      <ul class="list-inline">
        <li @click="header={isHome: true, isAbout: false}">
          <h6>Home</h6>
        </li>
        <li @click="header={isHome: false, isAbout: true}">
          <h6>About</h6>
        </li>
        <li>
          <h6>Contact us</h6>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import 'vue-swipe/dist/vue-swipe.css'
  import {Swipe, SwipeItem} from 'vue-swipe'

  export default {
    name: 'Mobile',
    components: {
      Swipe, SwipeItem
    },
    //props: ['locationList', 'preferenceList', 'nationalityList', 'massage', 'age', 'cardList'],
    data () {
      return {
        header: {
          isHome: true,
          isFilter: false,
          isSearch: false,
          isInfo: false,
          isAbout: false
        },
        searchModel: '',
        tabIndex: 1,
        showModel: null,
        index: 0,
        showMore: false,
        filters: {
          'Location': [],
          'Preference': [],
          'Nationality': [],
          'Service': [],
          'Age': []
        },
        filterHeight: '33px', // my-filter区域的高度
        filterStr: '' // 用于监测筛选条件，计算my-filter区域的高度
      }
    },
    computed: {
      ...mapState ({
        locationList: state => state.locationList,
        preferenceList: state => state.preferenceList,
        nationalityList: state => state.nationalityList,
        massage: state => state.massage,
        age: state => state.age,
        cardList: state => state.cardList,
        about: state => state.about,
        width: state => state.width
      }),
      cardListFilter () {
        let len = this.cardList.length / 16 * 6
        return this.cardList.slice (0, len)
      },
      nationalityFilter () {
        return this.showMore ? this.nationalityList : this.nationalityList.slice (0, 9)
      },
      finalFilters () {
        let finalFilters = [],
          temp = ''

        for (let i = 0, keys = Object.keys (this.filters); i < keys.length; i++) {
          let key = keys[i],
            arr = this.filters[key]
          if (arr.length > 0) {
            let f = arr.sort ((a, b) => {
              return a.index - b.index
            }).map ((v, i, a) => {
              return key + ': ' + v.filterName
            })
            finalFilters.push ({
              'type': key,
              'filterName': f
            })

            temp += f.join (',')
          }

          let items = this.getListByType (key)
//          console.log(key)
          arr.length > 0 ? items[0].isChecked = false : items[0].isChecked = true
        }

        this.filterStr = temp

        return finalFilters
      }
    },
    methods: {
      search () {
        console.log (this.searchModel)
      },
      loadMore () {
        this.$emit ('loadMore')
      },
      showInfo (item, index) {
        // go top
        $ ('body,html').animate ({scrollTop: 0}, 0);
        this.header = {isHome: false, isFilter: false, isSearch: false, isInfo: true}
        this.showModel = item
        this.index = index
      },
      attention (item) {
        item.isAttention = !item.isAttention
        item.isAttention ? item.attention++ : item.attention--
      },
      selected (type, items, item, index) {
        if (type == 'Location') {
          if (item.text == 'All') {
            item.isChecked = true
            this.filters[type] = []
          }
          item.showSuburb = !item.showSuburb
        }
        else {
          if (item.text == 'All') {
            items.map ((value, index, arr) => {
              value.isChecked = false
              this.filters[type] = []
            })
          } else {
            items[0].isChecked = false
            if (item.isChecked) {
              this.filters[type].splice (this.filters[type].findIndex ((v) => {
                return v.filterName == item.text
              }), 1)
            }
            else {
              this.filters[type].push ({'index': index, 'filterName': item.text})
            }

            item.isChecked = !item.isChecked
//            this.filters[type].length > 0 ? items[0].isChecked = false : items[0].isChecked = true
          }

        }
      },
      removeFilter (type, filterName) {
        let text = filterName.split (':')[1].substr (1)
        this.filters[type].splice (this.filters[type].findIndex ((v) => {
          console.log (type, text, v.filterName)
          return v.filterName == text
        }), 1)

        if (type != 'Location') {
          let items = this.getListByType (type)
          items.find ((v) => {
            return v.text == text
          }).isChecked = false
        }
      },
      selectLocation (item, suburb, p_index, index) {
        let text = item.text + ',' + suburb,
          i = this.filters['Location'].findIndex ((v) => {
            return v.filterName == text
          })

        if (suburb == 'All') {
          let k = -1
          while ((k = this.filters['Location'].findIndex ((v) => {
            return v.filterName.indexOf (item.text) != -1
          })) != -1) {
            this.filters['Location'].splice (k, 1)
          }
        } else {
          if (i != -1) {
            this.filters['Location'].splice (i, 1)
          } else {
            this.filters['Location'].push ({'index': (p_index + 1) * 100 + index, 'filterName': text})
          }
        }

        this.filters['Location'].length > 0 ? this.locationList[0].isChecked = false : this.locationList[0].isChecked = true
      },
      locationChecked (item, suburb) {
        if (suburb == 'All') {
          return -1 == this.filters['Location'].findIndex ((v) => {
            return v.filterName.indexOf (item.text) != -1
          })
        }
        else {
          return -1 != this.filters['Location'].findIndex ((v) => {
            return v.filterName.indexOf (item.text + ',' + suburb) != -1
          })
        }
      },
      getListByType (type) {
        let items = null
        switch (type) {
          case 'Location':
            items = this.locationList
            break

          case 'Preference':
            items = this.preferenceList
            break

          case 'Nationality':
            items = this.nationalityList
            break

          case 'Service':
            items = this.massage
            break

          case 'Age':
            items = this.age
            break
        }

        return items
      }
    },
    watch: {
      filterStr (val) {
        this.filterHeight = $ ('.my-filter').height () + 'px'
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  header {
    width: 100%;
    height: 2rem;
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr=#FF5625, endColorstr=#FF3D6C); /* IE 9 */
    background: -webkit-linear-gradient(left, rgb(255, 86, 37), rgb(255, 61, 108)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, rgb(255, 86, 37), rgb(255, 61, 108)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, rgb(255, 86, 37), rgb(255, 61, 108)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgb(255, 86, 37), rgb(255, 61, 108)); /* 标准的语法 */
    color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 500;
  }

  header div {
    height: 100%;
    line-height: 2rem;
    padding: 0 .5rem;
  }

  header .logo {
    padding-top: .3rem;
    line-height: 0.8;
  }

  header .title {
    height: 100%;
    line-height: 2rem;
  }

  header h5 .btn {
    width: 100%;
    height: 1rem;
    background: #ffffff;
    border: none;
    border-radius: 1rem;
    color: #FF794F;
  }

  .btn:focus {
    outline: none;
    border: none;
    box-shadow: 0 0 5px rgba(207, 220, 0, 0.4);
    border-radius: 1rem;
  }

  header .input-group {
    border-radius: 1rem;
    height: 1rem;
    padding-top: .5rem;
  }

  header .input-group span {
    border-bottom-left-radius: 1rem;
    border-top-left-radius: 1rem;
    background: #fff;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  header .input-group span img {
    height: 1rem;
    width: 1rem;
  }

  header .input-group input {
    border: none;
    height: 100%;
    margin: 0;
    padding: 0;
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  header input:focus {
    outline: none;
    border: none;
    box-shadow: 0 0 5px rgba(207, 220, 0, 0.4);
    border-radius: 1rem;
  }

  section {
    margin: 2rem 1rem 0;
    overflow-x: hidden;
  }

  section.no-margin-x {
    margin-left: 0;
    margin-right: 0;
  }

  section .list-inline li {
    padding: 0;
  }

  section .tab {
    text-align: left;
  }

  section .tab .tab-item {
    cursor: pointer;
    color: #B9B9B9;
  }

  section .tab .tab-item.selected {
    color: #000000;
    border-bottom: .1rem solid #FF5722;
  }

  section .card {
    margin-top: 1rem;
  }

  section .card .inline {
    background: #ffffff;
  }

  section .first {
    padding-right: .5rem;
  }

  section .second {
    padding-left: .5rem;
  }

  section .card-list {
    color: #c6c6c6;
  }

  section .card .desc {
    height: 4rem;
    padding: 0 .2rem;
    text-align: justify;
  }

  section .card .desc .location,
  section .card .desc .nationality,
  section .card .desc h5 {
    height: 30%;
    line-height: 1.4rem;
  }

  section .card .desc h5 span.name {
    color: #FF5722;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
  }

  section .card .desc h5 span.age {
    float: right;
    display: inline-block;
    width: 20%;
  }

  section .card .desc .location img,
  section .card .desc .nationality img {
    width: .7rem;
  }

  section .card .desc .location h6,
  section .card .desc .nationality h6 {
    display: inline-block;
    width: 55%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  section .card .desc .nationality i,
  .mask .info .banner .summary i {
    float: right;
    color: #cccccc;
    margin-top: .3rem;
    font-size: .7rem;
    cursor: pointer;
    padding-top: .2rem;
  }

  section .card .desc .nationality i.attention,
  .mask .info .banner .summary i.attention {
    color: #FF3B30;
  }

  section .card .desc .nationality i span,
  .mask .info .banner .summary i span {
    margin-left: .2rem;
    color: #cccccc;
  }

  section .load-more {
    background: #ffffff;
    margin: 1rem 0;
    height: 2rem;
    line-height: 1.6rem;
  }

  section .load-more h5 {
    display: inline-block;
    color: #FF5722;
  }

  section .about {
    text-align: justify;
    margin: 0 .1rem;
  }

  section .about h1 {
    padding: 1rem 0;
  }

  section .info {
    margin: 0;
    text-align: justify;
    background: #ffffff;
  }

  section .info .banner {
    width: 100%;
    position: relative;
  }

  section .info .banner .summary {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    background-color: rgba(255, 255, 255, 0.5);
    color: #000000;
    text-align: justify;
  }

  section .info .banner .summary h4 {
    display: inline-block;
    padding: 0 .3rem;
  }

  section .info .self-introduction {
    background: #ffffff;
    padding-left: .2rem;
    padding-right: .4rem;
    height: 8.5rem;
  }

  section .info .self-introduction h2 {
    margin: .5rem 0;
  }

  section .info .self-introduction h4 {
    height: 5.5rem;
    word-break: break-all;
    overflow: hidden;
    line-height: 1;
  }

  section .info .self-introduction .more {
    text-align: right;
    margin: .3rem 0 .5rem;
    color: #FF5722;
  }

  section .info .personal {
    margin-top: 1rem;
  }

  section .info .personal h2 {
    padding-top: .6rem;
    padding-left: .6rem;
    padding-bottom: .3rem;
  }

  section .info .personal h4 {
    display: inline-block;
  }

  section .info .personal h4.label {
    text-align: right;
    color: #A6A6A6;
    width: 30%;
  }

  section .info .personal h4.text {
    font-weight: bold;
  }

  section .info .personal .contact {
    background: #FFEEE8;
  }

  section .info .images {
    padding-top: .5rem;
  }

  section .filter {
    height: 100%;
    text-align: left;
  }

  section .filter .my-filter {
    min-height: 2rem;
    border-bottom: 1px solid #DDDDDD;
    background: #ffffff;
    position: fixed;
    z-index: 500;
    width: 100%;
    padding-left: .5rem;
    padding-bottom: .3rem;
    line-height: 1.2;
  }

  section .filter .my-filter h4 {
    display: inline-block;
  }

  section .filter .filter-info {
    display: inline;
  }

  section .filter .filter-info li {
    margin-left: .5rem;
    height: 1rem;
    background: #c6c6c6;
    border-radius: 1rem;
    line-height: .8rem;
    display: inline-block;
    padding: 0 .2rem;
  }

  section .filter .filter-info li h6 {
    display: inline-block;
  }

  section .filter .filter-info li i {
    font-size: .7rem;
    margin-left: .3rem;
    cursor: pointer;
    color: #A2A2A2;
  }

  section .filter .check-list {
    background: #ffffff;
    text-align: left;
    color: #000000;
    padding-left: 1rem;
  }

  section .filter .check-list .label {
    text-align: left;
    color: #000000;
    display: inline-block;
    padding: .5rem 0;
  }

  section .filter .check-list li {
    margin-bottom: .5rem;
  }

  section .filter .check-list li.selected {
    color: #B297FF;
  }

  section .filter .check-list .more {
    color: #FF5722;
  }

  section .filter .check-list .suburb {
    margin-top: .5rem;
    padding-left: 1rem;
    color: #c6c6c6;
  }

  footer {
    height: 2rem;
    width: 100%;
    background: #E4E4E4;
    line-height: 2rem;
  }

  footer .list-inline {
    color: #BEBEBE;
    height: 100%;
    font-weight: 200;
  }

  footer .list-inline li {
    margin: 0 1rem;
    cursor: pointer;
  }
</style>
