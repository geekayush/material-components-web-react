/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Copies assets from source directory to respective package's temporary directory for npm publishing.
 */
const path = require('path');
const {readdirSync, lstatSync} = require('fs');
const fsExtra = require('fs-extra');

const isDirectory = (source) => lstatSync(source).isDirectory();

const packages = [
  'button',
  'card',
  'fab',
  'floating-label',
  'line-ripple',
  'material-icon',
  'notched-outline',
  'ripple',
  'text-field',
  'top-app-bar',
];

function copyFiles(filename, sourcePkgPath, destinationPkgPath) {
  if (path.extname(filename) === '.js') {
    return;
  }
  const sourceFilePath = path.join(sourcePkgPath, filename);
  const destinationFilePath = path.join(destinationPkgPath, filename);

  fsExtra.copy(sourceFilePath, destinationFilePath)
    .then(() => console.log(`${sourceFilePath} -> ${destinationFilePath}`))
    .catch(() => console.log('error'));
}

function copyFilesToNpmPackages() {
  const source = path.resolve(__dirname, '../../packages');
  const destination = path.resolve(__dirname, '../../npm_packages');

  packages.forEach((pkg) => {
    const sourcePkgPath = path.join(source, pkg);
    const destinationPkgPath = path.join(destination, pkg);
    const sourceDirectoryFiles = readdirSync(sourcePkgPath);

    sourceDirectoryFiles.forEach((filename) => {
      const filePath = path.join(sourcePkgPath, filename);
      if (isDirectory(filePath)) {
        return;
      }
      copyFiles(filename, sourcePkgPath, destinationPkgPath);
    });
  });
}

module.exports = {copyFilesToNpmPackages};
