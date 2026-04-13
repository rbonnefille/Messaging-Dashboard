<template>
  <div class="container text-center">
    <LoginForm :form-message-title="formTitle" />
    <WidgetButtons />
  </div>
</template>

<script setup>
  import LoginForm from '@/components/LoginForm.vue';
  import { onMounted, computed } from 'vue';
  import { useUserStore } from '@/stores/store';
  import { storeToRefs } from 'pinia';
  import WidgetButtons from '@/components/WidgetButtons.vue';
  import { initializeWidgets } from '@/composables/useWidgetInitializer';

  const userStore = useUserStore();

  const { loginWidgets, changeWidgetOpenedStatus } = userStore;
  const { authenticated, connectedAs } = storeToRefs(userStore);

  const defaultFormTitle = 'Log back in to sync your past conversations';
  const formTitle = computed(() => {
    return authenticated.value ? connectedAs : defaultFormTitle;
  });

  const setupZendeskEventListeners = () => {
    window.zE('messenger:on', 'open', () => {
      changeWidgetOpenedStatus(true);
    });
    window.zE('messenger:on', 'close', () => {
      changeWidgetOpenedStatus(false);
    });
  };

  onMounted(async () => {
    await initializeWidgets();
    loginWidgets();
    // wait for window.zE to be available before setting up event listeners
    setInterval(() => {
      if (window.zE) {
        setupZendeskEventListeners();
        clearInterval(this);
      }
    }, 100);
  });
</script>
