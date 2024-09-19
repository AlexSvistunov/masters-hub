import CreateProfileForm from '../../components/CreateProfileForm'

const CreateProfile = () => {

  return (
    <div className="m-5">
      <h1 className="text-3xl mb-4">Создание профиля</h1>
      <CreateProfileForm/>
      

      {/* <MyDropzone/> */}
    </div>
  );
};

// input + span seperate component
// search select values
// delete select values
// content inside select

export default CreateProfile;
