// Common config
//const env = 'development'
const env = 'production'
console.log('Environment: ', env)

const dev = 'https://76078872.ngrok.io'
//const dev = '';
const zillow_updated_url_dev = dev + '/.netlify/functions/api/property/updated?'
const zillow_updated_url_prod = 'https://www.mioymequities.ga/.netlify/functions/api/property/updated?'

export const zillow_updated_url = env === 'development' ? zillow_updated_url_dev : zillow_updated_url_prod

const realtor_url_dev = dev + '/.netlify/functions/api/realtor?'
const zillow_url_dev = dev + '/.netlify/functions/api/property?'
const zillow_single_url_dev = dev + '/.netlify/functions/api/zillow?'
const eppraisal_url_dev = dev + '/.netlify/functions/api/eppraisal?'
//const api = "https://www.mioymequities.ga/.netlify/functions/api/property?";
//const pennymac_url_dev = 'https://pennymac-api-viexzgerxt.now.sh/?'
const pennymac_url_dev = dev + '/.netlify/functions/api/pennymac?'
const attom_url_dev = dev + '/.netlify/functions/api/attom?'
const chase_url_dev = dev + '/.netlify/functions/api/chase?'
const upload_url_dev =
  'https://fabio-real-state-lockround.c9users.io:8081/upload'
const upload_url_mongo_dev = dev + '/.netlify/functions/api/upload'
const upload_url_mongo_prod =
  'https://www.mioymequities.ga/.netlify/functions/api/upload'

const realtor_url_prod =
  'https://www.mioymequities.ga/.netlify/functions/api/realtor?'
const zillow_url_prod =
  'https://www.mioymequities.ga/.netlify/functions/api/property?'
const zillow_single_url_prod = 'https://www.mioymequities.ga/.netlify/functions/api/zillow?'
const eppraisal_url_prod =
  'https://www.mioymequities.ga/.netlify/functions/api/eppraisal?'
//const pennymac_url_prod = 'https://pennymac-api-viexzgerxt.now.sh/?'
const pennymac_url_prod =
  'https://www.mioymequities.ga/.netlify/functions/api/pennymac?'
const attom_url_prod =
  'https://www.mioymequities.ga/.netlify/functions/api/attom?'
const chase_url_prod =
  'https://www.mioymequities.ga/.netlify/functions/api/chase?'
const upload_url_prod = 'https://lockround.now.sh/upload'

export const zillow_url =
  env === 'development' ? zillow_url_dev : zillow_url_prod
  
export const zillow_single_url = env === 'development' ? zillow_single_url_dev : zillow_single_url_prod
export const eppraisal_url =
  env === 'development' ? eppraisal_url_dev : eppraisal_url_prod
export const pennymac_url =
  env === 'development' ? pennymac_url_dev : pennymac_url_prod
export const attom_url = env === 'development' ? attom_url_dev : attom_url_prod
export const chase_url = env === 'development' ? chase_url_dev : chase_url_prod

export const upload_url =
  env === 'development' ? upload_url_dev : upload_url_prod

const suggest_url_dev = dev + '/.netlify/functions/api/suggest'
const suggest_url_prod =
  'https://www.mioymequities.ga/.netlify/functions/api/suggest'
export const suggest_url =
  env === 'development' ? suggest_url_dev : suggest_url_prod

export const upload_url_mongo =
  env === 'development' ? upload_url_mongo_dev : upload_url_mongo_prod

// export const upload_url_firebase = env === 'development' ? "https://hs-upload-server-speogjlqvu.now.sh/upload" : 'https://hs-upload-server-speogjlqvu.now.sh/upload'

export const realtor_url =
  env === 'development' ? realtor_url_dev : realtor_url_prod

export const upload_url_firebase =
  env === 'development'
    ? 'https://lockround.now.sh/upload'
    : 'https://lockround.now.sh/upload'

export const authUrl = env === 'development' ? dev + '/.netlify/functions/api/signin' : 'https://www.mioymequities.ga/.netlify/functions/api/signin'

export const keyUrl = env === 'development' ? 'https://lockround.now.sh/key' :'https://lockround.now.sh/key'


