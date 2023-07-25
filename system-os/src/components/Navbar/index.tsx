import { AiOutlineMenu } from 'react-icons/ai'
import { menu } from './menu'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-gray-800 w-screen drop-shadow-md select-none">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo Icon e Logo name */}
                <a href="#" className='flex items-center'>
                    <img src="https://flowbite.com/docs/images/logo.svg" className='h-8 mr-3' alt="logo" />
                    <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Flowbite</span>
                </a>
                {/* Button response */}
                <button className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open main menu</span>
                    <AiOutlineMenu className="w-6 h-6" />
                </button>
                <div className="max-md:hidden">
                    <ul className='flex gap-3'>
                        {menu.map((item, id) => {
                            return (
                                <li key={id} className='item-nav text-white'>
                                    <Link className='center-page gap-1' to={item.href}>{item.name} {item.icon}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
