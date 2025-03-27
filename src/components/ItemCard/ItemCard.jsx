import "./ItemCard.css";

function ItemCard({ item, onCardClick, onLike, currentUser }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  const isLiked = item?.likes?.some((id) => id === currentUser?._id || false);
  console.log("Items:", item);
  const handleLikeClick = () => {
    onLike({ id: item._id, isLiked });
  };
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <button
        className={`card__like-button ${
          isLiked ? "card__like-button_liked" : ""
        }`}
        type="button"
        onClick={handleLikeClick}
      ></button>
    </li>
  );
}

export default ItemCard;
