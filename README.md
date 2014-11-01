burlesque
=========

[![NPM version](https://badge.fury.io/js/burlesque.svg)](http://badge.fury.io/js/burlesque)

[![Dependency Status](https://david-dm.org/brentlintner/burlesque.svg)](https://david-dm.org/brentlintner/burlesque)

Turn your git commit messages into visual presentations that wow your viewers!

Disclaimer: The wow factor may or may not be experienced.

## Installation

    npm install -g burlesque

## Usage

    burlesque help

## Installing As Root

If you have trouble with the bower install, I recommend to, instead:

    echo "prefix = ${HOME}/npm-global" >> ~/.npmrc
    echo "export PATH=$HOME/npm-global/bin:$PATH" >> ~/.bashrc

## Versioning

This project ascribes to [semantic versioning](http://semver.org).

## Hacking

    cd burlesque
    npm install
    ./bin/burlesque help

## Why?

When you can explain an entire feature from its commit history, you don't
have to repeat yourself, and anyone who has no experience with the code can
understand and explore what is being done.
