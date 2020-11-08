# buildz-ui
[![Build Status](https://travis-ci.com/absolutegalaber/buildz-ui.svg?branch=main)](https://travis-ci.com/absolutegalaber/buildz-ui)
## Build
 ```shell script
nom start
nom run-script build
 ```
 

## Run as Docker service

```shell script
export BUILDZ_VERSION=0.0.1
docker pull absolutegalaber-docker-buildz-docker.bintray.io/absolutegalaber/buildz-ui:${BUILDZ_VERSION}
docker run  --name buildz-ui --network buildz_net -d -p 80:80 absolutegalaber-docker-buildz-docker.bintray.io/absolutegalaber/buildz-ui:${BUILDZ_VERSION} 
```

