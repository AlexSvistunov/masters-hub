import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-3xl">
          <h1 className="tablet:text-4xl laptop:text-5xl desktop:text-7xl text-3xl font-bold">
            Masters Hub – один сервис, много возможностей.
          </h1>
          <p className="py-6">
            Онлайн-запись, напоминания клиентам и ведение клиентской базы для
            профессионалов индустрии красоты.
          </p>

          <div className="flex items-center gap-3 justify-center">
            <button className="btn btn-primary">Для мастера</button>
            <Link className="btn btn-primary" to={'/business'}>Для бизнеса</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
