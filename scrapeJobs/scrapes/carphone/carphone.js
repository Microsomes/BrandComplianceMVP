const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fs = require("fs");
const moment = require("moment");
const { createHash } = require("crypto");

require('dotenv').config()
console.log(process.env) 



const rootdir = process.env.ROOT_DIR;

fs.mkdirSync(rootdir, { recursive: true });

var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;


//set it so we can write to debug.log, needed for debugging
console.log = function (d) {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss'); // Format the timestamp
    const message = `[${timestamp}] ${util.format(d)}`; // Add timestamp to the message
  
    log_file.write(message + '\n'); // Write to file
    log_stdout.write(message + '\n'); // Write to console
};

//first get all the phone links, build up the list of phones
const getLinks = async (page, maxPages, useCache) => {

    var date = moment().format("YYYY-MM-DD");
    const fname = `./${rootdir}/carphonewarehouse_links-${date}.json`;

    //check if exists
    if (fs.existsSync(fname) && useCache) {
        return JSON.parse(fs.readFileSync(fname, "utf8"));
    }

    
  var allPhones = [];
  var currentPage = 0;

  while (currentPage < maxPages) {
    var phones = await page.evaluate(() => {
      var phones = [];

      var phoneCards = document.querySelectorAll(".product");

      phoneCards.forEach((phoneCard) => {
        phones.push({
          name: phoneCard.querySelector(".name a").textContent.trim(),
          url: phoneCard.querySelector("a").href,
        });
      });

      return phones;
    });

    allPhones.push(...phones);
    currentPage++;
    try {
      await page.click(".load-more-deals-button");
    } catch (e) {
      //if not clickable move on
      break;
    }
    await sleep(3000);
  }

  //store todays date
  fs.writeFileSync(
    `${fname}`,
    JSON.stringify(allPhones, null, 2)
  );

  return allPhones;
};

//get extra details like potential colors and storage
const getPhoneAvailableColorandStorage = async (page) => {
  var availableInterum = await page.evaluate(() => {
    var potentialColours = [];
    var potentialStorageStorage = [];
    var colorLinks = [];
    var storageLinks = [];

    document.querySelectorAll(".colorBoxesH li a").forEach((col) => {
      const c = col.href;
      colorLinks.push(c);
    });

    document.querySelectorAll(".colorBoxesH li a span").forEach((col) => {
      const c = col.classList[1];
      potentialColours.push(c);
    });

    document.querySelectorAll("#capacityActive a").forEach((storage) => {
      const s = storage.innerText;
      potentialStorageStorage.push(s);
    });

    document.querySelectorAll("#capacityActive a").forEach((storage) => {
      const s = storage.href;
      storageLinks.push(s);
    });

    var url = document.querySelector(".activeCapacity a").href.split("?")[0]





    return {
      potentialColours,
      potentialStorageStorage,
      colorLinks,
      storageLinks,
        firstLink: url,
    };
  });


  var linky = availableInterum.firstLink.split("-");

  //remove 2 elements last ones
  linky.pop();
    linky.pop();
   
    var finalLink = linky.join("-");

    console.log(finalLink);



  const clickColor = async (index, page) => {
    try {
      await page.evaluate((index) => {
        document.querySelectorAll(".colorBoxesH li a")[index].click();
      }, index);

      await page.waitForNavigation({
        waitUntil: "networkidle2",
      });
      return 1;
    } catch (e) {
      return null;
    }
  };

  const clickCapacity = async (index, page) => {
    try {

        

      await page.evaluate((index) => {
        document.querySelectorAll("#capacityActive a")[index].click();
      }, index);

      await page.waitForNavigation({
        waitUntil: "networkidle2"
      });
      return 1;
    } catch (e) {
      return null;
    }
  }

  const getCurrentColor = async (page) => {
    return await page.evaluate(() => {
      return document.querySelector(".productColour").textContent;
    });
  };

  const getCurrentCapacity = async (page) => {
    return await page.evaluate(() => {
        return document.querySelector(".productCapacityText").textContent
    });
  }

    
  const combinations = [];
  
  // Nested loops to generate combinations
  for (let i = 0; i < availableInterum.potentialColours.length; i++) {
    for (let j = 0; j < availableInterum.potentialStorageStorage.length; j++) {
      combinations.push({
        color: availableInterum.potentialColours[i],
        storage: availableInterum.potentialStorageStorage[j],
        url: finalLink + `-${availableInterum.potentialStorageStorage[j]}-${availableInterum.potentialColours[i]}`,
        colorIndex: i,
        storageIndex: j
      });
    }
  }

 

  return combinations
};


//helper function to build up all combinations
const getAllAvailablePhoneCombinations = async (page, allPhonesLinks, useCache) => {

    const date = moment().format("YYYY-MM-DD");
    const fname = `./${rootdir}/carphonewarehouse_phones6-${date}.json`;

    //check if exists
    if (fs.existsSync(fname) && useCache) {
        return JSON.parse(fs.readFileSync(fname, "utf8"));
    }



    var result = [];

    for(var i = 0; i<allPhonesLinks.length; i++){
      try{
        var phone = allPhonesLinks[i];
        console.log(phone.url);
        await page.goto(phone.url,{
            waitUntil: 'networkidle2'
        });
  
        var combinations = await getPhoneAvailableColorandStorage(page);
  
       console.log(combinations);
  
       for(var j = 0; j<combinations.length; j++){
          combinations[j].url = phone.url+"-"+combinations[j].storage+"-"+combinations[j].color;
       }

       const n =  phone.name.split("\n")[0];
  
       result.push({
        preData: {
          name: phone.name.split("\n")[0],
          url: phone.url
        },
        combinations
       })
  
        fs.writeFileSync(`./${rootdir}/carphonewarehouse_phones6-${moment().format("YYYY-MM-DD")}.json`,JSON.stringify(result,null,2));
  
        console.log(`Getting Phones:(${n}) combinations ${i}/${allPhonesLinks.length}`);
      }catch(e){
          console.log(e);
      }
  
  
    }

    return result;
}

