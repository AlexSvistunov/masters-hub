const FormInput = ({ register, name, errors, placeholder }) => {
  return (
    <>
      <input
        className="input input-bordered"
        placeholder={placeholder}
        name={name}
        {...register(name, {
          required: "Поле обязательно к заполнению!",
        })}
      ></input>

      <span className="text-red-500">{errors.name && errors.name.message}</span>
    </>
  );
};

export default FormInput;
