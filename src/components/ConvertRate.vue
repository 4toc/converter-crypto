<script setup>
import {useStore} from 'vuex';
import {computed} from 'vue';

const store = useStore()

const totalNumber = computed(() => store.getters.getTotalNumber)
</script>

<template>
 <div class="convert-rate">
   <div class="convert-rate__title">Rate:</div>
   <div class="convert-rate__total">{{totalNumber}}$</div>
 </div>
</template>

<style lang="scss">
.convert-rate {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 15px;
  background: linear-gradient(rgba(228, 243, 254, 0.9), rgba(228, 243, 254, 0.3));

  &__title {
    font-size: 24px;
  }

  &__total {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
