import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Custom plugin to handle Vercel serverless functions locally
const apiPlugin = () => ({
  name: 'api-plugin',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url === '/api/chat' && req.method === 'POST') {
        const handleRequest = async (bodyData: any) => {
          try {
            const data = typeof bodyData === 'string' ? JSON.parse(bodyData) : bodyData;
            const env = loadEnv(server.config.mode, process.cwd(), '');
            const apiKey = env.GEMINI_API_KEY;
            
            if (!apiKey) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: 'Missing GEMINI_API_KEY' }));
            }

            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                messages: data.messages,
                model: 'gemini-3.5-flash'
              })
            });
            const result = await response.json();
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = response.status;
            res.end(JSON.stringify(result));
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        };

        if (req.body) {
          handleRequest(req.body);
        } else {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            handleRequest(body);
          });
        }
      } else {
        next();
      }
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', 'three-stdlib'],
          'react-three': ['@react-three/fiber', '@react-three/drei'],
          'gsap': ['gsap'],
          'vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: ['three', 'gsap', 'lenis']
  }
});
