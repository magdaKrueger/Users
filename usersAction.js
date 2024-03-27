let url = "https://fronttest.ekookna.pl/";

const btnSearchUser = document.getElementById("btnSearchUser");
const btnAddUser = document.getElementById("btnAddUser");
const btnGetAllUsers = document.getElementById("btnGetAllUsers");
const btnDeleteUser = document.getElementById("btnDeleteUser");
const btnUpdateUser = document.getElementById("btnUpdateUser");
const btnFilterAge = document.getElementById("btnFilterAge");
const btnRemoveFilterAge = document.getElementById("btnRemoveFilterAge");
const form = document.getElementById("addUserForm");
form.addEventListener('submit', (e) => e.preventDefault());

const sendUser = () => {
    if(!isEmptyFields()) {
        const formDataUser = new FormData(form);

        fetch(`${url}user`, {
            method: "POST",
            body: formDataUser,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                clearFields();
                getAllUsers();
            })
            .catch(err => console.log(err));
    }
    else
        alert("Uzupełnij wszystkie dane!");
}

const isEmptyFields = () => {
    let emptyField = false;
    let textFields = document.querySelectorAll('input[type="text"]');

    textFields.forEach(field => {
        if(field.value === ''){
            emptyField = true;
            return emptyField;
        }
    });
    return emptyField;
}
const clearFields = () => {
    let textFields = document.querySelectorAll('input[type="text"]');
    textFields.forEach(field => field.value = '');
};

const getAllUsers = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let dataUsers = data.users;
            addUserToTable(dataUsers);
        })
        .catch(err => console.log(err));
}

const deleteUser = () => {
    if (userId !== 0) {
        const urlDelete = url + `user/${userId}?_method=DELETE`;
        fetch(urlDelete, {
            method: "POST"
        })
            .then(res => res.json());
    }
    else
        alert("Wybierz użytkowanika z tabeli, którego chcesz usunać!")

    getAllUsers();
    userId = 0;
}

const updateUser = () => {
    const urlUpdate = url + `user/${userId}?_method=PUT`;
    const formDataUser = new FormData(form);

    if (userId !== 0) {
        if(!isEmptyFields()) {
            fetch(urlUpdate, {
                method: "POST",
                body: formDataUser,
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    clearFields();
                    getAllUsers();
                })
                .catch(err => console.log(err));
        }
        else
            alert("Uzupełnij wszystkie dane!");
    }
    else
        alert("Wybierz użytkowanika z tabeli, którego chcesz aktualizować!")

    getAllUsers();
    userId = 0;
}

const searchUser = () => {
    let lastName = document.getElementById("last_name").value;
    let dataUsers = null;
    let searchedUsers;

    if(lastName !== "") {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                dataUsers = data.users;

                if(dataUsers !== null) {
                    searchedUsers = dataUsers.filter(user =>
                        user.last_name.toUpperCase() === lastName.toUpperCase());

                    if (searchedUsers.size === 0)
                        alert("Nie znaleziono takiego użytkownika!")
                    else
                        addUserToTable(searchedUsers);
                }
                else
                    alert("Brak użytkowników do przeszukania!")
            })
            .catch(err => console.log(err));
    }
    else
        alert("Wpisz nazwisko!")
}

const filterAgeUser = () => {
    let ageMin = document.getElementById("ageMin").value;
    let ageMax = document.getElementById("ageMax").value;
    let dataUsers = null;
    let filterUsers;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            dataUsers = data.users;

            if(dataUsers !== null) {
                if(ageMin !== "" && ageMax !== "") {
                    filterUsers = dataUsers.filter(user =>
                        user.age >= ageMin && user.age <= ageMax
                    )
                }else if(ageMin !== "" && ageMax === "") {
                    filterUsers = dataUsers.filter(user =>
                        user.age >= ageMin
                    )
                }else if(ageMin === "" && ageMax !== "") {
                    filterUsers = dataUsers.filter(user =>
                        user.age <= ageMax
                    )
                }else
                    alert("Uzupełnij wiek jaki chcesz wyszukać!")

                if (filterUsers.size === 0)
                    alert("Nie znaleziono takiego użytkownika!")
                else
                    addUserToTable(filterUsers);
            }
            else
                alert("Brak użytkowników do przeszukania!")
        })
        .catch(err => console.log(err));
}

btnSearchUser.addEventListener("click", searchUser);
btnAddUser.addEventListener("click", sendUser);
btnGetAllUsers.addEventListener("click", getAllUsers);
btnDeleteUser.addEventListener("click", deleteUser);
btnUpdateUser.addEventListener("click", updateUser);
btnFilterAge.addEventListener("click", filterAgeUser);
btnRemoveFilterAge.addEventListener("click", getAllUsers);