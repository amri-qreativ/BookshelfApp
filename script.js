const form = document.getElementById("inputBook");
const val = document.querySelectorAll(".input");
const checkbox = document.querySelector(".input_inline input");
const incompleteBookshelfList = document.getElementById(
  "incompleteBookshelfList"
);
const completeBookshelfList = document.getElementById("completeBookshelfList");
const btn = document.getElementById("searchBook");
const search = document.getElementById("searchBookTitle");
const spanText = document.querySelector("#bookSubmit span");

let bookData = [];
const DATA_USER = "BOOK_DATA";
getData();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formData();
});

checkbox.addEventListener("click", () => {
  const checked = checkbox.checked;
  if (checked == true) {
    spanText.innerText = "Selesai dibaca";
  } else {
    spanText.innerText = "Belum selesai dibaca";
  }
});

document.addEventListener("click", (ev) => {
  if (ev.target.classList == "blue") {
    bookData.forEach((book) => {
      if (book.id == ev.target.id) {
        book.isComplete = true;
        saveToLocalStorage();
      }
    });
  } else if (ev.target.classList == "white") {
    bookData.forEach((book, i) => {
      if (book.id == ev.target.id) {
        const bool = confirm(
          `apakah anda yakin ingin menghapus "${book.title}" ?`
        );
        if (bool == true) bookData.splice([i], 1);
        saveToLocalStorage();
      }
    });
  } else if (ev.target.classList == "blue belumselesai") {
    bookData.forEach((book) => {
      if (book.id == ev.target.id) {
        book.isComplete = false;
        saveToLocalStorage();
      }
    });
  }
});

function formData() {
  const checked = checkbox.checked;
  let data = [];
  val.forEach((e) => {
    const val = e.childNodes[3].value;
    data.push(val);
  });
  data.push(checked);

  const yearAsNumber = parseInt(data[2], 10);

  const dataUser = {
    id: +new Date(),
    title: data[0],
    author: data[1],
    year: yearAsNumber,
    isComplete: data[3],
  };

  bookData.push(dataUser);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem(DATA_USER, JSON.stringify(bookData));
  getData();
}

function getData() {
  const data = localStorage.getItem(DATA_USER);
  const newData = JSON.parse(data);
  seleksiData(newData);
}

function seleksiData(newData) {
  const dataBelumDIbaca = [];
  const dataSudahDIbaca = [];
  if (newData != null) {
    bookData = newData;
    newData.forEach((e) => {
      if (e.isComplete == false) {
        dataBelumDIbaca.push(e);
      } else {
        dataSudahDIbaca.push(e);
      }
    });
    showDataBelumSelesaiDIbaca(dataBelumDIbaca);
    showDataSelesaiDIbaca(dataSudahDIbaca);
    searchData(newData);
  }
}

function searchData(data) {
  let dataBelumDIbaca = [];
  let dataSudahDibaca = [];
  btn.addEventListener("submit", (val) => {
    val.preventDefault();
    if (search.value != "") {
      data.forEach((e) => {
        if (e.title.includes(search.value)) {
          if (e.isComplete == false) {
            dataBelumDIbaca.push(e);
          } else {
            dataSudahDibaca.push(e);
          }
        }
      });
      showDataBelumSelesaiDIbaca(dataBelumDIbaca);
      showDataSelesaiDIbaca(dataSudahDibaca);
      dataBelumDIbaca = [];
      dataSudahDibaca = [];
    } else {
      seleksiData(data);
    }
  });
}

function showDataBelumSelesaiDIbaca(val) {
  card = "";
  val.forEach((e) => (card += bookShelfBelumDibaca(e)));
  incompleteBookshelfList.innerHTML = card;
}

function showDataSelesaiDIbaca(val) {
  card = "";
  val.forEach((e) => (card += bookShelfSUdahDibaca(e)));
  completeBookshelfList.innerHTML = card;
}

function bookShelfSUdahDibaca(data) {
  return `<article class="book_item">
                <h3>${data.title}</h3>
                <p>Penulis : ${data.author}</p>
                <p>Tahun : ${data.year}</p>
                <div class="action" >
                <button id="${data.id}" class="blue belumselesai"></button>
                <button id="${data.id}" class="white"></button>
                </div>
            </article>`;
}

function bookShelfBelumDibaca(data) {
  return `<article class="book_item">
                <h3>${data.title}</h3>
                <p>Penulis : ${data.author}</p>
                <p>Tahun : ${data.year}</p>
                <div class="action" >
                    <button id="${data.id}" class="blue"></button>
                    <button id="${data.id}" class="white"></button>
                </div>
            </article>`;
}
