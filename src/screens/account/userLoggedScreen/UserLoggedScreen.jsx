import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { LoadingModal } from "../../../components/shared/loadingModal/LoadingModal";
import { InfoUser } from "../../../components/account/infoUser/InfoUser";
import { AccountOptions } from "../../../components/account/AccountOptions";


export const UserLoggedScreen=()=> {
   const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [_, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

   const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

      <AccountOptions onReload={onReload} />

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnTextStyle}
        onPress={logout}
      />

      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
}


 const styles = StyleSheet.create({
    btnStyles: {
      marginTop: 30,
      paddingVertical: 10,
      borderRadius: 0,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: "#e3e3e3",
      borderBottomWidth: 1,
      borderBottomColor: "#e3e3e3",
    },
    btnTextStyle: {
      color: "#00a680",
    },
  });
  