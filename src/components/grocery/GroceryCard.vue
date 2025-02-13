<script setup lang="ts">
import { Grocery } from '@/domain/Grocery'
import { ref, computed }  from 'vue';
import GroceryMonthsTab from '@/components/grocery/GroceryMonthsTab.vue';
  
const { grocery, border } = defineProps({
  grocery: {
    type: Grocery,
    required: true
  },
  border: {
    type: Boolean
  }
})

const local = computed((): string => {
  return grocery.local ? 'Local' : 'Non local'
})
const image = computed((): string => {
  return grocery.image
})
const name = computed((): string => {
  return `-- ${grocery.name} --`
})
const type = computed((): string => {
  return grocery.type
})
const months = computed((): Array<number> => {
  return grocery.months
});

const goToRecipes = computed(() => {
    // url to all recipes containing at least current grocery
    return `/recipes?grocery=${grocery.name.toLowerCase().replaceAll(' ', '-')}`
})

const isCardHover = ref(false);

</script>
<template>
    <router-link :to="goToRecipes" :class="['grocery-card', { 'grocery-card--border': border }]" @mouseover="isCardHover = true" @mouseleave="isCardHover = false">
      <img
        class="grocery-card__picture"
        :src="image"
        alt="Photo du fruit ou du légume"
      />
      <div class="grocery-card__type">
        <SvgIcon name="apple" />
        <div>
          {{ type }}
        </div>
      </div>
      <div class="grocery-card__local">
        <SvgIcon name="map" />
        <div>
          {{ local }}
        </div>
      </div>
      <div class="grocery-card__content">
        <div v-if="isCardHover" class="grocery-card__content__button">
            Voir toutes les recettes →
        </div>
        <div v-else>
          <h3 class="grocery-card__content__title">
          {{ name }}
        </h3>
        <GroceryMonthsTab :months="months" />  
        </div>
      </div>
    </router-link>
  </template>
  <style scoped lang="scss">
  .grocery-card {
    position: relative;
    display: grid;
    grid-template-columns: 5fr 4fr;
    grid-template-rows: auto auto 1fr;
    align-items: stretch;
    column-gap: 16px;
    row-gap: 32px;
    padding: 32px 16px;
    background-color: #fff;
    border-radius: $radius;
    height: 312px;
    max-height: 370px;
    grid-template-areas:
      'picture picture'
      'picture picture'
      'type local'
      'content content';
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
    transition: all 100ms;
  }

  .grocery-card:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

.grocery-card:hover.grocery-card::after {
    position: absolute;
    border-radius: $radius $radius;
    background-color: $secondary;
    opacity: 0.65;
    color: #fff;
    height: 100%;
    width: 100%;
    transition: all 300ms;
    @include keyframes(fadeIn) {
        0% { 
        opacity: 0; 
        }
        100% { 
        opacity: 0.65; 
        }
    }
    @include animate(fadeIn, 1s, linear, 1);
}

  .grocery-card__type:hover, .grocery-card__local:hover, .grocery-card__content:hover {
    transform: scale(1.05);
  }
  
  .grocery-card::before {
    position: absolute;
    content: '';
    top: -8px;
    left: 8px;
    border: 1px solid $tertiary;
    border-radius: $radius;
    opacity: 0.7;
    height: 100%;
    width: 100%;
    background-position: bottom;
  }
  .grocery-card__picture {
    grid-area: picture;
    border-bottom-left-radius: $radius;
    border-top-left-radius: $radius;
    width: 144px;
    height: 144px;
    object-fit: contain;
    margin: auto;
    transition: all 300ms;
  }
  .grocery-card:hover .grocery-card__picture {
    transform: scale(1.2);
  }
  .grocery-card__type, .grocery-card__local {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: $primary;
    font-size: 12px;
  }
  
  .grocery-card__type {
    grid-area: type;
  }
  
  .grocery-card__local {
    grid-area: local;
  }
  .grocery-card__content {
    grid-area: content;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 8px;
  }
  .grocery-card__content__title {
    color: $secondary;
    font-size: 18px;
    font-weight: normal;
    text-transform: uppercase;
    margin: 0;
    word-break: break-word;
  }

  .grocery-card__content__button {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    color: $dark;
    text-transform: uppercase;
    text-shadow: 3px 3px 5px $secondary;
  }
  .grocery-card--border {
    border: 1px solid $quaternary;
  }
  .grocery-card--width {
    max-width: 400px;
  }
  
  @media screen and (max-width: 960px) {
    .grocery-card {
      row-gap: 24px;
    }
    .grocery-card__content__title {
      letter-spacing: 5px;
      font-size: 18px;
    }
  }
  
  @media screen and (max-width: 600px) {
    .grocery-card__picture {
      animation: zoomInAndOut 4s linear infinite;
    }
  }
  
  @keyframes zoomInAndOut {
    to {
      transform: scale(1.2)
    }
  }
  </style>
  