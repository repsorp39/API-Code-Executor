```js
var rs = require('require-shield')({mode: 'white-list'});
rs.except('^stream|string_decoder$', '^sax$');
```

## What this is
* A simple tool to control which modules can be loaded and by which modules
* It gives you peace of mind when using third party modules
* It eases you of the burden of reviewing and understanding the implementation of other modules

## Installation
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 9.4 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install require-shield
```

## Arguments (`configuration`)
### configuration: `mode`
* `white-list`: Default. All modules are prohibited from loading any module unless explicitly allowed.
* `black-list`: All modules are allowed to load any other module unless explicitly denied.

```js
var rs = require('require-shield')({mode: 'black-list'});
```

## Methods
### `except(toRequire[, fromModules])`
This method is used in `white-list` mode to indicate which modules will be allowed to load other modules.
In `black-list` mode it indicates which modules will be prevented from loading other modules.

##### Arguments
`toRequire`: A regular expression to match the names or paths of modules that we want to allow
being required in `white-list` mode, and deny in `black-list` mode.  
`fromModules`: Optional. A regular expression to match the names or paths of modules that we want to allow
requiring the `toRequire` modules in `white-list` mode, and deny in `black-list` mode. If this argument is
not provided, the exception is for all modules.

## Examples
#### Allow only the `stream` and `string_decoder` modules to be loaded, and only by the `sax` module:
```js
var rs = require('require-shield')({mode: 'white-list'});
rs.except('^stream|string_decoder$', '^sax$');
```

#### Prevent all modules from loading the `stream` and `string_decoder` modules:
```js
var rs = require('require-shield')({mode: 'black-list'});
rs.except('^stream|string_decoder$');
```

## Testing
The 'mocha' module is used for testing. Run either 'whitelist.js' or 'blacklist.js', but not both in the same run.
If you are testing this in Cloud9, you can choose the Mocha runner, and give the path to the test file as argument.  
**Example**:  
```
$ mocha test/blacklist.js
```
This will enable you to debug the code through the test.  
***Note**: The path must be specified relative to your workspace.*  
