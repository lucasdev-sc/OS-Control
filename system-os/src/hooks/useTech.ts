import { useEffect, useMemo, useState } from "react";
import api from "../service/service";

export interface ITech {
    id: string
    name: string
    cpf: string
    email: string
    number: string
    payment: string
    created_at: string
    updated_at: string
}


export const useTech = () => {
    const [tech, setTech] = useState<ITech[]>([])

    const techMemo = useMemo(() => (tech), [])

    useEffect(() => {
        api.get("/tecnico/").then((data) => setTech(data.data))
    }, [techMemo])

    return tech
}