import Header from "../components/Header";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import useAuth from "../hooks/useAuth";
import CatalogCard from "../components/CatalogCard";

const FavoritesPage = () => {
  const { token } = useAuth();
  return (
    <div>
      <Header />
      <Hero />
      <div className="container mx-auto">
        <Tabs />

        <div>
          {!token && (
            <div className="text-4xl text-center py-10">
              Авторизируйтесь, чтобы посмотреть избранное
            </div>
          )}

          <div className="p-5">
            <CatalogCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
