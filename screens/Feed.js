// Importa o React e Component do React para a construção de componentes de classe
import React, { Component } from "react";

// Importa os componentes de Visão, Texto, Estilo Seguro (SafeAreaView), Plataforma (Platform),
// Barra de Status (StatusBar) e Imagem do React Native para construir a interface do usuário
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, Image } from "react-native";

// Importa o RFValue para tornar o tamanho responsivo
import { RFValue } from "react-native-responsive-fontsize";

// Importa o componente StoryCard personalizado
import StoryCard from "./StoryCard";

// Importa a biblioteca Font do Expo para carregar fontes personalizadas
import * as Font from "expo-font";

// Importa o FlatList do React Native para renderização eficiente de listas
import { FlatList } from "react-native-gesture-handler";

// Importa SplashScreen do Expo para gerenciar a tela de introdução
import * as SplashScreen from 'expo-splash-screen';

// Evita que a tela de introdução seja ocultada automaticamente
SplashScreen.preventAutoHideAsync();

// Define um objeto para armazenar fontes personalizadas
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

// Requer o arquivo JSON de histórias temporárias
let stories = require("./temp_stories.json");

// Define o componente de classe Feed
export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    };
  }

  // Função assíncrona para carregar as fontes personalizadas
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  // Ciclo de vida: é chamado quando o componente é montado
  componentDidMount() {
    this._loadFontsAsync();
  }

  // Função para renderizar cada item da lista
  renderItem = ({ item: story }) => {
    return <StoryCard story={story} />;
  };

  // Função para obter a chave única de cada item na lista
  keyExtractor = (item, index) => index.toString();

  // Renderização do componente
  render() {
    // Verifica se as fontes foram carregadas
    if (this.state.fontsLoaded) {
      // Oculta a tela de introdução quando as fontes estão carregadas
      SplashScreen.hideAsync();
      return (
        // Componente de Visão principal
        <View style={styles.container}>
          {/* Área segura para dispositivos Android */}
          <SafeAreaView style={styles.droidSafeArea} />
          
          {/* Título do aplicativo */}
          <View style={styles.appTitle}>
            {/* Ícone do aplicativo */}
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            {/* Texto do título do aplicativo */}
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>App Narração de Histórias</Text>
            </View>
          </View>

          {/* Contêiner de cartões de história */}
          <View style={styles.cardContainer}>
            {/* Lista plana para exibir as histórias */}
            <FlatList
              keyExtractor={this.keyExtractor}
              data={stories}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      );
    }
  }
}

// Estilos utilizando o StyleSheet do React Native
const styles = StyleSheet.create({
  // Estilo principal da Visão
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  // Área segura para dispositivos Android
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  // Título do aplicativo
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  // Ícone do aplicativo
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  // Imagem do ícone
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  // Contêiner de texto do título do aplicativo
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  // Texto do título do aplicativo
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  // Contêiner de cartões de história
  cardContainer: {
    flex: 0.93
  }
});
