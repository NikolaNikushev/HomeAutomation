<template>
  <nb-tabs :onChangeTab="tabChanged">
    <nb-tab heading="Information"> </nb-tab>
    <nb-tab heading="Interests"> </nb-tab>
    <nb-tab heading="Settings"> </nb-tab>
  </nb-tabs>
</template>

<script lang="ts">
export default {
  name: "Tabs",
  data() {
    return {};
  },
  async created() {},
  methods: {
    tabChanged({ i }) {},
  },
};
</script>

<style scoped>
˚ .item {
  padding: 20;
}
</style>
