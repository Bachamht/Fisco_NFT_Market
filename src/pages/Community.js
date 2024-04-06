import react from "react";
import CardList from "../components/CardList_c";  //
import { traditonculList } from "../constants/traditioncul";  //
import '../styles/Community.css';
import Header from "../components/Header";
import Search from "../components/Search";

const Community = () => {
  return (
    <div id="community">
      <Header />
      <Search/>
      <div id="list-container">
        <CardList list={traditonculList} />
      </div>
    </div>
  );
};

export default Community;
