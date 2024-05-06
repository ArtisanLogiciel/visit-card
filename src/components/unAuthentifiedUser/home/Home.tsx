import { Link } from "react-router-dom";

import Smartphone from "../../elements/Smartphone";
import Banner from "../Banner";
import CardVisitPresentation from "./CardVisitPresentation";
import CardVisitShare from "./CardVisitShare";
import CallToAction from "./CallToAction";

const Home = () => {
  return (
    <div className="">
      <Banner />

      <div className="px-3">
        <div className="flex justify-evenly bg-cyan-500 rounded-[50%] ">
          <Smartphone bgColor="bg-orange-500">
            <CardVisitShare/>
          </Smartphone>
          <Smartphone bgColor="bg-purple-500 text-black">
            <CardVisitPresentation />
          </Smartphone>
        </div>
        <CallToAction/>
      </div>
    </div>
  );
};

export default Home;
