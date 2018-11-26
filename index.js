'use strict';

const plantuml = require('./lib/plantuml');

const reg = /(\s*)(```) *(puml|plantuml) *\n?([\s\S]+?)\s*(\2)(\n+|$)/g;

// default Settings
const FORMAT = 'png';
const ASSET_PATH = 'puml';

function ignore(data) {
  let source = data.source;
  let ext = source.substring(source.lastIndexOf('.')).toLowerCase();
  return ['.js', '.css', '.html', '.htm'].indexOf(ext) > -1;
}

hexo.extend.tag.register('plantuml', (args, content) => {
  let config = hexo.config.plantuml || {};
  config.format = (config.format || FORMAT).toLowerCase();
  config.asset_path = config.asset_path || ASSET_PATH;
  Object.assign(config, {public_dir: hexo.config.public_dir});

  return plantuml.generate(content, config)
    .then(function(result) {
      var imagePath = config.uml_root + result;

      if (config.svg_object && config.format === 'svg') {
        return `<object type="image/svg+xml" data="${imagePath}" >`;
      } else {
        return `<img src="${imagePath}">`;
      }
    });
},{
  async: true,
  ends: true
});

hexo.extend.filter.register('before_post_render', (data) => {
  if (!ignore(data)) {
    data.content = data.content
      .replace(reg, (raw, start, startQuote, lang, content, endQuote, end) => {
        return start + '{% plantuml %}' + content + '{% endplantuml %}' + end;
      });
  }
}, 9);
