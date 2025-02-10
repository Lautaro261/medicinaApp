import { ACCESS_TOKEN } from "../../config.json"

export const handleIntegrationMP = async (professionalId) => {
  const preferencia = {
    items: [
      {
        title: "Verificación de Servicio",
        description: "Adquisición de Verificado",
        quantity: 1,
        currency_id: "ARS",
        unit_price: 1,
      },
    ],
    back_urls: {
      success: `myapp://payment-status/success/${professionalId}`,
      failure: `myapp://payment-status/failure/${professionalId}`,
      pending: `myapp://payment-status/pending/${professionalId}`
  },
    auto_return: "approved",
  };

  try {
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferencia),
      }
    );

    const data = await response.json();
    return data.init_point; // Devuelve la URL de pago

  } catch (error) {
    console.error("Error al generar la preferencia de pago:", error);
  }
};


export const handleIntegrationMPAppointment = async () => {
    const preferencia = {
      items: [
        {
          title: "Reserva de Turno",
          description: "Pago por reserva de turno con profesional de salud",
          quantity: 1,
          currency_id: "ARS",
          unit_price: 1, // Precio actualizado
        },
      ],
    };
  
    try {
      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferencia),
      });
  
      const data = await response.json();
      return data.init_point;
    } catch (error) {
      console.error("Error al integrar Mercado Pago:", error);
      return null;
    }
  };