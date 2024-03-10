import JWT_decote from 'jwt-decode';

export async function  setUsuarioNoLocalStorage(usuario, token) {
    await localStorage.setItem('u', JSON.stringify(usuario)); 
    await localStorage.setItem('token', token)
    
}

export function getUsuarioNoLocalStorage() {
    const json = localStorage.getItem('u'); 
    console.log(json)

    if(!json){
        return null
    }

    const usuario = JSON.parse(json); 
        
    return usuario ?? null; 
    
}

export  function decodificador(){
    const token = localStorage.getItem('u'); 
    
    if(token){
        const usuarioToken = JWT_decote(token); 
        const nomeDoUsuario = usuarioToken.nome; 
        const permissaoDoUsuario = usuarioToken.role; 

        return nomeDoUsuario && permissaoDoUsuario
    }
 
} 