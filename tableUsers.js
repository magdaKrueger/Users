let cell;
let userId = 0;
let table = document.getElementById("myTable");

const addUserToTable = (users) => {
    removeTable();

    let tableBody = document.createElement("tbody");
    tableBody.id = "tableBody";
    table.appendChild(tableBody);

    users.forEach(user => {
        let row = tableBody.insertRow();

        cell = row.insertCell();
        cell.innerText = user.id;
        cell = row.insertCell();
        cell.innerText = user.first_name;
        cell = row.insertCell();
        cell.innerText = user.last_name;
        cell = row.insertCell();
        cell.innerText = user.city;
        cell = row.insertCell();
        cell.innerText = user.postal_code;
        cell = row.insertCell();
        cell.innerText = user.street;
        cell = row.insertCell();
        cell.innerText = user.age;

        row.addEventListener('click', () =>  {
            userId = user.id;

            let rows = document.querySelectorAll('#tableBody tr');
            rows.forEach( row => {
                row.classList.remove("mark");
            });
            row.classList.add("mark");
        });
    });
}

const removeTable = () => {
    let tableUsersBody = document.getElementById("tableBody");

   if(tableUsersBody !== null)
       tableUsersBody.remove();
}