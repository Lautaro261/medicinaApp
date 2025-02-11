/* export const transformAppointments = (rawData) => {
    const formattedAppointments = rawData.reduce((acc, appointment) => {
      const formattedDate = appointment.date.split("-").reverse().join("/"); // Convertir YYYY-MM-DD a DD/MM/YYYY
  
      const existingDate = acc.find(item => item.date === formattedDate);
      if (existingDate) {
        // Agregar solo horarios no duplicados
        if (!existingDate.times.includes(appointment.time)) {
          existingDate.times.push(appointment.time);
        }
      } else {
        acc.push({ date: formattedDate, times: [appointment.time] });
      }
      return acc;
    }, []);
  
    // Ordenar por fecha para mostrar en orden cronológico
    formattedAppointments.sort((a, b) => {
      const dateA = a.date.split("/").reverse().join("-");
      const dateB = b.date.split("/").reverse().join("-");
      return dateA.localeCompare(dateB);
    });
  
    return formattedAppointments;
  };
   */
  
  export const transformAppointments = (rawData) => {
    const grouped = rawData.reduce((acc, appointment) => {
      const formattedDate = appointment.date.split("-").reverse().join("/"); // Convertir YYYY-MM-DD a DD/MM/YYYY
      const existing = acc.find(item => item.date === formattedDate);
  
      const appointmentData = {
        id: appointment.id,
        status: appointment.status,
        time: appointment.time,
      };
  
      if (existing) {
        // Agregar el turno si no existe ya uno con el mismo ID (para evitar duplicados)
        if (!existing.times.some(t => t.id === appointment.id)) {
          existing.times.push(appointmentData);
        }
      } else {
        acc.push({ date: formattedDate, times: [appointmentData] });
      }
  
      return acc;
    }, []);
  
    // Ordenar cada array de tiempos (turnos) en base a la hora
    grouped.forEach(day => {
      day.times.sort((a, b) => a.time.localeCompare(b.time));
    });
  
    // Ordenar el arreglo completo de días en orden cronológico
    grouped.sort((a, b) => {
      const dateA = a.date.split("/").reverse().join("-");
      const dateB = b.date.split("/").reverse().join("-");
      return dateA.localeCompare(dateB);
    });
  
    return grouped;
  };
  