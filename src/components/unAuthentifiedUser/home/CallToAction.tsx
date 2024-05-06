import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center my-8 space-y-4">
    <h1 className="text-3xl font-bold text-center ">
      La carte de visite <br />
      <span className="text-red-800">des professionels</span>
    </h1>
    <Link
      to="/register"
      className="self-center p-2 text-white bg-red-700 rounded-md"
    >
      <button>Créer ma carte de visite</button>
    </Link>
    <h2 className="text-center">
      <b>
        Passez au numérique. Partagez vos cartes de visite ave un simple
        QR code
      </b>
    </h2>
  </div>
  )
}

export default CallToAction
