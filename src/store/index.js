import {createStore} from 'vuex';
import axios from 'axios'

const store = createStore({
  state: {
    currencyList: [
      {
        code: "USD",
        myAmount: 3745,
        value: 0,
      },
      {
        code: "EUR",
        myAmount: 453,
        value: 0,
      },
      {
        code: "BTC",
        myAmount: 4,
        value: 0,
      },
      {
        code: "ETH",
        myAmount: 22,
        value: 0,
      }],
    selectedCurrency: [{}, {}],
    currencyValue: [0, 0],
    total: 0,
    rate: 1,
    rateCode: '',
    isFromFirstToSecond: true,
    rateUSD: 1,
  },
  getters: {
    getCurrencyList(state) {
      return state.currencyList
    },
    getCurrencyFromIndex(state) {
      return state.selectedCurrency[0]
    },
    getTotalNumber(state) {
      return (state.currencyValue[0] * state.rateUSD * 1.01).toFixed(2)
    }
  },
  mutations: {
    setCurrencyFromCode(state, payload) {
      state.selectedCurrency[payload.index] = state.currencyList.find(el => el.code === payload.code)
    },
    setValue(state, payload) {
      state.currencyValue[payload.index] = payload.value
    },
    makeCorrelationFromIndex(state, index) {
      const otherIndex = index === 0 ? 1 : 0
      if (state.selectedCurrency[otherIndex].code === state.rateCode) {
        state.currencyValue[otherIndex] = state.currencyValue[index] * state.rate
      } else {
        state.currencyValue[otherIndex] = state.currencyValue[index] / state.rate
      }
    },
    setRate(state, value) {
      state.rate = value
    },
    setRateCode(state, value) {
      state.rateCode = value
    },
    setRateUSD(state, value) {
      state.rateUSD = value
    }
  },
  actions: {
    fetchRate(context) {
      if (context.state.selectedCurrency[0].code === context.state.selectedCurrency[1].code) {
        context.commit('setRate', 1)
        return
      }
      if (context.state.selectedCurrency[0].code && context.state.selectedCurrency[1].code ) {
        const code1 = context.state.selectedCurrency[0].code
        const code2 = context.state.selectedCurrency[1].code
        let param = ''
        if (['EUR', 'USD'].includes(code1) && ['EUR', 'USD'].includes(code2)) {
          param = 'EURUSD'
          context.commit('setRateCode', code1 === 'EUR' ? 'EUR' : 'USD')
        } else if (code1 === 'BTC') {
          param = 'TBTC'+ code2
          context.commit('setRateCode', 'BTC')
        } else if (code2 === 'BTC') {
          param = 'TBTC'+ code1
          context.commit('setRateCode', code1)
        } else if (code1 === 'ETH') {
          param = 'ETH'+ code2
          context.commit('setRateCode', 'ETH')
        } else if (code2 === 'ETH') {
          param = 'ETH'+ code1
          context.commit('setRateCode', code1)
        }
        return axios.get(`https://api.kraken.com/0/public/Ticker?pair=${param}`).then(data => {
          if (data.data.result) {
            context.commit('setRate', Number(Object.values(data.data.result)[0].a[0]))
            context.dispatch('fetchRateUSD')
          }
        }).catch(error => {
          console.log('Error', error)
        })
      }
    },
    fetchRateUSD (context) {
      const finalCode = context.state.selectedCurrency[0].code === 'BTC'
        ? 'TBTC'
        : context.state.selectedCurrency[0].code
      axios.get(`https://api.kraken.com/0/public/Ticker?pair=${finalCode}USD`).then(data => {
        if (data.data.result) {
          context.commit('setRateUSD', Number(Object.values(data.data.result)[0].a[0]))
        }
      })
    },
  }
})

export default store
