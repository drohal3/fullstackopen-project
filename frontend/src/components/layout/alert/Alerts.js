import AlertItem from "./AlertItem";
import { useSelector } from "react-redux";

function Alerts(  ) {
  const alerts = useSelector((state) => {
    return state.alerts
  })

  return (
    <>
      {alerts.map(alert => (<AlertItem key={alert.alertId} alert={alert} />))}
    </>
  )
}

export default Alerts