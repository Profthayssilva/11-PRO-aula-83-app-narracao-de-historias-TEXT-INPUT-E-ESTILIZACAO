// Importa o React para a construção de componentes
import React from "react";

// Importa o StyleSheet do React Native para a estilização
import { StyleSheet } from "react-native";

// Importa o createMaterialBottomTabNavigator do pacote @react-navigation/material-bottom-tabs
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// Importa o componente Ionicons para ícones vetoriais
import Ionicons from "react-native-vector-icons/Ionicons";

// Importa o RFValue para tornar o tamanho responsivo
import { RFValue } from "react-native-responsive-fontsize";

// Importa os componentes de tela Feed e CreateStory da pasta ../screens
import Feed from "../screens/Feed";
import CreateStory from "../screens/CreateStory";

// Cria um objeto Tab utilizando o createMaterialBottomTabNavigator
const Tab = createMaterialBottomTabNavigator();

// Define o componente funcional BottomTabNavigator
const BottomTabNavigator = () => {
  return (
    // Renderiza o Tab.Navigator que configura a navegação por abas na parte inferior
    <Tab.Navigator
      // Define que os rótulos (labels) das abas não serão exibidos
      labeled={false}
      // Estilo da barra de navegação inferior
      barStyle={styles.bottomTabStyle}
      // Configurações individuais para cada aba (screen)
      screenOptions={({ route }) => ({
        // Configuração do ícone para cada aba
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Se a aba for "Feed", define o ícone com base no foco
          if (route.name === "Feed") {
            // 'home' quando a aba está focada, 'home-outline' quando não está
            iconName = focused ? "home" : "home-outline";
          } 
          // Se a aba for "Create Story", define o ícone com base no foco
          else if (route.name === "Create Story") {
            // 'add-circle' quando a aba está focada, 'add-circle-outline' quando não está
            iconName = focused ? "add-circle" : "add-circle-outline";
          }
          // Retorna o componente Ionicons com o ícone correspondente
          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)} // Usa o RFValue para tornar o tamanho responsivo
              color={color}
              style={styles.icons}
            />
          );
        }
      })}
      // Cor quando a aba está ativa
      activeColor={"#ee8249"}
      // Cor quando a aba está inativa
      inactiveColor={"gray"}
    >
      {/* Define a aba "Feed" com o componente Feed */}
      <Tab.Screen name="Feed" component={Feed} options={{headerShown:false}}/>
      {/* Define a aba "Create Story" com o componente CreateStory */}
      <Tab.Screen name="Create Story" component={CreateStory} options={{headerShown:false}}/>
    </Tab.Navigator>
  );
};

// Estilos utilizando o StyleSheet do React Native
const styles = StyleSheet.create({
  // Estilo da barra de navegação inferior
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
  },
  // Estilo para os ícones
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});

// Exporta o componente BottomTabNavigator para ser utilizado em outras partes do aplicativo
export default BottomTabNavigator;