const getPlanByUrl = async (page, url) => {
    console.log("Going to URL:", url);

    const maxAttempts = 5; // Maximum retry attempts
    let attempts = 0; // Current attempt count

    while (attempts < maxAttempts) {
        try {
            attempts++;
            console.log(`Attempt ${attempts} to load the URL...`);

            // Navigate to the URL
            await page.goto(url, {
                waitUntil: 'networkidle2', // Wait until no network activity for at least 500ms
                timeout: 30000, // Timeout for the navigation (30 seconds)
            });

            console.log("Page loaded successfully.");

            return true; // Successful navigation
        } catch (error) {
            console.error(`Attempt ${attempts} failed: ${error.message}`);

            if (attempts >= maxAttempts) {
                console.error("Max attempts reached. Unable to load the URL.");
                return false; // Return false if all attempts fail
            }

            console.log("Retrying...");
        }
    }
};

//perform the actual scrapping to get all the plans, requires loading and paginating, will attempt to go to a specific color and capacities deal page
const getAllPlansFromCombination = async (page, phone) => {

    try{

    var toReturn = [];

    for(var i = 0; i<phone.combinations.length; i++){
        const combination = phone.combinations[i];
        console.log(combination.url)

        await getPlanByUrl(page,combination.url+"/deals");


        //document.querySelectorAll(".deal-item")[0].querySelectorAll(".deal-item-price")


        //lets load all plans, preload all then get the details, disable pagination to speed up transfer
        // var currentPage = 0;
        // var maxPages = 20;

        // for (var ii = 0; ii < maxPages; ii++) {
        //     try {
        //       await page.click(".load-more-deals-button");
        //     } catch (e) {
        //       //if not clickable move on
        //       break;
        //     }
        //     console.log("loading more deals");
        //     await page.waitForNetworkIdle();
        //   }


        var plans = await page.evaluate(()=>{
            var pl = [];

            document.querySelectorAll(".deal-item").forEach((deal)=>{

                var plan = {
                    monthly: deal.querySelectorAll(".deal-item-price")[0].innerText.split("†\nper month")[0].trim(),
                    upfront: deal.querySelectorAll(".deal-item-price")[1].innerText.split("\nupfront")[0].trim(),
                    network: deal.querySelectorAll(".deal-item-details li img")[0].getAttribute("alt"),
                    data: deal.querySelectorAll(".deal-item-details li")[1].innerText.split("\nData")[0].trim(),
                    minutes: deal.querySelectorAll(".deal-item-details li")[2].innerText.split("\nMinutes")[0].trim(),
                    texts: deal.querySelectorAll(".deal-item-details li")[3].innerText.split("\nTexts")[0].trim(),
                    duration: deal.querySelectorAll(".deal-item-details li small")[0].textContent.split("\n")[1].trim()
                }

                pl.push(plan);

            });

            return pl;
        });

        console.log(plans);

        console.log(`${i}/${phone.combinations.length}`);
        
        toReturn.push({
            phone: phone.preData.name,
            combination: combination,
            plans: plans
        });

    }


   return toReturn;
}catch(e){
    console.log(e);
    return [];
}
}

//find plan by url
const findPlansFromArray = (arr, url) => {
    console.log(url);
    console.log(arr.length, url)

    var toReturn = false;

    arr.forEach((a)=>{
        if(a.combination.url == url){
            toReturn = a;
        }
    });

    if(toReturn){

        if(toReturn.plans.length >1){
            return true
        }else{
            return false;
        }

    }


    return toReturn;

}

//returns index of url
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

//semi working, needed for creating resumbale scrapping, but ran out of time so this is dead code for now
const mergeIntoPlan = (allPlans, plans)=>{

    var toReturn = allPlans;

    plans.forEach((p)=>{
        
        const index = findIndex(allPlans, p.combination.url);

       
        toReturn[index].plans = p.plans;

    })
    

    return toReturn;

}

const start = async (tryResume) => {

  //launch browser using bright datas endpoint
  const browser = await puppeteer.connect({
    headless: false,
    // args: ["--no-sandbox", "--disable-setuid-sandbox"],
    browserWSEndpoint: process.env.BRIGHT_DATA_ENDPOINT
  });

  const date = moment().format("YYYY-MM-DD");

  const page = await browser.newPage();

  await page.goto("https://www.carphonewarehouse.com/mobiles/pay-monthly", {
    waitUntil: "networkidle2",
  });

  //accept cookies
  await page.evaluate(() => {
    document.querySelector("#onetrust-accept-btn-handler").click();
  });

  await sleep(5000);



  //first collect all names and urls, to then go back to get the details like, storage,color price
  var allPhonesLinks = await getLinks(page,10,true);

  //get all available combinations
  const availableCombinations = await getAllAvailablePhoneCombinations(page,allPhonesLinks,true);

  var allPlans = [];


  for(var i = 0; i<availableCombinations.length; i++){
    //scrape all plans
    const plans = await getAllPlansFromCombination(page,availableCombinations[i]);

    allPlans.push(plans);

    fs.writeFileSync(`./${rootdir}/carphonewarehouse_phones6-plans5-${moment().format("YYYY-MM-DD")}.json`,JSON.stringify(allPlans,null,2));

    console.log(`${i}/${availableCombinations.length}`);
  }


  await browser.close();
};

start(true);
