import React from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeFromCart,
  updateAmountRequest,
} from '../../store/modules/cart/actions';
import {formatPrice} from '../../util/format';

import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';

import {
  Container,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductControls,
  ProductControlButton,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,
} from './styles';

export default function Cart({navigation}) {
  const dispatch = useDispatch();

  const {products, total} = useSelector(state => ({
    products: state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
      priceFormatted: formatPrice(product.price),
    })),
    total: formatPrice(
      state.cart.reduce((tot, prod) => tot + prod.price * prod.amount, 0),
    ),
  }));

  function decrement(product) {
    dispatch(updateAmountRequest(product.id, product.amount - 1));
  }

  function increment(product) {
    dispatch(updateAmountRequest(product.id, product.amount + 1));
  }

  function remove(id) {
    dispatch(removeFromCart(id));
  }

  return (
    <ScrollView>
      <Container>
        {products.length ? (
          <React.Fragment>
            <Products>
              {products.map(p => (
                <Product key={p.id}>
                  <ProductInfo>
                    <ProductImage source={{uri: p.image}} />
                    <ProductDetails>
                      <ProductTitle>{p.title}</ProductTitle>
                      <ProductPrice>{p.priceFormatted}</ProductPrice>
                    </ProductDetails>
                    <ProductDelete onPress={() => remove(p.id)}>
                      <Icon
                        name="delete-forever"
                        size={24}
                        color={colors.primary}
                      />
                    </ProductDelete>
                  </ProductInfo>

                  <ProductControls>
                    <ProductControlButton onPress={() => decrement(p)}>
                      <Icon
                        name="remove-circle-outline"
                        size={20}
                        color={colors.primary}
                      />
                    </ProductControlButton>
                    <ProductAmount value={String(p.amount)} />
                    <ProductControlButton onPress={() => increment(p)}>
                      <Icon
                        name="add-circle-outline"
                        size={20}
                        color={colors.primary}
                      />
                    </ProductControlButton>
                    <ProductSubtotal>{p.subtotal}</ProductSubtotal>
                  </ProductControls>
                </Product>
              ))}
            </Products>
            <TotalContainer>
              <TotalText>total</TotalText>
              <TotalAmount>{total}</TotalAmount>
              <Order>
                <OrderText>finalizar pedido</OrderText>
              </Order>
            </TotalContainer>
          </React.Fragment>
        ) : (
          <EmptyContainer>
            <Icon name="remove-shopping-cart" size={64} color="#eee" />
            <EmptyText>Seu carrinho está vazio.</EmptyText>
          </EmptyContainer>
        )}
      </Container>
    </ScrollView>
  );
}
