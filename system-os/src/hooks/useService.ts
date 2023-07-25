import { useEffect, useMemo, useState } from "react";
import api from "../service/service";

export interface IService {
    name: string
    id: string
    idCliente: string

    OrderService: {
        client: {
            name: string
        }
    }
}

export const useService = () => {
    const [service, setService] = useState<IService[]>([])

    const serviceMemo = useMemo(() => (service), [])

    useEffect(() => {
        api.get("/services/").then((data) => setService(data.data))
    }, [serviceMemo])

    return service
}