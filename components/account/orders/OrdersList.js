import styled from 'styled-components';
import OrderItem from './OrderItem';
const StyledOrdersList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 36rem;
  margin-inline: auto;
`;

function OrdersList({ data }) {
  return (
    <StyledOrdersList>
      {data.map((item) => {
        return <OrderItem key={item._id} item={item} />;
      })}
    </StyledOrdersList>
  );
}
export default OrdersList;
