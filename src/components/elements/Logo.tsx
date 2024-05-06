import { Link } from "react-router-dom"
import logo from "../../assets/logo-app.png"

const Logo = () => {
  return (
    <Link to={"/"}>
    <img src={logo} alt='logo' className='size-24'/>
    </Link>
  )
}

export default Logo
