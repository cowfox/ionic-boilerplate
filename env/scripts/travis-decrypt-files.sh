#!/usr/bin/env bash

### ===================
#   Decrypt Travis "Encrypted files", including:
#
#   - Provisioning Profile
#   - Distribution Cert private key file (it needs PASSCODE)
#   - Distribution Cert file
### ===================

echo "TRAVIS_ENCRYPTION_KEY: $TRAVIS_ENCRYPTION_KEY"
echo "TRAVIS_ENCRYPTION_IV: $TRAVIS_ENCRYPTION_IV"

if [ -z "$TRAVIS_ENCRYPTION_KEY" -a  -z "$TRAVIS_ENCRYPTION_IV" ]; then
    echo "Error: Missing encryption secrets (key or iv)."
    exit 1
fi

### -------------------
#   Can only run for iOS build.
### -------------------
if [ "$BUILD_APP" = true -a  "$iOS_BUILD" = true ]; then

    ### -------------------
    #   Check all Env. variables and files exist.
    ### -------------------

    if [ -z "$XCODE_PROVISIONING_PROFILE_NAME" -a -z "$XCODE_CERT_NAME" ]; then
        echo "Error: Missing the name of provisioning profile or certificate file."
        exit 1
    fi

    if [ ! -e "./env/xcode-profile/$XCODE_PROVISIONING_PROFILE_NAME.mobileprovision.enc" ]; then
        echo "Error: Missing encrypted provisioning profile."
        exit 1
    fi

    if [ ! -e "./env/xcode-cert/$XCODE_CERT_NAME.cer.enc" ]; then
        echo "Error: Missing encrypted distribution cert."
        exit 1
    fi

    if [ ! -e "./env/xcode-cert/$XCODE_CERT_NAME.p12.enc" ]; then
        echo "Error: Missing encrypted private key."
        exit 1
    fi

    ### -------------------
    #   Decrypt the files.
    ### -------------------

    # NOTES: The files are encrypted by `travis encrypt-file` which does not do **Base64** encoding.
    # So, when doing decoding, there is no need to add `-a` option.
    openssl aes-256-cbc \
    -K "$TRAVIS_ENCRYPTION_KEY" \
    -iv "$TRAVIS_ENCRYPTION_IV" \
    -in "./env/xcode-profile/$XCODE_PROVISIONING_PROFILE_NAME.mobileprovision.enc" -d \
    -out "./env/xcode-profile/$XCODE_PROVISIONING_PROFILE_NAME.mobileprovision"

    openssl aes-256-cbc \
    -K "$TRAVIS_ENCRYPTION_KEY" \
    -iv "$TRAVIS_ENCRYPTION_IV" \
    -in "./env/xcode-cert/$XCODE_CERT_NAME.cer.enc" -d \
    -out "./env/xcode-cert/$XCODE_CERT_NAME.cer"

    openssl aes-256-cbc \
    -K "$TRAVIS_ENCRYPTION_KEY" \
    -iv "$TRAVIS_ENCRYPTION_IV" \
    -in "./env/xcode-cert/$XCODE_CERT_NAME.p12.enc" -d \
    -out "./env/xcode-cert/$XCODE_CERT_NAME.p12"

fi




