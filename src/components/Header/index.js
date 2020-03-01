import React from 'react';
import {connect} from 'react-redux';
import {Wrapper, Container, Logo, BasketContainer, ItemCount} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Header({navigation, cartSize}) {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <BasketContainer onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#fff" size={25} />
          <ItemCount>{cartSize || 0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
}

export default connect(
  state => ({
    cartSize: state.cart.length,
  }),
  null,
)(Header);
