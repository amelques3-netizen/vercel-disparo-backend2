Vercel Places Backend (ready)
=============================

Como usar:
1) No GitHub: crie um novo repositório vazio (ou use o seu) e faça upload deste ZIP extraindo os arquivos na raiz.
   Deve ficar:
     - api/
         - search-places.js
         - place-details.js
     - package.json
     - README.txt

2) No Vercel:
   - Importar projeto do GitHub (ou usar 'Import Project' e colar a URL do repo).
   - Em Configure Project -> Environment Variables, adicione:
       Name: GOOGLE_PLACES_API_KEY
       Value: (cole sua chave do Google Cloud aqui, sem mostrar para ninguém)
   - Clique em Deploy / Import & Deploy.

3) No app Expo use a URL do seu projeto Vercel (ex: https://seu-projeto.vercel.app/api/search-places).

Observações:
- Não coloque a chave no frontend. Sempre no Vercel (Environment Variables).
- Para reduzir custos, limite Place Details e implemente cache se necessário.
