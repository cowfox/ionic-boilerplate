#!/usr/bin/env bash

### ===================
#   Remove ALL Xcode files from the system, including:
#
#   - The custom Keychain file.
#   - All decrypted files.
#   - Provisioning profile
### ===================

### -------------------
#   Can only run for iOS build.
### -------------------
if [ "$BUILD_APP" != true -o  "$iOS_BUILD" != true ]; then
    echo "Error: Can only run for iOS build. "
    exit 1
fi

KEYCHAIN_FILE="ios-build.keychain"

# Remove the custom keychain file.
security delete-keychain $KEYCHAIN_FILE

# Remove decrypted cert files
rm -f "./env/xcode-cert/$XCODE_CERT_NAME.cer"
rm -f "./env/xcode-cert/$XCODE_CERT_NAME.p12"

# Remove provisioning profile
PROVISIONING_PROFILE_UUID=`grep UUID -A1 -a "./env/xcode-profile/$XCODE_PROVISIONING_PROFILE_NAME.mobileprovision"  | grep -io "[-A-Z0-9]\{36\}"`
rm -f "~/Library/MobileDevice/Provisioning Profiles/$PROVISIONING_PROFILE_UUID.mobileprovision"
rm -f "./env/xcode-profile/$XCODE_PROVISIONING_PROFILE_NAME.mobileprovision"
