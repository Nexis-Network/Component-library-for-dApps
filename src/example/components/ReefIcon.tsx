import Uik from "../../ui-kit"
import Title from "./Title"

function Example () {
  return (
    <>
      <Title text='Nexis Icon' code={code}/>

      <Uik.ReefIcon className='example-reef-icon'/>
    </>
  )
}

const code = `<>
  <Uik.ReefIcon />
</>`

export default Example