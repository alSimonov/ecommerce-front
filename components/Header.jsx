import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import axios from "axios";
import Trash from "./icons/Trash";
import Button from "./Button";
import User from "./icons/user";
import IconLogout from "./icons/IconLogout";
import { useSession, signIn, signOut } from "next-auth/react";
import { AccountContext } from "./AccountContext";
import CartIcon from "./icons/CartIcon";


const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.$mobileNavAcive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 70px 20px 20px;

  background-color: #222;

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  height: 30px;



  &:hover {
    color: #fff;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
  }
  
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const DropDown = styled.div`
  position: relative;
  display: inline-block;
  color: #aaa;
  cursor: pointer;

  

  &:hover {
    display: block;
    > span {
      color: #fff;
    }
    >div {
      display: block;
    }
  }
`;
const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #333333;
  min-width: 120px;
  border-radius: 4px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;


`;

const Avatar = styled.div`
  display: table-cell;
  border-radius: 100%;
  width: 40px;
  height: 40px;

  line-height: 40px;

  text-align: center;
  vertical-align: middle;
  background-color: #eee;

  font-size: 1em;
  color: #ccc;

`;
const IconStyled = styled.div`
  
  width: 30px;
  height: 30px;

`;





export default function Header() {
  const {accountObj,  accountSession , accountFI} = useContext(AccountContext);
  const {cartProducts, clearCart} = useContext(CartContext);
  const [mobileNavAcive, setMobileNavAcive] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  },[])
 
  function fetchCategories() {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
  }

  
  async function logout(){
    // await router.push('/');
    await signOut();
  }



  return(
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Ecommerce</Logo>
          <StyledNav $mobileNavAcive={mobileNavAcive}>
            <NavLink href={'/'}>Главная</NavLink>
            <NavLink href={'/products'}>Товары</NavLink>
            <DropDown>
              <span>Категории</span>
              <DropDownContent>
                {categories?.length > 0 && categories.map(category => ( 
                  !category.parent &&
                  <NavLink key={category._id} href={'/categories/'+category._id} >{category.name}</NavLink>
                ))}

              </DropDownContent>
            </DropDown>
            <NavLink href={'/cart'} >  
            <IconStyled>
              <CartIcon />  
            </IconStyled>


              Корзина ({cartProducts.length})
            </NavLink>
            <Button onClick={clearCart} $white size="icon"><Trash /></Button>
            
            <NavLink href={'/account'}>  
                <Avatar>
                  {accountFI}
                </Avatar> 


              Аккаунт           
            </NavLink>
            <Button onClick={logout} ><IconLogout/></Button>

          </StyledNav>
          <NavButton onClick={() => setMobileNavAcive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
