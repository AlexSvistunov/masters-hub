import Header from "../components/Header";
import Hero from "../components/sections/Hero";
import MiniCatalog from "../components/sections/MiniCatalog";
import MiniCategories from "../components/sections/MiniCategories";
import Popular from "../components/sections/Popular";
import Tabs from "../components/ui/Tabs";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Tabs />
      <MiniCategories />
      <Popular />
      <MiniCatalog />
    </>
  );
};

export default LandingPage;
