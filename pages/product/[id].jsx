import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CommentBox from "@/components/product/CommentBox";
import CommentsGrid from "@/components/product/CommentsGrid";
import TextArea from "@/components/basic/TextArea";
// import Rating from '@/components/Rating';
import { Rating } from "@mui/material";
import axios from "axios";
import { AccountContext } from "@/components/AccountContext";
import Layout from "@/components/Layout";


const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr ;

  
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr ;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

const RightColumn = styled.div`
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
`;


const WrapperWhiteBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 50px;

  padding: 10px;

  background-color: #fff;
  border-radius: 10px;
  width: 500px;



  text-align: center;
  justify-content: center;

  box-shadow: 0px 0px 5px #bbb;
  
`;

const ButtonSend = styled(Button)`
  width: 20%;
  margin-left: auto;
`;


export default function ProductPage({product, category}) {
  const {addProduct} = useContext(CartContext);
  const {accountObj} = useContext(AccountContext);


  const [productImg, setProductImg] = useState( product.images.length > 0 ?  product.images : category.images);
  const [productDescription, setProductDescription] = useState( product.description.length > 0 ?  product.description : category.description);
  const [commentText, setCommentText] = useState('');
  const [rate, setRatingValue] = useState();
  
  const [comments, setComments] = useState('');

  useEffect(() => {
    fetchComments();
  }, [])

  async function saveComment(){

    const productId = product._id;
    const clientAccountId = accountObj._id;
    var ratingValue = 0;
    if(rate){
      ratingValue = rate * 10;
    }
    

    const data = {
      commentText, ratingValue, clientAccountId, productId,
    };

    await axios.post('/api/comments', data);

    // if(editedAddress){
    //   data._id = editedAddress._id;
    //   await axios.put('/api/comments', data);
    //   setEditedAddress(null);
    // } else {
    //   await axios.post('/api/addressDestination', data);
    // }


    setCommentText('');
    setRatingValue(0);

    fetchComments();
  }

  function fetchComments(){
    axios.get('/api/comments?productId='+product._id).then(response => {
      setComments(response.data);
		});
  }

 
  return (
    <>
      <Layout>
        <Center>
          <ColWrapper>
            <WhiteBox>
              <ProductImages images={productImg}/>
            </WhiteBox>
            <RightColumn>
              <Title>{product.title}</Title>
              <p>{productDescription}</p>
              <PriceRow>
                <div>
                  <Price>₽{product.price}</Price>
                </div>
                <div>
                  <Button $primary onClick={() => addProduct(product._id)}>
                    <CartIcon/>Добавить в корзину
                  </Button>    
                </div>
              </PriceRow>

              <div>
                <p>Характеристики:</p>
                {typeof product.properties !== 'undefined' && Object.entries(product.properties).map(([key, value]) => (
                  <p key={key}>{key}: {value}</p>
                ))}
              </div>

            </RightColumn>
          </ColWrapper>

      
          <WrapperWhiteBox>
            <TextArea 
              placeholder="Введите комментарий"  
              value={commentText}
              onChange={ev => setCommentText(ev.target.value)}
            />
              
            <Rating name="half-rating-read" value={rate}   onChange={(event, newValue) => { setRatingValue(newValue) }} precision={0.5}  />

                
            <ButtonSend onClick={saveComment}>
              Отправить
            </ButtonSend>

          </WrapperWhiteBox>
          
          <CommentsGrid comments={comments}  />

        </Center>
      </Layout>

    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  const category = await Category.findById(product.category);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      category: JSON.parse(JSON.stringify(category)),
    },
  }
}