<script setup lang="ts">
import { juicesService } from '@/services';
import type { Grocery } from '@/domain/Grocery';
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import GroceryCardsList from '@/components/grocery/GroceryCardsList.vue';
import CommonTitle from '@/components/common/Title.vue';
import CommonButton from '@/components/common/Button.vue';

const limit: Ref<number> = ref(6);
const isPending: Ref<Boolean> = ref(false);
const isError: Ref<Boolean> = ref(false);
const groceryList: Ref<Grocery[] | []> = ref([]);

async function getGroceryList(): Promise<void> {
  isError.value = false;

  const params = {
    limit: limit.value
  };

  isPending.value = true;
  try {
    groceryList.value = await juicesService.getGroceryList(params);
  } catch (err) {
    isError.value = true;
    throw err;
  } finally {
    isPending.value = false;
  }
};

const changeLimit = async () => {
  limit.value += 6;
  await getGroceryList();
};

onMounted(async () => {
  await getGroceryList();
});
</script>
<template>
  <div class="grocery-list">
    <CommonTitle>
      Les fruits et légumes de saison
    </CommonTitle>
    <div v-if="isPending">
      <p>Chargement en cours...</p>
    </div>
    <div v-else-if="isError">
      <p>Une erreur est survenue lors du chargement des données</p>
    </div>
    <div v-else>
      <GroceryCardsList :grocery-list="groceryList" border />
      <div class="grocery-list__see-more">
        <CommonButton @click="changeLimit">
          Voir plus
        </CommonButton>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.grocery-list {
  &__see-more {
    margin: 20px 0;
    display: flex;
    justify-content: center;
  }
}
</style>
  