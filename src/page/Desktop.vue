<template>
  <div class="desktop container-fluid">
    <header>
      <div class="left">
        <h1 class="logo"><strong>Hot</strong><span>Gilr.</span>
          <p>co.nz</p></h1>
        <h1>Website Slogan</h1>
      </div>
      <div class="right">
        <div class="search">
          <div class="input-group">
              <span @click="search" class="input-group-addon" id="search-addon">
                <img src="../images/desktop/search.png" alt="">
              </span>
            <input type="text" class="form-control" placeholder="Search" aria-describedby="search-addon"
                   v-model.trim="searchModel">
          </div>
        </div>
      </div>
    </header>
    <section>
      <div class="check-list row">
        <div class="col-md-12">
          <div class="row">
            <div class="filter col-md-10">
              <div class="label">
                <h5>My Filter:</h5>
              </div>
              <ul class="filter-info list-inline">
                <li v-for="(item, index) in finalFilters" :key="index"><h6 v-text="item.filterName"></h6><i
                  @click="removeFilter(item.type)" class="fa fa-times"></i></li>
              </ul>
            </div>
            <div class="right col-md-2">
              <button><h6>Apply my filters</h6></button>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="check-item">
            <div class="label" @click="showAllLocations = !showAllLocations" style="cursor: pointer;">
              <h5>Location:</h5>
            </div>
            <ul class="check list-inline">
              <li @click="selected( 'Location', locationList, item, index)" :class="{selected: item.isChecked}"
                  v-for="(item, index) in locationList" :key="index"><h6 v-text="item.text"></h6></li>
            </ul>
          </div>
          <div class="clearfix"></div>
          <div class="check-item">
            <div class="label">
              <h5>Preference:</h5>
            </div>
            <ul class="check list-inline">
              <li @click="selected('Preference', preferenceList, item, index)" :class="{selected: item.isChecked}"
                  v-for="(item, index) in preferenceList" :key="index"><h6 v-text="item.text"></h6></li>
            </ul>
          </div>
          <div class="clearfix"></div>
          <div class="check-item">
            <div class="label">
              <h5>Nationality:</h5>
            </div>
            <ul class="check list-inline">
              <li @click="selected('Nationality', nationalityFilter, item, index)" :class="{selected: item.isChecked}"
                  v-for="(item, index) in nationalityFilter" :key="index"><h6 v-text="item.text"></h6></li>
            </ul>
            <div class="more" @click="showMore=!showMore"><h6 v-text="showMore?'Show Less':'More'"></h6></div>
          </div>
          <div class="clearfix"></div>
          <div v-if="showMore">
            <div class="check-item">
              <div class="label">
                <h5>Massage/Full Service:</h5>
              </div>
              <ul class="check list-inline" style="width: 80%">
                <li @click="selected('Massage/Full Service', massage, item, index)" :class="{selected: item.isChecked}"
                    v-for="(item, index) in massage" :key="index"><h6 v-text="item.text"></h6></li>
              </ul>
            </div>
            <div class="clearfix"></div>
            <div class="check-item">
              <div class="label">
                <h5>Age:</h5>
              </div>
              <ul class="check list-inline">
                <li @click="selected('Age', age, item, index)" :class="{selected: item.isChecked}"
                    v-for="(item, index) in age" :key="index"><h6 v-text="item.text"></h6></li>
              </ul>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="show-all-options">
            <h5>Show all options</h5>
          </div>
        </div>
      </div>
      <div class="card-list">
        <div>
          <ul class="tab list-inline">
            <li class="tab-item" :class="{selected: tabIndex==1}" @click="tabIndex=1"><h6>Most Recent</h6></li>
            <li class="tab-item" :class="{selected: tabIndex==2}" @click="tabIndex=2"><h6>Most Viewed</h6></li>
            <li class="tab-item" :class="{selected: tabIndex==3}" @click="tabIndex=3"><h6>Most Linked</h6></li>
            <li class="tab-item" :class="{selected: tabIndex==4}" @click="tabIndex=4"><h6>Promotion</h6></li>
          </ul>
        </div>
        <div>
          <div class="row">
            <div class="card col-xs-6 col-md-3"
                 :class="{first: index%4==0, four: index%4==3}" v-for="(item, index) in cardList" :key="index">
              <div>
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
          <h4>Load more</h4>
        </div>
      </div>
    </section>
    <footer>
      <ul class="list-inline">
        <li>
          <h4>Home</h4>
        </li>
        <li>
          <h4>About</h4>
        </li>
        <li>
          <h4>Contact us</h4>
        </li>
      </ul>
    </footer>
    <div class="mask" v-if="show">
      <div class="close">
        <a href="#" @click.prevent="show=!show"><img src="../images/desktop/detailPage_close.png" alt=""></a>
      </div>
      <ul class="control list-inline">
        <li @click="prev" class="prev">
          <img src="../images/desktop/detailPage_next_back.png" alt="">
        </li>
        <li @click="next" class="next">
          <img src="../images/desktop/detailPage_next.png" alt="">
        </li>
      </ul>
      <div class="info">
        <div class="banner">
          <img :src="showModel.pearsonShow" alt="">
          <div class="summary">
            <h2 class="nowrap-ellipsis" v-text="showModel.summary"></h2>
            <i @click="attention(showModel)" class="fa fa-heart" :class="{attention: showModel.isAttention}"
               aria-hidden="true"><span v-text="showModel.attention"></span></i>
          </div>
        </div>
        <div class="self-introduction">
          <div class="title">
            <h1 v-text="showModel.self_introduction_title"></h1>
          </div>
          <div class="content">
            <h4 v-text="showModel.self_introduction_content"></h4>
          </div>
          <div class="more"><h4>read more</h4></div>
        </div>
        <div class="contact">
          <h2>Contact</h2>
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
        <div class="about">
          <h2>About me</h2>
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
        <div class="images">
          <img style="width: 100%" :src="item.url" alt="" v-for="(item, index) in showModel.images" :key="index">
        </div>
      </div>
    </div>
    <div class="go-top">
      <a href="#" @click.prevent="goTop"><img src="../images/desktop/backToTop.png" alt=""></a>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'Desktop',
