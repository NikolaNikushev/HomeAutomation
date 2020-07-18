<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <Header :navigation="navigation" title="Login" />
    <nb-content padder>
      <nb-form>
        <nb-item>
          <nb-label>Device ID:</nb-label>
          <nb-input v-model="deviceId" disabled="true" style="font-size: 12;" />
        </nb-item>
        <nb-item>
          <nb-label>Name of device:</nb-label>
          <nb-input v-model="deviceName" />
        </nb-item>
      </nb-form>
      <nb-button
        v-if="loading"
        disabled
        block
        :style="{ margin: 15, marginTop: 50 }"
        :onPress="handlePress"
      >
        <nb-text>Loading...</nb-text>
      </nb-button>
      <nb-button
        v-else
        block
        :style="{ margin: 15, marginTop: 50 }"
        :onPress="handlePress"
      >
        <nb-text>Sign In</nb-text>
      </nb-button>
      <nb-spinner color="blue" v-if="loading" />
    </nb-content>
  </nb-container>
</template>
<script lang="ts">
import { Toast } from "native-base";
import Header from "../../Common/Navigation/Header.vue";
import { drawerScreens } from "../Screens";
import Constants from "expo-constants";
import { LocalStorage } from "../../library/LocalStorage/LocalStorage";
import { UsersAPI } from "../../api/users/UsersAPI";

export default {
  async mounted() {
    await this.handleAlreadyLoggedIn();
  },
  data() {
    return {
      deviceId: Constants.deviceId,
      deviceName: Constants.deviceName,
      loading: false,
    };
  },
  components: {
    Header,
  },
  props: {
    navigation: {
      type: Object,
    },
  },
  methods: {
    async handleAlreadyLoggedIn() {
      const previousDevice = await LocalStorage.getItem(
        LocalStorage.keys.DEVICE_NAME
      );
      if (previousDevice) {
        return this.navigation.navigate(drawerScreens.Home.route);
      }
    },
    handleErrorResponse(error) {
      this.loading = false;
      Toast.show({
        position: "bottom",
        duration: 3000,
        text: error.message,
        buttonText: "Okay",
        type: "danger",
      });
    },
    async handlePress() {
      if (!this.deviceId) {
        return Toast.show({
          position: "bottom",
          duration: 3000,
          text: "No device ID given.",
          buttonText: "Okay",
          type: "danger",
        });
      }
      if (!this.deviceName) {
        return Toast.show({
          position: "bottom",
          duration: 3000,
          text: "No device name given.",
          buttonText: "Okay",
          type: "danger",
        });
      }
      this.loading = true;
      const api = new UsersAPI();
      const userInfo = { deviceId: this.deviceId, deviceName: this.deviceName };
      const user = await api.getUser(userInfo);
      if (!user) {
        await api.register(userInfo);
      }
      await LocalStorage.setItem(LocalStorage.keys.DEVICE_ID, this.deviceId);
      await LocalStorage.setItem(
        LocalStorage.keys.DEVICE_NAME,
        this.deviceName
      );
      this.navigation.navigate(drawerScreens.Home.route);
    },
  },
};
</script>
