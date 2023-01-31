import React from "react";

export const BEARER_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NzExMTQ4NjksImV4cCI6MTY3MTExODQ2OSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluQGV4YW1wbGUuY29tIn0.pygjFDDxsVXERDS9jBkbxZIdJsk1-jrcAfbBXLFKHOyD4pSZJOL2zv5UKQKh3vnRYGd4FwApZyqk7tC3_zhH6s-JxtZNbmyX-nOEsRkFVMsRHoHryZUsbVIsFueiQ76d7eyxk-K-Pf_EXFNwuk-cknYQR4gkCYDyF6UH65uJ7lv4jkC4VxSdkMVhtqky3j1hQOSePyOyXg0nsFs7uK5s0QijS3KOXlzSR0aE9kAUYbX671KTgELmji2yAhdolAFDYzb6vkTG_FyuuiIcn9MlaOOfVjp2MY0cJMjkxqWp1eQmz_PuT8eCodc7PRstBgJ-OeF_AtpEWlsJrReaTG74CbpUMf31UYxlXDtx75Sl7I8gl38AEKByu2IHJbqDW3wxmDbWt8V6wJEn40bGuD0SUUBcdqyhnyd44DRBr6S_qLGLL0Dz37U8L-YE7ONMvXSXH2FjoeeFCwjvgLtUVYwdDwS8rmnH2r7C0mUmP2ocVAh_sENff0amhwabe64HvwsHIMT4c72JXa3ZZVfOmds0wg2Zsn5aCxIcB0OmL0nfA_TNkCwVubKxpmv2Kt_dymS-5lOd-Ma_sp49qQ4HtPm0vhpPdlmtNYCbsGieCyVEIrDxw9OsxAI2V1_b4L-WEWtDAAL7aNXypMxeHwjHK1gyzKYpo9-hWJhsGIJdKSzaENQ";

export const required = value => (value ? undefined : <p style={{color:'red'}}>Required field</p>);
export const mustBeNumber = value => (isNaN(value) ? <p style={{color:'red'}}>Must be a number</p> : undefined)

export const isbnRegEx = /(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)/;
export const isbnNumbersCheck = value => (isNaN(value) || !value.match(isbnRegEx)) ?
    (<p style={{color:'red'}}>Should be isbn 10 or 13 digits</p>) : null;
export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)

export const BASE_URL = `https://demo.api-platform.com`;

// function fetchWrapper (...props) {
//     return useQuery(BASE_URL+ props,  {
//         headers: {Authentication: 'Bearer {token}'}
//     })
//         .then((res) => res.json())
// }
// tokenFetch("/books/",)
// export const tokenFetch = async(id,init) => {
//     const {data} = await fetch(BASE_URL + id, {
//         method : init.method??"GET",
//         headers: {
//             Authorization:  `Bearer` + localStorage.getItem('token')
//         }
//     });
//     return data.json();
// };
export const tokenFetch =  (id, init) => {
    return fetch(BASE_URL + id, {
        method: init ?? "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + localStorage.getItem('token'),
        },
    })
        .then((response) => response.json());
}


// useQuery({ meta: { headers: { this: 'that' } })

