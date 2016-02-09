#!/usr/bin/env bash

### ===================
#   Upload app package to HockeyApp.
#
### ===================

if [ -z "$HOCKEY_APP_ID" -a  -z "$HOCKEY_APP_TOKEN" ]; then
    echo "Error: Missing HockeyApp App ID and App Token."
    exit 1
fi

OUTPUTDIR="$PWD/platforms/ios/build/device/"

curl https://rink.hockeyapp.net/api/2/apps/$HOCKEY_APP_ID/app_versions/upload \
    -F status="2" \
    -F notify="0" \
    -F notes="$RELEASE_NOTES" \
    -F notes_type="0" \
    -F ipa="@$OUTPUTDIR/$APP_NAME.ipa" \
    -F dsym="@$OUTPUTDIR/$APP_NAME.dsym.zip" \
    -F commit_sha="$TRAVIS_COMMIT" \
    -H "X-HockeyAppToken: $HOCKEY_APP_TOKEN"

if [[ $? -ne 0 ]]; then
    echo "Error: Failed to upload app package to HockeyApp"
    exit 1
fi
