import { Button, Form, Input, message } from "antd"
import CardBox from "../../components/CardBox"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../context/AuthProvider/useAuth"

const Register = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        identificador: ''
    });
    const [loading, setLoading] = useState<boolean>(false)

    const handleFormEdit = (event: string, name: string) => {
        setFormData({
            ...formData,
            [name]: event
        })
    };

    const onFinish = async () => {
        try {
            setLoading(true);
            await auth.register(formData.email, formData.password, formData.name, formData.identificador)
            setLoading(false)
            await message.success('Usuário cadastrado com sucesso!')
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="background-page background-page h-screen flex justify-center items-center">
            <CardBox title="Cadastrar">
                <Form
                    className="mt-5"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item label="Nome" name='name' rules={[{
                        required: true,
                        message: "Digite o seu nome!"
                    }]}>
                        <Input value={formData.name} onChange={(e) => handleFormEdit(e.target.value, 'name')} />
                    </Form.Item>
                    <Form.Item label="CPF/CNPJ" name='identificador' rules={[{
                        required: true,
                        message: "Digite o seu CPF ou CNPJ!"
                    }]}>
                        <Input value={formData.identificador} onChange={(e) => handleFormEdit(e.target.value, 'identificador')} />
                    </Form.Item>
                    <Form.Item label="E-mail" name='email' rules={[{
                        required: true,
                        message: "Digite o seu e-mail!"
                    }]}>
                        <Input type="email" value={formData.email} onChange={(e) => handleFormEdit(e.target.value, 'email')} />
                    </Form.Item>
                    <Form.Item label="Senha" name='password' rules={[{
                        required: true,
                        message: "Digite a sua senha!"
                    }]}>
                        <Input.Password value={formData.password} onChange={(e) => handleFormEdit(e.target.value, 'password')} />
                    </Form.Item>
                    <Form.Item>
                        <div className="flex flex-col gap-3">
                            <Button loading={loading} type="primary" htmlType="submit" className="bg-blue-500">
                                Cadastrar
                            </Button>
                            <Link to='/login'>Tem uma conta?</Link>
                        </div>
                    </Form.Item>
                </Form>
            </CardBox>
        </div>
    )
}

export default Register