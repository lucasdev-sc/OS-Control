import { Form, Input, Modal, Select, message } from "antd"
import { useState } from "react"
import { useClient } from "../../hooks/useClient"
import { useService } from "../../hooks/useService"
import { useTech } from "../../hooks/useTech"
import { useApi } from "../../hooks/useApi"

interface IModals {
    os: boolean
    onCancelOs: () => void
}

const ModalOS = (props: IModals) => {

    const client = useClient()
    const tecnico = useTech()
    const service = useService()

    const [loading, setLoading] = useState<boolean>(false)
    const [form] = Form.useForm()
    const [selectedClient, setSelectedClient] = useState<string>('')
    const [selectedService, setSelectedService] = useState<string>('')
    const [selectedTech, setSelectedTech] = useState<string>('')


    const [formData, setFormData] = useState({
        idCliente: '',
        idService: '',
        idTechnicion: '',
        date: '',
        plate: '',
        numOs: '',
        obs: '',
    })

    const handleFormEdit = (value: string, name: string) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const Limpar = () => {
        setFormData({
            idCliente: '',
            idService: '',
            idTechnicion: '',
            date: '',
            plate: '',
            numOs: '',
            obs: '',
        })
        setSelectedClient('')
        setSelectedService('')
        setSelectedTech('')
    }

    const handleSelectedClient = (value: string) => {
        setSelectedClient(value)
        handleFormEdit(value, 'idCliente')
    }

    const handleSelectedService = (value: string) => {
        setSelectedService(value)
        handleFormEdit(value, 'idService')
    }

    const handleSelectedTech = (value: string) => {
        setSelectedTech(value)
        handleFormEdit(value, 'idTechnicion')
    }

    const Post = async () => {
        try {
            setLoading(true)
            await useApi().registerOS(formData.idCliente, formData.date, formData.idService, formData.idTechnicion, formData.numOs, formData.obs, formData.plate)
            form.resetFields()
            message.success("Cadastrado com sucesso!")
            setLoading(false)
            props.onCancelOs()
            Limpar()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Modal width={"60%"} okButtonProps={{ className: 'bg-blue-500', loading: loading }} okText="Cadastrar" cancelText="Cancelar" title="Cadastrar Ordem de Serviço" open={props.os} onOk={Post} onCancel={props.onCancelOs}>
                <Form form={form}>
                    <div className="flex gap-3 flex-col">
                        <div className="flex gap-3 justify-between">
                            <Form.Item className="w-1/2" label="Escolha um cliente:">
                                <Select value={selectedClient} onChange={(e) => handleSelectedClient(e)}>
                                    {client.map((item) => {
                                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item className="w-1/2" label="Escolha um serviço:">
                                <Select value={selectedService} onChange={(e) => handleSelectedService(e)}>
                                    {service.map((item) => {
                                        return (
                                            selectedClient == item.idCliente && <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Placa do veículo:">
                                <Input type="text" className="uppercase" value={formData.plate} maxLength={7} onChange={(e) => handleFormEdit(e.target.value, 'plate')} />
                            </Form.Item>
                        </div>
                        <div className="flex flex-1 gap-3 justify-between">
                            <Form.Item className="w-1/3" label="Escolha um técnico:">
                                <Select value={selectedTech} onChange={(e) => handleSelectedTech(e)}>
                                    {tecnico.map((item) => (
                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Data do serviço">
                                <Input type="date" value={formData.date} onChange={(e) => handleFormEdit(e.target.value, 'date')} />
                            </Form.Item>
                            <Form.Item className="w-1/3" label="Número da OS:">
                                <Input type="number" value={formData.numOs} onChange={(e) => handleFormEdit(e.target.value, 'numOs')} />
                            </Form.Item>
                        </div>
                        <Form.Item label="Observação:">
                            <Input.TextArea value={formData.obs} onChange={(e) => handleFormEdit(e.target.value, 'obs')} />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default ModalOS