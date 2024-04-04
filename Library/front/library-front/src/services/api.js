import axios from 'axios'; 

export const Api = axios.create({
    baseURL: "http://localhost:3001/"
})

Api.defaults.headers.post['Content-Type'] = 'application/json'
Api.defaults.headers.common['Accept'] = 'application/json'

export async function pegaToken(){
    try{
        return await localStorage.getItem('token'); 
    } catch (error){
        return undefined 
    }
}

export const http = {
    pegaToken: () => pegaToken(), 
	get: Api.get,
	post: Api.post,
	put: Api.put,
	patch: Api.patch,
	delete: Api.delete,
}
