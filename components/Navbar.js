'use client';
import AppBar from '@mui/material/AppBar';
import { ToastContainer, toast } from "react-toastify";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { Login } from '@/services/user';
import Link from 'next/link';


export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [token, setToken] = useState('');
    const [values, setValues] = useState({
      email: '',
      password: ''
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
      const {name, value} = e.target;

      setValues({
        ...values,
        [name]: value
      });
    }

    const handleClick = () => {
      setLoading(true);
      setError('');
      setSuccess('');
      Login({email: values.email,password: values.password}).then((res) => {
        if(res?.status === 200){
          localStorage.setItem("token", res?.data?.token);
          setSuccess('Logged in successfully');
          setLoading(false);
          window.location = '/';
        }else{
          setError(res.response?.data?.message);
          setLoading(false);
        }
      })
    }

    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location = '/';
    }

    useEffect(() => {
      if(typeof window !== "undefined"){
        setToken(window.localStorage.getItem('token'))
       }else{
          setToken('');
       }
    },[])

    useEffect(() => {
      if(error){
        toast.error(error)
      }
      if(success){
        toast.success(success)
      }
    },[success, error])
 
  return (
    <>
    <ToastContainer theme="colored" autoClose={2000} limit={1} className="z-50" />
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href={'/'}>
            Resto
            </Link>
          </Typography>
          {token ? <Link href='/orders' className='!text-white !text-lg me-5'>Orders</Link> :
          <Button className='!text-white !text-lg' onClick={handleOpen}>Login</Button>}
          {token && <Button className='!text-white !text-lg' onClick={handleLogout}>Log Out</Button>}
        </Toolbar>
      </AppBar>
    </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className='flex justify-center items-center'
        >
          <Box className='bg-white p-5 flex flex-col'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Login
            </Typography>
            <TextField className='!mt-4' id="outlined-basic" type='email' name='email' label="Email" variant="outlined" onChange={handleChange}/>
            <TextField className='!my-4' id="outlined-basic" type='password' name='password' label="Password" variant="outlined" onChange={handleChange}/>
            <Button onClick={handleClick} disabled={loading | !values.email | !values.password}>{loading ? 'Loading...' : 'LogIn'}</Button>
          </Box>
        </Modal>
    </>
  );
}