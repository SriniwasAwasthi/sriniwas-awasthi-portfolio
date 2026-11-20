const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'public', '__forms.html');

if (fs.existsSync(src)) {
  const destinations = [
    path.join(__dirname, '..', '.next', '__forms.html'),
    path.join(__dirname, '..', '.next', 'server', '__forms.html'),
    path.join(__dirname, '..', '.next', 'server', 'app', '__forms.html'),
  ];

  for (const dest of destinations) {
    try {
      const dir = path.dirname(dest);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
      console.log(`Copied __forms.html to ${dest}`);
    } catch (err) {
      console.warn(`Could not copy to ${dest}:`, err.message);
    }
  }
}
