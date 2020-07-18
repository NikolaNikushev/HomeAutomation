<template>
  <nb-header :style="style" :hasTabs="hasTabs">
    <nb-left>
      <nb-button transparent :onPress="onPressEvent">
        <nb-icon :name="iconName" />
      </nb-button>
    </nb-left>
    <nb-body>
      <nb-title>{{ title || currentRoute }}</nb-title>
    </nb-body>
    <nb-right>
      <nb-button :onPress="showNotifications" transparent vertical>
        <nb-icon name="md-notifications" />
        <nb-badge
          class="notification-badge"
          :style="{ fontSize: 14 }"
          v-if="notificationCount > 0"
        >
          <text class="notification-badge-text">{{ notificationCount }}</text>
        </nb-badge>
      </nb-button>
    </nb-right>
  </nb-header>
</template>

<script lang="ts">
import { Toast } from "native-base";
import platform from "../../theme/variables/platform";

export default {
  name: "Header",
  props: {
    gaHitExtra: {
      type: String,
    },
    title: {
      type: String,
    },
    hasTabs: {},
    navigation: {
      type: Object,
    },
    iconName: {
      type: String,
    },
    onPressEvent: {
      type: Function,
    },
  },
  async mounted() {},
  data() {
    let style: any = {};
    const toolbarHeight = platform.toolbarHeight + 25;
    style = { height: toolbarHeight, paddingTop: toolbarHeight / 2 };
    return {
      currentRoute: this.navigation.state.routeName,
      style,
      notificationCount: 0,
    };
  },
  methods: {
    async showNotifications() {
      this.notificationCount = 0;
      return Toast.show({
        position: "bottom",
        duration: 3000,
        text: "Not implemented yet.",
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
.notification-badge-text {
  color: white;
  margin: 0;
}

.notification-badge {
  position: absolute;
  right: 0;
  height: 22;
  width: 22;
}
</style>
