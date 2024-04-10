import {  useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Header(){
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
  
    useEffect(() => {
    //   const userId = localStorage.getItem("userId");
  
    //   setLoading(true);
  
    //   axios
    //     .get(`http://localhost:5555/api/user/${userId}`)
    //     .then((response) => {
    //       const user = response.data;
    //       setUserData(user);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       setLoading(false);
    //       console.log(error);
    //     });
    }, []);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return (
        <div>usuário logado</div>
    //     <>
    //     <div>oii</div>
    //     <header className="bg-white">
    //       <nav
    //         className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
    //         aria-label="Global"
    //       >
          
    
    //         <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
    //           <button
    //             type="button"
    //             className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    //             id="user-menu-button"
    //             aria-expanded={isOpen}
    //             onClick={toggleDropdown}
    //           >
    //             <span className="sr-only">Open user menu</span>
    //             <img
    //               className="w-8 h-8 rounded-full"
    //               src="/docs/images/people/profile-picture-3.jpg"
    //               alt="user photo"
    //             ></img>
    //           </button>
    
    //           {isOpen && (
    //   <div
    //     className="z-50 top-full right-0 absolute my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
    //     id="user-dropdown"
    //   >
    //     <div className="px-4 py-3">
    //       <span className="block text-sm text-gray-900 dark:text-white">
    //         {userData.username}
    //       </span>
    //       <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
    //         {userData.email}
    //       </span>
    //     </div>
    //     <ul className="py-2" aria-labelledby="user-menu-button">
    //       <li>
    //         <Link
    //           to="/edit-profile" // Adicione a rota da página de edição de perfil
    //           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //         >
    //           Editar Perfil
    //         </Link>
    //       </li>
    
    //       <li>
    //         {/* Adicione um Link para a página de login */}
    //         <Link
    //           to="/" // Adicione a rota da página de login
    //           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //         >
    //           Sair
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // )}
          
    //         </div>
    //       </nav>
    //       <Dialog
    //         as="div"
    //         className="lg:hidden"
    //         open={mobileMenuOpen}
    //         onClose={setMobileMenuOpen}
    //       >
    //         <div className="fixed inset-0 z-10" />
    //         <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
    //           <div className="flex items-center justify-between">
    //             <a href="#" className="-m-1.5 p-1.5">
    //               <span className="sr-only">Your Company</span>
    //               <img
    //                 className="h-8 w-auto"
    //                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    //                 alt=""
    //               />
    //             </a>
    //             <button
    //               type="button"
    //               className="-m-2.5 rounded-md p-2.5 text-gray-700"
    //               onClick={() => setMobileMenuOpen(false)}
    //             >
    //               <span className="sr-only">Close menu</span>
    //               <XMarkIcon className="h-6 w-6" aria-hidden="true" />
    //             </button>
    //           </div>
    //           <div className="mt-6 flow-root">
    //             <div className="-my-6 divide-y divide-gray-500/10">
    //               <div className="space-y-2 py-6">
    //                 <Disclosure as="div" className="-mx-3">
    //                   {({ open }) => (
    //                     <>
    //                       <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
    //                         Product
    //                         <ChevronDownIcon
    //                           className={classNames(
    //                             open ? "rotate-180" : "",
    //                             "h-5 w-5 flex-none"
    //                           )}
    //                           aria-hidden="true"
    //                         />
    //                       </Disclosure.Button>
    //                     </>
    //                   )}
    //                 </Disclosure>
    //                 <a
    //                   href="#"
    //                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //                 >
    //                   Features
    //                 </a>
    //                 <a
    //                   href="#"
    //                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //                 >
    //                   Marketplace
    //                 </a>
    //                 <a
    //                   href="#"
    //                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //                 >
    //                   Company
    //                 </a>
    //               </div>
    //               <div className="py-6">
    //                 <a
    //                   href="#"
    //                   className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //                 >
    //                   Log in
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </Dialog.Panel>
    //       </Dialog>
    //     </header>
    //     </>
    );
}