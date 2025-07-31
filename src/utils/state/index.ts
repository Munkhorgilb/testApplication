import EventEmitter from 'eventemitter3';
import { Schema, defaults } from './schema';
import * as store from './store';
export { defaults } from './schema';
export type { Schema } from './schema';

let _state: Schema = defaults;
const _emitter = new EventEmitter();

/**
 * Initializes and returns persisted data state, so that it can be passed to
 * the Provider.
 */
export async function init() {
  console.debug('persisted state: initializing');

  try {
    const stored = await store.read();
    if (!stored) {
      console.debug('persisted state: initializing default storage');
      await store.write(defaults);
    }
    _state = stored || defaults;
    console.debug('persisted state: initialized');
    return _state;
  } catch (e) {
    console.error('persisted state: failed to load root state from storage', {
      message: e,
    });
    return defaults;
  }
}

export function get<K extends keyof Schema>(key: K): Schema[K] {
  return _state[key];
}

export async function write<K extends keyof Schema>(
  key: K,
  value: Schema[K],
): Promise<void> {
  try {
    _state[key] = value;
    await store.write(_state);
    _emitter.emit('update');
    console.debug('persisted state: wrote root state to storage', {
      updatedKey: key,
    });
  } catch (e) {
    console.error('persisted state: failed writing root state to storage', {
      message: e,
    });
  }
}

export function onUpdate(cb: () => void): () => void {
  _emitter.addListener('update', cb);
  return () => _emitter.removeListener('update', cb);
}
