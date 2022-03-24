<script setup>
import {useStore} from 'vuex'
import {computed, ref} from 'vue';

const props = defineProps({
  selectedCode: String
})

const state = useStore()

const isActive = ref(false)

const currencyList = computed(() => state.getters.getCurrencyList)

const emit = defineEmits(['selectItem'])
const handleClickItem = (code) => {
  emit('selectItem', code)
}

const clickDropdown = () => {
  isActive.value = !isActive.value
}
</script>

<template>
  <div class="dropdown"
       @click.stop="clickDropdown">
    <div class="dropdown__select">
      <span>{{props.selectedCode}}</span>
    </div>
    <ul v-if="isActive" class="dropdown__menu">
      <li v-for="currency in currencyList"
          :key="currency.code"
          class="dropdown__li"
          :class="{'dropdown__li--active': props.selectedCode === currency.code}"
          @click="handleClickItem(currency.code)"
      >
        {{currency.code}}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">

.dropdown {
  display: inline-block;
  width: 150px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 0 2px rgb(204, 204, 204);
  transition: all .5s ease;
  position: relative;
  font-size: 14px;
  color: #474747;
  height: 100%;
  text-align: left;

  &:hover {
    box-shadow: 0 0 4px rgb(204, 204, 204);
    background-color: #f8f8f8;

  }

  &__select {
    cursor: pointer;
    display: block;
    padding: 10px
  }

  &__menu {
    position: absolute;
    background-color: #fff;
    width: 100%;
    left: 0;
    margin-top: 1px;
    box-shadow: 0 1px 2px rgb(204, 204, 204);
    border-radius: 0 1px 2px 2px;
    overflow: hidden;
    max-height: 144px;
    overflow-y: auto;
    z-index: 9;
    padding: 0;
    list-style: none;
  }

  &__li  {
    padding: 10px;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: #f2f2f2
    }

    &--active {
      background: lightgray;
    }
  }
}
</style>
