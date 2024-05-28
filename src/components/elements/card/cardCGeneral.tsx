import { CardGeneral as CardGeneralType } from '@/types/card'
import CardContainer from './CardContainer'

type CardGeneralPartial = Partial<CardGeneralType>
const CardCGeneral = ({ firstname, lastname }: CardGeneralPartial) => {
  return (
    <CardContainer>
      <p>{firstname??""} {lastname??""}</p>
  

    </CardContainer>
  )
}

export default CardCGeneral
