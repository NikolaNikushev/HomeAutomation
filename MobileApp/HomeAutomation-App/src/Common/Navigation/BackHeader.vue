<template>
  <Header
    :icon-name="'arrow-back'"
    :navigation="navigation"
    :title="title"
    :gaHitExtra="gaHitExtra"
    :hasTabs="hasTabs"
    :onPressEvent="handleBackPress"
  />
</template>

<script lang="ts">
import Header from "./Header.vue";
export default {
  name: "BackHeader",
  components: { Header },
  props: {
    title: {
      type: String,
    },
    gaHitExtra: {
      type: String,
    },
    hasTabs: {},
    navigation: {
      type: Object,
    },
  },
  methods: {
    async handleBackPress() {
      await this.navigation.goBack();
    },
  },
};
</script>
