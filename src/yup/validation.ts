import * as yup from 'yup'

export const carValidation = yup.object().shape({
  licensePlate: yup.string().required('License plate field is required'),
  color:  yup.string().required('color field is required'),
  brand: yup.string().required('brand field is required'),
})

export const carUseValidation = yup.object().shape({
  driverId: yup.string().required('drivers id is required'),
  carId: yup.string().required('car id is required'),
  reason: yup.string().required('reason is required'),
})

export const driverValidation = yup.object().shape({
  name: yup.string().required('drivers name is required'),
})