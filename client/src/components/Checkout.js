import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button, Container, makeStyles, CircularProgress } from '@material-ui/core'
import { helpHttp } from '../services/helpHttp';
import { GlobalContext } from '../context/GlobalContext';
import { AlertMessage } from './AlertMessage';
import { urls } from '../services/urlApi';
import {useNavigate} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        width: '90vw',
        marginTop: 30
    },
    form: {

        display: 'flex',
        flexDirection: 'column',
        gap: 40,

        width: 500,
        height: 400,

        border: 'solid 1px white',
        borderRadius: 20,
        padding: 20
    },
    img: {
        display: 'block',
        margin: '0 auto',
        marginTop: 20

    },
    button: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    title: {
        textAlign: 'center',
        fontSize: 32,
        marginTop: 32,
        color: theme.palette.text.secondary
    },
}))
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#CFD7DF",
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontSmoothing: "antialiased",
            "::placeholder": {
                color: "#CFD7DF"
            }
        },
        invalid: {
            color: "#e5424d",
            ":focus": {
                color: "#303238"
            }
        }
    }
};

const Checkout = () => {
    const stripe = useStripe()
    const elements = useElements()
    const classes = useStyles()
    const { setAlert } = useContext(GlobalContext)
    const user = useSelector(state => state.user)
    const [sending, setSending] = useState(false)
    const navigate = useNavigate()

    
  useEffect(() => {
    if (!user.userInfo) {
      navigate('/login')
      return false
    }
    
  }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSending(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: user.userInfo.email
            }
        })

        if (!error) {
            //console.log(paymentMethod)
            const { id, billing_details } = paymentMethod
            helpHttp().post(`${urls().DONACIONES}`, {
                headers: {
                    "Content-Type": "application/json",

                },
                body: {
                    id,
                    amount: 200,
                    billing_details
                }
            })
                .then(res => {
                    //console.log(res)
                    setSending(false)
                    setAlert({
                        open: true,
                        type: res.error ? "error" : "success",
                        message: res.error ? res.error : (res.message + ' ' + user.userInfo.email)
                    })
                    if (!res.error) elements.getElement(CardElement).clear()

                })
        }



    }

    return (
        <>
            <h2 className={classes.title}>Donaciones</h2>
            <Container className={classes.container}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <img className={classes.img} src="cerveza.png" alt="Invitame a una cerveza" width='140' />
                    <h4 style={{ textAlign: 'center' }}>Invítame a una jarra 2€</h4>
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                    <Button variant='contained' color='secondary' type='submit' className={classes.button} fullWidth>{sending ? <CircularProgress size={24} /> : 'Donar'}</Button>
                </form>
                <AlertMessage />
            </Container>
        </>

    )
}

export default Checkout