

// import tailwindcss from '@tailwindcss/vite'
// import { defineConfig } from 'vite'

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
  import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
  ],
 define: {
    'process.env': {}
  }, 
})