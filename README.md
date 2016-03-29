# Yemory

## Changelog

* 0.0.1
    * Minimal Viable Product

## Installation

Yeoman
```
$ npm install -g yo
```
AngularJS Cordova generator
```
$ npm install -g generator-angularjs-cordova
```
Android SDK. Please use this [guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html)

Cordova icon generator
```
$ npm install cordova-icon -g
```
Cordova splash generator
```
$ npm install cordova-splash -g
```

### Technologies:

* [Cordova](http://phonegap.com) - for packaging your HTML, CSS and Javascript into deployable mobile apps.
This generator currently has not been tested for its compatibility with phonegap. It might be added in the future.

* [AngularJS](http://angularjs.org) - One of the most popular Javascript MVC/MV** frameworks that is available out there

* [AngularUI](http://angular-ui.github.io/) - Includes Twitter bootstrap 3 and allows for developing responsive pages. It ships with various pre-defined templates.


## Getting Started

Run the app on your browser
```
$ grunt serve
```

Build app
```
$ grunt build
$ cordova build
```

Give the script +x permission, run
```
$ chmod +x hooks/after_prepare/cordova-icon.sh
$ chmod +x hooks/after_prepare/cordova-splash.sh
```

## License

MIT
