import { MdMiscellaneousServices, MdCreateNewFolder } from "react-icons/md";
import { BsPersonFillGear } from 'react-icons/bs'
import { HiUser } from 'react-icons/hi'

export const menuModal = [
    {
        id: Math.floor(Date.now() * Math.random()).toString(36),
        icon: <MdMiscellaneousServices />,
        title: "Serviço",
        item: 'service'
    },
    {
        id: Math.floor(Date.now() * Math.random()).toString(36),
        icon: <BsPersonFillGear />,
        title: "Técnico",
        item: 'tech'
    },
    {
        id: Math.floor(Date.now() * Math.random()).toString(36),
        icon: <HiUser />,
        title: "Cliente",
        item: 'client'
    },
    {
        id: Math.floor(Date.now() * Math.random()).toString(36),
        icon: <MdCreateNewFolder />,
        title: "Ordem de Serviço",
        item: 'os'
    }
]