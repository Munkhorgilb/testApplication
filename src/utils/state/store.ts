import AsyncStorage from '@react-native-async-storage/async-storage';
import { Schema, schema } from './schema';

const TEST_STORAGE = 'TEST_STORAGE';

export async function write(value: Schema) {
  schema.parse(value);
  await AsyncStorage.setItem(TEST_STORAGE, JSON.stringify(value));
}

export async function read(): Promise<Schema | undefined> {
  const rawData = await AsyncStorage.getItem(TEST_STORAGE);
  const objData = rawData ? JSON.parse(rawData) : undefined;
  if (schema.safeParse(objData).success) {
    return objData;
  }
}

export async function clear() {
  try {
    await AsyncStorage.removeItem(TEST_STORAGE);
  } catch (e: any) {
    console.error('persisted store: failed to clear', {
      message: e.toString(),
    });
  }
}
