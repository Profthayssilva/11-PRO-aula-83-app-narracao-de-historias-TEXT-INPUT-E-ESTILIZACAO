// Importa o React e Component do React para a construção de componentes de classe
import React, { Component } from "react";

// Importa os componentes de Visão, Texto, Estilo (StyleSheet), Área Segura (SafeAreaView),
// Plataforma (Platform), Barra de Status (StatusBar), Imagem, ScrollView, TextInput e Dimensões
// do React Native para construir a interface do usuário
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions
} from "react-native";

// Importa o RFValue para tornar o tamanho responsivo
import { RFValue } from "react-native-responsive-fontsize";

// Importa o componente DropDownPicker para seleção de imagem
import DropDownPicker from "react-native-dropdown-picker";

// Importa o componente AppLoading do Expo para a tela de carregamento
import AppLoading from "expo-app-loading";

// Importa a biblioteca Font do Expo para carregar fontes personalizadas
import * as Font from "expo-font";

// Define um objeto para armazenar fontes personalizadas
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

// Define o componente de classe CreateStory
export default class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_1", // Imagem de visualização padrão
      dropdownHeight: 40 // Altura padrão do seletor suspenso
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
    if (!this.state.fontsLoaded) {
      // Exibe a tela de carregamento enquanto as fontes estão sendo carregadas
      return <AppLoading />;
    } else {
      // Define um objeto para armazenar as imagens de visualização
      let preview_images = {
        image_1: require("../assets/story_image_1.png"),
        image_2: require("../assets/story_image_2.png"),
        image_3: require("../assets/story_image_3.png"),
        image_4: require("../assets/story_image_4.png"),
        image_5: require("../assets/story_image_5.png")
      };

      // Renderiza o componente
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
              <Text style={styles.appTitleText}>Nova História</Text>
            </View>
          </View>

          {/* Contêiner de campos para criar uma nova história */}
          <View style={styles.fieldsContainer}>
            {/* ScrollView para permitir rolar os campos se a tela for pequena */}
            <ScrollView>
              {/* Imagem de visualização selecionada */}
              <Image
                source={preview_images[this.state.previewImage]}
                style={styles.previewImage}
              ></Image>

              {/* DropDownPicker para selecionar a imagem de visualização */}
              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: "Image 1", value: "image_1" },
                    { label: "Image 2", value: "image_2" },
                    { label: "Image 3", value: "image_3" },
                    { label: "Image 4", value: "image_4" },
                    { label: "Image 5", value: "image_5" }
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 10
                  }}
                  onOpen={() => {
                    // Ajusta a altura do seletor suspenso ao ser aberto
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    // Restaura a altura padrão do seletor suspenso ao ser fechado
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{ backgroundColor: "transparent" }}
                  itemStyle={{
                    justifyContent: "flex-start"
                  }}
                  dropDownStyle={{ backgroundColor: "#2f345d" }}
                  labelStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans"
                  }}
                  arrowStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans"
                  }}
                  onChangeItem={item =>
                    // Atualiza a imagem de visualização selecionada com base na escolha do usuário
                    this.setState({
                      previewImage: item.value
                    })
                  }
                />
              </View>

              {/* Campo de entrada para o título da história */}
              <TextInput
                style={styles.inputFont}
                onChangeText={title => this.setState({ title })}
                placeholder={"Título"}
                placeholderTextColor="white"
              />

              {/* Campo de entrada para a descrição da história */}
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig
                ]}
                onChangeText={description => this.setState({ description })}
                placeholder={"Descrição"}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="white"
              />

              {/* Campo de entrada para o conteúdo da história */}
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig
                ]}
                onChangeText={story => this.setState({ story })}
                placeholder={"História"}
                multiline={true}
                numberOfLines={20}
                placeholderTextColor="white"
              />

              {/* Campo de entrada para a moral da história */}
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig
                ]}
                onChangeText={moral => this.setState({ moral })}
                placeholder={"Moral da História"}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="white"
              />
            </ScrollView>
          </View>

          {/* Espaço em branco na parte inferior para melhorar a visualização */}
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#15193c"
},
droidSafeArea: {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
},
appTitle: {
  flex: 0.07,
  flexDirection: "row"
},
appIcon: {
  flex: 0.3,
  justifyContent: "center",
  alignItems: "center"
},
iconImage: {
  width: "100%",
  height: "100%",
  resizeMode: "contain"
},
appTitleTextContainer: {
  flex: 0.7,
  justifyContent: "center"
},
appTitleText: {
  color: "white",
  fontSize: RFValue(28),
  fontFamily: "Bubblegum-Sans"
},
fieldsContainer: {
  flex: 0.85
},
previewImage: {
  width: "93%",
  height: RFValue(250),
  alignSelf: "center",
  borderRadius: RFValue(10),
  marginVertical: RFValue(10),
  resizeMode: "contain"
},
inputFont: {
  height: RFValue(40),
  borderColor: "white",
  borderWidth: RFValue(1),
  borderRadius: RFValue(10),
  paddingLeft: RFValue(10),
  color: "white",
  fontFamily: "Bubblegum-Sans"
},
inputFontExtra: {
  marginTop: RFValue(15)
},
inputTextBig: {
  textAlignVertical: "top",
  padding: RFValue(5)
}
});