import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegistrationModal/RegistrationModal";
import SigninModal from "../SigninModal/SigninModal";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteCard } from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const handleRegistration = ({ email, password, name, avatar }) => {
    signup({ email, password, name, avatar })
      .then((res) => {
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleSignupClick = () => {
    setActiveModal("register");
  };

  const handleSigninClick = () => {
    setActiveModal("signin");
  };

  const handleSignin = ({ email, password }) => {
    console.log("Attempting signin with:", { email, password });
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setCurrentUser(res.user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    navigate("/");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    console.log("card", card);
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return addItem({ name, imageUrl, weather })
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = () => {
    const id = selectedCard._id;
    deleteCard(selectedCard._id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            onSignupClick={handleSignupClick}
            onSigninClick={handleSigninClick}
            onSignOut={handleLogOut}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          handleCloseClick={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={closeActiveModal}
          onDeleteClick={handleDeleteItem}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onSubmit={handleRegistration}
        />
        <SigninModal
          isOpen={activeModal === "signin"}
          onClose={closeActiveModal}
          onSubmit={handleSignin}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
