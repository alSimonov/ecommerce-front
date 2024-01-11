import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
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

const CenterButton = styled.div`
  display: flex;
  align-items: center;


`;


// export default function CategoryPage({category}) {
export default function CategoryPage() {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
	const [filters, setFilters] = useState({});

  
  const router = useRouter();
	const {id, parent} = router.query;
	useEffect(() => {
		if (!id ){
			return;
		}

		axios.get('/api/products?id='+id).then(response => {
			setProducts(response.data);
		});

		axios.get('/api/category?parent='+parent).then(response => {
			setCategory(response.data);
		});

    // getServerSideProps(id);
    loadDefaultFilters(category);


	}, [id, parent]);
 
  function loadDefaultFilters(){
    const arrFilters = {};
    category.properties?.length > 0 && category.properties.map((prop, index) => (
        prop.values?.length > 0 && prop.values.map((value, indexValue) => (
          arrFilters[prop.name][indexValue] = false
        ))
    ))
    setFilters(arrFilters);
  }


  function clearFilters(){
    setFilters([]);
  }

  function handleFiltersChange(group, el, ChValue){
    setFilters(prev => {
      const filters = [...prev];
      filters[group][el].value = ChValue;
      return filters;

    });
  }



  return (
    <>
      <Header />
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
            
          {console.log(filters)}
            {
            
            category.properties?.length > 0 && category.properties.map((prop, index) => (
                <Filter>

                  <TitleFilters >{prop.name}</TitleFilters>

                  {prop.values?.length > 0 && prop.values.map((value, indexValue) => (
                
                    <FiltersCheck>
                      <input type="checkbox" name={`filters_gr`} onChange={ev => handleFiltersChange(prop.name, indexValue, ev.target.value)} defaultChecked={false} /> {value}
                    </FiltersCheck>    
                  ))}
                
                </Filter>

              ))

            }

            <Button $block onClick={() => clearFilters()} $primary $outline>
              <CenterButton>
                <X_markIcon /> Сбросить фильтр
              </CenterButton>           
            </Button>
            
          </FiltersWrap>

          <ProductsGrid products={products}/>
        </DivideWrap>

      </Center>
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