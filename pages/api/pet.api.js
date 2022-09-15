import Axios from "axios"

var axios = Axios.create({
    withCredentials: true,
    // baseURL: 'http://127.0.0.1:3030/api/pet',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/pet' : 'http://127.0.0.1:3030/api/pet'
    // baseURL: process.env.NODE_ENV === 'production' ? 'https://pet-clinic-proj.herokuapp.com/' : 'http://127.0.0.1:3030/api/pet'
})



const getPets = () => axios.get('/').then(res => res.data)

const getPet = (petId) => axios.get(`/${petId}`).then(res => res.data)

const updatePet = (pet) => axios.put(`/${pet._id}`, pet).then(res => res.data)

const addPet = (pet) => axios.post('/', pet).then(res => res.data)

const removePet = (petId) => {
    return axios.delete(`/${petId}`).then(res => res.data)
}


export const petApi = {
    getPets,
    getPet,
    updatePet,
    addPet,
    removePet
}