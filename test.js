import('@xenova/transformers').then(async ({ pipeline }) => {
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  console.log('SUCCESS');
}).catch(console.error);
