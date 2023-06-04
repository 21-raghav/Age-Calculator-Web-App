const button = document.querySelector("button");
button.addEventListener("click", clickHandler);

const divs = document.querySelectorAll(".form-controls-wrapper");

const inputs = document.querySelectorAll("input");
for (let input of inputs) input.addEventListener("change", changeHandler);

function clickHandler() {
  // user entered date
  const dob_Year = +document.getElementById("year").value;
  const dob_Month = +document.getElementById("month").value - 1;
  const dob_Date = +document.getElementById("date").value;

  // current date
  const currentDate = new Date();
  const currYear = currentDate.getFullYear();
  const currMonth = currentDate.getMonth();
  const currDate = currentDate.getDate();

  // result date
  let yearDiff = currYear - dob_Year;
  let monthDiff;
  let dateDiff;

  // to access output elements
  const outputs = document.querySelectorAll("output");

  // to check if date is valid
  let isValid = true;

  // to apply empty or invalid class to elements
  for (let div of divs) {
    if (div.children[1].value === "") {
      div.classList.add("empty");
      isValid = false;
      for (let output of outputs) {
        output.innerHTML = "--";
      }
    } else if (
      div.children[1].value < div.children[1].min ||
      div.children[1].value > div.children[1].max
    ) {
      div.classList.add("invalid");
      isValid = false;
      for (let output of outputs) {
        output.innerHTML = "--";
      }
    }
  }
  if (!(dob_Date <= totalDays(dob_Year, dob_Month))) {
    divs[0].classList.add("invalid");
    isValid = false;
  }

  // Age Calculator program
  if (isValid) {
    if (currMonth >= dob_Month) {
      monthDiff = currMonth - dob_Month;
    } else {
      yearDiff--;
      monthDiff = 12 + currMonth - dob_Month;
    }

    if (currDate >= dob_Date) {
      dateDiff = currDate - dob_Date;
    } else {
      monthDiff--;
      dateDiff = totalDays(yearDiff, monthDiff) + currDate - dob_Date;

      if (monthDiff < 0) {
        monthDiff = 11;
        yearDiff--;
      }
    }
    document.getElementById("disp-years").innerHTML = yearDiff;
    document.getElementById("disp-months").innerHTML = monthDiff;
    document.getElementById("disp-days").innerHTML = dateDiff;
  }

  // return total number of days of a month
  function totalDays(year, month) {
    let date = new Date(year, month);
    if (date.getMonth() === 1) {
      if (year % 4 === 0) {
        if (year % 100 !== 0) return 29;
        else if (year % 100 === 0) if (year % 400 === 0) return 29;
      }
      return 28;
    } else if (
      date.getMonth() === 3 ||
      date.getMonth() === 5 ||
      date.getMonth() === 8 ||
      date.getMonth() === 10
    )
      return 30;
    return 31;
  }
}

function changeHandler(event) {
  for (let div of divs) {
    if (event.currentTarget.id === div.children[1].id)
      div.classList.remove("empty");
    div.classList.remove("invalid");
  }
}
