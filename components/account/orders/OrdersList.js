import styled from 'styled-components';
import OrderItem from './OrderItem';
import filterListByDate from '../../../lib/helpers/filterListByDate';

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
  const filteredList = filterListByDate(data);
  return (
    <StyledOrdersList>
      {filteredList.map((item) => {
        return <OrderItem key={item._id} item={item} />;
      })}
    </StyledOrdersList>
  );
}
export default OrdersList;
