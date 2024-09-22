import React, { useRef, useState } from 'react'
import Papa from 'papaparse'
import { useQueries } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom' // Import useNavigate for navigation
import { UploadProduct } from '../../Models/Products'

const fetchProductInfo = async (barcode: number) => {
  const response = await fetch(`/api/v1/product/${barcode}.json`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

function getFormattedDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); 
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}

const CsvUploader = () => {
  const [barcodes, setBarcodes] = useState<string[]>([])
  const [data, setData] = useState<UploadProduct[]>([])
  const [isReadyToDownload, setIsReadyToDownload] = useState(false)
  const hasFetchedData = useRef(false) 
  const [inputBarcode, setInputBarcode] = useState('') // State to track input
  const navigate = useNavigate() // Hook for navigation

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const barcodeList = results.data
            .map((item: any) => item.barcode)
            .filter(Boolean)
          setBarcodes(barcodeList)
        },
      })
    }
  }

  const queries = barcodes.map((barcode) => ({
    queryKey: ['productInfo', barcode],
    queryFn: () => fetchProductInfo(Number(barcode)),
    enabled: !!barcode,
  }))

  const productQueries = useQueries({
    queries,
  })

  React.useEffect(() => {
    if (
      barcodes.length > 0 &&
      productQueries.every((query) => query.isSuccess) && 
      !hasFetchedData.current 
    ) {
      const enrichedData: UploadProduct[] = productQueries.map(
        (query, index) => {
          const product = query.data
          const attributeArray = Object.entries(product.categoryAttributes)

          return {
            barcode: Number(barcodes[index]),
            code: product?.modelNo || '', 
            department:
              product?.defaultdisplaycategory?.hierarchy?.split('>')[0] || '',
            productgroup:
              product?.defaultdisplaycategory?.hierarchy?.split('>')[1] || '',
            subgroup:
              product?.defaultdisplaycategory?.hierarchy?.split('>')[2] || '',
            shortdesc: product?.brand.name + product?.heading || '',
            longdesc: product?.heroStory || '',
            sellingpoints: product?.productFeatures || '',
            specifications: attributeArray || {},
            mancode: product?.modelNo || '',
            priceindex: 'TRUE',
            unicode: product?.modelNo || '',
            warranty: '',
            showstock: getFormattedDate(),
            damage: '',
            video: '',
            feature1: attributeArray[0],
            feature2: attributeArray[1],
            feature3: attributeArray[2],
            feature4: attributeArray[3],
            feature5: attributeArray[4],
            feature6: attributeArray[5],
            feature7: attributeArray[6],
            giftwrap: attributeArray[7],
            visible: 'TRUE',
            forsale: 'TRUE',
            metadesc:
              product?.modelNo +
                ' - ' +
                product?.brand +
                ' ' +
                product?.heading || '',
            metakeywords:
              product?.modelNo +
                ' - ' +
                product?.brand +
                ' ' +
                product?.heading || '',
          }
        },
      )

      setData(enrichedData)
      setIsReadyToDownload(true) 
      hasFetchedData.current = true; 
    }
  }, [productQueries, barcodes])

  const downloadCsv = (data: UploadProduct[]) => {
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'products_info.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // New function to handle barcode form submission
  const handleBarcodeSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (inputBarcode) {
      navigate(`/product/${inputBarcode}`) // Navigate to the product page
    }
  }

  return (
    <div className='main-page'>
      <img src='images/heathcotes.png' alt='heathcotes logo' className='logo'/>
      <h1 className='nexus-header'>Nexus Connection</h1>
      <h2>Click the button to upload a .csv file of product barcodes.<br/>Just a single column with a heading of barcode is required</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} className='import-button' />
      {productQueries.some((query) => query.isLoading) && <p>Loading...</p>}
      {productQueries.some((query) => query.isError) && (
        <p>Error loading product data.</p>
      )}
      {isReadyToDownload && (
        <button onClick={() => downloadCsv(data)}>
          Download Completed CSV
        </button>
      )}

      <h2 className='barcode-header'>Alternatively you can enter a barcode below and view all of the information available for that product</h2>

      {/* New input field for manually entering barcode */}
      <form onSubmit={handleBarcodeSubmit} className='barcode-form'>
        <label>
          Enter Barcode:
          <input
            type="text"
            value={inputBarcode}
            onChange={(e) => setInputBarcode(e.target.value)}
          />
        </label>
        <button type="submit" className='button'>Go to Product</button>
      </form>
    </div>
  )
}

export default CsvUploader
