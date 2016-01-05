#!/bin/bash
set -e

cp dist/app-*.js ../helloworld/src/main/webapp/WEB-INF/static
cp dist/index.html ../helloworld/src/main/webapp/WEB-INF/view