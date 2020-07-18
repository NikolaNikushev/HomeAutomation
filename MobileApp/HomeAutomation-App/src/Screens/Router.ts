import {
  DrawerScreens,
  drawerScreens,
  StackScreens,
  stackScreens,
} from "./Screens";
import Profile from "./Profile/Profile.vue";
import Login from "./Login/Login.vue";
import Home from "./Home/Home.vue";
import Devices from "./Devices/Devices.vue";

const drawerRouteScreens: DrawerScreens = { ...drawerScreens };
const stackRouteScreens: StackScreens = { ...stackScreens };
drawerRouteScreens.Home.screen = Home;
drawerRouteScreens.Devices.screen = Devices;
stackRouteScreens.Login.screen = Login;
stackRouteScreens.Profile.screen = Profile;
export const DrawerRouteScreens = drawerRouteScreens;
export const StackRouteScreens = stackRouteScreens;
