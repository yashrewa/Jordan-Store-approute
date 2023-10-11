import { baseUrl } from "./baseUrl"


export const UseFetchFromNext = async (endpoint) =>{
    console.log(process.env.BASE_URL)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`)
    const data = await res.json()
    console.log(data)
    return data;
}