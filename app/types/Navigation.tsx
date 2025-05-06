import { StackScreenProps } from "@react-navigation/stack";
import { DiscountData } from "./DiscountData";
import { EventData } from "./EventData";

type RootStackParamList = {
  Profile: undefined;
  Membership: undefined;
  JoinUs: undefined;
  PaymentScreen: undefined;
  InfoPage: undefined;
  ProfileSettings: undefined;
  SignIn: undefined;
  FavouriteDiscounts: undefined;
  EventsScreen: undefined;
  DiscountsScreen: undefined;
  ViewContentScreen: { data: EventData | DiscountData };
};
export default RootStackParamList;

export type ProfileScreenProps = StackScreenProps<
  RootStackParamList,
  "Profile"
>;
export type MembershipScreenProps = StackScreenProps<
  RootStackParamList,
  "Membership"
>;
export type JoinUsScreenProps = StackScreenProps<RootStackParamList, "JoinUs">;
export type PaymentScreenProps = StackScreenProps<
  RootStackParamList,
  "PaymentScreen"
>;
export type InfoPageScreenProps = StackScreenProps<
  RootStackParamList,
  "InfoPage"
>;
export type SettingsPageScreenProps = StackScreenProps<
  RootStackParamList,
  "ProfileSettings"
>;

export type FavouritesPageScreenProps = StackScreenProps<
  RootStackParamList,
  "FavouriteDiscounts"
>;
export type SignInScreenProps = StackScreenProps<RootStackParamList, "SignIn">;

export type EventsScreenProps = StackScreenProps<
  RootStackParamList,
  "EventsScreen"
>;

export type DiscountsScreenProps = StackScreenProps<
  RootStackParamList,
  "DiscountsScreen"
>;