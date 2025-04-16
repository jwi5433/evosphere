// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // Use 'tailwindcss' as the key
    autoprefixer: {}, // Add autoprefixer
  },
};

export default config;