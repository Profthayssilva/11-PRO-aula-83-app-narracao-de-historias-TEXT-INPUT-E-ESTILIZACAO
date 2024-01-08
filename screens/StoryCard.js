// Importa o React e Component do React para a construção de componentes de classe
import React, { Component } from "react";

// Importa os componentes de Visão, Texto, Estilo (StyleSheet), Plataforma (Platform),
// Barra de Status (StatusBar), Imagem e Dimensões do React Native para construir a interface do usuário
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";

// Importa o componente Ionicons para ícones vetoriais
import Ionicons from "react-native-vector-icons/Ionicons";

// Importa o RFValue para tornar o tamanho responsivo
import { RFValue } from "react-native-responsive-fontsize";

// Importa a biblioteca Font do Expo para carregar fontes personalizadas
import * as Font from "expo-font";

// Importa SplashScreen do Expo para gerenciar a tela de introdução
import * as SplashScreen from 'expo-splash-screen';

// Evita que a tela de introdução seja ocultada automaticamente
SplashScreen.preventAutoHideAsync();

// Define um objeto para armazenar fontes personalizadas
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

// Define o componente de classe StoryCard
export default class StoryCard extends Component {
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

  // Renderização do componente
  render() {
    // Verifica se as fontes foram carregadas
    if (this.state.fontsLoaded) {
      // Oculta a tela de introdução quando as fontes estão carregadas
      SplashScreen.hideAsync();
      return (
        // Componente de Visão principal
        <View style={styles.container}>
          {/* Contêiner do cartão de história */}
          <View style={styles.cardContainer}>
            {/* Imagem da história */}
            <Image
              source={require("../assets/story_image_1.png")}
              style={styles.storyImage}
            ></Image>

            {/* Contêiner do título, autor e descrição da história */}
            <View style={styles.titleContainer}>
              {/* Título da história */}
              <Text style={styles.storyTitleText}>
                {this.props.story.title}
              </Text>
              {/* Autor da história */}
              <Text style={styles.storyAuthorText}>
                {this.props.story.author}
              </Text>
              {/* Descrição da história */}
              <Text style={styles.descriptionText}>
                {this.props.story.description}
              </Text>
            </View>

            {/* Contêiner de ação (botão de curtir) */}
            <View style={styles.actionContainer}>
              {/* Botão de curtir com ícone de coração */}
              <View style={styles.likeButton}>
                <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                {/* Texto indicando a quantidade de curtidas */}
                <Text style={styles.likeText}>12k</Text>
              </View>
            </View>
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
    flex: 1
  },
  // Contêiner do cartão de história
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  // Imagem da história
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  // Contêiner do título, autor e descrição da história
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  // Título da história
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  // Autor da história
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  // Descrição da história
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10)
  },
  // Contêiner de ação (botão de curtir)
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  // Botão de curtir
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  // Texto indicando a quantidade de curtidas
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});
