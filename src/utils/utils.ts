import { Dimensions, PermissionsAndroid, Platform } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const isIOS = Platform.OS === 'ios';

export const csvToJson = (csv: string) => {
  const lines = csv.split('\n').filter((line: string) => line.trim() !== '');
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map((h: string) => h.trim());

  return lines.slice(1).map((line: { match: (arg0: RegExp) => never[] }) => {
    const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];

    return headers.reduce(
      (
        obj: { [x: string]: boolean },
        header: string | number,
        index: string | number,
      ) => {
        let value = values[index] || '';
        obj[header] = value.replace(/^"|"$/g, '').trim();

        // Convert to proper types
        if (!isNaN(value) && value !== '') obj[header] = parseFloat(value);
        if (value === 'true') obj[header] = true;
        if (value === 'false') obj[header] = false;

        return obj;
      },
      {},
    );
  });
};

export const numberWithCommas = (number: number, decimals: number = 3) => {
  if (!number) {
    return '0';
  }

  const factor = Math.pow(10, decimals);
  const truncated = Math.floor(number * factor) / factor;

  const [integerPart, decimalPart] = truncated.toString().split('.');

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export async function requestStoragePermission() {
  if (Platform.OS === 'android' && Platform.Version < 30) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
}