//    props: ['locationList', 'preferenceList', 'nationalityList', 'massage', 'age'],
    data () {
      return {
        tabIndex: 1,
        searchModel: '',
        show: false,
        showModel: null,
        index: 0,
        showMore: false,
        showAllLocations: false,
        filters: {
          'Location': [],
          'Preference': [],
          'Nationality': [],
          'Massage/Full Service': [],
          'Age': []
        }
      }
    },
    computed: {
      ...mapState ({
        locationList: state => state.locationList,
        preferenceList: state => state.preferenceList,
        nationalityList: state => state.nationalityList,
        massage: state => state.massage,
        age: state => state.age,
        cardList: state => state.cardList
      }),
      nationalityFilter () {
        return this.showMore ? this.nationalityList : this.nationalityList.slice (0, 9)
      },
      finalFilters () {
        let finalFilters = []

        for (let i = 0, keys = Object.keys (this.filters); i < keys.length; i++) {
          let key = keys[i],
            arr = this.filters[key]
          if (arr.length > 0) {
            finalFilters.push ({
              'type': key,
              'filterName': key + ': ' + (arr.sort ((a, b) => {
                return a.index - b.index
              }).map ((v, i, a) => {
                return v.filterName
              })).join (',')
            })
          }
        }

        return finalFilters
      }
    },
    methods: {
      search () {
        console.log (this.searchModel)
      },
      selected (type, items, item, index) {
        if (item.text == 'All') {
          items.map ((value, index, arr) => {
            value.isChecked = false
            this.filters[type] = []
          })
          item = items[0]
        } else {
          if (item.isChecked) {
            this.filters[type].splice(this.filters[type].findIndex((v) => {
              return v.filterName == item.text
            }), 1)
          }
          else {
            this.filters[type].push ({'index': index, 'filterName': item.text})
          }
        }

        item.isChecked = !item.isChecked
      },
      removeFilter (type) {
        this.filters[type] = []
      },
      loadMore () {
        this.$emit ('loadMore')
      },
      attention (item) {
        item.isAttention = !item.isAttention
        item.isAttention ? item.attention++ : item.attention--
      },
      showInfo (item, index) {
        console.log (item, index)
        this.show = true
        this.showModel = item
        this.index = index
      },
      next () {
        if (this.index >= this.cardList.length - 1) {
          this.index = 0
        } else {
          this.index++
        }
        this.showModel = this.cardList[this.index]
      },
      prev () {
        if (this.index <= 0) {
          this.index = this.cardList.length - 1
        } else {
          this.index--
        }
        this.showModel = this.cardList[this.index]
      },
      goTop () {
        $ ('body,html').animate ({scrollTop: 0}, 500);
      },
      getListByType(type) {
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

          case 'Massage/Full Service':
            items = this.massage
            break

          case 'Age':
            items = this.age
            break
        }

        return items
      }
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
    word-break: break-all;
  }

  .desktop header {
    height: 4rem;
    background: -webkit-linear-gradient(left, rgb(255, 86, 37), rgb(255, 61, 108)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, rgb(255, 86, 37), rgb(255, 61, 108)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, rgb(255, 86, 37), rgb(255, 61, 108)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgb(255, 86, 37), rgb(255, 61, 108)); /* 标准的语法 */
    padding: 0 5.5rem;
  }

  .desktop header .left {
    position: relative;
    float: left;
    height: 100%;
    width: 70%;
    line-height: 4rem;
    color: #ffffff;
  }

  .desktop header .left h1 {
    float: left;
    margin: 0;
    height: 100%;
    line-height: 4rem;
    font-weight: 300;
  }

  .desktop header .left .logo {
    line-height: 3rem;
    margin-right: 3rem;
  }

  .desktop header .left .logo p {
    margin: -1.8rem 0 0 0;
    text-align: left;
  }

  .desktop header .right {
    position: relative;
    float: right;
    height: 100%;
    width: 30%;
    line-height: 4rem;
  }

  .desktop header .right .search {
    position: absolute;
    top: 1rem;
    right: 0;
    height: 2rem;
    width: 70%;
    background-color: #ffffff;
    border-radius: 2rem;
  }

  .desktop header .right .search .input-group {
    border-radius: 2rem;
    height: 2rem;
  }

  .desktop header .right .search .input-group span {
    border-bottom-left-radius: 1rem;
    border-top-left-radius: 1rem;
    background: #fff;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  .desktop header .right .search .input-group input {
    border: none;
    height: 100%;
    margin: 0;
    padding: 0;
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  .desktop header .right .search input:focus {
    outline: none;
    border: none;
    box-shadow: 0 0 5px rgba(207, 220, 0, 0.4);
    border-radius: 2rem;
  }

  .desktop section {
    padding: 2rem 5rem 0 4.5rem;
    line-height: 2rem;
    color: #101010;
    text-align: justify;
  }

  .desktop section .filter .filter-info li {
    margin-left: .5rem;
    height: 1.3rem;
    background: #c6c6c6;
    border-radius: 1.3rem;
    line-height: 1.1rem;
  }

  .desktop section .filter .filter-info li h6 {
    display: inline-block;
  }

  .desktop section .filter .filter-info li i {
    font-size: .7rem;
    margin-left: .3rem;
    cursor: pointer;
    color: #A2A2A2;
  }

  .desktop section .check-list {
    background: #ffffff;
    padding-left: .5rem;
    margin: 0 .5rem;
  }

  .desktop section .check-list .label {
    /*display: inline-block;*/
    float: left;
    color: inherit;
    height: 100%;
  }

  .desktop section .check-list .label h5 {
    line-height: 2rem;
  }

  .desktop section .check-list .check {
    display: inline-block;
    color: inherit;
    height: 100%;
    width: 90%;
  }

  .desktop section .check-list .check li {
    margin: 0 .4rem;
    cursor: pointer;
  }

  .desktop section .check-list .check li.selected {
    color: #B297FF;
  }

  .desktop section .check-list .check-item {
    position: relative;
  }

  .desktop section .check-list .check-item .more {
    position: absolute;
    right: 1rem;
    bottom: .5rem;
    color: #FF5722;
    cursor: pointer;
  }

  .desktop section .check-list .show-all-options {
    margin: 1rem auto;
    text-align: center;
    color: #FF5722;
    cursor: pointer;
  }

  .desktop section .check-list .right {
    text-align: right;
    height: 2rem;
  }

  .desktop section .check-list .right button {
    width: 6rem;
    height: 2rem;
    border: none;
    background: #FF5722;
    color: #ffffff;
  }

  .desktop section .check-list .right button h6 {
    line-height: 1;
  }

  .desktop section .card-list {
    margin: 1rem auto;
  }

  .desktop section .card-list .tab {
    margin-left: .5rem;
  }

  .desktop section .card-list .tab-item {
    cursor: pointer;
    color: #B9B9B9;
  }

  .desktop section .card-list .tab-item.selected {
    color: #000000;
    border-bottom: .1rem solid #FF5722;
  }

  .desktop section .card-list .card {
    padding: .5rem;
    /*cursor: pointer;*/
  }

  /*.desktop section .card-list .first {
    padding-left: 0;
  }

  .desktop section .card-list .four {
    padding-right: 0;
  }*/

  .desktop section .card-list .card div {
    background: #ffffff;
  }

  .desktop section .card-list .card .desc {
    height: 4rem;
    padding-left: .5rem;
  }

  .desktop section .card-list .card .desc .location,
  .desktop section .card-list .card .desc .nationality,
  .desktop section .card-list .card .desc h5 {
    height: 30%;
    line-height: 1.4rem;
  }

  .desktop section .card-list .card .desc h5 {
    width: 40%;
  }

  .desktop section .card-list .card .desc h5 span.name {
    color: #FF5722;
  }

  .desktop section .card-list .card .desc h5 span.age {
    float: right;
  }

  .desktop section .card-list .card .desc .location img,
  .desktop section .card-list .card .desc .nationality img {
    width: .9rem;
  }

  .desktop section .card-list .card .desc .location h6,
  .desktop section .card-list .card .desc .nationality h6 {
    display: inline-block;
  }

  .desktop section .card-list .card .desc .nationality i,
  .desktop .mask .info .banner .summary i {
    float: right;
    margin-right: .5rem;
    color: #cccccc;
    margin-top: .3rem;
    font-size: .9rem;
    cursor: pointer;
  }

  .desktop section .card-list .card .desc .nationality i.attention,
  .desktop .mask .info .banner .summary i.attention {
    color: #FF3B30;
  }

  .desktop section .card-list .card .desc .nationality i span,
  .desktop .mask .info .banner .summary i span {
    margin-left: .2rem;
    color: #cccccc;
  }

  .desktop section .card-list .load-more {
    width: 60%;
    height: 2rem;
    line-height: 2rem;
    margin: 1rem auto 3rem;
    padding-top: .5rem;
    text-align: center;
    background: #ffffff;
    color: #FF5722;
    cursor: pointer;
  }

  .desktop footer {
    height: 2rem;
    width: 100%;
    background: #E4E4E4;
    line-height: 2rem;
  }

  .desktop footer .list-inline {
    color: #BEBEBE;
    height: 100%;
    font-weight: 200;
  }

  .desktop footer .list-inline li {
    margin: 0 1rem;
    cursor: pointer;
  }

  .desktop .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 500;
    background-color: rgba(0, 0, 0, 0.8);
    padding-top: 2rem;
  }

  .desktop .mask .info {
    width: 900px;
    height: 97%;
    background-color: #F5F5F5;
    margin: 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .desktop .mask .info .banner {
    width: 100%;
    height: 300px;
    position: relative;
  }

  .desktop .mask .info .banner .summary {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    background-color: rgba(255, 255, 255, 0.5);
    color: #000000;
    text-align: justify;
    padding: 0 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .desktop .mask .info .banner .summary h2 {
    display: inline-block;
    width: 90%;
  }

  .desktop .mask .info .banner .summary i, .desktop .mask .info .banner .summary i span {
    color: #000000;
    font-size: 1.2rem;
  }

  .desktop .mask .info .self-introduction {
    background-color: #ffffff;
    height: 14rem;
    line-height: 1.5;
    overflow: hidden;
  }

  .desktop .mask .info .self-introduction .title,
  .desktop .mask .info .self-introduction .content {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .desktop .mask .info .self-introduction .title {
    padding-top: 1rem;
    height: 4rem;
  }

  .desktop .mask .info .self-introduction .content {
    padding-bottom: 1rem;
    text-align: justify;
    height: 8rem;
    overflow: hidden;
  }

  .desktop .mask .info .self-introduction .content h4 {
    height: 100%;
    overflow: hidden;
    line-height: 1.3;
  }

  .desktop .mask .info .self-introduction .more {
    text-align: right;
    padding-right: 2rem;
    color: #FF5722;
  }

  .desktop .mask .info .contact,
  .desktop .mask .info .working,
  .desktop .mask .info .fees,
  .desktop .mask .info .about {
    float: left;
    width: 19.5rem;
    height: 16rem;
    text-align: justify;
  }

  .desktop .mask .info .contact {
    background: #FFEEE8;
  }

  .desktop .mask .info .working,
  .desktop .mask .info .fees,
  .desktop .mask .info .about {
    background: #ffffff;
  }

  .desktop .mask .info .working {
    margin: 1rem 2rem 1rem 0;
  }

  .desktop .mask .info .fees {
    margin: 0 2rem 2rem 0;
    height: 18rem;
  }

  .desktop .mask .info .contact {
    margin: 1rem 1rem 1rem 2rem;
  }

  .desktop .mask .info .about {
    margin: 0 1rem 1rem 2rem;
    height: 18rem;
  }

  .desktop .mask .info .contact h2,
  .desktop .mask .info .working h2,
  .desktop .mask .info .contact h4,
  .desktop .mask .info .working h4,
  .desktop .mask .info .fees h2,
  .desktop .mask .info .about h2,
  .desktop .mask .info .fees h4,
  .desktop .mask .info .about h4 {
    line-height: 2;
  }

  .desktop .mask .info .contact h2,
  .desktop .mask .info .working h2,
  .desktop .mask .info .fees h2,
  .desktop .mask .info .about h2 {
    text-align: center;
  }

  .desktop .mask .info .contact h4,
  .desktop .mask .info .working h4,
  .desktop .mask .info .fees h4,
  .desktop .mask .info .about h4 {
    display: inline-block;
  }

  .desktop .mask .info .images {
    margin: 0 2rem 2rem;
  }

  .desktop .mask .info .images img {
    width: 100%;
    display: block;
    margin-top: 1rem;
  }

  .desktop h4.label {
    text-align: right;
    color: #A6A6A6;
    width: 30%;
  }

  .desktop .mask .control {
    position: absolute;
    width: 100%;
    /*left: 10%;*/
    top: 45%;
  }

  .desktop .mask .control li {
    cursor: pointer;
  }

  .desktop .mask .control .prev {
    float: left;
  }

  .desktop .mask .control .next {
    float: right;
  }

  .desktop .mask .close {
    opacity: 1;
  }

  .desktop .go-top {
    position: fixed;
    right: .5rem;
    bottom: 10rem;
  }
</style>
