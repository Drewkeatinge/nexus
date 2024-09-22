import request from 'superagent'
import { ProductSub } from '../Models/Products'



export async function getProduct(productId: number) {
  const res = await request.get(`/api/v1/product/${productId}.json`)
  console.log(res.body)
  
  return res.body
}


export async function getAllProducts(): Promise<ProductSub[]> {
  const res = await request.get(`/api/v1/product/`)
  return res.body as ProductSub[]
}

