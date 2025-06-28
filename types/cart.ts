export interface CartItem {
  id: number
  name: string
  price: string
  image: string
  size: string
  quantity: number
}

export interface Customer {
  name: string
  email: string
  phone: string
  address: string
  city: string
  notes?: string
}
