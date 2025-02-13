import { readonly, ref } from 'vue';

export function useState(initialState: void) {
  const state = ref(initialState);
  const setState = (newState: void) => {
    state.value = newState;
  };
  
  return [readonly(state), setState];
}