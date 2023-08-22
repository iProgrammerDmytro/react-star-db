import ItemDetails from "../item-details";
import { withSwapiService } from "../hoc-helpers";
import { Record } from "../item-details";

const PersonDetails = ({ itemId, swapiService }) => {
  const { getPerson, getPersonImage } = swapiService;
  return (
    <ItemDetails
      itemId={itemId}
      getData={getPerson}
      getImageUrl={getPersonImage}
    >
      <Record field="gender" label="Gender" />
      <Record field="eyeColor" label="Eye Color" />
    </ItemDetails>
  );
};

export default withSwapiService(PersonDetails);
