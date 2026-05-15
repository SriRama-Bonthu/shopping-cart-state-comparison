const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function human(n){
  if(n<1024) return n+" B";
  if(n<1024*1024) return (n/1024).toFixed(1)+" KB";
  return (n/1024/1024).toFixed(2)+" MB";
}

const target = process.argv[2];
if(!target){
  console.error('Usage: node compute_gzip.js <dist-path>');
  process.exit(1);
}

const dist = path.resolve(process.cwd(), target);
if(!fs.existsSync(dist)){
  console.error('Dist path does not exist:', dist);
  process.exit(1);
}

function findJsFiles(dir){
  let res = [];
  const items = fs.readdirSync(dir);
  for(const it of items){
    const p = path.join(dir, it);
    const st = fs.statSync(p);
    if(st.isDirectory()) res = res.concat(findJsFiles(p));
    else if(it.endsWith('.js')) res.push(p);
  }
  return res;
}

const files = findJsFiles(dist);
if(files.length===0){
  console.log('No JS files found under', dist);
  process.exit(0);
}

let total=0;
console.log('Gzipped sizes for', dist);
for(const f of files){
  const buf = fs.readFileSync(f);
  const gz = zlib.gzipSync(buf);
  const size = gz.length;
  total += size;
  console.log('-', path.relative(dist, f), human(size));
}
console.log('Total gzipped JS size:', human(total));
