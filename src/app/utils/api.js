


export const UseFetchFromNext = async (endpoint) =>{
    console.log(process.env.NEXT_PUBLIC_VERSION)
    // const res = await fetch(`${process.env.NEXT_PUBLIC_VERSION}${endpoint}`)
    const res = await fetch(`${endpoint}`)
    const data = await res.json()
    console.log(data)
    return data;
}