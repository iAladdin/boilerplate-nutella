import Helmet from 'react-helmet';

// Currently we dont use asset.javascript from razzle. We already do it with loadable.
function getAssets(assets = {}) {
  if (assets.client) {
    return ({
      javascript: process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`,
      style: assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
    });
  }
  return {};
}

function renderHTML(
  html,
  initialState = {},
  assets = {},
  extractor,
) {
  const head = Helmet.renderStatic();
  const _assets = getAssets(assets);
  return `
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    ${head.base.toString()}
    ${head.title.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
    ${head.script.toString()}
    ${extractor.getLinkTags()}
    ${extractor.getStyleTags()}
    <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
    ${_assets.style}
  </head>
  <body>
    <div id="app">${html}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
    </script>
    ${extractor.getScriptTags()}
  </body>
</html>
    `;
}

export default renderHTML;

