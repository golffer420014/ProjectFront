import logo from "./logo.svg";
import "./App.css";
import Carousel from "./components/carousel.component";
import Navbar from "./components/Navbar";

function App() {
  let slides = [
    {
      image:"https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
      desc:'5555',
      header:'Home'
    },
    {
      image:"https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
      desc:'5555',
      header:'Search'
    },
    {
      image:"https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
      desc:'5555',
      header:'Community'
    },
    {
      image:"https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
      desc:'5555',
      header:'Home'
    },
  ];

  return (
    <>
    <Navbar/>
      <div className="w-[100%]">
      <Carousel slides={slides} />
    </div>
    </>
  );
}

export default App;
