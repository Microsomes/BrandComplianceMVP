const fs = require("fs");

const allPlans = JSON.parse(fs.readFileSync("carphonewarehouse_phones6-plans4-2024-12-29.json", "utf8"));



const findIndex = (arr, url) => {
   
    var toReturn = -1;

    for (let i = 0; i < arr.length; i++) {
        if(arr[i].combination.url == url){
            toReturn = i;
            console.log(arr[i].combination.url)
            break;
        }
    }

    return toReturn;

}

const mergeIntoPlan = (allPlans, plans)=>{

    var toReturn = allPlans;

    plans.forEach((p)=>{
        
        const index = findIndex(allPlans, p.combination.url);

       
        toReturn[index].plans = p.plans;

    })
    

    return toReturn;

}


const findPlansFromArray = (arr, url) => {


    var toReturn = false;

    arr.forEach((a)=>{
        if(a.combination.url == url){
            toReturn = a;
        }
    });


    return toReturn;

}



const res = mergeIntoPlan(allPlans, [
    {
        "phone": "Apple iPhone 12 Pro  Graphite Excellent condition 128GB Refurbished",
        "combination": {
          "color": "silver",
          "storage": "128GB",
          "url": "https://www.carphonewarehouse.com/samsung-galaxy-s23-ultra-refurbished-256GB-phantom-black",
          "colorIndex": 1,
          "storageIndex": 0
        },
        "plans": [1,2,3]
      }
])


const f = findPlansFromArray(res, "https://www.carphonewarehouse.com/samsung-galaxy-s23-ultra-refurbished-256GB-phantom-black");

console.log(f)