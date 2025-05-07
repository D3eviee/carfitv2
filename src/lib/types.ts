type WorkingDay = {
  isOpen : boolean,
  day: string,
  open: string,
  close: string
}

type serviceModalProps = {
  name: string,
  category: string,
  price: string,
  description: string,
  durationType: string,
  duration: number,
  from: number,
  to: number
}

type serviceCategoryProps = {
  name: string,
  serviceId?: string
}

type CategoriesData = {
  id: string
  name: string
}

//type for business cards on landing and search page
type BusinessCardProps = {
  id: string
  name: string
  image: string
  category: string
  town:string
  district: string
  street: string
  zipcode: string
  reviews: { rate: number}[]
}