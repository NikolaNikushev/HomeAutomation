import { VueConstructor } from "vue";
import * as Vue from "vue/types/umd";

export const drawerScreens: DrawerScreens = {
  Home: {
    name: "Home",
    route: "Home",
    icon: "card",
    bg: "#0045A7",
    hideInDrawer: false,
  },
  Devices: {
    name: "Devices",
    route: "Devices",
    icon: "md-laptop",
    bg: "#0045A7",
    hideInDrawer: false,
  },
};
export const stackScreens: StackScreens = {
  Login: {
    name: "Login",
    route: "Login",
    hideInDrawer: true,
  },
  Profile: {
    name: "My Profile",
    route: "Profile",
    icon: "md-person",
    bg: "#0045A7",
    hideInDrawer: false,
  },
};
export const screens = {
  ...drawerScreens,
  ...stackScreens,
};
export interface Screen {
  name: string;
  route: string;
  icon?: string;
  bg?: string;
  hideInDrawer: boolean;
  screen?: VueConstructor<Vue>;
}

export interface DrawerScreens {
  Home: Screen;
  Devices: Screen;
}
export interface StackScreens {
  Login: Screen;
  Profile: Screen;
}
