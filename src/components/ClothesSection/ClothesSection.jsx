import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onLike,
  currentUser,
}) {
  const currentUserContext = useContext(UserContext);
  const user = currentUserContext?.currentUser;

  return (
    <div className="clothes-section">
      <div className="clothes-section__title-section">
        <p className="clothes-section__title">Your Items</p>
        <button
          type="text"
          className="clothes-section__btn"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          .filter((item) => user && item.owner === user._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onLike={onLike}
                currentUser={currentUser}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
