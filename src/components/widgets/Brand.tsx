import nobrain from '@/assets/brain.svg'
import UserWidget from './UserWidget'
import { Link } from 'react-router-dom'
export default function () {
  return (
    <>  
      <div className='brand'>
        <Link to={'/'}>N<img src={nobrain} alt="logo" width={64} height={64} /> Brain</Link>
        <UserWidget />
      </div>
    </>
  )
}