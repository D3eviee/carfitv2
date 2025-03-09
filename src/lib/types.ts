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
  duration: string,
  from: string,
  to: string
}

type serviceCategoryProps = {
  name: string,
  serviceId?: string
}
