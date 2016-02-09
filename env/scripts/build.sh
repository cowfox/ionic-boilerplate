#!/usr/bin/env bash

### ===================
#   Build the app from `app` folder to `www` folder.
#
#   It is the **first** step for every following procedures, like
#       **Unit Test**, **App Release**, etc.
#
### ===================

set -e

if [ "$BUILD_APP" = true ]; then

    gulp --$BUILD_TARGET --env=$BUILD_ENV

fi