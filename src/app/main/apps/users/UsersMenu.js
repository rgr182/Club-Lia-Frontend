import React from 'react'
import { Link, useParams } from 'react-router-dom';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import '../../../../styles/newdesign.css';

// Components
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  cardShadowColor: {
    "-webkit-box-shadow": "0px 0px 15px 3px " + theme.palette.primary.light + "B3 !important",
    boxShadow: "0px 0px 15px 3px " + theme.palette.primary.light + "B3 !important",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    color: '#353535',
  },
  blueButton: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main + 'CC',
    }
  },
  title: {
    fontFamily: 'Wendyone',
    fontSize: '25px',
    fontWeight: 400,
    lineHeight: '26px',
  },
  button: {
    alignContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    width: '283px',
    borderRadius: '20px',
    height: '78px',
    marginTop: '8px',
    border: 'solid '+ theme.palette.primary.light + ' 3px',
    fontFamily: 'Poppins',
    padding: '3px',
    textTransform: 'none',
    color: '#fff',
    backgroundColor: theme.palette.primary.light,


    '&:hover': {
      background: theme.palette.primary.light,
      color: '#fff',
      borderColor: theme.palette.primary.main
    },
    '& .MuiButton-root, &.Mui-disabled': {
      color: '#BEBEBE',
      backgroundColor: '#F5F5F5',
      borderColor: '#F5F5F5'
    }
  },
  labelButton: {
    fontFamily: 'GROBOLD',
    fontSize: '25px',
    color: '#FFF'
  },
  TextIcons: {
    fontFamily: "Wendyone",
    fontSize: "18px",
    color: '353535',
    text: "center",
    alignSelf: "center",
    textAlign: "center",
    textTransform: "capitalize"
  },
}));

export default function UsersMenu() {
  const classes = useStyles();
  return (
    <div>
      <FuseAnimateGroup
        className="flex flex-wrap justify-center"
        enter={{
          animation: 'transition.slideUpBigIn'
        }}
      >
        <Card elevation={1} className={clsx("card", classes.cardShadowColor)}>
          <Typography color="primary" className={classes.title}>
            Usuarios Generales
          </Typography>

          <div className="flex flex-wrap flex-row w-full mt-12 mb-44 justify-center">
            <div className="flex w-full xs:w-1 sm:w-1/3 md:w-1/3 p-12 flex-col">
              <Button
                // to='/apps/listausuarios/escuelas'
                component={Link}
                type="button"
              >
                <div className="flex flex-col">
                  <img className="flex w-100 p-12" src="assets/images/usersList/escuelas.png" />
                  <Typography className={clsx(classes.TextIcons)}>
                    Escuelas
                  </Typography>
                </div>
              </Button>
            </div>

            <div className="flex w-full xs:w-1 sm:w-1/3 md:w-1/3 p-12 flex-col">
              <Button
                to='/apps/listausuarios/teachers'
                component={Link}
                type="button"
              >
                <div className="flex flex-col">
                  <img className="flex w-100 p-12" src="assets/images/usersList/maestros.png" />
                  <Typography className={clsx(classes.TextIcons)}>
                    Maestros
                  </Typography>
                </div>
              </Button>
            </div>

            <div className="flex w-full xs:w-1 sm:w-1/3 md:w-1/3 p-12 flex-col">
              <Button
                // to='/apps/listausuarios/students'
                component={Link}
                type="button"
              >
                <div className="flex flex-col">
                  <img className="flex w-100 p-12" src="assets/images/usersList/alumnos.png" />
                  <Typography className={clsx(classes.TextIcons)}>
                    Alumnos
                  </Typography>
                </div>
              </Button>
            </div>
          </div>

          <Typography color="primary" className={classes.title}>
            Usuarios Global Schooling
          </Typography>
          <div className="flex flex-wrap flex-row w-full mt-12 justify-center">
            <div className="flex w-full xs:w-1 sm:w-1/3 md:w-1/3 p-12 flex-col">
              <Button
                to='/apps/interested'
                component={Link}
                type="button"
              >
                <div className="flex flex-col">
                  <img className="flex w-100 p-12" src="assets/images/usersList/interesados.png" />
                  <Typography className={clsx(classes.TextIcons)}>
                    Interesados
                  </Typography>
                </div>
              </Button>
            </div>

            <div className="flex w-full xs:w-1 sm:w-1/3 md:w-1/3 p-12 flex-col">
              <Button
                 to='/apps/listausuarios/students'
                component={Link}
                type="button"
              >
                <div className="flex flex-col">
                  <img className="flex w-100 p-12" src="assets/images/usersList/alumnosgs.png" />
                  <Typography className={clsx(classes.TextIcons)}>
                    Alumnos
                  </Typography>
                </div>
              </Button>
            </div>
          </div>
        </Card>
      </FuseAnimateGroup>
    </div>
  )
}
