import {Component} from "react"

class ErrorThrower extends Component {
  componentDidMount(){
    throw new Error("Erreur test pour ErrorBoundary")
  }
  render(){
    return <div>Si vous voyez ceci, l'erreur n'a pas été capturé par error boundary</div>
  }
}

export default ErrorThrower