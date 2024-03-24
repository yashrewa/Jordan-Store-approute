
export const UseFetchFromNext = async (endpoint) =>{
    const res = await fetch(`https://jordan-store-backup-backend.onrender.com${endpoint}`)
    // const res = await fetch(`https://jordan-store-approute.onrender.com${endpoint}`)
    const data = await res.json()
    console.log(data)
    return data;
}