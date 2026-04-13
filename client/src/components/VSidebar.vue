<template>
  <div
    :class="['offcanvas ', `offcanvas-${offcanvasPlacement}`, { show: isOpen }]"
    :style="{ visibility: isOpen ? 'visible' : 'hidden' }"
    data-bs-scroll="true"
    tabindex="-1"
    id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
        <slot name="title">Sidebar</slot>
      </h5>
      <button
        type="button"
        class="btn-close"
        @click="closeSidebar"
        aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <slot>
        <p>Sidebar content goes here</p>
      </slot>
    </div>
  </div>

  <!-- Backdrop -->
  <div
    id="test"
    v-if="isOpen"
    class="offcanvas-backdrop fade show"
    @click="closeSidebar"></div>
</template>

<script setup>
  import { ref } from 'vue';

  defineProps({
    offcanvasPlacement: {
      type: String,
      default: 'end', // 'start', 'end', 'top', 'bottom'
    },
  });

  const isOpen = ref(false);

  const openSidebar = () => {
    isOpen.value = true;
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    isOpen.value = false;
    document.body.style.overflow = '';
  };

  // Expose methods to parent components
  defineExpose({
    openSidebar,
    closeSidebar,
  });

  // Close sidebar on Escape key
  const handleEscape = event => {
    if (event.key === 'Escape' && isOpen.value) {
      closeSidebar();
    }
  };

  // Add event listener on mount
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleEscape);
  }

  // Cleanup on unmount
  import { onUnmounted } from 'vue';
  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    }
  });
</script>
