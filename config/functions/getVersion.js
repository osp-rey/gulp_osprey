// versions.js
import crypto from "crypto";
import fs from "fs";

export default function getVersion() {
  const files = {
    css: './dist/css/main.css',
    js: './dist/js/app.js'
  };
  
  const versions = {};
  
  for (const [key, path] of Object.entries(files)) {
    try {
      if (fs.existsSync(path)) {
        const content = fs.readFileSync(path);
        versions[key] = crypto
          .createHash('md5')
          .update(content)
          .digest('hex')
          .substring(0, 8);
      } else {
        versions[key] = Date.now().toString(36);
      }
    } catch (e) {
      versions[key] = Date.now().toString(36);
    }
  }
  
  return versions;
}