# Wordpress Theme Development Starter Kit

This starter kit helps WP Theme Development, using Gulp, SASS, Browsersync, ect...

## Installation

Clone or download this repo into your theme folder. Then install all the packages needed with 

```bash
npm install
```

Edit proxy url in gulpfile.js at line 72

```js
browserSync.init({
    proxy: "yourprojectname.test",
    port: 8080,
    open: false
  });
```

# Requirements

- Node.JS
- Gulp

## Usage

```bash
gulp build
```
