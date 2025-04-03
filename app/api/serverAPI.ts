import axios from 'axios';
import {BACKEND_IP} from "@/config";
import {GET_INTENT_ENDPOINT} from "@/constants/endpoints";


class ServerAPI {

    async receiveIntent(jwt: string): Promise<string | null> {
        try {
            const response = await axios.get(`${BACKEND_IP}/${GET_INTENT_ENDPOINT}`, {
                params: { jwt }
            });

            return response.data.clientSecret || null;
        } catch (error) {
            console.error("Error fetching payment intent:", error);
            return null;
        }
    }
}

export const serverAPI = new ServerAPI();

