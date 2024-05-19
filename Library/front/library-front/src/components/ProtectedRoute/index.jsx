import { Outlet, Navigate } from 'react-router-dom'
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";

const ProtectedRoute = () => {
    const { usuario } = useAutenticacao();

    const user = usuario; 
    console.log(user)
    return user ? <Outlet /> : <Navigate to="/login" /> 
}

export default ProtectedRoute;