import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <header className='flex items-center justify-around mt-2 mb-8 '>
      <h1>LOGO</h1>
      <Link to="/login">
      <button className='p-2 text-white bg-red-400 rounded-md'>Se connecter</button>
      </Link>
    </header>
  )
}

export default Banner
