let url = "https://fronttest.ekookna.pl/";

let firstName = document.getElementById("first_name").value;
let lastName = document.getElementById("last_name").value;
let city = document.getElementById("city").value;
let postalCode = document.getElementById("postal_code").value;
let street = document.getElementById("street").value;
let age = document.getElementById("age").value;

const btnSearchUser = document.getElementById("btnSearchUser");
const btnAddUser = document.getElementById("btnAddUser");
const btnGetAllUsers = document.getElementById("btnGetAllUsers");
const btnDeleteUser = document.getElementById("btnDeleteUser");
const btnUpdateUser = document.getElementById("btnUpdateUser");

let users;

const getDataUser = () => {
    let formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("city", city);
    formData.append("postal_code", postalCode);
    formData.append("street", street);
    formData.append("age", age);
    return formData;
}

const searchUser = () => {
    getAllUsers();

    let lastName = document.getElementById("last_name").value;
    let searchedUsers = new Map();


    if(users !== null) {
        users.forEach(user => {
            console.log("user.last_name: " + user.last_name);
            console.log("lastName: " + lastName);
          if(user.last_name === lastName){
              searchedUsers.set(user.id, user);
              console.log("searched: " + searchedUsers);
          }
        });
        if(searchedUsers.size)
            alert("Nie znaleziono takiego użytkownika!")
        else {
            console.log("searched w else: " + searchedUsers);
            addUserToTable(searchedUsers);
        }

    }
    else
        alert("Brak użytkowników do przeszukania!")

}

const sendUser = () => {


    // // Sprawdzamy, czy jakiekolwiek pole jest puste
    // if(firstName === "" || lastName === "" || city === "" || postalCode === "" || street === "" || age === "") {
    //     alert("Wypełnij wszystkie pola formularza!");
    //     return;
    // }

        //const data = Object.fromEntries(getDataUser());
    console.log(getDataUser());
        fetch(`${url}user`, {
            method: "POST",
            body: getDataUser(),//JSON.stringify(data)//formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log("odpowiedź: " + data.users)
                users = data.users;
                //clearFields();
              getAllUsers();
            });
   // }
   //  let request = new XMLHttpRequest();
   //  request.open("POST", url + "user", true);
   //  request.send(formData);
}

// const clearFields = () => {
//     let textFields = document.querySelectorAll('input[type="text"]');
//
//     textFields.forEach(field => {
//         field.value = '';
//     });
// };

const getAllUsers = () => {
    removeTable();
    fetch(url)
        .then(res => res.json())
        .then(data => {
            users = data.users;

            addUserToTable(users);
        });
}

const deleteUser = () => {
    console.log("deleteUser: " + userId)
    if (userId !== 0) {
        const urlDelete = url + `user/${userId}?_method=DELETE`;
        console.log("url: " + urlDelete);
        fetch(urlDelete, {method: "POST"})
            .then(res => res.json())
            .then(data => {
            users = data.users;
            getAllUsers();
        });
        //getAllUsers();

    }
    else{
        alert("Wybierz użytkowanika z tabeli, którego chcesz usunać!")
        getAllUsers();
    }

}

const updateUser = () => {
    if (userId !== 0) {
        const urlUpdate = url + `user/${userId}?_method=PUT`;
        console.log("url: " + urlUpdate);
        console.log("id: "+ userId);


       // const data = Object.fromEntries(getDataUser());

        fetch(urlUpdate, {
            method: "POST",
            body: getDataUser()//JSON.stringify(data)//formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log("odpowiedź: " + data.users)
                users = data.users;
                //clearFields();
                getAllUsers();
            });

    }
    else{
        alert("Wybierz użytkowanika z tabeli, którego chcesz aktualizować!")
        getAllUsers();
    }
}

btnSearchUser.addEventListener("click", searchUser);
btnAddUser.addEventListener("click", sendUser);
btnGetAllUsers.addEventListener("click", getAllUsers);
btnDeleteUser.addEventListener("click", deleteUser);
btnUpdateUser.addEventListener("click", updateUser);


