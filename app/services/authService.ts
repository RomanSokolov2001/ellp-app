import axios from 'axios';
import { User } from '../redux/userSlice';

const API_IP = "http://13.60.12.192:5000"
const LOGIN_ENDPOINT = "api/members/login"
const SIGNUP_ENDPOINT = "api/members/signup"

const QUERY_ENDPOINT = "api/members/query"

class AuthService {

    async login(email: string, password: string): Promise <User> {
        const dto = {
            email,
            password
          };
          try {
            const response = await axios.post(`${API_IP}/${LOGIN_ENDPOINT}`, dto);
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
            const response = await axios.post(`${API_IP}/${SIGNUP_ENDPOINT}`, dto);
            const isSuccessful = response.data.result === 'success';
            console.log(response.data);
            if (!isSuccessful) {
                throw Error(response.data.message)
            }

            const userObject = response.data.data;
            return userObject;
        } catch (err) {
            console.error(`@AuthService login: could not login: ${(err as Error).message}`)
            throw Error((err as Error).message);
        };
    };

    async checkIfUserHasSubscription(email?: string, memberId?: string): Promise<boolean> {
        try {
            const response = await axios.get(`${API_IP}/${QUERY_ENDPOINT}`, {
                params: {
                    ...(email && { email }),
                    ...(memberId && { memberId })
                }
            });
            const isUserExists = response && response.data.result === 'success';
            const isUserHasSubscription = isUserExists && response.data.member_data.account_state === 'active';

            if (!isUserExists) {
                throw Error(`No user: ${email}${memberId}`);
            }
            if (!isUserHasSubscription) {
                throw Error(`Your account is not active. Account state: ${response.data.member_data.account_state}`);
            }
            return true;

        } catch (err) {
            console.error(`@AuthService login: could not check user: ${err}`);
            throw Error((err as Error).message)
        }
    };
}

export const authService = new AuthService();
