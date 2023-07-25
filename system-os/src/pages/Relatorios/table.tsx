import { Button, Form, Input, Popconfirm, Space, Table, Tag, message } from "antd"
import { useEffect, useState } from "react"
import { IOs } from "../../hooks/useOs"
import ExcelJS from 'exceljs'
import { BiPencil, BiTrash, BiCheck } from 'react-icons/bi'
import { useApi } from "../../hooks/useApi"
import { useNavigate } from "react-router-dom"

import api from "../../service/service"

const TablePage = () => {
    const navigate = useNavigate()

    const [os, setOs] = useState<IOs[]>([])
    const [records, setRecords] = useState(os)
    const [loading, setLoading] = useState<boolean>(false)

    const handleConfirm = async (id: string) => {
        setLoading(true)
        navigate(`/relatorios/${id}`)
        const idPath = window.location.pathname.split('/').pop()
        await useApi().confirmOs(idPath)
        message.success("Ordem de Serviço Finalizada com sucesso!")
        navigate('/relatorios')
        setLoading(false)
        loadData()
    }

    const colums = [
        {
            title: "Empresa",
            dataIndex: "client",
            key: Math.floor(Date.now() * Math.random()).toString(36),
            render: (text: any) => <p>{text.name}</p>,
        },
        {
            title: "Técnico",
            dataIndex: "technicion",
            key: Math.floor(Date.now() * Math.random()).toString(36),
            render: (text: any) => <p>{text.name}</p>,
        },
        {
            title: "Serviço",
            dataIndex: "service",
            key: "serviceName",
            render: (text: any) => <p>{text.name}</p>,
        },
        {
            title: "Data",
            dataIndex: "date",
            key: Math.floor(Date.now() * Math.random()).toString(36),
            render: (text: string) => {
                const formated = Intl.DateTimeFormat("pt-BR", {
                    dateStyle: 'long',
                    timeZone: 'UTC'
                })

                return (
                    <p key={Math.floor(Date.now() * Math.random()).toString(36)}>{formated.format(Date.parse(text))}</p>
                )
            },
            width: 160
        },
        {
            title: "Valor",
            dataIndex: "service",
            key: Math.floor(Date.now() * Math.random()).toString(36),
            render: (text: any) => <p key={Math.floor(Date.now() * Math.random()).toString(36)}>R$ {text.price}</p>,
            width: 80
        },
        {
            title: "Status",
            dataIndex: "status",
            key: Math.floor(Date.now() * Math.random()).toString(36),
            render: (text: boolean) => {
                let color
                text ? color = 'gold' : color = 'green'

                return (
                    <Tag color={color} className="select-none" key={Math.floor(Date.now() * Math.random()).toString(36)}>{text ? "Em andamento" : "Finalizado"}</Tag>
                )
            },
            width: 130
        },
        {
            title: "Opções",
            key: Math.floor(Date.now() * Math.random()).toString(36),
            dataIndex: ["status", "id"],
            render: (text: any, record: any) => <Space key={Math.floor(Date.now() * Math.random()).toString(36)}>
                <Popconfirm okButtonProps={{ type: "ghost", className: "bg-blue-400 text-white hover:bg-blue-500" }} cancelButtonProps={{ danger: true, type: 'primary' }} title="Tem certeza que deseja finalizar a ordem de serviço?" onConfirm={() => handleConfirm(record['id'])}>
                    <Button type={record['status'] ? "ghost" : "default"} disabled={!record['status']} className={record['status'] && "bg-green-500 text-white cursor-pointer"}>
                        <BiCheck size={18} />
                    </Button>
                </Popconfirm>
                <Button>
                    <BiPencil size={18} />
                </Button>
                <Button type="primary" danger>
                    <BiTrash size={18} />
                </Button>
            </Space>
        }
    ]

    const handleFilterClient = (e: string) => {
        const newData = os.filter(row => {
            return row.client.name.toLowerCase().includes(e)
        })

        if (newData.length === 0) {
            setRecords([])
            setOs([])
        }

        e.length == 0 && loadData()

        setRecords(newData)
        setOs(newData)
    }

    const handleFilterTech = (e: string) => {
        const newData = os.filter(row => {
            return row.technicion.name.toLowerCase().includes(e)
        })

        if (newData.length === 0) {
            setRecords([])
            setOs([])
        }

        e.length == 0 && loadData()

        setRecords(newData)
        setOs(newData)
    }

    const handleFilterService = (e: string) => {
        const newData = os.filter(row => {
            return row.service.name.toLowerCase().includes(e)
        })

        if (newData.length === 0) {
            setRecords([])
            setOs([])
        }

        e.length == 0 && loadData()

        setRecords(newData)
        setOs(newData)
    }

    const handleFilterDate = (e: string) => {
        const newData = os.filter(row => {
            return row.date.toLowerCase().includes(e)
        })
        
        if (newData.length === 0) {
            setRecords([])
            setOs([])
        }

        e.length == 0 && loadData()

        setRecords(newData)
        setOs(newData)
    }

    const handleOnExcel = () => {
        const wb = new ExcelJS.Workbook()
        const sh = wb.addWorksheet("My Sheet")
        sh.properties.defaultRowHeight = 80;

        sh.columns = [
            {
                header: "Empresa",
                key: "empresa",
            },
            {
                header: "Tecnico",
                key: "tech",
            },
            {
                header: "Servico",
                key: "service",
            },
            {
                header: "Data",
                key: "date",
            },
            {
                header: "Valor",
                key: "price",
            },
            {
                header: "Status",
                key: "status"
            }
        ]

        records.map(item => {
            const formated = Intl.DateTimeFormat("pt-BR", {
                dateStyle: 'long',
                timeZone: 'UTC'
            })

            sh.addRow({
                empresa: item.client.name,
                tech: item.technicion.name,
                service: item.service.name,
                date: formated.format(Date.parse(item.date)),
                price: item.service.price,
                status: item.status ? "Em andamento" : "Finalizado"
            })
        })

        wb.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
            })
            const url = window.URL.createObjectURL(blob)
            const anchor = document.createElement('a')
            anchor.href = url
            anchor.download = 'download.xlsx'
            anchor.click()
            window.URL.revokeObjectURL(url)
        })
    }

    async function Get() {
        await api.get("/os/").then((data) => setOs(data.data))
    }

    useEffect(() => {
        Get()
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        Get()
        setRecords([...os])
        setLoading(false)
    }

    return (
        <div>
            <Form>
                <div className="flex justify-between gap-4 items-center">
                    <Form.Item label="Empresa:">
                        <Input onChange={(e) => handleFilterClient(e.target.value.toLowerCase())} />
                    </Form.Item>
                    <Form.Item label="Serviço:">
                        <Input onChange={(e) => handleFilterService(e.target.value.toLowerCase())} />
                    </Form.Item>
                    <Form.Item label="Técnico:">
                        <Input onChange={(e) => handleFilterTech(e.target.value.toLowerCase())} />
                    </Form.Item>
                    <Form.Item label="Data:">
                        <Input type="date" onChange={(e) => handleFilterDate(e.target.value.toLowerCase())} />
                    </Form.Item>
                    <Form.Item>
                        <div className="flex gap-3">
                            <button className="button-action" onClick={loadData}>Atualizar</button>
                            <button className="button-action" onClick={handleOnExcel}>Exportar</button>
                        </div>
                    </Form.Item>
                </div>
            </Form>
            <Table loading={loading} key={Math.floor(Date.now() * Math.random()).toString(36)} scroll={{ y: 260 }} bordered className="mt-5" columns={colums} dataSource={records.length === 0 ? os : records} />
        </div>
    )
}

export default TablePage