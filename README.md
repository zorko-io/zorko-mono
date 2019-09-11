# Zorko.io

CMS for Data Analytic 

[![CircleCI](https://circleci.com/gh/zorko-io/zorko-mono.svg?style=svg)](https://circleci.com/gh/zorko-io/zorko-mono)


## Install

Project uses `lerna` under the hood for manage deps

Install deps for root package

```
 npm i 
```

Install deps for sub packages   

```
 npm run bootstrap
```               

## Start Web and Api Servers

Requires MongoDB up and running on default ports

``` 
  npm run start
```            

## Development 

Run watcher to rebuild core packages on change

```
    npm run watch
```

Start Web and Api Servers in dev mode (restart/rebuild on change)

```
    npm run start:dev
```
