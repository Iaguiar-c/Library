const { AutenticadoProvider } = require("./contextos/AutenticacaoProvider/Autenticacao");
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// criar as  rotas aqui 
function AppRoutes(){
    return(
        <AutenticadoProvider>
            <Router>
                <Routes>
                    {/* <Route path="" element={}></Route> */}
                </Routes>
            </Router>
        </AutenticadoProvider>
    )
}