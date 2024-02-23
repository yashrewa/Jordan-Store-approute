
export const UseFetchFromNext = async (endpoint) =>{
    const res = await fetch(`https://strong-return-401509.el.r.appspot.com${endpoint}`)
    const data = await res.json()
    console.log(data)
    return data;
}