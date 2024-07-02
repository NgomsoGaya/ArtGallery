const paintings = [
    { id: 1, title: "Sunset Over the Ocean", artist: "Jane Doe", price: 200, image: "https://via.placeholder.com/300x200" },
    { id: 2, title: "Mountain Landscape", artist: "John Smith", price: 150, image: "https://via.placeholder.com/300x200" },
    { id: 3, title: "Abstract Art", artist: "Alice Johnson", price: 300, image: "https://via.placeholder.com/300x200" },
    { id: 4, title: "City Skyline", artist: "Bob Brown", price: 250, image: "https://via.placeholder.com/300x200" }
];

const gallery = document.getElementById('gallery');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartLink = document.getElementById('cart-link');
const closeCart = document.getElementById('close-cart');

let cart = [];

function renderPaintings() {
    gallery.innerHTML = '';
    paintings.forEach(painting => {
        const paintingElement = document.createElement('div');
        paintingElement.className = 'painting';
        paintingElement.innerHTML = `
            <img src="${painting.image}" alt="${painting.title}">
            <div class="painting-details">
                <h2>${painting.title}</h2>
                <p>Artist: ${painting.artist}</p>
                <p>Price: $${painting.price}</p>
            </div>
            <button class="add-to-cart" onclick="addToCart(${painting.id})">Add to Cart</button>
        `;
        gallery.appendChild(paintingElement);
    });
}

function addToCart(paintingId) {
    const painting = paintings.find(p => p.id === paintingId);
    if (painting) {
        cart.push(painting);
        cartCount.textContent = cart.length;
        // alert(`${painting.title} added to cart!`);
    }
}

function renderCart() {
    cartItemsList.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <span>${item.title} by ${item.artist}</span>
            <span>$${item.price}</span>
        `;
        cartItemsList.appendChild(cartItem);
        totalPrice += item.price;
    });
    totalPriceElement.textContent = `Total: $${totalPrice}`;
}

function showCart() {
    renderCart();
    cartModal.classList.add('show');
    cartModal.classList.remove('hidden');
}

function hideCart() {
    cartModal.classList.remove('show');
    cartModal.classList.add('hidden');
}

cartLink.addEventListener('click', event => {
    event.preventDefault();
    showCart();
});

closeCart.addEventListener('click', event => {
    event.preventDefault();
    hideCart();
});

document.addEventListener('DOMContentLoaded', renderPaintings);

document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        // autoplay: {
        //     delay: 5000, // 5 seconds autoplay delay
        // },
        // Optional navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const imageInput = document.getElementById('image-input');
    const commentsContainer = document.getElementById('comments-container');

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const commentText = commentInput.value.trim();
        const imageFile = imageInput.files[0];
        if (commentText !== '' || imageFile) {
            addComment(commentText, imageFile);
            commentInput.value = ''; // Clear input field
            imageInput.value = ''; // Clear file input
        } else {
            alert('Please enter a comment or upload an image.');
        }
    });

    function addComment(text, imageFile) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');

        const commentText = document.createElement('p');
        commentText.textContent = text;

        commentDiv.appendChild(commentText);

        if (imageFile) {
            const image = document.createElement('img');
            image.src = URL.createObjectURL(imageFile);
            image.classList.add('comment-image'); // Add class to style image
            commentDiv.appendChild(image);
        }

        commentsContainer.appendChild(commentDiv);
    }
});
