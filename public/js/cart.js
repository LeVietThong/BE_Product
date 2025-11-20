const inputQuantity = document.querySelectorAll("input[name='quantity']");

if (inputQuantity.length > 0) {
  inputQuantity.forEach((input) => {
    input.addEventListener("change", () => {
      const quantity = parseInt(input.value);
      const productId = input.getAttribute("product-id");

      window.location.href = `/cart/update/${productId}/${quantity}`;
    });
  });
}