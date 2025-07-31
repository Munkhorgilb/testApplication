import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { init as initPersistedState } from '#/utils/state';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import AlertProvider from '#/provider/AlertProvider';
import 'react-native-get-random-values';
import Routes from '#/screens/Routes';
import { AuthProvider } from '#/provider/AuthProvider';
import { Provider as ModalProvider } from '#/modal/ModalProvider';
import { Toaster } from 'sonner-native';
import BootSplash from 'react-native-bootsplash';
import { AppProvider } from '#/provider/AppProvider';

function App() {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    initPersistedState().then(() => {
      setReady(true);
      BootSplash.hide();
    });
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <KeyboardProvider statusBarTranslucent>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AlertProvider>
          <ModalProvider>
            <GestureHandlerRootView style={styles.gestureHandlerRootView}>
              <AuthProvider>
                <AppProvider>
                  <Routes />
                  <Toaster theme="light" />
                </AppProvider>
              </AuthProvider>
            </GestureHandlerRootView>
          </ModalProvider>
        </AlertProvider>
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    height: '100%',
  },
});

export default App;
