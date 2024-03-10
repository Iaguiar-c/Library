export async function pegaToken(){
    try{
        return await localStorage.getItem('u');
        
    } catch (error) {
        return undefined
    }
}
