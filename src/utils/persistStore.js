import { addCookies } from './cookiesMiddleware'

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    addCookies('storage', serializedState)
  } catch (err) {
    console.log('Error saving to Cookies', err);
  }
}
