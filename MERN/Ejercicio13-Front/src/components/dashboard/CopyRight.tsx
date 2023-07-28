import { Link, Typography } from "@mui/material"

const CopyRight = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright (c) ' + new Date().getFullYear()}
      <Link color="inherit">
        OpenBootCamp
      </Link>
    </Typography>
  )
}

export default CopyRight
