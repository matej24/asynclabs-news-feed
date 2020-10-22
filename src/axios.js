import axios from "axios"

const instance = axios.create({
    baseURL: "https://private-anon-8344e040f2-technicaltaskapi.apiary-mock.com"
})

export default instance;