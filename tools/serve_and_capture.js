const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

function serve(distPath, port){
  const server = http.createServer((req,res)=>{
    let reqPath = req.url.split('?')[0];
    if(reqPath === '/') reqPath = '/index.html';
    const filePath = path.join(distPath, decodeURIComponent(reqPath));
    fs.readFile(filePath, (err, data)=>{
      if(err){
        res.writeHead(404);
        res.end('Not found');
      } else {
        const ext = path.extname(filePath).toLowerCase();
        const map = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.json':'application/json'};
        res.writeHead(200, {'Content-Type': map[ext]||'application/octet-stream'});
        res.end(data);
      }
    });
  });
  return new Promise((resolve, reject)=>{
    server.listen(port, ()=>resolve(server));
    server.on('error', reject);
  });
}

async function capture(url){
  const browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  // perform 10 clicks on first product-card button
  for(let i=0;i<10;i++){
    await page.click('.product-card button');
    await page.waitForTimeout(100);
  }
  const counts = await page.$$eval('[data-testid="render-count"]', els => els.map(e => e.textContent.trim()));
  await browser.close();
  return counts;
}

async function main(){
  const argv = require('minimist')(process.argv.slice(2));
  const dist = argv.dist || argv.d;
  const port = argv.port || 5173;
  const out = argv.out;
  if(!dist){
    console.error('Usage: node serve_and_capture.js --dist <path> --port <port> [--out <file>]');
    process.exit(1);
  }
  const distPath = path.resolve(dist);
  if(!fs.existsSync(distPath)){
    console.error('Dist path does not exist:', distPath);
    process.exit(1);
  }
  const server = await serve(distPath, port);
  try{
    const url = `http://localhost:${port}`;
    const counts = await capture(url);
    const result = { url, counts };
    console.log(JSON.stringify(result, null, 2));
    if(out){
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, JSON.stringify(result, null, 2));
    }
  }catch(e){
    console.error(e);
  }finally{
    server.close();
  }
}

main();
