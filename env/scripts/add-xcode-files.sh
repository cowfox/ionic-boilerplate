#!/usr/bin/env bash

### ===================
#   Add Xcode files into the system, including:
#
#   - Provisioning Profile
#   - Distribution Cert private key file (it needs PASSCODE)
#   - Distribution Cert file
### ===================


### -------------------
#   Can only run for iOS build.
### -------------------
if [ "$BUILD_APP" != true -o  "$iOS_BUILD" != true ]; then
    echo "Error: Can only run for iOS build. "
    exit 1
fi

echo "KEYCHAIN_PASS: $KEYCHAIN_PASS"

### -------------------
#   Check all Env. variables exist.
### -------------------

if [[ -z "$KEYCHAIN_PASS" ]]; then
    echo "Error: Missing passcode for adding private key to Keychain"
    exit 1
fi

if [ ! -e "./env/xcode-cert/$XCODE_APPLE_CERT_NAME.cer" ]; then
    echo "Error: Missing Apple Worldwide Developer Relations Certification Authority certificate."
    exit 1
fi

if [ ! -e "./env/xcode-cert/$XCODE_CERT_NAME.cer" ]; then
    echo "Error: Missing distribution certificate."
    exit 1
fi

if [ ! -e "./env/xcode-cert/$XCODE_CERT_NAME.p12" ]; then
    echo "Error: Missing distribution private key."
    exit 1
fi

if [ ! -e "./env/xcode-profile/$XCODE_PROVISIONING_PROFILE_NAME.mobileprovision" ]; then
    echo "Error: Missing provisioning profile."
    exit 1
fi

### -------------------
#   Create a custom Keychain File
#
#   {#link https://www.objc.io/issues/6-build-tools/travis-ci/#app-signing}
### -------------------
KEYCHAIN_FILE="ios-build.keychain"

# Create a custom keychain
security create-keychain -p travis $KEYCHAIN_FILE

# Make the custom keychain default, so xcodebuild will use it for signing
security default-keychain -s $KEYCHAIN_FILE

# Unlock the keychain
security unlock-keychain -p travis $KEYCHAIN_FILE

# Set keychain timeout to 1 hour for long builds
# see http://www.egeek.me/2013/02/23/jenkins-and-xcode-user-interaction-is-not-allowed/
security set-keychain-settings -t 3600 \
-l ~/Library/Keychains/$KEYCHAIN_FILE

security import "./env/xcode-cert/$XCODE_APPLE_CERT_NAME.cer" \
-k ~/Library/Keychains/$KEYCHAIN_FILE \
-T /usr/bin/codesign

security import "./env/xcode-cert/$XCODE_CERT_NAME.cer" \
-k ~/Library/Keychains/$KEYCHAIN_FILE \
-T /usr/bin/codesign

security import "./env/xcode-cert/$XCODE_CERT_NAME.p12" \
-k ~/Library/Keychains/$KEYCHAIN_FILE \
-P $KEYCHAIN_PASS \
-T /usr/bin/codesign


### -------------------
#   Copy provisioning profile to target place
### -------------------
mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles

# Retrieve the UUID of the provisioning profile
PROVISIONING_PROFILE_UUID=`grep UUID -A1 -a "./env/xcode-profile/$XCODE_PROVISIONING_PROFILE_NAME.mobileprovision"  | grep -io "[-A-Z0-9]\{36\}"`
cp "./env/xcode-profile/$XCODE_PROVISIONING_PROFILE_NAME.mobileprovision"  ~/Library/MobileDevice/Provisioning\ Profiles/$PROVISIONING_PROFILE_UUID.mobileprovision
echo "1 provisioning profile copied - $PROVISIONING_PROFILE_UUID"