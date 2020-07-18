<template>
  <nb-container>
    <BackHeader :navigation="navigation" title="My profile" />
    <nb-content>
      <Tabs />
    </nb-content>
  </nb-container>
</template>

<script lang="ts">
import Tabs from "./Components/Tabs.vue";
import BackHeader from "../../Common/Navigation/BackHeader.vue";

export default {
  name: "Profile",
  components: { BackHeader, Tabs },
  props: { navigation: { type: Object } },
};
</script>

<style scoped></style>
