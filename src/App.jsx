import { BrowserRouter, Route, Routes,Navigate} from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Feed from "./components/Feed"
import { useSelector} from "react-redux"


function App() {

  const user = useSelector(store=>store.user)


  return (
    <>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/login" element={user? <Navigate to="/feed"/>:<Login/>}/>
        <Route path="/feed" element={user ?<Feed/> : <Navigate to="/Login"/>}/>
        </Route>
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
