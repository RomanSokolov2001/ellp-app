import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "@/assets/colors/colors";

interface MembershipStatusProps {
  status:
    | "active"
    | "non-member"
    | "expired"
    | "pending"
    | "incomplete"
    | "activation-required";
}

const statusStyles = {
  active: {
    label: "Active Member",
    backgroundColor: colors.green_background,
    textColor: colors.green_text,
  },
  "non-member": {
    label: "Non Member",
    backgroundColor: colors.red_background,
    textColor: colors.red_text,
  },
  expired: {
    label: "Membership Expired",
    backgroundColor: colors.grey_background_2,
    textColor: colors.grey_text,
  },
  pending: {
    label: "Pending",
    backgroundColor: colors.pending_background,
    textColor: colors.pending_text,
  },
  incomplete: {
    label: "Incomplete",
    backgroundColor: colors.incomplete_background,
    textColor: colors.incomplete_text,
  },
  "activation-required": {
    label: "Activation Required",
    backgroundColor: colors.activation_background,
    textColor: colors.activation_text,
  },
};

const MembershipStatus: React.FC<MembershipStatusProps> = ({ status }) => {
  const { label, backgroundColor, textColor } = statusStyles[status];

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
};

export default MembershipStatus;

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 135,
    height: 45,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: "Lexend-Regular",
    textAlign: "center",
  },
});
