// localStorage can throw (private mode, blocked storage); never let it break the page.
export const readPref = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writePref = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};

export const MODE_KEY = "gr-mode";
export const INTRO_KEY = "gr-intro-seen";
