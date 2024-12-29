const al = {
    potentialColours: [
      "hazel",
      "obsidian",
      "porcelain",
      "rose-quartz"
    ],
    potentialStorageStorage: [
      "128GB",
      "256GB",
      "512GB",
      "1TB"
    ],
  };
  
  const combinations = [];
  
  // Nested loops to generate combinations
  for (let i = 0; i < al.potentialColours.length; i++) {
    for (let j = 0; j < al.potentialStorageStorage.length; j++) {
      combinations.push({
        color: al.potentialColours[i],
        storage: al.potentialStorageStorage[j],
        url:`https://www.carphonewarehouse.com/google-pixel-9-pro-xl-${al.potentialStorageStorage[j]}-${al.potentialColours[i]}`
      });
    }
  }
  
  console.log(combinations);
  