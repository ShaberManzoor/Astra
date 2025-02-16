// 'use client'

// import { useAuthContext } from "@/app/context/AuthContext";
// import CustomizedInput from "@/components/CustomizedInput";
// import { Box, Button, Typography } from "@mui/material";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function SingUp() {
//   const {dispatch} = useAuthContext();
//   const router = useRouter();
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       const formData = new FormData(e.currentTarget);
//       const email = formData.get('email') as string;
//       const password = formData.get('password') as string;
//       const name = formData.get('name') as string;
      
//       try {
//         const res = await axios.post('/api/user/sign-up', {email, password, name});
//         dispatch({type: 'SET_USER', payload: res.data.user});
//         router.push('/');
//       } catch (error) {
//         dispatch({type: 'SET_ERROR', payload: 'Failed to create user'});
//         console.log(error);
//       }
//     }
//   return (
//     <Box 
//       width='100%' 
//       height='100%'
//       display='flex'
//       flex={1}
//     >
//       <Box
//         padding={8}
//         mt={8}
//         display={{md: 'flex', sm: 'none', xs: 'none'}}
//       >
//         <img src="/airobot.png" alt="robot" style={{width: '400px'}} />
//       </Box>
//       <Box
//         display='flex' 
//         flex={{xs: 1, md: 0.5}}
//         justifyContent='center'
//         alignItems='center'
//         padding={2}
//         ml='auto'
//         mt={16}
//       >
//         <form
//           onSubmit={handleSubmit}
//           style={{
//             margin: 'auto',
//             padding: '30px',
//             boxShadow: '10px 10px 20px #000',
//             borderRadius: '10px',
//             border: 'none'
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center'
//             }}
//           >
//             <Typography 
//               variant='h4' 
//               textAlign='center' 
//               padding={2} 
//               fontWeight={600}
//             >
//               Login
//             </Typography>
//             <CustomizedInput type='email' name='email' label='Email' />
//             <CustomizedInput type='password' name='password' label='Password' />
//             <CustomizedInput type='name' name='name' label='Name' />
//             <Button
//               type='submit'
//               sx={{
//                 px:2, 
//                 py:1, 
//                 mt:2, 
//                 width:'400px', 
//                 borderRadius:2, 
//                 bgcolor: '#00fffc',
//                 ":hover": {
//                   bgcolor: 'white',
//                   color: 'black'
//                 }
//               }}
//             >
//               Login
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Box>
//   )
// }

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp />;
}