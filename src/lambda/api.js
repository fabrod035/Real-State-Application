const Zillow = require('node-zillow')
const express = require('express')
const got = require('got')
//const from = require('from2');
//const csv = require('csv2json');
//const csv = require('csvtojson');
// const mongoose = require('mongoose');
//const uniqBy = require("lodash.uniqby");
const fileUpload = require('express-fileupload');
const axios = require('axios');
//const memoize = require('fast-memoize');
//const fileUpload = require('express-fileupload');
//var uniqueRandomArray = require('unique-random-array');
//const merge = require('deepmerge');
const cheerio = require('cheerio')
const serverless = require('serverless-http')
//const proxy = require('http-proxy-middleware');
const uniqueRandomArray = require('unique-random-array');
const zillow = new Zillow(uniqueRandomArray(["X1-ZWz1h0wpinvjt7_4aijl","X1-ZWz1827paqtfd7_7dhgw","X1-ZWz17zi57qbrbf_6wmn8","X1-ZWz1h10forja4r_6y17p"])(), {https: true});
const app = express()
// const db = require('./server');
const propertyRouter = express.Router()

// app.use(proxy('/.netlify/functions/', { 
//     target: 'http://localhost:9000/',
//     "pathRewrite": {
//       "^/\\.netlify/functions": ""
//     }
// }));
const dev = process.env.DEV || false;

// const dbUrl = 'mongodb://lockround:sam9457049664@ds011810.mlab.com:11810/hybridestate',
//       dbOptions = {
//         useNewUrlParser: true,
//         useFindAndModify: false
//       }
// // Set DB from mongoose connection
// mongoose.connect(dbUrl, dbOptions)
// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// const schema = new mongoose.Schema({
//         _id: mongoose.Schema.Types.ObjectId,
//         Amount: {
//           type: String,
//         },
//         'Auction Location': {
//           type: String,
//         },
//         Borrower: {
//           type: String,
//         },
//         City: {
//           type: String,
//         },
//         Classification: {
//           type: String,
//         },
//         County: {
//           type: String,
//         },
//         'Date': {
//           type: String,
//         },
//         Lender: {
//           type: String,
//         },
//         'Number': {
//           type: String,
//         },
//         State: {
//           type: String,
//         },
//         Street: {
//           type: String,
//         },
//         Time: {
//           type: String,
//         },
//         Zip: {
//           type: String,
//         },
//         field14: {
//           type: String,
//         },
//       })

// const Property = mongoose.model('property', schema)


function logger(addr,pin,api){
return `****TRY****
Address: ${addr}, 
Pin: ${pin},
URL: ${api?api:''}
Date: ${new Date().toString()}
`
}

// function finalMerge(arr1,arr2){
//     const emptyTarget = value => Array.isArray(value) ? [] : {}
//     const clone = (value, options) => merge(emptyTarget(value), value, options)
//     function combineMerge(target, source, options) {
//     	const destination = target.slice()
    
//     	source.forEach(function(e, i) {
//     		if (typeof destination[i] === 'undefined') {
//     			const cloneRequested = options.clone !== false
//     			const shouldClone = cloneRequested && options.isMergeableObject(e)
//     			destination[i] = shouldClone ? clone(e, options) : e
//     		} else if (options.isMergeableObject(e)) {
//     			destination[i] = merge(target[i], e, options)
//     		} else if (target.indexOf(e) === -1) {
//     			destination.push(e)
//     		}
//     	})
//     	return destination
//     }
//     return merge(arr1,arr2,{ arrayMerge: combineMerge });
// }

const getPropertyBySearchTerm = (req, res, next) => {
  try {
    const addr = req.query.addr
    const pin = req.query.pin
    const params = {
      address: addr,
      citystatezip: pin,
    }
    console.log(logger(addr,pin,'GetDeepSearchResults'))
    zillow.get('GetDeepSearchResults', params).then(results => {
      if (results.message.code === '508') {
        return res
          .status(404)
          .json({message: results.message.text, status: 404})
      }
      //console.log('Results:        ',results.response.results.result);
      return res
        .status(200)
        .json({resl: results.response.results.result, status: 200})
    })
  } catch (e) {
    //next(new Error('Fucked up term!'));
    res.status(201).json({not_found: true})
  }
}

