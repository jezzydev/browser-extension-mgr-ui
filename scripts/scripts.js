
const themeSettingBtn = document.querySelector('.theme-setting-btn');
themeSettingBtn.addEventListener("click", toggleTheme);

function toggleTheme() {
    const html = document.querySelector(':root')

    //get saved theme setting from localStorage
    const currentTheme = localStorage.getItem('theme');

    //if current theme is dark, set it to light
    if (currentTheme === 'dark') {
        html.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
    }
    else {
        html.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

/* load data */
fetch('../data.json')
    .then(response => {
        if (!response.ok) {
            alert('Error loading extensions list.');
            throw new Error(`Error loading extensions list.${response.status}`);
        }
        return response.json();
    })
    .then(jsonData => {
        //load the extensions into the DOM
        const extList = document.querySelector('.extensions-list');

        for (let i = 0; i < jsonData.length; i++) {
            const data = jsonData[i];

            //extension info
            const info = document.createElement('div');
            info.className = "extension-info";

            const img = document.createElement('img');
            img.className = "extension-icon";
            img.alt = "Extension item icon";
            img.src = data.logo;
            info.append(img);

            const name = document.createElement('h3');
            name.innerHTML = data.name;
            name.className = "extension-name";
            info.append(name);

            const desc = document.createElement('p');
            desc.innerHTML = data.description;
            desc.className = "extension-desc";
            info.append(desc);

            // extension actions
            const actions = document.createElement('div');
            actions.className = "extension-actions";

            const removeBtn = document.createElement('button');
            removeBtn.type = "button";
            removeBtn.className = "remove-btn";
            removeBtn.innerHTML = "Remove";
            removeBtn.addEventListener('click', (event) => {
                const parent = event.target.closest('li.extension-item');
                parent.remove();
            });
            actions.append(removeBtn);

            const label = document.createElement('label');
            label.className = "switch";
            actions.append(label);

            const input = document.createElement('input');
            input.id = "chk" + i;
            input.type = "checkbox";
            input.checked = data.isActive;
            label.append(input);

            const slider = document.createElement('span');
            slider.className = "slider";
            label.append(slider);

            const item = document.createElement('li');
            item.className = "extension-item";
            item.append(info);
            item.append(actions);
            extList.append(item);
        }
    })
    .catch(error => {
        alert('Error loading data into the page.');
    });


const allBtn = document.getElementById('all-btn');
const activeBtn = document.getElementById('active-btn');
const inactiveBtn = document.getElementById('inactive-btn');

function getChecked() {
    return document.querySelectorAll('.extension-item:has(input[type=checkbox]:checked)');
}

function getUnchecked() {
    return document.querySelectorAll('.extension-item:has(input[type=checkbox]:not(:checked))');
}

function showItems(items) {
    items.forEach((elem, key, parent) => {
        elem.style.display = "grid";
    })
}

function hideItems(items) {
    items.forEach((elem, key, parent) => {
        elem.style.display = "none";
    })
}

function updateSelectedBtn(newSelectedBtn) {
    let className = 'selected-filter-btn';
    let selectedBtn = document.querySelector(`.${className}`);

    if (selectedBtn != newSelectedBtn) {
        selectedBtn.classList.remove(className);
        newSelectedBtn.classList.add(className);
    }
}

function showAll() {
    const extensions = document.querySelectorAll('.extension-item');
    showItems(extensions);
    updateSelectedBtn(allBtn);
}

function showActive() {
    showItems(getChecked());
    hideItems(getUnchecked());
    updateSelectedBtn(activeBtn);
}

function showInactive() {
    showItems(getUnchecked());
    hideItems(getChecked());
    updateSelectedBtn(inactiveBtn);
}

allBtn.addEventListener('click', showAll);
activeBtn.addEventListener('click', showActive);
inactiveBtn.addEventListener('click', showInactive);