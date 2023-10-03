// compile-scss.js

const fs = require('fs');
const path = require('path');
const sass = require('node-sass');

// Directorio raíz de tu aplicación
const rootDir = path.join(__dirname, 'src');

// Función para compilar archivos SCSS
function compileScss(filePath) {
  const scssContent = fs.readFileSync(filePath, 'utf8');
  const css = sass.renderSync({ data: scssContent }).css;
  const cssFilePath = filePath.replace(/\.scss$/, '.css');
  fs.writeFileSync(cssFilePath, css);
  console.log(`Compiled: ${cssFilePath}`);
}

// Función para recorrer directorios y compilar archivos SCSS
function compileScssFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      compileScssFiles(filePath);
    } else if (file.endsWith('.scss')) {
      compileScss(filePath);
    }
  });
}

// Ejecuta la compilación
compileScssFiles(rootDir);