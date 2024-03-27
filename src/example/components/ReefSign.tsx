import Uik from "../../ui-kit"
import Title from "./Title"

function Example () {
  return (
    <>
      <Title text='Nexis Sign' code={code}/>

      <Uik.ReefSign className='example-reef-sign'/>
    </>
  )
}

const code = `<>
  <Uik.ReefSign />
</>`

export default Example