import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  useEffect(() => {
    async function carregarFonte() {
      await Font.loadAsync({
        pixel: require('./assets/fonts/PressStart2P-Regular.ttf'),
      });
      setFonteCarregada(true);
    }
    carregarFonte();
  }, []);

  useEffect(() => {
    const opcoes = mensagens[estadoPet] || [''];
    const falaAleatoria = opcoes[Math.floor(Math.random() * opcoes.length)];
    setFala(falaAleatoria);

    if (falaTimeout.current) clearTimeout(falaTimeout.current);
    falaTimeout.current = setTimeout(() => setFala(''), 2000);

    return () => clearTimeout(falaTimeout.current);
  }, [estadoPet]);

  useEffect(() => {
    if (estadoPet !== 'normal') return;

    const id = setTimeout(() => {
      setEstadoPet('fome');
    }, TEMPO_PARA_SENTIR_FOME);

    return () => clearTimeout(id);
  }, [estadoPet]);

  function alimentarPet() {
    if (estadoPet === 'fome' || estadoPet === 'coco') {
      setEstadoPet('feliz');

      setTimeout(() => {
        setQuantidadeCoco(prev => prev + 1);
        setEstadoPet('coco');
      }, 8000);
    }
  }

  function limparCoco() {
    setQuantidadeCoco(0);
    setEstadoPet('normal');
  }

  function trocarFundo() {
    setFundoAtual((fundoAtual + 1) % fundos.length);
  }

  function trocarChapeu() {
    setChapeuAtual((chapeuAtual + 1) % chapeus.length);
  }

  if (!fonteCarregada) return null;

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
