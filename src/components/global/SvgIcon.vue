<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { computed }  from 'vue';

const { name } = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '24px',
    validator: (val:string) => Object.keys(['12px', '24px', '32px', '48px']).includes(val)
  },
});

const dynamicComponent = computed(() => {
    // See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations for supported dynamic import formats
    return defineAsyncComponent(() => import(`./../../assets/icons/${name}.svg?component`));
});
</script>
<template>
  <component
    :is="dynamicComponent"
    class="svg-icon"
    :width="size"
    :height="size"
  />
</template>