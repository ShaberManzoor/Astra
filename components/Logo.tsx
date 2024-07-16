import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <div className='flex mr-auto items-center gap-2 my-3'>
        <Link href={'/'}>
            <Image src="/astra.png" alt="logo" width={30} height={30} />
        </Link>
        <Typography className='dark:text-white text-black' sx={{display: {md: 'block', sm: 'none', xs: 'none'}, mr: 'auto', fontWeight: '800'}}>
            <span className='text-[20px]'>Astra</span>
        </Typography>
    </div>
  )
}

export default Logo