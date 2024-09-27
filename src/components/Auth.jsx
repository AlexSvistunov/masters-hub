
import LoginAuth from './LoginAuth'
import RegisterAuth from './RegisterAuth'

const Auth = ({ keyword }) => {
  
  return (
    <>
      <dialog id="my_modal_3" className="modal" open>
        <div className="modal-box">
          <div className="flex flex-col gap-5 p-7">
           {keyword === 'Войти' && <LoginAuth/>}
           {keyword === 'Зарегистрироваться' && <RegisterAuth/>}
            
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Auth;
