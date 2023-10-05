# puppeteer_trello_todoist
> Script to web scraping trello.com goals and convert it into tasks inside to dotoist.com

[![NPM Version][npm-image]][npm-url]

## Goals
Using Puppeteer
* Pull a list of tasks from https://trello.com/b/QvHVksDa/personal-work-goals
* Login into todoist.com
	* username: manoel.balam@gmail.com
	* password: m4n03l#B4l4m
* Add 5 tasks of the list you got before

## Installation

OS X & Linux:

```sh
npm init -y
npm install puppeteer
```

## Usage

The program will fetch into trello tasks, building an object with the goals inside then take the N tasks randomly to insert into todoist after do login.

```sh
npm start
```

## Meta

Isaac Balam

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
