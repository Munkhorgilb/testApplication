import { Linking, StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s } from '#/utils/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import BackButton from '#/components/BackButton';
import AnimatedLottieView from 'lottie-react-native';
import lottie from '../../assets/lottie';
import {
  csvToJson,
  deviceWidth,
  isIOS,
  requestStoragePermission,
} from '#/utils/utils';
import TextView from '#/components/TextView';
import { Button } from '#/components/Button';
import colors from '#/utils/colors';
import RNFS from 'react-native-fs';
import { useAlert } from '#/provider/AlertProvider';
import dayjs from 'dayjs';
import { templateFile, testProducts } from '#/utils/constants';
import * as persisted from '#/utils/state';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '#/provider/AppProvider';
import FileViewer from 'react-native-file-viewer';
import { pick, types, errorCodes } from '@react-native-documents/picker';

const Import = () => {
  const alert = useAlert();
  const { setProducts } = useApp();
  const navigation = useNavigation();

  const pickFile = async () => {
    try {
      const res = await pick({
        type: [types.plainText],
        allowMultiSelection: false,
      });

      const fileContent = await RNFS.readFile(res[0].uri, 'utf8');

      // 3. Convert to JSON
      const result = csvToJson(fileContent);

      const dataWithIds = result.map(item => ({
        id: uuidv4(),
        ...item,
      }));

      const existingProducts = persisted.get('products') || [];

      const newProducts = [...dataWithIds, ...existingProducts];

      setProducts(newProducts);
      alert.success('Бараанууд амжилттай бүртгэгдлээ');
      navigation.goBack();
    } catch (error) {
      if (errorCodes.OPERATION_CANCELED) {
        return;
      }
      if (errorCodes.UNABLE_TO_OPEN_FILE_TYPE) {
        console.log(error);
        alert.error('Файл нээхэд алдаа гарлаа');
      }
    }
  };

  const createTestFile = async () => {
    const now = new Date();
    const formattedDate = dayjs(now).format('YYYY_MM_DD_HH_mm_ss');
    const path = isIOS
      ? RNFS.DocumentDirectoryPath + `/testData_${formattedDate}.txt`
      : RNFS.DownloadDirectoryPath + `/testData_${formattedDate}.txt`;
    const hasPermission = await requestStoragePermission();
    if (!hasPermission && !isIOS) {
      alert.error('Permission Required');
      return;
    }

    try {
      await RNFS.writeFile(path, testProducts, 'utf8');
      alert.success('Тест файл амжилттай үүсгэгдлээ');
      if (isIOS) {
        return await FileViewer.open(path);
      } else {
        return await Linking.openURL(
          'content://com.android.externalstorage.documents/document/primary:Download',
        );
      }
    } catch (error) {
      if (errorCodes.UNABLE_TO_OPEN_FILE_TYPE) {
        console.log('Error writing file', error);
        alert.error('Файл нээхэд алдаа гарлаа');
      }
    }
  };

  const downloadDefaultFile = async () => {
    const path = isIOS
      ? RNFS.DocumentDirectoryPath + `/template.txt`
      : RNFS.DownloadDirectoryPath + `/template.txt`;

    const hasPermission = await requestStoragePermission();
    if (!hasPermission && !isIOS) {
      alert.error('Permission Required');
      return;
    }

    try {
      alert.success('Загвар файл амжилттай татлаа');
      await RNFS.writeFile(path, templateFile, 'utf8');

      if (isIOS) {
        return await FileViewer.open(path);
      } else {
        return await Linking.openURL(
          'content://com.android.externalstorage.documents/document/primary:Download',
        );
      }
    } catch (error) {
      if (errorCodes.UNABLE_TO_OPEN_FILE_TYPE) {
        console.log('Error writing file', error);
        alert.error('Файл нээхэд алдаа гарлаа');
      }
    }
  };

  return (
    <SafeAreaView style={[s.container]}>
      <KeyboardAwareScrollView contentContainerStyle={[s.flex1]}>
        <BackButton />
        <View style={[s.flex1, s.alignCenter, s.justifyCenter]}>
          <AnimatedLottieView
            source={lottie.file}
            style={styles.lottie}
            autoPlay
          />
          <Button onPress={createTestFile} type="primaryOutline">
            <TextView bold style={[s.ph10, s.pv6]}>
              Тест файл нэмэх
            </TextView>
          </Button>
          <View style={[s.row, s.mt20]}>
            <Button onPress={downloadDefaultFile} style={[s.mr10]}>
              <TextView color={colors.white} bold style={[s.ph10, s.pv6]}>
                Загвар файл татах
              </TextView>
            </Button>
            <Button onPress={pickFile}>
              <TextView color={colors.white} bold style={[s.ph10, s.pv6]}>
                Файл сонгох
              </TextView>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Import;

const styles = StyleSheet.create({
  lottie: {
    width: deviceWidth / 2,
    height: deviceWidth / 2,
  },

  itemContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});