const getPropertyBySearchTermAndGetListPrice = (req, res, next) => {
  try {
    const addr = req.query.addr
    const pin = req.query.pin
    const params = {
      address: addr,
      citystatezip: pin,
    }
    console.log(logger(addr,pin,'GetDeepSearchResults'))
    zillow.get('GetDeepSearchResults', params).then(results => {
      if (results.message.code === '508') {
        return res
          .status(404)
          .json({message: results.message.text, status: 404,value:''})
      }
      //console.log('Results:        ',results.response.results.result);
      // return res
      //   .status(200)
      //   .json({resl: results.response.results.result, status: 200})
      const homeLink = results.response.results.result[0].links[0].homedetails[0];
      got(homeLink).then(resp => {
        const $ = cheerio.load(resp.body);
        const value = $('#home-details-content > div > div > div.ds-container > div.ds-data-col > div.ds-chip > div > div.ds-summary-row-container > div > div > h3 > span > span').text()
        console.log('Zillow List price ',value);
        return res.status(200).json({value})
      })
    })
  } catch (e) {
    //next(new Error('Fucked up term!'));
    res.status(201).json({value:'',not_found: true})
  }
}

const getZestimate = (req, res) => {
  try {
    const zpid = req.query.zpid
    const params = {
      zpid,
    }
    zillow.get('GetZestimate', params).then(results => {
      res.status(200).json({results})
    })
  } catch (e) {
    // ignore
    res.status(201).json({found: 'nothing'})
  }
}

// const proxies = [{app_id:'cphBq9TpWrcj6M1xzsMI',app_code:'5V2ffnepOep_MteDjxopiw'},{app_id:'5qynimU7MJo63wgO6e9N',app_code:'ULauTuEfATQoShRhyg2Y3Q'},{app_id:'5qynimU7MJo63wgO6e9N',app_code:'ULauTuEfATQoShRhyg2Y3Q'},{app_id:'EwHYtitMFGXnasKwp5Tw',app_code:'k2-JLxmxfK9YS8DzDSXqIQ'}]

// const rand = uniqueRandomArray(proxies);
// const getSuggestions = (req,res) => {
//   const term = req.query.term;
//   const cred = rand()
//   console.log('Using cred: ', cred);
//   axios
//       .get('https://autocomplete.geocoder.api.here.com/6.2/suggest.json', {
//         params: {
//           ...cred,
//           query: term,
//           maxresults: 1,
//         },
//       }).then(resp => {
//         res.status(200).json(resp.data);
//       })
// }

const getUpdatedZillowPropertyByZPID = (req,res) => {
  try {
    const zpid = req.query.zpid
    const params = {
      zpid,
    }
    zillow.get('GetUpdatedPropertyDetails', params).then(results => {
      res.status(200).json({data:results})
    })
  } catch (e) {
    // ignore
    res.status(201).json({found: 'nothing'})
  }
}

const getEppPropertyDetails = (req, res) => {
  const addr = req.query.addr
  const zip = req.query.pin
  //4855%20Edison%20ave
  //80301
  const main_url = `https://www.eppraisal.com/home-values/property-lookup?a=${encodeURI(
    addr,
  )}&z=${encodeURI(zip)}`
  const url = 'https://www.eppraisal.com'
  console.log(logger(addr,zip,main_url));
  got(main_url)
    .then(resp => {
      const $ = cheerio.load(resp.body)
      const epp = $('#eppraisal_val').attr('data-url')
      const zill = $('#zillowval').attr('data-url')
      //console.log(zillow);
      ;(async () => {
        try {
          const zillow_value = await got(url + zill)
          const eppraisal_val = await got(url + epp)
          const zillow$ = cheerio.load(zillow_value.body)
          const epp$ = cheerio.load(eppraisal_val.body)
          const data = {}
          const zillow = {
            value: zillow$('#zillowLink').text(),
            range: {
              low: zillow$('#zillowLowValue').text(),
              high: zillow$('#zillowHighValue').text(),
            },
          }
          const eppraisal = {
            value: epp$('#eppraisalval').text(),
            range: epp$('.main-page-description-small').text(),
          }
          data['zillow'] = zillow
          data['eppraisal'] = eppraisal
          return res.status(200).json({data})
        } catch (e) {
          let data = {zillow:{value:'n/a', range:{low:'n/a',high:'n/a'}}, eppraisal:{value:'n/a', range:'n/a'}}
          return res.status(200).json({data})
        }
        //console.log(data);
      })()
    })
    .catch(e => {
      let data = {zillow:{value:'n/a', range:{low:'n/a',high:'n/a'}}, eppraisal:{value:'n/a', range:'n/a'}}
      return res.status(200).json({data})
    })
}

//Pennymac USA API
function getPennymacPropertyDetails(req,res){
  const address = decodeURI(req.query.address);
  (async() => {
    try {
        const resp = await axios.post('https://cavmwidget.homepricetrends.com/api/CavmCors/ValuationReportFull', {Address: address,
            CompanyId: 3010,
            SecurityToken: "41e8dad6-c175-49ef-8d45-a7e5aea64fc3"})
          return res.status(200).json({data:resp.data});
        //return res.status(200).json({ok:true})
         }catch(e){
              return res.status(200).json({failed:true});
        }
  })()
}

