# logger

A simple abstracted logger library

## Install

```shell script

$ npm i @runmeetly/logger

$ yarn add @runmeetly/logger

```

## Why

Instead of copy-pasting this class everywhere in all of the projects
we've turned it into a library. Here you go, have fun!

## How

Imagine you have some existing code, such as this:

```javascript
import { Logger, DebugLogger } from '@runmeetly/logger';

const IS_DEBUG_MODE = ... // decided by your environment

// The implementation of this key is not stable. Right now its a number, tomorrow it could be an object.
// Don't rely on it for anything but plant and uproot
let loggerKey = undefined;
if (IS_DEBUG_MODE) {
  // A DebugLogger will forward calls to the browser console.
  // It will also attempt to discover the source file that the call is coming from
  // and log it to the console as well if it can.
  loggerKey = Logger.plant(new DebugLogger());
}

Logger.log("Hello");
// prints 'Hello' in console only when IS_DEBUG_MODE is true
// no-op in production

Logger.warn("Uh-oh");
// prints 'Uh-oh' at warning level in console only when IS_DEBUG_MODE is true
// no-op in production

Logger.error("Oh-no");
// prints 'Oh-no' at error level in console only when IS_DEBUG_MODE is true
// no-op in production

if (loggerKey) {
  // uproot() will return true if it uprooted something and false if it did not.
  Logger.uproot(loggerKey)
}

// Plant anything you want
Logger.plant(new MixpanelLogger());
Logger.plant(new MySpecialLogger());
Logger.plant(new OnlyLogOnTuesdays());
```

Anything can be planted as a Logger implementation as long as it has the methods
`log` `debug` `warn` `info` `error`. By default this library only ships with a
`DebugLogger` implementation, but you can create your own implementations to do
things like call through to analytics services or crash reporting.

# Credit

`Logger` is primarily developed and maintained by
[Peter](https://github.com/pyamsoft) at
[Meetly](https://www.runmeetly.com).

# License

```
 Copyright 2020 Meetly Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```
