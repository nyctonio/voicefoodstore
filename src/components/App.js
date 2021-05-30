import React,{ useState , useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';

const App= ()=>{
    const [cart, setCart]=useState([]);
    const [menuItems, setmenuItems]=useState([]);
    useEffect(() => {
        alanBtn({ 
            key: '93ab9d3ee69ad3bd3c903f4fe42e46d42e956eca572e1d8b807a3e2338fdd0dc/testing',
            onCommand: (commandData) => {
                if(commandData.command==="getMenu"){
                    setmenuItems(commandData.data);
                }else if (commandData.command === "addToCart") {
                    setCart((currentCart) => [...currentCart, commandData.data]);
                }
            },
          });
    }, [])
    const spaces="    ";
    const addToCart =(menuItem)=>{
        setCart((oldCart)=>{
            return [...oldCart,menuItem]
        })
    }
    const setstyle={
        borderRadius:"5px",
    };

    return(
    <div>
        {/* <CountButton incrementBy={1} buttonColor={"red"}/>
        <CountButton incrementBy={5} buttonColor={"pink"}/>
        <SearchBar/> 
        <Rotate/> */}
        <h1>Shopping Items</h1>
        {menuItems.map((menuItem)=>(
            <li key={menuItem.name}>
                {menuItem.name}-{menuItem.price}-{menuItem.category} {spaces}
                <button style={setstyle} onClick={()=>addToCart(menuItem)}>add to Cart</button>
            </li>

        ))}
        <h2>Cart</h2>
        {cart.map((cartItem)=>(
            <li key={cartItem.name}>
                {cartItem.name}-{cartItem.price}-{cartItem.category}
            </li>

        ))}
    </div>
)}
export default App