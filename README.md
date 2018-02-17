# Code Climate EditorConfig [![License][license-image]][license-url]

> Static analysis tool that validates your project files with [EditorConfig][editorconfig]

[![Build Status][travis-image]][travis-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependency Status][dependencyci-image]][dependencyci-url]
[![Dependencies][david-image]][david-url]

## Usage

* install [Docker][docker]

* install the [Code Climate CLI][codeclimate-cli]

* clone this repo and build the docker image:

  ```bash
  curl -L https://github.com/ahmadnassri/codeclimate-editorconfig/archive/master.tar.gz | tar xvz
  cd codeclimate-editorconfig-master
  make image
  ```

* add `editorconfig` to your `.codeclimate.yml` file:

  ```yaml
  plugins:
    editorconfig:
      enabled: true
  ```

* run Code Climate CLI with the `--dev` flag

  ```bash
  $ codeclimate analyze --dev

  Starting analysis
  Running editorconfig: Done!

  == README.md (1 issue) ==
  18: Expected an indentation at 2 instead of at 1. [editorconfig]

  Analysis complete! Found 1 issue.
  ```

---
> :copyright: [ahmadnassri.com](https://www.ahmadnassri.com) &bull; 
> License: [ISC][license-url] &bull; 
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &bull; 
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/ahmadnassri/codeclimate-editorconfig.svg?style=flat-square

[travis-url]: https://travis-ci.org/ahmadnassri/codeclimate-editorconfig
[travis-image]: https://img.shields.io/travis/ahmadnassri/codeclimate-editorconfig.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/codeclimate-editorconfig
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/codeclimate-editorconfig.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/codeclimate-editorconfig.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/codeclimate-editorconfig
[david-image]: https://img.shields.io/david/ahmadnassri/codeclimate-editorconfig.svg?style=flat-square

[dependencyci-url]: https://dependencyci.com/github/ahmadnassri/codeclimate-editorconfig
[dependencyci-image]: https://dependencyci.com/github/ahmadnassri/codeclimate-editorconfig/badge?style=flat-square

[docker]: https://www.docker.com/
[editorconfig]: http://editorconfig.org
[codeclimate-cli]: https://github.com/codeclimate/codeclimate
