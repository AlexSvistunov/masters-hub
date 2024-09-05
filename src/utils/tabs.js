export const tabsArray = [
  {
    url: "/",
    text: 'Подборка'
  },

  {
    url: "/catalog",
    text: 'Каталог'
  },

  {
    url: "/favorites",
    text: 'Избранное'
  },

  {
    url: "/recording",
    text: 'Мои записи'
  },
];

const currentDate = new Date()
let year = currentDate.getFullYear();
let month = String(currentDate.getMonth() + 1).padStart(2, "0");
let day = String(currentDate.getDate()).padStart(2, "0");

let formattedDate = `${year}-${month}-${day}`;

console.log(formattedDate)