<script setup>
import ConvertItem from '@/components/ConvertItem.vue'
import ConvertRate from '@/components/ConvertRate.vue'

import {useStore} from 'vuex';
import {computed} from 'vue';

const store = useStore()

store.commit('setCurrencyFromCode', {code: 'USD', index: 0})
store.commit('setCurrencyFromCode', {code: 'EUR', index: 1})
store.dispatch('fetchRate')

const firstCurrency = computed(() => store.state.selectedCurrency[0])
const secondCurrency = computed(() => store.state.selectedCurrency[1])

</script>

<template>
  <div class="convert-popup">
    <convert-item title="Amount i have"
                  :showMyAmount="true"
                  :selectedCurrencyOrder="0"
                  :selectedCurrency="firstCurrency"
    />
    <convert-item title="I need"
                  :selectedCurrencyOrder="1"
                  :selectedCurrency="secondCurrency"
    />
    <convert-rate />
  </div>
</template>

<style lang="scss">
.convert-popup {
  max-width: 580px;
  width: 100%;
  background: #FFFFFF;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  border-top: 4px solid cornflowerblue;
  padding: 20px;
  border-radius: 4px;
}
</style>
