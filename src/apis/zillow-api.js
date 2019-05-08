import {
  zillow_url,
  eppraisal_url,
  pennymac_url,
  attom_url,
  chase_url,
  realtor_url,
  zillow_single_url
} from '../config'

function cleanAddress(value) {
  if (value) {
    return value.replace(/[-_/.]/g, '')
  }
  return value
}

export function getPropertyDetails({
  addr,
  cityorzip,
  pennymacaddr,
  address1,
  address2,
  zip,
  zillow_ad,
}) {
  // addr - zillow_ad - address1 // this is the home and street
  // zip - cityorzip // this is the zip
  // console.log('Addr', addr);
  // console.log('cityorzip', cityorzip);
  // console.log('pennymacaddr', pennymacaddr);
  // console.log('address1', address1);
  // console.log('address2', address2);
  // console.log('zip', zip);
  // console.log('zillow_ad', zillow_ad);
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        // const z = await fetch(
        //   `${zillow_url}addr=${encodeURIComponent(addr)}&pin=${cityorzip}`,
        // )
        let removeHash = value => value.replace('# ', '')
        let chase_addr = addr
          .split(' ')
          .reduce((acc, val, i, arr) => {
            if (i === 3) {
              return acc
            }
            return acc + ' ' + val
          }, '')
          .trim()
        // const e = await fetch(
        //   `${eppraisal_url}addr=${removeHash(addr)}&pin=${cityorzip}`,
        // )
        // const p = await fetch(`${pennymac_url}address=${pennymacaddr}`)
        // const a = await fetch(`${attom_url}address1=${encodeURI(address1)}&address2=${encodeURI(address2)}`)
        // const zill = await z.json()
        // const epp = await e.json()
        // const penny = await p.json()
        // const attom = await a.json()

        const [zill, epp, penny, chase, attom, realtor] = await Promise.all([
          fetch(
            `${zillow_url}addr=${encodeURIComponent(
              cleanAddress(zillow_ad),
            )}&pin=${cityorzip}`,
          ).then(resp => resp.json()),
          fetch(
            `${eppraisal_url}addr=${removeHash(
              cleanAddress(addr),
            )}&pin=${cityorzip}`,
          ).then(resp => resp.json()),
          fetch(`${pennymac_url}address=${cleanAddress(pennymacaddr)}`).then(
            resp => resp.json(),
          ),
          fetch(
            `${chase_url}address=${cleanAddress(chase_addr)}&zip=${zip}`,
          ).then(resp => resp.json()),
          fetch(
            `${attom_url}address1=${removeHash(
              cleanAddress(address1),
            )}&address2=${encodeURI(address2)}`,
          ).then(resp => resp.json()),
          fetch(
            `${zillow_single_url}addr=${encodeURIComponent(
              cleanAddress(zillow_ad),
            )}&pin=${cityorzip}`,
          ).then(resp => resp.json()),
        ])
        let pennymac = penny.data //: penny.data
        // debugger;
        resolve({
          zillow: zill,
          eppraisal: epp,
          pennymac,
          attom,
          chase: chase.data,
          realtor,
        })
      } catch (e) {
        reject({
          zillow: undefined,
          eppraisal: undefined,
          pennymac: undefined,
          attom: undefined,
          chase: undefined,
          realtor: undefined,
        })
      }
    })()
    // .then(data => {
    //     resolve(data);
    // })
    // .catch(e => {
    //     reject(e);
    // })
  })
}


export function getPropertyDetailsExceptZillow({
  addr,
  cityorzip,
  pennymacaddr,
  address1,
  address2,
  zip,
  zillow_ad,
}) {
  // addr - zillow_ad - address1 // this is the home and street
  // zip - cityorzip // this is the zip
  // console.log('Addr', addr);
  // console.log('cityorzip', cityorzip);
  // console.log('pennymacaddr', pennymacaddr);
  // console.log('address1', address1);
  // console.log('address2', address2);
  // console.log('zip', zip);
  // console.log('zillow_ad', zillow_ad);
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        // const z = await fetch(
        //   `${zillow_url}addr=${encodeURIComponent(addr)}&pin=${cityorzip}`,
        // )
        let removeHash = value => value.replace('# ', '')
        let chase_addr = addr
          .split(' ')
          .reduce((acc, val, i, arr) => {
            if (i === 3) {
              return acc
            }
            return acc + ' ' + val
          }, '')
          .trim()
        // const e = await fetch(
        //   `${eppraisal_url}addr=${removeHash(addr)}&pin=${cityorzip}`,
        // )
        // const p = await fetch(`${pennymac_url}address=${pennymacaddr}`)
        // const a = await fetch(`${attom_url}address1=${encodeURI(address1)}&address2=${encodeURI(address2)}`)
        // const zill = await z.json()
        // const epp = await e.json()
        // const penny = await p.json()
        // const attom = await a.json()

        const [zill,epp, penny, chase, attom] = await Promise.all([
               fetch(
            `${zillow_url}addr=${encodeURIComponent(
              cleanAddress(zillow_ad),
            )}&pin=${cityorzip}`,
          ).then(resp => resp.json()),
          fetch(
            `${eppraisal_url}addr=${removeHash(
              cleanAddress(addr),
            )}&pin=${cityorzip}`,
          ).then(resp => resp.json()),
          fetch(`${pennymac_url}address=${cleanAddress(pennymacaddr)}`).then(
            resp => resp.json(),
          ),
          fetch(
            `${chase_url}address=${cleanAddress(chase_addr)}&zip=${zip}`,
          ).then(resp => resp.json()),
          fetch(
            `${attom_url}address1=${removeHash(
              cleanAddress(address1),
            )}&address2=${encodeURI(address2)}`,
          ).then(resp => resp.json()),
        ])
        let pennymac = penny.data //: penny.data
        // debugger;
        resolve({
          zillow: zill,
          eppraisal: epp,
          pennymac,
          attom,
          chase: chase.data,
        })
      } catch (e) {
        reject({
          zillow: undefined,
          eppraisal: undefined,
          pennymac: undefined,
          attom: undefined,
          chase: undefined,
        })
      }
    })()
    // .then(data => {
    //     resolve(data);
    // })
    // .catch(e => {
    //     reject(e);
    // })
  })
}
