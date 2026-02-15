import nobrain from '@/assets/brain.svg'
import UserWidget from './UserWidget'
export default function () {
  return (
    <>  
      <div className='brand'>
        <p>N<img src={nobrain} alt="logo" width={64} height={64} /> Brain</p>
        <UserWidget />
      </div>
    </>
  )
}