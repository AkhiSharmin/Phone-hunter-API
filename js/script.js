
const loadPhone = async (searchText = '13', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json()
  const phones = data.data
  displayPhone(phones, isShowAll)
}

const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phone-container')
  //clear phone container cards before adding new cards
  phoneContainer.innerText = "";

  // display show all button if there are more then 12 phones 
  const showAllContainer = document.getElementById('show-all-container')
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden')
  } else {
    showAllContainer.classList.add('hidden')
  }

  console.log('is show all', isShowAll);

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }


  phones.forEach(phone => {
    // console.log(phone);
    const phoneCard = document.createElement('div')
    phoneCard.classList = `card p-4 border-2 border-gray-700`
    phoneCard.innerHTML = `
        <figure class="bg-[#0D6EFD0D]"><img class="p-10" src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button onclick="handelShowDetails('${phone.slug}')" class="btn text-[18px] bg-[#0D6EFD] text-white">Show Details</button>
          </div>
        </div>
        `
    phoneContainer.appendChild(phoneCard)
  });


  // hide loading spinner 
  toggleLoadingSpinner(false)

}


const handelShowDetails = async (id) => {

  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data
  showPhoneDetails(phone)
}


const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name')
  phoneName.innerText = phone.name
  const showDetailContainer = document.getElementById('show-detail-container')

  showDetailContainer.innerHTML = `
    <img class="py-5" src="${phone.image}" alt="" />
    <p class="font-bold">Brand: ${phone.brand}</p>
    <p><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.
      storage
    }</p>
    <p><span class="font-bold">DisplaySize:</span> ${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">ChipSet:</span> ${phone?.mainFeatures?.chipSet}</p>

    <p><span class="font-bold">Memory:</span> ${phone?.mainFeatures?.memory}</p>
    <p><span class="font-bold">ChipSet:</span> ${phone?.slug}</p>
    <p><span class="font-bold">Release Date:</span> ${phone.releaseDate}</p>
    <p><span class="font-bold">GPS:</span> ${phone?.others?.GPS}</p>
  `

  //show the modal
  show_details_modal.showModal()
}


// const searchBtn = document.getElementById('searchBtn')

// searchBtn.addEventListener('click', (e) => {
//     const searchInput = document.getElementById('searchInput')
//     const inputValue = searchInput.value.trim().toLowerCase()
//     const singlePhone = storePhone.filter(phone => phone.phone_name.toLowerCase().includes(inputValue))
//     displayPhone(singlePhone)
// })


//handel search button
const handelSearch = (isShowAll) => {
  toggleLoadingSpinner(true)
  const searchInput = document.getElementById('searchInput')
  const searchText = searchInput.value
  loadPhone(searchText, isShowAll);
}


const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner')
  if (isLoading) {
    loadingSpinner.classList.remove('hidden')
  } else {
    loadingSpinner.classList.add('hidden')
  }
}

const handelShowAll = () => {
  handelSearch(true)
}



loadPhone()