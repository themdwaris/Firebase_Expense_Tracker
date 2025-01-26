import React from "react";
import CountTimerDown from "./projects/CountTimerDown";
import RenderRandomQuote from "./projects/RenderRandomQuote";
import ImageUploader from "./projects/ImageUploader";
import RegisterLoginLogout from "./projects/RegisterLoginLogout";
import Weather from "./projects/Weather";
import SearchFilter from "./projects/SearchFilter";
import Pagination from "./projects/Pagination";
import ColorPicker from "./projects/ColorPicker";
import DarkLightMode from "./projects/DarkLightMode";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import AddToCart from "./projects/AddToCart";
import CounterReducer from "./projects/CounterReducer";
import ToDo from "./projects/ToDo";
import { TodoProvider } from "./context/ToDoContext";
import ReducerPagination from "./projects/ReducerPagination";
import DraggableComp from "./projects/DraggableComp";
import ChangeLanguage from "./projects/ChangeLanguage";
import { LanguageProvider } from "./context/LanguageContext";
import ImageGallery from "./projects/ImageGallery";
import Weather2 from "./projects/Weather2";
import BackgroundOverlay from "./projects/BackgroundOverlay";
import { Parent } from "./projects/Props/Parent";
import UseTransition from "./projects/UseTransition";
import HOC from "./projects/HOC/HOC";
import UseForm from "./projects/UseForm";
import Axios from "./projects/Axios";
import BMI from "./projects/BMI";
import PasswordGenerator from "./projects/PasswordGenerator";
import PasswordGenerator2 from "./projects/PasswordGenerator2";
import Calculator from "./projects/Calculator";
import FirebaseCrud from "./projects/FirebaseCrud";
import TableWithRowScroll from "./projects/Table";
import MadeWithAi from "./projects/MadeWithAi";

import UserAuth from "./components/UserAuth";

const App = () => {
  // const data = [
  //   "mango",
  //   "apple",
  //   "banana",
  //   "grapes",
  //   "pinapple",
  //   "watermelon",
  //   "dates",
  // ];
  return (
    <div className="w-full min-h-lvh bg-gray-900 px-5">
      <div className="max-w-5xl mx-auto py-4 text-white">
        {/* <CountTimerDown/> */}
        {/* <RenderRandomQuote/> */}
        {/* <ImageUploader/> */}
        {/* <RegisterLoginLogout/> */}
        {/* <Weather/> */}
        {/* <SearchFilter data={data}/> */}
        {/* <Pagination data={data} perPage={2}/> */}
        {/* <ColorPicker/> */}
        {/* <ThemeProvider>
        <DarkLightMode/>
        </ThemeProvider> */}
        {/* <CartProvider>
          <AddToCart/>
        </CartProvider> */}
        {/* <CounterReducer/> */}
        {/* <TodoProvider>
          <ToDo />
        </TodoProvider> */}
        {/* <ReducerPagination/> */}
        {/* <DraggableComp/> */}
        {/* <LanguageProvider>
        <ChangeLanguage/>
        </LanguageProvider> */}
        {/* <ImageGallery/> */}
        {/* <Weather2/> */}
        {/* <BackgroundOverlay/> */}
        {/* <Parent/> */}
        {/* <UseTransition/> */}
        {/* <HOC/> */}
        {/* <UseForm/> */}
        {/* <Axios/> */}
        {/* <BMI/> */}
        {/* <PasswordGenerator2/> */}
        {/* <Calculator/> */}
        {/* <FirebaseCrud/> */}
        {/* <MadeWithAi/> */}
        <UserAuth />
        {/* <Register/> */}
        {/* <Login/> */}
        {/* <Outlet/> */}
      </div>
    </div>
  );
};

export default App;
