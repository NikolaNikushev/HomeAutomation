<template>
  <nb-container>
    <nb-content class="sidebar-content-wrapper" :bounces="false">
      <nb-list class="list">
        <nb-list-item
          v-for="data in datas"
          :key="data.route"
          button
          :onPress="() => handleListItemClick(data)"
          :selected="data.route === activeRoute"
        >
          <nb-left>
            <nb-icon
              active
              :name="data.icon"
              :style="{ color: '#0045A7', fontSize: 26, width: 30 }"
            />
            <nb-text
              :class="{
                active: data.route === activeRoute,
              }"
              >{{ data.name }}
            </nb-text>
          </nb-left>
          <nb-right v-if="data.types" :style="{ flex: 1 }">
            <nb-badge
              class="list-item-badge-container"
              :style="{ backgroundColor: data.bg }"
            >
              <nb-text
                class="list-item-badge-text"
                :style="stylesObj.badgeText"
              >
                {{ `${data.types} Types` }}
              </nb-text>
            </nb-badge>
          </nb-right>
        </nb-list-item>
        <nb-list-item button noBorder :onPress="() => logout()">
          <nb-left>
            <nb-icon
              active
              :name="'lock'"
              :style="{ color: '#0045A7', fontSize: 26, width: 30 }"
            />
            <nb-text>
              Logout
            </nb-text>
          </nb-left>
        </nb-list-item>
      </nb-list>
    </nb-content>
  </nb-container>
</template>

<script lang="ts">
import { Dimensions, Platform } from "react-native";
import { screens, Screen, stackScreens } from "../Screens";
import { LocalStorage } from "../../library/LocalStorage/LocalStorage";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  async created() {},
  data() {
    return {
      stylesObj: {
        drawerCoverObj: {
          height: deviceHeight / 4.5,
        },
        drawerImageObj: {
          left: Platform.OS === "android" ? deviceWidth / 9 : deviceWidth / 9,
          resizeMode: "contain",
          marginTop: 25,
        },
        badgeText: {
          fontSize: Platform.OS === "android" ? 11 : 13,
          marginTop: Platform.OS === "android" ? -3 : 0,
          fontWeight: "400",
        },
      },
      datas: Object.values(screens).filter((el) => !el.hideInDrawer),
      activeRoute: screens.Home.route,
    };
  },
  methods: {
    handleListItemClick(dataObj: Screen) {
      if (!stackScreens[dataObj.route]) {
        this.activeRoute = dataObj.route;
      }
      this.navigation.navigate(dataObj.route);
    },
    async logout() {
      await LocalStorage.clearStorage();
      this.navigation.navigate(screens.Login.route);
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  padding-top: 100;
}

.sidebar-content-wrapper {
  flex: 1;
  background-color: #fff;
}

.drawer-cover {
  flex: 1;
  align-self: stretch;
  position: relative;
  margin-bottom: 10;
}

.drawer-image {
  align-self: center;
  position: absolute;
  height: 124;
  width: 200;
}

.list-item-badge-container {
  border-radius: 3;
  height: 25;
  width: 72;
}

.list-item-badge-text {
  /* font-weight: 400; // not-working  */
  /* font-weight: bold; // working */
  text-align: center;
}

.active {
  font-weight: 600;
}
</style>
