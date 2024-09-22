import { getProduct } from "../apiClient";
import { Product } from "../../Models/Products";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


export default function ProductPage() {
  const id = useParams().id
  const numId = Number(id)

  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ['product', numId],
    queryFn: () => getProduct(numId)
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading product</p>

  return (
    <div className="product-page">
      <h1 className="product-heading">{data?.heading}</h1>
      {/* Loop through each key and value in data and display them */}
      <ul>
        {data &&
          Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {JSON.stringify(value)}
            </li>
          ))}
      </ul>
    </div>
  )
}
