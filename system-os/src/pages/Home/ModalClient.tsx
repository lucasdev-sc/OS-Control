import { Form, Input, Modal, message } from "antd"
import { useState } from "react"
import { useApi } from "../../hooks/useApi"

interface IModals {
    client: boolean
    onCancelClient: () => void
}

const ModalClient = (props: IModals) => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        nameContact: ''
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [form] = Form.useForm()

    const Limpar = () => {
        setFormData({
            nameContact: '',
            name: '',
            number: '',
        })
    }

    const handleEditForm = (event: string, name: string) => {
        setFormData({
            ...formData,
            [name]: event
        })
    }
    const Post = async () => {
        if (formData.name == "" || formData.nameContact == "" || formData.number == "") {
            setLoading(true)
            await message.error("Preencha todos os campos!")
            setLoading(false)
        } else {
            try {
                setLoading(true)
                await useApi().registerClient(formData.name, formData.number, formData.nameContact)
                form.resetFields()
                await message.success("Cliente cadastrado com sucesso!")
                setLoading(false)
                props.onCancelClient()
                Limpar()
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
    }

    return (
        <div>
            <Modal okButtonProps={{ className: 'bg-blue-500', loading: loading }} okText="Cadastrar" cancelText="Cancelar" title="Cadastrar Cliente" open={props.client} onOk={Post} onCancel={props.onCancelClient}>
                <Form form={form} >
                    <Form.Item label="Nome:" name='name' rules={[{
                        required: true,
                        message: "Digite o nome do cliente"
                    }]}>
                        <Input value={formData.name} onChange={e => handleEditForm(e.target.value, 'name')} />
                    </Form.Item>

                    <Form.Item label="Contato:" name='number' rules={[{
                        required: true,
                        message: "Digite o número do cliente"
                    }]}>
                        <Input value={formData.number} onChange={e => handleEditForm(e.target.value, 'number')} />
                    </Form.Item>
                    <Form.Item label="Responsável do contato:" name='numberContact' rules={[{
                        required: true,
                        message: "Digite o nome do responsável pelo contato"
                    }]}>
                        <Input value={formData.nameContact} onChange={e => handleEditForm(e.target.value, 'nameContact')} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default ModalClient