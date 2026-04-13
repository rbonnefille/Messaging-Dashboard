<template>
  <nav class="navbar shadow-lg p-3 mb-3 text-white">
    <div class="container-fluid d-flex">
      <span class="d-flex justify-content-start">
        <Bars3Icon
          style="height: 40px"
          class="btn btn-sm text-white"
          @click="openLeftSidebar"
          aria-label="Open menu" />
      </span>
      <div class="d-flex justify-content-center flex-grow-1 align-items-center">
        <RouterLink class="btn btn-sm text-white" to="/">Home</RouterLink>
        <h2>
          {{
            userStore.authenticated
              ? `Welcome back ${userStore.external_id}`
              : `${title}`
          }}
        </h2>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { useUserStore } from '@/stores/store';
  import { storeToRefs } from 'pinia';
  import { sidebarLeft } from '@/composables/useWidgetButtons';
  import { Bars3Icon } from '@heroicons/vue/24/outline';

  const userStore = useUserStore();
  const { changeWidgetOpenedStatus } = userStore;
  const { widgetOpened } = storeToRefs(userStore);

  const openLeftSidebar = () => {
    if (widgetOpened.value) {
      changeWidgetOpenedStatus(false);
      window.zE('messenger', 'close');
    }
    sidebarLeft.value?.openSidebar(sidebarLeft);
  };
  defineProps({
    title: {
      type: String,
      required: false,
      default: 'Acme corp Dashboard',
    },
  });
</script>
