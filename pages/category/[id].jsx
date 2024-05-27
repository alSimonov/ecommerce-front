import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import ProductsGrid from "@/components/ProductsGrid";
import Select from "@/components/Select";
import Title from "@/components/Title";
import X_markIcon from "@/components/icons/X_markIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { Pagination } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  align-items: center;
  
`;

const DivideWrap = styled.div`
  display: flex;
`;


const FiltersWrap = styled.div`
  background-color: #fff;
  padding: 20px;
  display: block;
  align-items: center;
  justify-content: center; 
  border-radius: 10px;
  width: 240px;
  margin-right: 20px;
`;

const Filter = styled.div`
  margin-bottom: 20px;

`;

const TitleFilters = styled.div`
  font-size: 1.em;
  font-weight: 600;
`;

const FiltersCheck = styled.div`
  font-size: .9em;
  font-weight: 300;
`;

const WrapButton = styled.div`
  display: block;

  margin-bottom: 10px;
  gap: 20px;
`;
const CenterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PaginationWrapper = styled.div`
  
  display: flex;
  margin-top: 30px;  
  justify-content: center;
  
`;


// export default function CategoryPage({category}) {
export default function CategoryPage() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState({});
	const [filters, setFilters] = useState({});
	const [checkedFilters, setCheckedFilters] = useState({});
 
  const [page, setPage] = useState(1);
  const [countProduct, setCountProduct] = useState(100);
  
  const handleChangePage = (event, value) => {
    setPage(value);
  };


  const router = useRouter();
	const {id, parent} = router.query;

  useEffect(() => {
    if(id)
      loadProducts();
  },[page])

 

	useEffect(() => {
		if (!id ){
			return;
		} 

    loadProducts();



		axios.get('/api/category?parent='+parent).then(response => {
			setCategory( response.data );
      loadDefaultFilters(response.data);

      
		});
 
    // getServerSideProps(id);
    
    // loadDefaultFilters(category);    

	}, [id, parent]);
 
  
  function loadProducts(){
		axios.get('/api/products?id='+id+'&page='+page+'&filters='+JSON.stringify(checkedFilters)).then(response => {
			setProducts(response.data);
			setFilteredProducts(response.data);
		}); 

    axios.get('/api/products?count='+1+'&id='+id+'&filters='+JSON.stringify(checkedFilters)).then(response => {
      setCountProduct(response.data );
		});

  }

  function loadDefaultFilters(category){
    const arrFilters = {};
    category.properties?.length > 0 && category.properties.map((prop, index) => (
      arrFilters[prop.name] = {}
    ))
      
    category.properties?.length > 0 && category.properties.map((prop, index) => (
        
        prop.values?.length > 0 && prop.values.map((value, indexValue) => (
          arrFilters[prop.name][value] = false         
          // arrFilters[prop.name].push({key: value, value: false})        
        ))
      )) 
      

    setFilters(arrFilters);
  }

 

  function clearFilters(){
    setCheckedFilters({});

  }

  function handleFiltersChange(group, el, ChValue){
    filters[group][el] = ChValue;
  }


  useEffect(() =>{
    if(id)
      loadProducts();

  },[checkedFilters])
 
  
  
  function filterProducts(){ 
    
    // setFilteredProducts([]);

    const checkedFiltersLocal = {};
    
  
 
    for (const [name, values] of Object.entries(filters)) {
    
      for (const [key, value] of Object.entries(values)) {
        if(value) {
          if(typeof checkedFiltersLocal[name] === 'undefined' ){
            checkedFiltersLocal[name] = [];
          }
          checkedFiltersLocal[name].push(key);  
        }
      }
    } 

    setPage(1);
 
    setCheckedFilters(checkedFiltersLocal);
 
    

    // var flag = true;
    // const tempProducts = [];

    // for (let i = 0; i < products.length; i++) {
    //   flag = true;
    //   for (const [key, value] of Object.entries(products[i].properties)) {
    //     if(typeof checkedFilters[key] !== 'undefined' && !checkedFilters[key].includes(value)){
    //       flag = false;
    //     } 
    //   }
    //   if(flag){
    //     tempProducts.push(products[i]);
    //     // setFilteredProducts([...filteredProducts, products[i]]);
    //   }
    // } 

    // setFilteredProducts([...tempProducts]);

     
  }

  


  return (
    <>
      <Layout>
        <Center>
          <SelectWrapper>
            <Title>Категории</Title>

            {/* 

            {
            
            category.properties?.length > 0 && category.properties.map((prop, index) => (
                <Select key={index}>

                  <option key="">{prop.name}</option>
                  {prop.values?.length > 0 && prop.values.map((value, indexValue) => (
                    <option key={indexValue}>{value}</option>
                  ))}
                
                </Select>

              ))

            } */}


          </SelectWrapper>

          <DivideWrap>
            <FiltersWrap>
              
              <WrapButton>
                <Button $block onClick={() => filterProducts()} $primary >
                    <CenterButton>
                     Применить
                    </CenterButton>           
                </Button>
              </WrapButton>
              
              <WrapButton>
                <Button $block onClick={() => clearFilters()} $primary $outline>
                    <CenterButton>
                      <X_markIcon /> Сбросить фильтр
                    </CenterButton>           
                </Button>
              </WrapButton>

         
              
              {
                typeof filters !== 'undefined' && Object.entries(filters).map(([name, values]) => (
  

                  <Filter key={name}>  

                        <TitleFilters >{name}</TitleFilters>
      
                        {typeof values !== 'undefined' > 0 && Object.entries(values).map(([key, value]) => (
                      
                          <FiltersCheck key={key}>
                            <input type="checkbox" name={`filters_gr`} onChange={ev => handleFiltersChange(name, key, ev.target.checked)}   /> {key}
                          </FiltersCheck>    
                        ))} 
                      
                  </Filter> 
              ))
              
              // filters?.length > 0 && filters.map((key, value, index) => (


              //     <Filter key={index}>

              //       <TitleFilters >{key}</TitleFilters>

              //       {prop.values?.length > 0 && prop.values.map((value, indexValue) => (
                  
              //         <FiltersCheck key={indexValue}>
              //           <input type="checkbox" name={`filters_gr`} onChange={ev => handleFiltersChange(prop.name, indexValue, ev.target.value)} defaultChecked={false} /> {value}
              //         </FiltersCheck>    
              //       ))}
                  
              //     </Filter>

              //   ))

              }
              {/* {
              
              category.properties?.length > 0 && category.properties.map((prop, index) => (
                  <Filter key={index}>

                    <TitleFilters >{prop.name}</TitleFilters>

                    {prop.values?.length > 0 && prop.values.map((value, indexValue) => (
                  
                      <FiltersCheck key={indexValue}>
                        <input type="checkbox" name={`filters_gr`} onChange={ev => handleFiltersChange(prop.name, indexValue, ev.target.value)} defaultChecked={false} /> {value}
                      </FiltersCheck>    
                    ))}
                  
                  </Filter>

                ))

              } */}


              
            </FiltersWrap>

            <ProductsGrid $countcolumns="3" products={filteredProducts}/>
          </DivideWrap>

          <PaginationWrapper>
            <Pagination count={countProduct} page={page} onChange={handleChangePage} />
          </PaginationWrapper>

        </Center>
      </Layout>
    </>
  );
}
 
// export async function getServerSideProps(id){
//   await mongooseConnect(); 

//   // const categories = await Category.find({}, null, {sort: {'_id': -1}});
//   const category = await Category.find({_id: id},  null, {sort: {'_id': -1}} );


//   return {
//     props:{
//       // products: JSON.parse(JSON.stringify(products)),
//       category: JSON.parse(JSON.stringify(category)),
//     }
//   };
// }