import Header from "../components/Header";
import Tabs from "../components/Tabs";
import useAuth from "../hooks/useAuth";

const FavoritesPage = () => {
  const { token } = useAuth();
  return (
    <div>
      <Header />
      <div className="pt-40 container mx-auto">
        <Tabs />

        <div>
          {!token && (
            <div className="text-4xl text-center py-10">
              Авторизируйтесь, чтобы посмотреть избранное
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
