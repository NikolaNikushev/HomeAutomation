<template>
  <nb-container>
    <DefaultHeader :navigation="navigation" />
    <nb-content padder>
      <nb-view v-if="notifications.length === 0">
        <nb-text>No notifications available.</nb-text>
      </nb-view>
      <nb-list-item
        style="margin-left: 0; padding-left: 10;"
        :style="{
          backgroundColor:
            notification.data.type &&
            (notification.data.type === 'danger'
              ? 'rgba(217,83,79,0.3)'
              : notification.data.type === 'warning'
              ? 'rgba(240,173,78,0.5)'
              : notification.data.type === 'success'
              ? 'rgba(92,184,92, 0.5)'
              : ''),
        }"
        v-for="(notification, index) in notifications"
        v-bind:key="index"
      >
        <nb-body>
          <nb-text>{{ notification.data.title || "unknown" }}</nb-text>
          <nb-text note :numberOfLines="1"
            >{{ notification.data.deviceName || "unknown" }}
          </nb-text>
          <nb-text note>{{ notification.data.didWhat }}</nb-text>
        </nb-body>

        <nb-right>
          <nb-button
            transparent
            danger
            :onPress="
              () => deleteNotification(notification.id || notification.data.id)
            "
          >
            <nb-text>Delete</nb-text>
          </nb-button>
          <nb-text note v-if="notification.data.when"
            >{{ parseTime(notification.data.when) }}
          </nb-text>
        </nb-right>
      </nb-list-item>
    </nb-content>
  </nb-container>
</template>
<script>
import DefaultHeader from "../../Common/Navigation/MenuHeader.vue";
import { LocalStorage } from "../../library/LocalStorage/LocalStorage";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { Vibration } from "react-native";
import * as Constants from "expo-constants";
import { UsersAPI } from "../../api/users/UsersAPI";
import { NotificationsAPI } from "../../api/notifications/NotificationsAPI";
import { Toast } from "native-base";
import { parseTime } from "../../Common/parseTime";

export default {
  name: "Home",
  components: { DefaultHeader },
  async beforeMount() {
    this.deviceName = await LocalStorage.getItem(LocalStorage.keys.DEVICE_NAME);
    this.deviceId = await LocalStorage.getItem(LocalStorage.keys.DEVICE_ID);
  },
  async mounted() {
    const notifications = await LocalStorage.getItem(
      LocalStorage.keys.NOTIFICATIONS
    );
    this.loadNotifications();
    this.notifications = notifications ? JSON.parse(notifications) : [];
    const alreadySubscribed = await LocalStorage.getItem(
      LocalStorage.keys.PUSH_TOKEN
    );
    if (alreadySubscribed) {
      await this.subscribe();
      console.log("already subscribed");
      return;
    }

    if (this.subscription) {
      console.log("already subscribed subscribed.");
      return;
    }
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      console.log("user not granted permission");
      const currentToken = await LocalStorage.getItem(
        LocalStorage.keys.PUSH_TOKEN
      );
      const user = { deviceName: this.deviceName, deviceId: this.deviceId };
      const usersApi = new UsersAPI();
      if (!currentToken) {
        await this.getNewToken();
      }
      if (currentToken) {
        const loadedUser = await usersApi.getUser(user);
        if (loadedUser.pushToken !== currentToken) {
          await this.updateUserToken(currentToken);
        }
      }
      await this.subscribe();
      return;
    }
    await this.getNewToken();
    await this.subscribe();
  },
  data() {
    return {
      deviceName: "",
      deviceId: "",
      token: "",
      subscription: null,
      notifications: [],
      parseTime,
    };
  },
  props: {
    navigation: {
      type: Object,
    },
  },
  methods: {
    handlePress() {},
    async getNewToken() {
      // Get the token that uniquely identifies this device
      const token = await Notifications.getExpoPushTokenAsync();
      this.updateUserToken(token);
    },
    async subscribe() {
      await Notifications.cancelAllScheduledNotificationsAsync();
      this.subscription = Notifications.addListener(this.handleNotification);
    },
    async handleNotification(notification: Notification) {
      this.notifications.push(notification);
      await LocalStorage.setItem(
        LocalStorage.keys.NOTIFICATIONS,
        JSON.stringify(this.notifications)
      );
      Vibration.vibrate();
      this.loadNotifications();
    },
    async deleteNotification(id) {
      if (!id) {
        Toast.show({
          position: "bottom",
          duration: 3000,
          text: "Problem loading id. Try reloading or at a later time.",
          buttonText: "Okay",
          type: "danger",
        });
        return;
      }
      const notificationsApi = new NotificationsAPI();
      await notificationsApi
        .delete(`/${id}`)
        .then(async () => {
          await this.loadNotifications();
          return true;
        })
        .catch(this.handleErrorResponse);
    },
    handleErrorResponse(error) {
      Toast.show({
        position: "bottom",
        duration: 3000,
        text: error.message,
        buttonText: "Okay",
        type: "danger",
      });
    },
    async updateUserToken(token: string) {
      const api = new UsersAPI();
      const user = {
        pushToken: token,
        deviceName: this.deviceName,
        deviceId: this.deviceId,
      };
      await api.updateToken(user);
      await LocalStorage.setItem(LocalStorage.keys.PUSH_TOKEN, token);
    },
    async loadNotifications() {
      const notificationsApi = new NotificationsAPI();
      const loadedNotifications = await notificationsApi
        .getUserNotifications({
          deviceName: this.deviceName,
          deviceId: this.deviceId,
        })
        .catch(async (err) => {
          this.handleErrorResponse(err);
          const notifications = await LocalStorage.getItem(
            LocalStorage.keys.NOTIFICATIONS
          );
          this.notifications = notifications ? JSON.parse(notifications) : [];
          return null;
        });
      if (!loadedNotifications) {
        return;
      }
      this.notifications = loadedNotifications;
      await LocalStorage.setItem(
        LocalStorage.keys.NOTIFICATIONS,
        JSON.stringify(this.notifications)
      );
    },
  },
};
</script>
