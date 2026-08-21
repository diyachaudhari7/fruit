const fs = require('fs');
let content = fs.readFileSync('src/data/mockData.js', 'utf8');

const updatedContent = content.replace(/\{ id: 'p\d+'.*?\}/g, (match) => {
  const isOrganic = match.toLowerCase().includes('organic') || Math.random() > 0.5;
  const isVegan = match.toLowerCase().includes('milk') || match.toLowerCase().includes('beef') || match.toLowerCase().includes('chicken') || match.toLowerCase().includes('egg') ? false : true;
  const isGlutenFree = match.toLowerCase().includes('bread') || match.toLowerCase().includes('croissant') ? false : true;
  const isNonGMO = Math.random() > 0.3;
  
  const dietary = [];
  if (isOrganic) dietary.push('Organic');
  if (isVegan) dietary.push('Vegan');
  if (isGlutenFree) dietary.push('Gluten Free');
  if (isNonGMO) dietary.push('Non-GMO');
  
  const inStock = Math.random() > 0.1;
  const bestSeller = Math.random() > 0.7;
  
  // replace closing brace with new properties
  return match.replace(/ \}/, `, dietary: ${JSON.stringify(dietary)}, inStock: ${inStock}, bestSeller: ${bestSeller} }`);
});

fs.writeFileSync('src/data/mockData.js', updatedContent);
console.log('mockData.js updated');
