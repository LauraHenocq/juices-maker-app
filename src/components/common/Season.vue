<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  }
});
</script>
<template>
  <div class="season-chip">
    <p class="season-chip__label">{{ label }}</p>
  </div>
</template>
<style lang="scss" scoped>
.season-chip {
  background-color: $quaternary;
  border-radius: 50px;
  width: fit-content;
  padding: 10px;

  &__label {
    margin: 0;
    color: white;
  }
}
</style>