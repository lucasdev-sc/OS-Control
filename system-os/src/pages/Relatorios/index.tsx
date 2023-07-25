import CardBox from "../../components/CardBox"
import Navbar from "../../components/Navbar"
import TablePage from "./table"

const Relatorio = () => {
    return (
        <>
            <Navbar />
            <CardBox title="Gerenciamento de Ordem de Serviço">
                <div className="mt-5">
                    <TablePage key={Math.floor(Date.now() * Math.random()).toString(36)} />
                </div>
            </CardBox>
        </>
    )
}

export default Relatorio