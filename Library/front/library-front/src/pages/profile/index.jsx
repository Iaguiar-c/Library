// TODO: aplicar o contexto de internacionalização
import { useAutenticacao } from "../../contextos/AutenticacaoProvider/AutenticacaoProvider";

export default function Profile() {
  const { usuario } = useAutenticacao();
  return (
    <>
        <div>
            <h1>Olá, {usuario?.name}</h1>
            {usuario?.email}
        </div>
    </>
  );
}