// Chase.com API
function getChasePropertyDetails(req,res){
  function getData(address){
const chase = `{"licenseCode":"57ab486697a44315b843ba02f220a342","Address":"","propertyType":"","numBeds":"0","numBaths":"0","numTotalRooms":"0","livingArea":"0","yearBuilt":"0","currentValue":"0","languageCode":"en-US","renderPropListHTML":"true","requestType":"New","leadNumber":"0"}`
const parsed = JSON.parse(chase);
return {...parsed, Address:address};
}
  (async() => {
    try{
    const address = decodeURI(req.query.address);
    const zip = Number(req.query.zip);
    const auto_complete_url = "https://apis-uat.corelogic.com/typeahead/autocomplete?input="+address;
    const property_url = "https://valuemap.corelogic.com/ValueMapService.asmx/GetPropertyInfoReport";
    const resp = await axios(auto_complete_url);
    const data = resp.data.result_set.filter(v => v['address'].includes(zip))[0];
    const final_address = data.address;
    const property = await axios({
        url:property_url,
        method:'post',
        data:getData(final_address),
    })
    
    return res.status(200).json({data:{price:property.data.d.SubjectProperty.DisplayPrice,low:property.data.d.SubjectProperty.LowValue,high:property.data.d.SubjectProperty.HighValue}});
    }catch(e){
        return res.status(200).json({data:{msg:'Bad response from server.'}});
    }
  })()
}

// AttomData API
//const attom_url = 'https://attom-api-npjebhrbdm.now.sh/property?'
const api = (scope,point) => `https://search.onboard-apis.com/propertyapi/v1.0.0/${scope}/${point}?`;
const configGet = {method: 'get',
          headers:{
              'Accept': 'application/json',
              'apikey': '2bb5d5d24cf6f6752659e3b827a8dafa'
          }}
/* next: dead method*/
// Single Property Details
// function getPropertyDetailsAPI(address1, address2){
//     //console.log('executed');
//     return new Promise((resolve,reject) => {
//         const url = `${api('property','expandedprofile')}address1=${encodeURI(address1)}&address2=${encodeURI(address2)}`;
        
//         console.log(logger(address1,address2,url));
//         axios({
//           ...configGet,
//           url
//         }).then(resp => {
//             resolve(resp.data)
//         }).catch(e => {
//             reject({error:true});
//         })
//         })
// }
// const memoizedGetPropertyDetails = memoize(getPropertyDetailsAPI);

/* next: dead method*/
// Single Property Sale Detail
// function getSaleDetailsAPI(address1,address2){
//     return new Promise((resolve,reject) => {
//         const url = `${api('sale','detail')}address1=${encodeURI(address1)}&address2=${encodeURI(address2)}`;
//         axios({
//             ...configGet,
//             url
//         }).then(resp => {
//             resolve(resp.data);
//         }).catch(e => {
//             resolve(e);
//         })
//     })
// }
// const memoizedGetSaleDetails = memoize(getSaleDetailsAPI);

// Single Property AVM
function getAVMDetailsAPI(address1,address2){
    return new Promise((resolve,reject) => {
        const url = `${api('avm','detail')}address1=${encodeURI(address1)}&address2=${encodeURI(address2)}`;
        axios({
            ...configGet,
            url
        }).then(resp => {
            resolve(resp.data);
        }).catch(e => {
            resolve(e);
        })
    })
}
//const memoizedGetAVMDetails = memoize(getAVMDetailsAPI);

const getAttomDataByAddress = (req,res) => {
  const {address1,address2} = req.query;
    Promise.all([getAVMDetailsAPI(address1,address2)])
    .then(([prop]) => {
        return res.status(200).json({data:prop.property[0].avm});
        // return res.status(200).json({data:finalMerge(prop.property,sale.property)});
    }).catch(e => {
        return res.status(200).json({data:{failed:true}});
    })
}


