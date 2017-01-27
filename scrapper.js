var osmosis = require('osmosis');
var cheerio = require('cheerio');

var urlDict = {};
urlDict.catan = 'https://itunes.apple.com/ca/app/catan-hd/id390422167?mt=8';
urlDict.carcassonne = 'https://itunes.apple.com/us/app/carcassonne/id375295479?mt=8';
urlDict.panzerCorps = 'https://itunes.apple.com/ca/app/panzer-corps/id736781904?mt=8';
urlDict.footballManager = 'https://itunes.apple.com/us/app/football-manager-mobile-2017/id1095683899?mt=8';
urlDict.ticket = 'https://itunes.apple.com/ca/app/ticket-to-ride/id432504470?mt=8';
urlDict.smallworld = 'https://itunes.apple.com/ca/app/small-world-2/id364165557?mt=8';
urlDict.pandemic = 'https://itunes.apple.com/ca/app/pandemic-the-board-game/id700793523?mt=8';


const handleFetch = (title) => {
    var urlToGet = urlDict[title];
    
    if (urlToGet !== undefined) {
        fetch(urlToGet, title);
    } else if (title === 'all') {
        for (var key in urlDict) {
            if (urlDict.hasOwnProperty(key)) {
                 fetch(urlDict[key], key);
            }
        }
    }
}


const fetch = (url, title) => {
    console.log("Fetching: " + url);
    
    
    
    osmosis.get(url)
        .find(".price").then((priceMarkup) => { 
            var tag = cheerio.load(priceMarkup.toString());
            console.log("Price of " + title + " is " + tag.text());
        })
        .find(".in-app-purchases").then((extensionMarkup) => { 
            var tag = cheerio.load(extensionMarkup.toString());

            // Iterate over all extensions displayed
            tag('li').each(function(i, elem) {
                var title = elem.children[0].children[0].data;
                var price = elem.children[1].children[0].data;
                console.log("Extension: " + title + " price is: " + price);
            });
            
        })
        .done(() => { console.log("Done"); });
}

var fetcher = {};
fetcher.fetch = handleFetch;

module.exports = fetcher;

//fetch('https://itunes.apple.com/us/app/carcassonne/id375295479?mt=8', 'test')
