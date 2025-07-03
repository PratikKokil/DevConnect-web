import { BrowserRouter, Route, Routes,Navigate} from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Feed from "./components/Feed"
import { useSelector} from "react-redux"
import Profile from "./components/Profile"


function App() {

  const user = useSelector(store=>store.user)


  return (
    <>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/" element={<Feed/>}/>
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
        <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
