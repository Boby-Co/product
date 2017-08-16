<template>
  <div class="mobile container-fluid">
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
          <div class="summary">
            <h4 v-text="showModel.summary"></h4>
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
    </section>
    <footer v-if="header.isHome||header.isSearch">
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

  export default {
    name: 'Mobile',
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
        index: 0
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
      cardListFilter() {
        let len = this.cardList.length / 16 * 6
        return this.cardList.slice(0, len)
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
        this.header = {isHome: false, isFilter: false, isSearch: false, isInfo: true}
        this.showModel = item
        this.index = index
      },
      attention (item) {
        item.isAttention = !item.isAttention
        item.isAttention ? item.attention++ : item.attention--
      },
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
    margin: 2rem 1rem 1rem;
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
    margin-top: 1rem;
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
    margin: 0 -1rem;
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
    padding: 0 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  section .info .banner .summary h4 {
    display: inline-block;
    padding: 0 .3rem;
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
