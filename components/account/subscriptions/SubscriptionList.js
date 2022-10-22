import SubscriptionItem from './SubscriptionItem';
import styled from 'styled-components';
import filterListByDate from '../../../lib/helpers/filterListByDate';
const StyledSubscriptionList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 36rem;
  margin-inline: auto;
`;

function SubscriptionList({ data, refetchSubscriptions }) {
  const filteredList = filterListByDate(data);
  return (
    <StyledSubscriptionList>
      {filteredList.map((item) => {
        return <SubscriptionItem refetchSubscriptions={refetchSubscriptions} key={item._id} item={item} />;
      })}
    </StyledSubscriptionList>
  );
}
export default SubscriptionList;
