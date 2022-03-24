<script setup>
import Dropdown from './Dropdown.vue'
import {useStore} from 'vuex';
import {computed} from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  showMyAmount: {
    type: Boolean,
    default: false,
  },
  selectedCurrency: {
    type: Object,
    default: () => ({})
  },
  selectedCurrencyOrder: {
    type: Number,
    default: 0
  }
})

const store = useStore()

const inputValue = computed(() => store.state.currencyValue[props.selectedCurrencyOrder])

const handleInput = e => {
  store.commit('setValue', {index: props.selectedCurrencyOrder, value: Number(e.target.value)})
  store.commit('makeCorrelationFromIndex', props.selectedCurrencyOrder)
}

const changeSelectedItem = (code) => {
  store.commit('setCurrencyFromCode', {code: code, index: props.selectedCurrencyOrder})
  store.dispatch('fetchRate').then(() => {
    store.commit('makeCorrelationFromIndex', props.selectedCurrencyOrder)
  })
}
</script>

<template>
  <div class="convert-item">
    <div class="convert-item__info">
      <h6 class="convert-item__title">{{ props.title }}</h6>
      <span class="convert-item__my" v-if="props.showMyAmount">
        {{ props.selectedCurrency.myAmount }} {{props.selectedCurrency.code}}
      </span>
    </div>
    <div class="convert-item__controls">
      <div class="convert-item__select-wrapper">
        <dropdown :selectedCode="props.selectedCurrency.code" @select-item="changeSelectedItem" />
      </div>
      <div class="convert-item__input">
        <input type="number" :value="inputValue" @input="handleInput">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.convert-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &__info {
    padding-bottom: 20px;
    display: flex;
  }

  &__title {
    font-size: 22px;
    margin-bottom: 0;
    margin-right: 0;
    margin-top: 0;
    margin-right: auto;
  }

  &__my {
    margin-left: auto;
  }

  &__controls {
    display: flex;
    align-items: center;
  }

  &__select-wrapper {
    width: 100%;
    margin-right: 10px;
  }

  &__input {
    input {
      height: 30px;
      border-radius: 4px;
      width: 70px;
      background: #FAFAFA;
      border: 2px solid #EDEDEC;
      vertical-align: middle;
      text-align: center;

      -moz-appearance: textfield;
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      &:focus {
        border: 2px solid #6C9BE2;
      }
    }
  }

}
</style>
