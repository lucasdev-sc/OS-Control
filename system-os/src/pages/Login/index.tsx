import { Button, Form, Input, message } from "antd"
import CardBox from "../../components/CardBox"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider/useAuth";

const Login = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState<boolean>(false)

    const handleFormEdit = (event: string, name: string) => {
        setFormData({
            ...formData,
            [name]: event
        })
    }

    async function onFinish() {
        try {
            setLoading(true);
            await auth.authenticate(formData.email, formData.password)
            setLoading(false)
            navigate('/home', {
                replace: true
            })
        } catch (error) {
            console.log("error: ", error)
            await message.error("E-mail/Senha errado!")
            setLoading(false)
        }
    }

    return (
        <div className="background-page h-screen flex justify-center items-center">
            <CardBox title="Login">
                <Form
                    className="mt-5"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item label="E-mail" name="email" rules={[{
                        required: true,
                        message: "Digite o seu e-mail"
                    }]}>
                        <Input value={formData.email} onChange={(e) => handleFormEdit(e.target.value, 'email')} />
                    </Form.Item>
                    <Form.Item label="Senha" name="password" rules={[{
                        required: true,
                        message: "Digite a sua senha"
                    }]}>
                        <Input.Password value={formData.password} onChange={(e) => handleFormEdit(e.target.value, 'password')} />
                    </Form.Item>
                    <Form.Item>
                        <div className="flex flex-col gap-3">
                            <Button loading={loading} type="primary" htmlType="submit" className="bg-blue-500">
                                Entrar
                            </Button>
                            <Link to='/register'>Ainda não tem uma conta?</Link>
                        </div>
                    </Form.Item>
                </Form>
            </CardBox>
        </div>
    )
}

export default Login