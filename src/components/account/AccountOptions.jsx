import React, { useState } from "react";
import { View } from "react-native";
import { ListItem, Icon, Text } from "@rneui/themed";
import { map } from "lodash";
import { Modal } from "../shared/modal/Modal";
import { ChangeDisplayNameForm } from "./changeDisplayNameForm/ChangeDisplayNameForm";
import { ChangeEmailForm } from "./changeEmailForm/ChangeEmailForm";
import { ChangePasswordForm } from "./changePasswordForm/ChangePasswordForm";
import { ChangeGeneralForm } from "./changeGeneralForm/ChangeGeneralForm";

export function AccountOptions(props) {
  const { onReload } = props;

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const selectedComponent = (key) => {
    if (key === "displayName") {
      setRenderComponent(
        <ChangeDisplayNameForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }

    if (key === "email") {
      setRenderComponent(
        <ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }

    if (key === "password") {
      setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal} />);
    }

    if (key === "generalInfo") { // 👈 Nueva opción
      setRenderComponent(<ChangeGeneralForm onClose={onCloseOpenModal} onReload={onReload} />);
    }

    onCloseOpenModal();
  };

  const menuOptions = getMenuOptions(selectedComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} bottomDivider onPress={menu.onPress}>
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.iconType}
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

// 🔹 Agregamos la nueva opción en el menú
const getMenuOptions = (selectedComponent) => [
  {
    title: "Cambiar Nombre y Apellido",
    iconType: "material-community",
    iconNameLeft: "account-circle",
    iconColorLeft: "#ccc",
    iconNameRight: "chevron-right",
    iconColorRight: "#ccc",
    onPress: () => selectedComponent("displayName"),
  },
  {
    title: "Cambiar Correo Electrónico",
    iconType: "material-community",
    iconNameLeft: "email",
    iconColorLeft: "#ccc",
    iconNameRight: "chevron-right",
    iconColorRight: "#ccc",
    onPress: () => selectedComponent("email"),
  },
  {
    title: "Cambiar Contraseña",
    iconType: "material-community",
    iconNameLeft: "lock",
    iconColorLeft: "#ccc",
    iconNameRight: "chevron-right",
    iconColorRight: "#ccc",
    onPress: () => selectedComponent("password"),
  },
  {
    title: "Información General", // 👈 Nueva opción
    iconType: "material-community",
    iconNameLeft: "account-details",
    iconColorLeft: "#ccc",
    iconNameRight: "chevron-right",
    iconColorRight: "#ccc",
    onPress: () => selectedComponent("generalInfo"),
  },
];
