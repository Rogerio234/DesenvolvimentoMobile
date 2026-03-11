const CustomModalScreen = ({ animation, themeColor }) => { 
  // O estado 'visible' é o booleano que controla a exibição do Modal 
  const [visible, setVisible] = useState(false); 
 
  return ( 
    // SafeAreaView garante que o conteúdo não fique sob a barra de status ou a câmera 
    <SafeAreaView style={[styles.screenContainer, { backgroundColor: themeColor + '10' }]}> 
      <Text style={[styles.headerText, { color: themeColor }]}> 
        Modo: {animation.toUpperCase()} 
      </Text> 
       
      {/* Botão principal que altera o estado para true, ativando o Modal */} 
      <TouchableOpacity  
        style={[styles.mainButton, { backgroundColor: themeColor }]}  
        onPress={() => setVisible(true)} 
      > 
        <Text style={styles.buttonText}>TESTAR {animation.toUpperCase()}</Text> 
      </TouchableOpacity> 
 
      <Modal 
        animationType={animation} // Define a física da transição solicitada 
        transparent={true}        // Permite visualizar o conteúdo da tela anterior sob o fundo 
escurecido 
        visible={visible}          // Propriedade booleana controlada pelo useState 
        onRequestClose={() => setVisible(false)} // Lida com o botão "voltar" físico do Android 
      > 
        {/*  
            ESTRATÉGIA DO BACKDROP: 
            Este TouchableOpacity ocupa 100% da tela. Ao ser tocado, ele fecha o modal. 
            O activeOpacity={1} impede que o fundo semi-transparente "pisque" ao ser tocado. 
        */} 
        <TouchableOpacity  
          style={styles.modalOverlay}  
          activeOpacity={1}  
          onPressOut={() => setVisible(false)} 
        > 
          {/*  
              CARD DO MODAL: 
              Importante: Como este View está dentro de um TouchableOpacity, usamos 
              uma estrutura que impede que o toque dentro do card feche o modal. 
          */} 
          <View style={styles.modalCard}> 
            {/* Detalhe estético: uma linha superior com a cor do tema da aba */} 
            <View style={[styles.colorIndicator, { backgroundColor: themeColor }]} /> 
             
            <Text style={styles.modalTitle}>Animação {animation}</Text> 
             
            <Text style={styles.modalBody}> 
              {animation === 'slide' && "Perceba como eu subi suavemente do fundo da tela."} 
              {animation === 'fade' && "Perceba como eu surgiu alterando a opacidade 
(transparência)."} 
              {animation === 'none' && "Eu apareci instantaneamente, sem transição suave."} 
            </Text> 
             
            {/* Botão de fechamento manual dentro do card */} 
            <TouchableOpacity  
              style={[styles.closeButton]}  
              onPress={() => setVisible(false)} 
            > 
              <Text style={styles.closeButtonText}>FECHAR</Text> 
            </TouchableOpacity> 
          </View> 
        </TouchableOpacity> 
      </Modal> 
    </SafeAreaView> 
  ); 
}; 