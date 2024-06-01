import { useLivros } from "../../contextos/LivrosProvider/LivrosProvider";
import { useUsuario } from "../../contextos/UsuarioProvider/UsuarioProvider";


export default function Dashboard() {
    const { getAllBooksForUser, livros } = useLivros();
    const { usuario } = useUsuario()

    return (

        <>
            <button onClick={() => getAllBooksForUser(usuario._id)}>Gerar CSV - Mostrar Quantidade de Tudo (Categoria, Livro, Status, Usuarios)</button>
        </>
    )
};
