import Uik from "../../ui-kit"
import Title from "./Title"

function Example () {
  return (
    <>
      <Title text='QR Code' code={code}/>
        
      <Uik.QRCode value='Nexis' />
    </>
  )
}

const code = `<>
  <Uik.QRCode value='Nexis' />
</>`

export default Example