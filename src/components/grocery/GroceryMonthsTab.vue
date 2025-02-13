<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  months: {
    type: Array<number>,
    required: true
  }
});

type Month = {
  monthName: string;
  isCurrentMonth: Boolean;
}

const formattedMonths: Array<Month> = computed(() => {
  const formattedMonths: Array<Month> = [];
  props.months.forEach(m => {
    const date = new Date();
    date.setMonth(m);

    formattedMonths.push({
      monthName: date.toLocaleString('fr-FR', { month: 'short' }),
      isCurrentMonth: new Date().getMonth() === m
      });
  });

  return formattedMonths;
});

const toMonthName = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString('fr-FR', {
    month: 'short'
  });
};
</script>
<template>
  <div class="grocery-months-tab">
    <div 
      v-for="(month, index) in formattedMonths" 
      :key="index" 
      :class="[
        'grocery-months-tab__item', 
        { 'grocery-months-tab__item--emphasised' : month.isCurrentMonth }
      ]"
    >
      {{ month.monthName }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.grocery-months-tab {
  font-size: 8px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  column-gap: 5px;
  row-gap: 5px;
}

.grocery-months-tab__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: $quaternary;
  color: #fff;
  text-transform: uppercase;
}

.grocery-months-tab__item--emphasised {
  background-color: #fff;
  border: 3px solid $quaternary;
  color: $quaternary;
}
</style>
