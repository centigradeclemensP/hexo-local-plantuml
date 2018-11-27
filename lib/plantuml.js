'use strict';

const path = require('path');
const fs = require('fs-extra');
const crypto = require('crypto');
const plantuml = require('node-plantuml');
const Q = require('q');

exports.generate = (content, config) => {
  let deferred = Q.defer();

  let format = config.format;
  let publicDir = config.public_dir;
  let assetPath = config.asset_path;
  let filePath = path.join(
    assetPath,
    crypto
      .createHash('sha1')
      .update(content)
      .digest('hex') +
      '.' +
      format,
  );

  if (fs.existsSync(path.join(publicDir, filePath))) {
    deferred.resolve(filePath);
  } else {
    let gen = plantuml.generate(content, { format: format, charset: 'utf8' });

    let chunks = [];
    gen.out.on('data', chunk => {
      chunks.push(chunk);
    });
    gen.out.on('end', () => {
      let buffer = Buffer.concat(chunks);
      // console.log(buffer.toString());
      fs.mkdirpSync(path.join(publicDir, assetPath));

      fs.writeFile(path.join(publicDir, filePath), buffer.toString('utf8'), 'utf8', err => {
        if (err) {
          console.error(err);
        }
      });

      deferred.resolve(filePath);
    });
  }
  return deferred.promise;
};
