import React, { useContext } from 'react'
import { CardElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button, Container, makeStyles } from '@material-ui/core'
import { helpHttp } from '../services/helpHttp';
import { SearchContext } from '../context/SearchContext';
import { AlertMessage } from './AlertMessage';

const useStyles = makeStyles(() => ({
    container: {
        display:'flex',
        justifyContent:'center',
        width:'90vw',
        marginTop: 80
    },
    form:{
       
        display:'flex',
        flexDirection:'column',
        gap:40,
       
        width:500,
        height:400,

        border: 'solid 1px white',
        borderRadius: 20,
        padding:20
    },
    img:{
        display:'block',
        margin: '0 auto',
        marginTop:20
       
    },
    button:{
        marginTop:10,
        fontWeight:'bold',
    }
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
    const {setAlert} = useContext(SearchContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if(!error){

            const {id} = paymentMethod
            helpHttp().post(`${process.env.REACT_APP_URL_API}/donaciones`,{
                headers: {
                    "Content-Type": "application/json",
                  
                },
                body: {
                   id,
                   amount: 200
                }
            })
            .then(res=>{
                console.log(res)
               setAlert({
                   open:true,
                   type: res.error? "error" : "success",
                   message: res.error? res.error : res.message
               })
               if (!res.error)  elements.getElement(CardElement).clear()
             
            })
        }

    }

    return (

        <Container className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <img className={classes.img} src="cerveza.png" alt="Invitame a una cerveza" width='140' />
                <h4 style={{textAlign:'center'}}>Invítame a una jarra 2€</h4>
                <CardElement options={CARD_ELEMENT_OPTIONS}/>
                <Button variant='contained' color='secondary'type='submit' className={classes.button} fullWidth>Donar</Button>
            </form>
            <AlertMessage/>
        </Container>


    )
}

export default Checkout