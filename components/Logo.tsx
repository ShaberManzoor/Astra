import { Typography } from '@mui/material'
import Link from 'next/link'

const Logo = () => {
  return (
    <div className='flex mr-auto items-center gap-2 my-3'>
        <Link href={'/'}>
            <img src="/astra.png" alt="logo" width={'30px'} height={'30px'} className='dark:invert' />
        </Link>
        <Typography className='dark:text-white text-black' sx={{display: {md: 'block', sm: 'none', xs: 'none'}, mr: 'auto', fontWeight: '800'}}>
            <span className='text-[20px]'>Astra</span>
        </Typography>
    </div>
  )
}

export default Logo