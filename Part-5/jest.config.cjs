// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'], // Test ortamı için ek kurulum
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest', // Babel ile JS/JSX dosyalarını dönüştür
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Eğer src/ altında alias kullanıyorsanız
  },
  // Eğer CSS dosyalarını import ediyorsanız ve Jest hata veriyorsa
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'mjs'],
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)'], // Belirli modülleri dönüştürmek için
};