import screenshots from './screenshots';

suite('TemporaryPackage', () => {});

screenshots.forEach((screenshot) => {
  screenshot.capture().then();
});