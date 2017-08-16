import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  width: 0,
  isLoading: false,
  mode: 'desktop',
  locationList: [
    {text: 'All', isChecked: true}, {text: 'Auckland', isChecked: false}, {
      text: 'Chirstchurch',
      isChecked: false
    },
    {text: 'Wellington', isChecked: false}, {text: 'Northland', isChecked: false}, {
      text: 'Hamilton',
      isChecked: false
    },
    {text: 'Central Northisland', isChecked: false}, {text: 'Tauranga', isChecked: false}, {
      text: 'South Island',
      isChecked: false
    },
    {text: 'CBD', isChecked: false}, {text: 'Suburb2', isChecked: false}, {text: 'Suburb3', isChecked: false},
    {text: 'Suburb4', isChecked: false}, {text: 'Suburb5', isChecked: false}
  ],
  preferenceList: [
    {text: 'All', isChecked: true}, {text: 'Love Grils', isChecked: false}, {text: 'Love Guys', isChecked: false},
    {text: 'Love Transexuals', isChecked: false}, {
      text: 'Couples',
      isChecked: false
    }, {text: 'Bondage & Discipline', isChecked: false},
    {text: 'Dominatrix & Mistress', isChecked: false}
  ],
  nationalityList: [
    {text: 'All', isChecked: true}, {text: 'European', isChecked: false}, {text: 'Chinese', isChecked: false},
    {text: 'Japanese', isChecked: false}, {text: 'Thai', isChecked: false}, {text: 'Korean', isChecked: false},
    {text: 'Maori', isChecked: false}, {text: 'Pacific', isChecked: false}, {text: 'Islander', isChecked: false},
    {text: 'Country 1', isChecked: false}, {text: 'Country 2', isChecked: false}, {
      text: 'Country 3',
      isChecked: false
    },
    {text: 'Country 4', isChecked: false}, {text: 'Country 5', isChecked: false}, {
      text: 'Country 6',
      isChecked: false
    },
    {text: 'Country 7', isChecked: false}, {text: 'Country 8', isChecked: false}, {
      text: 'Country 9',
      isChecked: false
    },
    {text: 'Country 10', isChecked: false}
  ],
  massage: [{text: 'All', isChecked: true}, {text: 'Full Service', isChecked: false}, {text: 'Sensual Massage', isChecked: false}, {text: 'Girlfriend Experience', isChecked: false}],
  age: [{text: 'All', isChecked: true}, {text: '18-25', isChecked: false}, {text: '26-30', isChecked: false}, {text: '31-35', isChecked: false}, {text: '36-40', isChecked: false}, {text: '40+', isChecked: false}],
  cardList: [],
  about: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minimveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nullapariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpaqui officia deserunt mollit anum id estlaborum."'
}
export default new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING (state, payload) {
      state.isLoading = payload.isLoading
    },
    UPDATE_MODE (state, payload) {
      state.mode = payload.mode
    },
    UPDATE_CARD_LIST (state, payload) {
      state.cardList.push(...payload.cardList)
    },
    UPDATE_WIDTH (state, payload) {
      state.width = payload.width
    }
  }
})
