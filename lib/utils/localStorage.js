export function loadStorage(Key) {
  try {
    const serializedState = localStorage.getItem(Key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function saveStorage(Key, state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(Key, serializedState);
  } catch (e) {
    // Ignore
  }
}
