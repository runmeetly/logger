class Root {
  constructor() {
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

    function emit(method, ...args) {
      for (const impl of Object.values(implementations)) {
        if (impl) {
          method(impl)(...args);
        }
      }
    }

    /**
     * Log
     *
     * @param args
     * @returns {Root}
     */
    self.log = function log(...args) {
      emit((impl) => impl.log, ...args);
      return self;
    };

    /**
     * Debug
     *
     * @param args
     * @returns {Root}
     */
    self.debug = function debug(...args) {
      emit((impl) => impl.debug, ...args);
      return self;
    };

    /**
     * Info
     *
     * @param args
     * @returns {Root}
     */
    self.info = function info(...args) {
      emit((impl) => impl.info, ...args);
      return self;
    };

    /**
     * Warn
     *
     * @param args
     * @returns {Root}
     */
    self.warn = function warn(...args) {
      emit((impl) => impl.warn, ...args);
      return self;
    };

    /**
     * Error
     *
     * @param args
     * @returns {Root}
     */
    self.error = function error(...args) {
      emit((impl) => impl.error, ...args);
      return self;
    };
  }
}

export const Logger = new Root();
