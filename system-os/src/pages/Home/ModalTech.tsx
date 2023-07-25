import { Form, Input, Modal, Radio, message } from "antd"
import { useState } from "react"
import { useApi } from "../../hooks/useApi"

interface IModals {
    tech: boolean
    onCancelTech: () => void
}

const ModalTech = (props: IModals) => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        cpf: '',
        email: '',
        payment: '',
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [selected, setSelected] = useState<string>('')
    const [form] = Form.useForm()

    const Limpar = () => {
        setFormData({
            cpf: '',
            email: '',
            name: '',
            number: '',
            payment: ''
        })
    }

    const handleEditForm = (event: string, name: string) => {
        setFormData({
            ...formData,
            [name]: event
        })
    }

    const Post = async () => {
        if (formData.name == '' || formData.email == '' || formData.number == '' || formData.payment == '' || formData.cpf) {
            setLoading(true);
            await message.error("Preencha todos os campos!");
            setLoading(false)
        } else {
            try {
                setLoading(true);
                await useApi().registerTech(formData.name, formData.email, formData.number, formData.payment, formData.cpf)
                form.resetFields()
                await message.success('Usuário cadastrado com sucesso!')
                setLoading(false)
                props.onCancelTech()
                Limpar()
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        }
    }

    return (
        <div>
            <Modal confirmLoading={loading} okButtonProps={{ className: 'bg-blue-500' }} okText="Cadastrar" cancelText="Cancelar" title="Cadastrar Técnico" open={props.tech} onOk={Post} onCancel={props.onCancelTech}>
                <Form form={form} >
                    <Form.Item label="Nome:" name='name' rules={[{
                        required: true,
                        message: "Digite o nome do técnico"
                    }]}>
                        <Input value={formData.name} onChange={e => handleEditForm(e.target.value, 'name')} />
                    </Form.Item>
                    <div className="flex gap-3">
                        <Form.Item label="Contato:" name='number' rules={[{
                            required: true,
                            message: "Digite o número do técnico"
                        }]}>
                            <Input value={formData.number} onChange={e => handleEditForm(e.target.value, 'number')} />
                        </Form.Item>
                        <Form.Item label="CPF:" name='cpf' rules={[{
                            required: true,
                            message: "Digite o CPF do técnico"
                        }]}>
                            <Input value={formData.cpf} onChange={e => handleEditForm(e.target.value, 'cpf')} />
                        </Form.Item>
                    </div>
                    <Form.Item label="E-mail:" name='email'>
                        <Input value={formData.email} onChange={e => handleEditForm(e.target.value, 'email')} />
                    </Form.Item>
                    <div className="mb-5">
                        <Radio.Group value={selected} onChange={(e) => setSelected(e.target.value)}>
                            <Radio value='pix'>Pix</Radio>
                            <Radio value='comissao' checked={true}>Comissão</Radio>
                        </Radio.Group>
                    </div>
                    {selected ? <Form.Item>
                        <Input value={formData.payment} onChange={e => handleEditForm(e.target.value, 'payment')} placeholder={selected == 'pix' ? 'Digite a chave PIX' : 'Digite a % de comissão'} type={selected == 'pix' ? 'text' : 'number'} min={1} max={100} />
                    </Form.Item> : null}
                </Form>
            </Modal>
        </div>
    )
}

export default ModalTech