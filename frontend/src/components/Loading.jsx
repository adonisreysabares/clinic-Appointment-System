import * as React from 'react'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loading(){
    const [progress, setProgress] = React.useState(0)

    React.useEffect(()=>{
        const timer = setInterval(()=>{
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10))
        },800)

        return () =>{
            clearInterval(timer)
        }
    },[])

    
    return (
    <Stack spacing={2} direction="row">
        <CircularProgress variant="determinate" value={progress} />
    </Stack>
    
    )
}