<template>
  <TheNavbar
    :title="
      route.params.id
        ? `${route.meta.title} ${route.params.id}`
        : route.meta.title
    " />
  <RouterView />
  <VSidebar :offcanvasPlacement="'start'" ref="sidebarLeft">
    <template #title>App Routes</template>
    <template #default="{ close }">
      <SunCoRoutes @close="handleClose" />
    </template>
  </VSidebar>
  <TheFooter />
</template>

<script setup>
  import TheNavbar from '@/components/TheNavbar.vue';
  import SunCoRoutes from '@/components/SunCoRoutes.vue';
  import VSidebar from '@/components/VSidebar.vue';
  import TheFooter from '@/components/TheFooter.vue';
  import { useRoute } from 'vue-router';
  import { sidebarLeft } from '@/composables/useWidgetButtons';

  const route = useRoute();

  const handleClose = () => {
    sidebarLeft.value?.closeSidebar();
  };

  defineProps({
    title: {
      type: String,
      required: false,
      default: 'Acme corp Dashboard',
    },
  });
</script>
