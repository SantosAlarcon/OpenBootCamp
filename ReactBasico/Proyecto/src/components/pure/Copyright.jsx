import React from 'react'
import {Link} from '@mui/material'
import Typography from '@mui/material/Typography'

const Copyright = () => {
  return (
    <Typography variant="body2" color="GrayText" align='center'>
        {'Copyright (C) ' + new Date().getFullYear() + ' - '}
        <Link color="inherit" href="">
            Santos Alarcón Asensio
        </Link>
    </Typography>
  )
}

export default Copyright