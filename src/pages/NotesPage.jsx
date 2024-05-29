import Header from "../components/Header";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import useAuth from "../hooks/useAuth";

const NotesPage = () => {
  const { token } = useAuth();
  return (
    <div>
      <Header />
      <Hero/>
      <div className="container mx-auto">
        <Tabs />
        
        <div className="py-10">
          {!token && (
            <div className="text-center text-4xl">Авторизируйтесь чтобы посмотреть ваши записи</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
