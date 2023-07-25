import { useEffect, useMemo, useState } from "react";
import api from "../service/service";

export interface IClient {
    id: string
    name: string

    orderServices: {
        id: string,
        service: {
            name: string,
            price: string
        }
    }
}


export const useClient = () => {
    const [client, setClient] = useState<IClient[]>([])

    const clientMemo = useMemo(() => (client), [])

    useEffect(() => {
        api.get("/clients/").then((data) => setClient(data.data))
    }, [clientMemo])

    return client
}