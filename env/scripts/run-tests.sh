#!/usr/bin/env bash

### ===================
#   Run Tests, including
#
#   - Lint
#   - Unit
#   - E2E
### ===================

### -------------------
#   Unit Test
### -------------------
if [ "$UNIT_TEST" = true ]; then

    gulp unit --env=$BUILD_ENV

fi