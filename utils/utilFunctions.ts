import { User } from "@/app/redux/userSlice";

class UtilFunctions {
    // AsynsStorage accepts only strings. These functions serve as convinient 
    // integration of storing the user object in AsyncStorage
    transformUserdataToString(user: User): string {
        try {
          return JSON.stringify(user);
        } catch (error) {
          console.error("Error transforming user data to string:", error);
          return "";
        };
      };
      trasfromStringToUserObject(userDataString: string): User | null {
        try {
          return JSON.parse(userDataString) as User;
        } catch (error) {
          console.error("Error transforming string to user object:", error);
          return null;
        };
      };
};

export const utilFunctions = new UtilFunctions();