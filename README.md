# Covid Exit Strategy USA Rollup Visualization

## Development

TODO

## Usage

This visualization is designed to be used on https://www.covidexitstrategy.org/.

1. Include the widget's css in the site's `<head>` element:
```html
<link rel="stylesheet" href="https://devinhunt.github.io/ces-hero-v2/index.css">
```
2. Include the widget's script and initilize it on a empty, root element:
```html
<script src="https://devinhunt.github.io/ces-hero-v2/index.js"></script>
<script>
  // Initialize the map on an empty div named #hero-chart
  CESHero(document.getElementById('hero-chart'))
</script>
```