import { Form, Input, Modal, Select, message } from "antd"
import { useState } from "react"
import { useClient } from "../../hooks/useClient"
import { useApi } from "../../hooks/useApi"

interface IModals {
    service: boolean
    onCancelService: () => void
}

const ModalService = (props: IModals) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        idClient: ''
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [selected, setSelected] = useState<string>('')
    const client = useClient()

    const [form] = Form.useForm()

    const handleEditForm = (event: string, name: string) => {
        setFormData({
            ...formData,
            [name]: event
        })
    }

    const handleSelected = (value: string) => {
        setSelected(value)
        handleEditForm(value, 'idClient')
    }

    const Limpar = () => {
        setFormData({
            name: '',
            price: '',
            idClient: ''
        })
    }

    const Post = async () => {
        try {
            setLoading(true);
            await useApi().registerService(formData.name, formData.price, formData.idClient)
            form.resetFields()
            await message.success("Serviço cadastrado com sucesso!")
            setLoading(false)
            props.onCancelService()
            Limpar()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Modal okButtonProps={{ className: 'bg-blue-500', loading: loading }} okText="Cadastrar" cancelText="Cancelar" title="Cadastrar Serviço" open={props.service} onOk={Post} onCancel={props.onCancelService}>
                <Form form={form}>
                    <Form.Item label="Nome:" rules={[{
                        required: true,
                        message: "Digite o nome do serviço"
                    }]}>
                        <Input value={formData.name} onChange={(e) => handleEditForm(e.target.value, 'name')} required />
                    </Form.Item>
                    <Form.Item label="Valor:" rules={[{
                        required: true,
                        message: "Digite o valor do serviço"
                    }]}>
                        <Input value={formData.price} type="number" onChange={(e) => handleEditForm(e.target.value, 'price')} required />
                    </Form.Item>
                    <Form.Item label="Escolha um cliente:">
                        <Select defaultValue="Selecione uma opção" value={selected} onChange={(e) => handleSelected(e)}>
                            {client.map((item) => {
                                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default ModalService