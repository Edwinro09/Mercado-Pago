import mercadopago from "mercadopago";
import { HOST, MERCADOPAGO_API_KEY} from "../config.js";

export const CreateOrder = async (req, res) => {
    
  mercadopago.configure({

        access_token: MERCADOPAGO_API_KEY, // Lo sacas de logiarte con usuario de prueba (https://www.mercadopago.com.co/developers)
  });

 const result = await mercadopago.preferences.create({
    items : [
        {
            title : "carro ultimo modelo",
            unit_price: 5000,
            currency_id: "COP",
            quantity: 1,

        }
    ],
    back_urls: {
        success: `${HOST}/success`,
        failure: `${HOST}/failure`,
        pending: `${HOST}/pending`,
    },
    notification_url: "https://6656-186-84-22-77.ngrok.io/webhook", // Crear peticion en (THUNDER CLIENT {POST:http://localhost:3000/create-order})
  })

  console.log(result);

  res.send(result.body);
};


export const  receiveWebhook = async (req, res) => {
    const payment = req.query;

    try {
        if (payment.type === "payment") {
            const data = await mercadopago.payment.findById(payment['date_id']);
            console.log(data);
    // Guardar en base de datos
    }
            
    res.sendStatus(204)
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
    }
};