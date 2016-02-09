#!/usr/bin/env bash

### ===================
#   Build iOS app
### ===================

### -------------------
#   Can only run for iOS build.
### -------------------

echo "iOS_BUILD = $iOS_BUILD"

if [ "$BUILD_APP" = true -a  "$iOS_BUILD" = true ]; then

    gulp add-ios --env=$BUILD_ENV
    gulp resources --env=$BUILD_ENV

    # Running `gulp reset` (`ionic state reset`) to ensure `ionic platform add` does not install plugins correctly.
    # gulp reset --env=$BUILD_ENV

    ionic build ios --device --release
    # Running `ionic build ios` for a second time to ensure the generation of `ipa` file.  The first run does not do it.
    ionic build ios --device --release

fi

