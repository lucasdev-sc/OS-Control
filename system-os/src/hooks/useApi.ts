import api from "../service/service";
import { IOs } from "./useOs";

export const useApi = () => ({
  signin: async (email: string, password: string) => {
    try {
      const response = await api.post(
        "/users/login", JSON.stringify({ email, password }), {
        headers: {
          "Content-Type": "application/json"
        }
      }
      )
      return response.data
    } catch (error) {
      console.log("Error no api: ", error);
    }
  },
  register: async (name: string, email: string, password: string, cpf: string) => {
    try {
      const response = await api.post(
        "/users/register", JSON.stringify({ name, email, password, cpf }), {
        headers: {
          "Content-Type": "application/json"
        }
      }
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  registerTech: async (name: string, email: string, number: string, payment: string, cpf: string) => {
    try {
      const response = await api.post(
        "/tecnico/register", JSON.stringify({ name, email, number, payment, cpf }), {
        headers: {
          "Content-Type": "application/json"
        }
      }
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  registerClient: async (name: string, number: string, nameContact: string) => {
    try {
      const response = await api.post(
        "/clients/register", JSON.stringify({ name, number, nameContact }), {
        headers: {
          "Content-Type": "application/json"
        }
      }
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  registerService: async (name: string, price: string, idClient: string) => {
    try {
      const response = await api.post(
        "/services/register", JSON.stringify({ name, price, idClient }), {
        headers: {
          "Content-Type": "application/json"
        }
      }
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  registerOS: async (idCliente: string, date: string, idService: string, idTechnicion: string, numOs: string, obs: string, plate: string) => {
    try {
      const response = await api.post(
        "/os/register", JSON.stringify({ idCliente, date, idService, idTechnicion, numOs, obs, plate }), {
        headers: {
          "Content-Type": "application/json"
        }
      }
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  confirmOs: async (id: any) => {
    try {
      const response = await api.put(`/os/confirm/${id}`, { status: true }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
});