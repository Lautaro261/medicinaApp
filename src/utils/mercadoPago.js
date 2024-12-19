import { ACCESS_TOKEN } from "../../config.json"

export const handleIntegrationMP = async () => {

    const preferencia = {
        "items": [
            {
                "title": 'Verificación de Servicio',
                "description": "Adquisición de Verificado",
                "quantity": 1,
                "currency_id": "$",
                "unit_price": 100
            }
        ]
    }

    try {
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preferencia)
        })

        const data = await response.json()

        return data.init_point
        
    } catch (error) {
        console.log(error)
    }
}