import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import ViewProduct from './pages/ViewProduct';
import EditProduct from './pages/EditProduct';
import Category from './pages/Category';
import HomeContent from './components/HomeContent';
import AdminUserProfile from './pages/AdminUserProfile';
import AdminViewProduct from './pages/AdminViewProduct';
import ReadMore from './pages/ReadMore';
import EditProfile from './pages/EditProfile';
import ShoppingCart from './pages/ShoppingCart';
import Wishlist from './pages/Wishlist';
import OwnProductView from './pages/OwnProductView';
import UserProfile from './pages/UserProfile';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/viewproduct' element={<ViewProduct />} />
        <Route path='/editproduct/:id' element={<EditProduct/>}/>
        <Route path='/categoryview/:categoryname' element={<Category/>}/>
        <Route path='/homecontent' element={<HomeContent/>}/>
        <Route path='/adminuserprofile' element={<AdminUserProfile/>}/>
        <Route path='/adminviewproduct' element={<AdminViewProduct/>}/>
        <Route path='/readmore/:loginId' element={<ReadMore/>}/>
        <Route path='/shoppingcart' element={<ShoppingCart/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/editprofile/:loginId' element={<EditProfile/>}/>
        <Route path='/ownproductview' element={<OwnProductView/>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>
        

        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