// Realtor API
const getRealtorData = (req,res) => {
  const address = encodeURIComponent(req.query.address);
  console.log('Address: ',address);

  const url = "https://parser-external.geo.moveaws.com/search?input="+address+"&limit=1&client_id=rdc-x&area_types=city%2Ccounty%2Cpostal_code%2Caddress%2Cstreet%2Cneighborhood%2Cschool%2Cschool_district%2Cuniversity%2Cpark&lat=-1&long=-1"
  axios.get(url).then(resp => {
    let id = resp.data.hits[0].mpr_id;
    // const apis = ["8b396abbd0b33854c0eb758c13ea4af2","c37d30fdeff4f242b0d9d271bac1c9b9","85259c86e273f7099104aea93252acf1","1b279da0be0da88f7c08a27a1529949e","36864a8a74508f5ba74546ae6b9a493e"]
    const api = "8b396abbd0b33854c0eb758c13ea4af2"
    //const random = uniqueRandomArray(apis);
    const proxy = `http://api.scraperapi.com?api_key=${api}&url=`
    const prop_url = proxy+"https://www.realtor.com/realestateandhomes-detail/M"+id;
    got(prop_url).then(response => {
      const $ = cheerio.load(response.body);
      const value = $('span[itemprop="price"]').text().trim();
      res.status(200).json({value});
    }).catch(e => {
      res.status(200).json({value:0})
    })
  })
}

const keyUrl = `https://lockround.now.sh/key?admin_key=marccox`;

const getUser = (req,res) => {
  const key = req.query.key;
  //console.log('Key ',key)
  if(key === 'marccox'){
    return res.status(200).json({role:'admin',isAuthenticated:true,admin_key:'marccox'})
  }
  
  axios.get(keyUrl).then(resp => {
    let keys = Object.keys(resp.data).map(v => resp.data[v].key)
    console.log(keys);
    if(keys.includes(key)){
      return res.status(200).json({role:'user',isAuthenticated:true})
    }
    return res.status(200).json({role:null,isAuthenticated:false})
  })
}

//app.use(fileUpload());
// function fromString(string){
//     return from(function(size, next) {
//     // if there's no more content
//     // left in the string, close the stream.
//     if (string.length <= 0) return next(null, null)
 
//     // Pull in a new chunk of text,
//     // removing it from the string.
//     var chunk = string.slice(0, size)
//     string = string.slice(size)
 
//     // Emit "chunk" from the stream.
//     next(null, chunk)
//   })
// }
//app.post('/upload', );
propertyRouter.route('/property').get(getPropertyBySearchTerm)

propertyRouter.route('/zillow').get(getPropertyBySearchTermAndGetListPrice)

propertyRouter.route('/property/zestimate').get(getZestimate)
propertyRouter.route('/property/updated').get(getUpdatedZillowPropertyByZPID);

propertyRouter.route('/eppraisal').get(getEppPropertyDetails)

propertyRouter.route('/attom').get(getAttomDataByAddress)
//https://realestatecenter.bankofamerica.com/tools/marketvalue4.aspx?address=5341+odin+ave+80301

propertyRouter.route('/chase').get(getChasePropertyDetails);
propertyRouter.route('/pennymac').get(getPennymacPropertyDetails);

propertyRouter.route('/realtor')
.get(getRealtorData)

propertyRouter.route('/signin')
.get(getUser)
// propertyRouter.route('/upload').post((req, res) =>{
//     const file = req.files[Object.keys(req.files)[0]];
//     fromString(file.data).pipe(csv()).pipe(res);
// })
//propertyRouter.route('/suggest').get(getSuggestions);


// propertyRouter
// .route('/upload')
// .get((req,res) => {
//     let {state,city,street} = req.query;
//     (async() => {
      
//     try {
//     const results = await Property
//       .find({ Street: street, City: city, State:state })
//       .lean()
//       .exec()

//     if (!results) {
//       return res.status(200).json({data:{error:true,results:[]}})
//     }

//     return res.status(200).json({ data: {error:null,results} })
//   } catch (e) {
//     console.error(e)
//     return res.status(200).json({data:{error:true}})
//   }
//     })()
// })
// .post((req,res) => {
//   const file = req.files[Object.keys(req.files)[0]];
//   if(!file.name.includes('csv')){
//     return res.status(200).json({ok:false,msg:'Only CSV files are allowed'});
//   }
//   csv().fromString(file.data.toString()).then(data => {
//       //console.log(data);
//       // const filteredData = data.reduce((acc,val) => {
//       const uniqueByNumber = uniqBy(data,'Number');
//       // },[])
//       Property.insertMany(uniqueByNumber, err => {
//         if(err) return res.status(200).json({ok:false,msg:'Could not insert into database.'});
//         return res.status(200).json({ok:true,msg:'Import Successful!'});
//       })
//     })
// })

if(dev){
  const cors = require("cors");
  //var whitelist = ['https://fabio-real-state-lockround.c9users.io', 'https://hybridestate.ga']
  // var corsOptions = {
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       callback(null, true)
  //     } else {
  //       callback(new Error('Not allowed by CORS'))
  //     }
  //   }
  // }
  app.use(cors());
}

app.use('/.netlify/functions/api', fileUpload(),propertyRouter)

exports.handler = serverless(app)
