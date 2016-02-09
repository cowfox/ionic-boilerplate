#!/usr/bin/env bash

### ===================
#   Prepare the app package, including
#
#   - IPA file
#   - ".dsym.zip" file
### ===================

OUTPUTDIR="$PWD/platforms/ios/build/device/"

# Generate `ipa` file.
xcrun -log -sdk iphoneos \
PackageApplication -v "$OUTPUTDIR/$APP_NAME.app" \
-o "$OUTPUTDIR/$APP_NAME.ipa"

# Generate `.dsym.zip` file
/usr/bin/zip --verbose --recurse-paths "$OUTPUTDIR/$APP_NAME.dsym.zip" "$OUTPUTDIR/$APP_NAME.app.dsym"
