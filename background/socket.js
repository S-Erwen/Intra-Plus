let status;
let instances = {};
let tabids = [];
let filter = {url:[{hostContains: "intra.42.fr"}]};
/**
 * 
 * 
 */
const add_tab = (details) => {
  console.log(details);
  tabids.indexOf(details.tabId) === -1 ? tabids.push(details.tabId) : false;
};

/**
 * 
 */
chrome.tabs.query({}, (tabs) =>  tabs.forEach((element,key) => {
  if (element.url.search("intra.42.fr") !== -1)
  {
    tabids.indexOf(tabs[key].id) === -1 ? tabids.push(tabs[key].id) : false;
    return false;
  }
}));
// let socket = io("http://127.0.0.1:4313");
// socket.on('connect', () => {
//   if (Object.keys(tabids).length === 0) {
//     //We do nothing yet because we are not yet connected to the Intra.
//   }else{
//     console.log(tabids);
//   }
//   socket.send('hi');
//   socket.on('message', (msg) => console.log(tabids));
// });

chrome.tabs.onRemoved.addListener((tabid, removed) => {
  tabids.forEach((val, index) => {
    if (val === tabid){
      return (tabids.splice(index, 1));
    }
  });
});

chrome.windows.onRemoved.addListener((windowid) => {
  console.log(windowid);
  chrome.windows.getAll((getInfo) => {
    console.log(getInfo);
  })
  // chrome.windows.get(windowid, (details) =>{
  //   console.log(details);
  // });
  // tabids.forEach((val, index) => {
  //   if (val === tabid){
  //     return (tabids.splice(index, 1));
  //   }
  // });
});

chrome.webNavigation.onBeforeNavigate.addListener(add_tab, filter);