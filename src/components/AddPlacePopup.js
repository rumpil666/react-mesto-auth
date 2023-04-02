import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "./UseForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { enteredValues, errors, handleChange, isFormValid, resetForm } =
    useForm();

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
    enteredValues.title = "";
    enteredValues.link = "";
  }, [resetForm, isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: enteredValues.title,
      link: enteredValues.link,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="card"
      title="Новое место"
      subtitle="Создать"
      loadingSubtitle="Создание..."
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isFormValid={!isFormValid}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_title"
          id="title"
          type="text"
          name="title"
          placeholder="Название"
          required
          minLength="2"
          maxLength="40"
          value={enteredValues.title || ""}
          onChange={handleChange}
        />
        {errors.title && (
          <span className="popup__input-error name-image-input-error">
            {errors.title}
          </span>
        )}
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_link"
          id="link"
          type="url"
          name="link"
          placeholder="Ссылка на изображение"
          required
          value={enteredValues.link || ""}
          onChange={handleChange}
        />
        {errors.link && (
          <span className="popup__input-error url-image-input-error">
            {errors.link}
          </span>
        )}
      </label>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
