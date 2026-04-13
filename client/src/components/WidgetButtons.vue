<template>
  <h4 v-if="isSuncoWidgetVisible" class="mt-4">SunCo Web</h4>
  <VButtonGroup
    label="SunCo Actions"
    :buttons="suncoButtonsFiltered"
    :className="isSuncoWidgetVisible ? 'widgetBtn' : 'widgetBtn mt-2'" />

  <h4 class="mt-5">Zendesk Web</h4>
  <div id="zendesk-web">
    <VButtonGroup
      label="Zendesk Actions"
      :buttons="zendeskButtons"
      className="widgetBtn" />

    <VLabel name="Widget Locale" class="mt-5" />

    <VSelect
      optionHint="Select locale"
      v-model="locales.selected"
      :options="locales.options"
      @update:modelValue="updateWidgetLocale"
      class="w-auto d-inline-flex mt-2 rounded-4 mx-2" />

    <VLabel name="Change Cookie Consent" class="mt-5" />

    <VSelect
      optionHint="Change Cookie Consent"
      v-model="cookieConsent.selected"
      :options="cookieConsent.options"
      @update:modelValue="updateCookieConsent"
      class="w-auto d-inline-flex mt-2 rounded-4 mx-2" />
  </div>

  <h4 class="mt-2">Tools</h4>
  <VButtonGroup
    label="Tools Actions"
    :buttons="toolsButtons"
    className="toolsBtn" />

  <VMetadataDisplay
    v-if="metadataSet"
    :metadataCode="zendeskButtons.setMetadata.code" />
  <VMetadataDisplay
    v-else-if="customerMetadataSet"
    :metadataCode="zendeskButtons.setCustomerMetadata.code" />

  <VSidebar :offcanvasPlacement="'end'" ref="sidebarRight">
    <template #title>Embedded mode</template>
    <template #default>
      <div id="messenger-widget" style="width: 100%; height: 100%"></div>
    </template>
  </VSidebar>
</template>

<script setup>
  import VSelect from '@/components/VSelect.vue';
  import VSidebar from '@/components/VSidebar.vue';
  import VLabel from '@/components/VLabel.vue';
  import VButtonGroup from '@/components/VButtonGroup.vue';
  import VMetadataDisplay from '@/components/VMetadataDisplay.vue';
  import { reactive, computed } from 'vue';
  import {
    toolsButtons,
    suncoButtons,
    zendeskButtons,
    updateWidgetLocale,
    updateCookieConsent,
    metadataSet,
    customerMetadataSet,
    sidebarRight,
    isSuncoWidgetVisible,
  } from '@/composables/useWidgetButtons';

  const suncoButtonsFiltered = computed(() => {
    if (!isSuncoWidgetVisible.value) {
      // Only show toggle button when widget is hidden
      return {
        toggleWidget: {
          ...suncoButtons.toggleWidget,
          text: 'Show SunCo Widget',
        },
      };
    }

    // Show all buttons when widget is visible
    return {
      ...suncoButtons,
      toggleWidget: {
        ...suncoButtons.toggleWidget,
        text: 'Hide Widget',
      },
    };
  });

  const locales = reactive({
    selected: 'en',
    options: ['en', 'fr', 'de', 'es', 'nl', 'pt', 'it', 'pt-br'],
  });

  const cookieConsent = reactive({
    selected: 'all',
    options: ['all', 'none', 'functional'],
  });
</script>
