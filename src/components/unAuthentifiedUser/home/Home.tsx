import Smartphone from "../../elements/Smartphone";
import Banner from "../Banner";
import CallToAction from "./CallToAction";
import CardVisitInterface from "./CardVisitInterface";
import CardVisitShare from "./CardVisitShare";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <div className="px-3">
        <div className="flex justify-evenly bg-cyan-200 rounded-[50%] shadow-2xl">
          <Smartphone bgColor="bg-orange-500 shadow-2xl shadow-current">
            <CardVisitShare />
          </Smartphone>
          <Smartphone bgColor="bg-purple-500 text-black shadow-2xl shadow-current">
            <CardVisitInterface />
          </Smartphone>
        </div>
        <CallToAction />
      </div>
    </div>
  );
};

export default Home;
