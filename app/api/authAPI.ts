import axios from 'axios';
import {User} from '../redux/userSlice';
import {BACKEND_IP} from "@/config";
import {LOGIN_ENDPOINT, QUERY_ENDPOINT, SIGNUP_ENDPOINT} from "@/constants/endpoints";


class AuthAPI {

    async login(email: string, password: string): Promise <User> {
        const dto = {
            email,
            password
          };
          try {
            const response = await axios.post(`${BACKEND_IP}${LOGIN_ENDPOINT}`, dto);
            const isSuccessful = response.data.result === 'success';

            if (!isSuccessful) {
              throw Error(response.data.message)
            };

            const userObject = response.data.data;
            return userObject;
          } catch (err) {
            console.error(`@AuthService login: could not login: ${(err as Error).message}`)
            throw Error((err as Error).message);
          };
    };

    async signup(email: string, username: string, password: string, firstName: string, lastName: string): Promise <User> {
        const dto = {
            email,
            username,
            password,
            firstName,
            lastName
        };
        try {
            const response = await axios.post(`${BACKEND_IP}${SIGNUP_ENDPOINT}`, dto);
            const isSuccessful = response.data.result === 'success';
            console.log(response.data);
            if (!isSuccessful) {
                throw Error(response.data.message)
            }

            return response.data.data;
        } catch (err) {
            console.error(`@AuthService login: could not login: ${(err as Error).message}`)
            throw Error((err as Error).message);
        };
    };

    async checkIfUserHasSubscription(email?: string, memberId?: string): Promise<boolean> {
        try {
            const response = await axios.get(`${BACKEND_IP}${QUERY_ENDPOINT}`, {
                params: {
                    ...(email && { email }),
                    ...(memberId && { memberId })
                }
            });
            const isUserExists = response && response.data.result === 'success';
            const isUserHasSubscription = isUserExists && response.data.data.data.accountState === 'active';

            if (!isUserExists) {
                throw Error(`No user: ${email}${memberId}`);
            }
            // TODO fix API
            console.log(response.data.data.data.accountState);
            if (!isUserHasSubscription) {
                // Account state: ${response.data.accountState}
                throw Error(`Your account is not active. `);
            }
            return true;

        } catch (err) {
            console.error(`@AuthService login: could not check user: ${err}`);
            throw Error((err as Error).message)
        }
    };
}

export const authService = new AuthAPI();
