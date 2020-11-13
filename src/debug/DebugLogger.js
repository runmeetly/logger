function getCurrentFileNameChrome() {
  try {
    // at <stuff>
    const lineWithFileName = new Error().stack.match(/at <.*>/)[0];

    // stuff>
    const lineWithoutAt = lineWithFileName.substring(4);

    // stuff
    return lineWithoutAt.substring(0, lineWithoutAt.length - 1);
  } catch (e) {
    return null;
  }
}

function getCurrentFileNameFirefox() {
  try {
    // @stuff:1:
    const lineWithFileName = new Error().stack.match(/^@.*:/)[0];

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

function prependTag(tag, ...args) {
  return [
    `[%c${tag}%c]`,
    "color: green; font-weight: 700;",
    "color: none;",
    ...args,
  ];
}

function createMessage(tag, ...args) {
  if (tag) {
    return prependTag(tag, ...args);
  } else {
    const fileName = getCurrentFileName();
    if (fileName) {
      return prependTag(fileName, ...args);
    } else {
      return args;
    }
  }
}

export class DebugLogger {
  /**
   * Log
   *
   * @param tag
   * @param args
   * @returns {DebugLogger}
   */
  log(tag, ...args) {
    const message = createMessage(tag, ...args);
    console.log(...message);
    return this;
  }

  /**
   * Debug
   *
   * @param tag
   * @param args
   * @returns {DebugLogger}
   */
  debug(tag, ...args) {
    const message = createMessage(tag, ...args);
    console.debug(...message);
    return this;
  }

  /**
   * Info
   *
   * @param tag
   * @param args
   * @returns {DebugLogger}
   */
  info(tag, ...args) {
    const message = createMessage(tag, ...args);
    console.info(...message);
    return this;
  }

  /**
   * Warn
   *
   * @param tag
   * @param args
   * @returns {DebugLogger}
   */
  warn(tag, ...args) {
    const message = createMessage(tag, ...args);
    console.warn(...message);
    return this;
  }

  /**
   * Error
   *
   * @param tag
   * @param args
   * @returns {DebugLogger}
   */
  error(tag, ...args) {
    const message = createMessage(tag, ...args);
    console.error(...message);
    return this;
  }
}
