import CardBox from "../../components/CardBox"
import Navbar from "../../components/Navbar"
import TableReceber from "./table"

const Receber = () => {
  return (
    <div>
        <Navbar />
        <CardBox title="Receber">
            <TableReceber key={Math.floor(Date.now() * Math.random()).toString(36)} />
        </CardBox>
    </div>
  )
}

export default Receber