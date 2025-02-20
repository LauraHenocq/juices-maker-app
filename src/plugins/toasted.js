import { v4 as uuidv4 } from 'uuid';
import { h, render } from 'vue';

import Toaster from '@/components/ui/Toaster.vue';

const Toasted = {
  install(app) {
    let openedToast = null;
    const methods = {
      show(color, label, timeout) {
        const vNode = h(Toaster, { label, color, timeout, key: uuidv4() });
        const container = document.querySelector('div#toaster-container');
        if (!container) {
          console.log('No toaster container found in DOM');
          return;
        }
        render(vNode, container);
        openedToast = vNode;
      },
      close() {
        if (openedToast && !openedToast.component.proxy.timeoutValue) {
          openedToast.component.proxy.close();
        }
      },
      error(label, timeout) {
        this.show('red', label, timeout);
      },
      success(label, timeout) {
        this.show('green', label, timeout);
      },
      warning(label, timeout) {
        this.show('orange', label, timeout);
      },
    };

    app.config.globalProperties.$toasted = methods;
    app.$toasted = methods;
    app.provide('toasted', methods);
  },
};

export default Toasted;
