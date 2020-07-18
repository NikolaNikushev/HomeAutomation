<template>
  <nb-content>
    <nb-list v-for="(group, index) in Object.keys(groups)" v-bind:key="index">
      <nb-separator>
        <nb-text>Room: {{ group }}</nb-text>
      </nb-separator>
      <nb-list-item
        style="margin-left: 0; padding-left: 10;"
        v-for="(device, index) in groups[group]"
        v-bind:key="index"
      >
        <nb-body>
          <nb-text>{{ device.name }}</nb-text>
          <nb-text
            note
            :success="device.status === 'active'"
            :danger="device.status === 'attention'"
            :warning="device.status === 'inactive'"
            >{{ device.status }}
          </nb-text>
        </nb-body>
        <nb-right>
          <nb-text note v-if="device.lastCommunication"
            >{{ parseTime(device.lastCommunication) }}
          </nb-text>
        </nb-right>
      </nb-list-item>
    </nb-list>
  </nb-content>
</template>

<script lang="ts">
import { parseTime } from "../../../Common/parseTime";
import { Device } from "../../../api/device/Device";

export default {
  name: "DeviceList",
  props: { devices: Array },
  data() {
    return { parseTime, groups: [] };
  },
  mounted(): void {
    this.loadDevices();
  },
  methods: {
    loadDevices() {
      const allGroups = {};
      this.devices.forEach((el: Device) => {
        const key = el.room.name;
        if (!allGroups[key]) {
          allGroups[key] = [];
        }
        allGroups[key].push(el);
      });
      this.groups = allGroups;
    },
  },
  watch: {
    devices() {
      this.loadDevices();
    },
  },
};
</script>

<style scoped></style>
