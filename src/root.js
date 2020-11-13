class TaggedLogger {
  constructor(tag, emit) {
    // You can use this
    this.tag = tag;

    // But please don't use this
    this.$__emit = emit;
  }

  /**
   * Log
   *
   * @param args
   * @returns {TaggedLogger}
   */
  log(...args) {
    this.$__emit((impl) => impl.log, this.tag, ...args);
    return this;
  }

  /**
   * Debug
   *
   * @param args
   * @returns {TaggedLogger}
   */
  debug(...args) {
    this.$__emit((impl) => impl.debug, this.tag, ...args);
    return this;
  }

  /**
   * Info
   *
   * @param args
   * @returns {TaggedLogger}
   */
  info(...args) {
    this.$__emit((impl) => impl.info, this.tag, ...args);
    return this;
  }

  /**
   * Warn
   *
   * @param args
   * @returns {TaggedLogger}
   */
  warn(...args) {
    this.$__emit((impl) => impl.warn, this.tag, ...args);
    return this;
  }

  /**
   * Error
   *
   * @param args
   * @returns {TaggedLogger}
   */
  error(...args) {
    this.$__emit((impl) => impl.error, this.tag, ...args);
    return this;
  }
}

class Root extends TaggedLogger {
  constructor() {
    super(null, (method, tag, ...args) => emit(method, tag, ...args));

    /**
     * The backing storage for all log implementations
     *
     * This is an object for lookup efficiency, but not a set so that multiple
     * log implementations of the same type can be included
     */
    const implementations = {};
    const self = this;

    /**
     * Plant a new logger implementation
     * @param implementation
     * @returns {Number} - The key for this implementation
     */
    self.plant = function plant(implementation) {
      const key = Object.keys(implementations).length + 1;
      implementations[key] = implementation;
      return key;
    };

    /**
     * Uproot an existing logger implementation
     * @param key
     * @returns {boolean} - If the implementation was uprooted or not
     */
    self.uproot = function uproot(key) {
      if (implementations[key]) {
        implementations[key] = null;
        return true;
      } else {
        return false;
      }
    };

    function emit(method, tag, ...args) {
      for (const impl of Object.values(implementations)) {
        if (impl) {
          method(impl)(tag, ...args);
        }
      }
    }

    /**
     *
     * @param tag
     * @returns {TaggedLogger}
     */
    self.tag = function tag(tag) {
      return new TaggedLogger(tag, (method, tag, ...args) =>
        emit(method, tag, ...args)
      );
    };
  }
}

export const Logger = new Root();
