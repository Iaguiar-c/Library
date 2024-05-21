import { useTraducao } from "../../contextos/TraducaoProvider/TraducaoProvider";

export default function TranslationButtons() {
  const { toggleTraducao } = useTraducao();

  return (
    <>
      <div
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex="-1"
      >
        <div>
          <button
            type="submit"
            className="block px-4 py-2 text-sm text-gray-700"
            onClick={() => toggleTraducao("pt")}
          >
            Português
          </button>
          <button
            type="submit"
            className="block px-4 py-2 text-sm text-gray-700"
            onClick={() => toggleTraducao("en")}
          >
            Inglês
          </button>
          <button
            type="submit"
            className="block px-4 py-2 text-sm text-gray-700"
            onClick={() => toggleTraducao("es")}
          >
            Espanhol
          </button>
        </div>
      </div>
    </>
  );
}
