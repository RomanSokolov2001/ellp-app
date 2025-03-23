export interface User {
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  membershipStatus:
    | "active"
    | "non-member"
    | "expired"
    | "pending"
    | "incomplete"
    | "activation-required";
  hasMembership: boolean;
  dateofPurchase?: string;
  expiryDate?: string;
  lastLogin?: string;
}
