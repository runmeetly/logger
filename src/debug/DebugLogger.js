function getCurrentFileNameChrome() {
  try {
    // <stuff>
    const lineWithFileName = new Error().stack.match(/<.*>/)[0];

    // stuff>
    const lineWithoutAt = lineWithFileName.substring(1);

    // stuff
    return lineWithoutAt.substring(0, lineWithoutAt.length - 1);
  } catch (e) {
    return null;
  }
}

function getCurrentFileNameFirefox() {
  try {
    // @stuff:1:
    const lineWithFileName = new Error().stack.match(/@.*:/)[0];

    // stuff:1:
    const lineWithoutAt = lineWithFileName.substring(1);

    // stuff
    return lineWithoutAt.substring(0, lineWithoutAt.length - 3);
  } catch (e) {
    return null;
  }
}
function getCurrentFileName() {
  const ff = getCurrentFileNameFirefox();
  if (ff) {
    return ff;
  }

  const cr = getCurrentFileNameChrome();
  if (cr) {
    return cr;
  }

  return null;
}

function createMessage(...args) {
  const fileName = getCurrentFileName();
  if (fileName) {
    return [
      `[%c${fileName}%c]`,
      "color: green; font-weight: 700;",
      "color: none;",
      ...args,
    ];
  } else {
    return args;
  }
}

export class DebugLogger {
  /**
   * Log
   *
   * @param args
   * @returns {DebugLogger}
   */
  log(...args) {
    const message = createMessage(...args);
    console.log(...message);
    return this;
  }

  /**
   * Debug
   *
   * @param args
   * @returns {DebugLogger}
   */
  debug(...args) {
    const message = createMessage(...args);
    console.debug(...message);
    return this;
  }

  /**
   * Info
   *
   * @param args
   * @returns {DebugLogger}
   */
  info(...args) {
    const message = createMessage(...args);
    console.info(...message);
    return this;
  }

  /**
   * Warn
   *
   * @param args
   * @returns {DebugLogger}
   */
  warn(...args) {
    const message = createMessage(...args);
    console.warn(...message);
    return this;
  }

  /**
   * Error
   *
   * @param args
   * @returns {DebugLogger}
   */
  error(...args) {
    const message = createMessage(...args);
    console.error(...message);
    return this;
  }
}
