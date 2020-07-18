<template>
  <Header
    :icon-name="'menu'"
    :navigation="navigation"
    :title="title"
    :gaHitExtra="gaHitExtra"
    :onPressEvent="() => this.props.navigation.openDrawer()"
  />
</template>

<script lang="ts">
import Header from "./Header.vue";
export default {
  name: "MenuHeader",
  components: { Header },
  props: {
    title: {
      type: String,
    },
    gaHitExtra: {
      type: String,
    },
    navigation: {
      type: Object,
    },
  },
};
</script>
