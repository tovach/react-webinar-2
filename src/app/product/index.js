import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import {ProductCard} from "components/product-card";

function Product() {

  console.log('Product');

  const store = useStore();

  const {id} = useParams();

  useEffect(() => {
    store.get('catalog').loadProduct(id);
  }, [id]);

  const select = useSelector(state => ({
    items: state.catalog.items,
    product: state.catalog.product,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  console.log(select.product);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ProductCard item={select.product} onAdd={callbacks.addToBasket}/>
    </Layout>
  );
}

export default React.memo(Product);
