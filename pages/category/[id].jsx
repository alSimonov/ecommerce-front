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


// export default function CategoryPage({category}) {
export default function CategoryPage() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState({});
	const [filters, setFilters] = useState({});
 
  
  const router = useRouter();
	const {id, parent} = router.query;
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
		axios.get('/api/products?id='+id).then(response => {
			setProducts(response.data);
			setFilteredProducts(response.data);
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
       




    // {console.log(category.properties)}
    {console.log("fffffffffffffffffffffffffffffffffffffffffffffffffffff")}
    // {console.log(arrFilters)}

    setFilters(arrFilters);
  }

  // console.log(products)
 
  console.log(filters)

  function clearFilters(){
    // setFilters([]);
    loadProducts();
    loadDefaultFilters();
  }

  function handleFiltersChange(group, el, ChValue){
    
    filters[group][el] = ChValue;
    

    // setFilters(prev => {

    //   filters.group[el] = ChValue;
    //   return filters;

    // }); 
  }


  // const test = {"fff" : {10:true , 20:false, 30:true}, "aaa" : {10:false , 20:true, }};
  
  // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
  // console.log(test);
  // console.log(test.fff[10]);

  // test.filter()

  console.log("ccccccccccccccccccccccc");

  console.log(products);

  // function test(){ 
  //   // setFilteredProducts([]);
  //   setFilteredProducts([]);
  //   setFilteredProducts([products[0], products[0]]);

  //   // setFilteredProducts([...filteredProducts, products[1]]);
  //   // filteredProducts.push(products[0]);

  // } 
  
  
  
  function filterProducts(){ 
    
    // setFilteredProducts([]);

    const checkedFilters = {};
    
  
 
    for (const [name, values] of Object.entries(filters)) {
    
      for (const [key, value] of Object.entries(values)) {
        if(value) {
          if(typeof checkedFilters[name] === 'undefined' ){
            checkedFilters[name] = [];
          }
          checkedFilters[name].push(key);  
        }
      }
    } 

    
 
 
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx");

    console.log(checkedFilters);
    console.log(filters);
 
 

    var flag = true;
    const tempProducts = [];

    for (let i = 0; i < products.length; i++) {
      flag = true;
      for (const [key, value] of Object.entries(products[i].properties)) {
        if(typeof checkedFilters[key] !== 'undefined' && !checkedFilters[key].includes(value)){
          flag = false;
        } 
      }
      if(flag){
        tempProducts.push(products[i]);
        // setFilteredProducts([...filteredProducts, products[i]]);
      }
    } 

    setFilteredProducts([...tempProducts]);

     
  }

  // const test = {"fff" : [1,2,3], "aaa" : [1,2,3,4,5]};
  
  // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
  // console.log(test);
  // console.log(test.fff[0]);


  return (
    <>
      <Layout>
        <Center>
          <SelectWrapper>
            <Title>Категории</Title>

            {/* {console.log("ffffffffffffffffff")}
            {console.log(category.properties)}
            

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

            {console.log(filters)}  
              
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