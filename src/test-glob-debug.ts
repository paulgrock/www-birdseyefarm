const images = import.meta.glob<{ default: any }>(
  '/src/images/**/*.{jpg,jpeg,png,webp,avif,HEIC}'
);

console.log('All glob keys:');
Object.keys(images).sort().forEach(key => {
  if (key.includes('birds-eye-farm-ina-may') || key.includes('diji-farm-cacao-nib')) {
    console.log(key);
  }
});
