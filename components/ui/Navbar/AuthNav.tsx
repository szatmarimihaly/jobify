import SignOut from '../Auth/SignOut'
import NavigationGradientRounded from '../Button/NavigationGradientRounded'

const AuthNav = () => {
  return (
    <nav className='flex flex-row items-center justify-between px-2 py-4'>
        <h3 className='bg-linear-to-r from-teal-500 to-blue-300 bg-clip-text text-transparent text-3xl font-bold'>Jobify</h3>
        <SignOut/>
    </nav>
  )
}

export default AuthNav