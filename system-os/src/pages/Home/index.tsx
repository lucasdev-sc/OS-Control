import { useState } from "react"
import CardBox from "../../components/CardBox"
import Navbar from "../../components/Navbar"
import { menuModal } from "./menuModal"
import ModalTech from "./ModalTech"
import ModalClient from "./ModalClient"
import ModalService from "./ModalService"
import ModalOS from "./ModalOS"
import { MdOutlineDashboardCustomize } from "react-icons/md"
import { Link } from "react-router-dom"


const Home = () => {
    const [modalTech, setModalTech] = useState<boolean>(false)
    const [modalClient, setModalClient] = useState<boolean>(false)
    const [modalService, setModalService] = useState<boolean>(false)
    const [modalOS, setModalOS] = useState<boolean>(false)

    const ModalOpen = (value: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (value === 'tech') setModalTech(true)
        else if (value === 'client') setModalClient(true)
        else if (value === 'service') setModalService(true)
        else if (value === 'os') setModalOS(true)
    }

    return (
        <div className="absolute h-screen">
            <Navbar />
            {/* <div className=""> */}
                <CardBox title="Dashboard">
                    <div className="flex justify-center items-center h-[90%]">
                        {/* Botões de cadastro */}
                        <div className="grid grid-cols-3 gap-3 mt-5">
                            {menuModal.map((item) => (
                                <button key={item.id} onClick={(e) => ModalOpen(item.item, e)} className="button-cad">{item.icon} {item.title}</button>
                            ))}
                            <Link to="/relatorios" className="button-cad"><MdOutlineDashboardCustomize /> Gerenciar Ordem de Serviço</Link>
                            <Link to="/receber" className="button-cad"><MdOutlineDashboardCustomize /> À receber</Link>
                        </div>
                        <ModalTech tech={modalTech} onCancelTech={() => setModalTech(false)} />
                        <ModalClient client={modalClient} onCancelClient={() => setModalClient(false)} />
                        <ModalService service={modalService} onCancelService={() => setModalService(false)} />
                        <ModalOS os={modalOS} onCancelOs={() => setModalOS(false)} />
                    </div>
                </CardBox>
            {/* </div> */}
        </div>
    )
}

export default Home