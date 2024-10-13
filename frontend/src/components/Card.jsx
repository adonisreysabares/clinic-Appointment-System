import React from "react";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography } from "@mui/material";
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({

    root: {
      minWidth: 360,
      marginBottom: 16,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  export default function AppointmentCard({icon,title,data}){
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardContent>
                {icon && <img src={icon} alt="icon" style={{ width: 40, height: 40, marginBottom: 8 }} />}
                <Typography variant="h5" component="h2">
                {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                {data}
                </Typography>
            </CardContent>
        </Card>
    )
  }