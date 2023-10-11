// const vercel_public_domain = process?.env?.NEXT_PUBLIC_DOMAIN

// const node_prod_env = process.env.NODE_ENV === 'production'

// if Vercel prod deployment, then use main domain; else use temporary domain unless you're on dev
// export const baseUrl =  node_prod_env ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://127.0.0.1:3000'
export const baseUrl =  process.env.NODE_ENV==='development'? `${process.env.NEXT_PUBLIC_SITE_URL}`: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`