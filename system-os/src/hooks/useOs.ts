import { useEffect, useMemo, useState } from "react";
import api from "../service/service";

export interface IOs {
    id: string
    idCliente: string
    idService: string
    idTechnicion: string
    status: boolean
    numOs: string
    client: {
        name: string
    }
    service: {
        name: string
        price: string
    }
    technicion: {
        name: string
    }
    date: string
    plate: string
    obs: string
}

export const useOs = () => {
    const [os, setOs] = useState<IOs[]>([])

    const osMemo = useMemo(() => (os), [])

    useEffect(() => {
        api.get("/os/").then((data) => setOs(data.data))
    }, [osMemo])

    return os
}