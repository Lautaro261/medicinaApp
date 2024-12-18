import React, { useState, useEffect } from "react";
import { UserGuestScreen } from "./userGuestScreen/UserGuestScreen";
import { UserLoggedScreen } from "./userLoggedScreen/UserLoggedScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoadingModal } from "../../components/shared/loadingModal/LoadingModal";


export const AccountScreen = ()=> {
  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

   if (hasLogged === null) {
    return <LoadingModal show text="Cargando" />;
  } 

  return hasLogged ? <UserLoggedScreen/> : <UserGuestScreen/>;
}
