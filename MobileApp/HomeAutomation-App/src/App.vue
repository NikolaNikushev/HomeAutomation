<template>
  <root>
    <app-navigation></app-navigation>
  </root>
</template>

<script lang="ts">
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
} from "vue-native-router";
import { Root } from "native-base";
import SideBarScreen from "./Screens/Sidebar/Sidebar.vue";
import { DrawerRouteScreens, StackRouteScreens } from "./Screens/Router";

export const Drawer = createDrawerNavigator(DrawerRouteScreens, {
  contentOptions: {
    activeTintColor: "#e91e63",
  },
  contentComponent: SideBarScreen,
  unmountInactiveRoutes: true,
  initialRouteName: DrawerRouteScreens.Home.route,
});
const AppNavigation = createAppContainer(
  createStackNavigator(
    {
      Drawer: { screen: Drawer },
      ...StackRouteScreens,
    },
    {
      headerMode: "none",
      unmountInactiveRoutes: true,
      initialRouteName: StackRouteScreens.Login.route,
    }
  )
);
export default {
  components: { Root, AppNavigation },
};
</script>
