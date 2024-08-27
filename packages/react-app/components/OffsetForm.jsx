import React, {useState} from 'react'
import CustomInput from './ui/CustomInput'


const OffsetForm = () => {
    const [addressAdmin, setAddressAdmin] = useState("")
  return (
    <div>
        <h3>Create A Pool To Get Started</h3>
        <p>Offset Carbon </p>
        <CustomInput type="number" onChange={(e) => setAddressAdmin(e.target.value)} placeholder="Enter Offset Amount" />
    </div>
  )
}

export default OffsetForm