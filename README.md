# Ionic Boilerplate

A boilerplate project for Ionic framework development. 

## Features

- The **Modularize** AngularJS code structure enables you to **freely** define your app functionality and add **modules** if needed. The registration of **Angular Elements** (controller, service, etc.) are all done automatically. Check [this post](http://www.5neo.be/the-journey-to-ionic-boilerplate-modularize-angularjs-code/) for more details.  \
- A **folder-based** Gulp tasks management system facilitates the Gulp task building and management. 
- **Gulp Flow** - the **Gulp based streamline application development process** to help boost the whole development practice, covering the following points: 
	- Simplify Terminal interface (CLI) to avoid the use of both`gulp` and `ionic`. 
	- Enable the project code structure to accommodate different **development and building environments**, such as dev, staging, testing, prod, etc. 
	- Aim for more automatic product building system, especially for **auto-versioning**. 
	- Make the development process **CI(Continuous Integration)-friendly** and **CD(Continuous Deployment)-friendly**. 

## Usage

Here is a general procedure of typical usage. 

### App Init Setup

- Ensure **NodeJS** and **NPM** are set up and the following packages have been installed as `global` -  `napa`, `gulp`, `corfova`, `ionic` and `bower`. 
- `git clone` this project to your local machine and then change `origin` to your Git repo. 
- Inside **project folder**, update your **app info** in the file `./app/manifest.json`, such as app name, description, id, version, author info, etc. 
- In Terminal, run `npm install` and `bower install` to upload local dependencies. 
	- If you are running as `root`, use `npm install --unsafe-perm` and `bower install --allow-root` instead. 
- Run `gulp`, and you are ready to go - the development env. with **live reload** has been set up.

### Extended Gulp CLI

Run `gulp --help` to check the **extended** Gulp CLI. 

```
## gulp -h
Usage: gulp [task] [options]

Options:
  -h, --help                   Show "Extended" commands added to "Gulp" CLI. 
  
  --build, --build-app         Build the app from "app/" into "www/" folder without "Styles and Scripts minification" done.
   							   [boolean] [default: false]
                                                      
  --release, --release-app     Prepare for "App Package". "App Build" is required - with "Styles and Scripts minification" done.
                               [boolean] [default: false]
                                                      
  -e, --emulate                Load "emulator" to run the app. "App Build" is required. Based on `ionic emulate [platform]`. 
                               [string] [default: ""]
  
  -r, --run                    Load "device" to run the app. "App Build" is required. Based on `ionic run [platform]`.                 
  							   [string] [default: ""]
  
  --env, --environment         Specify the "build environment", such as "development", "staging", "staging", "production", etc. 
                               [string] [default: "development"]
                                                       
  -v, --version                Specify the "type" when bumping app "release" version. Use with task `gulp bump-release`. Possible options: major, premajor, minor, preminor, patch, prepatch, or prerelease (based on "semver").
                               [string] [default: "patch"]
                                                     
  --preid, --prerelease-id     Specify the "prerelease id" when bumping the app version for "prerelease". Usually `alpha | beta | rc`.                
  							   [string] [default: "alpha"]

Examples:
  gulp -e|--emulate android                       Build app and load "Android emulator" to run the app.
  gulp -r|--run ios                               Build app aad load "iOS device" to run the app.
  gulp bump-release --v=prerelease          	  Bump app "release" version for prerelease.
  gulp bump-release --v=prerelease --preid=beta   Bump app "release" version for "beta" prerelease.
  
```

### App Info Sync

Once you update the **app info** in `./app/manifest.json`, use `gulp appinfo` to sync it to other config files like `package.json`, `bower.json`, `ionic.project`, `config.xml`, etc.  You can customize it in the **Gulp Flow config** file. 


### Customize "App" Configurations

All **App** related configurations are done inside the **Gulp Flow config** file `./gulpfile/config.js`, including: 

- Change **basic folders** - like `app` folder, `dev` folder, `build` folder, `vendor` folder. 
- Specify **App Info Manifest** file and **Target Config** files to be synced - by default in includes `package.json`, `bower.json`, `ionic.project` and `config.xml`. 
- Define **Environments** as well as related **Environment Variables** - different environments lead to different configurations to be used, such as **web service API**, **Xcode certificate**, **versioning**, etc. 
- **App Icons & Images** - the folder of **app icon** and **images**. 
- **Fonts** - the folder of **fonts** and **icon fonts**, the **options** of using `iconfont` and `iconfontCss` plugins. and the **copy list** of vendor fonts. 
- **Styles** - the folder of **style** files (based on [Sass](http://sass-lang.com/)), options of `autoprefixer` and the **list** of **vendor styles**. 
- **Scripts** - the folder of **script** files, **list** of **Browserify "external" library bundle**, options of `lint`. 
- **HTMLs** - settings for **`index.html` Injection**, [Angular Templatecache](https://docs.angularjs.org/api/ng/service/$templateCache). 
- **Testing** - the file path of `Karma config` and `Protractor config`. 

### Browserify "External" Library Bundle

In order to simplify the **app building** process as well as improve **debugging capability**, **app scripts** and **library scripts** are bundled **separately**. 

- `app.js` - the bundle of **app scripts**. Can be run by `gulp main-scripts`. 
- `vendor.js` - the bundle of **library scripts**. Can be run by `gulp vendor-scripts`. 

The **library list** of external **Library Bundle** is defined in **Gulp Flow config** file - `scripts.vendorScriptFileBrowserifyRequireBundle`. 

By default, the library from this **library list** should be **CommonJS compatible**. If it is not, it needs to be defined in `browserify-shim` under `package.json` file. 

> Check my another post -[Browserify "Multiple" Bundles with Gulp on AngularJS Project](http://www.5neo.be/browserify-multiple-bundles-with-gulp-on-angularjs-project)- for more explanation. 

**NOTE**: Please do remember to `require()` these **libraries** in the **main app bundle** (normally in your main `app.js` file), so that the **app bundle** knows the "External" Library Bundle. 

```
# app.module.js
/*
	The list of **Required** libraries loaded as `External`.

	Here, the list should be **identical** to the **lib list** under `vendorScriptFileBrowserifyRequireBundle`
	in `Gulp config file`.

	For those `browserify-shim` libraries, be sure to use the name defined in `browser` section.
*/
// NPM libraries
var angular = require("angular");
require("angular-ui-router");
require("angular-sanitize");
require("angular-animate");

// `browserify-shim` libraries
require("ionic-js");
require("ionic-angular");
require("ng-cordova");
```


### App Build and Release

The **app build and release** process is determined by two environment variables `BUILD_TARGET`(**build target**) and `BUILD_ENV` (**build environment**) which can be specified by **Gulp CLI**.

- `BUILD_TARGET=build` - Perform a **build type** app build. Normally, it does not do **minification** to **Styles** and **Scripts** for a better debugging practice. 
- `BUILD_TARGET=release` - Perform a **release type** app build. It adds **minification** to **Styles** and **Scripts** based on **build type**. 
- `BUILD_ENV=development|test|staging|production` - Different environments lead to different changes to the app code as well as building options, such as **web services IP**, **versioning**, **reporting**, etc. 

Here is a typical **releasing** procedure for **iOS** app: 

```
export BUILD_TARGET=release
export BUILD_ENV=production
gulp --$BUILD_TARGET --env=$BUILD_ENV # Do a **release** build to `www` folder
gulp bump --env=$BUILD_ENV -v=prerelease --preid=beta # Do versioning. 
gulp appinfo --env=$BUILD_ENV # Update **app info** after versioning. 
gulp add-ios --env=$BUILD_ENV # Add an iOS platform
gulp resources --env=$BUILD_ENV # Prepare the app icon and splash images. 
ionic build ios --device --release # Build the `ipa` file and `app.dsym` folder. 
```

### Continuous Integration and Continuous Deployment

Theoretically, the entire **Gulp Flow** should be working on **any** system (**local** or **remote**) that runs **NodeJS** and **Gulp**. In order words, it should be also working with any CI and CD service - when the code is checked out to a remote system and run `nam install` to setup the building environment and then use **Gulp Flow** to **run tests** or **build app**. 

In the current **Ionic Boilerplate** project, it implements the solution for [**Travis CI**](https://travis-ci.org/) as well as **[HockeyApp](http://hockeyapp.net/features/)** (a very great mobile app distribution service). Here is the list of **addons**. 

- `.travis.yml` - The config file of Travis CI. 
- `/env/scripts/*` - The scripts that are used when **building the app** with Travis CI, such as doing decryption on Xcode building files, managing Mac OS X keychain*, making iOS app package, and uploading iOS app to HockeyApp service. 

## "Gulp Task" List References 

The following table lists all **Gulp Tasks** that are currently in **Gulp Flow**. Some typical use case is also listed. 

<table class="data-table">
	<tr>
        <th>Gulp Task</th>
        <th>Annotations</th>
    </tr>
    <tr>
        <td><code>gulp</code></td>
        <td>- Copy `app` folder to `dev` folder<br/>- Process each code component, like app icon, image, fonts, styles, scripts, htmls, etc.&nbsp;<br/>- ""Serve** with local server.<br/>- **Live Reload** enabled.&nbsp;<br/>- The **master** CMD used during the development.&nbsp;</td>
    </tr>
    <tr>
        <td><code>gulp --build</code></td>
        <td>- Build app from `app` folder to `www` folder</td>
    </tr>
    <tr>
        <td><code>gulp --release</code></td>
        <td>- Build app from `app` folder to `www` folder<br/>- Perform **minification** to app code.&nbsp;<br/>- Bump **Build #**</td>
    </tr>
    <tr>
        <td><code>gulp --release --env=production</code></td>
        <td>- Build app from `app` folder to `www` folder, under **Production** env.&nbsp;<br/>- Perform **minification** to app code.&nbsp;<br/>- Bump **Build #**</td>
    </tr>
    <tr>
        <td><code>gulp -e ios | android</code></td>
        <td>- Build app from `app` folder to `www` folder<br/>- Run app in **emulator**, iOS or Android.&nbsp;</td>
    </tr>
    <tr>
        <td><code>gulp -r ios | android</code></td>
        <td>- Build app from `app` folder to `www` folder<br/>- Run app in **device**, iOS or Android.&nbsp;<br/>- When in **iOS**, make sure **xcode build certificate** is set up.&nbsp;</td>
    </tr>
    <tr>
        <td><code>gulp -h</code></td>
        <td>-Check the **extended** Gulp CLI options and examples. &nbsp;</td>
    </tr>
    <tr>
        <td><code>gulp clean</code></td>
        <td>- Remove&nbsp;&nbsp;`dev` folder or&nbsp;`www` folder, depending on if adding `--build` or `--release`.<br/>- By default, clean `dev` folder.&nbsp;</td>
    </tr>
    <tr>
        <td><code>gulp appinfo</code></td>
        <td>- Sync **app info** from **app manifest file** to &nbsp;other **config files**, like `config.xml`, `package.json`, etc.&nbsp;</td>
    </tr>
    <tr>
        <td><code>gulp bump --env=production -v=prerelease --preid=beta</code></td>
        <td>- Bump version in **All** config files -**release version** or **dev version**.<br/>- It depends on the value of `--env`.<br/>- `-v` and `--preid` are only used when bumping **release version**. It follows **semver**.</td>
    </tr>
    <tr>
        <td><code>gulp bump-dev</code></td>
        <td>- Bump **dev version**&nbsp;in **All** config files.&nbsp;<br/>- The &nbsp;**dev version** is a combination of&nbsp;**release version** and **current date**, like "0.6.6-20160606".</td>
    </tr>
    <tr>
        <td><code>gulp bump-release -v=prerelease --preid=beta</code></td>
        <td>- Bump **release version**.<br/>- The use of &nbsp;`-v` and `--preid` follows **semver**.</td>
    </tr>
    <tr>
        <td><code>gulp bump-build</code></td>
        <td>- Bump **Build #** in **All** config files.&nbsp;</td>
    </tr>
    <tr>
        <td><code>gulp versioning</code></td>
        <td>- List all available **gulp tasks** of **versioning**.&nbsp;</td>
    </tr>
    <tr>
        <td><code>gulp add-ios</code>, <code>gulp remove-ios</code></td>
        <td>- Add / remove **iOS** platform.&nbsp;<br/>- Equivalent to `ionic platform add ios` and `ionic platform remove ios`</td>
    </tr>
    <tr>
        <td><code>gulp add-android</code>,<code>gulp remove-android</code></td>
        <td>- Add / remove **Android** platform.&nbsp;<br/>- Equivalent to `ionic platform add android` and `ionic platform remove android`</td>
    </tr>
    <tr>
        <td><code>gulp reset</code></td>
        <td>- Reset the current platform settings.&nbsp;<br/>- Equivalent to `ionic state reset`</td>
    </tr>
    <tr>
        <td><code>gulp resources</code></td>
        <td>- Prepare **app icon** and **splash** if needed.&nbsp;<br/>- Equivalent to `ionic resources`</td>
    </tr>
    <tr>
        <td><code>gulp vendor</code></td>
        <td>- Prepare all **vendor** resources, like styles and scripts.&nbsp;</td>
    </tr>
    <tr>
        <td><code>gulp lint</code></td>
        <td>- Run **lint** on JS scripts.&nbsp;</td>
    </tr>
    <tr>
        <td><code>gulp tests</code></td>
        <td>- Perform **test** on the app.&nbsp;<br/>- It includes both **Unit Test** and **E2E Test**.&nbsp;</td>
    </tr>
    <tr>
        <td><code>gulp unit</code></td>
        <td>- Perform **Unit Test** on the app.&nbsp;</td>
    </tr>
    <tr>
        <td><code>gulp e2e</code></td>
        <td>- Perform **E2E Test** on the app.&nbsp;</td>
    </tr>
</table>

----

## Gulp Flow

> **Gulp Flow** has been verified on **Mac OSX** and **Linux** system. **Windows** has not been tested yet. 

**Gulp Flow** streamlines the **entire** application development process, starting from **project initial setup**, to **active development**, to **local and remote unit and e2e test**. and then finally **application building / releasing system**. During the whole process, **Gulp Task** is the **key** to help conduct each step. 

> A separate blog will be published soon. Stay tuned. 

## Future Work & Contributing

As the moment when **Inoic Boilerplate** is firstly released, there are still many items on the wishlist. I will continue to work on them and schedule future update. At the same time, please have a try and let me know if you have any issue or suggestion in improveing it. 

If you would like to **contribute** to this work, please go ahead **fork** it and send back with **Pull Request** later. 

### For Ionic Boilerplate

- Add **[Ionic IO](http://ionic.io/)** configuration into the project. 
- Optimize the embedded sample `app`, trying to provide more **cases** to demo the normal **Ionic** practices, such as:
	- [Ionic components](http://ionicframework.com/docs/api/)
	- [Ionic IO](http://docs.ionic.io/docs/io-introduction) services
	- [ngCordova](http://ngcordova.com/)
	- [PouchDB](http://pouchdb.com/)
- Build a **helper module set** to make our development life much easiler. Several items on the list: 
	- A better **logging** system. 
	- A **middle layer** DB service. 
	- A **HTTP** service for RESTful API. 

### For Gulp Flow

- Constantly improve the current **Gulp Teasks** and optimoze the **use of Gulp plugins**
- Continue to finish the **local app release** process. 
- Add support to other configration files, like `.travis.yml`, `.io-config.json`, etc. 

### For Other Boilerplates? 

- Ionic2-Boilerplate - [Ionic 2](http://ionic.io/2).
- ReactNative-Boilerplate - [React Native](https://facebook.github.io/react-native/). 

## License

This project is licensed under the terms of the [MIT license](https://github.com/callemall/material-ui/blob/master/LICENSE). 

