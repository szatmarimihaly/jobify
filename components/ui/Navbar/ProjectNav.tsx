import SignOut from '../Auth/SignOut'
import NavigationGradientRounded from '../Button/NavigationGradientRounded'
import { getCurrentUser, hasUnlimitedCredits } from '@/lib/auth/getCurrentUser'
import Coins from '../Design/Coins';
import CreateProjectNav from '../Button/CreateProjectNav';

const ProjectNav = async () => {

  const user = await getCurrentUser();

  const isUnlimitedCredits = hasUnlimitedCredits(user!.role);

  return (
    <nav className='flex flex-row items-center justify-between px-2 py-4'>
      {/*
      {isUnlimitedCredits ? (
        <span className='text-sm text-gray-500'>∞ Unlimited</span>
      ) : (
        <Coins text={user!.credits.toString()}/>
      )}
      */}
      <CreateProjectNav/>
    </nav>
  )
}

export default ProjectNav