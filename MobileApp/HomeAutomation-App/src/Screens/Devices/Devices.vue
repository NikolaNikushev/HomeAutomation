<template>
  <nb-container>
    <DefaultHeader :navigation="navigation" />
    <DeviceList :devices="devices" />
  </nb-container>
</template>
<script lang="ts">
import DefaultHeader from "../../Common/Navigation/MenuHeader.vue";
import { DevicesAPI } from "../../api/device/DevicesAPI";
import DeviceList from "./Components/DeviceList.vue";

export default {
  name: "Home",
  components: { DeviceList, DefaultHeader },

  mounted() {
    this.loadDevices();
    const fiveSeconds = 5000;
    setInterval(() => {
      this.loadDevices();
    }, fiveSeconds);
  },
  data() {
    return {
      devices: [],
    };
  },
  props: {
    navigation: {
      type: Object,
    },
  },
  methods: {
    async loadDevices() {
      const devicesAPI = new DevicesAPI();
      this.devices = await devicesAPI.getAllDevices().catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>
