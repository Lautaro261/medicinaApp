import { v4 as uuid } from "uuid";
import { doc, setDoc, addDoc, collection, updateDoc, Timestamp, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";

export const createProfessionalAndSlots = async (formValue, numDias, horaInicio, horaFin) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.log("Usuario no autenticado.");
    return;
  }

  try {
    const newProfessional = {
      ...formValue,
      id: uuid(),
      createdAt: Timestamp.fromDate(new Date()),  // Usar Timestamp para createdAt
      userId: currentUser.uid, // Relacionar el profesional con el usuario autenticado
    };

    // Guardar el nuevo profesional en Firestore
    await setDoc(doc(db, "professionals", newProfessional.id), newProfessional);

    // Definir el rango de fechas para crear los turnos
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + numDias);

    // Iterar sobre cada día en el rango de fechas
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) { // Solo Lunes a Viernes
        let startHour = parseInt(horaInicio.split(":")[0]);
        let endHour = parseInt(horaFin.split(":")[0]);

        for (let time = startHour; time < endHour; time += 0.5) { // Avanza cada 30 minutos
          const hours = Math.floor(time);
          const minutes = time % 1 === 0 ? "00" : "30"; // Alterna entre "00" y "30"

          const turno = {
            id: uuid(),
            professionalId: newProfessional.id,
            date: currentDate.toISOString().split("T")[0], // Almacenar la fecha como string
            time: `${hours.toString().padStart(2, '0')}:${minutes}`, // Formato correcto
            duration: 30,
            status: "available",
            clientId: null,
            clientName: null,
            clientPhone: null,
            clientDni: null,
            createdAt: Timestamp.fromDate(new Date()),  // Usar Timestamp para createdAt
          };

          await addDoc(collection(db, "Appointments"), turno);
          console.log("Turno creado:", turno);
        }
      }
      // Avanzar al siguiente día
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Actualizar el campo registrationCompleted en users
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, { registrationCompleted: true });

  } catch (error) {
    console.log("Error al crear el profesional:", error);
  }
};


// utils/updateAppointmentByCustomId.js


export const updateAppointmentByCustomId = async (customId, updateData, db) => {
  try {
    const appointmentsRef = collection(db, "Appointments");
    const q = query(appointmentsRef, where("id", "==", customId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.error("No se encontró el turno con id:", customId);
      return;
    }
    // Supongamos que solo hay un documento con ese customId
    const appointmentDoc = querySnapshot.docs[0];
    // Actualiza el documento encontrado (sin borrar otros campos)
    await updateDoc(doc(db, "Appointments", appointmentDoc.id), updateData);
    console.log("Turno actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar el turno:", error);
    throw error;
  }
};
